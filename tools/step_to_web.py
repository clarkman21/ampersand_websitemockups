"""Convert a pack STEP assembly into a small, exterior-only GLB for the website.

Usage: python3 tools/step_to_web.py INPUT.step OUTPUT.glb [--tol 0.5 0.5] [--faces N] [--keep-name TEXT ...] [--drop-name TEXT ...]

Steps:
1. Tessellate the STEP file with OpenCascade (cascadio). The tolerance sets the detail.
   Coarser tessellation is better than decimation: it keeps the shape closed.
2. Keep only parts that are visible from outside: cast rays from a sphere around
   the assembly and keep each part that a ray hits first. Internal parts (cells,
   BMS boards, looms, screws inside the pack) are removed, so the internal design
   stays private.
   If one copy of a part (for example a screw) is visible, all visible copies stay.
3. Optionally decimate to a face budget, then write one GLB in metres, Y up (cascadio
   already converts the STEP Z-up axes), base on the floor. CAD colours are kept.
4. Print a part report, so a person can check what was kept.

Needs: pip install cascadio trimesh fast-simplification rtree embreex (Embree makes the ray test fast)
Then compress for the web: npx gltfpack -i OUT.glb -o OUT.min.glb -cc
"""
import argparse
import json
import os
import sys

import numpy as np
import trimesh


def load_parts(step_path, tol_linear=0.5, tol_angular=0.5):
    import cascadio
    tmp = f"{step_path}.{tol_linear}-{tol_angular}.glb"
    if not os.path.exists(tmp) or os.path.getmtime(tmp) < os.path.getmtime(step_path):
        cascadio.step_to_glb(step_path, tmp, tol_linear, tol_angular)  # mm, radians
    scene = trimesh.load(tmp, force="scene")
    parts = []
    for node in scene.graph.nodes_geometry:
        transform, geom_name = scene.graph[node]
        mesh = scene.geometry[geom_name].copy()
        mesh.apply_transform(transform)
        parts.append((str(node), mesh))
    return parts


def visible_parts(parts, rays=40000, seed=1, batch=500):
    """Return the indices of parts that rays from outside hit first."""
    meshes = [m for _, m in parts]
    owner = np.concatenate([np.full(len(m.faces), i) for i, m in enumerate(meshes)])
    allm = trimesh.util.concatenate(meshes)
    center = allm.bounds.mean(axis=0)
    radius = np.linalg.norm(allm.extents) * 1.5
    rng = np.random.default_rng(seed)
    d = rng.normal(size=(rays, 3))
    d /= np.linalg.norm(d, axis=1)[:, None]
    # jitter the start points so rays sample the whole silhouette
    jitter = rng.uniform(-0.5, 0.5, size=(rays, 3)) * allm.extents
    origins = center + d * radius + jitter
    dirs = center + rng.uniform(-0.5, 0.5, size=(rays, 3)) * allm.extents - origins
    dirs /= np.linalg.norm(dirs, axis=1)[:, None]
    counts = np.zeros(len(meshes), dtype=int)
    for i in range(0, rays, batch):  # small batches keep memory low on large assemblies
        tri = allm.ray.intersects_first(origins[i:i + batch], dirs[i:i + batch])
        hit = tri[tri >= 0]
        counts += np.bincount(owner[hit], minlength=len(meshes))
    return counts


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("step")
    ap.add_argument("out")
    ap.add_argument("--tol", type=float, nargs=2, default=[0.5, 0.5], metavar=("MM", "RAD"),
                    help="tessellation tolerance: linear in mm, angular in radians")
    ap.add_argument("--faces", type=int, default=0, help="optional face budget for decimation (0 = off)")
    ap.add_argument("--min-hits", type=int, default=3, help="rays a part needs to count as visible")
    ap.add_argument("--up", default="y", choices=["x", "y", "z"], help="axis that points up after conversion")
    ap.add_argument("--part-cap", type=int, default=0,
                    help="decimate each part above this face count (0 = off), except --full-detail parts")
    ap.add_argument("--full-detail", nargs="*", default=[], help="parts that keep every face")
    ap.add_argument("--keep-name", nargs="*", default=[], help="always keep parts whose name has this text")
    ap.add_argument("--drop-name", nargs="*", default=[], help="always drop parts whose name has this text")
    a = ap.parse_args()

    parts = load_parts(a.step, *a.tol)
    counts = visible_parts(parts)
    base = [n.split(":")[0] for n, _ in parts]
    visible_types = {base[i] for i, c in enumerate(counts) if c >= a.min_hits}

    def has(i, words):
        return any(w.lower() in parts[i][0].lower() for w in words)

    keep = [i for i, c in enumerate(counts)
            if not has(i, a.drop_name)
            and ((base[i] in visible_types and c >= 1) or has(i, a.keep_name))]

    total = sum(len(parts[i][1].faces) for i in keep) or 1
    scene = trimesh.Scene()
    report = []
    for i, (name, mesh) in enumerate(parts):
        row = {"part": name, "faces": int(len(mesh.faces)), "hits": int(counts[i]), "kept": i in keep}
        if i in keep:
            target = max(200, int(a.faces * len(mesh.faces) / total))
            if a.part_cap and not has(i, a.full_detail):
                target = min(target, a.part_cap) if a.faces else a.part_cap
            if (a.faces or a.part_cap) and len(mesh.faces) > target and not has(i, a.full_detail):
                visual = mesh.visual
                mesh = mesh.simplify_quadric_decimation(face_count=target)
                mesh.visual = visual.__class__(material=getattr(visual, "material", None)) if hasattr(visual, "material") else mesh.visual
            row["faces_out"] = int(len(mesh.faces))
            scene.add_geometry(mesh, node_name=name, geom_name=name)
        report.append(row)

    # cascadio writes metres and Y up. Rotate only if the file uses another up axis.
    up = "xyz".index(a.up)
    if up == 0:
        scene.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [0, 0, 1]))
    elif up == 2:
        scene.apply_transform(trimesh.transformations.rotation_matrix(-np.pi / 2, [1, 0, 0]))
    # centre on the main body (the part that rays hit most), not on parts that stick out
    main = parts[int(np.argmax(counts))][0]
    body = scene.geometry[scene.graph[main][1]].copy()
    body.apply_transform(scene.graph[main][0])
    blo, bhi = body.bounds
    lo, _ = scene.bounds
    scene.apply_translation([-(blo[0] + bhi[0]) / 2, -lo[1], -(blo[2] + bhi[2]) / 2])
    scene.export(a.out, include_normals=True)

    ext = (scene.bounds[1] - scene.bounds[0]) * 1000
    bext = (bhi - blo) * 1000
    print(json.dumps({"size_mm": [round(float(v), 1) for v in ext],
                      "main_body": main, "main_body_mm": [round(float(v), 1) for v in bext],
                      "parts_in": len(parts), "parts_kept": len(keep),
                      "faces_out": int(sum(r.get("faces_out", 0) for r in report))}, indent=1))
    for r in sorted(report, key=lambda r: -r["hits"]):
        print(("KEEP " if r["kept"] else "drop ") + f'{r["hits"]:6d} hits  {r["faces"]:7d} faces  {r["part"]}')


if __name__ == "__main__":
    sys.exit(main())

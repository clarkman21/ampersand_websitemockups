"""Convert a pack STEP assembly into a small, exterior-only GLB for the website.

Usage: python3 tools/step_to_web.py INPUT.step OUTPUT.glb [--faces 60000] [--keep-name TEXT ...]

Steps:
1. Tessellate the STEP file with OpenCascade (cascadio).
2. Keep only parts that are visible from outside: cast rays from a sphere around
   the assembly and keep each part that a ray hits first. Internal parts (cells,
   BMS boards, looms, screws inside the pack) are removed, so the internal design
   stays private.
3. Simplify each kept part and write one GLB in metres, Y up, base on the floor
   (the tallest axis goes up unless --up is given).
4. Print a part report, so a person can check what was kept.

Needs: pip install cascadio trimesh fast-simplification rtree
"""
import argparse
import json
import sys

import numpy as np
import trimesh


def load_parts(step_path):
    import cascadio
    tmp = step_path + ".raw.glb"
    cascadio.step_to_glb(step_path, tmp, 0.2, 0.3)  # linear and angular tolerance
    scene = trimesh.load(tmp, force="scene")
    parts = []
    for node in scene.graph.nodes_geometry:
        transform, geom_name = scene.graph[node]
        mesh = scene.geometry[geom_name].copy()
        mesh.apply_transform(transform)
        parts.append((str(node), mesh))
    return parts


def visible_parts(parts, rays=40000, seed=1):
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
    tri = allm.ray.intersects_first(origins, dirs)
    hit = tri[tri >= 0]
    counts = np.bincount(owner[hit], minlength=len(meshes))
    return counts


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("step")
    ap.add_argument("out")
    ap.add_argument("--faces", type=int, default=60000, help="face budget for the whole model")
    ap.add_argument("--min-hits", type=int, default=3, help="rays a part needs to count as visible")
    ap.add_argument("--up", default="auto", choices=["auto", "x", "y", "z"], help="axis that points up in the STEP file")
    ap.add_argument("--keep-name", nargs="*", default=[], help="always keep parts whose name has this text")
    a = ap.parse_args()

    parts = load_parts(a.step)
    counts = visible_parts(parts)
    keep = [i for i, c in enumerate(counts)
            if c >= a.min_hits or any(k.lower() in parts[i][0].lower() for k in a.keep_name)]

    total = sum(len(parts[i][1].faces) for i in keep) or 1
    scene = trimesh.Scene()
    report = []
    for i, (name, mesh) in enumerate(parts):
        row = {"part": name, "faces": int(len(mesh.faces)), "hits": int(counts[i]), "kept": i in keep}
        if i in keep:
            target = max(200, int(a.faces * len(mesh.faces) / total))
            if len(mesh.faces) > target:
                mesh = mesh.simplify_quadric_decimation(face_count=target)
            row["faces_out"] = int(len(mesh.faces))
            scene.add_geometry(mesh, node_name=name, geom_name=name)
        report.append(row)

    # cascadio writes metres. Turn the tallest axis to Y (the MK2 is 322 mm tall), base on the floor.
    up = int(np.argmax(scene.extents)) if a.up == "auto" else "xyz".index(a.up)
    if up == 0:
        scene.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [0, 0, 1]))
    elif up == 2:
        scene.apply_transform(trimesh.transformations.rotation_matrix(-np.pi / 2, [1, 0, 0]))
    lo, hi = scene.bounds
    scene.apply_translation([-(lo[0] + hi[0]) / 2, -lo[1], -(lo[2] + hi[2]) / 2])
    scene.export(a.out)

    ext = (scene.bounds[1] - scene.bounds[0]) * 1000
    print(json.dumps({"size_mm": [round(float(v), 1) for v in ext],
                      "parts_in": len(parts), "parts_kept": len(keep),
                      "faces_out": int(sum(r.get("faces_out", 0) for r in report))}, indent=1))
    for r in sorted(report, key=lambda r: -r["hits"]):
        print(("KEEP " if r["kept"] else "drop ") + f'{r["hits"]:6d} hits  {r["faces"]:7d} faces  {r["part"]}')


if __name__ == "__main__":
    sys.exit(main())

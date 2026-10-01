# Ampersand website mockups

This repository contains mockups for a refresh of the public Ampersand website (ampersand.solar, which redirects to ampersand.energy).

## Contents

| File | Content |
| --- | --- |
| `index.html` | Overview: audit of the current site, competitor research, site structure, data sources and the items to confirm. |
| `direction-a.html` | Direction A, "Network". Dark, data-first design. Products are in tabs. |
| `direction-b.html` | Direction B, "Proof", first version. Light editorial design. Products have spec tables. |
| `proof/` | **Selected direction.** Direction B developed into a six-page site: home, network (with automated cabinets), batteries (HM1 and MK2), technology (BMS, VCTU, cabinets, AmperOps), vehicles and investors. Every page opens with its key numbers, aligned with the 25 Sep 2026 company introduction. Design: station signage (15° leaning blades, large Barlow Condensed italic numbers, solid brand-colour fields). |
| `direction-c.html` | Direction C, "Surge". Yellow poster design. It has an audience switch and a fleet savings estimate. |
| `assets/brand/` | Logo files from Drive (Brand Assets, New 2026). |
| `assets/img/` | Web-size copies of Ampersand photos. |
| `assets/shots/` | Preview screenshots for the overview page. |

## How to view

Open `index.html` in a browser. The pages are static HTML. They need no build step. The fonts load from Google Fonts.

## Data

- `proof/assets/data.js` holds only the public numbers that the live feed uses.
- The "Network now" bar on the Proof pages is a simulation. It uses the 7-day swap average and an assumed hourly curve. It is not live data.
- The Proof site numbers follow the company introduction of 25 Sep 2026. Confidential financials stay in the investor pack.
- The product specs come from the current website, Notion and Drive.
- Dashed underlines in the mockups mark data that you must confirm before launch. The full list is in `index.html`.

## 3D models

- `proof/assets/models/mk2.gltf.json` is the MK2 pack from the CAD (MK2 Battery pack v37, Inventor STEP export). It holds only the parts that are visible from outside. The cells, BMS boards, looms and inside screws are removed.
- To rebuild it from a new STEP file:
  1. `pip install cascadio trimesh fast-simplification rtree embreex scipy`
  2. `python3 tools/step_to_web.py pack.stp mk2-ext.glb --tol 0.5 0.5 --part-cap 3000 --full-detail ENCLOSURE "SIDE PANEL" "HANDLE:" 101010`
  3. `npx gltfpack -i mk2-ext.glb -o mk2.gltf -cc`
  4. `python3 tools/gltf_embed.py mk2.gltf proof/assets/models/mk2.gltf.json` (one JSON file, because some hosts do not serve .glb files)
- Do not commit STEP files. They contain the full internal design.
- The MK2 colours come from the Hardware Product Portfolio slide (yellow body and checker plate, black handle and connector), not from the CAD, which has default colours.
- `proof/assets/renders/hm1.png` is the HM1.9 engineering render from Drive. The 3D HM1 and the 12-slot cabinet are still hand-built in `proof/assets/models3d.js`.

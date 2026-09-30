# Ampersand website mockups

This repository contains mockups for a refresh of the public Ampersand website (ampersand.solar, which redirects to ampersand.energy).

## Contents

| File | Content |
| --- | --- |
| `index.html` | Overview: audit of the current site, competitor research, site structure, data sources and the items to confirm. |
| `direction-a.html` | Direction A, "Network". Dark, data-first design. Products are in tabs. |
| `direction-b.html` | Direction B, "Proof", first version. Light editorial design. Products have spec tables. |
| `proof/` | **Selected direction.** Direction B developed into a six-page site: home, network, batteries, AmperOps, vehicles and investors. Every page opens with its key numbers. |
| `direction-c.html` | Direction C, "Surge". Yellow poster design. It has an audience switch and a fleet savings estimate. |
| `assets/brand/` | Logo files from Drive (Brand Assets, New 2026). |
| `assets/img/` | Web-size copies of Ampersand photos. |
| `assets/shots/` | Preview screenshots for the overview page. |

## How to view

Open `index.html` in a browser. The pages are static HTML. They need no build step. The fonts load from Google Fonts.

## Data

- `proof/assets/data.js` holds the numbers that the charts and the live feed use.
- The "Network now" bar on the Proof pages is a simulation. It uses the 7-day swap average and an assumed hourly curve. It is not live data.
- The network numbers come from AmperOps for the week of 22–28 Sep 2026.
- The product specs come from the current website, Notion and Drive.
- Dashed underlines in the mockups mark data that you must confirm before launch. The full list is in `index.html`.

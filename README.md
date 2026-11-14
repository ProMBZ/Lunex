# LunaPath — Lunar Landing Site Navigator

LunaPath is a family-built project for the 2026 NASA Space Apps Challenge: **Lunar Landing Site Navigator**. It helps people explore lunar south-polar reference locations and understand the questions that connect place, terrain, sunlight, Earth visibility, and time.

## Website

- `/` — project landing page, interactive NASA global Moon model, guided workflow, prototype evidence, sources, and project transparency.
- `/explorer` — interactive mission navigator for selecting USGS lunar reference features or custom coordinates, choosing an observation date and UTC hour, and comparing scenarios.
- The explorer's timeline and condition diagrams are explicitly illustrative. They do not represent live ephemerides or validated terrain-horizon results.

The landing page includes a guided 30-second interactive walkthrough, traceable reference-site cards, source/methodology explanations, and a project-transparency section.

## What the prototype includes

- Interactive NASA LRO / LOLA global Moon model for orientation.
- Named lunar feature reference coordinates from the USGS Gazetteer of Planetary Nomenclature.
- A mathematical south-polar coordinate projection.
- Custom lunar coordinate input and validation.
- Observation date and UTC-hour controls.
- Site/date scenario comparison.
- Schematic Sun / Earth horizon diagrams and an illustrative timeline.
- Source links, methodology notes, and scientific limitations.

## Scientific status and limitations

The current demonstrator does **not** calculate or claim:
- Live JPL Horizons / NAIF SPICE positions for a selected lunar observer.
- Site-specific solar azimuth/elevation or terrain-aware illumination windows.
- Earth line-of-sight windows through a local LOLA terrain horizon.
- Solar-array power, energy yield, or battery endurance.
- Direct-to-Earth radio link budget or communication margin.
- Landing safety or site-suitability rankings.

Those outputs require validated ephemerides and reference frames, local elevation data, a terrain skyline solver, time-window extraction, uncertainty handling, and separate power and radio engineering models. Geometric Earth visibility is not a radio link budget. Solar visibility is not delivered electrical power.

## Data interpretation

The three named feature coordinates displayed on the landing page come from USGS catalogue records. They are reference feature centres (or a listed feature span for Mons Malapert), not surveyed landing coordinates or a suitability assessment. The 30-second walkthrough is an interactive UI guide, not a recording of computed science outputs.

## NASA Moon model

The interactive Moon expects this local file:

```
public/models/Moon_NASA_LRO_8k_Topo_Small.glb
```

The approximately 77.7 MB binary is intentionally excluded from Git. Keep it in your local `public/models` folder. Verify it with:

```bash
npm run model:verify
npm run dev
```

If the file is elsewhere, use `npm run model:select`. The NASA global model is for orientation and context, not a local south-pole DEM or proof of terrain clearance.

NASA source: https://svs.gsfc.nasa.gov/14959/

## Sources and credits

NASA LRO / LOLA global Moon model, USGS lunar feature records, NASA Moon Trek, LROC QuickMap, JPL Horizons documentation, and other references are recorded in [SOURCES.md](SOURCES.md). The overview diagrams are authored SVG artwork rather than NASA imagery.

## Run locally

Requirements: Node.js 20.9 or newer and npm 10 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

The project uses Next.js App Router, React 19, JavaScript/JSX, TypeScript for reusable components, Tailwind CSS v4, and Three.js.

## Project identity

Built by a family, inspired by lunar exploration. LunaPath is an independent educational project created for the NASA Space Apps Challenge; it is not an official NASA product.

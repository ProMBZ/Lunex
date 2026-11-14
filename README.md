# Lunex — Lunar Landing Site Navigator

Lunex is a family-built lunar exploration project for the 2026 NASA Space Apps Challenge. It helps researchers and space explorers examine the location, terrain, sunlight, Earth-view and time factors that shape planning for a lunar mission.

## Website

- \`/\` — landing page with an interactive NASA LRO / LOLA 3D global Moon model and a plain-language project overview.
- \`/presentation\` — Coming Soon page for the 30-second walkthrough.
- \`/explorer\` — Coming Soon page for the Mission Explorer.

The mission-exploration components and their data structures remain in the repository while the public destination is prepared.

## Project capabilities

- Interactive NASA LRO / LOLA global Moon model for orientation.
- Named lunar feature reference locations from the USGS Gazetteer of Planetary Nomenclature.
- Custom lunar coordinate input and validation in the Mission Explorer implementation.
- Observation date and UTC-hour controls in the Mission Explorer implementation.
- Site and date scenario comparison in the Mission Explorer implementation.
- Schematic Sun / Earth horizon diagrams and an illustrative timeline.

The timeline and condition diagrams are illustrative. They are not live ephemerides or validated terrain-horizon results.

## Scientific status and limitations

The current demonstrator does not calculate or claim:
- Live JPL Horizons / NAIF SPICE positions for a selected lunar observer.
- Site-specific solar azimuth/elevation or terrain-aware illumination windows.
- Earth line-of-sight windows through a local LOLA terrain horizon.
- Solar-array power, energy yield, or battery endurance.
- Direct-to-Earth radio link budget or communication margin.
- Landing safety or site-suitability rankings.

Those outputs require validated ephemerides and reference frames, local elevation data, a terrain skyline solver, time-window extraction, uncertainty handling, and separate power and radio engineering models. Geometric Earth visibility is not a radio link budget. Solar visibility is not delivered electrical power.

## NASA Moon model

The interactive Moon expects this local file:

\`\`\`
public/models/Moon_NASA_LRO_8k_Topo_Small.glb
\`\`\`

The approximately 77.7 MB binary is intentionally excluded from Git. Keep it in your local \`public/models\` folder. Verify it with:

\`\`\`bash
npm run model:verify
npm run dev
\`\`\`

If the file is elsewhere, use \`npm run model:select\`. The global model is for orientation and context, not a local south-pole DEM or proof of terrain clearance.

NASA source: https://svs.gsfc.nasa.gov/14959/

## Visual identity

The website uses the Lunex brand palette:
- Blue: \`#0B3D91\`
- Red: \`#FC3D21\`
- White: \`#FFFFFF\`

The landing overview uses original vector mission-planning artwork. The Moon model and scientific sources are documented in [SOURCES.md](SOURCES.md).

## Sources and credits

NASA LRO / LOLA global Moon model, USGS lunar feature records, NASA Moon Trek, LROC QuickMap, JPL Horizons documentation, and other sources are recorded in [SOURCES.md](SOURCES.md).

## Run locally

Requirements: Node.js 20.9 or newer and npm 10 or newer.

\`\`\`bash
npm ci
npm run dev
\`\`\`

Open http://localhost:3000.

The project uses Next.js App Router, React 19, TypeScript/TSX throughout the website source, Tailwind CSS v4, and Three.js.

## Project identity

Built by AI Family, inspired by lunar exploration.

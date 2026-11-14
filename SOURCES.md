# Lunex — data and technical references

The Moon is rendered from the project's NASA GLB when that local binary is present. Project-overview and explanatory visuals are authored SVG illustrations and diagrams. Third-party source datasets and models remain subject to their own terms and are not relicensed under the project's source-code license.

| Use | Source / attribution | Link |
|---|---|---|
| Interactive global Moon model | NASA Goddard Space Flight Center Scientific Visualization Studio; Moon_NASA_LRO_8k_Topo_Small.glb, LRO-derived global colour + height-map model. | https://svs.gsfc.nasa.gov/14959/ |
| Shackleton crater | USGS Gazetteer / IAU feature 5450; feature-centre reference coordinate shown in V1: 89.67° S, 129.78° E; listed diameter 20.92 km. | https://planetarynames.wr.usgs.gov/Feature/5450 |
| de Gerlache crater | USGS Gazetteer / IAU feature 1439; feature-centre reference coordinate shown in V1: 88.48° S, 88.34° W; listed diameter 32.71 km. | https://planetarynames.wr.usgs.gov/Feature/1439 |
| Mons Malapert | USGS Gazetteer / IAU feature 16338; feature-centre reference coordinate shown in V1: 85.98° S, 1.67° W; listed span 67 km. | https://planetarynames.wr.usgs.gov/Feature/16338 |
| Lunar mapping and terrain inspection | LROC Quickmap, developed by Arizona State University; high-resolution lunar imagery and topographic layers. | https://quickmap.lroc.asu.edu/ |
| Lunar 3D visualization | NASA Moon Trek. | https://trek.nasa.gov/moon/ |
| Ephemeris geometry | NASA Jet Propulsion Laboratory Horizons System. A production calculation must define lunar observer, time standard, target IDs and reference frame. | https://ssd.jpl.nasa.gov/horizons/ |
| Geometry kernels and reference frames | NASA Navigation and Ancillary Information Facility (NAIF) SPICE. | https://naif.jpl.nasa.gov/naif/ |
| South-polar elevation data | Lunar Orbiter Laser Altimeter (LOLA) data products. A local horizon solver requires a region-matched DEM with spatial and vertical resolution documented. | https://ode.rsl.wustl.edu/moon/ |
| Partner space-agency context | Canadian Space Agency, Moon Exploration. | https://www.asc-csa.gc.ca/eng/astronomy/moon-exploration/ |
| Challenge statement | NASA Space Apps Challenge 2026, Lunar Landing Site Navigator. | https://www.spaceappschallenge.org/2026/challenges/lunar-landing-site-navigator/ |

## Interpretation boundaries

- The USGS coordinates are named feature centres from the Gazetteer. They are not surveyed landing coordinates, recommended observer points or site-suitability claims.
- The V1 south-polar SVG is a mathematical polar projection of those coordinates. It is not a NASA imagery layer or a terrain map.
- The NASA global Moon GLB is for orientation. It is not a sufficiently resolved local south-pole DEM for a terrain-horizon solver. NASA notes polar pinching artifacts.
- The V1 horizon diagrams are authored schematic SVGs. The timeline's marker motion is illustrative UI behavior, not a computed Sun/Earth path.
- No solar elevation, visibility interval, sunrise/sunset, Earthrise/Earthset, electrical power, RF link margin or landing-safety score is claimed.
- Before operational interpretation, integrate and validate JPL Horizons or NAIF SPICE ephemerides, local elevation data, a terrain skyline solver, time sampling / window extraction, uncertainty and data provenance.
- Geometric Earth visibility is not a radio link budget. Solar visibility is not delivered electrical power.

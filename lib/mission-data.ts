export type LunarSite = {
  id: string;
  name: string;
  featureType: string;
  latitude: number;
  longitude: number;
  diameterKm: number;
  region: string;
  terrainNote: string;
  missionContext: string;
  usgsId: string;
  sourceUrl: string;
};

export const LUNAR_SITES: LunarSite[] = [
  {
    id: "shackleton",
    name: "Shackleton crater",
    featureType: "Crater",
    latitude: -89.67,
    longitude: 129.78,
    diameterKm: 20.92,
    region: "Lunar south pole",
    terrainNote: "A sharply bounded polar crater. The rim and interior are different terrain contexts; a crater-centre coordinate is not a surveyed rim landing point.",
    missionContext: "Named south-polar reference feature for comparing site and date scenarios.",
    usgsId: "USGS / IAU feature 5450",
    sourceUrl: "https://planetarynames.wr.usgs.gov/Feature/5450"
  },
  {
    id: "de-gerlache",
    name: "de Gerlache crater",
    featureType: "Crater",
    latitude: -88.48,
    longitude: -88.34,
    diameterKm: 32.71,
    region: "Lunar south pole",
    terrainNote: "A high-latitude crater with a broad rim and interior. Local slopes and skyline must be evaluated at the actual observer coordinate.",
    missionContext: "South-polar comparison feature for investigating location sensitivity.",
    usgsId: "USGS / IAU feature 1439",
    sourceUrl: "https://planetarynames.wr.usgs.gov/Feature/1439"
  },
  {
    id: "malapert",
    name: "Mons Malapert",
    featureType: "Mountain",
    latitude: -85.98,
    longitude: -1.67,
    diameterKm: 67,
    region: "Malapert massif",
    terrainNote: "An elevated massif. Elevation alone does not prove safe access, continuous illumination or a clear Earth line of sight.",
    missionContext: "A named elevated south-polar feature suitable for regional comparison.",
    usgsId: "USGS / IAU feature 16338",
    sourceUrl: "https://planetarynames.wr.usgs.gov/Feature/16338"
  }
];

export const CONDITION_STATES = [
  { id: "sun", label: "Sun / illumination", detail: "Solar azimuth, elevation and terrain clearance", state: "Awaiting ephemeris + local horizon" },
  { id: "earth", label: "Earth / communication", detail: "Earth direction, terrain clearance and visibility intervals", state: "Awaiting ephemeris + local horizon" },
  { id: "power", label: "Power context", detail: "Potential solar input after array and system assumptions", state: "No electrical model connected" },
  { id: "link", label: "Communication context", detail: "Antenna, frequency, power and link margin", state: "No RF link budget connected" }
] as const;

export function isSouthPolarCoordinate(latitude: number, longitude: number) {
  return Number.isFinite(latitude)
    && Number.isFinite(longitude)
    && latitude >= -90
    && latitude <= 90
    && longitude >= -180
    && longitude <= 180;
}

export function polarProject(latitude: number, longitude: number) {
  const colatitude = Math.max(0, Math.min(180, 90 + latitude)) * Math.PI / 180;
  const angle = longitude * Math.PI / 180;
  const radius = Math.tan(colatitude / 2) * 1450;
  return {
    x: 350 + Math.sin(angle) * radius,
    y: 245 - Math.cos(angle) * radius
  };
}

"use client";

import { LUNAR_SITES, polarProject, type LunarSite } from "@/lib/mission-data";

type CustomPoint = { latitude: number; longitude: number } | null;

type SouthPoleMapProps = {
  selectedId: string;
  onSelect: (site: LunarSite) => void;
  customPoint: CustomPoint;
};

export default function SouthPoleMap({ selectedId, onSelect, customPoint }: SouthPoleMapProps) {
  const rings = [1, 3, 5, 7, 9];
  const customPosition = customPoint ? polarProject(customPoint.latitude, customPoint.longitude) : null;
  const customInView = customPosition && customPosition.x >= 18 && customPosition.x <= 682 && customPosition.y >= 18 && customPosition.y <= 452;

  return (
    <div className="south-map-shell">
      <div className="south-map-head">
        <span>POLAR PROJECTION / FEATURE CENTRES</span>
        <span>90° S AT CENTRE</span>
      </div>
      <svg className="south-pole-map" viewBox="0 0 700 490" role="group" aria-label="Interactive south-polar coordinate projection with selectable named lunar features">
        <defs>
          <pattern id="polar-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="#343a3f" strokeWidth=".65" />
          </pattern>
          <radialGradient id="polar-wash" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#999b9b" stopOpacity=".12" />
            <stop offset="100%" stopColor="#999b9b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="700" height="490" fill="url(#polar-grid)" opacity=".65" />
        <circle cx="350" cy="245" r="215" fill="url(#polar-wash)" />
        {rings.map((degree) => {
          const r = Math.tan((degree * Math.PI / 180) / 2) * 1450;
          return (
            <g key={degree}>
              <circle cx="350" cy="245" r={r} fill="none" stroke="#454c51" strokeWidth="1" strokeDasharray="3 6" />
              <text x={350 + r + 7} y="241" className="map-ring-label">{degree}°</text>
            </g>
          );
        })}
        <path d="M350 16V474M22 245H678" stroke="#434b50" strokeDasharray="4 7" />
        <path d="M119 57L581 433M581 57L119 433" stroke="#31373c" strokeDasharray="2 9" />
        <circle cx="350" cy="245" r="4" fill="#d5d0c5" />
        <text x="362" y="235" className="map-pole-label">SOUTH POLE</text>
        {LUNAR_SITES.map((site) => {
          const p = polarProject(site.latitude, site.longitude);
          const active = site.id === selectedId;
          return (
            <g key={site.id} className={active ? "map-feature is-selected" : "map-feature"}>
              <circle cx={p.x} cy={p.y} r={active ? 16 : 11} fill="none" stroke={active ? "#d59a55" : "#9ca2a5"} strokeOpacity={active ? ".68" : ".35"} />
              <circle cx={p.x} cy={p.y} r={active ? 5 : 3.5} fill={active ? "#e4b06f" : "#d4d0c6"} />
              <foreignObject x={p.x - 56} y={p.y + 12} width="145" height="34">
                <button className={active ? "map-point-label active" : "map-point-label"} type="button" onClick={() => onSelect(site)}>
                  {site.name}
                </button>
              </foreignObject>
            </g>
          );
        })}
        {customInView && customPosition && (
          <g className="map-custom-point">
            <circle cx={customPosition.x} cy={customPosition.y} r="13" fill="none" stroke="#b7d0d7" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={customPosition.x} cy={customPosition.y} r="4.5" fill="#b7d0d7" />
            <text x={customPosition.x + 13} y={customPosition.y - 9} className="map-custom-label">CUSTOM POINT</text>
          </g>
        )}
        <text x="24" y="34" className="map-orientation">0° LONGITUDE / REFERENCE AXIS</text>
        <text x="24" y="466" className="map-footnote">MATHEMATICAL POLAR PLOT · NOT A RASTER MAP OR LANDING-SAFETY PRODUCT</text>
      </svg>
      <div className="south-map-legend">
        <span><i className="legend-reference" /> USGS named feature centre</span>
        <span><i className="legend-custom" /> Custom observer input</span>
        <span><i className="legend-grid" /> Latitude rings / graticule</span>
      </div>
    </div>
  );
}

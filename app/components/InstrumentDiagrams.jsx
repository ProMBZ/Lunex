export function ConditionConstellation() {
  return (
    <div className="condition-constellation">
      <svg viewBox="0 0 720 420" role="img" aria-label="Conceptual diagram connecting a lunar site with sunlight, Earth direction and surrounding terrain">
        <defs>
          <pattern id="constellation-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#34383d" strokeWidth=".7" /></pattern>
        </defs>
        <rect width="720" height="420" fill="url(#constellation-grid)" opacity=".48" />
        <circle cx="354" cy="206" r="154" fill="none" stroke="#4b5056" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="354" cy="206" r="104" fill="none" stroke="#4b5056" strokeWidth="1" />
        <circle cx="354" cy="206" r="52" fill="none" stroke="#4b5056" strokeWidth="1" strokeDasharray="3 7" />
        <path d="M354 34V378M182 206H526" stroke="#51565d" strokeWidth="1" strokeDasharray="3 7" />
        <path d="M92 76L320 184" stroke="#d18a38" strokeWidth="2" strokeDasharray="7 8" />
        <path d="M610 93L390 187" stroke="#6e9cb3" strokeWidth="2" strokeDasharray="7 8" />
        <path d="M354 206L520 316" stroke="#a8aaad" strokeWidth="1.5" />
        <path d="M354 206L330 172L365 160L387 183L420 178L451 205L482 194L512 222" fill="none" stroke="#a8aaad" strokeWidth="2" />
        <circle cx="92" cy="76" r="15" fill="#d18a38" />
        <circle cx="610" cy="93" r="19" fill="none" stroke="#6e9cb3" strokeWidth="1.6" />
        <path d="M599 91C602 83 610 81 616 86L619 94L612 101L604 98Z" fill="#6e9cb3" opacity=".75" />
        <circle cx="354" cy="206" r="7" fill="#f4f0e8" />
        <circle cx="354" cy="206" r="19" fill="none" stroke="#d18a38" strokeWidth="1" />
        <path d="M354 187V225M335 206H373" stroke="#f4f0e8" strokeWidth="1" />
        <text x="42" y="48" className="diagram-kicker sun-copy">LIGHT / SUN VECTOR</text>
        <text x="548" y="53" className="diagram-kicker earth-copy">EARTH / SIGHTLINE</text>
        <text x="360" y="274" className="diagram-label" textAnchor="middle">SELECTED SITE</text>
        <text x="500" y="348" className="diagram-kicker">TERRAIN / LOCAL HORIZON</text>
        <text x="20" y="398" className="diagram-foot">CONCEPTUAL RELATIONSHIPS · NOT A SITE-SPECIFIC COMPUTATION</text>
      </svg>
      <div className="diagram-coordinate"><span>PLACE</span><b>LAT / LON</b><i /><span>TIME</span><b>UTC</b><i /><span>FRAME</span><b>LOCAL HORIZON</b></div>
    </div>
  );
}

export function SunHorizonDiagram() {
  return (
    <div className="instrument-diagram">
      <svg viewBox="0 0 720 320" role="img" aria-label="Schematic diagram of low-angle sunlight meeting a lunar ridge and local horizon">
        <defs><linearGradient id="sun-wash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d18a38" stopOpacity=".2" /><stop offset="1" stopColor="#d18a38" stopOpacity="0" /></linearGradient></defs>
        <path d="M0 248L88 242L146 250L212 227L270 236L333 194L389 214L452 169L505 189L557 220L627 205L720 216V320H0Z" fill="#22262b" />
        <path d="M0 248L88 242L146 250L212 227L270 236L333 194L389 214L452 169L505 189L557 220L627 205L720 216" fill="none" stroke="#92969a" strokeWidth="2" />
        <path d="M64 48L452 169L557 220L655 207" stroke="url(#sun-wash)" strokeWidth="58" fill="none" />
        <path d="M64 48L452 169L557 220" stroke="#d18a38" strokeWidth="2" strokeDasharray="8 8" fill="none" />
        <circle cx="64" cy="48" r="16" fill="#d18a38" />
        <circle cx="64" cy="48" r="27" fill="none" stroke="#d18a38" strokeOpacity=".45" />
        <path d="M452 169V264" stroke="#e6e2d8" strokeWidth="1.2" strokeDasharray="5 7" />
        <circle cx="452" cy="169" r="5" fill="#f3efe7" />
        <path d="M452 169L494 140" stroke="#d18a38" strokeWidth="1" />
        <text x="500" y="135" className="diagram-kicker sun-copy">RIDGELINE</text>
        <text x="24" y="24" className="diagram-kicker sun-copy">SUN DIRECTION</text>
        <text x="452" y="289" textAnchor="middle" className="diagram-kicker">OBSERVER</text>
        <text x="18" y="305" className="diagram-foot">SUN ELEVATION MUST BE COMPARED WITH THE TERRAIN SKYLINE</text>
      </svg>
      <div className="diagram-legend"><span><i className="legend-sun" /> Sun direction</span><span><i className="legend-horizon" /> Terrain horizon</span><span><i className="legend-site" /> Observation point</span></div>
    </div>
  );
}

export function EarthVisibilityDiagram() {
  return (
    <div className="instrument-diagram earth-diagram">
      <svg viewBox="0 0 720 320" role="img" aria-label="Schematic direct-to-Earth line of sight and local terrain obstruction">
        <path d="M0 245L92 235L175 243L250 220L311 225L367 190L413 207L464 182L524 201L606 192L720 203V320H0Z" fill="#22262b" />
        <path d="M0 245L92 235L175 243L250 220L311 225L367 190L413 207L464 182L524 201L606 192L720 203" fill="none" stroke="#92969a" strokeWidth="2" />
        <path d="M102 230Q345 35 578 74" fill="none" stroke="#6e9cb3" strokeWidth="2" strokeDasharray="7 8" />
        <path d="M102 230L365 190L413 207" fill="none" stroke="#d18a38" strokeWidth="1.6" strokeDasharray="3 7" />
        <circle cx="578" cy="74" r="34" fill="#182b37" stroke="#6e9cb3" strokeWidth="2" />
        <path d="M564 54L577 47L590 55L592 67L583 72L577 83L567 78L560 66Z" fill="#6e9cb3" opacity=".78" />
        <path d="M587 83L598 90L590 101L580 96Z" fill="#6e9cb3" opacity=".65" />
        <circle cx="102" cy="230" r="5" fill="#f4f0e8" />
        <path d="M102 230V277" stroke="#f4f0e8" strokeDasharray="4 6" />
        <text x="102" y="299" textAnchor="middle" className="diagram-kicker">LUNAR SITE</text>
        <text x="578" y="132" textAnchor="middle" className="diagram-kicker earth-copy">EARTH</text>
        <text x="351" y="31" textAnchor="middle" className="diagram-foot">GEOMETRIC SIGHTLINE · SCHEMATIC</text>
      </svg>
      <div className="diagram-legend"><span><i className="legend-earth" /> Direction to Earth</span><span><i className="legend-horizon" /> Local terrain skyline</span></div>
    </div>
  );
}

export function DataLineageDiagram() {
  const steps = [
    ["01", "LOCATION + TIME", "Coordinate frame · UTC instant"],
    ["02", "EPHEMERIS", "JPL Horizons / SPICE"],
    ["03", "LOCAL HORIZON", "LOLA elevation model"],
    ["04", "VISIBILITY WINDOWS", "Sun + Earth vs. terrain"],
    ["05", "EVIDENCE", "Source · resolution · limits"]
  ];
  return (
    <div className="lineage-diagram">
      {steps.map(([number, title, detail], index) => (
        <div className="lineage-step" key={number}>
          <span className="lineage-index">{number}</span>
          <div className="lineage-node"><i className={"lineage-dot dot-" + index} /><b>{title}</b><small>{detail}</small></div>
          {index < steps.length - 1 && <span className="lineage-link" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

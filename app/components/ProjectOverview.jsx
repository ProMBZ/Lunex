function PinIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10.1c0 5.1-7 10.4-7 10.4S5 15.2 5 10.1a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
}
function SunEarthIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="7" cy="8" r="3" /><path d="M7 1.5v1.2M7 13.3v1.2M.5 8h1.2m10.6 0h1.2M2.4 3.4l.9.9m7.4 7.4.9.9" /><circle cx="17.5" cy="17" r="4.2" /><path d="M14.4 14.3c1.7-1.1 3.4-1.4 5.2-.6m-6.1 4.1c1.4.9 3.2 1.3 5.4.7" /></svg>;
}
function CompareIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h6v14H4zM14 5h6v14h-6zM10 9h4m-4 6h4" /></svg>;
}
function LunarStoryArt() {
  return (
    <div className="overview-visual">
      <div className="overview-visual-top"><span>THE LUNAR SOUTH POLE</span><span>PLACE / SUNLIGHT / EARTH</span></div>
      <svg viewBox="0 0 760 480" role="img" aria-labelledby="overview-art-title overview-art-desc">
        <title id="overview-art-title">Lunar mission scene</title>
        <desc id="overview-art-desc">An illustrative lunar surface showing a Sun direction, Earth in the sky, an astronaut and a lunar lander.</desc>
        <defs>
          <radialGradient id="ov-earth" cx="35%" cy="28%" r="78%"><stop offset="0%" stopColor="#b7d8e8" /><stop offset="48%" stopColor="#5385a5" /><stop offset="100%" stopColor="#1c354c" /></radialGradient>
          <linearGradient id="ov-ground" x1="0" y1="0" x2=".8" y2="1"><stop offset="0%" stopColor="#6f7782" stopOpacity=".38" /><stop offset="100%" stopColor="#1b2029" stopOpacity=".96" /></linearGradient>
          <linearGradient id="ov-suit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#eef1f4" /><stop offset="100%" stopColor="#788595" /></linearGradient>
          <radialGradient id="ov-sun"><stop offset="0%" stopColor="#fff2c7" /><stop offset="100%" stopColor="#d6a66a" /></radialGradient>
          <filter id="ov-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="14" /></filter>
          <clipPath id="ov-earth-clip"><circle cx="625" cy="102" r="43" /></clipPath>
        </defs>
        <g fill="#d9e4f0">
          <circle cx="62" cy="62" r="1.2" opacity=".52" /><circle cx="174" cy="124" r="1" opacity=".4" /><circle cx="260" cy="52" r="1.1" opacity=".6" /><circle cx="365" cy="88" r="1.4" opacity=".35" /><circle cx="455" cy="44" r="1" opacity=".55" /><circle cx="711" cy="210" r="1.2" opacity=".38" /><circle cx="550" cy="188" r=".9" opacity=".45" /><circle cx="97" cy="220" r=".8" opacity=".5" /><circle cx="693" cy="34" r=".9" opacity=".65" />
        </g>
        <circle cx="98" cy="106" r="34" fill="#d7a96c" opacity=".12" filter="url(#ov-glow)" />
        <circle cx="98" cy="106" r="18" fill="url(#ov-sun)" />
        <g stroke="#d7a96c" opacity=".55" strokeWidth="1"><path d="M98 75V65M98 147v-10M67 106H57M139 106h-10M76 84l-7-7M127 135l-7-7M120 84l7-7M69 135l7-7" /></g>
        <path d="M124 122Q235 158 329 285" fill="none" stroke="#d7a96c" strokeWidth="1.8" strokeDasharray="5 8" opacity=".8" />
        <path d="M124 122Q235 158 329 285" fill="none" stroke="#d7a96c" strokeWidth="7" opacity=".08" />
        <circle cx="625" cy="102" r="54" fill="#6b9cba" opacity=".13" filter="url(#ov-glow)" />
        <circle cx="625" cy="102" r="43" fill="url(#ov-earth)" stroke="#9fc4d9" strokeOpacity=".7" />
        <g clipPath="url(#ov-earth-clip)" fill="#a6c5b3" opacity=".72">
          <path d="M588 77l18-8 9 8-3 9-10 3-4 12-11-4-6-11z" /><path d="M628 58l11 5 1 11 10 6-4 12-10-1-6-9-7-4z" /><path d="M638 105l13 1 5 10-9 7-2 13-13-2-5-12z" /><path d="M594 118l10-5 9 8-5 13-13-2z" />
        </g>
        <path d="M586 147Q475 184 369 291" fill="none" stroke="#86adcb" strokeWidth="1.7" strokeDasharray="4 8" opacity=".82" />
        <path d="M0 346L84 329L132 337L188 304L245 325L296 298L354 321L412 286L469 318L532 298L592 327L659 306L760 336V480H0Z" fill="url(#ov-ground)" />
        <path d="M0 346L84 329L132 337L188 304L245 325L296 298L354 321L412 286L469 318L532 298L592 327L659 306L760 336" fill="none" stroke="#a9b2bc" strokeOpacity=".55" strokeWidth="1.6" />
        <path d="M0 389Q155 352 299 371T760 370M0 426Q155 394 299 409T760 414" stroke="#727e8a" strokeOpacity=".22" fill="none" />
        <g transform="translate(434 284)">
          <ellipse cx="0" cy="75" rx="44" ry="7" fill="#05070b" opacity=".52" />
          <path d="M-23 6h46l9 42h-64z" fill="#737d8a" stroke="#c2cbd4" strokeOpacity=".65" /><path d="M-17 11h34v27h-34z" fill="#192634" stroke="#c4d1df" strokeOpacity=".6" />
          <path d="M-26 49l-18 24M26 49l18 24M-44 73h12M44 73h-12" fill="none" stroke="#bbc5cf" strokeWidth="3" strokeLinecap="round" />
          <path d="M-27 6l-13-13M27 6l13-13M-40-7h80M-40-7l-21-11M40-7l21-11" fill="none" stroke="#9ba9b8" strokeWidth="2" />
          <rect x="-60" y="-25" width="17" height="17" rx="1" fill="#243a4d" stroke="#9ab0c5" /><path d="M-56-22v11m4-11v11m4-11v11" stroke="#90a9c0" strokeWidth=".8" />
          <rect x="43" y="-25" width="17" height="17" rx="1" fill="#243a4d" stroke="#9ab0c5" /><path d="M47-22v11m4-11v11m4-11v11" stroke="#90a9c0" strokeWidth=".8" />
        </g>
        <g transform="translate(280 283)">
          <ellipse cx="0" cy="72" rx="22" ry="5" fill="#05070b" opacity=".5" />
          <path d="M-12 2Q-23 20-19 37l-7 24 10 2 13-28 8 0 12 28 10-2-7-24Q24 20 12 2Z" fill="url(#ov-suit)" stroke="#cbd3dd" strokeWidth="1.2" />
          <rect x="-25" y="13" width="9" height="28" rx="3" fill="#7f8b99" stroke="#cbd3dd" strokeWidth="1" />
          <path d="M-14 5Q-30 15-29 29l-12 11 7 7 19-15M14 5Q27 16 28 29l10 8-6 8-19-14" fill="none" stroke="#d9e0e7" strokeWidth="8" strokeLinecap="round" />
          <circle cx="0" cy="-14" r="19" fill="url(#ov-suit)" stroke="#e6ebf0" strokeWidth="1.5" /><ellipse cx="1" cy="-14" rx="12.5" ry="13" fill="#162b40" stroke="#a9c1d4" strokeWidth="1.5" /><path d="M-7-20Q2-27 10-17" stroke="#d8e7f1" strokeOpacity=".5" strokeWidth="2" fill="none" />
          <path d="M-10 34h20" stroke="#5c6875" strokeWidth="2" />
        </g>
        <g fill="#d8e4f0" fontFamily="monospace" fontSize="10" letterSpacing="1.5"><text x="35" y="52">SUNLIGHT</text><text x="568" y="40">EARTH VIEW</text><text x="268" y="405">LANDING SITE</text><text x="405" y="430">LUNAR SURFACE</text></g>
        <g stroke="#7d8e9f" strokeOpacity=".45" strokeWidth="1"><path d="M100 60v18M613 49v14M310 389v-42M442 414v-24" /></g>
      </svg>
      <div className="overview-visual-foot"><span>SUNLIGHT / EARTH / SURFACE</span><span>THE QUESTIONS BEHIND A LANDING SITE</span></div>
    </div>
  );
}
const steps = [
  {
    number: "01",
    icon: <PinIcon />,
    title: "Explore the lunar surface",
    text: "Choose a south-polar location, inspect its coordinates and understand the surrounding lunar landscape in context.",
  },
  {
    number: "02",
    icon: <SunEarthIcon />,
    title: "Follow the Sun and Earth",
    text: "See why sunlight and a clear direction to Earth matter for power opportunities and mission communication.",
  },
  {
    number: "03",
    icon: <CompareIcon />,
    title: "Compare mission conditions",
    text: "Move through observation times and compare candidate locations to understand how the mission picture changes.",
  },
];

export default function ProjectOverview() {
  return (
    <section className="project-overview" id="project-overview" aria-labelledby="project-overview-title">
      <div className="overview-shell">
        <div className="overview-story">
          <div className="overview-intro">
            <p className="overview-eyebrow"><span /> PROJECT OVERVIEW</p>
            <h2 id="project-overview-title">
              Choosing where to land
              <br />
              is only half the <em>challenge.</em>
            </h2>
            <p className="overview-lede">
              At the Moon’s south pole, sunlight can skim the horizon and
              nearby ridges can change what a landing site can see. LunaPath
              brings location, lunar terrain, the Sun and Earth into one
              exploration experience, helping you understand the conditions
              around a potential landing site.
            </p>
          </div>
          <LunarStoryArt />
        </div>

        <div className="overview-journey">
          <div className="overview-journey-heading">
            <div>
              <span className="overview-journey-kicker">HOW LUNAPATH WORKS</span>
              <h3>One place. Three things to understand.</h3>
            </div>
            <span className="overview-journey-index">01 — 03</span>
          </div>
          <div className="overview-steps">
            {steps.map((step) => (
              <article className="overview-step" key={step.number}>
                <div className="overview-step-top">
                  <span className="overview-step-number">{step.number}</span>
                  <span className="overview-step-icon">{step.icon}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                <span className="overview-step-link" aria-hidden="true">LUNAPATH / {step.number}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="overview-resource-row">
          <span>SCIENCE & DATA RESOURCES</span>
          <a href="https://svs.gsfc.nasa.gov/14959/" target="_blank" rel="noreferrer">NASA LRO / LOLA <span>↗</span></a>
          <i />
          <a href="https://planetarynames.wr.usgs.gov/" target="_blank" rel="noreferrer">USGS lunar features <span>↗</span></a>
          <i />
          <a href="https://quickmap.lroc.asu.edu/" target="_blank" rel="noreferrer">LROC QuickMap <span>↗</span></a>
          <i />
          <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noreferrer">JPL Horizons <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}

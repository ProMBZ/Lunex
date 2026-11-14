type HorizonPreviewProps = {
  hour: number;
  siteName: string;
};

export default function HorizonPreview({ hour, siteName }: HorizonPreviewProps) {
  const phase = hour / 23;
  const sunX = 74 + phase * 572;
  const sunY = 172 - Math.sin(phase * Math.PI) * 105;
  const earthPhase = (phase + 0.42) % 1;
  const earthX = 74 + earthPhase * 572;
  const earthY = 82 + Math.sin(earthPhase * Math.PI) * 28;

  return (
    <div className="horizon-preview">
      <div className="horizon-preview-head">
        <span>HORIZON STUDY / TEMPORAL SCRUB</span>
        <span>ILLUSTRATIVE POSITIONS ONLY</span>
      </div>
      <svg viewBox="0 0 720 300" role="img" aria-label="Illustrative Sun and Earth marker positions relative to a schematic lunar terrain horizon. This is not ephemeris data.">
        <defs>
          <linearGradient id="horizon-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#555d61" stopOpacity=".62" />
            <stop offset="1" stopColor="#252a2e" stopOpacity=".18" />
          </linearGradient>
        </defs>
        <path d="M0 228L50 222L94 231L156 208L207 216L260 190L310 205L364 168L408 187L463 205L520 191L578 215L630 200L720 210V300H0Z" fill="url(#horizon-ground)" />
        <path d="M0 228L50 222L94 231L156 208L207 216L260 190L310 205L364 168L408 187L463 205L520 191L578 215L630 200L720 210" fill="none" stroke="#858c8f" strokeWidth="2" />
        <path d="M74 172Q360 -46 646 172" fill="none" stroke="#d59a55" strokeOpacity=".3" strokeWidth="1" strokeDasharray="4 7" />
        <path d="M74 105Q360 -8 646 105" fill="none" stroke="#819eab" strokeOpacity=".25" strokeWidth="1" strokeDasharray="3 8" />
        <path d={"M" + sunX + " " + sunY + "L" + sunX + " 226"} stroke="#d59a55" strokeWidth="1.2" strokeDasharray="4 7" />
        <circle cx={sunX} cy={sunY} r="13" fill="#d59a55" />
        <circle cx={sunX} cy={sunY} r="24" fill="none" stroke="#d59a55" strokeOpacity=".28" />
        <path d={"M" + earthX + " " + earthY + "L" + earthX + " 224"} stroke="#819eab" strokeWidth="1.2" strokeDasharray="4 7" />
        <circle cx={earthX} cy={earthY} r="11" fill="#1b313c" stroke="#8eabb7" strokeWidth="1.4" />
        <path d={"M" + (earthX - 4) + " " + (earthY - 4) + "l5 -3 4 4 -3 5 -5 -1z"} fill="#8eabb7" />
        <circle cx="360" cy="193" r="5" fill="#e4e0d6" />
        <path d="M360 193V252" stroke="#e4e0d6" strokeDasharray="4 6" />
        <text x="360" y="274" className="horizon-plot-label" textAnchor="middle">{siteName.toUpperCase()}</text>
        <text x="20" y="24" className="horizon-plot-note">SUN MARKER / ILLUSTRATIVE MOTION</text>
        <text x="700" y="24" textAnchor="end" className="horizon-plot-note">EARTH MARKER / ILLUSTRATIVE MOTION</text>
      </svg>
      <div className="horizon-preview-legend">
        <span><i className="legend-sun-dot" /> Sun marker</span>
        <span><i className="legend-earth-dot" /> Earth marker</span>
        <span><i className="legend-skyline-dot" /> Schematic terrain</span>
      </div>
      <p className="horizon-preview-disclaimer">Changing the scrubber moves the diagram markers to demonstrate the interface. It does not calculate lunar ephemerides, sunrise, Earthrise or visibility windows.</p>
    </div>
  );
}

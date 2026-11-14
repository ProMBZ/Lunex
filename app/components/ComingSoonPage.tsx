import Link from "next/link";

function PresentationVisual() {
  return (
    <div className="destination-art destination-art-presentation" aria-hidden="true">
      <div className="destination-planet" />
      <div className="destination-orbit destination-orbit-one" />
      <div className="destination-orbit destination-orbit-two" />
      <div className="destination-orbit destination-orbit-three" />
      <span className="destination-star destination-star-one" />
      <span className="destination-star destination-star-two" />
      <span className="destination-star destination-star-three" />
      <span className="destination-art-caption">LUNEX / 30 SECOND OVERVIEW</span>
    </div>
  );
}

function ExplorerVisual() {
  return (
    <div className="destination-art destination-art-explorer" aria-hidden="true">
      <div className="polar-visual-heading">
        <span>MISSION EXPLORER / 01</span>
        <span>POLAR REFERENCE GRID</span>
      </div>
      <div className="polar-radar">
        <div className="polar-radar-ring polar-radar-ring-outer" />
        <div className="polar-radar-ring polar-radar-ring-middle" />
        <div className="polar-radar-ring polar-radar-ring-inner" />
        <div className="polar-radar-cross polar-radar-cross-horizontal" />
        <div className="polar-radar-cross polar-radar-cross-vertical" />
        <div className="polar-radar-sweep" />
        <svg className="polar-terrain-lines" viewBox="0 0 420 420" fill="none">
          <path d="M37 219C66 168 84 172 111 190C132 204 145 155 181 162C218 170 227 120 262 128C296 137 315 179 342 164C364 152 381 164 394 188" />
          <path d="M28 244C59 201 83 202 111 215C143 229 154 183 185 188C221 194 232 145 269 152C302 158 317 199 349 184C368 175 384 185 397 204" />
          <path d="M49 274C81 241 93 236 124 245C151 253 166 218 194 222C227 226 244 184 273 187C306 190 327 221 350 210C369 201 384 210 392 225" />
          <path d="M73 302C99 275 125 270 145 278C171 287 183 257 207 259C240 261 252 228 282 229C308 230 328 249 348 240" />
          <path d="M105 329C127 310 145 304 163 310C189 319 201 290 226 290C249 290 270 268 291 271C313 274 327 286 342 280" />
          <path d="M38 145C69 125 89 126 111 139C139 156 154 122 184 122C216 122 226 91 260 95C286 98 301 126 328 117C352 109 374 119 391 139" />
        </svg>
        <div className="polar-site-marker"><span /><i /></div>
        <div className="polar-coordinate polar-coordinate-north">90° N</div>
        <div className="polar-coordinate polar-coordinate-west">90° W</div>
        <div className="polar-coordinate polar-coordinate-east">90° E</div>
        <div className="polar-coordinate polar-coordinate-south">90° S</div>
      </div>
      <div className="polar-visual-readout">
        <div><span>REFERENCE REGION</span><b>LUNAR SOUTH POLE</b></div>
        <div><span>LOCATION INPUT</span><b>LAT / LON</b></div>
        <div><span>SCENARIO</span><b>PLACE + TIME</b></div>
      </div>
      <span className="destination-art-caption">SITE CONTEXT / NOT A LIVE MAP</span>
    </div>
  );
}

type ComingSoonPageProps = { eyebrow: string; title: string; description: string; variant?: "presentation" | "explorer" };

export default function ComingSoonPage({ eyebrow, title, description, variant = "presentation" }: ComingSoonPageProps) {
  const isExplorer = variant === "explorer";
  return (
    <main id="main-content" className="destination-page">
      <section className={isExplorer ? "destination-card destination-card-explorer" : "destination-card"} aria-labelledby="destination-title">
        <div className="destination-copy">
          <p className="destination-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <div className="destination-status"><i aria-hidden="true" />COMING SOON</div>
          <h1 id="destination-title">{title}</h1>
          <p className="destination-description">{description}</p>
          <Link className="destination-back" href="/"><span aria-hidden="true">←</span>Back to Project Information</Link>
        </div>
        {isExplorer ? <ExplorerVisual /> : <PresentationVisual />}
      </section>
    </main>
  );
}

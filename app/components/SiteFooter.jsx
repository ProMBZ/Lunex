import Link from "next/link";
import BackToTopButton from "./BackToTopButton";

function Wordmark() {
  return (
    <Link className="footer-brand" href="/" aria-label="LunaPath home">
      <span className="brand-mark">
        <svg viewBox="0 0 34 34" fill="none" aria-hidden="true">
          <circle cx="17" cy="17" r="12.2" />
          <path d="M4 21.3c6.2-7.5 18-12 26-8.6" />
          <path d="M9.1 27.1 24.9 6.9" />
          <circle cx="20.8" cy="12.2" r="2.2" />
        </svg>
      </span>
      <span className="footer-brand-name">LUNAPATH</span>
    </Link>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-identity">
            <Wordmark />
            <p>
              Helping people explore lunar landing locations and understand
              how sunlight, Earth visibility, terrain and time shape mission
              planning.
            </p>
            <span className="footer-family-line">
              Built by a family, inspired by lunar exploration.
            </span>
          </div>
          <nav className="footer-column" aria-label="Project navigation">
            <h2>EXPLORE</h2>
            <Link href="/">Project information <span>↗</span></Link>
            <Link href="/explorer">Landing Explorer <span>↗</span></Link>
            <Link href="/presentation">Presentation <span>↗</span></Link>
          </nav>
          <nav className="footer-column" aria-label="Lunar data and reference resources">
            <h2>DATA & REFERENCES</h2>
            <a href="https://svs.gsfc.nasa.gov/14959/" target="_blank" rel="noreferrer">NASA LRO / LOLA Moon model <span>↗</span></a>
            <a href="https://trek.nasa.gov/moon/" target="_blank" rel="noreferrer">NASA Moon Trek <span>↗</span></a>
            <a href="https://quickmap.lroc.asu.edu/" target="_blank" rel="noreferrer">LROC QuickMap <span>↗</span></a>
            <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noreferrer">JPL Horizons <span>↗</span></a>
          </nav>
          <div className="footer-side">
            <div className="footer-source-note">
              <span>PROJECT / 2026</span>
              <p>Lunar Landing Site Navigator · NASA Space Apps Challenge</p>
            </div>
            <BackToTopButton />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 LUNAPATH</span>
          <span>NASA SPACE APPS CHALLENGE · LUNAR LANDING SITE NAVIGATOR</span>
          <a href="https://github.com/ProMBZ/Potato" target="_blank" rel="noreferrer">Source repository <span>↗</span></a>
        </div>
      </div>
    </footer>
  );
}

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
              A visual navigator for exploring lunar south-pole reference
              sites, observation times and the science behind mission
              conditions.
            </p>
            <span className="footer-family-line">
              Built by a family, inspired by lunar exploration.
            </span>
            <span className="footer-independent-note">
              An independent educational project created for NASA Space Apps
              Challenge 2026. Not an official NASA product.
            </span>
          </div>

          <nav className="footer-column" aria-label="Project navigation">
            <h2>EXPLORE</h2>
            <Link href="/explorer">Open Navigator <span>↗</span></Link>
            <Link href="/#how-it-works">How it works <span>↗</span></Link>
            <Link href="/#science">Science & sources <span>↗</span></Link>
            <Link href="/presentation">Project presentation <span>↗</span></Link>
          </nav>

          <nav className="footer-column" aria-label="Project transparency">
            <h2>PROJECT FILES</h2>
            <a href="https://github.com/ProMBZ/LunaPath" target="_blank" rel="noreferrer">GitHub repository <span>↗</span></a>
            <a href="https://github.com/ProMBZ/LunaPath/blob/main/SOURCES.md" target="_blank" rel="noreferrer">Sources register <span>↗</span></a>
            <a href="https://github.com/ProMBZ/LunaPath/blob/main/AI_USAGE.md" target="_blank" rel="noreferrer">AI-use disclosure <span>↗</span></a>
            <a href="https://github.com/ProMBZ/LunaPath/blob/main/LICENSE" target="_blank" rel="noreferrer">Apache-2.0 licence <span>↗</span></a>
          </nav>

          <div className="footer-side">
            <div className="footer-source-note">
              <span>NASA SPACE APPS / 2026</span>
              <p>Lunar Landing Site Navigator</p>
              <p>Prototype status and scientific limits are documented publicly.</p>
            </div>
            <BackToTopButton />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 LUNAPATH</span>
          <span>BUILT BY A FAMILY · INSPIRED BY LUNAR EXPLORATION</span>
          <a href="https://github.com/ProMBZ/LunaPath" target="_blank" rel="noreferrer">Source repository <span>↗</span></a>
        </div>
      </div>
    </footer>
  );
}

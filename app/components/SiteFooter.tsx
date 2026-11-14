import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-identity">
          <Link className="footer-brand" href="/" aria-label="Lunex home">
            <Image src="/favicon.png" alt="" width={36} height={36} />
            <span>LUNEX</span>
          </Link>
          <p className="footer-credit">An interactive lunar mission-planning experience focused on the Moon’s south pole.</p>
        </div>
        <div className="footer-project-note">
          <span>NASA SPACE APPS CHALLENGE · 2026</span>
          <b>Built by AI Family, inspired by lunar exploration.</b>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/presentation">Watch 30 Seconds</Link>
          <Link href="/explorer">Mission Explorer</Link>
          <a href="https://github.com/ProMBZ/Lunex" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <span className="footer-copyright">© 2026 LUNEX</span>
      </div>
    </footer>
  );
}

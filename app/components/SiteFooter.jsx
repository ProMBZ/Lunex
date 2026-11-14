import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" href="/" aria-label="LunaPath home">
          <Image src="/favicon.png" alt="" width={36} height={36} />
          <span>LUNAPATH</span>
        </Link>

        <p className="footer-credit">Built by AI Family · Inspired by lunar exploration</p>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/presentation">Watch 30 Seconds</Link>
          <Link href="/explorer">Mission Explorer</Link>
          <a href="https://github.com/ProMBZ/Lunex" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <span className="footer-copyright">© 2026 LUNAPATH</span>
      </div>
    </footer>
  );
}

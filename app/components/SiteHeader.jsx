"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function BrandMark() {
  return (
    <svg viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="12.2" />
      <path d="M4 21.3c6.2-7.5 18-12 26-8.6" />
      <path d="M9.1 27.1 24.9 6.9" />
      <circle cx="20.8" cy="12.2" r="2.2" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const explorerActive = pathname.startsWith("/explorer");

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link className="brand" href="/" aria-label="LunaPath home">
          <span className="brand-mark"><BrandMark /></span>
          <span className="brand-name">LUNAPATH</span>
        </Link>
        <nav className="nav-destinations" aria-label="Main navigation">
          <ul>
            <li>
              <Link className="nav-link" href="/#how-it-works">
                <span>How it works</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/#science">
                <span>Science & sources</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Link className={explorerActive ? "nav-cta is-active" : "nav-cta"} href="/explorer">
          <span>Open Navigator</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
    </header>
  );
}

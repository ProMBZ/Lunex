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
function PresentationIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.75" y="3.25" width="14.5" height="10.25" rx="1.5" />
      <path d="M10 13.5v3.25m-3.5 0h7M7 7.25l2 2 4-3" />
    </svg>
  );
}
function ExplorerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.75" cy="8.75" r="5.65" />
      <path d="m13 13 4.1 4.1M11 6.5 9.25 10l-3.5 1.75L7.5 8.25 11 6.5Z" />
    </svg>
  );
}
export default function SiteHeader() {
  const pathname = usePathname();
  const presentationActive = pathname.startsWith("/presentation");
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
              <Link className={presentationActive ? "nav-link is-active" : "nav-link"}
                href="/presentation" aria-current={presentationActive ? "page" : undefined}>
                <PresentationIcon /><span>Presentation</span>
              </Link>
            </li>
            <li>
              <Link className={explorerActive ? "nav-link nav-link-primary is-active" : "nav-link nav-link-primary"}
                href="/explorer" aria-current={explorerActive ? "page" : undefined}>
                <ExplorerIcon /><span>Landing Explorer</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link className="brand" href="/" aria-label="Lunex — Back to project information">
          <Image
            className="brand-logo"
            src="/favicon.png"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span className="brand-name">LUNEX</span>
        </Link>

        <nav className="nav-actions" aria-label="Main navigation">
          {isHome ? (
            <>
              <Link className="nav-button nav-button-secondary" href="/presentation">
                <span className="nav-play" aria-hidden="true">▶</span>
                <span>Watch 30 Seconds</span>
              </Link>
              <Link className="nav-button nav-button-primary" href="/explorer">
                <span>Open Mission Explorer</span>
                <span className="nav-arrow" aria-hidden="true">↗</span>
              </Link>
            </>
          ) : (
            <Link className="nav-button nav-button-return" href="/">
              <span className="nav-return-arrow" aria-hidden="true">←</span>
              <span>Back to Project Information</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

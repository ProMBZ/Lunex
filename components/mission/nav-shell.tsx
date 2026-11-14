"use client";

import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import LiquidNavbar, { NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";

const ITEMS: LiquidNavItem[] = [
  { label: "Overview", href: "/", icon: NimbusIcons.home, fx: "glow" },
  { label: "Mission Explorer", href: "/explorer", icon: NimbusIcons.globe, fx: "spin" },
  { label: "Methodology", href: "/methodology", icon: NimbusIcons.drop, fx: "drop" },
  { label: "Challenge", href: "/challenge", icon: NimbusIcons.user, fx: "wave" }
];

export default function NavShell() {
  const pathname = usePathname();
  const router = useRouter();
  const activeIndex = useMemo(() => {
    if (pathname.startsWith("/explorer")) return 1;
    if (pathname.startsWith("/methodology")) return 2;
    if (pathname.startsWith("/challenge")) return 3;
    return 0;
  }, [pathname]);
  const [pendingIndex, setPendingIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    setPendingIndex(undefined);
  }, [pathname]);

  const navigate = (index: number, item: LiquidNavItem) => {
    if (!item.href) return;
    setPendingIndex(index);
    router.push(item.href, { transitionTypes: [index > activeIndex ? "nav-forward" : "nav-back"] });
  };

  return (
    <header className="site-header" style={{ viewTransitionName: "persistent-nav" }}>
      <div className="header-inner">
        <a className="header-brand" href="/" onClick={(event) => { event.preventDefault(); router.push("/", { transitionTypes: ["nav-back"] }); }}>
          <span className="header-brand-mark" aria-hidden="true"><i /><b /></span>
          <span>LUNA<span>PATH</span></span>
        </a>
        <div className="header-nav-wrap" onClickCapture={(event: MouseEvent<HTMLDivElement>) => {
            const target = event.target;
            if (target instanceof Element && target.closest('a[href^="/"]')) event.preventDefault();
          }}>
          <span className="header-context">LUNAR SOUTH-POLE SITE INTELLIGENCE</span>
          <LiquidNavbar
            items={ITEMS}
            active={pendingIndex ?? activeIndex}
            onChange={navigate}
            tone="dark"
            sound={false}
            className="lunapath-liquid-nav"
          />
        </div>
        <a className="header-launch" href="/explorer" onClick={(event) => { event.preventDefault(); router.push("/explorer", { transitionTypes: ["nav-forward"] }); }}>
          <span>Open Explorer</span><b aria-hidden="true">↗</b>
        </a>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    let frame = 0;
    let lastX = -100;
    let lastY = -100;
    const interactiveSelector = "a, button, input, select, textarea, [role='button']";

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastX = event.clientX;
      lastY = event.clientY;
      const target = event.target;
      const interactive = target instanceof Element && Boolean(target.closest(interactiveSelector));
      cursor.classList.toggle("is-interactive", interactive);
      cursor.classList.add("is-visible");
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = "translate3d(" + lastX + "px," + lastY + "px,0) translate(-50%,-50%)";
      });
    };

    const leave = () => cursor.classList.remove("is-visible", "is-interactive", "is-pressed");
    const down = (event: PointerEvent) => { if (event.pointerType === "mouse") cursor.classList.add("is-pressed"); };
    const up = () => cursor.classList.remove("is-pressed");
    const motionChanged = () => { if (motionQuery.matches) leave(); };
    const visibilityChanged = () => { if (document.visibilityState === "hidden") leave(); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibilityChanged);
    motionQuery.addEventListener?.("change", motionChanged);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibilityChanged);
      motionQuery.removeEventListener?.("change", motionChanged);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span className="custom-cursor-ring" /><span className="custom-cursor-point" /></div>;
}

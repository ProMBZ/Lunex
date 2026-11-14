"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    let frame = 0;
    const interactiveSelector = "a, button, input, select, textarea, [role='button']";

    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      const x = event.clientX;
      const y = event.clientY;
      const target = event.target;
      const interactive = target instanceof Element && Boolean(target.closest(interactiveSelector));

      cursor.classList.toggle("is-interactive", interactive);
      cursor.classList.add("is-visible");

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
      });
    };

    const leave = () => cursor.classList.remove("is-visible", "is-interactive");
    const motionChanged = () => {
      if (motionQuery.matches) leave();
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    motionQuery.addEventListener?.("change", motionChanged);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      motionQuery.removeEventListener?.("change", motionChanged);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-point" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let lastFrame = 0;
    let running = false;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let stars = [];

    const randomSource = (initialSeed) => {
      let seed = initialSeed;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    };

    const makeStars = () => {
      const random = randomSource(481516);
      const count = window.innerWidth < 680 ? 112 : 224;
      stars = Array.from({ length: count }, () => {
        const bright = random() > 0.975;
        return {
          x: random() * width,
          y: random() * height,
          radius: bright ? 0.95 + random() * 0.9 : 0.28 + random() * 0.66,
          alpha: bright ? 0.46 + random() * 0.34 : 0.15 + random() * 0.47,
          depth: 0.12 + random() * 0.88,
          phase: random() * Math.PI * 2,
          twinkle: 0.22 + random() * 0.72,
          bright,
          accent: random() > 0.96,
        };
      });
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const parallaxX = (mouseX - 0.5) * star.depth * 15;
        const parallaxY = (mouseY - 0.5) * star.depth * 11;
        const shimmer = motionQuery.matches
          ? 0
          : Math.sin(time * 0.001 * star.twinkle + star.phase) * (star.bright ? 0.17 : 0.1);
        const opacity = Math.max(0.06, Math.min(0.9, star.alpha + shimmer));
        const x = star.x - parallaxX;
        const y = star.y - parallaxY;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = star.accent
          ? "rgba(252, 61, 33, " + opacity + ")"
          : "rgba(255, 255, 255, " + opacity + ")";
        if (star.bright) {
          context.save();
          context.shadowColor = star.accent
            ? "rgba(252, 61, 33, " + (opacity * 0.5) + ")"
            : "rgba(255, 255, 255, " + (opacity * 0.5) + ")";
          context.shadowBlur = 7;
          context.fill();
          context.restore();
        } else {
          context.fill();
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      makeStars();
      draw(0);
    };

    const animate = (time) => {
      if (!running) return;
      frame = window.requestAnimationFrame(animate);
      if (time - lastFrame < 34) return;
      lastFrame = time;
      draw(time);
    };

    const start = () => {
      if (running || motionQuery.matches || document.visibilityState === "hidden") return;
      running = true;
      frame = window.requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };
    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      mouseX = event.clientX / Math.max(width, 1);
      mouseY = event.clientY / Math.max(height, 1);
      if (motionQuery.matches) draw(0);
    };
    const onPointerLeave = () => {
      mouseX = 0.5;
      mouseY = 0.5;
      if (motionQuery.matches) draw(0);
    };
    const onMotionChange = () => {
      if (motionQuery.matches) { stop(); draw(0); }
      else start();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };

    resize();
    if (!motionQuery.matches) start();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener?.("change", onMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, pixelRatio = 1, frame = 0, lastFrame = 0;
    let running = false, mouseX = 0.5, mouseY = 0.5, stars = [];

    const randomSource = (initialSeed) => {
      let seed = initialSeed;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    };
    const makeStars = () => {
      const random = randomSource(481516);
      const count = window.innerWidth < 680 ? 92 : 176;
      stars = Array.from({ length: count }, () => {
        const layer = random();
        return {
          x: random() * width,
          y: random() * height,
          radius: 0.35 + random() * (layer > 0.82 ? 1.05 : 0.55),
          alpha: 0.2 + random() * 0.52,
          depth: 0.15 + layer * 0.85,
          phase: random() * Math.PI * 2,
          twinkle: 0.35 + random() * 0.9,
        };
      });
    };
    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const parallaxX = (mouseX - 0.5) * star.depth * 12;
        const parallaxY = (mouseY - 0.5) * star.depth * 9;
        const shimmer = motionQuery.matches ? 0 :
          Math.sin(time * 0.001 * star.twinkle + star.phase) * 0.13;
        const opacity = Math.max(0.08, Math.min(0.88, star.alpha + shimmer));
        context.beginPath();
        context.arc(star.x - parallaxX, star.y - parallaxY, star.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(218, 229, 242, " + opacity + ")";
        context.fill();
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
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

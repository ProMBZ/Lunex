"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; radius: number; alpha: number; depth: number; phase: number; twinkle: number; bright: boolean; accent: boolean; cross: boolean };
type Meteor = { x: number; y: number; vx: number; vy: number; age: number; duration: number };

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, pixelRatio = 1, frame = 0, lastFrame = 0;
    let running = false, mouseX = 0.5, mouseY = 0.5;
    let stars: Star[] = [], meteors: Meteor[] = [];
    let nextMeteorAt = 5000;

    const randomSource = (initialSeed: number) => {
      let seed = initialSeed;
      return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    };

    const makeStars = () => {
      const random = randomSource(481516);
      const count = window.innerWidth < 680 ? 230 : 460;
      stars = Array.from({ length: count }, () => {
        const bright = random() > 0.975;
        return {
          x: random() * width, y: random() * height,
          radius: bright ? 0.9 + random() * 1.25 : 0.25 + random() * 0.72,
          alpha: bright ? 0.46 + random() * 0.42 : 0.12 + random() * 0.48,
          depth: 0.08 + random() * 0.92,
          phase: random() * Math.PI * 2, twinkle: 0.3 + random() * 0.9,
          bright, accent: random() > 0.982, cross: bright && random() > 0.68,
        };
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const parallaxX = motionQuery.matches ? 0 : (mouseX - 0.5) * star.depth * 17;
        const parallaxY = motionQuery.matches ? 0 : (mouseY - 0.5) * star.depth * 12;
        const shimmer = motionQuery.matches ? 0 : Math.sin(time * 0.001 * star.twinkle + star.phase) * (star.bright ? 0.2 : 0.11);
        const opacity = Math.max(0.05, Math.min(0.95, star.alpha + shimmer));
        const x = star.x - parallaxX, y = star.y - parallaxY;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = star.accent ? "rgba(252,61,33," + opacity + ")" : "rgba(255,255,255," + opacity + ")";
        if (star.bright) {
          context.save();
          context.shadowColor = star.accent ? "rgba(252,61,33," + opacity * 0.58 + ")" : "rgba(255,255,255," + opacity * 0.58 + ")";
          context.shadowBlur = star.cross ? 10 : 6;
          context.fill();
          context.restore();
          if (star.cross) {
            context.beginPath();
            context.moveTo(x - 3.5, y); context.lineTo(x + 3.5, y);
            context.moveTo(x, y - 3.5); context.lineTo(x, y + 3.5);
            context.strokeStyle = "rgba(255,255,255," + opacity * 0.5 + ")";
            context.lineWidth = 0.55; context.stroke();
          }
        } else context.fill();
      }

      if (!motionQuery.matches && width > 680) {
        const elapsed = Math.max(0, Math.min(48, time - lastFrame));
        if (time > nextMeteorAt && meteors.length < 2) {
          meteors.push({
            x: Math.random() * width * 0.75 + width * 0.12,
            y: Math.random() * height * 0.3,
            vx: 7 + Math.random() * 3, vy: 2.8 + Math.random() * 1.7,
            age: 0, duration: 42 + Math.random() * 18,
          });
          nextMeteorAt = time + 8500 + Math.random() * 9000;
        }
        meteors = meteors.filter((meteor) => meteor.age < meteor.duration);
        for (const meteor of meteors) {
          meteor.x += meteor.vx * elapsed * 0.06;
          meteor.y += meteor.vy * elapsed * 0.06;
          meteor.age += elapsed * 0.06;
          const alpha = Math.max(0, 1 - meteor.age / meteor.duration);
          const tail = 54;
          const gradient = context.createLinearGradient(meteor.x - tail, meteor.y - tail * 0.34, meteor.x, meteor.y);
          gradient.addColorStop(0, "rgba(255,255,255,0)");
          gradient.addColorStop(0.72, "rgba(255,255,255," + alpha * 0.16 + ")");
          gradient.addColorStop(1, "rgba(252,61,33," + alpha * 0.78 + ")");
          context.beginPath();
          context.moveTo(meteor.x - tail, meteor.y - tail * 0.34);
          context.lineTo(meteor.x, meteor.y);
          context.strokeStyle = gradient; context.lineWidth = 1.25; context.stroke();
        }
      }
    };

    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      makeStars(); meteors = []; nextMeteorAt = 5000; draw(0);
    };
    const animate = (time: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(animate);
      if (time - lastFrame < 32) return;
      draw(time); lastFrame = time;
    };
    const start = () => {
      if (running || motionQuery.matches || document.visibilityState === "hidden") return;
      running = true; frame = window.requestAnimationFrame(animate);
    };
    const stop = () => { running = false; window.cancelAnimationFrame(frame); };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouseX = event.clientX / Math.max(width, 1); mouseY = event.clientY / Math.max(height, 1);
    };
    const onPointerLeave = () => { mouseX = 0.5; mouseY = 0.5; };
    const onMotionChange = () => {
      if (motionQuery.matches) { stop(); meteors = []; draw(0); } else start();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop(); else start();
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

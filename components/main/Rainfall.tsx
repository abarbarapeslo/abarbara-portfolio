"use client";

import { useEffect, useRef } from "react";

type Drop = {
  x: number;
  y: number;
  length: number;
  speed: number;
  drift: number;
  alpha: number;
  width: number;
};

type Ripple = { x: number; y: number; age: number; life: number };

/** Lightweight canvas rain with soft impacts where drops meet the lake. */
export default function Rainfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let drops: Drop[] = [];
    let ripples: Ripple[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(650, Math.max(150, Math.round((width * height) / 4000)));
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 9 + Math.random() * 17,
        speed: 360 + Math.random() * 470,
        drift: 42 + Math.random() * 46,
        alpha: 0.09 + Math.random() * 0.2,
        width: 0.45 + Math.random() * 0.55,
      }));
    };

    const draw = (time: number) => {
      if (document.hidden) {
        previousTime = time;
        frame = requestAnimationFrame(draw);
        return;
      }

      const delta = Math.min((time - (previousTime || time)) / 1000, 0.032);
      previousTime = time;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "#dcedf3";
      context.lineCap = "round";

      const waterline = height * 0.69;
      drops.forEach((drop) => {
        const previousY = drop.y;
        drop.x += drop.drift * delta;
        drop.y += drop.speed * delta;
        if (previousY < waterline && drop.y >= waterline && Math.random() < 0.2) {
          ripples.push({ x: drop.x, y: waterline + Math.random() * height * 0.24, age: 0, life: 0.7 + Math.random() * 0.5 });
        }
        if (drop.y - drop.length > height || drop.x > width + 10) {
          drop.x = Math.random() * (width * 0.8);
          drop.y = -drop.length - Math.random() * height * 0.25;
        }
        context.globalAlpha = drop.alpha;
        context.lineWidth = drop.width;
        context.beginPath();
        context.moveTo(drop.x, drop.y - drop.length);
        context.lineTo(drop.x + drop.drift * 0.035, drop.y);
        context.stroke();
      });

      context.strokeStyle = "#d7c77f";
      context.lineWidth = 0.8;
      ripples = ripples.filter((ripple) => {
        ripple.age += delta;
        const progress = ripple.age / ripple.life;
        if (progress >= 1) return false;
        context.globalAlpha = (1 - progress) * 0.18;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, 2 + progress * 9, 0.8 + progress * 2.1, 0, 0, Math.PI * 2);
        context.stroke();
        return true;
      });

      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-rainfall" aria-hidden="true" />;
}

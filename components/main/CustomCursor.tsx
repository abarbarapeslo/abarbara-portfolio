"use client";

import { useEffect, useRef } from "react";

/**
 * Creative custom cursor: a precise dot + a lagging ring that catches up with
 * a per-frame lerp (no framer). Uses mix-blend-mode: difference so it inverts
 * against whatever is underneath, and the ring swells over interactive targets.
 * Only active for fine pointers; hidden entirely on touch.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.setAttribute("data-custom-cursor", "");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let raf = 0;

    // Hidden while the preloader runs, and after it until the visitor actually
    // moves the pointer — then it appears right under the pointer instead of
    // sliding in from the centre of the screen.
    let loaderDone = document.documentElement.hasAttribute("data-preloader-done");
    let visible = false;
    const setOpacity = (v: string) => {
      dot.style.opacity = v;
      ring.style.opacity = v;
    };
    setOpacity("0");
    const onLoaderDone = () => {
      loaderDone = true;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (loaderDone && !visible) {
        visible = true;
        rx = mx;
        ry = my;
        setOpacity("1");
      }
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]'
      );
      if (interactive !== hovering) {
        hovering = interactive;
        ring.dataset.hover = hovering ? "true" : "false";
      }
    };
    const onDown = () => (ring.dataset.down = "true");
    const onUp = () => (ring.dataset.down = "false");
    const onLeave = () => setOpacity("0");
    const onEnter = () => {
      if (visible) setOpacity("1");
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("preloaderdone", onLoaderDone);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("preloaderdone", onLoaderDone);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeAttribute("data-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-hover="false" data-down="false" aria-hidden />
    </>
  );
};

export default CustomCursor;

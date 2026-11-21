"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

/**
 * Site-wide Lenis smooth scroll, driven by GSAP's ticker so every
 * ScrollTrigger (journey timeline, progress bar, hero parallax, card
 * effects) reads the same smoothed position on the same frame.
 *
 * - autoToggle: Lenis pauses itself whenever <html> has overflow:hidden,
 *   which is how the preloader and the mobile menu lock scrolling.
 * - anchors: in-page links (#about-me, #projects …) glide instead of jump.
 * - allowNestedScroll: scrollable panels (e.g. the AI assistant chat) keep
 *   their own native scrolling.
 * - respectReducedMotion (Lenis default): smoothing off for those users.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: -12, duration: 1.4 },
      autoToggle: true,
      allowNestedScroll: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}

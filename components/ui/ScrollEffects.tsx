"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Declarative scroll-scrubbed effects. Mark elements with data attributes and
 * this wires one GSAP ScrollTrigger each (smoothed by Lenis via SmoothScroll):
 *
 *   data-parallax="12"   inner image drifts ±12% inside its (overflow-hidden)
 *                        frame while the frame crosses the viewport. Give the
 *                        element extra size (e.g. scale-[1.2]) so edges never show.
 *   data-scroll-settle   scales 0.94 → 1 and fades 0.6 → 1 as it enters.
 *
 * Skipped entirely under prefers-reduced-motion. Mount once, after the page
 * content (it queries the DOM on mount).
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-settle]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.94, opacity: 0.6, transformOrigin: "50% 100%" },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });
    });

    // images/fonts settling can shift layout — recompute trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}

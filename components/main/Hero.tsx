"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiArrowDown, HiOutlineEnvelope } from "react-icons/hi2";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Typewriter from "@/components/ui/Typewriter";
import { VideoBackground } from "@/components/ui/VideoBackground";
import AgentTerminal from "@/components/ui/AgentTerminal";
import Rainfall from "@/components/main/Rainfall";

/**
 * Hero — full-bleed WebGL "Waves" shader behind the headline.
 *
 * Background is components/ui/adisyon-shader (21st.dev Shader Builder, zero
 * dependencies, one WebGL1 canvas) with its built-in cursor interaction
 * enabled, so the wave field swirls under the pointer. It does NOT consult
 * prefers-reduced-motion, so it animates everywhere.
 *
 * The shader's palette is a BEACH recipe (deep water -> foam -> sand)
 * rather than restyling the rest of the site: the hero was previously the only
 * dark section on a light site, which read as a transplant. Same hues, raised
 * values — so the hero now belongs to the page and no other section changed.
 *
 * HeroChip (the 3D AI chip) and HeroDither are intentionally no longer
 * rendered here. Both files are kept in components/main/ — the chip is only
 * unmounted from this section, not deleted.
 */
const ShaderBackground = dynamic(
  () => import("@/components/ui/adisyon-shader").then((m) => m.ShaderBackground),
  { ssr: false, loading: () => <div className="h-full w-full bg-[#EFE2C4]" /> }
);

/**
 * Keep this scene independent of the page copy so its still image and motion
 * can be tuned without changing the portfolio content.
 */
const heroBackground = "illustration" as "illustration" | "beach" | "water" | "shader";

/** Titles the gradient line types, holds, erases and cycles through. */
const roles = ["Full-Stack Software Developer"];

// Only the two figures that already existed in this codebase are kept here.
// "40 hrs manual work automated" and "IEEE accepted research" were removed as
// requested: credentials and vague automation claims do not convert clients.
// Replacements are intentionally NOT invented — add real numbers you can
// stand behind (users served, uptime, cost saved, repeat-client rate).
const stats: { prefix?: string; value: number; suffix?: string; label: string }[] = [
  { value: 5, suffix: "+", label: "Client projects delivered" },
  { value: 4, suffix: "+", label: "Years of experience" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/**
 * Counts up to the figure on mount. A number that visibly resolves reads as
 * measured rather than decorative, which is the point of putting it in front
 * of a prospective client.
 */
function StatValue({
  prefix,
  value,
  suffix,
}: {
  prefix?: string;
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = { v: 0 };
    const tween = gsap.to(target, {
      v: value,
      duration: 1.6,
      delay: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = String(Math.round(target.v));
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span className="font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll-linked exit: the copy lifts and dissolves as the hero scrolls away,
  // so the hand-off to the next section is a move rather than a cut.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // depth: the video lags behind and slowly zooms, the terminal rises
      // faster than the copy — three layers moving at three speeds.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const out = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(bgRef.current, { yPercent: 22, scale: 1.08, ease: "none", scrollTrigger: out });
        gsap.to(terminalRef.current, { y: -90, ease: "none", scrollTrigger: out });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#101d2b]"
    >
      {/* The supplied illustration stays at its original AVIF quality. */}
      <div ref={bgRef} className="hero-scene absolute inset-0 z-0 will-change-transform" aria-hidden="true">
        {heroBackground === "illustration" ? (
          <>
            <div className="hero-scene__layer hero-scene__base" />
            <div className="hero-scene__layer hero-scene__clouds" />
            <div className="hero-scene__layer hero-scene__foliage" />
            <div className="hero-scene__layer hero-scene__water" />
            <Rainfall />
          </>
        ) : heroBackground === "shader" ? (
          <ShaderBackground className="h-full w-full" />
        ) : (
          <VideoBackground clip={heroBackground} className="h-full w-full" />
        )}
      </div>

      {/* left-weighted scrim so the copy reads over the wave crests */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(7,15,26,0.76) 0%, rgba(7,15,26,0.56) 38%, rgba(7,15,26,0.2) 72%, rgba(7,15,26,0.04) 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:pt-28 xl:flex xl:items-center xl:justify-between xl:gap-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col items-start gap-6"
        >
          <motion.h1
            variants={item}
            className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {/* screen readers get the full title once, not every keystroke */}
            <span className="sr-only">{`Bárbara Peslo, ${roles.join(", ")}`}</span>
            <span aria-hidden>
              <Typewriter
                speed={70}
                startDelay={500}
                holdMs={2000}
                lines={[
                  { text: "Bárbara Peslo" },
                  {
                    text: roles[0],
                    words: roles,
                    className: "mt-2 whitespace-normal text-[1.55rem] leading-tight sm:text-5xl lg:text-7xl",
                    textClassName:
                      "bg-linear-to-r from-aurora-moon via-aurora-sky to-aurora-moon bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(7,20,34,0.45)]",
                  },
                ]}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            I build web products, scalable platforms, and AI solutions. My goal
            is to create practical, user-centered solutions that deliver value
            to my clients.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <ShimmerButton href="#projects" variant="dark" moving={false}>
              View my work
              <HiArrowDown className="h-4 w-4" />
            </ShimmerButton>
            <ShimmerButton href="#contact" variant="light">
              <HiOutlineEnvelope className="h-4 w-4" />
              Get in touch
            </ShimmerButton>
            <div className="ml-1 flex items-center gap-1">
              {[
                { Icon: FaGithub, href: "https://github.com/abarbarapeslo" },
                {
                  Icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/barbarapeslo/",
                },
              ].map(({ Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/70 text-zinc-500 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:text-zinc-900"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-4 grid w-full max-w-xl grid-cols-2 gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="hero-stat crystal crystal-light rounded-2xl px-5 py-4"
              >
                <StatValue prefix={s.prefix} value={s.value} suffix={s.suffix} />
                <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-900">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* right side: the agent-run terminal floats over the video. Only on
            wide screens — below xl the copy needs the full width. */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
          className="hidden w-[420px] shrink-0 xl:block"
        >
          <div ref={terminalRef}>
            <AgentTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

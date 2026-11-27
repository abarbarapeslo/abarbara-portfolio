"use client";

import React from "react";
import Image from "next/image";
import { HiOutlineSparkles, HiOutlineHome } from "react-icons/hi2";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

type Project = {
  name: string;
  category: string;
  description: string;
  tech: string[];
  Icon: React.ComponentType<{ className?: string }>;
  /** Optional cover screenshot; the gradient tint stands in when absent. */
  image?: string;
  imageMode?: "ambient" | "logo";
  href: string;
  preview?: "natta";
  status?: string;
  actionLabel?: string;
  from: string;
  to: string;
};

const projects: Project[] = [
  {
    name: "Weeflow",
    category: "Urban discovery · Gamified experiences",
    description:
      "An urban discovery platform that turns the city into a playground, combining gamified missions, challenges and rewards with immersive local experiences and an integrated marketplace.",
    tech: ["Gamified missions", "Local experiences", "Marketplace"],
    Icon: HiOutlineHome,
    image: "/experience/weeflow-logo.png",
    imageMode: "logo",
    href: "https://weeflow.com.br/",
    from: "from-aurora-violet/35",
    to: "to-aurora-moon/10",
  },
  {
    name: "NATTA",
    category: "Global opportunities · Application management",
    description:
      "A platform for discovering global opportunities and managing applications in one place, with AI-assisted search, an application dashboard and deadline-conflict alerts.",
    tech: ["Opportunity discovery", "Application tracking", "Deadline management"],
    Icon: HiOutlineSparkles,
    image: "/experience/natta-platform-fhd.webp",
    imageMode: "ambient",
    href: "https://natta.pro/",
    status: "Site currently suspended",
    from: "from-aurora-blue/35",
    to: "to-aurora-moon/10",
  },
  {
    name: "WoHackers · Rio Hackathon",
    category: "Community · Hackathon production",
    description:
      "Led the Rio de Janeiro chapter of a tech community for women and hosted the FIAP × Solana hackathon, bringing new talent into blockchain and AI projects.",
    tech: ["Community leadership", "Hackathons", "FIAP", "Solana", "AI", "Blockchain"],
    Icon: HiOutlineSparkles,
    image: "/experience/wohackers-host-fhd.webp",
    imageMode: "ambient",
    href: "#experience",
    actionLabel: "Community experience",
    from: "from-aurora-violet/25",
    to: "to-aurora-moon/15",
  },
];
const projectOrder = ["NATTA", "WoHackers · Rio Hackathon", "Weeflow"];
const orderedProjects = projectOrder
  .map((name) => projects.find((project) => project.name === name))
  .filter((project): project is Project => Boolean(project));
const Cover = ({ p }: { p: Project }) => (
  <div
    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line"
  >
    {/* gradient tint shows while the image loads, and stands in when a
        project has no screenshot yet */}
    <div className={`absolute inset-0 ${p.imageMode === "logo" ? "bg-white" : `bg-linear-to-br ${p.from} ${p.to}`}`} />
    {p.image && (
      // oversized layer drifts inside the frame on scroll (ScrollEffects)
      <div data-parallax="7" className={`project-cover-art absolute inset-0 scale-[1.18]${p.imageMode === "logo" ? " project-cover-art-logo" : " project-cover-art-ambient"}`}>
        <Image
          src={p.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="project-cover-image object-cover object-[center_65%] transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </div>
    )}
    {p.preview === "natta" && (
      <div className="absolute inset-0 overflow-hidden bg-[#111326] p-5 text-white sm:p-8" aria-label="Illustrative NATTA product preview">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="font-display text-sm font-semibold tracking-[0.22em]">NATTA</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/65">Illustrative preview</span>
          </div>
          <p className="max-w-sm font-display text-2xl font-semibold leading-tight sm:text-3xl">Find your next opportunity.</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {[
              ["Discover", "AI-assisted search"],
              ["Organize", "Applications dashboard"],
              ["Stay on track", "Deadline alerts"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
                <span className="block text-xs font-medium text-white/90">{title}</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-white/50">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    {/* legibility wash for the corner icon */}
    {p.imageMode !== "logo" && <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/10" />}
    {p.imageMode !== "logo" && <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md">
      <p.Icon className="h-5 w-5" />
    </span>}
    {/* without a screenshot the tile would read as empty - centre the mark */}
      {!p.image && !p.preview && (
      <p.Icon className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white/45" />
    )}
    {p.status && (
      <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
        {p.status}
      </span>
    )}
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="zoom"
        eyebrow="Selected Work"
        title={
          <>
            Things I&apos;ve <span className="text-gradient-aurora">built</span>
          </>
        }
        subtitle="Digital products and community experiences shaped by curiosity, collaboration and thoughtful technology."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {orderedProjects.map((p, i) => (
          <Reveal
            key={p.name}
            variant="rise"
            delay={i * 130}
            className=""
          >
            <GlassCard tilt className="flex h-full flex-col p-5">
              <a
                href={p.href}
                target={p.href.startsWith("#") ? undefined : "_blank"}
                rel={p.href.startsWith("#") ? undefined : "noopener noreferrer"}
                aria-label={`Open ${p.name} product site`}
                className="group block"
              >
                <Cover p={p} />
              </a>
              <div className="flex flex-1 flex-col px-1 pt-5">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg4">
                  {p.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-fg">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg3">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <a
                  href={p.href}
                  target={p.href.startsWith("#") ? undefined : "_blank"}
                  rel={p.href.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-fg transition-colors hover:text-aurora-violet"
                >
                  {p.actionLabel ?? (p.status ? "Visit site (currently unavailable)" : p.href.startsWith("#") ? "Read experience" : "Visit product")}
                  <FiArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button href="https://github.com/abarbarapeslo" target="_blank" variant="ghost">
          <FiGithub className="h-4 w-4" />
          More on GitHub
        </Button>
      </div>
    </section>
  );
};

export default Projects;

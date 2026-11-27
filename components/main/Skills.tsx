"use client";

import React from "react";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiDotnet,
  SiLangchain,
  SiReact,
  SiNodedotjs,
  SiFlask,
  SiDjango,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiGit,
  SiPostgresql,
  SiFastapi,
  SiMariadb,
  SiTailwindcss,
  SiLinux,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Marquee from "@/components/ui/Marquee";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";

type Tech = { name: string; icon: React.ReactNode };

const technologies: Tech[] = [
  { name: "Python", icon: <SiPython color="#3776AB" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "C#", icon: <SiDotnet color="#512BD4" /> },
  { name: "LangChain", icon: <SiLangchain color="#1C3C3C" /> },
  { name: "React", icon: <SiReact color="#61DAFB" /> },
  { name: "React Native", icon: <TbBrandReactNative color="#61DAFB" /> },
  { name: "Node.js", icon: <SiNodedotjs color="#339933" /> },
  { name: "Flask", icon: <SiFlask color="#000" /> },
  { name: "Django", icon: <SiDjango color="#092E20" /> },
  { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "Redis", icon: <SiRedis color="#DC382D" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "Kubernetes", icon: <SiKubernetes color="#326CE5" /> },
  { name: "AWS", icon: <FaAws color="#232F3E" /> },
  { name: "Azure", icon: <VscAzure color="#0078D4" /> },
  { name: "GCP", icon: <SiGooglecloud color="#4285F4" /> },
  { name: "Git", icon: <SiGit color="#F05032" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169E1" /> },
  { name: "FastAPI", icon: <SiFastapi color="#009688" /> },
  { name: "MariaDB", icon: <SiMariadb color="#003545" /> },
  { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Linux", icon: <SiLinux color="#FCC624" /> },
];

const firstRow = technologies.slice(0, 13);
const secondRow = technologies.slice(13);

const Pill = ({ name, icon }: Tech) => (
  <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white/70 px-5 py-3 shadow-soft backdrop-blur-sm">
    <span className="text-xl">{icon}</span>
    <span className="whitespace-nowrap text-sm font-medium text-fg2">{name}</span>
  </div>
);

const categories = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "C#"] },
  { title: "AI & Automation", items: ["LangChain"] },
  { title: "Frontend & Mobile", items: ["React", "React Native", "Tailwind"] },
  { title: "Backend & Frameworks", items: ["Node.js", "Flask", "Django", "FastAPI"] },
  { title: "Databases & Cache", items: ["MySQL", "PostgreSQL", "MariaDB", "MongoDB", "Redis"] },
  { title: "Cloud & DevOps", items: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux"] },
  { title: "Version Control", items: ["Git"] },
];

const Skills = () => {
  return (
    <section id="skills" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="flip"
        eyebrow="Toolbox"
        title={
          <>
            The stack behind <span className="text-gradient-aurora">the work</span>
          </>
        }
        subtitle="My toolkit for building full-stack products, from application code to cloud infrastructure."
      />

      <div className="mt-14 flex flex-col gap-4">
        <Marquee duration="38s">
          {firstRow.map((s) => (
            <Pill key={s.name} {...s} />
          ))}
        </Marquee>
        <Marquee duration="50s" reverse>
          {secondRow.map((s) => (
            <Pill key={s.name} {...s} />
          ))}
        </Marquee>
      </div>

      <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <GlassCard key={c.title} spotlight className="h-full p-6">
            <h3 className="font-display text-base font-semibold text-fg">
              {c.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.items.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </GlassCard>
        ))}
      </Reveal>
    </section>
  );
};

export default Skills;

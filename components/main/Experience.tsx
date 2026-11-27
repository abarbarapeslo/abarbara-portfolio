"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCpuChip,
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
} from "react-icons/hi2";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

type Role = {
  company: string;
  role: string;
  period?: string;
  location?: string;
  summary?: string;
  points: string[];
  tags: string[];
  Icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
};

const roles: Role[] = [
  {
    company: "Softplan",
    role: "Software Analyst Jr",
    period: "Feb 2026 – Present",
    current: true,
    Icon: HiOutlineCpuChip,
    points: [
      "Built AI-powered workflow automations that integrate corporate systems through REST APIs and LLMs, using OpenAI, LangChain, RAG and MCP.",
      "Developed backend automation in .NET (C#) connecting systems and databases, cutting rework and increasing traceability and governance of digital workflows.",
      "Monitored application behavior and analyzed logs with Datadog to support stability and availability.",
      "Validated integrations with Postman and pytest, containerized apps with Docker Compose and structured KPIs, working in agile squads with Jira.",
    ],
    tags: ["LLMs", "LangChain", "RAG", "MCP", ".NET", "Datadog", "Docker"],
  },
  {
    company: "Norsk Hydro",
    role: "Software Engineer Intern",
    period: "May 2024 – Aug 2025",
    Icon: HiOutlineShieldCheck,
    points: [
      "Led the project, architecture and implementation of an incident monitoring and operational governance platform that automated incident management and consolidated KPIs, using Python, REST APIs, Zabbix, ServiceNow, Power BI and MySQL.",
      "Integrated systems and digital platforms via REST APIs and LLMs, validated with Postman and pytest.",
      "Modeled SQL databases and applied Clean Code, Clean Architecture and Design System practices in JavaScript, TypeScript and .NET.",
      "Orchestrated Kubernetes deployments on AWS and Azure and managed tasks in Jira.",
    ],
    tags: ["Python", "REST APIs", "ServiceNow", "Power BI", "Kubernetes", "AWS", "Azure"],
  },
  {
    company: "NATTA",
    role: "Co-founder",
    summary: "An AI platform for discovering, applying to and managing academic and professional opportunities — such as scholarships, fellowships, accelerators and international programs. An edtech accelerated by Go Together.",
    Icon: HiOutlineSparkles,
    points: [
      "Co-founded the company and work at the intersection of product, technology and business.",
      "Coordinate the development of the platform, its AI integrations and its monetization model.",
      "Lead growth, strategic partnerships and the company's institutional positioning.",
    ],
    tags: ["Product", "AI integrations", "Growth", "Partnerships"],
  },
  {
    company: "Weeflow",
    role: "Product & Tokenomics",
    Icon: HiOutlineSquares2X2,
    points: [
      "Designed the tokenomics and reward mechanics of an MVP reward system.",
      "Defined the structure of the weecoin economy and its exchange-rate anchoring.",
    ],
    tags: ["Tokenomics", "Product design", "Reward systems"],
  },
  {
    company: "Equinix",
    role: "Software Engineer Intern",
    period: "Feb 2022 – Apr 2024",
    Icon: HiOutlineCodeBracket,
    points: [
      "Built and maintained web applications with JavaScript, React and Node.js supporting corporate processes.",
      "Built REST integrations between Azure, AWS, Zabbix, ServiceNow and Grafana with Node.js, .NET (C#) and Python, automating incident creation and operational data consolidation.",
      "Monitored applications and infrastructure with Datadog, Zabbix and Grafana, supporting log analysis and incident investigation.",
      "Created a CI/CD pipeline (build, lint, audit), contributed to database architecture and took part in code reviews and documentation.",
    ],
    tags: ["JavaScript", "React", "Node.js", ".NET", "Python", "Datadog", "CI/CD"],
  },
  {
    company: "WoHackers",
    role: "Regional Leader",
    period: "1 year",
    location: "Community · Rio de Janeiro",
    Icon: HiOutlineSparkles,
    points: [
      "Lead the Rio de Janeiro chapter of a tech community for women and host hackathons.",
      "Delivered the Rio hackathon with FIAP and Solana, producing new talent and blockchain and AI projects. Won my first hackathon.",
    ],
    tags: ["Community", "Hackathons", "FIAP", "Solana", "AI", "Blockchain"],
  },
];

const experienceOrder = ["Softplan", "Norsk Hydro", "Equinix", "NATTA", "WoHackers", "Weeflow"];
const orderedRoles = experienceOrder
  .map((company) => roles.find((role) => role.company === company))
  .filter((role): role is Role => Boolean(role));

// switchback x-positions (% of width) - kept in the central gutter so the road
// connects at each card's inner edge and weaves between the columns, never
// crossing a card face.
const NODE_X = [44, 56, 43, 57, 45, 55];

// Catmull-Rom -> cubic bezier smooth path through points
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<SVGPathElement>(null);
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  // measure node centers and build the winding road through them
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const measure = () => {
      const cr = c.getBoundingClientRect();
      const pts = nodeRefs.current
        .filter(Boolean)
        .map((n) => {
          const r = (n as HTMLDivElement).getBoundingClientRect();
          return [r.left + r.width / 2 - cr.left, r.top + r.height / 2 - cr.top] as [number, number];
        });
      setSize({ w: c.clientWidth, h: c.clientHeight });
      setPath(smoothPath(pts));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(c);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  // GSAP: draw the road as you scroll
  useEffect(() => {
    const p = progressRef.current;
    if (!p || !path) return;
    gsap.registerPlugin(ScrollTrigger);
    const len = p.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 68%",
          end: "bottom 82%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [path]);

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="skew"
        title={
          <>
            My <span className="text-gradient-aurora">journey</span>
          </>
        }
        subtitle="Experience across software, product and community — building useful systems and bringing people together."
      />

      <div ref={containerRef} className="relative mt-16">
        {/* winding road (desktop) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* untravelled trail (dotted) */}
          <path d={path} stroke="rgba(71,85,105,0.22)" strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" />
          {/* travelled road, drawn on scroll */}
          <path
            ref={progressRef}
            d={path}
            stroke="url(#road)"
            strokeWidth={4.5}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(71,85,105,0.4))" }}
          />
        </svg>

        {/* straight dotted line (mobile) */}
        <div className="pointer-events-none absolute left-[23px] top-2 h-[calc(100%-1rem)] border-l-2 border-dashed border-aurora-violet/25 md:hidden" />

        <div className="flex flex-col">
          {orderedRoles.map((r, i) => {
            const nx = NODE_X[i % NODE_X.length];
            const left = nx < 50;
            return (
              <Reveal
                key={r.company + r.period}
                variant="fade"
                delay={40}
                className="relative py-6 md:grid md:grid-cols-2 md:gap-x-28 md:py-8"
              >
                {/* node */}
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  style={{ ["--nx" as string]: `${nx}%` }}
                  className="timeline-node absolute top-10 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-line bg-white/90 text-aurora-violet shadow-glow backdrop-blur-sm md:top-1/2"
                >
                  {r.current && (
                    <span
                      className="absolute inset-0 animate-ping rounded-2xl border border-aurora-violet/40"
                      style={{ animationDuration: "2.5s" }}
                    />
                  )}
                  <r.Icon className="h-6 w-6" />
                </div>

                {/* card */}
                <div className={cn("pl-16 md:pl-0", left ? "md:col-start-1 md:pr-6" : "md:col-start-2 md:pl-6")}>
                  <div className="glass experience-card p-6 sm:p-7">
                    <div className="experience-card-content">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-fg">
                          {r.role}
                          <span className="text-fg3"> · {r.company}</span>
                        </h3>
                        {(r.period || r.location) && <div className="mt-0.5 text-sm text-fg4">{[r.period, r.location].filter(Boolean).join(" · ")}</div>}
                      </div>
                      {r.current && <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-aurora-teal"><span className="h-1.5 w-1.5 rounded-full bg-aurora-teal shadow-[0_0_8px_2px_rgba(140,115,59,0.45)]" />Current</span>}
                    </div>
                    {r.summary && <p className="experience-summary">{r.summary}</p>}

                    <ul className="mt-4 flex flex-col gap-2.5">
                      {r.points.map((p, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-fg2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-violet" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-fg3"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

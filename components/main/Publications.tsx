"use client";

import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const certs = [
  { name: "Yellow Belt", issuer: "Six Sigma", year: "2026" },
  { name: "Python", issuer: "Ada", year: "2022" },
];

const Publications = () => (
  <section id="publications" className="mx-auto w-full max-w-4xl px-5 py-16 sm:py-24">
    <SectionHeading
      reveal="blur"
      eyebrow="Professional development"
      title="Certifications"
    />

    <Reveal stagger className="mt-14 grid gap-4 sm:grid-cols-2">
      {certs.map((c) => (
        <div key={c.name} className="glass-soft flex items-start gap-3 p-5">
          <HiOutlineAcademicCap className="mt-0.5 h-5 w-5 shrink-0 text-aurora-violet" />
          <div>
            <div className="text-sm font-semibold text-fg">{c.name}</div>
            <div className="mt-0.5 text-xs text-fg4">
              {c.issuer ? `${c.issuer} · ` : ""}{c.year}
            </div>
          </div>
        </div>
      ))}
    </Reveal>
  </section>
);

export default Publications;

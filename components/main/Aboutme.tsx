"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import ShimmerButton from "@/components/ui/ShimmerButton";

const socials = [
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/barbarapeslo/", hover: "hover:text-aurora-blue" },
  { Icon: FaGithub, href: "https://github.com/abarbarapeslo", hover: "hover:text-zinc-900" },
];

const Aboutme = () => {
  return (
    <section id="about-me" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="blur"
        eyebrow="About"
        title={
          <>
            Full-Stack Software Developer
          </>
        }
      />

      <div className="mt-14">
        <Reveal>
          <div data-scroll-settle>
          <GlassCard className="h-full p-8 sm:p-10">
            <div className="space-y-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              <p>
                I&apos;m Bárbara, a full-stack developer with 4+ years of experience. I enjoy solving complex problems, building scalable systems and writing clean, maintainable code, and I love bringing AI and automation into real products.
              </p>
              <p className="text-zinc-500">
                Outside of work, I lead a tech community for women in Rio de Janeiro and host hackathons.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShimmerButton href="#contact" variant="dark">
                <HiOutlineEnvelope className="h-4 w-4" />
                Get in touch
              </ShimmerButton>
              <div className="flex items-center gap-2">
                {socials.map(({ Icon, href, hover }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    className={`grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/70 text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 ${hover}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                ))}
              </div>
            </div>
          </GlassCard>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Aboutme;

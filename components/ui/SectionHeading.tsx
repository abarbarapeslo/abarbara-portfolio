"use client";

import React from "react";
import { cn } from "@/utils/cn";
import ScrollReveal, { type RevealVariant } from "@/components/ui/ScrollReveal";

interface Props {
  /** Deprecated: badges removed site-wide. Kept so callers still type-check. */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  /** Scroll-reveal motion for this section header (varies per section). */
  reveal?: RevealVariant;
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  align = "center",
  reveal = "rise",
  className,
}: Props) => {
  return (
    <ScrollReveal
      variant={reveal}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <h2 className="section-heading-title font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "section-heading-subtitle max-w-2xl text-base leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
};

export default SectionHeading;

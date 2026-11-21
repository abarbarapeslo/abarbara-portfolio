"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

/**
 * A line either types `text` once, or — when `words` is given — rotates
 * forever: type a word, hold, backspace, type the next. A rotating line
 * should be the LAST line (lines after it would never get their turn).
 */
export type TypeLine = {
  text: string;
  /** classes for the line box (spacing, size, nowrap) */
  className?: string;
  /** classes for the typed text only. Put gradient / bg-clip-text styles
   *  HERE, not in className: background-clip:text paints through every
   *  glyph in the element, including the hidden not-yet-typed remainder. */
  textClassName?: string;
  words?: string[];
};

interface Props {
  lines: TypeLine[];
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
  /** ms pause between lines */
  linePause?: number;
  /** rotating lines: ms a finished word stays on screen */
  holdMs?: number;
  /** rotating lines: ms per character while backspacing */
  deleteSpeed?: number;
  caretClassName?: string;
  className?: string;
}

/**
 * Multi-line typewriter. Reserves each line's layout box up-front (invisible
 * remainder) so nothing below jumps while it types. Pure React + setTimeout.
 */
const Typewriter = ({
  lines,
  speed = 60,
  startDelay = 350,
  linePause = 320,
  holdMs = 1800,
  deleteSpeed = 35,
  caretClassName,
  className,
}: Props) => {
  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0));
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  // rotation state for the active line (only used when it has `words`)
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const textOf = (i: number) => {
    const words = lines[i].words;
    return words?.length ? words[i === active ? wordIndex % words.length : 0] : lines[i].text;
  };

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || active >= lines.length) return;
    const words = lines[active].words;
    const rotating = !!words && words.length > 1;
    const full = textOf(active);
    const n = counts[active];
    const setN = (v: number) =>
      setCounts((prev) => {
        const c = [...prev];
        c[active] = v;
        return c;
      });

    let t: ReturnType<typeof setTimeout>;
    if (!deleting && n < full.length) {
      t = setTimeout(() => setN(n + 1), speed);
    } else if (!rotating) {
      t = setTimeout(() => setActive((a) => a + 1), linePause);
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (n > 0) {
      t = setTimeout(() => setN(n - 1), deleteSpeed);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((w) => w + 1);
      }, linePause);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, active, counts, lines, speed, linePause, holdMs, deleteSpeed, deleting, wordIndex]);

  const caretLine = Math.min(active, lines.length - 1);

  return (
    <span className={className}>
      {lines.map((line, i) => {
        const full = textOf(i);
        const shown = full.slice(0, counts[i]);
        const rest = full.slice(counts[i]);
        return (
          <span key={i} className={cn("block", line.className)}>
            <span className={line.textClassName}>{shown}</span>
            {i === caretLine && (
              <span
                aria-hidden
                className={cn(
                  "ml-1 inline-block w-[3px] -translate-y-[0.06em] animate-blink rounded-sm bg-aurora-violet align-middle",
                  caretClassName
                )}
                style={{ height: "0.92em" }}
              />
            )}
            <span className="opacity-0" aria-hidden>
              {rest || " "}
            </span>
          </span>
        );
      })}
    </span>
  );
};

export default Typewriter;

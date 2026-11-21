"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * AgentTerminal — a frosted-glass terminal that "runs" a RAG agent: types the
 * command, then each pipeline step resolves (spinner → ✓) in turn, ends on a
 * deployed badge, holds, and loops. It is a stylised demo of the kind of
 * system shown in the Work section, not a live process.
 *
 * Idea from Magic UI's Terminal (MIT); written here from scratch on
 * framer-motion so it matches the site's glass cards and needs no new deps.
 *
 * - Pauses while off-screen or while the tab is hidden.
 * - prefers-reduced-motion: renders the finished run, no animation.
 */

type Step = { mark: "✓" | "→"; label: string; detail: string };

const command = 'agent run "Q3 contract risks"';

const steps: Step[] = [
  { mark: "✓", label: "plan", detail: "3 steps · search → extract → cite" },
  { mark: "✓", label: "retrieve", detail: "12 chunks · pgvector · 38 ms" },
  { mark: "✓", label: "rerank", detail: "top 4 · cross-encoder" },
  { mark: "→", label: "tool", detail: "extract_clauses(contracts[4])" },
  { mark: "✓", label: "answer", detail: "streamed · 1.2 s · 4 citations" },
];

const typeMs = 38;
const stepMs = 720; // spinner time per step before it resolves
const holdMs = 4200; // finished run stays on screen
const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function AgentTerminal({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0); // chars of the command shown
  const [resolved, setResolved] = useState(0); // steps finished
  const [deployed, setDeployed] = useState(false);
  const [run, setRun] = useState(0); // bumps to restart the loop
  const [active, setActive] = useState(false); // on-screen and tab visible
  const [spin, setSpin] = useState(0);
  const [reduced, setReduced] = useState(false);

  // visibility gating: only animate while it can actually be seen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let inView = false;
    const sync = () => setActive(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // the run itself: type → steps → deployed → hold → restart
  useEffect(() => {
    if (!active || reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (typed < command.length) {
      t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 700 : typeMs);
    } else if (resolved < steps.length) {
      t = setTimeout(() => setResolved((n) => n + 1), stepMs);
    } else if (!deployed) {
      t = setTimeout(() => setDeployed(true), 450);
    } else {
      t = setTimeout(() => {
        setTyped(0);
        setResolved(0);
        setDeployed(false);
        setRun((r) => r + 1);
      }, holdMs);
    }
    return () => clearTimeout(t);
  }, [active, reduced, typed, resolved, deployed]);

  // braille spinner for the step currently "running"
  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setSpin((s) => (s + 1) % spinnerFrames.length), 80);
    return () => clearInterval(id);
  }, [active, reduced]);

  const shownTyped = reduced ? command.length : typed;
  const shownResolved = reduced ? steps.length : resolved;
  const shownDeployed = reduced || deployed;
  const commandDone = shownTyped >= command.length;
  const running = commandDone && shownResolved < steps.length;

  return (
    <div
      ref={rootRef}
      className={cn(
        "crystal crystal-light overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl",
        className
      )}
      role="img"
      aria-label="Demo: an AI agent retrieving, reranking, calling a tool and streaming a cited answer"
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-zinc-500">~/agents — rag-pipeline</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          live
        </span>
      </div>

      {/* body — fixed height so the hero never reflows as lines appear */}
      <div className="h-[248px] px-5 py-4 font-mono text-[13px] leading-[1.75] text-zinc-700" aria-hidden>
        <div className="flex">
          <span className="mr-2 text-aurora-violet">$</span>
          <span className="text-zinc-900">
            {command.slice(0, shownTyped)}
            {!commandDone && (
              <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[0.15em] animate-blink bg-zinc-800" />
            )}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {commandDone &&
            steps.slice(0, Math.min(shownResolved + 1, steps.length)).map((step, i) => {
              const done = i < shownResolved;
              return (
                <motion.div
                  key={`${run}-${step.label}`}
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex whitespace-nowrap"
                >
                  <span
                    className={cn(
                      "mr-2 w-3 shrink-0 text-center",
                      done ? (step.mark === "→" ? "text-aurora-blue" : "text-emerald-600") : "text-zinc-400"
                    )}
                  >
                    {done ? step.mark : spinnerFrames[spin]}
                  </span>
                  <span className="w-[72px] shrink-0 text-zinc-900">{step.label}</span>
                  <span className={cn("truncate", done ? "text-zinc-500" : "text-zinc-400")}>
                    {done ? step.detail : "…"}
                  </span>
                </motion.div>
              );
            })}
        </AnimatePresence>

        <AnimatePresence>
          {shownDeployed && !running && (
            <motion.div
              key={`deployed-${run}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-2 flex items-center gap-2"
            >
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                ● deployed
              </span>
              <span className="text-[11px] text-zinc-500">FastAPI + Next.js · p95 1.4 s</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

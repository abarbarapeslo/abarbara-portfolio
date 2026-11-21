"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * AmbientSound — opt-in sea-shore ambience.
 *
 * OFF by default: unsolicited audio is the fastest way to make a recruiter
 * close a tab. Instead, shortly after the preloader exits, a small
 * non-blocking card above the toggle asks once whether the visitor wants
 * sound. The answer is remembered:
 *   - "on"  → on later visits, playback resumes on the first click/keypress
 *             (browsers forbid audio before a user gesture).
 *   - "off" → never asked again; the bottom-right toggle is always there.
 *   - no answer (card ignored, auto-hides) → asked again next visit.
 *
 * Audio: a calm mix of Mixkit "Gentle sea wave" (#1199), "Distant sea humming"
 * (#1193) and "Birds in the spring forest" (#1224), low-passed to remove hiss,
 * 90s seamless loop. Mixkit Free License —
 * free for commercial use, no attribution. Loudness-normalised to -24 LUFS.
 */
const storageKey = "ambientSound";
const targetVolume = 0.55;
const promptDelayMs = 600;
const promptAutoHideMs = 10000;

type Pref = "on" | "off" | null;

function readPref(): Pref {
  try {
    const v = window.localStorage.getItem(storageKey);
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

function writePref(on: boolean) {
  try {
    window.localStorage.setItem(storageKey, on ? "on" : "off");
  } catch {
    /* storage blocked — preference just won't persist */
  }
}

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  const fadeTo = (to: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const begin = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - begin) / 900);
      audio.volume = from + (to - from) * t;
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else onDone?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const start = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(targetVolume);
      })
      .catch(() => setPlaying(false));
  };

  const stop = () => {
    setPlaying(false);
    fadeTo(0, () => audioRef.current?.pause());
  };

  const toggle = () => {
    setAskOpen(false);
    if (playing) {
      stop();
      writePref(false);
    } else {
      start();
      writePref(true);
    }
  };

  const answer = (on: boolean) => {
    setAskOpen(false);
    writePref(on);
    if (on) start();
  };

  useEffect(() => {
    const pref = readPref();

    // Returning visitor who chose sound: resume on their first interaction.
    if (pref === "on") {
      const resume = (e: Event) => {
        if ((e.target as Element | null)?.closest?.("[data-ambient-toggle]")) return;
        start();
        remove();
      };
      const remove = () => {
        window.removeEventListener("pointerdown", resume);
        window.removeEventListener("keydown", resume);
      };
      window.addEventListener("pointerdown", resume);
      window.addEventListener("keydown", resume);
      return remove;
    }

    // Already declined: never nag.
    if (pref === "off") return;

    // First visit: ask once the preloader has gone.
    let showTimer = 0;
    let hideTimer = 0;
    const ask = () => {
      showTimer = window.setTimeout(() => {
        setAskOpen(true);
        hideTimer = window.setTimeout(() => setAskOpen(false), promptAutoHideMs);
      }, promptDelayMs);
    };
    if (document.documentElement.hasAttribute("data-preloader-done")) ask();
    else window.addEventListener("preloaderdone", ask, { once: true });

    return () => {
      window.removeEventListener("preloaderdone", ask);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), []);

  return (
    <>
      <audio ref={audioRef} src="/hero/seashore.mp3" loop preload="none" />

      <AnimatePresence>
        {askOpen && (
          <motion.div
            role="dialog"
            aria-label="Enable sound"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[84px] right-5 z-[60] w-[min(300px,calc(100vw-40px))] rounded-2xl border border-black/[0.08] bg-white/75 p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            <p className="text-sm font-semibold text-zinc-900">
              Experience it with sound?
            </p>
            <p className="mt-1 text-[13px] leading-snug text-zinc-500">
              Gentle sea-shore ambience. Best with headphones.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => answer(true)}
                className="rounded-full bg-zinc-900 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-700"
              >
                Turn on sound
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-900"
              >
                Not now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        data-ambient-toggle
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Mute sea sounds" : "Play sea sounds"}
        title={playing ? "Mute sea sounds" : "Play sea sounds"}
        data-playing={playing}
        className="ambient-toggle fixed bottom-5 right-5 z-[60] grid h-12 w-12 place-items-center rounded-full border border-black/[0.08] bg-white/60 text-zinc-800 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/80 active:scale-95"
      >
        {playing ? (
          /* playing: four rounded equalizer bars, gently dancing */
          <span className="flex h-4 items-center gap-[3px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="ambient-bar" style={{ animationDelay: `${i * -0.27}s` }} />
            ))}
          </span>
        ) : (
          /* muted: rounded speaker with a slash */
          <svg
            viewBox="0 0 24 24"
            className="h-[19px] w-[19px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M11 5 6.5 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.5L11 19V5Z" />
            <path d="m16 9.5 5 5M21 9.5l-5 5" />
          </svg>
        )}
      </button>
    </>
  );
}

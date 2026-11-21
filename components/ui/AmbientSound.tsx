"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AmbientSound — sea-shore ambience with a floating on/off toggle.
 *
 * Sound is ON by default, but browsers refuse to play audio before a user
 * gesture — so playback starts on the visitor's first click/tap/keypress
 * anywhere on the page (the earliest moment the browser allows). Muting via
 * the toggle is remembered, and a muted visitor stays muted on return.
 *
 * Audio: Mixkit "Sea waves with birds loop" (#1208), Mixkit Free License —
 * free for commercial use, no attribution. Loudness-normalised to -16 LUFS.
 */
const storageKey = "ambientSound";
const targetVolume = 0.7;

function readPref(): boolean {
  try {
    return window.localStorage.getItem(storageKey) !== "off";
  } catch {
    return true;
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

  const fadeTo = (to: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
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
    if (playing) {
      stop();
      writePref(false);
    } else {
      start();
      writePref(true);
    }
  };

  // Unless the visitor muted it, start on their first interaction.
  useEffect(() => {
    if (!readPref()) return;
    const resume = (e: Event) => {
      // The toggle handles its own click; don't double-start from it.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), []);

  return (
    <>
      <audio ref={audioRef} src="/hero/seashore.mp3" loop preload="none" />
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
        {/* minimal equalizer: four rounded bars that dance while playing
            and settle into a flat line when muted */}
        <span className="flex h-4 items-center gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="ambient-bar" style={{ animationDelay: `${i * -0.27}s` }} />
          ))}
        </span>
      </button>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * VideoBackground — a full-bleed, muted, looping stock clip.
 *
 * Clips live in public/hero/ as 5-second seamless loops (the last second
 * crossfades into the first, so the restart is invisible). Each clip ships a
 * 1080p file, a 720p file for small screens, and a poster frame that shows
 * instantly while the video buffers.
 *
 * Source footage: Mixkit (Mixkit Stock Video Free License — free for
 * commercial and personal use, no attribution required).
 *   beach — "Beach seen from the air with waves reaching the shore" (#51461)
 *   water — "Crystal clear water flowing on a paradisiacal beach" (#50235)
 */
export type VideoClip = "beach" | "water";

export function VideoBackground({
  clip,
  className,
}: {
  clip: VideoClip;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect reduced-motion: hold the poster frame instead of playing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [clip]);

  return (
    <video
      ref={videoRef}
      key={clip}
      className={className}
      poster={`/hero/${clip}-poster.jpg`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{ objectFit: "cover" }}
    >
      <source src={`/hero/${clip}-720.mp4`} type="video/mp4" media="(max-width: 768px)" />
      <source src={`/hero/${clip}-1080.mp4`} type="video/mp4" />
    </video>
  );
}

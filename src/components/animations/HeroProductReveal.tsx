"use client";

/**
 * Scroll-scrubbed hero: a real generated product-UI video (wordless by
 * design — see the prompt in this repo's history; earlier attempts asking
 * the video model for legible text produced gibberish) drives a canvas frame
 * sequence, with the actual SilexBrand mark laid over it as real HTML/image
 * elements — never baked into the generated footage. A small brand mark sits
 * in the corner throughout, the way a real product ad keeps its logo
 * visible, and the full wordmark + line resolve prominently once the
 * sequence reaches its own visual climax (the notification badge pulse).
 *
 * `position: sticky` + a passive scroll listener — not GSAP ScrollTrigger's
 * `pin`, which did not track scroll reliably against this project's Lenis
 * setup (see AUDIT history). Frames are pre-extracted stills (ffmpeg), not
 * live video playback, so scroll position maps directly to frame index with
 * no seek latency.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { useI18n } from "@/lib/i18n";

const FRAME_COUNT = 97;
const TRACK_HEIGHT_VH = 380;
// The notification-badge pulse (the video's own punctuation beat) lands here.
const CLIMAX_PROGRESS = 0.86;

const framePath = (i: number) =>
  `/images/hero-sequence/frame-${String(i).padStart(3, "0")}.webp`;

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function smooth(t: number): number {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}

export default function HeroProductReveal() {
  const { locale } = useI18n();
  const trackRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true);
      };
      images[i - 1] = img;
    }
    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced || !loaded) return;
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      draw(frameRef.current);
    };
    setSize();

    let ticking = false;
    const apply = () => {
      ticking = false;
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = clamp01(-track.getBoundingClientRect().top / scrollable);

      const idx = Math.round(progress * (FRAME_COUNT - 1));
      if (idx !== frameRef.current) {
        frameRef.current = idx;
        draw(idx);
      }

      const wm = wordmarkRef.current;
      if (wm) {
        const reveal = smooth((progress - CLIMAX_PROGRESS) / (1 - CLIMAX_PROGRESS));
        wm.style.opacity = String(reveal);
        wm.style.transform = `translateY(${(14 * (1 - reveal)).toFixed(2)}px) scale(${(0.96 + 0.04 * reveal).toFixed(3)})`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setSize);
    };
  }, [loaded, prefersReduced]);

  if (prefersReduced) {
    return (
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-5 overflow-hidden bg-[var(--color-bg-dark)] px-6 py-20 text-center">
        <Image src="/logo-new.png" alt="SilexBrand" width={64} height={64} className="h-14 w-auto" />
        <h2 className="font-display text-3xl font-extrabold text-[var(--color-text-on-dark)] sm:text-4xl">
          SilexBrand
        </h2>
        <p className="max-w-md text-[var(--color-text-on-dark)]/60">
          {locale === "bg"
            ? "Сайт, Google и AI асистент — сглобени в една система."
            : "Website, Google and an AI assistant — assembled into one system."}
        </p>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      aria-label={locale === "bg" ? "Как работи SilexBrand" : "How SilexBrand works"}
      className="relative w-full"
      style={{ height: `${TRACK_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[var(--color-bg-dark)]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Small persistent brand mark — visible throughout, like a real ad */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 opacity-70 sm:top-8 sm:left-8">
          <Image src="/new-logo.png" alt="" width={28} height={28} className="h-6 w-auto sm:h-7" />
          <span className="font-display text-xs font-bold tracking-wide text-[var(--color-text-on-dark)] sm:text-sm">
            SilexBrand
          </span>
        </div>

        {/* Vignette so the bold reveal stays legible over the brightest frames */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 55%, color-mix(in srgb, var(--color-bg-dark) 88%, transparent) 100%)",
          }}
        />

        {/* The ad-style punchline — resolves once the sequence reaches its climax */}
        <div
          ref={wordmarkRef}
          className="pointer-events-none absolute inset-x-0 bottom-14 z-10 px-6 text-center opacity-0 sm:bottom-20"
        >
          <div className="mb-3 flex items-center justify-center gap-2.5">
            <Image src="/new-logo.png" alt="" width={40} height={40} className="h-8 w-auto sm:h-10" />
            <span className="font-display text-2xl font-extrabold text-[var(--color-text-on-dark)] sm:text-4xl">
              SilexBrand
            </span>
          </div>
          <p className="mx-auto max-w-md text-[13px] leading-relaxed text-[var(--color-text-on-dark)]/70 sm:text-base">
            {locale === "bg"
              ? "Сайт, Google и AI асистент — сглобени в една система."
              : "Website, Google and an AI assistant — assembled into one system."}
          </p>
        </div>

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/60" />
          </div>
        )}

        <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[var(--color-text-on-dark)]/40">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
            {locale === "bg" ? "Скролни" : "Scroll"}
          </span>
          <span className="h-6 w-px animate-pulse bg-gradient-to-b from-[var(--color-text-on-dark)]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

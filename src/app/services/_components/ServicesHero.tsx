"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/motion";
import type { Locale } from "@/lib/offer";

const SWAP_INTERVAL_MS = 2400;

const swapPairs: Record<Locale, readonly { before: string; after: string }[]> = {
  bg: [
    { before: "невидим", after: "намерен" },
    { before: "бавен", after: "мигновен" },
    { before: "генеричен", after: "разпознаваем" },
  ],
  en: [
    { before: "invisible", after: "found" },
    { before: "slow", after: "instant" },
    { before: "generic", after: "unmistakable" },
  ],
};

const copy = {
  bg: {
    eyebrow: "Услуги · SilexBrand",
    from: "От",
    tail: "с един екип и един план.",
    sub: "Шест направления, които се купуват поотделно и работят най-добре заедно. Всяко има ясна цена и ясен резултат.",
  },
  en: {
    eyebrow: "Services · SilexBrand",
    from: "From",
    tail: "with one team and one plan.",
    sub: "Six disciplines you can buy one by one, which work best together. Each has a clear price and a clear result.",
  },
} as const;

/**
 * Always two lines — "before →" / "after" — so every pair has the same
 * height and the longest word ("разпознаваем") sits alone on its line,
 * which keeps it inside a 320px column.
 */
function SwapPair({ before, after }: { before: string; after: string }) {
  return (
    <>
      <span className="block">
        <span className="text-[var(--accent-10)]/50 line-through decoration-2">{before}</span>
        <span className="ml-3 text-[var(--color-text-on-dark)]/30">→</span>
      </span>
      <span className="block text-[var(--accent-10)]">{after}</span>
    </>
  );
}

function HeroWordSwap({ locale }: { locale: Locale }) {
  const pairs = swapPairs[locale];
  const prefersReduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
    if (prefersReduced) return;
    // Skip ticks while the tab is hidden so exit animations never pile up.
    const id = setInterval(() => {
      if (!document.hidden) setIdx((i) => (i + 1) % pairs.length);
    }, SWAP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [locale, pairs.length, prefersReduced]);

  const current = pairs[idx] ?? pairs[0]!;

  return (
    <span className="inline-grid align-baseline" aria-hidden>
      {/* Invisible sizers reserve the size of the widest pair → no layout shift.
          Pairs cross-fade in the same grid cell (no "wait"), so a stalled exit
          can never leave the headline blank. */}
      {pairs.map((p) => (
        <span key={p.after} className="invisible col-start-1 row-start-1">
          <SwapPair before={p.before} after={p.after} />
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={`${locale}-${idx}`}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1"
        >
          <SwapPair before={current.before} after={current.after} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function ServicesHero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const first = swapPairs[locale][0]!;

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 55%)",
        }}
        aria-hidden
      />
      <Container>
        <Reveal variant="blur">
          <p className="mb-6 eyebrow-mono text-[var(--color-text-on-dark)]/40">{t.eyebrow}</p>
        </Reveal>
        <h1 className="max-w-4xl text-display text-[var(--color-text-on-dark)]">
          <span className="sr-only">{`${t.from} ${first.before} → ${first.after} ${t.tail}`}</span>
          <span aria-hidden>{t.from} </span>
          <HeroWordSwap locale={locale} />
          <br aria-hidden />
          <span aria-hidden>{t.tail}</span>
        </h1>
        <Reveal variant="rise" delay={0.15}>
          <p className="mt-8 max-w-xl text-lead text-[var(--color-text-on-dark)]/60">{t.sub}</p>
        </Reveal>
      </Container>
    </section>
  );
}

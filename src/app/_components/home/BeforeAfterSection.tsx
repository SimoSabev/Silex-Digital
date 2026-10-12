"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link2, Unlink } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BEFORE: readonly TranslationKey[] = [
  "home.beforeAfter.before1",
  "home.beforeAfter.before2",
  "home.beforeAfter.before3",
  "home.beforeAfter.before4",
];

const AFTER: readonly TranslationKey[] = [
  "home.beforeAfter.after1",
  "home.beforeAfter.after2",
  "home.beforeAfter.after3",
  "home.beforeAfter.after4",
];

export default function BeforeAfterSection() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Scroll-scrubbed reveal: bullets slide in as the comparison scrolls through the viewport.
  useEffect(() => {
    if (prefersReduced || !rootRef.current) return;
    const root = rootRef.current;
    const beforeItems = root.querySelectorAll(".before-item");
    const afterItems = root.querySelectorAll(".after-item");

    gsap.set(beforeItems, { opacity: 0, x: -24 });
    gsap.set(afterItems, { opacity: 0, x: 24 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom center", scrub: 0.6 },
    });
    tl.to(beforeItems, { opacity: 1, x: 0, stagger: 0.15, ease: "power2.out" }, 0).to(
      afterItems,
      { opacity: 1, x: 0, stagger: 0.15, ease: "power2.out" },
      0.1,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [prefersReduced]);

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <Container>
        <AnimatedSection className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 className="text-h2 text-[var(--text-main)]">{t("home.beforeAfter.title")}</h2>
        </AnimatedSection>

        <div ref={rootRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-section)] p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--text-muted)]/10">
                <Unlink className="h-5 w-5 text-[var(--text-muted)]" aria-hidden />
              </span>
              <h3 className="text-h4 text-[var(--text-sub)]">{t("home.beforeAfter.before")}</h3>
            </div>
            <ul className="space-y-4">
              {BEFORE.map((key) => (
                <li key={key} className="before-item flex items-start gap-3 text-body text-[var(--text-sub)]">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--text-muted)]" aria-hidden />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.04] p-6 shadow-apple sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <Link2 className="h-5 w-5 text-[var(--accent)]" aria-hidden />
              </span>
              <h3 className="text-h4 text-[var(--accent)]">{t("home.beforeAfter.after")}</h3>
            </div>
            <ul className="space-y-4">
              {AFTER.map((key) => (
                <li key={key} className="after-item flex items-start gap-3 text-body font-semibold text-[var(--text-main)]">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--accent)]/15" aria-hidden>
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

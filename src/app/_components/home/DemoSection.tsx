"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { CtaLink } from "./ui";

const EmailAutomationDemo = dynamic(() => import("@/components/demos/EmailAutomationDemo"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] animate-pulse rounded-xl bg-[var(--bg-card)]" />,
});

const BULLETS: readonly TranslationKey[] = ["home.demo.bullet1", "home.demo.bullet2", "home.demo.bullet3"];

export default function DemoSection() {
  const { t } = useI18n();

  return (
    <section
      id="home-interactive-demo"
      className="scroll-mt-20 overflow-hidden border-y border-[var(--border)] bg-[var(--bg-section)] py-14 sm:scroll-mt-24 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <p className="mb-5 inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-1.5 eyebrow text-[var(--accent)]">
              {t("home.demo.badge")}
            </p>
            <h2 className="mb-4 text-h2 text-[var(--text-main)] sm:mb-6">{t("home.demo.title")}</h2>
            <p className="mb-6 text-lead text-[var(--text-sub)] sm:mb-8">{t("home.demo.body")}</p>
            <ul className="mb-6 space-y-3">
              {BULLETS.map((key) => (
                <li key={key} className="flex items-center gap-3 text-body font-semibold text-[var(--text-main)]">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--accent)]">
                    <Check className="h-4 w-4 text-white" aria-hidden />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
            <p className="mb-8 text-small text-[var(--text-muted)]">{t("home.demo.note")}</p>
            <CtaLink href="/demos" variant="ghost" className="-ml-3">
              {t("home.demo.cta")}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </CtaLink>
          </AnimatedSection>

          <AnimatedSection direction="right" className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/15 blur-3xl" aria-hidden />
            <div className="card overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-1.5 shadow-apple-hover sm:p-2">
              <div className="max-h-[min(85dvh,720px)] overflow-y-auto overflow-x-hidden rounded-xl border border-[var(--border)] sm:max-h-none">
                <EmailAutomationDemo />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}

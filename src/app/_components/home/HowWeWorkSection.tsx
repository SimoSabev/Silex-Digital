"use client";

import { ClipboardList, Hammer, MessagesSquare, Rocket, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { interpolate, useI18n, type TranslationKey } from "@/lib/i18n";
import { standardSiteDays } from "./offer-copy";

type Step = { icon: LucideIcon; title: TranslationKey; body: TranslationKey };

const STEP_STAGGER_S = 0.08;

const STEPS: readonly Step[] = [
  { icon: MessagesSquare, title: "home.how.step1.title", body: "home.how.step1.body" },
  { icon: ClipboardList, title: "home.how.step2.title", body: "home.how.step2.body" },
  { icon: Hammer, title: "home.how.step3.title", body: "home.how.step3.body" },
  { icon: Rocket, title: "home.how.step4.title", body: "home.how.step4.body" },
];

export default function HowWeWorkSection() {
  const { t } = useI18n();
  const days = standardSiteDays();

  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-section)] py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <AnimatedSection direction="left" className="lg:sticky lg:top-32">
            <p className="mb-5 inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-1.5 eyebrow text-[var(--accent)]">
              {t("home.how.badge")}
            </p>
            <h2 className="mb-5 text-h2 text-[var(--text-main)]">{t("home.how.title")}</h2>
            <p className="text-lead text-[var(--text-sub)]">{t("home.how.body")}</p>
          </AnimatedSection>

          <ol className="relative space-y-4 before:absolute before:top-6 before:bottom-6 before:left-9 sm:before:left-[2.625rem] before:w-px before:bg-[var(--border)]">
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="relative">
                  <AnimatedSection delay={i * STEP_STAGGER_S} className="relative flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-apple sm:p-6">
                    <span className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--accent)] text-white sm:h-9 sm:w-9">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="eyebrow nums mb-1 text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mb-1.5 text-h4 text-[var(--text-main)]">{t(title)}</h3>
                      <p className="text-body text-[var(--text-sub)]">{interpolate(t(body), { days })}</p>
                    </div>
                  </AnimatedSection>
                </li>
              ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

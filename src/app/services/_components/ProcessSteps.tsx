"use client";

import { MessagesSquare, FileText, Wrench, Rocket, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { L10n, Locale } from "@/lib/offer";

interface Step {
  readonly icon: LucideIcon;
  readonly title: L10n;
  readonly body: L10n;
}

const steps: readonly Step[] = [
  {
    icon: MessagesSquare,
    title: { bg: "Среща", en: "Call" },
    body: {
      bg: "30 минути. Не ви продаваме пакет: слушаме и казваме какво ви трябва и какво не.",
      en: "30 minutes. We don't sell you a package: we listen and tell you what you need and what you don't.",
    },
  },
  {
    icon: FileText,
    title: { bg: "План", en: "Plan" },
    body: {
      bg: "Писмен план с обхват, срокове и цена по редове, преди да платите.",
      en: "A written plan with scope, timeline and line-by-line pricing, before you pay.",
    },
  },
  {
    icon: Wrench,
    title: { bg: "Изграждане", en: "Build" },
    body: {
      bg: "На етапи. Показваме ви всеки, преди да продължим.",
      en: "In stages. We show you each one before we move on.",
    },
  },
  {
    icon: Rocket,
    title: { bg: "Пускане", en: "Launch" },
    body: {
      bg: "Стандартен сайт е готов за около 14 дни. По-големите проекти получават график в плана.",
      en: "A standard site goes live in about 14 days. Larger projects get a schedule in the plan.",
    },
  },
];

export default function ProcessSteps({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  return (
    <section className="border-t border-white/10 py-20 md:py-28" aria-labelledby="process-title">
      <Container>
        <Reveal className="mb-16 max-w-lg">
          <p className="mb-3 eyebrow-mono text-[var(--color-text-on-dark)]/40">{bg ? "Процес" : "Process"}</p>
          <h2 id="process-title" className="text-h2 text-[var(--color-text-on-dark)]">
            {bg ? "Как протича проектът" : "How a project runs"}
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <RevealItem key={step.title.en} variant="rise">
                <span className="mb-4 block font-mono nums text-small font-bold text-[var(--accent-10)]/50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[var(--color-text-on-dark)]/80">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mb-2 text-h4 text-[var(--color-text-on-dark)]">{step.title[locale]}</h3>
                <p className="text-small text-[var(--color-text-on-dark)]/55">{step.body[locale]}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

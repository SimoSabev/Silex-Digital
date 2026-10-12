"use client";

/**
 * DIRECTION: "Transformation, staged." Near-black ground, oversized editorial
 * type, and a literal word-swap (problem → outcome) in the hero. Each
 * discipline is a numbered "case file": large index, a before → after chip
 * pair and a tilted price sheet — not a card in a grid.
 *
 * DATA: every price on this page is derived from @/lib/offer. No hand-typed
 * numbers, no invented proof, no promises we can't guarantee.
 */

import { useI18n } from "@/lib/i18n";
import ServicesHero from "./_components/ServicesHero";
import StartPaths from "./_components/StartPaths";
import Disciplines from "./_components/Disciplines";
import BundleSavings from "./_components/BundleSavings";
import ProcessSteps from "./_components/ProcessSteps";
import ServicesCta from "./_components/ServicesCta";

export default function ServicesContent() {
  const { locale } = useI18n();

  return (
    <div className="min-h-dvh bg-[var(--color-bg-dark)] font-body">
      <ServicesHero locale={locale} />
      <StartPaths locale={locale} />
      <Disciplines locale={locale} />
      <BundleSavings locale={locale} />
      <ProcessSteps locale={locale} />
      <ServicesCta locale={locale} />
    </div>
  );
}

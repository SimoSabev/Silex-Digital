"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, Calculator, Euro, TrendingUp, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { interpolate, useI18n } from "@/lib/i18n";
import { CtaLink } from "./ui";
import { SAMPLE_CONVERSION_LIFT_PCT, contactHref, eur } from "./offer-copy";

const LEADS = { min: 20, max: 400, step: 1, initial: 60 } as const;
const DEAL = { min: 40, max: 600, step: 10, initial: 120 } as const;

const fillPct = (value: number, range: { min: number; max: number }): number =>
  ((value - range.min) / (range.max - range.min)) * 100;

type SliderProps = {
  label: string;
  icon: typeof Users;
  value: number;
  display: string;
  range: { min: number; max: number; step: number };
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
};

function Slider({ label, icon: Icon, value, display, range, minLabel, maxLabel, onChange }: SliderProps) {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <span className="flex items-center gap-2 eyebrow text-[var(--text-muted)]">
          <Icon size={16} className="text-[var(--accent)]" aria-hidden />
          {label}
        </span>
        <span className="font-display nums whitespace-nowrap text-h3 text-[var(--accent)]">{display}</span>
      </div>
      <input
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--slider-fill": `${fillPct(value, range)}%` } as CSSProperties}
        className="roi-slider w-full"
        aria-label={label}
      />
      <div className="nums mt-2 flex justify-between text-caption font-medium text-[var(--text-muted)]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function RoiSection() {
  const { locale, t } = useI18n();
  const [monthlyLeads, setMonthlyLeads] = useState<number>(LEADS.initial);
  const [averageDeal, setAverageDeal] = useState<number>(DEAL.initial);

  const extraClients = Math.round((monthlyLeads * SAMPLE_CONVERSION_LIFT_PCT) / 100);
  const monthlyGain = extraClients * averageDeal;
  const readoutLabel = "mb-2 eyebrow text-[color-mix(in_srgb,var(--color-text-on-dark)_65%,transparent)]";

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <Container>
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="card-2026 relative overflow-hidden rounded-[28px] shadow-apple-hover">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 md:p-12 lg:p-14">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 eyebrow text-[var(--accent)]">
                  <Calculator size={16} aria-hidden />
                  {t("home.roi.badge")}
                </p>
                <h2 className="mb-4 text-h2 text-[var(--text-main)]">{t("home.roi.title")}</h2>
                <p className="mb-10 text-body text-[var(--text-sub)]">
                  {interpolate(t("home.roi.body"), { pct: SAMPLE_CONVERSION_LIFT_PCT })}
                </p>

                <div className="space-y-10">
                  <Slider
                    label={t("home.roi.leads")}
                    icon={Users}
                    value={monthlyLeads}
                    display={String(monthlyLeads)}
                    range={LEADS}
                    minLabel={String(LEADS.min)}
                    maxLabel={String(LEADS.max)}
                    onChange={setMonthlyLeads}
                  />
                  <Slider
                    label={t("home.roi.deal")}
                    icon={Euro}
                    value={averageDeal}
                    display={eur(averageDeal, locale)}
                    range={DEAL}
                    minLabel={eur(DEAL.min, locale)}
                    maxLabel={eur(DEAL.max, locale)}
                    onChange={setAverageDeal}
                  />
                </div>
              </div>

              <div className="atelier-band-dark relative flex flex-col justify-center gap-7 p-7 md:p-12 lg:p-14" aria-live="polite">
                <div className="relative z-10">
                  <p className={`${readoutLabel} flex items-center gap-2`}>
                    <TrendingUp size={14} aria-hidden />
                    {t("home.roi.extra")}
                  </p>
                  <p className="font-display nums whitespace-nowrap text-h1 text-[var(--color-text-on-dark)]">+{extraClients}</p>
                </div>
                <div className="relative z-10 h-px w-full bg-[color-mix(in_srgb,var(--color-text-on-dark)_15%,transparent)]" />
                <div className="relative z-10">
                  <p className={readoutLabel}>{t("home.roi.gain")}</p>
                  <p className="font-display nums whitespace-nowrap text-h1 text-[var(--accent-10)]">{eur(monthlyGain, locale)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center border-t border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8">
              <CtaLink
                href={contactHref.call({ intent: "roi-estimate", monthlyLeads, leadValue: averageDeal })}
                size="lg"
              >
                {t("home.roi.cta")}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </CtaLink>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

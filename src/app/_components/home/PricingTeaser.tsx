"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { bundles, getBundleMath, type Bundle } from "@/lib/offer";
import { interpolate, useI18n } from "@/lib/i18n";
import { CtaLink, SectionHeading } from "./ui";
import { contactHref, oneTimePlusMonthly } from "./offer-copy";

function BundleCard({ bundle }: { bundle: Bundle }) {
  const { locale, t } = useI18n();
  const math = getBundleMath(bundle);
  const isHighlight = bundle.highlight;

  const rows = [
    { label: t("home.pricing.separately"), value: oneTimePlusMonthly(math.listOneTime, math.listMonthly, locale), strong: false },
    { label: t("home.pricing.save"), value: oneTimePlusMonthly(math.saveOneTime, math.saveMonthly, locale), strong: true },
  ];

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-[var(--bg-card)] p-6 sm:p-7 ${
        isHighlight ? "border-[var(--accent)] shadow-apple-hover ring-1 ring-[var(--accent)]/30" : "border-[var(--border)] shadow-apple"
      }`}
    >
      {bundle.badge && (
        <p
          className={`mb-4 w-fit rounded-full px-3 py-1 eyebrow ${
            isHighlight ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-section)] text-[var(--text-muted)]"
          }`}
        >
          {bundle.badge[locale]}
        </p>
      )}
      <h3 className="mb-2 text-h3 text-[var(--text-main)]">{bundle.name[locale]}</h3>
      <p className="mb-6 text-small text-[var(--text-sub)]">{bundle.tagline[locale]}</p>

      <p className="eyebrow mb-1 text-[var(--text-muted)]">{t("home.pricing.inBundle")}</p>
      <p className={`font-display nums mb-5 text-h4 ${isHighlight ? "text-[var(--accent)]" : "text-[var(--text-main)]"}`}>
        {oneTimePlusMonthly(bundle.price.oneTime, bundle.price.monthly, locale)}
      </p>

      <dl className="mb-6 space-y-2 border-t border-[var(--border)] pt-4">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-3">
            <dt className="text-caption text-[var(--text-muted)]">{row.label}</dt>
            <dd className={`nums text-small ${row.strong ? "font-bold text-[var(--color-success)]" : "text-[var(--text-sub)] line-through decoration-[var(--text-muted)]/60"}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mb-5 mt-auto text-caption text-[var(--text-muted)]">
        {interpolate(t("home.pricing.minTerm"), { months: bundle.minTermMonths })}
      </p>
      <Link
        href={contactHref.bundle(bundle.id)}
        className={`${isHighlight ? "btn-primary" : "btn-secondary"} w-full font-bold`}
      >
        {t("home.pricing.choose")}
      </Link>
    </article>
  );
}

export default function PricingTeaser() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading title={t("home.pricing.title")} sub={t("home.pricing.sub")} className="mb-12 md:mb-16" />

        <StaggerContainer className="mx-auto grid max-w-6xl items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bundles.map((bundle) => (
            <StaggerItem key={bundle.id}>
              <BundleCard bundle={bundle} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.2} className="mt-10 flex flex-col items-center gap-3 text-center">
          <CtaLink href="/pricing" variant="secondary" size="lg">
            {t("home.pricing.cta")}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </CtaLink>
          <p className="text-caption text-[var(--text-muted)]">{t("common.vatNote")}</p>
        </AnimatedSection>
      </Container>
    </section>
  );
}

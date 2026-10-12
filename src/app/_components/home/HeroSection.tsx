"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, CalendarCheck, ClipboardList, Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Magnetic from "@/components/ui/Magnetic";
import { useI18n } from "@/lib/i18n";
import type { BrandLayer } from "@/components/animations/HeroVisualization";
import { CtaLink } from "./ui";
import { SERVICE_ICONS } from "./service-icons";
import { HOME_SERVICE_KEYS, SERVICE_GROUP_COUNT, contactHref, homeServicePrice, standardSiteDays } from "./offer-copy";

const HeroVisualization = dynamic(() => import("@/components/animations/HeroVisualization"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-[var(--color-bg-dark)]" />,
});

const BrandDissolveMark = dynamic(() => import("@/components/animations/BrandDissolveMark"), { ssr: false });

/** Single point of contact + one written plan. */
const CONTACT_PERSON_COUNT = 1;

export default function HeroSection() {
  const { locale, t } = useI18n();

  const stats = [
    { icon: Layers, value: SERVICE_GROUP_COUNT, label: t("hero.stat1Label") },
    { icon: ClipboardList, value: CONTACT_PERSON_COUNT, label: t("hero.stat2Label") },
    { icon: CalendarCheck, value: standardSiteDays(), label: t("hero.stat3Label") },
  ];

  const layers: BrandLayer[] = HOME_SERVICE_KEYS.map((key) => ({
    key,
    title: key === "ai" ? t("svc.ai.short") : t(`svc.${key}.title`),
    price: homeServicePrice(key, locale, t),
    icon: SERVICE_ICONS[key],
  }));

  return (
    <section className="atelier-band-dark hero-section relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-ribbon-dark.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-dark)]/80" />
      </div>

      <div
        className="pointer-events-none absolute -right-[10%] top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 opacity-[0.16] mix-blend-screen sm:block lg:h-[720px] lg:w-[720px]"
        aria-hidden
      >
        <BrandDissolveMark className="h-full w-full" />
      </div>

      <Container>
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <AnimatedSection delay={0} mode="immediate">
              <p className="mb-6 inline-flex max-w-[95%] items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-caption font-medium text-[var(--color-text-on-dark)]/85 backdrop-blur-md sm:max-w-none sm:text-small">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-10)]" />
                {t("hero.badge")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.08} mode="immediate">
              <h1 className="text-display">
                <span className="block text-[var(--color-text-on-dark)]">{t("hero.headlineLine1")}</span>
                <span className="mt-1 block text-[var(--accent-10)] sm:mt-2">{t("hero.headlineLine2")}</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.14} mode="immediate">
              <p className="mx-auto mt-6 max-w-[38rem] text-lead text-[var(--color-text-on-dark)]/75 sm:mt-7">
                {t("hero.sub")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} mode="immediate">
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                <Magnetic className="block w-full sm:w-auto">
                  <CtaLink
                    href={contactHref.call()}
                    size="lg"
                    className="w-full rounded-full shadow-lg shadow-[var(--accent)]/25 sm:w-auto"
                  >
                    {t("hero.cta")}
                    <ArrowRight className="h-4 w-4" />
                  </CtaLink>
                </Magnetic>
                <CtaLink
                  href="/pricing"
                  variant="ghost"
                  size="lg"
                  className="w-full rounded-full border border-white/15 bg-white/[0.07] !text-[var(--color-text-on-dark)] backdrop-blur-md hover:border-white/30 hover:!bg-white/[0.12] sm:w-auto"
                >
                  {t("hero.ctaSecondary")}
                </CtaLink>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.26} mode="immediate" className="relative mx-auto max-w-6xl">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[44px] bg-[var(--accent)]/25 blur-3xl sm:-inset-10"
              aria-hidden
            />
            <div className="hero-visual h-[360px] w-full overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 sm:h-[400px] md:h-[440px] lg:h-[460px]">
              <HeroVisualization
                layers={layers}
                title={t("hero.visual.title")}
                layersLabel={t("hero.visual.layers")}
                readyLabel={t("hero.visual.ready")}
              />
            </div>
            <p className="mt-3 text-center text-caption text-[var(--color-text-on-dark)]/50">{t("hero.visualNote")}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.34} mode="immediate">
            <ul className="mx-auto mt-6 flex max-w-4xl flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md sm:mt-8 sm:flex-row sm:divide-x sm:divide-y-0">
              {stats.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex flex-1 items-center gap-4 px-5 py-4 sm:flex-col sm:gap-1 sm:py-5 sm:text-center">
                  <Icon className="h-5 w-5 flex-none text-[var(--accent-10)]/80" aria-hidden />
                  <span className="font-display nums text-h2 text-[var(--accent-10)]">{value}</span>
                  <span className="text-small text-[var(--color-text-on-dark)]/70 sm:max-w-[13rem]">{label}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}

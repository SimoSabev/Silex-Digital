"use client";

import Link from "next/link";
import { ArrowRight, Puzzle, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { interpolate, useI18n, type TranslationKey } from "@/lib/i18n";
import { SectionHeading } from "./ui";
import { bundlePriceLine, eur, eurMonthly, monthlyOf, oneTimeOf } from "./offer-copy";

type PathCard = {
  id: string;
  icon: LucideIcon;
  title: TranslationKey;
  body: TranslationKey;
  cta: TranslationKey;
  href: string;
  price: string;
};

export default function PathsSection() {
  const { locale, t } = useI18n();

  const cards: PathCard[] = [
    {
      id: "zero",
      icon: Sprout,
      title: "home.paths.zero.title",
      body: "home.paths.zero.body",
      cta: "home.paths.zero.cta",
      href: "/pricing#bundles",
      price: bundlePriceLine("brand-from-zero", locale, t),
    },
    {
      id: "growth",
      icon: TrendingUp,
      title: "home.paths.growth.title",
      body: "home.paths.growth.body",
      cta: "home.paths.growth.cta",
      href: "/pricing#bundles",
      price: bundlePriceLine("ai-growth", locale, t),
    },
    {
      id: "single",
      icon: Puzzle,
      title: "home.paths.single.title",
      body: "home.paths.single.body",
      cta: "home.paths.single.cta",
      href: "/pricing#services",
      price: interpolate(t("home.paths.single.price"), {
        logo: eur(oneTimeOf("logo"), locale),
        site: eur(oneTimeOf("business-site"), locale),
        seo: eurMonthly(monthlyOf("seo-local"), locale),
      }),
    },
  ];

  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-section)] py-16 md:py-24 lg:py-28">
      <Container>
        <SectionHeading
          badge={t("home.paths.badge")}
          title={t("home.paths.title")}
          sub={t("home.paths.body")}
          className="mb-12 md:mb-16"
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {cards.map(({ id, icon: Icon, title, body, cta, href, price }) => (
            <StaggerItem key={id}>
              <article className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-7 shadow-apple transition-[box-shadow,border-color] duration-300 hover:border-[var(--border-hover)] hover:shadow-apple-hover sm:p-8">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mb-3 text-h3 text-[var(--text-main)]">{t(title)}</h3>
                <p className="mb-6 flex-1 text-body text-[var(--text-sub)]">{t(body)}</p>
                <p className="nums mb-5 border-t border-[var(--border)] pt-5 text-small font-semibold text-[var(--text-main)]">
                  {price}
                </p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-small font-bold text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  {t(cta)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="mt-8 text-center text-caption text-[var(--text-muted)]">{t("common.vatNote")}</p>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { formatEur, getBundle, type Locale } from "@/lib/offer";
import { bundlePriceLabel, lowestStandaloneOneTime, VAT_NOTE } from "./prices";

interface StartPath {
  readonly key: string;
  readonly index: string;
  readonly title: string;
  readonly body: string;
  readonly priceLabel: string;
  readonly price: string;
  readonly href: string;
  readonly linkLabel: string;
  readonly isFeatured: boolean;
}

function buildPaths(locale: Locale): readonly StartPath[] {
  const fromZero = getBundle("brand-from-zero");
  const growth = getBundle("ai-growth");
  const bg = locale === "bg";

  return [
    {
      key: "zero",
      index: "A",
      title: bg ? "От нула" : "From zero",
      body: bg
        ? "Нов бизнес без лого, сайт и профили. Правим всичко наведнъж, по един план."
        : "A new business with no logo, site or profiles yet. We build it all at once, to one plan.",
      priceLabel: fromZero.name[locale],
      price: bundlePriceLabel(fromZero, locale),
      href: "/pricing#bundles",
      linkLabel: bg ? "Вижте пакета" : "See the bundle",
      isFeatured: true,
    },
    {
      key: "growth",
      index: "B",
      title: bg ? "Растеж" : "Growth",
      body: bg
        ? "Работещ бизнес, който иска повече запитвания: нов сайт, AI асистент и записване на часове."
        : "An established business that wants more inquiries: a new site, an AI assistant and online booking.",
      priceLabel: growth.name[locale],
      price: bundlePriceLabel(growth, locale),
      href: "/pricing#bundles",
      linkLabel: bg ? "Вижте пакета" : "See the bundle",
      isFeatured: false,
    },
    {
      key: "single",
      index: "C",
      title: bg ? "Единична услуга" : "A single service",
      body: bg
        ? "Трябва ви само едно нещо — лого, сайт, реклама или SEO. Купувате го отделно, с ясна цена."
        : "You need just one thing: a logo, a site, ads or SEO. Buy it on its own, at a clear price.",
      priceLabel: bg ? "Отделни услуги" : "Single services",
      price: `${bg ? "от" : "from"} ${formatEur(lowestStandaloneOneTime, locale)}`,
      href: "/pricing#services",
      linkLabel: bg ? "Вижте услугите" : "See the services",
      isFeatured: false,
    },
  ];
}

function PathCard({ path }: { path: StartPath }) {
  const frame = path.isFeatured
    ? "border-[var(--accent-10)]/40 bg-[var(--accent-10)]/[0.07]"
    : "border-white/10 bg-white/[0.03] hover:border-white/20";

  return (
    <Link
      href={path.href}
      className={`group flex h-full flex-col rounded-2xl border p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-10)] md:p-8 ${frame}`}
    >
      <span className="mb-6 font-mono nums text-small font-bold text-[var(--accent-10)]/60">{path.index}</span>
      <h3 className="mb-3 text-h3 text-[var(--color-text-on-dark)]">{path.title}</h3>
      <p className="mb-8 text-body text-[var(--color-text-on-dark)]/60">{path.body}</p>

      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="mb-1 text-caption text-[var(--color-text-on-dark)]/45">{path.priceLabel}</p>
        <p className="mb-5 nums text-h4 text-[var(--color-text-on-dark)]">{path.price}</p>
        <span className="inline-flex items-center gap-1.5 text-small font-bold text-[var(--accent-10)]">
          {path.linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function StartPaths({ locale }: { locale: Locale }) {
  const paths = buildPaths(locale);
  const bg = locale === "bg";

  return (
    <section className="border-t border-white/10 py-20 md:py-28" aria-labelledby="start-paths-title">
      <Container>
        <Reveal className="mb-12 max-w-xl md:mb-16">
          <p className="mb-3 eyebrow-mono text-[var(--color-text-on-dark)]/40">{bg ? "Начало" : "Start"}</p>
          <h2 id="start-paths-title" className="mb-4 text-h2 text-[var(--color-text-on-dark)]">
            {bg ? "Откъде започвате?" : "Where do you start?"}
          </h2>
          <p className="text-lead text-[var(--color-text-on-dark)]/60">
            {bg ? "Три начина да работите с нас." : "Three ways to work with us."}
          </p>
        </Reveal>

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {paths.map((path) => (
            <RevealItem key={path.key} variant="rise" className="h-full">
              <PathCard path={path} />
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-caption text-[var(--color-text-on-dark)]/40">{VAT_NOTE[locale]}</p>
      </Container>
    </section>
  );
}

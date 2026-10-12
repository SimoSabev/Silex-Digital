"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, MapPin, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n";
import { bundles, formatEur, getService, perMonth, type ServiceId } from "@/lib/offer";
import { deliveryLabel, servicesContactHref, tr } from "../_components/offer-utils";

// Only presentation lives here — names, inclusions and prices come from the catalog.
const TIERS: readonly {
  id: ServiceId;
  icon: string;
  role: { bg: string; en: string };
  description: { bg: string; en: string };
}[] = [
  {
    id: "seo-local",
    icon: "/images/icons/seo-tier-local.svg",
    role: { bg: "Местна видимост", en: "Local visibility" },
    description: { bg: "За фирми, които живеят от клиенти наблизо.", en: "For businesses that live off nearby customers." },
  },
  {
    id: "seo-growth",
    icon: "/images/icons/seo-tier-growth.svg",
    role: { bg: "Активен растеж", en: "Active growth" },
    description: { bg: "Съдържание всеки месец, за да ви търсят по повече теми.", en: "Monthly content so people find you for more topics." },
  },
  {
    id: "seo-aggressive",
    icon: "/images/icons/seo-tier-aggressive.svg",
    role: { bg: "Конкурентни ниши", en: "Competitive niches" },
    description: { bg: "Когато конкурентите вече са силни в Google.", en: "When your competitors are already strong on Google." },
  },
];

const SEO_IN_BUNDLES = bundles.filter((b) => b.lines.some((l) => l.service === "seo-start"));

export default function SeoPricingContent() {
  const { locale } = useI18n();
  const start = getService("seo-start");
  const aggressive = getService("seo-aggressive");

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      <section className="atelier-band relative overflow-hidden border-b border-[var(--accent)]/10 pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-6 inline-flex">{tr(locale, "SEO · SilexBrand", "SEO · SilexBrand")}</Badge>
            <h1 className="mb-6 text-h1">
              {tr(locale, "Сайтът е готов. Сега — ", "Your site is ready. Now — ")}
              <span className="text-[var(--accent)]">{tr(locale, "да ви намират.", "get found.")}</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lead text-[var(--text-sub)]">
              {tr(
                locale,
                "Не само в Google. Днес хората питат и ChatGPT, Gemini и Perplexity. Подреждаме сайта и профила ви така, че да излизате и на двете места — с месечен отчет какво се е променило.",
                "Not just Google. Today people also ask ChatGPT, Gemini and Perplexity. We set up your site and profile so you show up in both places — with a monthly report on what changed.",
              )}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-small font-medium text-[var(--text-sub)]">
              <MapPin size={16} className="text-[var(--accent)]" aria-hidden="true" />
              {tr(locale, "Фокус: локално търсене във Варна и региона", "Focus: local search in Varna and the region")}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Step 1 — SEO Start, one-time */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="card-featured mx-auto flex max-w-5xl flex-col gap-8 rounded-[24px] p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <p className="mb-3 eyebrow text-[var(--accent)]">{tr(locale, "Стъпка 1 · Еднократно", "Step 1 · One-time")}</p>
              <h2 className="mb-3 text-h3">{start.name[locale]}</h2>
              <p className="mb-5 text-body text-[var(--text-sub)]">{start.summary[locale]}</p>
              <ul className="flex flex-wrap gap-2">
                {start.included[locale].map((chip) => (
                  <li key={chip} className="rounded-md border border-[var(--border)] bg-[var(--bg-section)] px-2.5 py-1 text-caption font-medium text-[var(--text-sub)]">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="eyebrow text-[var(--text-muted)]">{tr(locale, "Еднократно", "One-time")}</p>
              <p className="nums whitespace-nowrap font-display text-h2 text-[var(--text-main)]">
                {formatEur(start.price.oneTime ?? 0, locale)}
              </p>
              {start.delivery && (
                <p className="mt-1 flex items-center gap-1.5 text-caption text-[var(--text-muted)] md:justify-end">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {deliveryLabel(start.delivery, locale)}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Step 2 — monthly levels */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mb-12 text-center">
            <p className="mb-3 eyebrow text-[var(--accent)]">{tr(locale, "Стъпка 2 · Месечно", "Step 2 · Monthly")}</p>
            <h2 className="mb-4 text-h2">{tr(locale, "Нива на поддръжка", "Levels of support")}</h2>
            <p className="mx-auto max-w-2xl text-body text-[var(--text-sub)]">
              {tr(
                locale,
                "Класирането се печели с постоянна работа. Изберете нивото според това колко бързо искате да растете. Всяко ниво включва месечен отчет и няма минимален срок.",
                "Rankings are earned through steady work. Choose the level based on how fast you want to grow. Every level includes a monthly report and has no minimum term.",
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TIERS.map((tier, idx) => {
              const svc = getService(tier.id);
              return (
                <motion.article
                  key={tier.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-7"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-h3">{svc.name[locale]}</h3>
                      <p className="eyebrow text-[var(--text-muted)]">{tier.role[locale]}</p>
                    </div>
                    <Image src={tier.icon} alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
                  </div>
                  <p className="mb-1 flex items-baseline gap-1.5">
                    <span className="nums whitespace-nowrap font-display text-h2">{formatEur(svc.price.monthly ?? 0, locale)}</span>
                    <span className="text-small text-[var(--text-muted)]">{perMonth(locale)}</span>
                  </p>
                  <p className="mb-5 text-small text-[var(--text-sub)]">{tier.description[locale]}</p>
                  <div className="mb-5 border-t border-[var(--border)]" />
                  <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                    {svc.included[locale].map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-small text-[var(--text-main)]">
                        <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={servicesContactHref([tier.id], "pricing-seo")}
                    className="btn-secondary w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {tr(locale, `Поискайте ${svc.name.bg}`, `Request ${svc.name.en}`)}
                  </Link>
                </motion.article>
              );
            })}
          </div>
          <p className="mt-6 text-center text-caption text-[var(--text-muted)]">
            {tr(locale, "Всички цени са без ДДС.", "All prices exclude VAT.")}
          </p>
        </Container>
      </section>

      {/* AI search callout */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="atelier-band-dark relative overflow-hidden rounded-[24px] p-8 md:p-12">
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="mb-3 inline-flex items-center gap-2 eyebrow text-[var(--color-text-on-dark)]/70">
                  <Sparkles size={14} aria-hidden="true" />
                  {tr(locale, "Търсене с изкуствен интелект", "AI search")}
                </p>
                <h3 className="mb-3 text-h3 text-[var(--color-text-on-dark)]">
                  {tr(locale, "Да ви цитира и изкуственият интелект", "Get cited by AI, too")}
                </h3>
                <p className="mb-5 text-body text-[var(--color-text-on-dark)]/75">
                  {tr(
                    locale,
                    "Все повече хора питат AI коя фирма да изберат. Проследяваме дали ви споменава и какво трябва да се промени, за да ви спомене.",
                    "More and more people ask AI which company to choose. We track whether it mentions you and what needs to change so it does.",
                  )}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {["Google AI Overview", "ChatGPT", "Gemini", "Perplexity"].map((name) => (
                    <li key={name} className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-caption font-medium text-[var(--color-text-on-dark)]">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-small font-medium text-[var(--color-text-on-dark)]/80 md:text-right">
                {tr(locale, "Включено в", "Included in")}{" "}
                <b className="text-[var(--color-text-on-dark)]">{aggressive.name[locale]}</b>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO inside bundles */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center md:p-10">
            <h3 className="text-h3">{tr(locale, "Искате SEO заедно със сайт?", "Want SEO together with a website?")}</h3>
            <p className="text-body text-[var(--text-sub)]">
              {tr(
                locale,
                `${start.name.bg} влиза в пакетите ${SEO_IN_BUNDLES.map((b) => `„${b.name.bg}“`).join(", ")}. Пакетите излизат по-евтино от същите услуги поотделно.`,
                `${start.name.en} is part of the ${SEO_IN_BUNDLES.map((b) => `“${b.name.en}”`).join(", ")} bundles. Bundles cost less than the same services bought separately.`,
              )}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={servicesContactHref([start.id], "pricing-seo")}
                className="btn-primary btn-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {tr(locale, `Поискайте ${start.name.bg}`, `Request ${start.name.en}`)}
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href="/pricing#bundles"
                className="btn-secondary btn-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {tr(locale, "Вижте пакетите", "See the bundles")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

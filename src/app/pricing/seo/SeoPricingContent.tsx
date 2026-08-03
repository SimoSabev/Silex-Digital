"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n";

const seoTiers = [
  {
    id: "local",
    icon: "/images/icons/seo-tier-local.svg",
    name: "Local",
    price: "80",
    role: { bg: "Местна видимост", en: "Local visibility" },
    description: {
      bg: "За фирми, които живеят от клиенти наблизо.",
      en: "For businesses that live off nearby customers.",
    },
    features: {
      bg: [
        "Поддръжка на Google бизнес профил",
        "Локални регистрации и цитирания",
        "On-page оптимизация на страниците",
        "Месечен отчет с позициите",
      ],
      en: [
        "Google Business Profile maintenance",
        "Local citations & directory listings",
        "On-page optimization",
        "Monthly ranking report",
      ],
    },
    popular: false,
  },
  {
    id: "growth",
    icon: "/images/icons/seo-tier-growth.svg",
    name: "Growth",
    price: "120",
    role: { bg: "Активен растеж", en: "Active growth" },
    description: {
      bg: "Балансът между цена и реален ефект.",
      en: "The balance between price and real impact.",
    },
    features: {
      bg: [
        "Всичко от Local",
        "1–2 материала месечно (формат за AI)",
        "Изграждане на тематични клъстъри",
        "Вътрешно свързване на страниците",
        "Следене през Google Search Console",
      ],
      en: [
        "Everything in Local",
        "1–2 pieces of content monthly (AI-ready format)",
        "Topical cluster building",
        "Internal page linking",
        "Google Search Console monitoring",
      ],
    },
    popular: true,
  },
  {
    id: "aggressive",
    icon: "/images/icons/seo-tier-aggressive.svg",
    name: "Aggressive",
    price: "150–180",
    role: { bg: "Максимален натиск", en: "Maximum push" },
    description: {
      bg: "Когато искаш да изпревариш конкуренцията.",
      en: "When you want to outpace the competition.",
    },
    features: {
      bg: [
        "Всичко от Growth",
        "Линк билдинг (авторитетни връзки)",
        "GEO — проследяване на AI цитирания",
        "Повече съдържание месечно",
        "Анализ на конкурентите",
      ],
      en: [
        "Everything in Growth",
        "Link building (authority backlinks)",
        "GEO — AI citation tracking",
        "More monthly content",
        "Competitor analysis",
      ],
    },
    popular: false,
  },
];

export default function SeoPricingContent() {
  const { locale } = useI18n();

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      {/* Hero — atelier band edge-to-edge */}
      <section className="atelier-band relative overflow-hidden border-b border-[var(--accent)]/10 pt-32 pb-20 md:pt-40 md:pb-28">

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-6 inline-flex">
              {locale === "bg" ? "Оптимизация за търсене" : "Search optimization"}
            </Badge>
            <h1 className="mb-6 font-display text-[36px] leading-[1.05] font-bold md:text-[56px]">
              {locale === "bg" ? (
                <>Сайтът е готов. Сега — <span className="text-[var(--accent)]">да те намират.</span></>
              ) : (
                <>Your site is ready. Now — <span className="text-[var(--accent)]">get found.</span></>
              )}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-[17px] text-[var(--text-sub)] md:text-[19px]">
              {locale === "bg"
                ? "Не само в Google. Днес хората питат и ChatGPT, Gemini и Perplexity. SEO при нас значи да излизаш и на двете места — с месечен отчет, който показва реалните резултати."
                : "Not just Google. Today people also ask ChatGPT, Gemini, and Perplexity. Our SEO means showing up in both places — with a monthly report proving the real results."}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm font-medium text-[var(--text-sub)]">
              <MapPin size={16} className="text-[var(--accent)]" />
              {locale === "bg" ? "Фокус: локално търсене във Варна и региона" : "Focus: local search in Varna and the region"}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SEO Start — one-time audit */}
      <section className="pb-16 md:pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-featured mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-[24px] p-8 md:flex-row md:justify-between md:p-12"
          >
            <div className="max-w-xl">
              <span className="mb-3 inline-block text-xs font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
                {locale === "bg" ? "Стъпка 1 · Еднократно" : "Step 1 · One-time"}
              </span>
              <h2 className="mb-3 font-display text-2xl font-bold md:text-3xl">
                {locale === "bg" ? "SEO Старт — одит + настройка на основата" : "SEO Start — audit + foundation setup"}
              </h2>
              <p className="mb-5 text-[15px] text-[var(--text-sub)] md:text-base">
                {locale === "bg"
                  ? "Технически преглед, настройка на Google бизнес профил, структура за търсачки и AI, и карта на думите, по които реално да те намират."
                  : "Technical review, Google Business Profile setup, search & AI-ready structure, and a keyword map for how customers actually find you."}
              </p>
              <div className="flex flex-wrap gap-2">
                {(locale === "bg"
                  ? ["Технически одит", "Google бизнес профил", "Schema за AI", "Карта на ключови думи", "Локални регистрации"]
                  : ["Technical audit", "Google Business Profile", "Schema for AI", "Keyword map", "Local listings"]
                ).map((chip) => (
                  <span key={chip} className="rounded-md border border-[var(--border)] bg-[var(--bg-section)] px-2.5 py-1 text-xs font-medium text-[var(--text-sub)]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-center md:text-right">
              <div className="text-xs font-bold tracking-[0.14em] text-[var(--text-muted)] uppercase">
                {locale === "bg" ? "Еднократно" : "One-time"}
              </div>
              <div className="font-display text-4xl font-extrabold text-[var(--text-main)]">
                {locale === "bg" ? "от 190 €" : "from 190 €"}
              </div>
              <div className="mt-1 text-xs text-[var(--text-muted)]">
                {locale === "bg" ? "финална цена спрямо обхвата" : "final price depends on scope"}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Monthly tiers */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
              {locale === "bg" ? "Стъпка 2 · Месечно" : "Step 2 · Monthly"}
            </span>
            <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
              {locale === "bg" ? "Нива на поддръжка" : "Levels of support"}
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] text-[var(--text-sub)] md:text-base">
              {locale === "bg"
                ? "Класирането се печели с постоянна работа. Избираш силата спрямо колко бързо искаш да растеш. Всяко ниво включва месечен отчет."
                : "Rankings are earned through consistent work. Choose the intensity based on how fast you want to grow. Every level includes a monthly report."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {seoTiers.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative flex flex-col rounded-[24px] border p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: tier.popular ? "var(--accent)" : "var(--border)",
                  background: "var(--bg-card)",
                  boxShadow: tier.popular ? "0 20px 40px color-mix(in srgb, var(--accent) 15%, transparent)" : undefined,
                }}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-md">
                    {locale === "bg" ? "Най-избиран" : "Most popular"}
                  </span>
                )}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                    <div className="text-xs font-medium tracking-wide text-[var(--text-muted)] uppercase">
                      {tier.role[locale]}
                    </div>
                  </div>
                  <Image src={tier.icon} alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
                </div>
                <div className="mb-1 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold">{tier.price} €</span>
                  <span className="text-sm text-[var(--text-muted)]">/{locale === "bg" ? "мес" : "mo"}</span>
                </div>
                <p className="mb-5 min-h-[2.6em] text-sm text-[var(--text-sub)]">{tier.description[locale]}</p>
                <div className="mb-5 border-t border-[var(--border)]" />
                <ul className="flex flex-1 flex-col gap-2.5">
                  {tier.features[locale].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-main)]/90">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* GEO callout */}
      <section className="pb-20 md:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="atelier-band-dark relative overflow-hidden rounded-[24px] p-8 md:p-12"
          >
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-[var(--color-text-on-dark)]/70 uppercase">
                  <Sparkles size={14} />
                  {locale === "bg" ? "Новото в SEO" : "What's new in SEO"}
                </span>
                <h3 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-on-dark)] md:text-3xl">
                  {locale === "bg" ? "Да те цитира и изкуственият интелект" : "Get cited by AI, too"}
                </h3>
                <p className="mb-5 text-[15px] text-[var(--color-text-on-dark)]/75 md:text-base">
                  {locale === "bg"
                    ? "Когато някой пита AI „коя фирма да наема“, отговорът вече замества Google. Проследяваме дали те споменават — услуга, която почти никоя българска агенция още не предлага."
                    : "When someone asks an AI \"which company should I hire,\" the answer now replaces Google. We track whether you get mentioned — a service almost no Bulgarian agency offers yet."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Google AI Overview", "ChatGPT", "Gemini", "Perplexity"].map((name) => (
                    <span key={name} className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-[var(--color-text-on-dark)]">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-center text-sm font-medium text-[var(--color-text-on-dark)]/80 md:text-right">
                {locale === "bg" ? (
                  <>Включено в <b className="text-[var(--color-text-on-dark)]">Aggressive</b><br />добавка за други нива</>
                ) : (
                  <>Included in <b className="text-[var(--color-text-on-dark)]">Aggressive</b><br />add-on for other tiers</>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Notes */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h4 className="mb-2 flex items-center gap-2 font-display text-base font-bold">
                <Badge variant="secondary">{locale === "bg" ? "Месечно" : "Monthly"}</Badge>
                {locale === "bg" ? "Какво купува таксата" : "What the fee buys"}
              </h4>
              <p className="text-sm text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Никога не е „само хостинг“. Всяка месечна такса е реален труд — виждаш отчет с качените позиции, хванатите запитвания и новите лийдове. Няма видима стойност — няма месечна такса."
                  : "It's never \"just hosting.\" Every monthly fee is real work — you see a report with ranking gains, captured inquiries, and new leads. No visible value, no monthly fee."}
              </p>
            </div>
            <div className="rounded-[20px] border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_5%,var(--bg-card))] p-6">
              <h4 className="mb-2 flex items-center gap-2 font-display text-base font-bold">
                <Badge variant="accent">{locale === "bg" ? "Първи клиенти" : "First clients"}</Badge>
                {locale === "bg" ? "Стартова отстъпка" : "Founding discount"}
              </h4>
              <p className="text-sm text-[var(--text-sub)]">
                {locale === "bg" ? (
                  <>Първите <b className="text-[var(--text-main)]">5 клиента</b> получават <span className="line-through">190 €</span> <b className="text-[var(--accent)]">145 €</b> за SEO Старт, срещу отзив (отзивът се публикува с ясно обозначение, че е получил отстъпка). Ограничено по време — редовната цена е ясна и на двете страни.</>
                ) : (
                  <>The first <b className="text-[var(--text-main)]">5 clients</b> get <span className="line-through">190 €</span> <b className="text-[var(--accent)]">145 €</b> for SEO Start, in exchange for a review (published with a clear disclosure that a discount was received). Time-limited — the regular price is clear to both sides.</>
                )}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-10 text-center"
          >
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              {locale === "bg" ? "Готови да те намират?" : "Ready to get found?"}
            </h3>
            <Link href="/contact?source=pricing-seo-page">
              <Button variant="primary" size="lg">
                {locale === "bg" ? "Заяви SEO одит" : "Request an SEO audit"}
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

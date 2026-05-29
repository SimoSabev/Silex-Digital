"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Zap,
  Bot,
  Code,
  Database,
  ArrowRight,
  Check,
  Play,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Quote,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import EmailAutomationDemo from "@/components/demos/EmailAutomationDemo";
import { useI18n } from "@/lib/i18n";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(
  () => import("@/components/animations/HeroVisualization"),
  { ssr: false, loading: () => <div className="w-full h-full rounded-2xl bg-[var(--bg-section)] animate-pulse" /> },
);

const ProblemVisualization = dynamic(
  () => import("@/components/animations/ProblemVisualization"),
  { ssr: false, loading: () => <div className="min-h-[200px] rounded-2xl bg-red-50/60 dark:bg-red-950/20 animate-pulse" /> },
);

const SolutionVisualization = dynamic(
  () => import("@/components/animations/SolutionVisualization"),
  { ssr: false, loading: () => <div className="min-h-[200px] rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 animate-pulse" /> },
);

const HowItWorksVisualization = dynamic(
  () => import("@/components/animations/HowItWorksVisualization"),
  { ssr: false, loading: () => <div className="min-h-[320px] rounded-xl animate-pulse bg-[var(--bg-card)]" /> },
);

const heroStats = [
  { icon: <Clock className="h-5 w-5" />, valueKey: "hero.stat1Value", labelKey: "hero.stat1Label" },
  { icon: <Users className="h-5 w-5" />, valueKey: "hero.stat2Value", labelKey: "hero.stat2Label" },
  { icon: <TrendingUp className="h-5 w-5" />, valueKey: "hero.stat3Value", labelKey: "hero.stat3Label" },
] as const;

const services = [
  {
    icon: <Code className="h-6 w-6" />,
    title: { bg: "Вашето лице онлайн", en: "Your face online" },
    description: {
      bg: "Сайт и Google, с които брандът ви изглежда сериозно и ви намират хората около вас — не шаблон, а решение за вашия бизнес.",
      en: "A website and Google presence that make your brand look serious and get you found locally — not a template, a fit for your business.",
    },
    price: { bg: "от 690 € старт + 49 €/мес", en: "from 690 EUR setup + 49 EUR/mo" },
    color: "blue" as const,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: { bg: "Да ви намират в града", en: "Found in your city" },
    description: {
      bg: "Когато някой търси услугата ви наблизо — излизате в Google. Подходящо за фирми, които живеят от местни клиенти.",
      en: "When someone nearby searches for what you offer — you show up on Google. For businesses that depend on local clients.",
    },
    price: { bg: "включено в уеб услугите", en: "included with web services" },
    color: "orange" as const,
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: { bg: "Отговори, които звучат като вас", en: "Replies that sound like you" },
    description: {
      bg: "Помощник във Viber и на сайта — знае цените ви, отговаря бързо и записва час. За бизнеси, където всеки разговор е пари.",
      en: "A helper on Viber and your site — knows your prices, replies fast, books appointments. For businesses where every chat is money.",
    },
    price: { bg: "от 290 € старт + 199 €/мес", en: "from 290 EUR setup + 199 EUR/mo" },
    color: "green" as const,
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: { bg: "Пълен образ + продажби", en: "Full brand + sales" },
    description: {
      bg: "Когато ви трябва и силен бранд онлайн, и отговори денонощно — съчетаваме сайт, Google и Viber в едно решение за вас.",
      en: "When you need both a strong online brand and round-the-clock replies — we combine site, Google, and Viber in one solution built for you.",
    },
    price: { bg: "от 990 € старт + 249 €/мес", en: "from 990 EUR setup + 249 EUR/mo" },
    color: "purple" as const,
  },
];

const testimonials = [
  {
    quote: {
      bg: "Откакто работим с SilexBrand, спестяваме по 20 часа седмично. Екипът ни вече се занимава с важното, не с имейли.",
      en: "Since working with SilexBrand we save 20 hours every week. Our team handles what matters, not inbox management.",
    },
    author: "Maria Petrova",
    role: {
      bg: "Управител, TechStore.bg",
      en: "Managing Director, TechStore.bg",
    },
    initials: "MP",
  },
  {
    quote: {
      bg: "Помощникът отговаря на клиентите ни денем и нощем. За един месец приехме с 35% повече поръчки.",
      en: "The assistant replies to our customers day and night. In one month we took 35% more orders.",
    },
    author: "Ivan Kolev",
    role: {
      bg: "Собственик, EcoShop.bg",
      en: "Owner, EcoShop.bg",
    },
    initials: "IK",
  },
  {
    quote: {
      bg: "Мислех, че е сложно. Оказа се, че за 3 дни всичко беше готово. Сега сайтът ми работи за мен, не аз за него.",
      en: "I thought it would be complicated. In 3 days everything was live. Now my website works for me, not the other way around.",
    },
    author: "Elena Stoyanova",
    role: {
      bg: "Собственик, Beauty Studio Елена",
      en: "Owner, Beauty Studio Elena",
    },
    initials: "ES",
  },
];

const serviceColorMap = {
  blue: "violet",
  green: "lime",
  purple: "coral",
  orange: "amber",
};

export default function HomeContent() {
  const { locale, t } = useI18n();
  const [monthlyLeads, setMonthlyLeads] = useState(60);
  const [averageDeal, setAverageDeal] = useState(120);

  const conversionLiftPct = 18;
  const estimatedExtraConsultations = Math.round(
    (monthlyLeads * conversionLiftPct) / 100,
  );
  const estimatedMonthlyGain = estimatedExtraConsultations * averageDeal;
  const referencePlanCost = 299;
  const estimatedRoi = Math.max(
    1,
    Math.round(estimatedMonthlyGain / referencePlanCost),
  );

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-28 lg:pb-24">
        <div
          className="pointer-events-none absolute inset-0 -z-0"
          aria-hidden
        >
          <div className="absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-[var(--violet)]/[0.07] blur-[100px]" />
          <div className="absolute right-[10%] top-[28%] h-48 w-48 rounded-full bg-[var(--coral)]/[0.06] blur-[80px]" />
        </div>
        <Container>
          <div className="relative z-10 mx-auto max-w-6xl">

            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
              <AnimatedSection delay={0}>
                <p className="mb-6 inline-flex max-w-[95%] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 px-4 py-2 text-[13px] font-medium leading-snug text-[var(--text-sub)] backdrop-blur-sm sm:max-w-none sm:text-sm">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--violet)]" />
                  {t("hero.badge")}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.08}>
                <h1 className="text-balance font-display text-[1.75rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.5rem] sm:leading-[1.1] lg:text-[3.25rem]">
                  <span className="block text-[var(--text-main)]">
                    <TextReveal key={`${locale}-1`} text={t("hero.headlineLine1")} delay={0.05} />
                  </span>
                  <span className="text-gradient-hero mt-2 block sm:mt-3">
                    <TextReveal key={`${locale}-2`} text={t("hero.headlineLine2")} delay={0.12} />
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <p className="mx-auto mt-6 max-w-[34rem] text-pretty text-[17px] leading-[1.65] text-[var(--text-sub)] sm:mt-7 sm:text-lg sm:leading-relaxed">
                  {t("hero.sub")}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.22}>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Magnetic className="block w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="h-12 w-full rounded-full border-none bg-[var(--coral)] px-7 text-[15px] font-bold text-white shadow-lg shadow-[var(--coral)]/25 transition-transform hover:-translate-y-0.5 hover:bg-[var(--coral-hover)] sm:h-11 sm:w-auto"
                      >
                        <Zap className="h-4 w-4" />
                        {t("hero.cta")}
                      </Button>
                    </Magnetic>
                  </Link>
                  <Link href="/demos" className="w-full sm:w-auto">
                    <Magnetic className="block w-full sm:w-auto">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--bg-card)]/60 px-7 text-[15px] font-semibold text-[var(--text-main)] backdrop-blur-sm transition-colors hover:border-[var(--violet)]/40 hover:bg-[var(--bg-card)] sm:h-11 sm:w-auto"
                      >
                        <Play className="h-4 w-4 text-[var(--violet)]" />
                        {t("hero.ctaSecondary")}
                      </Button>
                    </Magnetic>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.28}>
              <div className="hero-visual mx-auto h-[280px] w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-apple sm:h-[340px] md:h-[400px] lg:h-[440px]">
                <HeroVisualization />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.38}>
              <ul className="mx-auto mt-6 flex max-w-3xl flex-col divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/50 backdrop-blur-sm sm:mt-8 sm:flex-row sm:divide-x sm:divide-y-0">
                {heroStats.map((stat) => (
                  <li
                    key={stat.labelKey}
                    className="flex flex-1 flex-col items-center gap-0.5 px-4 py-4 text-center sm:py-5"
                  >
                    <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold tabular-nums text-[var(--violet)] sm:text-3xl">
                      {t(stat.valueKey)}
                    </span>
                    <span className="max-w-[11rem] text-[13px] leading-snug text-[var(--text-sub)] sm:max-w-[10.5rem] sm:text-sm">
                      {t(stat.labelKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

          </div>
        </Container>
      </section>

      {/* The Silex Pact (Сделката с бизнеса) */}
      <section className="relative py-12 border-y border-[var(--border)] bg-[var(--bg-section)]">
        <Container>
          <AnimatedSection delay={0.1}>
            <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--lime)]/30 bg-[var(--lime)]/5 p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="badge-lime mb-6 inline-flex rounded-full border border-[var(--lime)]/20 bg-[var(--lime)]/10 px-4 py-1.5 text-sm font-bold text-[var(--lime)] uppercase tracking-wider">
                  {t("home.pact.badge")}
                </div>
                <h3 className="mb-4 font-display text-2xl md:text-3xl font-extrabold text-[var(--text-main)]">
                  {t("home.pact.title")}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-[var(--text-sub)]">
                  {t("home.pact.body")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* The Two Pillars of Growth (Двата пътя на успеха) */}
      <section className="py-20 bg-transparent animate-fade-in">
        <Container>
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-[800] md:text-5xl">
              {t("home.pillars.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-sub)]">
              {t("home.pillars.sub")}
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Pillar A: Web Presence */}
            <AnimatedSection direction="left">
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-apple transition-all duration-400 hover:shadow-apple-hover hover:border-[var(--border-hover)] flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-[var(--text-main)]">
                  {t("home.pillars.a.title")}
                </h3>
                <p className="mb-6 text-[15px] leading-relaxed text-[var(--text-sub)] flex-1">
                  {t("home.pillars.a.body")}
                </p>
                <div className="mt-auto border-t border-[var(--border)] pt-6 flex items-center justify-between">
                  <span className="text-sm font-bold badge-violet rounded-full px-3 py-1">
                    {locale === "bg" ? "690 € старт + 49 €/месец" : "690 € setup + 49 €/month"}
                  </span>
                  <Link href="/services" className="flex items-center text-sm font-bold text-[var(--violet)]">
                    {locale === "bg" ? "Научи повече" : "Learn more"} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Pillar B: AI Autopilot */}
            <AnimatedSection direction="right">
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-apple transition-all duration-400 hover:shadow-apple-hover hover:border-[var(--border-hover)] flex flex-col">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--lime)]/10 text-[var(--lime)]">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-[var(--text-main)]">
                  {t("home.pillars.b.title")}
                </h3>
                <p className="mb-6 text-[15px] leading-relaxed text-[var(--text-sub)] flex-1">
                  {t("home.pillars.b.body")}
                </p>
                <div className="mt-auto border-t border-[var(--border)] pt-6 flex items-center justify-between">
                  <span className="text-sm font-bold badge-lime rounded-full px-3 py-1">
                    {locale === "bg" ? "290 € старт + 199 €/месец" : "290 € setup + 199 €/month"}
                  </span>
                  <Link href="/services" className="flex items-center text-sm font-bold text-[var(--lime)]">
                    {locale === "bg" ? "Научи повече" : "Learn more"} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Social Proof Bar */}

      {/* <section className="flex w-full items-center overflow-hidden border-y border-[var(--border)] bg-[var(--bg-section)] py-4">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="font-display text-sm font-bold tracking-wider text-[var(--text-sub)] uppercase">
              {locale === "bg"
                ? "247+ бизнеса вече не изпускат клиенти"
                : "247+ businesses already stop missing clients"}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden"> */}
              {/* Duplicated content for seamless marquee loop */}
              {/* <div className="absolute flex animate-[marquee_20s_linear_infinite] items-center gap-2 text-sm font-medium whitespace-nowrap text-[var(--text-main)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--lime)]" />
                <span>{locale === "bg" ? "Ресторант в София — получи 3 резервации тази нощ" : "Restaurant in Sofia — got 3 bookings overnight"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--violet)]" />
                <span>{locale === "bg" ? "Зъболекар във Варна — нула пропуснати обаждания" : "Dentist in Varna — zero missed calls"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--coral)]" />
                <span>{locale === "bg" ? "Козметичен салон в Пловдив — записва клиенти докато спи" : "Beauty salon in Plovdiv — books clients while sleeping"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--lime)]" />
                <span>{locale === "bg" ? "Ресторант в София — получи 3 резервации тази нощ" : "Restaurant in Sofia — got 3 bookings overnight"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--violet)]" />
                <span>{locale === "bg" ? "Зъболекар във Варна — нула пропуснати обаждания" : "Dentist in Varna — zero missed calls"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--coral)]" />
                <span>{locale === "bg" ? "Козметичен салон в Пловдив — записва клиенти докато спи" : "Beauty salon in Plovdiv — books clients while sleeping"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
              </div>
            </div>
          </div>
        </Container>
      </section> */}

      {/* Problem -> Solution */}
      <section className="relative bg-[var(--bg-section)] py-16 md:py-[120px] lg:py-[160px]">
        <Container>
          {/* Section label */}
          <AnimatedSection className="mb-10 text-center md:mb-16">
            <p className="font-display text-sm font-[700] tracking-[0.15em] text-[var(--text-muted)] uppercase">
              {locale === "bg" ? "Преди SilexBrand vs. След SilexBrand" : "Before SilexBrand vs. After SilexBrand"}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            {/* Before */}
            <AnimatedSection direction="left">
              <div className="h-full rounded-2xl border border-[var(--coral)]/20 bg-[var(--coral)]/5 p-5 shadow-apple sm:p-8 lg:p-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[var(--coral)]/10">
                    <AlertTriangle className="h-6 w-6 text-[var(--coral)]" />
                  </div>
                  <h2 className="font-display text-2xl font-[800] text-red-700 dark:text-red-400">
                    {locale === "bg" ? "Преди" : "Before"}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {[
                    locale === "bg" ? "Ръчно отговаряш на едни и същи въпроси всеки ден" : "Manually answering the same questions every day",
                    locale === "bg" ? "Клиент пише в 22:00 — ти го виждаш сутринта, той вече е при конкурента" : "Client messages at 10pm — you see it next morning, they've already gone to a competitor",
                    locale === "bg" ? "Половин работен ден губиш за неща, които могат да стават сами" : "Half your workday lost to things that could run themselves",
                    locale === "bg" ? "Не знаеш колко запитвания изпускаш всяка седмица" : "You don't know how many enquiries you're losing each week",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-[500] text-red-700 dark:text-red-400">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--coral)]/20">
                        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                          <path d="M3 3l6 6M9 3l-6 6" stroke="var(--coral)" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ProblemVisualization />
                </div>
              </div>
            </AnimatedSection>

            {/* VS Divider */}
            <div className="hidden items-center justify-center md:flex">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--border)] bg-transparent shadow-sm">
                  <span className="font-display text-xs font-[800] text-[var(--text-muted)]">VS</span>
                </div>
                <div className="h-20 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />
              </div>
            </div>

            {/* After */}
            <AnimatedSection direction="right">
              <div className="h-full rounded-2xl border-2 border-[var(--lime)]/20 bg-[var(--lime)]/5 p-5 shadow-apple sm:p-8 lg:p-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[var(--lime)]/10">
                    <Sparkles className="h-6 w-6 text-[var(--lime)]" />
                  </div>
                  <h2 className="font-display text-2xl font-[800] text-[var(--lime)]">
                    {locale === "bg" ? "След SilexBrand" : "After SilexBrand"}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {[
                    locale === "bg" ? "Клиентът получава отговор за секунди — дори в 23:00" : "Client gets a reply in seconds — even at 11pm",
                    locale === "bg" ? "Записваш клиенти докато спиш, без да вдигаш телефона" : "You book clients while sleeping, without answering calls",
                    locale === "bg" ? "Знаеш точно колко запитвания идват и колко се превръщат в поръчки" : "You know exactly how many inquiries come in and how many convert",
                    locale === "bg" ? "Работиш по-малко часа, вземаш повече" : "Work fewer hours, earn more",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-[700] text-[var(--lime)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--lime)]/20">
                        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                          <path d="M2.5 6l2.5 2.5 4.5-5" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <SolutionVisualization />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-transparent py-[80px] lg:py-[120px]">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <AnimatedSection direction="left">
              <div className="badge-lime mb-6 inline-flex rounded-full border border-[var(--lime)]/20 bg-[var(--lime)]/10 px-3 py-1 text-sm font-bold tracking-wider text-[var(--lime)] uppercase">
                {locale === "bg" ? "Как работи" : "How it works"}
              </div>
              <h2 className="mb-6 font-display text-4xl font-[800] text-[var(--text-main)] leading-tight lg:text-5xl">
                {locale === "bg" ? "От съобщение до клиент" : "From message to client"}
                <br />
                <span className="text-gradient-hero">
                  {locale === "bg" ? "за 47 секунди" : "in 47 seconds"}
                </span>
              </h2>
              <p className="text-[18px] leading-relaxed text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Платформата улавя всяко взаимодействие, отговаря мигновено и ти праща нотификация — ти трябва само да потвърдиш резервацията."
                  : "The platform captures every interaction, replies instantly and sends you a notification — you just confirm the booking."}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" className="lg:pt-2">
              <HowItWorksVisualization />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-transparent py-16 md:py-[120px] lg:py-[160px]">
        <Container>
          <AnimatedSection className="mb-20 text-center">
            <div className="badge-neutral mb-6 inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-sm font-bold tracking-wider uppercase">
              {t("home.services.badge")}
            </div>
            <h2 className="mb-6 font-display text-4xl font-[800] text-[var(--text-main)] lg:text-5xl">
              {t("home.services.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-[20px] text-[var(--text-sub)]">
              {t("home.services.sub")}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const accentKey = serviceColorMap[service.color] || "violet";
              return (
                <StaggerItem key={service.title.bg}>
                  <Link
                    href="/services"
                    className="group block h-full outline-none"
                  >
                    <div className="card relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-apple transition-all duration-400 hover:-translate-y-2 hover:border-[var(--border-hover)] hover:shadow-apple-hover">
                      <div
                        className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--${accentKey})]/10 origin-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        <div className={`text-[var(--${accentKey})]`}>
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="mb-4 font-display text-2xl font-[700] text-[var(--text-main)]">
                        {service.title[locale]}
                      </h3>
                      <p className="mb-8 flex-1 text-[16px] leading-relaxed text-[var(--text-sub)]">
                        {service.description[locale]}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span
                          className={`text-sm font-bold badge-${accentKey} rounded-full px-3 py-1`}
                        >
                          {service.price[locale]}
                        </span>
                        <ArrowRight className="h-6 w-6 text-[var(--text-sub)] transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection delay={0.3} className="mt-16 text-center">
            <Link href="/services">
              <Button
                variant="secondary"
                className="rounded-xl border-2 border-[var(--text-main)] px-8 py-4 text-lg font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--text-main)] hover:text-white"
              >
                {locale === "bg" ? "Виж всички услуги" : "View all services"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </Container>
      </section>

      {/* Interactive Demo Preview */}
      <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-section)] py-16 md:py-[120px] lg:py-[160px]">
        <Container>
          <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="badge-violet mb-6 inline-flex rounded-full border border-[var(--violet)]/20 bg-[var(--violet)]/10 px-3 py-1 text-sm font-bold tracking-wider text-[var(--violet)] uppercase">
                {locale === "bg"
                  ? "Интерактивна демонстрация"
                  : "Interactive demo"}
              </div>
              <h2 className="mb-6 font-display text-4xl leading-tight font-[800] text-[var(--text-main)] lg:text-5xl">
                {locale === "bg" ? "Виж как работи" : "See how"}
                <br />
                <span className="text-gradient-hero">
                  {locale === "bg"
                    ? "email автоматизацията"
                    : "email automation works"}
                </span>
              </h2>
              <p className="mb-8 text-[20px] leading-relaxed text-[var(--text-sub)]">
                {locale === "bg"
                  ? 'Натисни "Тествай" и виж как изглежда, когато клиент пише и получава отговор автоматично — без ти да правиш нищо.'
                  : 'Press "Test" and see what it looks like when a client messages and gets an automatic reply — without you doing anything.'}
              </p>
              <ul className="mb-10 space-y-4">
                <li className="flex items-center gap-4 text-lg font-bold text-[var(--text-main)]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--lime)]">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  {locale === "bg" ? "Безплатно за изпробване" : "Free to try"}
                </li>
                <li className="flex items-center gap-4 text-lg font-bold text-[var(--text-main)]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--lime)]">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  {locale === "bg"
                    ? "Само за 2 минути"
                    : "Takes only 2 minutes"}
                </li>
                <li className="flex items-center gap-4 text-lg font-bold text-[var(--text-main)]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--lime)]">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  {locale === "bg"
                    ? "Виж резултата веднага"
                    : "See results instantly"}
                </li>
              </ul>
              <Link href="/demos">
                <Button
                  variant="ghost"
                  className="rounded-xl px-6 py-3 text-lg font-bold text-[var(--violet)] transition-colors hover:bg-[var(--violet)]/10"
                >
                  {locale === "bg"
                    ? "Виж всички демонстрации"
                    : "View all demos"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[var(--violet)]/20 to-[var(--coral)]/20 blur-3xl" />
              <div className="card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-apple-hover">
                <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-transparent">
                  <EmailAutomationDemo />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ROI Estimator */}
      <section className="bg-transparent py-[120px] lg:py-[160px]">
        <Container>
          <AnimatedSection className="mx-auto max-w-5xl">
            <div className="card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-apple-hover md:p-12">
              <div className="badge-coral mb-6 inline-flex rounded-full border border-[var(--coral)] bg-[var(--coral)]/10 px-4 py-2 text-sm font-bold tracking-wider text-[var(--coral)] uppercase">
                {locale === "bg"
                  ? "Бърз ROI калкулатор"
                  : "Quick ROI estimator"}
              </div>
              <h2 className="mb-4 font-display text-4xl font-[800] text-[var(--text-main)] lg:text-5xl">
                {locale === "bg"
                  ? "Колко консултации можеш да добавиш месечно"
                  : "How many extra consultations you can add monthly"}
              </h2>
              <p className="mb-12 text-[20px] text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Въведи приблизителни стойности и виж колко допълнителни клиенти можеш да спечелиш само с по-бърз отговор."
                  : "Enter rough values and see how many extra clients you could win simply by responding faster."}
              </p>

              <div className="mb-12 grid gap-10 md:grid-cols-2">
                <label className="block">
                  <div className="mb-4 flex items-end justify-between">
                    <span className="text-lg font-bold text-[var(--text-main)]">
                      {locale === "bg"
                        ? "Месечни запитвания"
                        : "Monthly inquiries"}
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold text-[var(--violet)]">
                      {monthlyLeads}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={400}
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                    className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-[var(--bg-section)] accent-[var(--violet)]"
                  />
                </label>

                <label className="block">
                  <div className="mb-4 flex items-end justify-between">
                    <span className="text-lg font-bold text-[var(--text-main)]">
                      {locale === "bg"
                        ? "Средна стойност на продажба"
                        : "Average deal value"}
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold text-[var(--violet)]">
                      {averageDeal} €
                    </span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={600}
                    step={10}
                    value={averageDeal}
                    onChange={(e) => setAverageDeal(Number(e.target.value))}
                    className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-[var(--bg-section)] accent-[var(--violet)]"
                  />
                </label>
              </div>

              <div className="grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-section)] p-8 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
                    {locale === "bg"
                      ? "Допълнителни консултации"
                      : "Extra consultations"}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--text-main)] lg:text-5xl">
                    +{estimatedExtraConsultations}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
                    {locale === "bg"
                      ? "Потенциален месечен ефект"
                      : "Potential monthly upside"}
                  </p>
                  <p className="font-display text-4xl font-[800] text-[var(--lime)] xl:text-5xl">
                    {estimatedMonthlyGain.toLocaleString("en-US")} €
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
                    {locale === "bg" ? "Ориентировъчен ROI" : "Estimated ROI"}
                  </p>
                  <p className="font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--violet)] lg:text-5xl">
                    {estimatedRoi}x
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href={`/contact?source=roi-home&offer=first-order-bonus&intent=roi-estimate&pack=grow&monthlyLeads=${monthlyLeads}&leadValue=${averageDeal}`}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-xl bg-[var(--text-main)] px-10 py-5 text-lg font-bold text-white transition-transform hover:-translate-y-1 hover:bg-[#222]"
                  >
                    {locale === "bg"
                      ? "Искам персонална ROI сметка"
                      : "I want a personalized ROI estimate"}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-section)] py-[120px] lg:py-[160px]">
        <Container className="px-0 md:px-6">
          <AnimatedSection className="mb-16 px-6 text-center">
            <h2 className="font-display text-4xl font-[800] text-[var(--text-main)] lg:text-5xl">
              {locale === "bg"
                ? "Какво казват нашите клиенти"
                : "What our clients say"}
            </h2>
          </AnimatedSection>

          {/* Horizontal scroll carousel */}
          <div className="hide-scrollbar flex w-full snap-x snap-mandatory gap-8 overflow-x-auto px-6 pt-4 pb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card relative w-[85vw] shrink-0 snap-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-10 shadow-apple md:w-[400px]"
              >
                <Quote className="absolute top-8 right-8 h-20 w-20 text-[var(--violet)]/10" />
                <div className="relative z-10 mb-6 flex gap-1">
                  {[...Array<unknown>(5)].map((_, i: number) => (
                    <svg
                      key={i}
                      className="h-6 w-6 fill-current text-[#F59E0B]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="relative z-10 mb-10 text-[18px] leading-relaxed font-medium text-[var(--text-main)]">
                  &ldquo;{testimonial.quote[locale]}&rdquo;
                </p>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--violet)] text-xl font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-display text-lg font-[800] text-[var(--text-main)]">
                      {testimonial.author}
                    </div>
                    <div className="text-sm font-bold text-[var(--text-sub)]">
                      {testimonial.role[locale]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Teaser */}
      <section className="bg-transparent py-[120px] lg:py-[160px]">
        <Container>
          <AnimatedSection className="mb-20 text-center">
            <h2 className="mb-6 font-display text-4xl font-[800] text-[var(--text-main)] lg:text-5xl">
              {locale === "bg"
                ? "Прозрачни цени за микробизнес"
                : "Transparent pricing for micro-business"}
            </h2>
            <p className="mx-auto max-w-2xl text-[20px] text-[var(--text-sub)]">
              {locale === "bg"
                ? "По-достъпен вход, ясен ъпгрейд път и реална стойност от първия месец."
                : "Lower entry point, clear upgrade path, and real value from month one."}
            </p>
          </AnimatedSection>

          <StaggerContainer className="mx-auto grid max-w-5xl items-stretch gap-8 md:grid-cols-3">
            {/* Start (Web Foundation) */}
            <StaggerItem>
              <div className="card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center shadow-apple h-full flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 font-display text-2xl font-[800] text-[var(--text-main)]">
                    Start
                  </h3>
                  <p className="mb-6 text-xs font-bold tracking-wider text-[var(--text-muted)] uppercase">
                    {locale === "bg"
                      ? "Уеб Основа & Google карти"
                      : "Web Foundation & Google Maps"}
                  </p>
                  <div className="mb-1 font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--text-main)]">
                    {locale === "bg" ? "49 €" : "49 EUR"}
                  </div>
                  <div className="text-xs font-bold text-[var(--text-muted)] mb-8 uppercase tracking-wide">
                    {locale === "bg" ? "/месец + 690 € старт" : "/month + 690 € setup"}
                  </div>
                  <ul className="mb-10 space-y-4 text-left border-t border-[var(--border)] pt-6">
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Професионален сайт (Код или CMS)" : "Professional website (Code or CMS)"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Скорост под 1.2 секунди" : "Speed index < 1.2s"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Google Карти & Локално SEO" : "Google Maps & Local SEO"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Edge хостинг & SSL защита" : "Edge hosting & SSL security"}
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact?source=pricing-home&offer=first-order-bonus&intent=starter-pack&pack=start"
                  className="block"
                >
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl border-2 border-[var(--text-main)] py-4 text-lg font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--text-main)] hover:text-white"
                  >
                    {locale === "bg" ? "Избери Start" : "Select Start"}
                  </Button>
                </Link>
              </div>
            </StaggerItem>

            {/* Grow (Smart AI Agent) */}
            <StaggerItem>
              <div className="card relative z-10 scale-100 transform rounded-2xl border border-[var(--violet)] bg-[var(--bg-card)] p-8 text-center shadow-apple-hover md:scale-105 h-full flex flex-col justify-between">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[#b185ff] px-6 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-lg">
                    {locale === "bg" ? "Популярен" : "Popular"}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 font-display text-2xl font-[800] text-[var(--text-main)]">
                    Grow
                  </h3>
                  <p className="mb-6 text-xs font-bold tracking-wider text-[var(--violet)] uppercase">
                    {locale === "bg"
                      ? "AI секретар във Viber & Уебсайт"
                      : "AI Agent in Viber & Website"}
                  </p>
                  <div className="mb-1 font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--violet)]">
                    {locale === "bg" ? "199 €" : "199 EUR"}
                  </div>
                  <div className="text-xs font-bold text-[var(--text-muted)] mb-8 uppercase tracking-wide">
                    {locale === "bg" ? "/месец + 49 € AI Ядро + 290 € старт" : "/month + 49 € AI Core + 290 € setup"}
                  </div>
                  <ul className="mb-10 space-y-4 text-left border-t border-[var(--border)] pt-6">
                    <li className="flex items-center gap-3 text-[15px] font-bold text-[var(--text-main)]">
                      <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                      {locale === "bg" ? "AI асистент денонощно" : "24/7 AI chat receptionist"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-bold text-[var(--text-main)]">
                      <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                      {locale === "bg" ? "Интеграция във Viber & Уебсайт" : "Viber & Web integration"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-bold text-[var(--text-main)]">
                      <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                      {locale === "bg" ? "Автоматично записване на часове" : "Automated bookings"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-bold text-[var(--text-main)]">
                      <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                      {locale === "bg" ? "Сейф за Клиенти (CRM база)" : "Secure Client Vault CRM"}
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact?source=pricing-home&offer=first-order-bonus&intent=grow-pack&pack=grow"
                  className="block"
                >
                  <Button
                    variant="primary"
                    className="w-full rounded-xl border-none bg-[var(--violet)] py-4 text-lg font-bold text-white shadow-[var(--violet)]/30 shadow-lg transition-transform hover:-translate-y-1 hover:bg-[var(--violet-hover)]"
                  >
                    {locale === "bg" ? "Избери Grow" : "Select Grow"}
                  </Button>
                </Link>
              </div>
            </StaggerItem>

            {/* Pro (Complete Digital Machine) */}
            <StaggerItem>
              <div className="card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center shadow-apple h-full flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 font-display text-2xl font-[800] text-[var(--text-main)]">
                    Pro
                  </h3>
                  <p className="mb-6 text-xs font-bold tracking-wider text-[var(--text-muted)] uppercase">
                    {locale === "bg"
                      ? "Дигитален Автопилот: Сайт + AI"
                      : "Digital Autopilot: Website + AI"}
                  </p>
                  <div className="mb-1 font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--text-main)]">
                    {locale === "bg" ? "249 €" : "249 EUR"}
                  </div>
                  <div className="text-xs font-bold text-[var(--text-muted)] mb-8 uppercase tracking-wide">
                    {locale === "bg" ? "/месец + 49 € AI Ядро + 990 € старт" : "/month + 49 € AI Core + 990 € setup"}
                  </div>
                  <ul className="mb-10 space-y-4 text-left border-t border-[var(--border)] pt-6">
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Цялостен нов премиум уебсайт" : "Custom premium website build"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "AI по всички чат канали" : "Viber, WhatsApp & Messenger AI"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Синхронизация в реално време" : "Real-time catalog & stock sync"}
                    </li>
                    <li className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-main)]">
                      <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                      {locale === "bg" ? "Лична техническа поддръжка" : "Dedicated developer support"}
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact?source=pricing-home&offer=first-order-bonus&intent=pro-pack&pack=pro"
                  className="block"
                >
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl border-2 border-[var(--text-main)] py-4 text-lg font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--text-main)] hover:text-white"
                  >
                    {locale === "bg" ? "Избери Pro" : "Select Pro"}
                  </Button>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* Final CTA */}
      <AnimatedSection>
        <section className="bg-gradient-to-br from-[var(--violet)] to-[var(--coral)] py-[120px] lg:py-[160px]">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-8 font-display text-5xl leading-tight font-[800] text-white lg:text-7xl">
                <TextReveal
                  key={locale}
                  text={locale === "bg" ? "СПРИ ДА ИЗПУСКАШ КЛИЕНТИ ДНЕС" : "STOP LOSING CLIENTS TODAY"}
                />
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-2xl leading-relaxed font-medium text-white/90">
                {locale === "bg"
                  ? "Разговор от 30 минути, без ангажимент. Ще ти покажем точно кои клиенти изпускаш сега и как да ги спреш."
                  : "A 30-minute call, no commitment. We'll show you exactly which clients you're losing now and how to stop it."}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact?source=final-cta-home&offer=first-order-bonus&intent=consultation&pack=grow">
                  <Magnetic>
                    <Button
                      variant="primary"
                      size="lg"
                      className="h-auto rounded-xl border-none bg-white px-10 py-5 text-xl font-[800] text-[var(--text-main)] shadow-apple transition-transform hover:-translate-y-1 hover:bg-white/90"
                    >
                      {locale === "bg"
                        ? "Заяви безплатна консултация"
                        : "Request a free consultation"}
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Magnetic>
                </Link>
                <Link href="/demos">
                  <Magnetic>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="h-auto rounded-xl border-2 border-white px-10 py-5 text-xl font-[800] text-white transition-colors hover:bg-white/10"
                    >
                      {locale === "bg"
                        ? "Виж интерактивни демота"
                        : "View interactive demos"}
                    </Button>
                  </Magnetic>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </AnimatedSection>
    </div>
  );
}

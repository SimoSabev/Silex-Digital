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

const HowItWorksVisualization = dynamic(
  () => import("@/components/animations/HowItWorksVisualization"),
  { ssr: false, loading: () => <div className="min-h-[320px] rounded-xl animate-pulse bg-[var(--bg-card)]" /> },
);

const stats = [
  {
    icon: <Clock className="h-5 w-5" />,
    value: "15+",
    label: {
      bg: "часа спестени месечно",
      en: "hours saved monthly",
    },
  },
  {
    icon: <Users className="h-5 w-5" />,
    value: "120+",
    label: {
      bg: "микробизнеса с по-бърз отговор",
      en: "micro-businesses with faster response",
    },
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: "40%",
    label: {
      bg: "по-малко изпуснати запитвания",
      en: "fewer missed inquiries",
    },
  },
];

const services = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: { bg: "Workflow автоматизация", en: "Workflow automation" },
    description: {
      bg: "Автоматизирай повтарящи се задачи. Запитвания, нотификации и базов CRM поток - без сложен setup.",
      en: "Automate repetitive work. Inquiries, notifications, and basic CRM flow without complex setup.",
    },
    price: { bg: "от 149 €/месец", en: "from 149 EUR/month" },
    color: "blue" as const,
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: { bg: "AI агенти", en: "AI agents" },
    description: {
      bg: "Интелигентни ботове за първи отговор 24/7. Категоризират запитвания и подготвят следваща стъпка.",
      en: "Intelligent bots for 24/7 first response. They classify inquiries and prepare the next step.",
    },
    price: { bg: "от 299 €/месец", en: "from 299 EUR/month" },
    color: "green" as const,
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: { bg: "Уеб разработка", en: "Web development" },
    description: {
      bg: "Сайт, който изглежда професионално и генерира запитвания. Подходящ за микро бизнес във Варна.",
      en: "A professional website that generates inquiries. Designed for micro businesses in Varna.",
    },
    price: { bg: "от 990 € старт", en: "from 990 EUR setup" },
    color: "purple" as const,
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: { bg: "CMS интеграции", en: "CMS integrations" },
    description: {
      bg: "Подреждаме съдържанието така, че да го управляваш лесно - без зависимост от разработчик за всяка дребна промяна.",
      en: "We organize your content so you can manage it easily without relying on a developer for every small update.",
    },
    price: { bg: "от 199 €/месец", en: "from 199 EUR/month" },
    color: "orange" as const,
  },
];

const testimonials = [
  {
    quote: {
      bg: "След като имплементирахме automation-а, спестихме 20 часа седмично. Екипът ни се фокусира върху важните задачи.",
      en: "After implementing automation, we saved 20 hours every week. Our team now focuses on high-impact work.",
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
      bg: "AI чатботът отговаря на клиенти ни 24/7. Конверсията ни се повиши с 35% само за един месец.",
      en: "The AI chatbot responds to our customers 24/7. Conversion increased by 35% in just one month.",
    },
    author: "Ivan Kolev",
    role: {
      bg: "CEO, EcoShop.bg",
      en: "CEO, EcoShop.bg",
    },
    initials: "IK",
  },
  {
    quote: {
      bg: "Професионални, бързи и винаги на линия. Препоръчвам ги на всеки бизнес който иска да расте.",
      en: "Professional, fast, and always available. I recommend them to any business that wants to grow.",
    },
    author: "Elena Stoyanova",
    role: {
      bg: "Маркетинг директор, FinancePro",
      en: "Marketing Director, FinancePro",
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
  const { locale } = useI18n();
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
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-32">
        <Container>
          <div className="relative z-10 mx-auto max-w-7xl">

            {/* ── Centered text block ── */}
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <AnimatedSection delay={0}>
                <div className="badge-violet mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium">
                  <span className="animate-pulse-dot h-2 w-2 rounded-full bg-[var(--violet)]" />
                  {locale === "bg"
                    ? "Автоматизация за български бизнес"
                    : "Automation for Bulgarian businesses"}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h1 className="mb-6 font-display text-[48px] leading-[1.1] font-[800] tracking-tight lg:text-[72px]">
                  <span className="text-gradient-hero block">
                    <TextReveal
                      text={locale === "bg" ? "РАБОТИ КАТО ИМАШ 10 ЕКСТРА СЛУЖИТЕЛЯ" : "WORK LIKE YOU HAVE 10 EXTRA EMPLOYEES"}
                      delay={0.1}
                    />
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="mx-auto mb-10 max-w-[600px] text-[20px] leading-relaxed text-[var(--text-sub)]">
                  {locale === "bg"
                    ? "Спести над 15 часа работа месечно с модерни автоматизации — бизнесът работи за теб, дори когато си зает."
                    : "Save over 15 hours of work per month with modern website automations, so your business keeps moving when you are busy."}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <Magnetic>
                      <Button
                        variant="primary"
                        size="lg"
                        className="h-auto rounded-xl border-none bg-[var(--coral)] px-8 py-4 text-lg font-bold text-white shadow-[var(--coral)]/20 shadow-xl transition-transform hover:-translate-y-1 hover:bg-[var(--coral-hover)]"
                      >
                        <Zap className="h-5 w-5" />
                        {locale === "bg" ? "Започни безплатно" : "Start for free"}
                      </Button>
                    </Magnetic>
                  </Link>
                  <Link href="/demos">
                    <Magnetic>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="h-auto rounded-xl border-2 border-[var(--violet)] px-8 py-4 text-lg font-bold text-[var(--violet)] transition-colors hover:bg-[var(--violet)]/10"
                      >
                        <Play className="h-5 w-5" />
                        {locale === "bg" ? "Виж демо" : "View demo"}
                      </Button>
                    </Magnetic>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* ── Full-width visualization ── */}
            <AnimatedSection delay={0.35}>
              <div className="h-[360px] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-apple-hover sm:h-[420px] md:h-[480px] lg:h-[540px]">
                <HeroVisualization />
              </div>
            </AnimatedSection>

            {/* ── Stats row ── */}
            <AnimatedSection delay={0.5}>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="card flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center shadow-apple transition-all duration-400 hover:shadow-apple-hover"
                  >
                    <div className="mb-3 font-['JetBrains_Mono',monospace] text-[48px] leading-none font-bold text-[var(--violet)]">
                      {stat.value}
                    </div>
                    <div className="font-display text-[16px] font-bold tracking-wide text-[var(--text-sub)] uppercase">
                      {stat.label[locale]}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </section>

      {/* Social Proof Bar */}
      <section className="flex w-full items-center overflow-hidden border-y border-[var(--border)] bg-[var(--bg-section)] py-4">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="font-display text-sm font-bold tracking-wider text-[var(--text-sub)] uppercase">
              {locale === "bg"
                ? "Доверен от 247+ български бизнеса"
                : "Trusted by 247+ Bulgarian businesses"}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden">
              {/* Duplicated content for seamless marquee loop */}
              <div className="absolute flex animate-[marquee_20s_linear_infinite] items-center gap-2 text-sm font-medium whitespace-nowrap text-[var(--text-main)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--lime)]" />
                <span>{locale === "bg" ? "Ресторант в София се присъедини преди 2 часа" : "Restaurant in Sofia joined 2 hours ago"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--violet)]" />
                <span>{locale === "bg" ? "Клиника във Варна добави AI агент" : "Clinic in Varna added AI agent"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--coral)]" />
                <span>{locale === "bg" ? "Beauty salon в Пловдив стартира автоматизация" : "Beauty salon in Plovdiv started automation"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--lime)]" />
                <span>{locale === "bg" ? "Ресторант в София се присъедини преди 2 часа" : "Restaurant in Sofia joined 2 hours ago"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--violet)]" />
                <span>{locale === "bg" ? "Клиника във Варна добави AI агент" : "Clinic in Varna added AI agent"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--coral)]" />
                <span>{locale === "bg" ? "Beauty salon в Пловдив стартира автоматизация" : "Beauty salon in Plovdiv started automation"}</span>
                <span className="mx-8 text-[var(--text-muted)]">•</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem -> Solution */}
      <section className="relative bg-[var(--bg-section)] py-16 md:py-[120px] lg:py-[160px]">
        <Container>
          {/* Section label */}
          <AnimatedSection className="mb-10 text-center md:mb-16">
            <p className="font-display text-sm font-[700] tracking-[0.15em] text-[var(--text-muted)] uppercase">
              {locale === "bg" ? "Без автоматизация vs. С автоматизация" : "Without vs. With automation"}
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
                  <h2 className="font-display text-2xl font-[800] text-[var(--coral-hover)]">
                    {locale === "bg" ? "Преди" : "Before"}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {[
                    locale === "bg" ? "Ръчно отговаряне на имейли — 3 часа дневно" : "Manual email replies — 3 hours daily",
                    locale === "bg" ? "Изгубени лийдове заради бавни отговори" : "Lost leads due to slow responses",
                    locale === "bg" ? "Повтарящи се задачи ядат времето на екипа" : "Repetitive tasks consume team time",
                    locale === "bg" ? "Данни разпръснати в 5 различни системи" : "Data spread across 5 different systems",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-[500] text-[var(--coral-hover)]">
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
                  <h2 className="font-display text-2xl font-[800] text-[var(--lime-hover)]">
                    {locale === "bg" ? "След автоматизация" : "After automation"}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {[
                    locale === "bg" ? "AI отговаря на имейли за секунди" : "AI replies to emails in seconds",
                    locale === "bg" ? "Незабавни отговори = повече клиенти" : "Instant responses = more customers",
                    locale === "bg" ? "Екипът се фокусира върху важното" : "Team focuses on what matters",
                    locale === "bg" ? "Всичко свързано на едно място" : "Everything connected in one place",
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
              {locale === "bg" ? "Услуги" : "Services"}
            </div>
            <h2 className="mb-6 font-display text-4xl font-[800] text-[var(--text-main)] lg:text-5xl">
              {locale === "bg"
                ? "Какво можем да автоматизираме"
                : "What we can automate"}
            </h2>
            <p className="mx-auto max-w-2xl text-[20px] text-[var(--text-sub)]">
              {locale === "bg"
                ? "От прости имейл автоматизации до комплексни AI агенти. Избираш нивото на автоматизация според нуждите си."
                : "From simple email automations to complex AI agents. Choose the level of automation based on your needs."}
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
                  ? 'Избери тригър и действия. Натисни "Тествай" и виж как твоят workflow би протекъл автоматично. Няма нужда от код.'
                  : 'Choose a trigger and actions. Press "Test" and see how your workflow runs automatically. No code required.'}
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
                  ? "Въведи приблизителни стойности и виж потенциала при по-бърз отговор и автоматичен follow-up."
                  : "Enter rough values and estimate upside from faster response and automated follow-up."}
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

          <StaggerContainer className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3">
            {/* Starter */}
            <StaggerItem>
              <div className="card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center shadow-apple">
                <h3 className="mb-2 font-display text-2xl font-[800] text-[var(--text-main)]">
                  Starter
                </h3>
                <p className="mb-6 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
                  {locale === "bg"
                    ? "Микро бизнес старт"
                    : "Micro business start"}
                </p>
                <div className="mb-8 font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--text-main)]">
                  {locale === "bg" ? "149 €" : "149 EUR"}
                </div>
                <ul className="mb-10 space-y-4 text-left">
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    1{" "}
                    {locale === "bg"
                      ? "light автоматизация"
                      : "light automation"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    Email {locale === "bg" ? "интеграция" : "integration"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    {locale === "bg"
                      ? "месечен мини отчет"
                      : "monthly mini report"}
                  </li>
                </ul>
                <Link
                  href="/contact?source=pricing-home&offer=first-order-bonus&intent=starter-pack&pack=start"
                  className="block"
                >
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl border-2 border-[var(--text-main)] py-4 text-lg font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--text-main)] hover:text-white"
                  >
                    {locale === "bg" ? "Започни" : "Get started"}
                  </Button>
                </Link>
              </div>
            </StaggerItem>

            {/* Pro (Popular) */}
            <StaggerItem>
              <div className="card relative z-10 scale-100 transform rounded-2xl border border-[var(--violet)] bg-[var(--bg-card)] p-10 text-center shadow-apple-hover md:scale-105">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[var(--coral)] px-6 py-2 text-sm font-bold tracking-wider text-white uppercase shadow-lg">
                    Popular
                  </span>
                </div>
                <h3 className="mb-2 font-display text-2xl font-[800] text-[var(--text-main)]">
                  Pro
                </h3>
                <p className="mb-6 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
                  {locale === "bg"
                    ? "Grow пакет за локален бизнес"
                    : "Grow package for local business"}
                </p>
                <div className="mb-8 font-['JetBrains_Mono',monospace] text-5xl font-[800] text-[var(--violet)]">
                  {locale === "bg" ? "299 €" : "299 EUR"}
                </div>
                <ul className="mb-10 space-y-4 text-left">
                  <li className="flex items-center gap-3 text-[16px] font-bold text-[var(--text-main)]">
                    <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                    3 {locale === "bg" ? "автоматизации" : "automations"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-bold text-[var(--text-main)]">
                    <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                    {locale === "bg" ? "AI чатбот" : "AI chatbot"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-bold text-[var(--text-main)]">
                    <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                    CRM {locale === "bg" ? "настройка" : "setup"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-bold text-[var(--text-main)]">
                    <Check className="h-6 w-6 flex-shrink-0 text-[var(--violet)]" />{" "}
                    {locale === "bg"
                      ? "2 оптимизации месечно"
                      : "2 monthly optimizations"}
                  </li>
                </ul>
                <Link
                  href="/contact?source=pricing-home&offer=first-order-bonus&intent=grow-pack&pack=grow"
                  className="block"
                >
                  <Button
                    variant="primary"
                    className="w-full rounded-xl border-none bg-[var(--violet)] py-4 text-lg font-bold text-white shadow-[var(--violet)]/30 shadow-lg transition-transform hover:-translate-y-1 hover:bg-[var(--violet-hover)]"
                  >
                    {locale === "bg" ? "Започни" : "Get started"}
                  </Button>
                </Link>
              </div>
            </StaggerItem>

            {/* Enterprise */}
            <StaggerItem>
              <div className="card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center shadow-apple">
                <h3 className="mb-2 font-display text-2xl font-[800] text-[var(--text-main)]">
                  Enterprise
                </h3>
                <p className="mb-6 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
                  {locale === "bg"
                    ? "За бизнеси с активен растеж"
                    : "For growth-focused businesses"}
                </p>
                <div className="mb-8 font-['JetBrains_Mono',monospace] text-4xl font-[800] text-[var(--text-main)]">
                  {locale === "bg" ? "549 €" : "549 EUR"}
                </div>
                <ul className="mb-10 space-y-4 text-left">
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    6+ {locale === "bg" ? "автоматизации" : "automations"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    Dedicated {locale === "bg" ? "AI агент" : "AI agent"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    {locale === "bg"
                      ? "Персонализирани интеграции"
                      : "Custom integrations"}
                  </li>
                  <li className="flex items-center gap-3 text-[16px] font-medium text-[var(--text-main)]">
                    <Check className="h-5 w-5 flex-shrink-0 text-[var(--lime)]" />{" "}
                    {locale === "bg"
                      ? "Приоритетна поддръжка"
                      : "Priority support"}
                  </li>
                </ul>
                <Link
                  href="/contact?source=pricing-home&offer=first-order-bonus&intent=pro-pack&pack=pro"
                  className="block"
                >
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl border-2 border-[var(--text-main)] py-4 text-lg font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--text-main)] hover:text-white"
                  >
                    {locale === "bg" ? "Свържи се" : "Contact us"}
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
                  text={locale === "bg" ? "ГОТОВ ЛИ СИ ДА АВТОМАТИЗИРАШ?" : "READY TO AUTOMATE YOUR BUSINESS?"}
                />
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-2xl leading-relaxed font-medium text-white/90">
                {locale === "bg"
                  ? "Започни с безплатна 30-минутна консултация. Ще ти покажем точно как автоматизацията може да помогне на твоя бизнес."
                  : "Start with a free 30-minute consultation. We will show you exactly how automation can help your business."}
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

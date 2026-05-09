"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Bot,
  Code,
  Database,
  ArrowRight,
  Check,
  Search,
  PenTool,
  Wrench,
  Rocket,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

const services = [
  {
    icon: <Zap size={64} className="text-[var(--violet)]" />,
    title: { bg: "Workflow автоматизация", en: "Workflow automation" },
    description: {
      bg: "Леки автоматизации за ежедневни задачи и по-бърз отговор към клиенти. Спестете време и ресурси с интелигентни работни процеси.",
      en: "Light automations for daily tasks and faster responses to customer inquiries. Save time and resources with intelligent workflows.",
    },
    price: { bg: "от 149 €", en: "from 149 EUR" },
    color: "bg-[var(--violet)]/10 border-[var(--violet)]",
    iconBg: "bg-[var(--violet)]/20 text-[var(--violet)]",
    badge: "badge-violet",
    features: {
      bg: [
        "Lead capture и сортиране",
        "Автоматични известия",
        "CRM синхронизация",
        "Follow-up напомняния",
      ],
      en: [
        "Lead capture and routing",
        "Automated alerts",
        "CRM synchronization",
        "Follow-up reminders",
      ],
    },
    demo: "/demos",
  },
  {
    icon: <Bot size={64} className="text-[var(--coral)]" />,
    title: { bg: "AI агенти", en: "AI agents" },
    description: {
      bg: "Интелигентен първи контакт, който не изпуска запитвания извън работно време. Предложете денонощна поддръжка.",
      en: "A smart first contact layer that captures inquiries outside business hours. Offer 24/7 support.",
    },
    price: { bg: "от 299 €", en: "from 299 EUR" },
    color: "bg-[var(--coral)]/10 border-[var(--coral)]",
    iconBg: "bg-[var(--coral)]/20 text-[var(--coral)]",
    badge: "badge-coral",
    features: {
      bg: [
        "BG/EN отговори",
        "Базова квалификация",
        "Записване на запитвания",
        "Насочване към екип",
      ],
      en: [
        "BG/EN responses",
        "Basic qualification",
        "Inquiry capture",
        "Team handoff",
      ],
    },
    demo: "/demos",
  },
  {
    icon: <Code size={64} className="text-[var(--lime)]" />,
    title: { bg: "Уеб разработка", en: "Web development" },
    description: {
      bg: "Професионален сайт и лендинг страници, направени да носят запитвания. Модерна визия и изключителна скорост.",
      en: "Professional websites and landing pages built to generate inquiries. Modern look and exceptional speed.",
    },
    price: { bg: "от 549 €", en: "from 549 EUR" },
    color: "bg-[var(--lime)]/10 border-[var(--lime)]",
    iconBg: "bg-[var(--lime)]/20 text-[var(--lime)]",
    badge: "badge-lime",
    features: {
      bg: [
        "Landing страници",
        "Фирмен сайт",
        "Основно SEO",
        "Свързване с форми",
      ],
      en: [
        "Landing pages",
        "Business websites",
        "Basic SEO",
        "Lead form integration",
      ],
    },
    demo: "/demos",
  },
  {
    icon: <Database size={64} className="text-[var(--violet)]" />,
    title: { bg: "CMS интеграции", en: "CMS integrations" },
    description: {
      bg: "Практични връзки между системи без тежки enterprise бюджети. Оптимизирайте управлението на съдържанието.",
      en: "Practical system integrations without heavy enterprise budgets. Optimize your content management.",
    },
    price: { bg: "от 249 €", en: "from 249 EUR" },
    color: "bg-[var(--violet)]/10 border-[var(--violet)]/40",
    iconBg: "bg-[var(--violet)]/20 text-[var(--violet)]",
    badge: "bg-[var(--violet)]/10 text-[var(--violet)]",
    features: {
      bg: [
        "WordPress/CMS setup",
        "Миграции",
        "Синхронизация на съдържание",
        "Кратко обучение",
      ],
      en: [
        "WordPress/CMS setup",
        "Migrations",
        "Content synchronization",
        "Short training",
      ],
    },
    demo: "/demos",
  },
];

const processSteps = [
  {
    icon: <Search className="h-8 w-8 text-[var(--violet)]" />,
    title: { bg: "Откриване", en: "Discovery" },
    description: {
      bg: "Разбираме твоя бизнес, цели и предизвикателства. Среща от 30 минути.",
      en: "We understand your business, goals, and challenges in a focused 30-minute meeting.",
    },
  },
  {
    icon: <PenTool className="h-8 w-8 text-[var(--violet)]" />,
    title: { bg: "Проектиране", en: "Design" },
    description: {
      bg: "Създаваме архитектура на решението. Виждаш визуализация преди да започнем.",
      en: "We design the solution architecture. You review a clear visual plan before we build.",
    },
  },
  {
    icon: <Wrench className="h-8 w-8 text-[var(--violet)]" />,
    title: { bg: "Разработка", en: "Build" },
    description: {
      bg: "Изграждаме автоматизацията стъпка по стъпка. Редовни update-и за напредъка.",
      en: "We build your automation step by step with regular progress updates.",
    },
  },
  {
    icon: <Rocket className="h-8 w-8 text-[var(--violet)]" />,
    title: { bg: "Пускане", en: "Launch" },
    description: {
      bg: "Тестваме, оптимизираме и пускаме. 14 дни от идея до работеща система.",
      en: "We test, optimize, and launch. 14 days from idea to a working system.",
    },
  },
];

export default function ServicesPage() {
  const { locale } = useI18n();
  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      {/* Hero */}
      <section className="section bg-gradient-to-b from-[var(--violet)]/10 to-transparent pt-24 pb-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-gradient-hero mb-6 font-display text-3xl leading-tight font-bold sm:text-4xl md:text-[48px] lg:text-[56px]">
              {locale === "bg"
                ? "Какво можем да автоматизираме"
                : "What we can automate"}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl font-body text-[18px] text-[var(--text-sub)]">
              {locale === "bg"
                ? "Създаваме практични решения за бизнеси с ясен бюджет и бързо внедряване. По-малко ръчна работа, повече реални клиенти."
                : "We build practical solutions for businesses with clear budgets and fast delivery. Less manual work, more real clients."}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Deep-Dives */}
      <section className="section">
        <Container>
          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            {services.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={service.title.bg}
                  className={`flex flex-col items-center gap-10 md:gap-16 md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 w-full">
                    <div
                      className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full md:h-28 md:w-28 ${service.iconBg}`}
                    >
                      {service.icon}
                    </div>
                    <h2 className="mb-4 font-display text-3xl font-bold text-[var(--text-main)] md:text-[40px]">
                      {service.title[locale]}
                    </h2>
                    <p className="mb-6 font-body text-base text-[var(--text-sub)] md:text-[18px]">
                      {service.description[locale]}
                    </p>
                    <ul className="mb-8 space-y-3">
                      {service.features[locale].map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-base text-[var(--text-main)] md:text-[18px]"
                        >
                          <Check className="flex-shrink-0 text-[var(--lime)]" size={20} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`rounded-full px-4 py-2 text-sm font-bold ${service.badge}`}>
                        {service.price[locale]}
                      </span>
                      <Link
                        href={service.demo}
                        className="flex items-center text-base font-bold text-[var(--violet)] transition-opacity hover:opacity-80 md:text-lg"
                      >
                        {locale === "bg" ? "Научи повече" : "Learn more"}
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="w-full flex-1 md:max-w-[45%]">
                    <div
                      className={`aspect-square w-full rounded-2xl border-4 ${service.color} relative flex items-center justify-center overflow-hidden bg-[var(--bg-card)] p-8 shadow-xl md:p-12`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-current opacity-5" />
                      {service.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process Timeline */}
      <section className="section relative overflow-hidden bg-[var(--bg-section)] py-16 md:py-24 lg:py-32">
        <Container>
          <div className="mb-12 text-center md:mb-20">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              {locale === "bg" ? "Как работим" : "How we work"}
            </h2>
          </div>

          <div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:gap-4">
            {/* Animated Line */}
            <div className="absolute top-10 right-[10%] left-[10%] hidden h-1.5 md:block">
              <div className="h-full w-full overflow-hidden rounded-full bg-[var(--border)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--coral)]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative z-10 mx-auto flex max-w-[200px] flex-col items-center text-center md:max-w-xs"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--violet)] bg-transparent shadow-xl md:h-20 md:w-20 md:border-4">
                  {step.icon}
                </div>
                <h3 className="mb-3 font-display text-lg font-bold md:text-2xl">
                  {step.title[locale]}
                </h3>
                <p className="text-sm text-[var(--text-sub)] md:text-base lg:text-lg">
                  {step.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="section py-24">
        <Container>
          <div className="card-featured relative overflow-hidden rounded-2xl bg-[var(--violet)] p-8 text-center text-white md:rounded-[24px] md:p-12 lg:p-16">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-10 blur-3xl" />
            <h2 className="relative z-10 mb-6 font-display text-4xl font-bold md:text-5xl">
              {locale === "bg"
                ? "Готови за по-умен старт?"
                : "Ready for a smarter start?"}
            </h2>
            <p className="relative z-10 mx-auto mb-10 max-w-2xl text-xl opacity-90">
              {locale === "bg"
                ? "Запазете час за безплатна консултация и ще изберем точния пакет според вашия бизнес."
                : "Book a free consultation and we will choose the right package for your business."}
            </p>
            <div className="relative z-10">
              <Link href="/contact">
                <Button className="rounded-xl border-none bg-[var(--coral)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#e63e3e] hover:shadow-xl">
                  {locale === "bg" ? "Започни безплатно" : "Start for free"}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

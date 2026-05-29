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
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

const services = [
  {
    icon: <Code size={64} className="text-[var(--violet)]" />,
    title: { bg: "Уебсайт & Google Търсене (Присъствие)", en: "Website & Google Search (Presence)" },
    description: {
      bg: "Модерен сайт, блог или дигитална визитка (код или CMS платформа по избор), за да имате перфектно присъствие пред клиентите. Включва излизане напред в Google Карти и търсене за вашия град.",
      en: "Professional website, blog, or landing page (built with custom code or CMS platform based on your needs) for perfect presence. Includes Google Maps and search positioning for your city.",
    },
    price: { bg: "690 € старт + 49 €/мес", en: "690 € setup + 49 €/mo" },
    color: "bg-[var(--violet)]/10 border-[var(--violet)]",
    iconBg: "bg-[var(--violet)]/20 text-[var(--violet)]",
    badge: "badge-violet",
    features: {
      bg: [
        "Професионален сайт (Код или CMS)",
        "Ултра-бързо зареждане",
        "Google Карти & Локално SEO",
        "Сигурен хостинг & SSL защита",
      ],
      en: [
        "Professional site (Code or CMS)",
        "Ultra-fast loading speed",
        "Google Maps & Local SEO",
        "Secure hosting & SSL protection",
      ],
    },
    demo: "/demos",
  },
  {
    icon: <Bot size={64} className="text-[var(--lime)]" />,
    title: { bg: "AI Дигитален секретар & Канали", en: "AI Autopilot Agent & Channels" },
    description: {
      bg: "Интелигентен секретар, който се обучава по вашите фирмени цени, продукти и каталози. Той отговаря за 12 секунди на български във Viber, Facebook и сайта ви, като записва часовете и поръчките сам.",
      en: "Smart conversational agent trained on your pricing, catalogs, and rules. It responds within 12 seconds in Viber, Facebook, and Web chat, scheduling appointments autonomously.",
    },
    price: { bg: "290 € старт + 199 €/мес + 49 € AI Ядро", en: "290 € setup + 199 €/mo + 49 € AI Core" },
    color: "bg-[var(--lime)]/10 border-[var(--lime)]",
    iconBg: "bg-[var(--lime)]/20 text-[var(--lime)]",
    badge: "badge-lime",
    features: {
      bg: [
        "AI асистент денонощно (24/7)",
        "Интеграция във Viber & Уебсайт",
        "Автоматично записване на часове",
        "Сейф за Клиенти (CRM база)",
      ],
      en: [
        "24/7 AI chat receptionist",
        "Viber & Web Widget integration",
        "Automated calendar booking",
        "Secure Client Vault CRM database",
      ],
    },
    demo: "/demos",
  },
  {
    icon: <Sparkles size={64} className="text-[var(--coral)]" />,
    title: { bg: "Цялостен Дигитален Автопилот (Сайт + AI)", en: "Complete Digital Autopilot (Website + AI)" },
    description: {
      bg: "Цялостна автоматизирана машина за оборот. Комбинираме премиум уебсайт, постоянна Google доминация и мултиканален AI асистент в една синхронизирана система.",
      en: "The ultimate hands-free growth system. We combine a custom premium website, continuous Google dominance, and a multi-channel AI assistant into one synced engine.",
    },
    price: { bg: "990 € старт + 249 €/мес + 49 € AI Ядро", en: "990 € setup + 249 €/mo + 49 € AI Core" },
    color: "bg-[var(--coral)]/10 border-[var(--coral)]",
    iconBg: "bg-[var(--coral)]/20 text-[var(--coral)]",
    badge: "badge-coral",
    features: {
      bg: [
        "Премиум сайт + Мултиканален AI",
        "Синхронизация в реално време",
        "Пълен Сейф за Клиенти (CRM)",
        "Лична техническа поддръжка",
      ],
      en: [
        "Website + Multi-channel AI agent",
        "Real-time catalog & stock sync",
        "Full Secure Client Vault database",
        "Dedicated developer support",
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
      bg: "Изграждаме решението стъпка по стъпка. Редовно те информираме за напредъка.",
      en: "We build the solution step by step and keep you informed of progress.",
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
                ? "Как помагаме на твоя бизнес"
                : "How we help your business"}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl font-body text-[18px] text-[var(--text-sub)]">
              {locale === "bg"
                ? "От автоматичен отговор на клиентски съобщения до пълен сайт или AI помощник. Ясен бюджет, бърза доставка, реални резултати."
                : "From automatic client message replies to a full website or AI assistant. Clear budget, fast delivery, real results."}
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
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--violet)] bg-[var(--bg-section)] shadow-xl md:h-20 md:w-20 md:border-4">
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
                ? "Не си сигурен откъде да започнеш?"
                : "Not sure where to start?"}
            </h2>
            <p className="relative z-10 mx-auto mb-10 max-w-2xl text-xl opacity-90">
              {locale === "bg"
                ? "30 минути разговор и ще ти кажем точно кое решение ще донесе най-бързи резултати за твоя бизнес."
                : "30 minutes and we will tell you exactly which solution will bring the fastest results for your business."}
            </p>
            <div className="relative z-10">
              <Link href="/contact">
                <Button className="rounded-xl border-none bg-[var(--coral)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#e63e3e] hover:shadow-xl">
                  {locale === "bg" ? "Заяви безплатна консултация" : "Request free consultation"}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

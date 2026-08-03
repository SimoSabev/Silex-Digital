"use client";

import {
  Zap,
  MessageSquare,
  Database,
  FileText,
  Code,
  MousePointerClick,
} from "lucide-react";
import Container from "@/components/ui/Container";
import DemoContainer from "@/components/demos/DemoContainer";
import EmailAutomationDemo from "@/components/demos/EmailAutomationDemo";
import LeadQualificationDemo from "@/components/demos/LeadQualificationDemo";
import ChatbotDemo from "@/components/demos/ChatbotDemo";
import LazyReveal from "@/components/ui/LazyReveal";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

const demos = [
  {
    id: "email-automation",
    title: { bg: "Автоматизация от всички канали", en: "All-channel automation" },
    description: {
      bg: "Приемай поръчки от Viber, Messenger и WhatsApp директно в системата си — без ти да правиш нищо.",
      en: "Accept orders from Viber, Messenger and WhatsApp directly into your system — without lifting a finger.",
    },
    icon: <MessageSquare className="h-6 w-6" />,
    component: <EmailAutomationDemo />,
    previewImage: "/images/demo-email-automation-mockup.png",
    color: "blue" as const,
  },
  {
    id: "lead-qualification",
    title: { bg: "AI разпознаване на запитвания", en: "AI inquiry recognition" },
    description: {
      bg: "AI чете свободен текст — имейл или съобщение — и веднага извлича кой е клиентът, какво иска и какъв е бюджетът.",
      en: "AI reads free-form text — email or message — and instantly extracts who the client is, what they want and their budget.",
    },
    icon: <Zap className="h-6 w-6" />,
    component: <LeadQualificationDemo />,
    previewImage: "/images/demo-lead-qualification-mockup.png",
    color: "green" as const,
  },
  {
    id: "chatbot",
    title: { bg: "AI чатбот", en: "AI chatbot" },
    description: {
      bg: "Виртуален асистент който отговаря 24/7. Настрой възможностите и виж как комуникира с клиенти.",
      en: "Virtual assistant that replies 24/7. Configure capabilities and see how it communicates with customers.",
    },
    icon: <MessageSquare className="h-6 w-6" />,
    component: <ChatbotDemo />,
    previewImage: "/images/demo-chatbot-mockup.png",
    color: "purple" as const,
  },
  {
    id: "crm",
    title: { bg: "Свързване на системи", en: "System integration" },
    description: {
      bg: "Свържи всичките си програми на едно място. Данните се прехвърлят автоматично — без ръчно копиране.",
      en: "Connect all your tools in one place. Data transfers automatically — no manual copy-pasting.",
    },
    icon: <Database className="h-6 w-6" />,
    badge: { bg: "Скоро", en: "Soon" },
    color: "orange" as const,
  },
  {
    id: "invoicing",
    title: { bg: "Автоматизирано фактуриране", en: "Automated invoicing" },
    description: {
      bg: "Генерирай фактури автоматично следвайки зададени правила и шаблони.",
      en: "Generate invoices automatically based on predefined rules and templates.",
    },
    icon: <FileText className="h-6 w-6" />,
    badge: { bg: "Скоро", en: "Soon" },
    color: "blue" as const,
  },
  {
    id: "api",
    title: { bg: "API интеграции", en: "API integrations" },
    description: {
      bg: "Свържи външни услуги с твоя бизнес. Персонализирани решения за всяка нужда.",
      en: "Connect external services to your business. Tailored solutions for every need.",
    },
    icon: <Code className="h-6 w-6" />,
    badge: { bg: "Скоро", en: "Soon" },
    color: "green" as const,
  },
];

export default function DemosContent() {
  const { locale } = useI18n();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[var(--bg-page)] pb-12 sm:pb-20">
      {/* Hero — not a claim, a dare: click something, right now */}
      <section className="atelier-band-dark relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal variant="blur">
              <p className="mb-5 font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text-on-dark)]/40 uppercase">
                {locale === "bg" ? "Демонстрации · SilexBrand" : "Demos · SilexBrand"}
              </p>
            </Reveal>
            <h1 className="font-display text-[2.5rem] leading-[1] font-extrabold tracking-tight text-[var(--color-text-on-dark)] sm:text-[3.5rem] md:text-[4.5rem]">
              {locale === "bg" ? (
                <>Три системи.<br /><span className="text-[var(--accent-10)]">Работещи точно сега.</span></>
              ) : (
                <>Three systems.<br /><span className="text-[var(--accent-10)]">Working right now.</span></>
              )}
            </h1>
            <Reveal variant="rise" delay={0.14}>
              <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-[var(--color-text-on-dark)]/60 md:text-[19px]">
                {locale === "bg"
                  ? "Не скрийншоти — истински интерактивни системи, точно под този текст. Кликнете и пробвайте директно, без регистрация."
                  : "Not screenshots — real interactive systems, right below this text. Click in and try them directly, no sign-up needed."}
              </p>
            </Reveal>
            <Reveal variant="rise" delay={0.24}>
              <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-[var(--color-text-on-dark)]/70 backdrop-blur-md">
                <MousePointerClick className="h-4 w-4 text-[var(--accent-10)]" />
                {locale === "bg" ? "Скролни надолу и опитай" : "Scroll down and try one"}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Demos Grid - High End Bento Box Style */}
      <section className="section relative z-10 pt-16 md:pt-20">
        <Container>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8 max-w-7xl mx-auto">
            {demos.slice(0, 3).map((demo, idx) => (
              <LazyReveal 
                key={demo.id} 
                delay={0.2 + (idx * 0.1)} 
                className={idx === 2 ? "md:col-span-2" : ""}
              >
                <DemoContainer
                  demoId={demo.id}
                  title={demo.title[locale]}
                  description={demo.description[locale]}
                  icon={demo.icon}
                  badge={demo.badge?.[locale]}
                  previewImage={demo.previewImage}
                  ctaText={
                    locale === "bg"
                      ? "Заяви тази конфигурация"
                      : "Book this exact setup"
                  }
                  ctaLink={`/contact?source=demo&demo=${demo.id}`}
                >
                  {demo.component}
                </DemoContainer>
              </LazyReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Coming Soon Grid */}
      <section className="section bg-[var(--bg-section)]/50 relative z-10 py-12 sm:py-16 md:py-24 border-t border-[var(--border)]/50">
        <Container>
          <LazyReveal delay={0.1}>
            <div className="mb-12 text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
                {locale === "bg" ? "Очаквайте скоро" : "Coming Soon"}
              </h2>
            </div>
          </LazyReveal>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Coming Soon Cards */}
            {demos.slice(3).map((demo, idx) => (
              <LazyReveal key={demo.id} delay={0.2 + (idx * 0.1)}>
                <div
                  className="card flex flex-col justify-between p-6 opacity-50 lg:p-8 hover:opacity-100 transition-opacity duration-500"
                >
                  <div>
                    <span className="badge badge-neutral mb-4 inline-flex">
                      {locale === "bg" ? "Скоро" : "Soon"}
                    </span>
                    <div className="mb-3 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-section)] text-[var(--text-main)] transition-colors hover:text-[var(--accent)]">
                        {demo.icon}
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text-main)]">
                          {demo.title[locale]}
                        </h3>
                      </div>
                    </div>
                    <p className="mb-6 text-[var(--text-sub)]">
                      {demo.description[locale]}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-[var(--border)] pt-4 sm:pt-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                      <input
                        type="email"
                        placeholder={
                          locale === "bg" ? "Твоят имейл..." : "Your email..."
                        }
                        className="input min-h-[44px] flex-1 px-3 py-2.5 text-sm"
                      />
                      <button className="btn-secondary btn-sm min-h-[44px] w-full sm:w-auto whitespace-nowrap shrink-0">
                        {locale === "bg" ? "Извести ме" : "Notify me"}
                      </button>
                    </div>
                  </div>
                </div>
              </LazyReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-12 md:py-16">
        <Container>
          <LazyReveal delay={0.3}>
            <div className="card-featured mx-auto max-w-4xl p-6 sm:p-8 text-center md:p-12 shadow-2xl hover:shadow-[var(--accent)]/20 transition-all duration-700">
              <h2 className="mb-3 sm:mb-4 font-[family-name:var(--font-display)] text-xl sm:text-2xl font-[700] text-[var(--text-main)] md:text-3xl">
                {locale === "bg"
                  ? "Искаш персонализирана демонстрация?"
                  : "Need a personalized demo?"}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Свържи се с нас и ще ти покажем как автоматизацията може да работи за твоя конкретен бизнес случай."
                  : "Get in touch and we will show you how automation can work for your exact business case."}
              </p>
              <a href="/contact" className="btn-primary btn-lg inline-flex hover:scale-105 transition-transform duration-500 shadow-xl">
                {locale === "bg"
                  ? "Заяви безплатна консултация"
                  : "Request a free consultation"}
              </a>
            </div>
          </LazyReveal>
        </Container>
      </section>
    </div>
  );
}

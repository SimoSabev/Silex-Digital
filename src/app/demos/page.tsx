"use client";

import {
  Zap,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Code,
} from "lucide-react";
import Container from "@/components/ui/Container";
import DemoContainer from "@/components/demos/DemoContainer";
import EmailAutomationDemo from "@/components/demos/EmailAutomationDemo";
import LeadQualificationDemo from "@/components/demos/LeadQualificationDemo";
import ChatbotDemo from "@/components/demos/ChatbotDemo";
import LazyReveal from "@/components/ui/LazyReveal";
import { useI18n } from "@/lib/i18n";

const demos = [
  {
    id: "email-automation",
    title: { bg: "Омниканална автоматизация", en: "Omnichannel automation" },
    description: {
      bg: "Автоматизирай процесите от социалните мрежи. Приемай поръчки от Viber, Messenger и WhatsApp директно в ERP-то си.",
      en: "Automate social network workflows. Accept orders from Viber, Messenger and WhatsApp directly into your ERP.",
    },
    icon: <MessageSquare className="h-6 w-6" />,
    component: <EmailAutomationDemo />,
    color: "blue" as const,
  },
  {
    id: "lead-qualification",
    title: { bg: "AI класификация на лийдове", en: "AI lead qualification" },
    description: {
      bg: "Автоматично оценявай качеството на лийдовете. AI анализира данните и определя приоритет за твоя екип.",
      en: "Automatically score lead quality. AI analyzes the data and sets priority for your team.",
    },
    icon: <Zap className="h-6 w-6" />,
    component: <LeadQualificationDemo />,
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
    color: "purple" as const,
  },
  {
    id: "crm",
    title: { bg: "CRM интеграция", en: "CRM integration" },
    description: {
      bg: "Свържи всичките си системи на едно място. Автоматичен трансфер на данни между платформи.",
      en: "Connect all systems in one place. Automatic data transfer between platforms.",
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

export default function DemosPage() {
  const { locale } = useI18n();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[var(--bg-page)] pb-20">
      {/* Subtle animated grid pattern background */}
      <div className="bg-grid-pattern animate-float-slow pointer-events-none absolute inset-0 opacity-50" />

      {/* Hero */}
      <section className="section-sm relative z-10">
        <Container>
          <LazyReveal delay={0.1}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="badge badge-violet mb-4 inline-flex">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--violet)]" />
                {locale === "bg"
                  ? "Интерактивни демонстрации"
                  : "Interactive demos"}
              </span>
              <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl leading-tight font-[700] tracking-tight text-[var(--text-main)] md:text-5xl lg:text-[56px]">
                {locale === "bg" ? "Виж как работят " : "See how "}
                <span className="text-gradient-hero">
                  {locale === "bg"
                    ? "нашите автоматизации"
                    : "our automations work"}
                </span>
              </h1>
              <p className="text-lg text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Изпробвай всяка услуга директно тук. Кликни върху всяка карта, за да отвориш интерактивната симулация."
                  : "Try each service directly here. Click on any card to open the interactive simulation."}
              </p>
            </div>
          </LazyReveal>
        </Container>
      </section>

      {/* Demos Grid - High End Bento Box Style */}
      <section className="section relative z-10 pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8 max-w-7xl mx-auto">
            {demos.slice(0, 3).map((demo, idx) => (
              <LazyReveal 
                key={demo.id} 
                delay={0.2 + (idx * 0.1)} 
                className={idx === 2 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <DemoContainer
                  demoId={demo.id}
                  title={demo.title[locale]}
                  description={demo.description[locale]}
                  icon={demo.icon}
                  badge={demo.badge?.[locale]}
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
      <section className="section bg-[var(--bg-section)]/50 relative z-10 py-24 border-t border-[var(--border)]/50">
        <Container>
          <LazyReveal delay={0.1}>
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold text-[var(--text-main)]">
                {locale === "bg" ? "Очаквайте скоро" : "Coming Soon"}
              </h2>
            </div>
          </LazyReveal>
          
          <div className="grid gap-8 md:grid-cols-3">
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-section)] text-[var(--text-main)] transition-colors hover:text-[var(--violet)]">
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

                  <div className="mt-auto border-t border-[var(--border)] pt-6">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder={
                          locale === "bg" ? "Твоят имейл..." : "Your email..."
                        }
                        className="input flex-1 px-3 py-2 text-sm"
                      />
                      <button className="btn-secondary btn-sm whitespace-nowrap">
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
      <section className="section-sm relative z-10">
        <Container>
          <LazyReveal delay={0.3}>
            <div className="card-featured mx-auto max-w-4xl p-8 text-center md:p-12 shadow-2xl hover:shadow-[var(--violet)]/20 transition-all duration-700">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-[700] text-[var(--text-main)] md:text-3xl">
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

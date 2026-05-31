"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Plus, X, Sparkles, TrendingUp, ChevronDown, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n";

type Addon = { id: string; name: { bg: string; en: string }; price: number };

const availableAddons: Addon[] = [
  { id: "extra-automation", name: { bg: "+1 Автоматичен отговор", en: "+1 Automation" }, price: 50 },
  { id: "seo-audit", name: { bg: "Месечна SEO оптимизация", en: "Monthly SEO optimization" }, price: 70 },
  { id: "priority-support", name: { bg: "24/7 Приоритетна поддръжка", en: "24/7 Priority support" }, price: 90 },
];

const pricingPlans = [
  {
    name: "Start",
    basePrice: 49,
    setupFee: 690,
    aiCorePrice: 0,
    nextTierTarget: 199,
    nextTierName: "Grow",
    period: { bg: "/месец", en: "/month" },
    currency: { bg: "€", en: "EUR" },
    description: {
      bg: "Уеб Основа & Локално търсене за перфектно присъствие",
      en: "Web Foundation & Local Search for perfect search visibility",
    },
    features: {
      bg: [
        "Професионален сайт (Код или CMS)",
        "Ултра-бързо зареждане",
        "Google Карти & Локално SEO",
        "Edge хостинг & SSL защита",
        "Включена 24/7 поддръжка по имейл",
      ],
      en: [
        "Professional site (Code or CMS)",
        "Ultra-fast loading speed",
        "Google Maps & Local SEO",
        "Edge hosting & SSL security",
        "24/7 standard email support",
      ],
    },
    cta: { bg: "Избери Start", en: "Select Start" },
    ctaVariant: "secondary" as const,
    intent: "starter-pack",
    pack: "start",
    popular: false,
    color: "var(--lime)",
    bgColor: "rgba(182, 255, 66, 0.1)",
    audit: {
      bg: {
        setup: [
          { label: "Професионална изработка (код/CMS)", value: "300 €" },
          { label: "Бизнес текстове и копирайтинг", value: "150 €" },
          { label: "Google Карти и GEO/SEO настройки", value: "140 €" },
          { label: "Защита и сигурност (GDPR)", value: "100 €" },
        ],
        monthly: [
          { label: "Хостинг и SSL сертификат", value: "15 €" },
          { label: "Google Maps поддръжка", value: "20 €" },
          { label: "Сигурност и резервни копия", value: "14 €" },
        ],
      },
      en: {
        setup: [
          { label: "Design & web engineering (code/CMS)", value: "300 €" },
          { label: "Business Copywriting & Content", value: "150 €" },
          { label: "Google Maps & SEO Metadata Schema", value: "140 €" },
          { label: "Security Hardening & GDPR Privacy", value: "100 €" },
        ],
        monthly: [
          { label: "Secure Edge Hosting & SSL Certificate", value: "15 €" },
          { label: "Local Google Maps SEO Maintenance", value: "20 €" },
          { label: "Backups, Speed & Core security checks", value: "14 €" },
        ],
      },
    },
  },
  {
    name: "Grow",
    basePrice: 199,
    setupFee: 290,
    aiCorePrice: 49,
    nextTierTarget: 249,
    nextTierName: "Pro",
    period: { bg: "/месец", en: "/month" },
    currency: { bg: "€", en: "EUR" },
    description: {
      bg: "AI Дигитален секретар във Viber & вашия сайт",
      en: "AI Smart Autopilot in Viber & your website",
    },
    features: {
      bg: [
        "AI асистент денонощно (24/7)",
        "Интеграция във Viber & Уебсайт",
        "Памет на асистента (цени/каталог)",
        "Автоматично записване на часове",
        "Сейф за Клиенти (CRM база)",
        "Включена поддръжка по имейл & чат",
      ],
      en: [
        "24/7 AI chat receptionist",
        "Viber & Web Widget integration",
        "Assistant memory (catalog/prices)",
        "Automated calendar booking",
        "Secure Client Vault CRM database",
        "Priority email & chat support",
      ],
    },
    cta: { bg: "Най-желан - Grow", en: "Most popular - Grow" },
    ctaVariant: "primary" as const,
    popular: true,
    intent: "grow-pack",
    pack: "grow",
    color: "var(--violet)",
    bgColor: "rgba(107, 45, 219, 0.1)",
    audit: {
      bg: {
        setup: [
          { label: "Обучение и характер на асистента", value: "150 €" },
          { label: "База от знания (каталози и цени)", value: "90 €" },
          { label: "Интеграция с Viber и Уебсайт", value: "50 €" },
        ],
        monthly: [
          { label: "Информационно табло и анализи", value: "50 €" },
          { label: "Сейф за Клиенти (CRM база)", value: "49 €" },
          { label: "Платформи и конектори лицензи", value: "50 €" },
        ],
        aiCore: [
          { label: "API разход към OpenAI/Claude", value: "24 €" },
          { label: "Седмични инженерни проверки за точност", value: "25 €" },
        ],
      },
      en: {
        setup: [
          { label: "AI Persona & Character Training", value: "150 €" },
          { label: "Knowledge Base Compiler (catalogs/rules)", value: "90 €" },
          { label: "Viber & Web integration channels", value: "50 €" },
        ],
        monthly: [
          { label: "Interactive Analytics Dashboard", value: "50 €" },
          { label: "Secure Client Vault (CRM database)", value: "49 €" },
          { label: "Connector licenses & APIs hosting", value: "50 €" },
        ],
        aiCore: [
          { label: "LLM API usage budget", value: "24 €" },
          { label: "Weekly human auditing & prompt tuning", value: "25 €" },
        ],
      },
    },
  },
  {
    name: "Pro",
    basePrice: 249,
    setupFee: 990,
    aiCorePrice: 49,
    nextTierTarget: null,
    period: { bg: "/месец", en: "/month" },
    currency: { bg: "€", en: "EUR" },
    description: {
      bg: "Дигитален Автопилот: Премиум сайт + AI Асистент",
      en: "Digital Autopilot: Premium Website & AI Assistant",
    },
    features: {
      bg: [
        "Цялостен нов премиум уебсайт",
        "AI по всички чат канали (WhatsApp/Viber)",
        "Синхронизация в реално време",
        "Сейф за Клиенти (CRM база)",
        "Лична техническа поддръжка",
        "Месечна консултация за растеж",
      ],
      en: [
        "Custom premium website build",
        "Viber, WhatsApp & Messenger AI",
        "Real-time catalog & stock sync",
        "Full Secure Client Vault CRM",
        "Dedicated developer support",
        "Monthly growth consultation",
      ],
    },
    cta: { bg: "Избери Pro", en: "Select Pro" },
    ctaVariant: "secondary" as const,
    intent: "pro-pack",
    pack: "pro",
    popular: false,
    color: "var(--coral)",
    bgColor: "rgba(255, 99, 71, 0.1)",
    audit: {
      bg: {
        setup: [
          { label: "Сайт с резервации и е-търговия", value: "400 €" },
          { label: "Обучение на AI и векторна памет", value: "250 €" },
          { label: "Връзка Viber + Messenger + Web", value: "200 €" },
          { label: "Премиум SEO и локално присъствие", value: "140 €" },
        ],
        monthly: [
          { label: "Високоскоростен хостинг", value: "80 €" },
          { label: "Панел за управление и CRM", value: "69 €" },
          { label: "Месечна техническа поддръжка", value: "100 €" },
        ],
        aiCore: [
          { label: "API разходи и лицензи за токени", value: "29 €" },
          { label: "Синхронизиране на каталози в реално време", value: "20 €" },
        ],
      },
      en: {
        setup: [
          { label: "Enterprise E-Commerce UI build", value: "400 €" },
          { label: "AI Agent & High-speed Vector Memory", value: "250 €" },
          { label: "Facebook, Viber & Web connection setup", value: "200 €" },
          { label: "Premium SEO & local positioning", value: "140 €" },
        ],
        monthly: [
          { label: "Premium Cluster Edge Hosting SLA", value: "80 €" },
          { label: "Multi-User CRM dashboard database", value: "69 €" },
          { label: "Continuous developer modifications & copy", value: "100 €" },
        ],
        aiCore: [
          { label: "LLM token API allocation", value: "29 €" },
          { label: "Real-time Vector Database sync engine", value: "20 €" },
        ],
      },
    },
  },
];

const faqsBg = [
  { q: "Какво е Алокация на AI Ядрото?", a: "Тази такса покрива директните разходи към световните сървъри (API) за всяко съобщение на вашите клиенти, както и седмичните проверки от нашите инженери за 100% точност, за да гарантираме, че вашият асистент никога не бърка цените." },
  { q: "Има ли скрити условия?", a: "Не, ценообразуването е брутално прозрачно. Всички разходи за дизайн, код, SEO поддръжка и AI лицензи са описани до стотинка." },
  { q: "Мога ли да променя плана?", a: "Да, можете да преминете на по-висок или по-нисък месечен план по всяко време без никакви допълнителни такси или глоби." },
  { q: "Има ли дългосрочен договор?", a: "Не изискваме дългосрочни обвързващи договори. Работим с месечни условия и 30-дневно предизвестие." },
];

const faqsEn = [
  { q: "What is AI Core Allocation?", a: "This fee directly covers raw token usage (APIs) on neural networks like Claude and GPT-4 on behalf of your customers, as well as weekly prompt tuning by our engineers to ensure 100% accurate responses." },
  { q: "Are there any hidden terms?", a: "No, our pricing is brutally transparent. All costs for design, custom code, hosting, Local SEO, and AI licenses are detailed to the cent." },
  { q: "Can I change plans?", a: "Yes, you can upgrade or downgrade your monthly plan at any time without extra fees or penalties." },
  { q: "Is there a long-term contract?", a: "No binding contracts are required. We operate on simple monthly terms with a standard 30-day notice period." },
];

const comparisonFeatures = [
  { name: { bg: "Брой автоматизации", en: "Number of automations" }, start: "1", grow: "До 4", pro: "6+" },
  { name: { bg: "AI помощник", en: "AI assistant" }, start: false, grow: true, pro: true },
  { name: { bg: "Следене на клиентите", en: "Client tracking" }, start: "Базово", grow: "Базово", pro: "Разширено" },
  { name: { bg: "Всички канали", en: "All channels" }, start: false, grow: false, pro: true },
  { name: { bg: "Месечни подобрения", en: "Monthly improvements" }, start: "Отчет", grow: "2 пъти", pro: "Консултация" },
  { name: { bg: "Поддръжка", en: "Support" }, start: "Стандартна", grow: "Приоритетна", pro: "24/7" },
];

export default function PricingPage() {
  const { locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State to track selected addons per plan (e.g. { "Start": ["extra-automation"], "Grow": [] })
  const [selectedAddons, setSelectedAddons] = useState<Record<string, string[]>>({
    Start: [],
    Grow: [],
    Pro: [],
  });

  // State to track expanded financial audits per plan
  const [activeAudits, setActiveAudits] = useState<Record<string, boolean>>({
    Start: false,
    Grow: false,
    Pro: false,
  });

  const toggleAudit = (planName: string) => {
    setActiveAudits((prev) => ({
      ...prev,
      [planName]: !prev[planName],
    }));
  };

  const faqs = locale === "bg" ? faqsBg : faqsEn;

  const toggleAddon = (planName: string, addonId: string) => {
    setSelectedAddons((prev) => {
      const planAddons = prev[planName] || [];
      const hasAddon = planAddons.includes(addonId);
      return {
        ...prev,
        [planName]: hasAddon
          ? planAddons.filter((id) => id !== addonId)
          : [...planAddons, addonId],
      };
    });
  };

  const getCalculatedPrice = (basePrice: number, planName: string) => {
    const addons = selectedAddons[planName] || [];
    const addonsTotal = addons.reduce((total, addonId) => {
      const addon = availableAddons.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return basePrice + addonsTotal;
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)] overflow-hidden">
      <Container>
        <section className="py-24 md:py-32 relative">
          
          {/* Background decorations */}
          <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--violet)]/10 blur-[120px]"></div>
          <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-[var(--lime)]/10 blur-[150px]"></div>

          {/* Hero */}
          <div className="mb-20 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 inline-flex border-[var(--violet)]/30 bg-[var(--violet)]/10 text-[var(--violet)]">
                {locale === "bg" ? "Прозрачност на всяка стъпка" : "Transparency at every step"}
              </Badge>
              <h1 className="mb-6 font-display text-[48px] font-bold text-[var(--text-main)] md:text-[64px] leading-tight flex flex-col md:block items-center justify-center">
                {locale === "bg" ? "Собствени " : "Build your "}
                <span className="relative inline-block mx-2">
                  <span className="relative z-10 text-[var(--violet)]">
                    {locale === "bg" ? "Условия" : "Terms"}
                  </span>
                  <motion.svg className="absolute -bottom-2 left-0 w-full z-0 text-[var(--lime)]" viewBox="0 0 200 20" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                    <path d="M5,15 Q100,-5 195,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </motion.svg>
                </span>
                <br className="hidden md:block"/>
                {locale === "bg" ? "На Отлична Цена" : "At Great Prices"}
              </h1>
              <p className="mx-auto max-w-2xl text-[18px] md:text-[20px] text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Ние ще се съобразим с нуждите ви. Добавяйте само онова, от което имате нужда, и изградете планът за вашия бизнес."
                  : "We adjust to your needs. Add only what you require and build the plan for your business."}
              </p>
            </motion.div>
          </div>

          {/* Free Trial Full Width Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="card-featured relative mb-24 overflow-hidden rounded-[24px] border-2 border-[var(--lime)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-card)] p-1 shadow-[0_0_40px_rgba(182,255,66,0.15)] group hover:shadow-[0_0_60px_rgba(182,255,66,0.25)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/5 to-transparent z-0"></div>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles size={250} className="translate-x-1/4 -translate-y-1/4 text-[var(--lime)]" />
            </div>
            
            <div className="relative z-10 bg-[var(--bg-card)]/80 backdrop-blur-md rounded-[1.3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <Badge className="mb-4 border-none bg-[var(--lime)] px-4 py-1.5 text-sm font-bold text-black uppercase tracking-wider">
                  {locale === "bg" ? "Лимитирана оферта" : "Limited time offer"}
                </Badge>
                <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl text-[var(--text-main)]">
                  {locale === "bg"
                    ? "Започни напълно безплатно — 30 дни"
                    : "Start completely free — 30 days"}
                </h2>
                <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-[17px] font-medium text-[var(--text-sub)]">
                  {[
                    { bg: "5 снимки", en: "5 photos" },
                    { bg: "1 видео", en: "1 video" },
                    { bg: "Лек SEO старт", en: "Basic SEO setup" },
                    { bg: "Брандинг", en: "Branding" },
                  ].map((item) => (
                    <div key={item.bg} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[var(--lime)]/20 flex items-center justify-center">
                        <Check className="text-[var(--lime)]" size={18} />
                      </div>
                      {item[locale]}
                    </div>
                  ))}
                </div>
                <Link href="/contact?source=pricing-page-trial">
                  <Button className="rounded-xl border-none bg-[var(--text-main)] px-8 py-4 text-lg font-bold text-[var(--bg-page)] shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all hover:bg-[var(--lime)] hover:text-black hover:scale-105 group-hover:shadow-[0_10px_40px_rgba(182,255,66,0.3)]">
                    {locale === "bg" ? "Вземи бонуса сега" : "Claim bonus now"} <ArrowRight className="inline ml-2" size={20}/>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Subscription Tiers */}
          <div className="mb-32 grid items-stretch gap-8 md:grid-cols-3 lg:gap-8 relative z-10 w-full xl:max-w-7xl mx-auto">
            {pricingPlans.map((plan, planIdx) => {
              const isPopular = plan.popular;
              const calculatedPrice = getCalculatedPrice(plan.basePrice, plan.name);
              
              // Smart Ladder Recommendation logic
              const isCloseToNext = plan.nextTierTarget !== null && calculatedPrice >= (plan.nextTierTarget * 0.85);

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: planIdx * 0.15, duration: 0.6 }}
                  className={`relative flex flex-col rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-8 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
                  style={{
                    borderColor: isPopular ? "var(--violet)" : undefined,
                    boxShadow: isPopular ? "0 20px 40px rgba(107, 45, 219, 0.15)" : undefined,
                  }}
                >
                  {/* Hover background injection */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, transparent 0%, ${plan.bgColor} 100%)` }}></div>

                  {isPopular && (
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[var(--accent)]"></div>
                  )}

                  {isPopular && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> {locale === "bg" ? "Популярен" : "Popular"}
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-8 border-b border-[var(--border)] pb-8 relative z-10">
                    <h3 className="mb-3 font-display text-3xl font-bold text-[var(--text-main)]">
                      {plan.name}
                    </h3>
                    <p className="mb-6 h-[40px] text-sm text-[var(--text-sub)]">
                      {plan.description[locale]}
                    </p>
                    
                    <div className="flex flex-col items-start justify-center gap-2 min-h-[90px] w-full">
                      <div className="flex items-baseline gap-2">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={calculatedPrice}
                            initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="font-display text-5xl font-extrabold tracking-tighter"
                            style={{ color: plan.color }}
                          >
                            {calculatedPrice} {plan.currency[locale]}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-sm font-medium text-[var(--text-muted)]">
                          {plan.period[locale]}
                        </span>
                      </div>
                      
                      {/* Setup and AI Core Fees */}
                      <div className="flex flex-col gap-1 text-xs font-bold text-[var(--text-sub)] mt-1">
                        <div>
                          <span className="text-[var(--text-muted)]">{locale === "bg" ? "Такса изработка: " : "Setup fee: "}</span>
                          <span style={{ color: plan.color }}>+{plan.setupFee} €</span>
                          <span className="text-[var(--text-muted)] font-medium"> {locale === "bg" ? "(еднократно)" : "(one-time)"}</span>
                        </div>
                        {plan.aiCorePrice > 0 && (
                          <div>
                            <span className="text-[var(--text-muted)]">{locale === "bg" ? "Алокация на AI Ядрото: " : "AI Core Allocation: "}</span>
                            <span className="text-[var(--lime)]">+{plan.aiCorePrice} €</span>
                            <span className="text-[var(--text-muted)] font-medium"> {locale === "bg" ? "/месец" : "/month"}</span>
                          </div>
                        )}
                      </div>

                      {/* Financial Audit Trigger */}
                      <button
                        onClick={() => toggleAudit(plan.name)}
                        className="mt-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                      >
                        <span>{activeAudits[plan.name] ? (locale === "bg" ? "🔽 Скрий одита" : "🔽 Hide audit") : (locale === "bg" ? "🔍 Виж финансов одит" : "🔍 View financial audit")}</span>
                      </button>

                      {/* Financial Audit Details Panel */}
                      <AnimatePresence>
                        {activeAudits[plan.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="w-full bg-[var(--bg-section)] border border-[var(--border)] rounded-xl p-4 text-xs font-medium relative z-10 shadow-inner overflow-hidden text-left"
                          >
                            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3 pb-1 border-b border-[var(--border)]">
                              {locale === "bg" ? "Финансов одит (Къде отива всяко €)" : "Financial Audit (Where the money goes)"}
                            </h4>
                            
                            {/* Setup Fee Audit */}
                            <div className="mb-3">
                              <h5 className="font-extrabold mb-1.5 uppercase tracking-wide text-[10px]" style={{ color: plan.color }}>
                                {locale === "bg" ? `Еднократна такса (${plan.setupFee} €)` : `Setup Fee (${plan.setupFee} €)`}
                              </h5>
                              <div className="space-y-1">
                                {plan.audit[locale].setup.map((item: any, i: number) => (
                                  <div key={i} className="flex items-center justify-between text-[11px] text-[var(--text-sub)]">
                                    <span>{item.label}</span>
                                    <span className="font-bold text-[var(--text-main)]">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Monthly Base Audit */}
                            <div className="mb-3">
                              <h5 className="font-extrabold mb-1.5 uppercase tracking-wide text-[10px]" style={{ color: plan.color }}>
                                {locale === "bg" ? `Месечен абонамент (${plan.basePrice} €/мес)` : `Monthly Subscription (${plan.basePrice} €/mo)`}
                              </h5>
                              <div className="space-y-1">
                                {plan.audit[locale].monthly.map((item: any, i: number) => (
                                  <div key={i} className="flex items-center justify-between text-[11px] text-[var(--text-sub)]">
                                    <span>{item.label}</span>
                                    <span className="font-bold text-[var(--text-main)]">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* AI Core Audit if applicable */}
                            {plan.aiCorePrice > 0 && plan.audit[locale].aiCore && (
                              <div>
                                <h5 className="font-extrabold mb-1.5 uppercase tracking-wide text-[10px] text-[var(--lime)]">
                                  {locale === "bg" ? `Алокация на AI Ядрото (${plan.aiCorePrice} €/мес)` : `AI Core Allocation (${plan.aiCorePrice} €/mo)`}
                                </h5>
                                <div className="space-y-1">
                                  {plan.audit[locale].aiCore.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between text-[11px] text-[var(--text-sub)]">
                                      <span>{item.label}</span>
                                      <span className="font-bold text-[var(--text-main)]">{item.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Price Ladder Upsell notification */}
                      <AnimatePresence>
                        {isCloseToNext && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="w-full bg-[var(--bg-section)] border border-[var(--border)] rounded-lg p-3 text-xs md:text-sm font-medium flex items-start gap-2 shadow-inner"
                          >
                            <TrendingUp className="text-[var(--coral)] shrink-0 w-4 h-4 mt-0.5" />
                            <span>
                              {locale === "bg" 
                                ? `За още малко доближавате плана ${plan.nextTierName}! Обмислете ъпгрейд.` 
                                : `You're very close to the ${plan.nextTierName} plan! Consider upgrading.`}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Addons Dynamic Configurator */}
                  {plan.name !== "Pro" && (
                    <div className="mb-8 border border-[var(--border)] bg-transparent rounded-xl p-4 relative z-10 transition-colors hover:border-[var(--text-muted)] group/addons">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover/addons:text-[var(--text-main)] transition-colors">
                          {locale === "bg" ? "Надгради с Add-on" : "Upgrade with Add-ons"}
                        </h4>
                        <ChevronDown className="w-4 h-4 text-[var(--text-muted)] opacity-50" />
                      </div>
                      
                      <div className="space-y-3">
                        {availableAddons.map((addon) => {
                          const isSelected = selectedAddons[plan.name]?.includes(addon.id);
                          return (
                            <label 
                              key={addon.id} 
                              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${isSelected ? "bg-[var(--bg-section)] border-[var(--border)] shadow-sm" : "hover:bg-[var(--bg-section)]/50 border-transparent"} border`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border ${isSelected ? "bg-[var(--lime)] border-[var(--lime)] flex items-center justify-center text-black" : "border-[var(--text-muted)]"}`}>
                                  {isSelected && <Check size={14} strokeWidth={3} />}
                                </div>
                                <span className={`text-[14px] ${isSelected ? "text-[var(--text-main)] font-medium" : "text-[var(--text-sub)]"}`}>
                                  {addon.name[locale]}
                                </span>
                              </div>
                              <span className={`text-[13px] font-bold ${isSelected ? "text-[var(--lime)]" : "text-[var(--text-muted)]"}`}>
                                +{addon.price}{plan.currency[locale]}
                              </span>
                              <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={isSelected}
                                onChange={() => toggleAddon(plan.name, addon.id)} 
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-10 flex-1 space-y-4 relative z-10">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                      {locale === "bg" ? "Какво е включено" : "What's included"}
                    </h4>
                    {plan.features[locale].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group/feature">
                        <CheckCircle2
                          className={`h-[22px] w-[22px] shrink-0 transition-transform duration-300 group-hover/feature:scale-110`}
                          style={{ color: plan.color }}
                        />
                        <span className="text-[15px] leading-relaxed font-medium text-[var(--text-main)]/90 group-hover/feature:text-[var(--text-main)] transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto relative z-10">
                    <Link
                      href={`/contact?source=pricing-page&offer=first-order-bonus&intent=${plan.intent}&pack=${plan.pack}&addons=${(selectedAddons[plan.name] || []).join(',')}`}
                      className="block"
                    >
                      <Button
                        className={`w-full rounded-xl py-4 flex items-center justify-center gap-2 text-lg font-bold transition-all relative overflow-hidden group/btn ${
                          isPopular
                            ? "border-none bg-[var(--violet)] text-white shadow-[0_10px_20px_rgba(107,45,219,0.3)] hover:bg-[#5a22bd] hover:shadow-[0_15px_30px_rgba(107,45,219,0.4)] hover:-translate-y-1"
                            : "border border-[var(--border)] bg-[var(--bg-section)] text-[var(--text-main)] hover:border-transparent hover:bg-[var(--text-main)] hover:text-black hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] hover:-translate-y-1"
                        }`}
                      >
                        <span className="relative z-10">{plan.cta[locale]}</span>
                        <ArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" size={20} />
                      </Button>
                    </Link>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 scroll-hint-x overflow-x-auto relative z-10 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="mb-2 sm:mb-4 font-display text-2xl sm:text-3xl font-bold md:text-5xl">
                {locale === "bg" ? "Сравни плановете" : "Compare plans"}
              </h2>
              <p className="text-sm text-[var(--text-muted)] md:hidden">
                {locale === "bg" ? "Плъзни наляво/надясно за пълната таблица" : "Swipe sideways for the full table"}
              </p>
            </div>
            <div className="bg-[var(--bg-card)] rounded-[24px] border border-[var(--border)] overflow-hidden shadow-2xl">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="bg-transparent">
                    <th className="p-6 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase w-1/4">
                      {locale === "bg" ? "Функционалност" : "Feature"}
                    </th>
                    <th className="p-6 text-center text-xl font-bold text-[var(--text-main)] w-1/4">
                      Start
                    </th>
                    <th className="p-6 text-center text-xl font-bold text-[var(--violet)] w-1/4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[var(--violet)]/5"></div>
                      <span className="relative z-10">Grow</span>
                    </th>
                    <th className="p-6 text-center text-xl font-bold text-[var(--text-main)] w-1/4">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr
                      key={idx}
                      className="group border-t border-[var(--border)] transition-colors hover:bg-[var(--bg-section)]/50"
                    >
                      <td className="p-6 font-medium text-[var(--text-main)]">
                        {feature.name[locale]}
                      </td>
                      <td className="p-6 text-center text-[var(--text-sub)]">
                        {typeof feature.start === "boolean" ? (
                          feature.start ? <Check className="mx-auto text-[var(--lime)]" size={24} /> : <X className="mx-auto text-[var(--text-muted)] opacity-50" size={20} />
                        ) : (
                          <span className="font-semibold">{feature.start}</span>
                        )}
                      </td>
                      <td className="p-6 text-center font-bold text-[var(--violet)] bg-[var(--violet)]/[0.02] group-hover:bg-[var(--violet)]/[0.05] transition-colors relative">
                        {typeof feature.grow === "boolean" ? (
                          feature.grow ? <Check className="mx-auto text-[var(--violet)]" size={24} /> : <X className="mx-auto text-[var(--text-muted)] opacity-50" size={20} />
                        ) : (
                          <span className="font-bold text-[var(--violet)]">{feature.grow}</span>
                        )}
                      </td>
                      <td className="p-6 text-center text-[var(--text-sub)]">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? <Check className="mx-auto text-[var(--coral)]" size={24} /> : <X className="mx-auto text-[var(--text-muted)] opacity-50" size={20} />
                        ) : (
                          <span className="font-semibold">{feature.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="mx-auto max-w-3xl relative z-10">
            <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-5xl">
              {locale === "bg" ? "Имате въпроси?" : "Have questions?"}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] transition-colors hover:border-[var(--text-muted)]"
                  >
                    <button
                      className="flex w-full items-center justify-between bg-transparent px-6 py-6 text-left"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span className="pr-8 text-lg font-bold text-[var(--text-main)]">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-section)]"
                      >
                        <Plus className="text-[var(--text-main)]" size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-[16px] leading-relaxed text-[var(--text-sub)]">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

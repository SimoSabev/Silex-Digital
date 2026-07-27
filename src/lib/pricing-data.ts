// Single source of truth for the three core pricing plans.
// Principle: "Изработка" (one-time setup) and "Поддръжка/абонамент" (recurring
// monthly) are always separate numbers — never merged into one blended figure.
// The AI Core cost for Grow/Pro is folded entirely into `monthly.price`; it
// must never be rendered as its own visible line item anywhere in the UI.

export type LocalizedList = { bg: string[]; en: string[] };

export type Addon = { id: string; name: { bg: string; en: string }; price: number };

export type PricingPlan = {
  id: "start" | "grow" | "pro";
  name: string;
  description: { bg: string; en: string };
  color: string;
  bgColor: string;
  popular: boolean;
  intent: string;
  pack: string;
  cta: { bg: string; en: string };
  ctaVariant: "primary" | "secondary";
  nextTierTarget: number | null;
  nextTierName: string | null;
  setup: {
    price: number;
    included: LocalizedList;
  };
  monthly: {
    price: number;
    annualPrice: number;
    annualListPrice: number;
    included: LocalizedList;
  };
  notIncluded: LocalizedList;
  audit: {
    bg: { setup: { label: string; value: string }[]; monthly: { label: string; value: string }[] };
    en: { setup: { label: string; value: string }[]; monthly: { label: string; value: string }[] };
  };
};

export const availableAddons: Addon[] = [
  { id: "extra-automation", name: { bg: "+1 Автоматичен отговор", en: "+1 Automation" }, price: 50 },
  { id: "seo-audit", name: { bg: "Месечна SEO оптимизация", en: "Monthly SEO optimization" }, price: 70 },
  { id: "priority-support", name: { bg: "24/7 Приоритетна поддръжка", en: "24/7 Priority support" }, price: 90 },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "start",
    name: "Start",
    description: {
      bg: "Уеб Основа & Локално търсене за перфектно присъствие",
      en: "Web Foundation & Local Search for perfect search visibility",
    },
    color: "var(--lime)",
    bgColor: "rgba(106, 46, 58, 0.08)",
    popular: false,
    intent: "starter-pack",
    pack: "start",
    cta: { bg: "Избери Start", en: "Select Start" },
    ctaVariant: "secondary",
    nextTierTarget: 248,
    nextTierName: "Grow",
    setup: {
      price: 690,
      included: {
        bg: [
          "Професионален сайт (Код или CMS)",
          "Google Карти & Локално SEO от старта",
          "Бърза доставка на проекта",
        ],
        en: [
          "Professional website (Code or CMS)",
          "Google Maps & Local SEO from day one",
          "Fast project delivery",
        ],
      },
    },
    monthly: {
      price: 49,
      annualPrice: 529,
      annualListPrice: 588,
      included: {
        bg: [
          "Ultra-бързо зареждане, Edge хостинг & SSL защита",
          "Технически проверки и дребни промени",
          "Поддръжка по имейл",
        ],
        en: [
          "Ultra-fast loading, Edge hosting & SSL security",
          "Technical checks and small updates",
          "Email support",
        ],
      },
    },
    notIncluded: {
      bg: [
        "Писане на текстове за сайта",
        "Лого и брандинг",
        "Домейн регистрация (съдействаме безплатно при избор)",
      ],
      en: [
        "Website copywriting",
        "Logo & branding",
        "Domain registration (we assist for free when choosing one)",
      ],
    },
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
    id: "grow",
    name: "Grow",
    description: {
      bg: "AI Дигитален секретар във Viber & вашия сайт",
      en: "AI Smart Autopilot in Viber & your website",
    },
    color: "var(--violet)",
    bgColor: "rgba(106, 46, 58, 0.1)",
    popular: true,
    intent: "grow-pack",
    pack: "grow",
    cta: { bg: "Най-желан - Grow", en: "Most popular - Grow" },
    ctaVariant: "primary",
    nextTierTarget: 298,
    nextTierName: "Pro",
    setup: {
      price: 290,
      included: {
        bg: [
          "AI асистент денонощно (Viber, Messenger, сайт)",
          "Автоматично записване на часове",
          "CRM база данни за клиенти",
        ],
        en: [
          "24/7 AI assistant (Viber, Messenger, website)",
          "Automated calendar booking",
          "CRM database for your clients",
        ],
      },
    },
    monthly: {
      price: 248,
      annualPrice: 2678,
      annualListPrice: 2976,
      included: {
        bg: [
          "AI асистент денонощно (Viber, Messenger, сайт)",
          "Автоматично записване на часове",
          "CRM база данни за клиенти",
          "Поддръжка по имейл и чат",
        ],
        en: [
          "24/7 AI assistant (Viber, Messenger, website)",
          "Automated calendar booking",
          "CRM database for your clients",
          "Email & chat support",
        ],
      },
    },
    notIncluded: {
      bg: [
        "Изработка на нов сайт (освен ако не изберете Pro пакета)",
        "Обучение на AI за над 50 продукта/услуги (по оферта при по-голям каталог)",
        "Интеграция с външни системи извън стандартните канали",
      ],
      en: [
        "A new website build (unless you choose the Pro package)",
        "AI training for over 50 products/services (custom quote for larger catalogs)",
        "Integrations with external systems outside the standard channels",
      ],
    },
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
          { label: "LLM API usage budget", value: "24 €" },
          { label: "Weekly human auditing & prompt tuning", value: "25 €" },
        ],
      },
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: {
      bg: "Дигитален Автопилот: Премиум сайт + AI Асистент",
      en: "Digital Autopilot: Premium Website & AI Assistant",
    },
    color: "var(--coral)",
    bgColor: "rgba(106, 46, 58, 0.1)",
    popular: false,
    intent: "pro-pack",
    pack: "pro",
    cta: { bg: "Избери Pro", en: "Select Pro" },
    ctaVariant: "secondary",
    nextTierTarget: null,
    nextTierName: null,
    setup: {
      price: 990,
      included: {
        bg: [
          "Премиум сайт + AI по всички чат канали",
          "Синхронизация в реално време",
          "Лична техническа поддръжка",
        ],
        en: [
          "Premium website + AI across all chat channels",
          "Real-time catalog & stock sync",
          "Dedicated technical support",
        ],
      },
    },
    monthly: {
      price: 298,
      annualPrice: 3218,
      annualListPrice: 3576,
      included: {
        bg: [
          "Премиум сайт + AI по всички чат канали",
          "Синхронизация в реално време",
          "Лична техническа поддръжка",
          "Месечна консултация за растеж",
        ],
        en: [
          "Premium website + AI across all chat channels",
          "Real-time catalog & stock sync",
          "Dedicated technical support",
          "Monthly growth consultation",
        ],
      },
    },
    notIncluded: {
      bg: [
        "Многоезичност (по оферта)",
        "Разширени custom интеграции извън стандартния обхват",
      ],
      en: [
        "Multi-language support (custom quote)",
        "Advanced custom integrations beyond the standard scope",
      ],
    },
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
          { label: "LLM token API allocation", value: "29 €" },
          { label: "Real-time Vector Database sync engine", value: "20 €" },
        ],
      },
    },
  },
];

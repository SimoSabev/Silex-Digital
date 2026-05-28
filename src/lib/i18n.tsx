"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "bg" | "en";

const translations = {
  bg: {
    // Navigation
    "nav.home": "Начало",
    "nav.services": "Услуги",
    "nav.features": "Функции",
    "nav.demos": "Демо",
    "nav.pricing": "Цени",
    "nav.caseStudies": "Казуси",
    "nav.blog": "Блог",
    "nav.contact": "Контакти",
    "nav.getStarted": "Започни сега",

    // Hero
    "hero.headline": "Вашият сайт трябва да работи като най-добрия ви служител",
    "hero.sub": "Отговаряйте моментално. Уловете всеки клиент. Движете бизнеса напред — автоматично.",
    "hero.cta": "Виж как работи",
    "hero.ctaSecondary": "Тествай безплатно",
    "hero.stat1": "Клиенти обслужени",
    "hero.stat2": "Време за отговор",
    "hero.stat3": "По-висока конверсия",
    "hero.stat1Value": "10,000+",
    "hero.stat2Value": "<30 сек",
    "hero.stat3Value": "+300%",

    // Problem
    "problem.title": "Разпознайте реалността на вашия бизнес",
    "problem.sub": "Всеки ден губите клиенти без дори да разберете",
    "problem.card1.title": "Клиентите пишат… и чакат",
    "problem.card1.desc": "Средното време за отговор е 5+ часа. До тогава клиентът вече е при конкурента.",
    "problem.card2.title": "Обажданията остават без отговор",
    "problem.card2.desc": "42% от пропуснатите обаждания никога не се връщат. Всяко пропуснато обаждане е загубен приход.",
    "problem.card3.title": "Посетители идват и си тръгват",
    "problem.card3.desc": "92% от посетителите напускат сайта ви без да предприемат действие. Нямате как да ги върнете.",

    // Solution
    "solution.title": "Какво ако всяко взаимодействие беше автоматично?",
    "solution.sub": "Един слой автоматизация, който превръща пасивния бизнес в активен",
    "solution.point1": "Моментален отговор 24/7",
    "solution.point1.desc": "Всяко съобщение получава интелигентен отговор за секунди, не часове.",
    "solution.point2": "Нищо не се губи",
    "solution.point2.desc": "Всеки лийд е уловен, категоризиран и готов за проследяване.",
    "solution.point3": "Клиентът продължава напред",
    "solution.point3.desc": "Автоматично записване, напомняне и комуникация без ваша намеса.",

    // Demos
    "demos.title": "Изберете вашия път",
    "demos.sub": "Три начина да надградите бизнеса си — всеки с пълна автоматизация",
    "demos.tab1": "Имам сайт",
    "demos.tab2": "Нужен ми е сайт",
    "demos.tab3": "Нужна ми е персонализация",
    "demos.card1.title": "Слой Автоматизация",
    "demos.card1.sub": "За бизнеси с вече съществуващ сайт или приложение",
    "demos.card1.desc": "Интегрирайте нашия автоматизационен слой за 5 минути. Без код, без промяна на сайта.",
    "demos.card1.feat1": "Интеграция за 5 минути",
    "demos.card1.feat2": "Работи с всеки сайт",
    "demos.card1.feat3": "24/7 автоматичен отговор",
    "demos.card1.feat4": "Лийд улавяне и CRM",
    "demos.card1.cta": "Виж демо",
    "demos.card2.title": "CMS Платформа",
    "demos.card2.sub": "Модерен сайт + пълна автоматизация, без код",
    "demos.card2.desc": "Изберете от 30+ шаблона, персонализирайте с drag-and-drop. Автоматизацията е вградена.",
    "demos.card2.feat1": "Готов за 30 минути",
    "demos.card2.feat2": "Drag & drop билдър",
    "demos.card2.feat3": "Хостинг + SSL включени",
    "demos.card2.feat4": "Вградена автоматизация",
    "demos.card2.cta": "Виж демо",
    "demos.card3.title": "Код Платформа",
    "demos.card3.sub": "Пълен контрол с модерен tech stack и API достъп",
    "demos.card3.desc": "Next.js, React, Node.js — пълен API достъп до автоматизационния слой. За разработчици.",
    "demos.card3.feat1": "Next.js + React + Node",
    "demos.card3.feat2": "Пълен API достъп",
    "demos.card3.feat3": "Персонализирани workflows",
    "demos.card3.feat4": "Enterprise-ready",
    "demos.card3.cta": "Виж демо",

    // How it works
    "how.title": "Как работи",
    "how.sub": "Три прости стъпки — нищо сложно",
    "how.step1": "Бизнесът ви получава интерес",
    "how.step1.desc": "Съобщение, обаждане, форма — от кой да е канал",
    "how.step2": "Системата отговаря и улавя",
    "how.step2.desc": "Моментален отговор + лийд създаден + резервация предложена",
    "how.step3": "Вие виждате и действате",
    "how.step3.desc": "Известие + дашборд + бърз преглед на всичко",

    // Pricing
    "pricing.title": "Прозрачни цени",
    "pricing.sub": "По-евтино от един служител. По-ефективно от цял екип.",
    "pricing.monthly": "/месец",
    "pricing.cta": "Започни безплатно",
    "pricing.popular": "Популярен",
    "pricing.automation": "Автоматизация",
    "pricing.automation.desc": "За бизнеси с вече съществуващ сайт",
    "pricing.cms": "CMS + Автоматизация",
    "pricing.cms.desc": "Модерен сайт с пълна автоматизация",
    "pricing.code": "Код + Автоматизация",
    "pricing.code.desc": "Персонализирано решение с API достъп",
    "pricing.feat.conversations": "разговора/месец",
    "pricing.feat.channels": "Всички канали",
    "pricing.feat.ai": "AI отговори на български",
    "pricing.feat.crm": "CRM + Лийд управление",
    "pricing.feat.dashboard": "Дашборд & Аналитика",
    "pricing.feat.booking": "Резервации & Календар",
    "pricing.feat.templates": "30+ шаблона",
    "pricing.feat.hosting": "Хостинг + SSL включени",
    "pricing.feat.builder": "Drag & drop билдър",
    "pricing.feat.api": "Пълен API достъп",
    "pricing.feat.custom": "Персонализирани workflows",
    "pricing.feat.support": "Приоритетна поддръжка",
    "pricing.custom": "По договор",
    "pricing.contact": "Свържете се",

    // Testimonials
    "testimonials.title": "Какво казват нашите клиенти",
    "testimonials.sub": "Реални резултати от реални бизнеси в България",

    // CTA
    "cta.title": "Готови ли сте да автоматизирате бизнеса си?",
    "cta.sub": "14 дни безплатно. Без кредитна карта. Без ангажимент.",
    "cta.button": "Започни безплатно",
    "cta.secondary": "Говори с нас",

    // Footer
    "footer.description": "Модерна автоматизация за вашия бизнес. Превърнете всеки контакт в клиент.",
    "footer.quickLinks": "Бързи връзки",
    "footer.solutions": "Решения",
    "footer.contact": "Контакти",
    "footer.automation": "Автоматизация",
    "footer.cmsLayer": "CMS Платформа",
    "footer.codeLayer": "Код Платформа",
    "footer.integrations": "Интеграции",
    "footer.rights": "Всички права запазени.",
    "footer.privacy": "Поверителност",
    "footer.terms": "Условия",

    // Common
    "common.learnMore": "Научи повече",
    "common.tryFree": "Тествай безплатно",
    "common.watchDemo": "Виж демо",
    "common.contactUs": "Свържи се с нас",
    "common.bgn": "лв",
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.features": "Features",
    "nav.demos": "Demos",
    "nav.pricing": "Pricing",
    "nav.caseStudies": "Case Studies",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",

    // Hero
    "hero.headline": "Your website should work like your best employee",
    "hero.sub": "Respond instantly. Capture every client. Keep your business moving — automatically.",
    "hero.cta": "See how it works",
    "hero.ctaSecondary": "Try for free",
    "hero.stat1": "Clients served",
    "hero.stat2": "Response time",
    "hero.stat3": "Higher conversion",
    "hero.stat1Value": "10,000+",
    "hero.stat2Value": "<30 sec",
    "hero.stat3Value": "+300%",

    // Problem
    "problem.title": "Recognize your business reality",
    "problem.sub": "You're losing clients every day without even knowing",
    "problem.card1.title": "Customers message… and wait",
    "problem.card1.desc": "Average response time is 5+ hours. By then, the client is already with your competitor.",
    "problem.card2.title": "Calls go unanswered",
    "problem.card2.desc": "42% of missed calls never come back. Every missed call is lost revenue.",
    "problem.card3.title": "Visitors come and leave",
    "problem.card3.desc": "92% of visitors leave your site without taking action. You have no way to bring them back.",

    // Solution
    "solution.title": "What if every interaction was automatic?",
    "solution.sub": "One automation layer that turns passive businesses into active ones",
    "solution.point1": "Instant response 24/7",
    "solution.point1.desc": "Every message gets an intelligent reply in seconds, not hours.",
    "solution.point2": "Nothing slips through",
    "solution.point2.desc": "Every lead is captured, categorized, and ready for follow-up.",
    "solution.point3": "Clients move forward",
    "solution.point3.desc": "Automatic booking, reminders, and communication without your intervention.",

    // Demos
    "demos.title": "Choose your path",
    "demos.sub": "Three ways to upgrade your business — each with full automation",
    "demos.tab1": "I have a website",
    "demos.tab2": "I need a website",
    "demos.tab3": "I need custom",
    "demos.card1.title": "Automation Layer",
    "demos.card1.sub": "For businesses with an existing website or app",
    "demos.card1.desc": "Integrate our automation layer in 5 minutes. No code, no changes to your site.",
    "demos.card1.feat1": "5-minute integration",
    "demos.card1.feat2": "Works with any site",
    "demos.card1.feat3": "24/7 automated response",
    "demos.card1.feat4": "Lead capture & CRM",
    "demos.card1.cta": "See demo",
    "demos.card2.title": "CMS Platform",
    "demos.card2.sub": "Modern website + full automation, no code",
    "demos.card2.desc": "Choose from 30+ templates, customize with drag-and-drop. Automation built-in.",
    "demos.card2.feat1": "Ready in 30 minutes",
    "demos.card2.feat2": "Drag & drop builder",
    "demos.card2.feat3": "Hosting + SSL included",
    "demos.card2.feat4": "Built-in automation",
    "demos.card2.cta": "See demo",
    "demos.card3.title": "Code Platform",
    "demos.card3.sub": "Full control with modern tech stack and API access",
    "demos.card3.desc": "Next.js, React, Node.js — full API access to the automation layer. For developers.",
    "demos.card3.feat1": "Next.js + React + Node",
    "demos.card3.feat2": "Full API access",
    "demos.card3.feat3": "Custom workflows",
    "demos.card3.feat4": "Enterprise-ready",
    "demos.card3.cta": "See demo",

    // How it works
    "how.title": "How it works",
    "how.sub": "Three simple steps — nothing complicated",
    "how.step1": "Your business receives interest",
    "how.step1.desc": "Message, call, form — from any channel",
    "how.step2": "The system responds and captures",
    "how.step2.desc": "Instant response + lead created + booking offered",
    "how.step3": "You see and act",
    "how.step3.desc": "Notification + dashboard + quick overview of everything",

    // Pricing
    "pricing.title": "Transparent pricing",
    "pricing.sub": "Cheaper than one employee. More effective than a whole team.",
    "pricing.monthly": "/month",
    "pricing.cta": "Start free",
    "pricing.popular": "Popular",
    "pricing.automation": "Automation",
    "pricing.automation.desc": "For businesses with an existing site",
    "pricing.cms": "CMS + Automation",
    "pricing.cms.desc": "Modern site with full automation",
    "pricing.code": "Code + Automation",
    "pricing.code.desc": "Custom solution with API access",
    "pricing.feat.conversations": "conversations/month",
    "pricing.feat.channels": "All channels",
    "pricing.feat.ai": "AI responses in Bulgarian",
    "pricing.feat.crm": "CRM + Lead management",
    "pricing.feat.dashboard": "Dashboard & Analytics",
    "pricing.feat.booking": "Bookings & Calendar",
    "pricing.feat.templates": "30+ templates",
    "pricing.feat.hosting": "Hosting + SSL included",
    "pricing.feat.builder": "Drag & drop builder",
    "pricing.feat.api": "Full API access",
    "pricing.feat.custom": "Custom workflows",
    "pricing.feat.support": "Priority support",
    "pricing.custom": "Custom",
    "pricing.contact": "Contact us",

    // Testimonials
    "testimonials.title": "What our clients say",
    "testimonials.sub": "Real results from real businesses in Bulgaria",

    // CTA
    "cta.title": "Ready to automate your business?",
    "cta.sub": "14 days free. No credit card. No commitment.",
    "cta.button": "Start free",
    "cta.secondary": "Talk to us",

    // Footer
    "footer.description": "Modern automation for your businesses. Turn every contact into a client.",
    "footer.quickLinks": "Quick Links",
    "footer.solutions": "Solutions",
    "footer.contact": "Contact",
    "footer.automation": "Automation",
    "footer.cmsLayer": "CMS Platform",
    "footer.codeLayer": "Code Platform",
    "footer.integrations": "Integrations",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",

    // Common
    "common.learnMore": "Learn more",
    "common.tryFree": "Try for free",
    "common.watchDemo": "Watch demo",
    "common.contactUs": "Contact us",
    "common.bgn": "BGN",
  },
} as const;

type TranslationKey = keyof typeof translations.bg;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bg");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("silex-locale");
    const initialLocale: Locale = stored === "bg" || stored === "en" ? stored : "bg";

    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang = newLocale;
      localStorage.setItem("silex-locale", newLocale);
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

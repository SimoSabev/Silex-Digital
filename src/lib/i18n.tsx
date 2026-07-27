"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "bg" | "en";

const translations = {
  bg: {
    // Navigation
    "nav.home": "Начало",
    "nav.services": "Услуги",
    "nav.features": "Предимства",
    "nav.demos": "Демонстрации",
    "nav.pricing": "Цени",
    "nav.blog": "Блог",
    "nav.contact": "Контакти",
    "nav.getStarted": "Започни сега",

    "hero.badge": "Вдигаме бранда ви — не пакет от кутията",
    "hero.headlineLine1": "Подобрете своя бранд.",
    "hero.headlineLine2": "Лесно, бързо и ефективно.",
    "hero.sub": "Изберете най-подходящото за вашия бранд — подобрено уеб присъствие, чисто нов сайт или автоматизация на процесите. Ние предлагаме всичко необходимо.",
    "hero.cta": "Заяви безплатна консултация",
    "hero.ctaSecondary": "Виж интерактивното демо",
    "hero.stat1Value": "15+",
    "hero.stat1Label": "часа месечно, върнати ви от чатове",
    "hero.stat2Value": "3×",
    "hero.stat2Label": "повече запитвания извън работно време",
    "hero.stat3Value": "0",
    "hero.stat3Label": "клиенти, изгубени от бавен отговор",

    "home.pact.badge": "Как работим с вас",
    "home.pact.title": "Не предлагаме готови пакети. Изграждаме решения.",
    "home.pact.body": "Всяка фирма има различни нужди. За едни това е нов сайт, за други — автоматизация на процесите или специализирана система. Анализираме вашия случай и внедряваме точно това, което работи за вас.",
    "home.pillars.title": "Всичко необходимо за вашия дигитален растеж",
    "home.pillars.sub": "Не всяка фирма има нужда от едно и също. Избираме подходящите инструменти от нашия арсенал.",
    "home.pillars.a.title": "Модерно уеб присъствие",
    "home.pillars.a.body": "От подобряване на настоящия ви сайт до изграждане на чисто нови платформи. Правим ви видими, бързи и надеждни в интернет.",
    "home.pillars.b.title": "Автоматизация на процеса",
    "home.pillars.b.body": "Интелигентни системи, които поемат рутината — улесняват комуникацията, организират данните и пестят вашето време.",
    "home.services.badge": "За вашия бизнес",
    "home.services.title": "Правилният инструмент за вашата цел",
    "home.services.sub": "Без излишни разходи. Внедряваме само технологиите, които реално подобряват работата ви.",

    "home.demo.badge": "Интерактивно демо",
    "home.demo.title": "Вижте нашите",
    "home.demo.titleHighlight": "системи в действие",
    "home.demo.body": "Кратка симулация на една от нашите автоматизации: AI агент извлича данни от различни чат канали директно във вашия CRM. Натиснете „Стартирай демото“ вдясно.",
    "home.demo.bullet1": "Избирате предпочитани канали",
    "home.demo.bullet2": "Симулацията отнема около минута",
    "home.demo.bullet3": "Виждате как процесите се автоматизират",
    "home.demo.cta": "Виж всички демонстрации",
    "home.demo.note": "Това е само един пример от множеството системи, които можем да изградим за вас.",

    "demo.multichannel.title": "Мултиканални комуникации",
    "demo.multichannel.sub": "Симулация на автоматизирана комуникация от различни платформи.",
    "demo.multichannel.run": "Стартирай демото",
    "demo.multichannel.running": "Симулацията тече...",
    "demo.multichannel.newInquiry": "Ново събитие",
    "demo.multichannel.extracting": "Обработка...",
    "demo.multichannel.aiCore": "Система",
    "demo.multichannel.vaultTitle": "База данни",
    "demo.multichannel.vaultEmpty": "Готов за симулация",
    "demo.multichannel.stored": "Записано",
    "demo.multichannel.source": "Източник:",
    "demo.multichannel.item": "Данни:",
    "demo.multichannel.from": "от:",

    "home.beforeAfter.label": "Преди SilexBrand vs. След SilexBrand",
    "home.beforeAfter.before": "Преди SilexBrand",
    "home.beforeAfter.after": "След SilexBrand",
    "home.beforeAfter.before1": "Ръчна работа, хаос и повтарящи се задачи",
    "home.beforeAfter.before2": "Остаряло или трудно за управление онлайн присъствие",
    "home.beforeAfter.before3": "Бавни процеси и несигурни резултати",
    "home.beforeAfter.before4": "Губите клиенти заради липса на автоматизация",
    "home.beforeAfter.after1": "Оптимизирани процеси, които работят сами",
    "home.beforeAfter.after2": "Модерен сайт и безупречен дигитален облик",
    "home.beforeAfter.after3": "Бързо изпълнение и интегрирани системи",
    "home.beforeAfter.after4": "Повече фокус върху развитието, по-малко рутина",

    "home.how.badge": "Как работи",
    "home.how.title": "От идеята до реализацията",
    "home.how.titleHighlight": "без излишни стъпки",
    "home.how.body": "Анализираме нуждите ви, предлагаме оптимално решение (уебсайт, система или автоматизация) и го интегрираме директно във вашия бизнес.",

    // Problem
    "problem.title": "Защо губите от потенциала си?",
    "problem.sub": "Предизвикателствата, които спират растежа на бизнеса",
    "problem.card1.title": "Липса на онлайн видимост",
    "problem.card1.desc": "Остарял сайт или липса на такъв означава, че клиентите избират конкуренцията, защото дори не стигат до вас.",
    "problem.card2.title": "Ръчни процеси и хаос",
    "problem.card2.desc": "Губите време в механична работа вместо да автоматизирате ежедневните задачи и да се фокусирате върху растежа.",
    "problem.card3.title": "Остарели системи",
    "problem.card3.desc": "Използването на платформи, които не взаимодействат помежду си, бави работата и води до грешки.",

    // Solution
    "solution.title": "Цялостна дигитална екосистема",
    "solution.sub": "Всичко от изграждането на сайта до автоматизирането на ежедневните ви задачи",
    "solution.point1": "Модерен Уебсайт",
    "solution.point1.desc": "Подобряване на текущия ви сайт или изграждане на чисто нов, за да сте винаги с крачка напред.",
    "solution.point2": "Автоматизация на процеси",
    "solution.point2.desc": "Умни системи, които поемат рутинната работа, за да разполагате с повече време и по-малко хаос.",
    "solution.point3": "Интелигентни интеграции",
    "solution.point3.desc": "Свързваме платформите ви, за да работят в пълен синхрон — от първото докосване до крайната реализация.",

    // Demos
    "demos.title": "Всички решения на едно място",
    "demos.sub": "Изберете подходящото за вашата фаза на развитие",
    "demos.tab1": "Уеб Присъствие",
    "demos.tab2": "Автоматизация",
    "demos.tab3": "Цялостна система",
    "demos.card1.title": "Модерно Уеб Присъствие",
    "demos.card1.sub": "Чисто нов сайт или ъпгрейд на вашия",
    "demos.card1.desc": "Изграждаме съвременни платформи с акцент върху бързина, дизайн и реални бизнес резултати.",
    "demos.card1.feat1": "Конструиране на нов сайт",
    "demos.card1.feat2": "Подобряване на текущи платформи",
    "demos.card1.feat3": "Оптимизация и SEO",
    "demos.card1.feat4": "Ултра-бърз и мобилен дизайн",
    "demos.card1.cta": "Поискай оферта",
    "demos.card2.title": "Автоматизация & Системи",
    "demos.card2.sub": "Оптимизиране на процесите",
    "demos.card2.desc": "Умни инструменти, вътрешни системи и интеграции, които ви пестят безброй часове ръчен труд.",
    "demos.card2.feat1": "Вътрешни бизнес системи",
    "demos.card2.feat2": "Автоматизация на рутината",
    "demos.card2.feat3": "Интеграция на съществуващи платформи",
    "demos.card2.feat4": "AI системи в помощ на екипа",
    "demos.card2.cta": "Консултирай се с нас",
    "demos.card3.title": "Пълна Дигитална Трансформация",
    "demos.card3.sub": "Сайт + Системи + Автоматизация",
    "demos.card3.desc": "Всичко необходимо в един пакет: перфектно уеб присъствие с дълбока автоматизация на ключови процеси.",
    "demos.card3.feat1": "Премиум уебсайт",
    "demos.card3.feat2": "Свързани бизнес системи",
    "demos.card3.feat3": "Синхронизация на всички канали",
    "demos.card3.feat4": "Приоритетна поддръжка",
    "demos.card3.cta": "Свържи се за план",

    // How it works
    "how.title": "Как протича работата ни",
    "how.sub": "Три ясни стъпки към дигитализиране на вашите процеси",
    "how.step1": "Анализ и консултация",
    "how.step1.desc": "Разбираме бизнес модела ви и откриваме от какво имате нужда — нов сайт или автоматизация.",
    "how.step2": "Разработка и внедряване",
    "how.step2.desc": "Изграждаме надежден уебсайт, вътрешни системи или свързваме платформите ви.",
    "how.step3": "Реални резултати",
    "how.step3.desc": "Процесите ви стават по-ефективни, операциите по-лесни, а брандът — стабилен.",

    // Pricing
    "pricing.title": "Инвестирайте в ефективност",
    "pricing.sub": "Гъвкави решения, които носят реална стойност на вашия бизнес.",
    "pricing.monthly": "",
    "pricing.cta": "Започни сега",
    "pricing.popular": "Най-желан",
    "pricing.automation": "Уеб Присъствие",
    "pricing.automation.desc": "Професионален сайт (нов или ъпгрейд) за стабилен дигитален облик",
    "pricing.cms": "Автоматизация & Системи",
    "pricing.cms.desc": "Инструменти, създадени да ви спестяват време и ресурси",
    "pricing.code": "Дигитална Трансформация",
    "pricing.code.desc": "Пълният пакет: Уебсайт + Разширени бизнес системи",
    "pricing.feat.conversations": "Персонализиран дизайн",
    "pricing.feat.channels": "Техническа SEO оптимизация",
    "pricing.feat.ai": "Интегриране на нови системи",
    "pricing.feat.crm": "Оптимизиране на работните процеси",
    "pricing.feat.dashboard": "Автоматизирана обработка на данни",
    "pricing.feat.booking": "Умни алгоритми и AI функционалности",
    "pricing.feat.templates": "Изграждане на архитектура по мярка",
    "pricing.feat.hosting": "Сигурен хостинг и поддръжка",
    "pricing.feat.builder": "Гъвкаво и мащабируемо решение",
    "pricing.feat.api": "Синхронизация между платформите",
    "pricing.feat.custom": "Безпроблемна комуникация",
    "pricing.feat.support": "Приоритетна поддръжка от екипа ни",
    "pricing.custom": "По договор",
    "pricing.contact": "Говори с нас",

    // Testimonials
    "testimonials.title": "Доказани резултати",
    "testimonials.sub": "Помагаме на компании да оптимизират времето и ресурсите си",

    // CTA
    "cta.title": "Готови ли сте да подобрите бизнеса си?",
    "cta.sub": "Изпратете запитване, за да обсъдим кое е най-доброто решение за вас — уебсайт, автоматизация или пълна трансформация.",
    "cta.button": "Заяви безплатна консултация",
    "cta.secondary": "Разгледай услугите ни",

    // Footer
    "footer.description": "Вдигаме бранда ви с решения, изградени специално за вашите нужди — от уебсайт до пълна автоматизация.",
    "footer.quickLinks": "Бързи връзки",
    "footer.solutions": "Решения",
    "footer.contact": "Контакти",
    "footer.automation": "Уеб Присъствие",
    "footer.cmsLayer": "Системи и Автоматизация",
    "footer.codeLayer": "Пълна Трансформация",
    "footer.integrations": "Интеграции",
    "footer.seo": "SEO & Видимост в AI",
    "footer.rights": "Всички права запазени.",
    "footer.privacy": "Поверителност",
    "footer.terms": "Условия",

    // Common
    "common.learnMore": "Научи повече",
    "common.tryFree": "Започни безплатно",
    "common.watchDemo": "Виж демо",
    "common.contactUs": "Свържи се с нас",
    "common.bgn": "лв",
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.features": "Benefits",
    "nav.demos": "Demos",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",

    "hero.badge": "We elevate your brand — not an off-the-shelf package",
    "hero.headlineLine1": "Make your brand more recognizable.",
    "hero.headlineLine2": "With SilexBrand.",
    "hero.sub": "Choose the best fit for your brand — improved web presence, a brand new website, or process automation. We provide everything you need.",
    "hero.cta": "Request a free consultation",
    "hero.ctaSecondary": "Try the interactive demo",
    "hero.stat1Value": "15+",
    "hero.stat1Label": "hours a month back from chats",
    "hero.stat2Value": "3×",
    "hero.stat2Label": "more inquiries after business hours",
    "hero.stat3Value": "0",
    "hero.stat3Label": "customers lost to slow replies",

    "home.pact.badge": "How we operate",
    "home.pact.title": "We don't offer pre-packaged services. We build solutions.",
    "home.pact.body": "Every business faces unique challenges. Some need a new website, others need workflow automation or tailored systems. We analyze your situation and implement exactly what drives results for you.",
    "home.pillars.title": "Everything you need for your digital growth",
    "home.pillars.sub": "Different businesses require different approaches. We select the right tools from our arsenal.",
    "home.pillars.a.title": "Modern Web Presence",
    "home.pillars.a.body": "From upgrading your current site to building entirely new platforms. We make you visible, fast, and reliable online.",
    "home.pillars.b.title": "Process Automation",
    "home.pillars.b.body": "Intelligent systems that handle the routine — streamlining communication, organizing data, and saving your time.",
    "home.services.badge": "Built for your business",
    "home.services.title": "The right tool for your goal",
    "home.services.sub": "No unnecessary overhead. We only implement tech that tangibly improves your operations.",

    "home.demo.badge": "Interactive demo",
    "home.demo.title": "See our",
    "home.demo.titleHighlight": "systems in action",
    "home.demo.body": "A brief simulation of one of our automations: an AI agent extracts data from various chat channels seamlessly into your CRM. Click \"Run demo\" on the right.",
    "home.demo.bullet1": "Select your preferred channels",
    "home.demo.bullet2": "The simulation takes about a minute",
    "home.demo.bullet3": "Watch routine tasks get automated",
    "home.demo.cta": "View all demos",
    "home.demo.note": "This is just one example of the numerous systems we can build for you.",

    "demo.multichannel.title": "Multi-channel Communications",
    "demo.multichannel.sub": "Simulation of automated communication across different platforms.",
    "demo.multichannel.run": "Run demo",
    "demo.multichannel.running": "Simulation running...",
    "demo.multichannel.newInquiry": "New event",
    "demo.multichannel.extracting": "Processing...",
    "demo.multichannel.aiCore": "System",
    "demo.multichannel.vaultTitle": "Database",
    "demo.multichannel.vaultEmpty": "Ready for simulation",
    "demo.multichannel.stored": "Saved",
    "demo.multichannel.source": "Source:",
    "demo.multichannel.item": "Data:",
    "demo.multichannel.from": "from:",

    "home.beforeAfter.label": "Before SilexBrand vs. After SilexBrand",
    "home.beforeAfter.before": "Before SilexBrand",
    "home.beforeAfter.after": "After SilexBrand",
    "home.beforeAfter.before1": "Manual work, chaos, and repetitive tasks",
    "home.beforeAfter.before2": "Outdated or hard-to-manage online presence",
    "home.beforeAfter.before3": "Slow processes and unpredictable results",
    "home.beforeAfter.before4": "Losing clients due to lack of automation",
    "home.beforeAfter.after1": "Optimized workflows that run independently",
    "home.beforeAfter.after2": "Modern site and a flawless digital footprint",
    "home.beforeAfter.after3": "Fast execution and inter-connected systems",
    "home.beforeAfter.after4": "More focus on growth, less on routine",

    "home.how.badge": "How it works",
    "home.how.title": "From concept to deployment",
    "home.how.titleHighlight": "with no wasted steps",
    "home.how.body": "We analyze your needs, design the optimal solution (website, system, or automation), and integrate it seamlessly into your business.",

    // Problem
    "problem.title": "Why leave potential untapped?",
    "problem.sub": "Challenges that stall business growth",
    "problem.card1.title": "Lack of Online Visibility",
    "problem.card1.desc": "An outdated or missing website means customers choose the competition before they even reach you.",
    "problem.card2.title": "Manual Processes and Chaos",
    "problem.card2.desc": "You lose time on mechanical work instead of automating daily tasks and focusing on scaling.",
    "problem.card3.title": "Disjointed Systems",
    "problem.card3.desc": "Using platforms that don't communicate with each other slows down work and inevitably leads to errors.",

    // Solution
    "solution.title": "Comprehensive Digital Ecosystem",
    "solution.sub": "Everything from launching your site to automating your daily operations",
    "solution.point1": "Modern Website",
    "solution.point1.desc": "Upgrading your current site or building a new one to keep you a step ahead.",
    "solution.point2": "Process Automation",
    "solution.point2.desc": "Smart systems that shoulder routine work so you have more time and less chaos.",
    "solution.point3": "Intelligent Integrations",
    "solution.point3.desc": "We connect your platforms to operate in full synergy — from first touchpoint to final execution.",

    // Demos
    "demos.title": "All solutions in one place",
    "demos.sub": "Choose the right fit for your stage of growth",
    "demos.tab1": "Web Presence",
    "demos.tab2": "Automation",
    "demos.tab3": "Complete System",
    "demos.card1.title": "Modern Web Presence",
    "demos.card1.sub": "A brand new site or a vital upgrade",
    "demos.card1.desc": "We build modern platforms focused on speed, design, and tangible business metrics.",
    "demos.card1.feat1": "Development of new websites",
    "demos.card1.feat2": "Upgrading existing platforms",
    "demos.card1.feat3": "Optimization and SEO",
    "demos.card1.feat4": "Ultra-fast and mobile-first design",
    "demos.card1.cta": "Request a Quote",
    "demos.card2.title": "Automation & Systems",
    "demos.card2.sub": "Workflow Optimization",
    "demos.card2.desc": "Smart tools, internal logic, and integrations that save you countless hours of manual labor.",
    "demos.card2.feat1": "Internal business systems",
    "demos.card2.feat2": "Routine automation",
    "demos.card2.feat3": "Integration of existing tools",
    "demos.card2.feat4": "Team-assistive AI workflows",
    "demos.card2.cta": "Consult with Us",
    "demos.card3.title": "Full Digital Transformation",
    "demos.card3.sub": "Website + Systems + Automation",
    "demos.card3.desc": "Everything required in a single bundle: premium web presence paired with deep automation for core processes.",
    "demos.card3.feat1": "Premium website",
    "demos.card3.feat2": "Interconnected tools",
    "demos.card3.feat3": "All-channel synchronization",
    "demos.card3.feat4": "Priority tech support",
    "demos.card3.cta": "Contact for a Plan",

    // How it works
    "how.title": "Our workflow process",
    "how.sub": "Three transparent steps to digitalize your operations",
    "how.step1": "Analysis and Consultation",
    "how.step1.desc": "We unpack your business model and identify exactly what you need — a new site or system automation.",
    "how.step2": "Development and Integration",
    "how.step2.desc": "We construct your reliable website, internal systems, or connect your disparate platforms.",
    "how.step3": "Measurable Results",
    "how.step3.desc": "Your processes become more efficient, operations easier, and your brand rock-solid.",

    // Pricing
    "pricing.title": "Invest in Efficiency",
    "pricing.sub": "Flexible solutions driving real, scalable value for your business.",
    "pricing.monthly": "",
    "pricing.cta": "Start Now",
    "pricing.popular": "Recommended",
    "pricing.automation": "Web Presence",
    "pricing.automation.desc": "Professional site (new or upgrade) for a secure digital foothold",
    "pricing.cms": "Automation & Systems",
    "pricing.cms.desc": "Tools crafted to save you time and essential resources",
    "pricing.code": "Digital Transformation",
    "pricing.code.desc": "The complete package: Website + Advanced Business Logic",
    "pricing.feat.conversations": "Custom UI/UX Design",
    "pricing.feat.channels": "Technical SEO optimization",
    "pricing.feat.ai": "System Integrations",
    "pricing.feat.crm": "Workflow Streamlining",
    "pricing.feat.dashboard": "Automated Data Processing",
    "pricing.feat.booking": "Smart algorithms and features",
    "pricing.feat.templates": "Custom Architecture Build",
    "pricing.feat.hosting": "Secure Hosting and SLA",
    "pricing.feat.builder": "Flexible Output scalability",
    "pricing.feat.api": "Cross-platform Synchronization",
    "pricing.feat.custom": "Unified Communications",
    "pricing.feat.support": "Priority Team Support",
    "pricing.custom": "By contract",
    "pricing.contact": "Talk to Us",

    // Testimonials
    "testimonials.title": "Proven Results",
    "testimonials.sub": "Helping companies optimize their time, resources, and workflows",

    // CTA
    "cta.title": "Ready to elevate your business?",
    "cta.sub": "Send an inquiry to discuss the ideal route forward — be it web presence, automation, or full-scale transformation.",
    "cta.button": "Request a Free Consultation",
    "cta.secondary": "Explore Our Services",

    // Footer
    "footer.description": "We elevate your brand with solutions engineered for your exact operational needs — from site to full system automation.",
    "footer.quickLinks": "Quick Links",
    "footer.solutions": "Solutions",
    "footer.contact": "Contact",
    "footer.automation": "Web Presence",
    "footer.cmsLayer": "Systems & Automation",
    "footer.codeLayer": "Digital Transformation",
    "footer.integrations": "Integrations",
    "footer.seo": "SEO & AI Visibility",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Common
    "common.learnMore": "Learn more",
    "common.tryFree": "Get started",
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

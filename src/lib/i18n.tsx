"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "bg" | "en";

// Copy rules (see docs/positioning-proposal.md §5): "вие" only, sentence case,
// no shouting caps, no "!". Prices are never typed here — templates carry
// {placeholders} that components fill from "@/lib/offer" via interpolate().
const translations = {
  bg: {
    // Navigation
    "nav.services": "Услуги",
    "nav.demos": "Демота",
    "nav.pricing": "Цени и пакети",
    "nav.getStarted": "Заявете среща",
    "nav.menu": "Меню",
    "nav.openMenu": "Отворете менюто",
    "nav.closeMenu": "Затворете менюто",

    // Shared
    "common.vatNote": "Цените са без ДДС.",

    // Hero
    "hero.badge": "За български фирми — нови и утвърдени",
    "hero.headlineLine1": "От нула до",
    "hero.headlineLine2": "разпознаваем бранд.",
    "hero.sub": "Идентичност, сайт, съдържание, реклама, SEO и AI автоматизация — от един екип, по един план. Започнете с цялото или с една част.",
    "hero.cta": "Разкажете ни за бизнеса си",
    "hero.ctaSecondary": "Вижте услугите и цените",
    "hero.stat1Label": "услуги в един екип, без да координирате изпълнители",
    "hero.stat2Label": "писмен план и един човек за контакт",
    "hero.stat3Label": "дни до пуснат сайт при стандартен проект",
    "hero.visualNote": "Илюстрация: шестте части на един бранд и началните им цени. Цените са без ДДС.",
    "hero.visual.title": "Вашият бранд",
    "hero.visual.layers": "Слоеве",
    "hero.visual.ready": "Готово за пускане",
    "hero.reveal.label": "Как SilexBrand изгражда бранд",
    "hero.reveal.tagline": "Идентичност, сайт, съдържание, реклама, SEO и AI — един бранд, построен от основите.",
    "hero.reveal.scroll": "Превъртете",

    // Six services (home cards, marquee, footer, hero visual)
    "svc.identity.title": "Идентичност",
    "svc.identity.body": "Име, лого, цветове, тон на говорене. Основата, върху която стъпва всичко останало.",
    "svc.identity.price": "от {price}",
    "svc.website.title": "Уебсайт",
    "svc.website.body": "Бърз сайт, изграден по мярка, не от шаблон. Води посетителя към запитване.",
    "svc.website.price": "от {price}",
    "svc.content.title": "Съдържание",
    "svc.content.body": "Снимки, видео и текстове, които звучат като вас. Имате какво да покажете от първия ден.",
    "svc.content.price": "от {price}",
    "svc.ads.title": "Реклама",
    "svc.ads.body": "Реклама в Google и социалните мрежи със зададен бюджет и месечен отчет. Виждате колко струва всяко запитване.",
    "svc.ads.price": "настройка от {price}",
    "svc.seo.title": "SEO и Google",
    "svc.seo.body": "Да ви намират, когато търсят: в Google, в картите и все по-често в ChatGPT и Gemini.",
    "svc.seo.price": "от {price}",
    "svc.ai.title": "AI асистент и автоматизация",
    "svc.ai.short": "AI автоматизация",
    "svc.ai.body": "Асистент във Viber, Messenger и на сайта, който знае цените ви и записва час.",
    "svc.ai.price": "{oneTime} + {monthly}",

    // Three paths
    "home.paths.badge": "Как започваме",
    "home.paths.title": "Три начина да започнете",
    "home.paths.body": "Не всеки тръгва от едно и също място. Изберете най-близкия до вас — можете да минете към друг, когато бизнесът го поиска.",
    "home.paths.zero.title": "От нула",
    "home.paths.zero.body": "Имате идея, име или бизнес без онлайн образ? Изграждаме всичко по ред — идентичност, сайт, съдържание, реклама, SEO — по един писмен план.",
    "home.paths.zero.cta": "Вижте пакетите",
    "home.paths.growth.title": "Растеж",
    "home.paths.growth.body": "Имате работещ бизнес, но онлайн не го отразява? Подреждаме и усилваме това, което вече е там — сайт, Google, реклама, автоматизация.",
    "home.paths.growth.cta": "Вижте пакетите",
    "home.paths.bundlePrice": "Пакет „{name}“ — {oneTime} + {monthly}",
    "home.paths.single.title": "Единична услуга",
    "home.paths.single.body": "Трябва ви само логото, само сайтът или само SEO? Купувате точно това, с ясна цена и без обвързване. Другите части можете да добавите по-късно.",
    "home.paths.single.price": "Лого {logo} · Сайт {site} · SEO от {seo}",
    "home.paths.single.cta": "Вижте цените на услугите",

    // Services
    "home.services.badge": "Шест услуги",
    "home.services.title": "Поотделно или заедно",
    "home.services.sub": "Всяка има ясна цена и ясен резултат. Заедно се свързват и излизат по-евтино.",
    "home.services.cta": "Вижте всички услуги и пакети",

    // Demo
    "home.demo.badge": "Вижте го на живо",
    "home.demo.title": "Автоматизацията на практика",
    "home.demo.body": "Кратка симулация: съобщения от различни канали се разпознават и се записват в една клиентска база.",
    "home.demo.bullet1": "Изберете каналите, които ви интересуват",
    "home.demo.bullet2": "Симулацията отнема около минута",
    "home.demo.bullet3": "Виждате как всяко съобщение стига до базата",
    "home.demo.note": "Демото показва само автоматизацията — една от шестте услуги. Данните са примерни.",
    "home.demo.cta": "Вижте всички демота",

    "demo.multichannel.title": "Съобщения от няколко канала",
    "demo.multichannel.sub": "Симулация: запитвания от различни платформи се записват на едно място.",
    "demo.multichannel.run": "Пуснете демото",
    "demo.multichannel.running": "Симулацията тече…",
    "demo.multichannel.newInquiry": "Ново запитване",
    "demo.multichannel.extracting": "Обработка…",
    "demo.multichannel.aiCore": "Система",
    "demo.multichannel.vaultTitle": "Клиентска база",
    "demo.multichannel.vaultEmpty": "Готово за симулация",
    "demo.multichannel.stored": "Записано",
    "demo.multichannel.source": "Източник:",
    "demo.multichannel.item": "Данни:",
    "demo.multichannel.from": "от:",

    // Before / after
    "home.beforeAfter.title": "Разпокъсано срещу свързано",
    "home.beforeAfter.before": "Когато всеки прави своето",
    "home.beforeAfter.after": "Когато е един екип",
    "home.beforeAfter.before1": "Лого от един, сайт от друг, реклама от трети — и никой не носи цялото",
    "home.beforeAfter.before2": "Сайт, който не прилича на профилите ви, и профили, които не водят към сайта",
    "home.beforeAfter.before3": "Плащате за услуги, които не се допълват, и не знаете кое работи",
    "home.beforeAfter.before4": "Клиентите ви намират трудно и ви запомнят още по-трудно",
    "home.beforeAfter.after1": "Една визия — от логото до последната реклама",
    "home.beforeAfter.after2": "Сайт, Google и профили, които водят един към друг",
    "home.beforeAfter.after3": "Ясна цена за всяка част — виждате за какво плащате",
    "home.beforeAfter.after4": "Един човек за контакт, който знае целия проект",

    // How we work
    "home.how.badge": "Как работим",
    "home.how.title": "Първо основите, после фасадата",
    "home.how.body": "Започваме с кратка среща и писмен план с цени. Строим на етапи, показваме ви всеки от тях и пускаме, когато сте доволни.",
    "home.how.step1.title": "Среща",
    "home.how.step1.body": "30 минути. Слушаме и казваме какво ви трябва и какво не.",
    "home.how.step2.title": "План",
    "home.how.step2.body": "Писмен, с обхват, срокове и цена по редове — преди да платите.",
    "home.how.step3.title": "Изграждане",
    "home.how.step3.body": "На етапи. Показваме ви всеки от тях, преди да продължим.",
    "home.how.step4.title": "Пускане",
    "home.how.step4.body": "Стандартен сайт е готов за около {days} дни.",

    // Sample calculation
    "home.roi.badge": "Примерна сметка",
    "home.roi.title": "Колко запитвания губите при бавен отговор?",
    "home.roi.body": "Примерът приема, че по-бърз отговор превръща около {pct} % повече запитвания в клиенти. Това е илюстрация, не обещание — за вашия бизнес ще направим отделна сметка.",
    "home.roi.leads": "Запитвания на месец",
    "home.roi.deal": "Средна стойност на клиент",
    "home.roi.extra": "Допълнителни клиенти на месец",
    "home.roi.gain": "Примерна допълнителна стойност на месец",
    "home.roi.cta": "Поискайте сметка за вашия бизнес",

    // Proof
    "home.proof.title": "Какво можете да проверите сами",
    "home.proof.sub": "Не ви молим да ни вярвате на думи.",
    "home.proof.item1.title": "Всяка цена е по редове",
    "home.proof.item1.body": "Виждате сумите на всеки ред, преди да платите.",
    "home.proof.item2.title": "Работещи демота",
    "home.proof.item2.body": "Автоматизациите се пробват в браузъра, без регистрация.",
    "home.proof.item3.title": "Писмен план преди старт",
    "home.proof.item3.body": "Обхват, срокове и цена — преди първото плащане.",
    "home.proof.item4.title": "Без дългосрочен договор за единичните услуги",
    "home.proof.item4.body": "Месец за месец, 30 дни предизвестие.",

    // Pricing teaser
    "home.pricing.title": "Цени, които виждате изцяло",
    "home.pricing.sub": "Всяка услуга има отделна цена. Пакетите са по-евтини от същите услуги поотделно — и разликата е изписана.",
    "home.pricing.separately": "Поотделно",
    "home.pricing.inBundle": "В пакета",
    "home.pricing.save": "Спестявате",
    "home.pricing.minTerm": "Месечната част е за минимум {months} месеца.",
    "home.pricing.choose": "Попитайте за този пакет",
    "home.pricing.cta": "Вижте всички цени и пакети",

    // Final CTA
    "cta.title": "Започнете оттам, където сте",
    "cta.sub": "Среща от 30 минути, без ангажимент. Казваме ви какво ви трябва, какво може да почака и колко струва — писмено.",
    "cta.button": "Заявете безплатна среща",
    "cta.secondary": "Вижте услугите и цените",

    // Footer
    "footer.description": "Изграждаме брандове за български фирми — от идентичност и сайт до реклама, SEO и AI автоматизация.",
    "footer.freeCall": "Безплатна 30-минутна среща",
    "footer.services": "Услуги",
    "footer.contact": "Контакти",
    "footer.legal": "Правна информация",
    "footer.office": "Офис",
    "footer.city": "Варна, България",
    "footer.phone": "Телефон",
    "footer.email": "Имейл",
    "footer.rights": "Всички права запазени.",
    "footer.privacy": "Поверителност",
    "footer.terms": "Условия",
    "footer.dataDeletion": "Изтриване на данни",
  },

  en: {
    // Navigation
    "nav.services": "Services",
    "nav.demos": "Demos",
    "nav.pricing": "Pricing & bundles",
    "nav.getStarted": "Book a call",
    "nav.menu": "Menu",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",

    // Shared
    "common.vatNote": "Prices exclude VAT.",

    // Hero
    "hero.badge": "For Bulgarian businesses, new and established",
    "hero.headlineLine1": "From zero to a brand",
    "hero.headlineLine2": "people recognize.",
    "hero.sub": "Identity, website, content, ads, SEO and AI automation, from one team and one plan. Start with the whole thing or with one part.",
    "hero.cta": "Tell us about your business",
    "hero.ctaSecondary": "See services and pricing",
    "hero.stat1Label": "services in one team, no contractors to coordinate",
    "hero.stat2Label": "written plan and one point of contact",
    "hero.stat3Label": "days to a live site on a standard project",
    "hero.visualNote": "Illustration: the six parts of a brand and their starting prices. Prices exclude VAT.",
    "hero.visual.title": "Your brand",
    "hero.visual.layers": "Layers",
    "hero.visual.ready": "Ready to launch",
    "hero.reveal.label": "How SilexBrand builds a brand",
    "hero.reveal.tagline": "Identity, website, content, ads, SEO and AI: one brand, built from the foundations.",
    "hero.reveal.scroll": "Scroll",

    // Six services
    "svc.identity.title": "Identity",
    "svc.identity.body": "Name, logo, colours and tone of voice. The foundation everything else stands on.",
    "svc.identity.price": "from {price}",
    "svc.website.title": "Website",
    "svc.website.body": "A fast site built to measure, not from a template. It leads visitors to an inquiry.",
    "svc.website.price": "from {price}",
    "svc.content.title": "Content",
    "svc.content.body": "Photos, video and copy that sound like you. You have something to show from day one.",
    "svc.content.price": "from {price}",
    "svc.ads.title": "Ads",
    "svc.ads.body": "Google and social ads with a set budget and a monthly report. You see what each inquiry costs.",
    "svc.ads.price": "setup from {price}",
    "svc.seo.title": "SEO and Google",
    "svc.seo.body": "Get found when people search: on Google, on Maps, and more and more in ChatGPT and Gemini.",
    "svc.seo.price": "from {price}",
    "svc.ai.title": "AI assistant and automation",
    "svc.ai.short": "AI automation",
    "svc.ai.body": "An assistant on Viber, Messenger and your site that knows your prices and books appointments.",
    "svc.ai.price": "{oneTime} + {monthly}",

    // Three paths
    "home.paths.badge": "How we start",
    "home.paths.title": "Three ways to get started",
    "home.paths.body": "Not everyone starts from the same place. Pick the one closest to you; you can move to another when the business needs it.",
    "home.paths.zero.title": "From zero",
    "home.paths.zero.body": "An idea, a name, or a business with no online presence? We build everything in order (identity, website, content, ads, SEO) on one written plan.",
    "home.paths.zero.cta": "See the bundles",
    "home.paths.growth.title": "Growth",
    "home.paths.growth.body": "A working business that doesn't show online? We tidy up and strengthen what's already there: website, Google, ads, automation.",
    "home.paths.growth.cta": "See the bundles",
    "home.paths.bundlePrice": "“{name}” bundle: {oneTime} + {monthly}",
    "home.paths.single.title": "Single service",
    "home.paths.single.body": "Only need the logo, the website or SEO? Buy exactly that, with a clear price and no lock-in. Add the other parts later.",
    "home.paths.single.price": "Logo {logo} · Website {site} · SEO from {seo}",
    "home.paths.single.cta": "See service prices",

    // Services
    "home.services.badge": "Six services",
    "home.services.title": "Separately or together",
    "home.services.sub": "Each has a clear price and a clear result. Together they connect and cost less.",
    "home.services.cta": "See all services and bundles",

    // Demo
    "home.demo.badge": "See it live",
    "home.demo.title": "Automation in practice",
    "home.demo.body": "A short simulation: messages from different channels are recognised and saved to one client database.",
    "home.demo.bullet1": "Pick the channels you care about",
    "home.demo.bullet2": "The simulation takes about a minute",
    "home.demo.bullet3": "Watch each message land in the database",
    "home.demo.note": "The demo shows only automation, one of the six services. The data is sample data.",
    "home.demo.cta": "See all demos",

    "demo.multichannel.title": "Messages from several channels",
    "demo.multichannel.sub": "Simulation: inquiries from different platforms saved in one place.",
    "demo.multichannel.run": "Run the demo",
    "demo.multichannel.running": "Simulation running…",
    "demo.multichannel.newInquiry": "New inquiry",
    "demo.multichannel.extracting": "Processing…",
    "demo.multichannel.aiCore": "System",
    "demo.multichannel.vaultTitle": "Client database",
    "demo.multichannel.vaultEmpty": "Ready for simulation",
    "demo.multichannel.stored": "Saved",
    "demo.multichannel.source": "Source:",
    "demo.multichannel.item": "Data:",
    "demo.multichannel.from": "from:",

    // Before / after
    "home.beforeAfter.title": "Scattered vs. connected",
    "home.beforeAfter.before": "When everyone does their own part",
    "home.beforeAfter.after": "When it's one team",
    "home.beforeAfter.before1": "Logo from one person, website from another, ads from a third, and nobody owns the whole",
    "home.beforeAfter.before2": "A website that doesn't look like your profiles, and profiles that don't lead to the website",
    "home.beforeAfter.before3": "You pay for services that don't fit together and can't tell what works",
    "home.beforeAfter.before4": "Clients find you with difficulty and remember you with even more",
    "home.beforeAfter.after1": "One look, from the logo to the last ad",
    "home.beforeAfter.after2": "Website, Google and profiles that lead to each other",
    "home.beforeAfter.after3": "A clear price for every part, so you see what you pay for",
    "home.beforeAfter.after4": "One point of contact who knows the whole project",

    // How we work
    "home.how.badge": "How we work",
    "home.how.title": "Foundations first, then the facade",
    "home.how.body": "We start with a short call and a written plan with prices. We build in stages, show you each one, and launch when you're happy.",
    "home.how.step1.title": "Call",
    "home.how.step1.body": "30 minutes. We listen and tell you what you need and what you don't.",
    "home.how.step2.title": "Plan",
    "home.how.step2.body": "Written, with scope, timeline and an itemised price, before you pay.",
    "home.how.step3.title": "Build",
    "home.how.step3.body": "In stages. We show you each one before moving on.",
    "home.how.step4.title": "Launch",
    "home.how.step4.body": "A standard website is ready in about {days} days.",

    // Sample calculation
    "home.roi.badge": "Sample calculation",
    "home.roi.title": "How many inquiries do slow replies cost you?",
    "home.roi.body": "This example assumes faster replies turn about {pct}% more inquiries into clients. It's an illustration, not a promise; we'll do a separate calculation for your business.",
    "home.roi.leads": "Inquiries per month",
    "home.roi.deal": "Average value per client",
    "home.roi.extra": "Extra clients per month",
    "home.roi.gain": "Sample extra value per month",
    "home.roi.cta": "Ask for a calculation for your business",

    // Proof
    "home.proof.title": "What you can check yourself",
    "home.proof.sub": "We don't ask you to take our word for it.",
    "home.proof.item1.title": "Every price is itemised",
    "home.proof.item1.body": "You see the amount on every line before you pay.",
    "home.proof.item2.title": "Working demos",
    "home.proof.item2.body": "Try the automations in your browser, no sign-up.",
    "home.proof.item3.title": "A written plan before we start",
    "home.proof.item3.body": "Scope, timeline and price, before the first payment.",
    "home.proof.item4.title": "No long-term contract for single services",
    "home.proof.item4.body": "Month to month, 30 days' notice.",

    // Pricing teaser
    "home.pricing.title": "Prices you see in full",
    "home.pricing.sub": "Every service has its own price. Bundles cost less than the same services bought separately, and the difference is spelled out.",
    "home.pricing.separately": "Separately",
    "home.pricing.inBundle": "In the bundle",
    "home.pricing.save": "You save",
    "home.pricing.minTerm": "The monthly part has a {months}-month minimum.",
    "home.pricing.choose": "Ask about this bundle",
    "home.pricing.cta": "See all prices and bundles",

    // Final CTA
    "cta.title": "Start from where you are",
    "cta.sub": "A 30-minute call, no commitment. We tell you what you need, what can wait and what it costs, in writing.",
    "cta.button": "Book a free call",
    "cta.secondary": "See services and pricing",

    // Footer
    "footer.description": "We build brands for Bulgarian businesses, from identity and website to ads, SEO and AI automation.",
    "footer.freeCall": "Free 30-minute call",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.office": "Office",
    "footer.city": "Varna, Bulgaria",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms of service",
    "footer.dataDeletion": "Data deletion",
  },
} as const;

export type TranslationKey = keyof typeof translations.bg;

/** Fills "{name}" placeholders in a translated template. Unknown keys are left as-is. */
export function interpolate(template: string, vars: Readonly<Record<string, string | number>>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

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

// Catalog part 1: brand, website, content. (Split to keep files small.)
import type { ServiceItem } from "./types";

export const createServices: readonly ServiceItem[] = [
  // ── Brand & identity ────────────────────────────────────────────────
  {
    id: "logo",
    category: "brand",
    name: { bg: "Лого", en: "Logo design" },
    summary: { bg: "Знак, по който ви разпознават — във всички нужни формати.", en: "A mark people recognize you by, in every format you need." },
    included: {
      bg: ["3 концепции", "2 кръга корекции", "Цветна, монохромна версия и иконка", "Файлове SVG, PNG и PDF"],
      en: ["3 concepts", "2 revision rounds", "Color, mono and icon versions", "SVG, PNG and PDF files"],
    },
    price: { oneTime: 290 },
    delivery: { min: 5, max: 7 },
  },
  {
    id: "brand-identity",
    category: "brand",
    name: { bg: "Бранд идентичност", en: "Brand identity" },
    summary: { bg: "Цялостен визуален облик — от логото до бранд бука.", en: "A complete visual identity, from logo to brand book." },
    included: {
      bg: ["Лого: 3 концепции, 2 кръга корекции", "Цветова палитра и шрифтова двойка", "Мини бранд бук (10–12 стр.)", "Визитка, аватари и корици за социалните мрежи", "3 шаблона за постове"],
      en: ["Logo: 3 concepts, 2 revision rounds", "Color palette and font pairing", "Mini brand book (10–12 pages)", "Business card, social avatars and covers", "3 post templates"],
    },
    price: { oneTime: 690 },
    delivery: { min: 10, max: 14 },
    supersedes: ["logo"],
  },
  {
    id: "naming",
    category: "brand",
    name: { bg: "Име и слоган", en: "Naming and tagline" },
    summary: { bg: "Име, което е свободно като домейн и профил, и слоган към него.", en: "A name that's free as a domain and handle, plus a tagline." },
    included: {
      bg: ["10 предложения за име", "Проверка на .bg/.com домейн и профили", "3 слогана", "Позициониране на една страница"],
      en: ["10 name options", ".bg/.com domain and handle check", "3 taglines", "One-page positioning"],
    },
    price: { oneTime: 190 },
    delivery: { min: 3, max: 5 },
  },
  {
    id: "print-kit",
    category: "brand",
    name: { bg: "Печатни материали", en: "Print kit" },
    summary: { bg: "Визитка, флаер или меню в стила на бранда, готови за печат.", en: "Business card, flyer or menu in your brand style, print-ready." },
    included: {
      bg: ["До 3 позиции", "1 кръг корекции", "Файлове за печат"],
      en: ["Up to 3 items", "1 revision round", "Print-ready files"],
    },
    price: { oneTime: 150 },
    delivery: { min: 3, max: 5 },
    note: { bg: "Самият печат не е включен.", en: "Printing itself is not included." },
  },

  // ── Website ─────────────────────────────────────────────────────────
  {
    id: "landing",
    category: "web",
    name: { bg: "Лендинг страница", en: "Landing page" },
    summary: { bg: "Една страница, която води към обаждане или запитване.", en: "One page that leads to a call or an inquiry." },
    included: {
      bg: ["До 7 секции, текстовете са включени", "Форма, карта, бутони за Viber и телефон", "SSL, GDPR и бисквитки", "Базово on-page SEO"],
      en: ["Up to 7 sections, copy included", "Form, map, Viber and phone buttons", "SSL, GDPR and cookies", "Basic on-page SEO"],
    },
    price: { oneTime: 390 },
    delivery: { min: 5, max: 7 },
    note: { bg: "Нужен е „Хостинг и поддръжка“.", en: "Requires Hosting & care." },
  },
  {
    id: "business-site",
    category: "web",
    name: { bg: "Бизнес сайт", en: "Business website" },
    summary: { bg: "Сайт по мярка, не от шаблон — бърз и лесен за редакция.", en: "A made-to-measure site, not a template — fast and easy to edit." },
    included: {
      bg: ["Индивидуален дизайн до 6 страници", "CMS или код", "Форма за запитване и карта", "Техническо SEO, GDPR", "30 мин. обучение"],
      en: ["Custom design, up to 6 pages", "CMS or code", "Inquiry form and map", "Technical SEO, GDPR", "30-min training"],
    },
    price: { oneTime: 690 },
    delivery: { min: 10, max: 14 },
    note: { bg: "Нужен е „Хостинг и поддръжка“.", en: "Requires Hosting & care." },
  },
  {
    id: "online-store",
    category: "web",
    name: { bg: "Онлайн магазин", en: "Online store" },
    summary: { bg: "Магазин с плащане с карта, наложен платеж и куриери.", en: "A store with card payments, cash on delivery and couriers." },
    included: {
      bg: ["До 50 въведени продукта", "Плащане с карта и наложен платеж", "Econt и Speedy", "Известия по имейл", "Шаблон за общи условия"],
      en: ["Up to 50 products entered", "Card payment and cash on delivery", "Econt and Speedy", "Email notifications", "Terms template"],
    },
    price: { oneTime: 1690, isFrom: true },
    delivery: { min: 20, max: 25 },
  },
  {
    id: "copywriting",
    category: "web",
    name: { bg: "Текстове за сайта", en: "Website copywriting" },
    summary: { bg: "Текстове, които звучат като вас и водят към запитване.", en: "Copy that sounds like you and leads to an inquiry." },
    included: {
      bg: ["До 6 страници", "45-мин. интервю", "Ключови думи за Google", "1 кръг корекции"],
      en: ["Up to 6 pages", "45-min interview", "Google keywords", "1 revision round"],
    },
    price: { oneTime: 190 },
    delivery: { min: 3, max: 5 },
  },
  {
    id: "extra-page",
    category: "web",
    name: { bg: "Допълнителна страница", en: "Extra page" },
    summary: { bg: "Нова страница в стила на сайта.", en: "A new page in your site's style." },
    included: { bg: ["Дизайн и изграждане", "Базово SEO"], en: ["Design and build", "Basic SEO"] },
    price: { oneTime: 90 },
    delivery: { min: 1, max: 2 },
    requiresAnyOf: ["landing", "business-site"],
  },
  {
    id: "second-language",
    category: "web",
    name: { bg: "Втори език", en: "Second language" },
    summary: { bg: "Превод и езикова версия на сайта.", en: "Translation and a second language version of the site." },
    included: { bg: ["Превод на до 6 страници", "Превключвател на езика", "hreflang за Google"], en: ["Translation of up to 6 pages", "Language switcher", "hreflang for Google"] },
    price: { oneTime: 290 },
    delivery: { min: 3, max: 5 },
    requiresAnyOf: ["landing", "business-site"],
  },

  // ── Content & social ────────────────────────────────────────────────
  {
    id: "photo-session",
    category: "content",
    name: { bg: "Фотосесия", en: "Brand photo session" },
    summary: { bg: "Снимки на продукти, екип и обект — за сайта и профилите.", en: "Photos of products, team and venue for your site and profiles." },
    included: {
      bg: ["До 3 часа на място", "30 обработени снимки", "Права за онлайн ползване"],
      en: ["Up to 3 hours on site", "30 edited photos", "Online usage rights"],
    },
    price: { oneTime: 290 },
    delivery: { min: 5, max: 7 },
  },
  {
    id: "reels-pack",
    category: "content",
    name: { bg: "Видео пакет", en: "Reels pack" },
    summary: { bg: "Кратки видеа за Instagram, Facebook и TikTok.", en: "Short videos for Instagram, Facebook and TikTok." },
    included: {
      bg: ["4 видеа по 15–30 сек.", "Сценарии", "1 снимачна сесия и монтаж", "Субтитри и музика"],
      en: ["4 videos, 15–30 sec each", "Scripts", "1 shoot and editing", "Subtitles and music"],
    },
    price: { oneTime: 290 },
    delivery: { min: 7, max: 10 },
  },
  {
    id: "social-setup",
    category: "content",
    name: { bg: "Старт на социалните профили", en: "Social setup" },
    summary: { bg: "Профили във Facebook и Instagram, подредени в стила на бранда.", en: "Facebook and Instagram profiles set up in your brand style." },
    included: {
      bg: ["Facebook и Instagram (TikTok по желание)", "Био, корици и highlights", "6 стартови поста", "Свързване с Business Suite"],
      en: ["Facebook and Instagram (TikTok optional)", "Bio, covers and highlights", "6 launch posts", "Business Suite connection"],
    },
    price: { oneTime: 190 },
    delivery: { min: 3, max: 5 },
  },
  {
    id: "social-lite",
    category: "content",
    name: { bg: "Социални мрежи Лайт", en: "Social Lite" },
    summary: { bg: "Редовни публикации, без да мислите за тях.", en: "Regular posts without you having to think about them." },
    included: {
      bg: ["8 поста на месец във Facebook и Instagram", "Календар за одобрение", "Дизайн и текстове", "Кратък месечен отчет"],
      en: ["8 posts a month on Facebook and Instagram", "Approval calendar", "Design and copy", "Short monthly report"],
    },
    price: { monthly: 190 },
    delivery: null,
  },
  {
    id: "social-standard",
    category: "content",
    name: { bg: "Социални мрежи Стандарт", en: "Social Standard" },
    summary: { bg: "Активно присъствие с видео, stories и отговори на коментари.", en: "An active presence with video, stories and comment replies." },
    included: {
      bg: ["12 поста и 2 Reels на месец", "Stories два пъти седмично", "Отговори на коментари в работно време", "Отчет и 30-мин. среща"],
      en: ["12 posts and 2 Reels a month", "Stories twice a week", "Comment replies in business hours", "Report and 30-min call"],
    },
    price: { monthly: 340 },
    delivery: null,
  },
];

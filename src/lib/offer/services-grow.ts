// Catalog part 2: ads, SEO, AI & automation, care.
import type { ServiceItem } from "./types";

export const growServices: readonly ServiceItem[] = [
  // ── Ads ─────────────────────────────────────────────────────────────
  {
    id: "meta-ads-setup",
    category: "ads",
    name: { bg: "Настройка на Meta реклама", en: "Meta ads setup" },
    summary: { bg: "Реклама във Facebook и Instagram с правилно проследяване.", en: "Facebook and Instagram ads with proper tracking." },
    included: {
      bg: ["Business Manager, Pixel и Conversions API", "Аудитории", "2 кампании с 4 креатива", "UTM и проследяване"],
      en: ["Business Manager, Pixel and Conversions API", "Audiences", "2 campaigns with 4 creatives", "UTM and tracking"],
    },
    price: { oneTime: 190 },
    delivery: { min: 3, max: 5 },
  },
  {
    id: "google-ads-setup",
    category: "ads",
    name: { bg: "Настройка на Google Ads", en: "Google Ads setup" },
    summary: { bg: "Търсеща кампания, която се показва, когато ви търсят.", en: "A search campaign that shows up when people look for you." },
    included: {
      bg: ["Акаунт и конверсии в GA4", "Search кампания", "Ключови и негативни думи", "6 реклами и разширения"],
      en: ["Account and GA4 conversions", "Search campaign", "Keywords and negatives", "6 ads and extensions"],
    },
    price: { oneTime: 190 },
    delivery: { min: 3, max: 5 },
  },
  {
    id: "ads-management",
    category: "ads",
    name: { bg: "Управление на реклами", en: "Ads management" },
    summary: { bg: "Седмична оптимизация и отчет с цената на всяко запитване.", en: "Weekly optimization and a report with the cost of each inquiry." },
    included: {
      bg: ["1 платформа (Meta или Google), бюджет до 1 500 €/мес.", "Седмична оптимизация", "2 нови креатива на месец", "Месечен отчет: цена на запитване"],
      en: ["1 platform (Meta or Google), spend up to €1,500/mo", "Weekly optimization", "2 new creatives a month", "Monthly report: cost per inquiry"],
    },
    price: { monthly: 190 },
    delivery: null,
    note: { bg: "Рекламният бюджет се плаща директно на Meta/Google. Над 1 500 € бюджет: +10 %.", en: "Ad spend is paid directly to Meta/Google. Above €1,500 spend: +10%." },
  },

  // ── SEO ─────────────────────────────────────────────────────────────
  {
    id: "seo-start",
    category: "seo",
    name: { bg: "SEO Старт", en: "SEO Start" },
    summary: { bg: "Основите, за да ви намират в Google, картите и AI търсачките.", en: "The basics to be found on Google, Maps and AI search." },
    included: {
      bg: ["Технически одит до 20 страници", "Google бизнес профил", "Schema за AI търсачки", "Карта на ключовите думи", "10 локални регистрации"],
      en: ["Technical audit up to 20 pages", "Google Business Profile", "Schema for AI search", "Keyword map", "10 local citations"],
    },
    price: { oneTime: 190 },
    delivery: { min: 5, max: 7 },
  },
  {
    id: "seo-local",
    category: "seo",
    name: { bg: "SEO Local", en: "SEO Local" },
    summary: { bg: "Поддържа ви видими в локалното търсене.", en: "Keeps you visible in local search." },
    included: {
      bg: ["Поддръжка на Google бизнес профил", "Цитирания", "On-page оптимизация", "Месечен отчет"],
      en: ["Google Business Profile upkeep", "Citations", "On-page optimization", "Monthly report"],
    },
    price: { monthly: 80 },
    delivery: null,
  },
  {
    id: "seo-growth",
    category: "seo",
    name: { bg: "SEO Growth", en: "SEO Growth" },
    summary: { bg: "Съдържание и структура, които носят повече търсения.", en: "Content and structure that bring more searches." },
    included: {
      bg: ["Всичко от SEO Local", "1–2 материала на месец", "Тематични клъстери и вътрешни връзки", "Search Console"],
      en: ["Everything in SEO Local", "1–2 articles a month", "Topic clusters and internal links", "Search Console"],
    },
    price: { monthly: 120 },
    delivery: null,
    supersedes: ["seo-local"],
  },
  {
    id: "seo-aggressive",
    category: "seo",
    name: { bg: "SEO Aggressive", en: "SEO Aggressive" },
    summary: { bg: "За конкурентни ниши: връзки, повече съдържание, анализ на конкурентите.", en: "For competitive niches: links, more content, competitor analysis." },
    included: {
      bg: ["Всичко от SEO Growth", "Линк билдинг", "Проследяване на AI цитирания", "Анализ на конкурентите"],
      en: ["Everything in SEO Growth", "Link building", "AI citation tracking", "Competitor analysis"],
    },
    price: { monthly: 170 },
    delivery: null,
    supersedes: ["seo-local", "seo-growth"],
  },

  // ── AI & automation ─────────────────────────────────────────────────
  {
    id: "ai-assistant",
    category: "ai",
    name: { bg: "AI чат асистент", en: "AI chat assistant" },
    summary: { bg: "Отговаря денонощно с вашите цени и правила и предава на човек.", en: "Replies around the clock with your prices and rules, hands off to a human." },
    included: {
      bg: ["Обучен на до 50 услуги или продукта", "Сайт + 1 канал (Viber или Messenger)", "Запитванията идват по имейл или Viber", "Предаване към човек", "Месечна проверка на точността, до 1 000 разговора"],
      en: ["Trained on up to 50 services or products", "Website + 1 channel (Viber or Messenger)", "Inquiries arrive by email or Viber", "Human handoff", "Monthly accuracy check, up to 1,000 chats"],
    },
    price: { oneTime: 390, monthly: 119 },
    delivery: { min: 7, max: 10 },
  },
  {
    id: "booking-crm",
    category: "ai",
    name: { bg: "Записване на часове + CRM", en: "Booking and CRM" },
    summary: { bg: "Часове в календара, напомняния и клиентска база с история.", en: "Calendar bookings, reminders and a client base with history." },
    included: {
      bg: ["Синхрон с Google Calendar", "Напомняния към клиента", "Клиентска база с история", "Табло със заявките"],
      en: ["Google Calendar sync", "Client reminders", "Client base with history", "Requests dashboard"],
    },
    price: { oneTime: 190, monthly: 59 },
    delivery: { min: 3, max: 5 },
    requiresAnyOf: ["ai-assistant", "business-site", "landing"],
  },
  {
    id: "extra-channel",
    category: "ai",
    name: { bg: "Допълнителен канал", en: "Extra channel" },
    summary: { bg: "Същият асистент и в Messenger, Instagram, Viber или WhatsApp.", en: "The same assistant on Messenger, Instagram, Viber or WhatsApp." },
    included: { bg: ["Същото обучение", "Свързване и тест"], en: ["Same training", "Connection and testing"] },
    price: { oneTime: 90, monthly: 19 },
    delivery: { min: 2, max: 3 },
    requiresAnyOf: ["ai-assistant"],
  },
  {
    id: "workflow-automation",
    category: "ai",
    name: { bg: "Автоматизация на процес", en: "Workflow automation" },
    summary: { bg: "Една рутинна задача, която спира да ви отнема време.", en: "One routine task that stops eating your time." },
    included: {
      bg: ["1 процес (фактури, имейли, синхрон между системи)", "Карта на процеса преди старт", "Хостинг и мониторинг", "Поправки при промени в API"],
      en: ["1 workflow (invoices, emails, system sync)", "Process map before start", "Hosting and monitoring", "Fixes when APIs change"],
    },
    price: { oneTime: 290, monthly: 29 },
    delivery: { min: 5, max: 7 },
  },

  // ── Care ────────────────────────────────────────────────────────────
  {
    id: "care",
    category: "care",
    name: { bg: "Хостинг и поддръжка", en: "Hosting and care" },
    summary: { bg: "Сайтът работи, обновен е и има резервни копия.", en: "Your site runs, stays updated and is backed up." },
    included: {
      bg: ["Хостинг и SSL", "Ежедневни резервни копия", "Обновления и мониторинг", "До 1 ч. дребни промени на месец", "Поддръжка по имейл"],
      en: ["Hosting and SSL", "Daily backups", "Updates and monitoring", "Up to 1 hr of small edits a month", "Email support"],
    },
    price: { monthly: 49 },
    delivery: null,
  },
  {
    id: "care-plus",
    category: "care",
    name: { bg: "Поддръжка Плюс", en: "Care Plus" },
    summary: { bg: "Повече промени и по-бърз отговор, с месечен отчет.", en: "More edits and faster replies, with a monthly report." },
    included: {
      bg: ["Всичко от „Хостинг и поддръжка“", "До 3 ч. промени на месец", "Отговор до 4 работни часа, Viber линия", "Месечен отчет за скорост и трафик"],
      en: ["Everything in Hosting and care", "Up to 3 hrs of edits a month", "Reply within 4 business hours, Viber line", "Monthly speed and traffic report"],
    },
    price: { monthly: 99 },
    delivery: null,
    supersedes: ["care"],
  },
  {
    id: "hourly",
    category: "care",
    name: { bg: "Почасова работа", en: "Hourly work" },
    summary: { bg: "Работа извън обхвата на услуга или пакет.", en: "Work outside the scope of a service or bundle." },
    included: { bg: ["Отчет по часове"], en: ["Hour-by-hour report"] },
    price: { oneTime: 45, unit: "hour" },
    delivery: null,
  },
];

// Page-only copy for the six service disciplines. Names and prices come
// from the offer catalog; this file holds only the promise and the
// before → after framing for each block.
import { Bot, Camera, Code, Megaphone, PenTool, Search, type LucideIcon } from "lucide-react";
import type { L10n, ServiceCategoryId } from "@/lib/offer";

export type DisciplineId = Exclude<ServiceCategoryId, "care">;

export interface DisciplineCopy {
  readonly id: DisciplineId;
  readonly icon: LucideIcon;
  readonly promise: L10n;
  readonly before: L10n;
  readonly after: L10n;
}

export const disciplines: readonly DisciplineCopy[] = [
  {
    id: "brand",
    icon: PenTool,
    promise: {
      bg: "Една визия, която стои еднакво на сайта, в профилите и на витрината.",
      en: "One look that holds together on your site, your profiles and your storefront.",
    },
    before: { bg: "Лого от шаблон", en: "A template logo" },
    after: { bg: "Визия, която ви разпознава", en: "A look people recognize" },
  },
  {
    id: "web",
    icon: Code,
    promise: {
      bg: "Сайт по мярка, който обяснява какво правите и води към запитване.",
      en: "A made-to-measure site that explains what you do and leads to an inquiry.",
    },
    before: { bg: "Сайт, който никой не посещава", en: "A site nobody visits" },
    after: { bg: "Сайт, който води към запитване", en: "A site that leads to inquiries" },
  },
  {
    id: "content",
    icon: Camera,
    promise: {
      bg: "Снимки, видео и публикации, подготвени предварително и одобрени от вас.",
      en: "Photos, video and posts prepared ahead and approved by you.",
    },
    before: { bg: "Празни профили", en: "Empty profiles" },
    after: { bg: "Материали за месеци напред", en: "Content for months ahead" },
  },
  {
    id: "ads",
    icon: Megaphone,
    promise: {
      bg: "Реклама в Meta и Google с проследяване и месечен отчет за цената на запитване.",
      en: "Meta and Google ads with tracking and a monthly cost-per-inquiry report.",
    },
    before: { bg: "Бюджет без отчет", en: "Spend without a report" },
    after: { bg: "Известна цена на запитване", en: "A known cost per inquiry" },
  },
  {
    id: "seo",
    icon: Search,
    promise: {
      bg: "Основите, за да ви намират в Google, картите и AI търсачките, и поддръжка след това.",
      en: "The groundwork to be found on Google, Maps and AI search, and upkeep after that.",
    },
    before: { bg: "Невидим в търсенето", en: "Invisible in search" },
    after: { bg: "Намерен в Google и AI търсачките", en: "Found on Google and AI search" },
  },
  {
    id: "ai",
    icon: Bot,
    promise: {
      bg: "Асистент, който отговаря с вашите цени и правила и предава на човек, когато трябва.",
      en: "An assistant that answers with your prices and rules, and hands off to a person when needed.",
    },
    before: { bg: "Отговор след часове", en: "Replies hours later" },
    after: { bg: "Отговор за секунди", en: "Replies in seconds" },
  },
];

// Pricing FAQ — single source of truth so the FAQPage JSON-LD
// (src/app/pricing/page.tsx) always matches what's rendered on the page
// (src/app/pricing/_components/PricingFaq.tsx).
// Prices and savings are never written here: they live in "@/lib/offer".

export type FaqItem = { q: string; a: string };

export const pricingFaqsBg: FaqItem[] = [
  {
    q: "Защо пакетите излизат по-евтино от същите услуги поотделно?",
    a: "Когато правим няколко неща наведнъж, работим по-бързо: един бриф, едни и същи снимки и текстове за сайта, профилите и рекламата, една среща за одобрение. Част от спестеното време връщаме в цената. На всяка карта е изписано колко струват услугите поотделно и колко е разликата.",
  },
  {
    q: "Защо месечната част на пакета е с минимум 6 месеца?",
    a: "Отстъпката на пакета се покрива от месечните услуги — поддръжка, SEO, социални мрежи. Те дават резултат след няколко месеца, затова цената на пакета важи при минимум 6 месеца за месечната част. След това продължавате месец за месец с 30 дни предизвестие.",
  },
  {
    q: "Мога ли да сменя услуга в пакета?",
    a: "Да. Една услуга в пакета може да се замени с друга на същата или по-ниска цена. Ако искате нещо по-скъпо, ще ви кажем разликата преди старта.",
  },
  {
    q: "Цените с ДДС ли са?",
    a: "Не. Всички цени на страницата са без ДДС. Във фактурата ДДС се начислява отделно.",
  },
  {
    q: "Има ли договор за единичните услуги?",
    a: "Няма минимален срок. Еднократните услуги плащате за конкретната работа, а месечните спират с 30 дни предизвестие.",
  },
  {
    q: "Има ли отстъпка при годишно плащане?",
    a: "Да — при годишно предплащане на месечна единична услуга цената е с 10 % по-ниска. Тази отстъпка не се натрупва с отстъпката на пакет.",
  },
  {
    q: "Купих отделна услуга, а сега искам пакет. Какво става?",
    a: "Ако сте я купили през последните 60 дни, платеното се приспада от цената на пакета.",
  },
  {
    q: "Какво не е включено в цените?",
    a: "Рекламният бюджет (плаща се директно на Meta или Google), печатът, домейнът и таксите за SMS. Ако някое от тях ви трябва, ще го видите като отделен ред, преди да започнем.",
  },
];

export const pricingFaqsEn: FaqItem[] = [
  {
    q: "Why are bundles cheaper than the same services bought separately?",
    a: "When we do several things at once, we work faster: one brief, the same photos and copy for the site, the profiles and the ads, one approval meeting. We pass part of the saved time back in the price. Every card shows what the services cost separately and how big the difference is.",
  },
  {
    q: "Why does the monthly part of a bundle have a 6-month minimum?",
    a: "The bundle discount is carried by the monthly services — care, SEO, social media. They show results after a few months, so bundle pricing requires at least 6 months on the monthly part. After that you continue month to month with 30 days' notice.",
  },
  {
    q: "Can I swap a service in a bundle?",
    a: "Yes. One service in a bundle can be swapped for another of equal or lower price. If you want something more expensive, we'll tell you the difference before we start.",
  },
  {
    q: "Do prices include VAT?",
    a: "No. All prices on this page exclude VAT. VAT is added separately on the invoice.",
  },
  {
    q: "Is there a contract for single services?",
    a: "There's no minimum term. You pay one-time services for the specific work, and monthly services stop with 30 days' notice.",
  },
  {
    q: "Is there a discount for paying annually?",
    a: "Yes — prepaying a monthly single service for a year makes it 10% cheaper. This discount does not stack with a bundle discount.",
  },
  {
    q: "I bought a single service and now want a bundle. What happens?",
    a: "If you bought it in the last 60 days, what you paid is deducted from the bundle price.",
  },
  {
    q: "What isn't included in the prices?",
    a: "Ad spend (paid directly to Meta or Google), printing, the domain and SMS fees. If you need any of these, you'll see them as a separate line before we start.",
  },
];

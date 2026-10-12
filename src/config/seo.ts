/**
 * SEO configuration for SilexBrand — brand building for Bulgarian businesses.
 * Prices in descriptions and structured data are derived from "@/lib/offer";
 * never type an amount here.
 */
import { bundles, formatEur, priceRange, services } from "@/lib/offer";

const bg = (amount: number): string => formatEur(amount, "bg");

export const siteConfig = {
  name: "SilexBrand",
  title: "SilexBrand — изграждане на бранд от нулата, Варна",
  description:
    "Идентичност, уебсайт, съдържание, реклама, SEO и AI автоматизация от един екип. Купувате пакет или една услуга. Безплатна среща за български фирми.",
  url: "https://silexbrand.com",
  domain: "silexbrand.com",
  locale: "bg_BG",
  defaultImage: "/images/og-default.jpg",

  keywords: [
    // BG primary — brand building
    "изграждане на бранд",
    "брандинг за малък бизнес",
    "уебсайт и лого",
    "дигитална агенция Варна",
    "SEO и реклама за малък бизнес",
    "пакет за онлайн присъствие",
    "изработка на лого",
    "изработка на уебсайт Варна",
    "бранд идентичност",
    "реклама във Facebook и Google за малък бизнес",
    "локално SEO Варна",
    // BG secondary — automation
    "AI асистент за бизнес",
    "Viber бот за бизнес",
    "автоматизация на бизнеса",
    // EN secondary
    "brand building Bulgaria",
    "branding agency Varna",
    "website and logo Bulgaria",
    "small business SEO Bulgaria",
    "AI assistant for business Bulgaria",
  ],

  social: {
    facebook: "https://facebook.com/silexbrand",
    linkedin: "https://linkedin.com/company/silexbrand",
    instagram: "https://instagram.com/silexbrand",
  },

  contact: {
    email: "info@silexbrand.com",
    phone: "+359885031865",
    address: {
      addressLocality: "Варна",
      addressCountry: "BG",
    },
  },

  // Varna city-center coordinates — used for LocalBusiness geo until a
  // precise office address is confirmed and added to `address` above.
  geo: {
    latitude: "43.2141",
    longitude: "27.9147",
  },

  business: {
    name: "SilexBrand",
    legalName: "SilexBrand EOOD",
    foundingDate: "2024",
    priceRange: `${bg(priceRange.low)}–${bg(priceRange.high)}`,
  },

  openGraph: {
    type: "website",
    siteName: "SilexBrand",
    locale: "bg_BG",
    alternateLocale: ["en_US"],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@silexbrand",
    site: "@silexbrand",
  },
};

// Only pages that still read their metadata from here. Pricing and services
// pages own their metadata (written from "@/lib/offer" next to the page).
export const pageSeo = {
  home: {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [
      "изграждане на бранд",
      "брандинг за малък бизнес",
      "уебсайт и лого",
      "дигитална агенция Варна",
      "SEO и реклама за малък бизнес",
      "пакет за онлайн присъствие",
      "AI асистент за бизнес",
      "brand building Bulgaria",
    ],
  },
  contact: {
    title: "Безплатна 30-минутна среща",
    description:
      "Заявете безплатна 30-минутна среща със SilexBrand. Казваме ви какво ви трябва, какво може да почака и колко струва — писмено. Отговаряме до 24 часа.",
    keywords: [
      "безплатна консултация брандинг",
      "среща дигитална агенция Варна",
      "SilexBrand контакти",
      "изграждане на бранд консултация",
      "free consultation branding Bulgaria",
    ],
  },
  demos: {
    title: "Демота | AI асистент и автоматизация на живо",
    description:
      "Пробвайте AI асистента и автоматизациите директно в браузъра, без регистрация. Данните в демотата са примерни.",
    keywords: [
      "демо AI асистент",
      "демо автоматизация бизнес",
      "интерактивно демо чатбот",
      "Viber бот демо",
      "AI chatbot demo Bulgaria",
    ],
  },
  privacy: {
    title: "Политика за поверителност",
    description:
      "Как SilexBrand събира, използва и защитава личните ви данни — заявки за среща, аналитика на сайта и правата ви по GDPR.",
    keywords: ["политика за поверителност", "GDPR SilexBrand", "лични данни"],
  },
  terms: {
    title: "Общи условия",
    description:
      "Общи условия за услугите на SilexBrand — бранд, уебсайтове, реклама, SEO и AI асистенти: плащане, срокове, анулиране и отговорности.",
    keywords: ["общи условия", "договор дигитална агенция", "условия SilexBrand"],
  },
  dataDeletion: {
    title: "Инструкции за изтриване на данни",
    description:
      "Как да поискате изтриване на съобщенията си, ако сте писали на бизнес, използващ AI асистента на SilexBrand във Viber, Messenger или WhatsApp.",
    keywords: ["изтриване на данни", "data deletion Meta", "GDPR право на изтриване"],
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.business.name,
  legalName: siteConfig.business.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo-new.png`,
  foundingDate: siteConfig.business.foundingDate,
  description: siteConfig.description,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactType: "sales",
    availableLanguage: ["Bulgarian", "English"],
  },
  address: {
    "@type": "PostalAddress",
    ...siteConfig.contact.address,
  },
  // `sameAs` intentionally omitted: siteConfig.social.* are placeholder handles
  // with no confirmed live profile behind them. Re-add once the real profiles
  // exist and are linked from the footer.
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.business.name,
  image: `${siteConfig.url}/logo-new.png`,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    ...siteConfig.contact.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: siteConfig.business.priceRange,
  // No aggregateRating / review: there are no verifiable public reviews yet.
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: ["bg", "en"],
  // No SearchAction: the site has no /search route.
};

/** Whole catalog (single services + bundles) as one AggregateOffer. EUR, excl. VAT. */
export const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Изграждане на бранд — идентичност, уебсайт, съдържание, реклама, SEO и AI автоматизация",
  serviceType: "Brand building",
  description: siteConfig.description,
  url: `${siteConfig.url}/pricing`,
  areaServed: { "@type": "Country", name: "Bulgaria" },
  provider: {
    "@type": "LocalBusiness",
    name: siteConfig.business.name,
    url: siteConfig.url,
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: String(priceRange.low),
    highPrice: String(priceRange.high),
    priceCurrency: "EUR",
    offerCount: String(bundles.length + services.length),
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    },
  },
};

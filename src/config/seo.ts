/**
 * SEO Configuration for Silex Digital
 * Automation Platform — Bulgarian Market
 */

export const siteConfig = {
  name: "Silex Digital",
  title: "Silex Digital | Автоматизация на бизнеса в България",
  description:
    "Модерна платформа за автоматизация, която генерира клиенти за българския бизнес. Три слоя: Автоматизация, CMS, Код. Отговаряйте моментално, улавяйте всеки лийд.",
  url: "https://silex-digital.com",
  domain: "silex-digital.com",
  locale: "bg_BG",
  defaultImage: "/images/og-default.jpg",

  keywords: [
    "автоматизация на бизнеса",
    "генериране на клиенти",
    "бизнес автоматизация България",
    "автоматичен отговор",
    "CRM система България",
    "онлайн резервация",
    "чат бот за бизнес",
    "уеб сайт за малкия бизнес",
    "модерен уеб сайт България",
    "бизнес софтуер България",
    "дигитален маркетинг",
    "лийд генериране",
    "business automation Bulgaria",
    "automated client capture",
  ],

  social: {
    facebook: "https://facebook.com/silexdigital",
    linkedin: "https://linkedin.com/company/silexdigital",
    instagram: "https://instagram.com/silexdigital",
  },

  contact: {
    email: "info@silex-digital.com",
    phone: "+359 888 123 456",
    address: {
      streetAddress: "ул. Витоша 100",
      addressLocality: "София",
      postalCode: "1000",
      addressCountry: "BG",
    },
  },

  business: {
    name: "Silex Digital",
    legalName: "Silex Digital EOOD",
    foundingDate: "2024",
    priceRange: "$$",
  },

  openGraph: {
    type: "website",
    siteName: "Silex Digital",
    locale: "bg_BG",
    alternateLocale: ["en_US"],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@silexdigital",
    site: "@silexdigital",
  },
};

export const pageSeo = {
  home: {
    title: "Автоматизация на бизнеса | Silex Digital",
    description:
      "Платформа за автоматизация, която превръща всеки контакт в клиент. Три слоя: Автоматизация, CMS, Код.",
    keywords: [
      "автоматизация на бизнеса",
      "генериране на клиенти",
      "бизнес автоматизация България",
    ],
  },
  pricing: {
    title: "Цени | Автоматизация за бизнеса | Silex Digital",
    description:
      "Прозрачни цени за автоматизация, CMS платформа и персонализирани решения. От 99 €/месец.",
    keywords: ["цени автоматизация", "цена CRM система", "бизнес софтуер цена"],
  },
  blog: {
    title: "Блог | Автоматизация и Растеж | Silex Digital",
    description:
      "Статии за бизнес автоматизация, генериране на клиенти и дигитален маркетинг за българския бизнес.",
    keywords: ["блог автоматизация", "бизнес растеж", "дигитален маркетинг"],
  },
  contact: {
    title: "Контакти | Свържете се | Silex Digital",
    description:
      "Свържете се с Silex Digital за автоматизация на бизнеса. Безплатна консултация и 14-дневен пробен период.",
    keywords: ["контакти Silex Digital", "безплатна консултация", "автоматизация"],
  },
  services: {
    title: "Услуги | Автоматизация и Уеб Разработка | Silex Digital",
    description: "Комплексни решения за автоматизация, модерни уеб сайтове и персонализирани платформи за българския бизнес.",
    keywords: ["услуги автоматизация", "уеб разработка България", "бизнес решения"],
  },
  demos: {
    title: "Демо | Вижте платформата в действие | Silex Digital",
    description: "Интерактивни демонстрации на автоматизацията, CMS платформата и кодовата платформа.",
    keywords: ["демо автоматизация", "демо CMS", "демо платформа"],
  },
  industries: {
    title: "Индустрии | Решения по сектори | Silex Digital",
    description: "Автоматизация за ресторанти, е-търговия, здравеопазване, недвижими имоти и други индустрии.",
    keywords: ["индустрии автоматизация", "сектори бизнес решения"],
  },
  portfolio: {
    title: "Портфолио | Наши проекти | Silex Digital",
    description: "Разгледайте реализирани проекти за автоматизация, уеб сайтове и платформи за български бизнеси.",
    keywords: ["портфолио проекти", "реализирани проекти", "примери автоматизация"],
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.business.name,
  legalName: siteConfig.business.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
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
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.business.name,
  image: `${siteConfig.url}/logo.png`,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    ...siteConfig.contact.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "42.6977",
    longitude: "23.3219",
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
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: ["bg", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Silex Digital Automation Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "99",
    highPrice: "799",
    priceCurrency: "EUR",
    offerCount: "3",
  },
  description: siteConfig.description,
  url: siteConfig.url,
};

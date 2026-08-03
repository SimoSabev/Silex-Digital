import { siteConfig } from '@/config/seo';

/**
 * Generate JSON-LD structured data for the organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.business.name,
    legalName: siteConfig.business.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-new.png`,
    foundingDate: siteConfig.business.foundingDate,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'sales',
      availableLanguage: ['Bulgarian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.contact.address,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
    ],
  };
}

/**
 * Generate JSON-LD structured data for local business
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.business.name,
    image: `${siteConfig.url}/logo-new.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.contact.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: siteConfig.business.priceRange,
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD structured data for blog post (Article)
 */
export interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category?: string;
}

export function generateArticleSchema(options: ArticleSchemaOptions) {
  const {
    title,
    description,
    url,
    image = siteConfig.defaultImage,
    publishedAt,
    updatedAt,
    author,
    category,
  } = options;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [imageUrl],
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo-new.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(category && { articleSection: category }),
  };
}

/**
 * Generate JSON-LD structured data for breadcrumb list
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for service
 */
export interface ServiceSchemaOptions {
  name: string;
  description: string;
  url: string;
  price?: string;
  currency?: string;
  image?: string;
}

export function generateServiceSchema(options: ServiceSchemaOptions) {
  const {
    name,
    description,
    url,
    price,
    currency = 'EUR',
    image = siteConfig.defaultImage,
  } = options;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: imageUrl,
  };

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    };
  }

  return schema;
}

/**
 * Generate JSON-LD structured data for offer/pricing
 */
export interface OfferSchemaOptions {
  name: string;
  description: string;
  price: string;
  currency?: string;
  url: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export function generateOfferSchema(options: OfferSchemaOptions) {
  const {
    name,
    description,
    price,
    currency = 'EUR',
    url,
    availability = 'InStock',
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name,
    description,
    price,
    priceCurrency: currency,
    url,
    availability: `https://schema.org/${availability}`,
    seller: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for creative work (portfolio items)
 */
export interface CreativeWorkSchemaOptions {
  name: string;
  description: string;
  url: string;
  image?: string;
  creator?: string;
  dateCreated?: string;
}

export function generateCreativeWorkSchema(options: CreativeWorkSchemaOptions) {
  const {
    name,
    description,
    url,
    image = siteConfig.defaultImage,
    creator,
    dateCreated,
  } = options;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    image: imageUrl,
  };

  if (creator) {
    schema.creator = {
      '@type': 'Organization',
      name: creator,
    };
  }

  if (dateCreated) {
    schema.dateCreated = dateCreated;
  }

  return schema;
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for person (author)
 */
export function generatePersonSchema(name: string, url?: string, image?: string) {
  const personSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
  };

  if (url) {
    personSchema.url = url;
  }

  if (image) {
    personSchema.image = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
  }

  return personSchema;
}

/**
 * Render JSON-LD script tag as a string
 */
export function renderJsonLd(data: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

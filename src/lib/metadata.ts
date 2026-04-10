import type { Metadata } from 'next';
import { siteConfig, pageSeo } from '@/config/seo';
import { getCanonicalUrl } from './canonical';

/**
 * Generate page metadata with defaults
 */
export interface PageMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export function generatePageMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title = siteConfig.title,
    description = siteConfig.description,
    keywords = siteConfig.keywords,
    image = siteConfig.defaultImage,
    path,
    noIndex = false,
    noFollow = false,
  } = options;

  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.openGraph.locale,
      alternateLocale: siteConfig.openGraph.alternateLocale,
      url: canonicalUrl,
      siteName: siteConfig.openGraph.siteName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitter.card as 'summary_large_image' | 'summary',
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
  };
}

/**
 * Generate OpenGraph metadata for specific content types
 */
export interface OpenGraphOptions {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile';
  url?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function generateOpenGraph(options: OpenGraphOptions): Metadata['openGraph'] {
  const {
    title,
    description,
    type = 'website',
    url,
    image = siteConfig.defaultImage,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = options;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const baseOg = {
    type,
    title,
    description,
    url: url ?? getCanonicalUrl(),
    siteName: siteConfig.openGraph.siteName,
    locale: siteConfig.openGraph.locale,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  // Article-specific properties
  if (type === 'article') {
    return {
      ...baseOg,
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    } as Metadata['openGraph'];
  }

  return baseOg as Metadata['openGraph'];
}

/**
 * Generate Twitter card metadata
 */
export interface TwitterCardOptions {
  title: string;
  description: string;
  image?: string;
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export function generateTwitterCard(options: TwitterCardOptions): Metadata['twitter'] {
  const {
    title,
    description,
    image = siteConfig.defaultImage,
    card = 'summary_large_image',
  } = options;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    card: card as 'summary_large_image' | 'summary',
    title,
    description,
    images: [imageUrl],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  };
}

/**
 * Generate metadata for blog posts
 */
export interface BlogPostMetadataOptions {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category?: string;
  tags?: string[];
}

export function generateBlogPostMetadata(options: BlogPostMetadataOptions): Metadata {
  const {
    title,
    description,
    slug,
    image = siteConfig.defaultImage,
    publishedAt,
    updatedAt,
    author,
    category,
    tags,
  } = options;

  const path = `/blog/${slug}`;
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title,
    description,
    authors: [{ name: author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: siteConfig.openGraph.locale,
      url: canonicalUrl,
      siteName: siteConfig.openGraph.siteName,
      title,
      description,
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      authors: [author],
      section: category,
      tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
  };
}

/**
 * Generate metadata for product/service pages
 */
export interface ProductMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export function generateProductMetadata(options: ProductMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    image = siteConfig.defaultImage,
    price,
    currency = 'EUR',
    availability = 'InStock',
  } = options;

  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: siteConfig.openGraph.siteName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    ...(price && {
      other: {
        'product:price:amount': price,
        'product:price:currency': currency,
        'product:availability': availability,
      },
    }),
  };
}

/**
 * Get page-specific SEO configuration
 */
export function getPageSeo(pageKey: keyof typeof pageSeo) {
  return pageSeo[pageKey] || {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
  };
}

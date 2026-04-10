# SEO Implementation for Silex-Digital

This document describes the comprehensive SEO optimization implemented for the Silex-Digital website.

## Overview

The SEO implementation includes:
- SEO configuration file with site-wide metadata
- Sitemap generator for all pages
- robots.txt for crawler control
- Metadata utility functions
- Structured data (JSON-LD) generators
- Canonical URL utilities
- Enhanced metadata on all pages
- Custom 404 page

## Files Created

### 1. SEO Configuration (`src/config/seo.ts`)
Contains all site-wide SEO settings:
- Site name, URL, description
- Keywords for Bulgarian market
- Social media handles
- Contact information
- Business information
- Default OpenGraph and Twitter card settings
- Pre-configured schemas (Organization, LocalBusiness, Website)

### 2. Sitemap Generator (`src/app/sitemap.ts`)
Generates dynamic sitemap.xml including:
- Static pages (home, services, pricing, portfolio, demos, industries, blog, contact)
- All blog posts
- All blog categories
- Proper priorities and change frequencies

### 3. Robots.txt (`src/app/robots.ts`)
Configures crawler access:
- Allows all crawlers on public pages
- Disallows admin routes
- Points to sitemap.xml

### 4. Metadata Utility (`src/lib/metadata.ts`)
Reusable functions for generating metadata:
- `generatePageMetadata()` - Generic page metadata
- `generateOpenGraph()` - OpenGraph metadata
- `generateTwitterCard()` - Twitter card metadata
- `generateBlogPostMetadata()` - Blog post specific metadata
- `generateProductMetadata()` - Product/service metadata
- `getPageSeo()` - Get page-specific SEO config

### 5. Structured Data Utilities (`src/lib/structured-data.ts`)
JSON-LD schema generators:
- `generateOrganizationSchema()` - Organization schema
- `generateLocalBusinessSchema()` - Local business schema
- `generateWebsiteSchema()` - Website schema
- `generateArticleSchema()` - Article/blog post schema
- `generateBreadcrumbSchema()` - Breadcrumb list schema
- `generateServiceSchema()` - Service schema
- `generateOfferSchema()` - Offer/pricing schema
- `generateCreativeWorkSchema()` - Portfolio item schema
- `generateFAQSchema()` - FAQ page schema
- `generatePersonSchema()` - Person/author schema
- `renderJsonLd()` - Render JSON-LD as string

### 6. Canonical URL Utility (`src/lib/canonical.ts`)
URL normalization functions:
- `getCanonicalUrl()` - Generate canonical URLs
- `getAlternateUrls()` - Generate alternate language URLs
- `isInternalUrl()` - Check if URL is internal
- `sanitizeUrl()` - Remove tracking parameters

### 7. Custom 404 Page (`src/app/not-found.tsx`)
SEO-friendly 404 page with:
- Clear error message in Bulgarian
- Links to homepage and services
- Helpful navigation links
- Contact CTA
- `noindex` robots directive

## Pages Updated

### Home Page (`src/app/page.tsx`)
- Enhanced title and description in Bulgarian
- Keywords for Bulgarian market
- Organization schema
- LocalBusiness schema
- Website schema

### Services Page (`src/app/services/page.tsx`)
- Service-specific keywords
- Service schema with pricing range

### Pricing Page (`src/app/pricing/page.tsx`)
- Pricing-specific keywords
- Offer schema for pricing

### Portfolio Page (`src/app/portfolio/page.tsx`)
- Portfolio-specific keywords
- CreativeWork schema

### Blog Pages
- Blog listing page (`src/app/blog/page.tsx`):
  - Blog-specific keywords
  - Enhanced OpenGraph metadata

- Blog post pages (`src/app/blog/[slug]/page.tsx`):
  - Article schema
  - Breadcrumb schema
  - Author information
  - Published/modified dates

- Blog category pages (`src/app/blog/category/[slug]/page.tsx`):
  - Category-specific keywords
  - Breadcrumb schema

### Contact Page (`src/app/contact/page.tsx`)
- Contact-specific keywords
- ContactPoint schema

### Demos Page (`src/app/demos/page.tsx`)
- Demo-specific keywords
- Enhanced OpenGraph metadata

### Industries Page (`src/app/industries/page.tsx`)
- Industry-specific keywords
- Enhanced OpenGraph metadata

## Metadata Features

All pages now include:
- **Bulgarian titles and descriptions** - Localized for Bulgarian market
- **Keywords** - Target keywords for Bulgarian businesses
- **Canonical URLs** - Prevent duplicate content issues
- **OpenGraph tags** - Social media sharing optimization
- **Twitter cards** - Twitter sharing optimization
- **Structured data** - Rich snippets in search results

## Target Keywords

Primary keywords for Bulgarian market:
- уеб разработка България (website development Bulgaria)
- уеб сайтове София (websites Sofia)
- SEO оптимизация България (SEO optimization Bulgaria)
- е-търговия България (ecommerce Bulgaria)
- онлайн магазин (online store)
- персонализирани платформи (custom platforms)
- уеб дизайн България (web design Bulgaria)
- дигитален маркетинг (digital marketing)

## Schema.org Structured Data

The following schemas are implemented:
1. **Organization** - Company information
2. **LocalBusiness** - Local business with address and hours
3. **Website** - Site-wide search action
4. **Article** - Blog posts with author and dates
5. **BreadcrumbList** - Navigation breadcrumbs
6. **Service** - Service offerings
7. **Offer** - Pricing information
8. **CreativeWork** - Portfolio items
9. **ContactPoint** - Contact information

## Social Media

Configured social media accounts:
- Facebook: https://facebook.com/silexdigital
- Twitter: https://twitter.com/silexdigital
- LinkedIn: https://linkedin.com/company/silexdigital
- Instagram: https://instagram.com/silexdigital

## Usage Examples

### Adding SEO to a new page:

```typescript
import { siteConfig, pageSeo } from '@/config/seo';
import { generateServiceSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Вашата страница | Silex-Digital',
  description: 'Вашето описание за SEO.',
  keywords: ['ключова дума 1', 'ключова дума 2'],
  alternates: {
    canonical: `${siteConfig.url}/your-page`,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.openGraph.locale,
    url: `${siteConfig.url}/your-page`,
    siteName: siteConfig.openGraph.siteName,
    title: 'Вашата страница | Silex-Digital',
    description: 'Вашето описание.',
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: 'Вашата страница',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Вашата страница | Silex-Digital',
    description: 'Вашето описание.',
    images: [`${siteConfig.url}${siteConfig.defaultImage}`],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
};

export default function YourPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceSchema({
            name: 'Вашата услуга',
            description: 'Вашето описание.',
            url: `${siteConfig.url}/your-page`,
          })),
        }}
      />
      
      {/* Page Content */}
      {/* ... */}
    </>
  );
}
```

## Next Steps

To further improve SEO:

1. **Add favicon and app icons** - Create and add to `/public/` directory
2. **Create actual images** - Add `/images/og-default.jpg` and other referenced images
3. **Update site URL** - Change `siteConfig.url` to actual production URL
4. **Add social media meta tags** - Verify social media accounts are correct
5. **Monitor performance** - Set up Google Search Console and Analytics
6. **Generate sitemap** - Build the project to generate `/sitemap.xml`
7. **Test structured data** - Use Google's Rich Results Test

## Testing

- Sitemap: `http://localhost:3000/sitemap.xml`
- Robots: `http://localhost:3000/robots.txt`
- Structured Data: Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- OpenGraph: Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Twitter Cards: Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Notes

- All metadata is in Bulgarian for the Bulgarian market
- Canonical URLs prevent duplicate content issues
- Structured data helps with rich snippets
- Sitemap includes all important pages
- Robots.txt properly blocks admin routes

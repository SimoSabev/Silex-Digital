// JSON-LD for /services: a Service with an OfferCatalog built entirely from
// the offer model. Bulgarian is the canonical language for this URL.
import { siteConfig } from "@/config/seo";
import {
  bundles,
  serviceCategories,
  servicesByCategory,
  type Bundle,
  type ServiceItem,
} from "@/lib/offer";

const CURRENCY = "EUR";

interface PriceSpec {
  "@type": "UnitPriceSpecification";
  priceCurrency: string;
  valueAddedTaxIncluded: false;
  price?: number;
  minPrice?: number;
  unitCode?: "MON" | "HUR";
}

const spec = (fields: Omit<PriceSpec, "@type" | "priceCurrency" | "valueAddedTaxIncluded">): PriceSpec => ({
  "@type": "UnitPriceSpecification",
  priceCurrency: CURRENCY,
  valueAddedTaxIncluded: false,
  ...fields,
});

function servicePriceSpecs(svc: ServiceItem): PriceSpec[] {
  const { oneTime, monthly, isFrom, unit } = svc.price;
  const specs: PriceSpec[] = [];
  if (oneTime !== undefined) {
    if (unit === "hour") specs.push(spec({ price: oneTime, unitCode: "HUR" }));
    else if (isFrom) specs.push(spec({ minPrice: oneTime }));
    else specs.push(spec({ price: oneTime }));
  }
  if (monthly !== undefined) specs.push(spec({ price: monthly, unitCode: "MON" }));
  return specs;
}

function serviceOffer(svc: ServiceItem) {
  const headline = svc.price.oneTime ?? svc.price.monthly;
  return {
    "@type": "Offer",
    ...(headline !== undefined && !svc.price.isFrom ? { price: headline } : {}),
    priceCurrency: CURRENCY,
    priceSpecification: servicePriceSpecs(svc),
    itemOffered: {
      "@type": "Service",
      name: svc.name.bg,
      description: svc.summary.bg,
    },
  };
}

function bundleOffer(bundle: Bundle) {
  return {
    "@type": "Offer",
    price: bundle.price.oneTime,
    priceCurrency: CURRENCY,
    priceSpecification: [spec({ price: bundle.price.oneTime }), spec({ price: bundle.price.monthly, unitCode: "MON" })],
    itemOffered: {
      "@type": "Service",
      name: bundle.name.bg,
      description: bundle.tagline.bg,
    },
  };
}

export function buildServicesSchema() {
  const categoryCatalogs = serviceCategories.map((cat) => ({
    "@type": "OfferCatalog",
    name: cat.name.bg,
    itemListElement: servicesByCategory(cat.id).map(serviceOffer),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Услуги на SilexBrand",
    serviceType: "Бранд, уебсайт, съдържание, реклама, SEO и AI автоматизация",
    url: `${siteConfig.url}/services`,
    areaServed: { "@type": "Country", name: "Bulgaria" },
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги и пакети",
      itemListElement: [
        ...categoryCatalogs,
        { "@type": "OfferCatalog", name: "Пакети", itemListElement: bundles.map(bundleOffer) },
      ],
    },
  };
}

import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import { generateFAQSchema } from "@/lib/structured-data";
import { pricingFaqsBg } from "@/lib/pricing-data";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: pageSeo.pricing.title,
  description: pageSeo.pricing.description,
  keywords: pageSeo.pricing.keywords,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: pageSeo.pricing.title,
    description: pageSeo.pricing.description,
  },
};

// Bulgarian FAQ content is the canonical version for schema purposes — the
// site's primary language and the language Google indexes this URL under
// (see AUDIT.md C1: there's no separate /en URL to attach an English
// FAQPage schema to today).
const faqSchema = generateFAQSchema(
  pricingFaqsBg.map((item) => ({ question: item.q, answer: item.a })),
);

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PricingContent />
    </>
  );
}

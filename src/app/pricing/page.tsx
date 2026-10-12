import { type Metadata } from "next";
import { generateFAQSchema } from "@/lib/structured-data";
import { pricingFaqsBg } from "@/lib/pricing-data";
import { bundles, formatEur, getService } from "@/lib/offer";
import PricingContent from "./PricingContent";

// Derived from the catalog so the snippet can never drift from the page.
const cheapestBundle = Math.min(...bundles.map((b) => b.price.oneTime));
const logoPrice = formatEur(getService("logo").price.oneTime ?? 0, "bg");

const title = "Цени | Услуги поотделно и пакети с отстъпка";
const description = `Лого за ${logoPrice}, сайт, SEO и AI асистент — поотделно или в пакет от ${formatEur(cheapestBundle, "bg")}, по-евтино от същите услуги поотделно. Цени без ДДС.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "цени уеб сайт",
    "цена лого",
    "цена SEO",
    "пакет сайт и лого",
    "цени дигитална агенция Варна",
    "website pricing Bulgaria",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title,
    description,
  },
};

// Bulgarian FAQ content is the canonical version for schema purposes — the
// site's primary language and the language Google indexes this URL under.
// It's the same array PricingFaq renders, so schema and page stay in sync.
const faqSchema = generateFAQSchema(pricingFaqsBg.map((item) => ({ question: item.q, answer: item.a })));

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

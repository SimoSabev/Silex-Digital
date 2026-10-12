import { type Metadata } from "next";
import { formatEur, getService } from "@/lib/offer";
import SeoPricingContent from "./SeoPricingContent";

// Prices in the snippet come from the catalog, so they can't drift from the page.
const startPrice = formatEur(getService("seo-start").price.oneTime ?? 0, "bg");
const localPrice = formatEur(getService("seo-local").price.monthly ?? 0, "bg");

const title = "SEO цени | Локално SEO и видимост в AI търсачките";
const description = `SEO Старт за ${startPrice} еднократно и месечни нива от ${localPrice}/мес. — Google бизнес профил, съдържание и проследяване дали AI търсачките ви споменават. Цени без ДДС.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ["SEO услуги Варна", "локално SEO България", "цена SEO", "Google бизнес профил", "SEO за AI търсачки"],
  alternates: {
    canonical: "/pricing/seo",
  },
  openGraph: {
    title,
    description,
  },
};

export default function SeoPricingPage() {
  return <SeoPricingContent />;
}

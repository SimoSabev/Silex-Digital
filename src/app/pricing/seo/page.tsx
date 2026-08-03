import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import SeoPricingContent from "./SeoPricingContent";

export const metadata: Metadata = {
  title: pageSeo.pricingSeo.title,
  description: pageSeo.pricingSeo.description,
  keywords: pageSeo.pricingSeo.keywords,
  alternates: {
    canonical: "/pricing/seo",
  },
  openGraph: {
    title: pageSeo.pricingSeo.title,
    description: pageSeo.pricingSeo.description,
  },
};

export default function SeoPricingPage() {
  return <SeoPricingContent />;
}

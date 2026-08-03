import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  keywords: pageSeo.services.keywords,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: pageSeo.services.title,
    description: pageSeo.services.description,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}

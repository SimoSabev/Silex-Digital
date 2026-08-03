import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: pageSeo.privacy.title,
  description: pageSeo.privacy.description,
  keywords: pageSeo.privacy.keywords,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: pageSeo.privacy.title,
    description: pageSeo.privacy.description,
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}

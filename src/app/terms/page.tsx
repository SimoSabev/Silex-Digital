import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: pageSeo.terms.title,
  description: pageSeo.terms.description,
  keywords: pageSeo.terms.keywords,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: pageSeo.terms.title,
    description: pageSeo.terms.description,
  },
};

export default function TermsPage() {
  return <TermsContent />;
}

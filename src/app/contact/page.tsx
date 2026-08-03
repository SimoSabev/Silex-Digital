import { Suspense } from "react";
import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  keywords: pageSeo.contact.keywords,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: pageSeo.contact.title,
    description: pageSeo.contact.description,
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[var(--bg-page)]" />}>
      <ContactContent />
    </Suspense>
  );
}

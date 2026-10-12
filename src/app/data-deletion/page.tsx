import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import DataDeletionContent from "./DataDeletionContent";

export const metadata: Metadata = {
  title: pageSeo.dataDeletion.title,
  description: pageSeo.dataDeletion.description,
  keywords: pageSeo.dataDeletion.keywords,
  alternates: {
    canonical: "/data-deletion",
  },
  openGraph: {
    title: pageSeo.dataDeletion.title,
    description: pageSeo.dataDeletion.description,
  },
};

export default function DataDeletionPage() {
  return <DataDeletionContent />;
}

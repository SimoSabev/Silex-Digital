import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import DemosContent from "./DemosContent";

export const metadata: Metadata = {
  title: pageSeo.demos.title,
  description: pageSeo.demos.description,
  keywords: pageSeo.demos.keywords,
  alternates: {
    canonical: "/demos",
  },
  openGraph: {
    title: pageSeo.demos.title,
    description: pageSeo.demos.description,
  },
};

export default function DemosPage() {
  return <DemosContent />;
}

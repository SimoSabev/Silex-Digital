import { type Metadata } from "next";
import { pageSeo } from "@/config/seo";
import HomeContent from "./_components/HomeContent";

export const metadata: Metadata = {
  title: { absolute: pageSeo.home.title },
  description: pageSeo.home.description,
  keywords: pageSeo.home.keywords,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}

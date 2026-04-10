import { type Metadata } from "next";
import HomeContent from "./_components/HomeContent";

export const metadata: Metadata = {
  title: "Silex Digital | AI and Automation for Micro Businesses in Varna",
  description:
    "Affordable AI and automation packages for micro businesses in Varna and the region. Website, light SEO, and light automation with a fast launch.",
};

export default function HomePage() {
  return <HomeContent />;
}

"use client";

import dynamic from "next/dynamic";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import { useI18n } from "@/lib/i18n";
import HeroSection from "./home/HeroSection";
import PathsSection from "./home/PathsSection";
import ServicesSection from "./home/ServicesSection";
import DemoSection from "./home/DemoSection";
import BeforeAfterSection from "./home/BeforeAfterSection";
import HowWeWorkSection from "./home/HowWeWorkSection";
import RoiSection from "./home/RoiSection";
import ProofSection from "./home/ProofSection";
import PricingTeaser from "./home/PricingTeaser";
import FinalCta from "./home/FinalCta";
import { HOME_SERVICE_KEYS } from "./home/offer-copy";

const HeroProductReveal = dynamic(() => import("@/components/animations/HeroProductReveal"), {
  ssr: false,
  loading: () => <div className="h-[100dvh] w-full bg-[var(--color-bg-dark)]" />,
});

export default function HomeContent() {
  const { t } = useI18n();
  const marqueeItems = HOME_SERVICE_KEYS.map((key) => (key === "ai" ? t("svc.ai.short") : t(`svc.${key}.title`)));

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      {/* Cinematic intro — generated product video, frame-scrubbed by scroll, real SilexBrand mark overlaid */}
      <HeroProductReveal />
      <HeroSection />
      {/* Service ticker — bridges the dark hero into the light page */}
      <MarqueeStrip items={marqueeItems} />
      <PathsSection />
      <ServicesSection />
      <DemoSection />
      <BeforeAfterSection />
      <HowWeWorkSection />
      <RoiSection />
      <ProofSection />
      <PricingTeaser />
      <FinalCta />
    </div>
  );
}

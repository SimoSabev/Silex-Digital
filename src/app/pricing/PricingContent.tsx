"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n";
import { getBundle, isBundleId, type BundleId, type ServiceId } from "@/lib/offer";
import BundleSection, { type Audience } from "./_components/BundleSection";
import ComparisonMatrix from "./_components/ComparisonMatrix";
import PricingFaq from "./_components/PricingFaq";
import PricingFinalCta from "./_components/PricingFinalCta";
import PricingHero from "./_components/PricingHero";
import PricingTerms from "./_components/PricingTerms";
import ServiceCatalog from "./_components/ServiceCatalog";

/** Clearance for the fixed navbar when scrolling a bundle card into view. */
const NAV_OFFSET = 112;

export default function PricingContent() {
  const { locale } = useI18n();
  const [audience, setAudience] = useState<Audience>("new-business");
  const [selected, setSelected] = useState<readonly ServiceId[]>([]);
  const [focusBundleId, setFocusBundleId] = useState<BundleId | null>(null);

  // "See the bundle" from the selection bar: show the right group on phones,
  // then scroll to and focus the card once it has rendered.
  const focusBundle = (id: BundleId) => {
    setAudience(getBundle(id).audience);
    setFocusBundleId(id);
  };

  // Deep links like /pricing#bundle-ai-growth (from the contact page): on
  // phones that card may sit in the hidden group, so switch to it first.
  useEffect(() => {
    const id = window.location.hash.replace("#bundle-", "");
    if (!window.location.hash.startsWith("#bundle-") || !isBundleId(id)) return;
    setAudience(getBundle(id).audience);
    setFocusBundleId(id);
  }, []);

  useEffect(() => {
    if (!focusBundleId) return;
    const card = document.getElementById(`bundle-${focusBundleId}`);
    if (card) {
      // window.scrollTo rather than scrollIntoView: the latter is swallowed
      // by the smooth-scroll layer on some phones.
      window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: "smooth" });
      card.focus({ preventScroll: true });
    }
    setFocusBundleId(null);
  }, [focusBundleId]);

  return (
    <div className="min-h-dvh overflow-x-clip bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      <Container>
        <div className="relative py-24 md:py-32">
          <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-[120px]" aria-hidden="true" />

          <PricingHero locale={locale} />
          <BundleSection locale={locale} audience={audience} onAudienceChange={setAudience} />
          <ComparisonMatrix locale={locale} />
          <ServiceCatalog
            locale={locale}
            selected={selected}
            onSelectedChange={setSelected}
            onSwitchToBundle={focusBundle}
          />
          <PricingTerms locale={locale} />
          <PricingFaq locale={locale} />
          <PricingFinalCta locale={locale} />
        </div>
      </Container>
      {/* Keeps the footer clear of the fixed selection bar. */}
      {selected.length > 0 && <div className="h-64" aria-hidden="true" />}
    </div>
  );
}

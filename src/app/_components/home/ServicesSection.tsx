"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/lib/i18n";
import { useTilt } from "@/lib/useTilt";
import { CtaLink, SectionHeading } from "./ui";
import { SERVICE_ICONS } from "./service-icons";
import { HOME_SERVICE_KEYS, homeServicePrice, type HomeServiceKey } from "./offer-copy";

const WIDE_CELLS: ReadonlySet<number> = new Set([0, 3, 4]);

function ServiceCard({ serviceKey, className }: { serviceKey: HomeServiceKey; className: string }) {
  const { locale, t } = useI18n();
  const tilt = useTilt(6);
  const Icon = SERVICE_ICONS[serviceKey];

  return (
    <StaggerItem className={className}>
      <Link href="/services" className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className="tilt-card card-2026 relative flex h-full flex-col overflow-hidden rounded-2xl p-7 shadow-apple hover:shadow-apple-hover sm:p-8"
        >
          <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <h3 className="mb-3 text-h3 text-[var(--text-main)]">{t(`svc.${serviceKey}.title`)}</h3>
          <p className="mb-6 flex-1 text-body text-[var(--text-sub)]">{t(`svc.${serviceKey}.body`)}</p>
          <div className="mt-auto flex items-center justify-between gap-3">
            <span className="badge-accent nums rounded-full px-3 py-1 text-small font-bold">
              {homeServicePrice(serviceKey, locale, t)}
            </span>
            <ArrowRight className="h-5 w-5 flex-none text-[var(--text-sub)] transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}

export default function ServicesSection() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge={t("home.services.badge")}
          title={t("home.services.title")}
          sub={t("home.services.sub")}
          className="mb-12 md:mb-16"
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICE_KEYS.map((key, i) => (
            // Bento rhythm on desktop: wide cells at 0, 3, 4 fill three full rows (2+1 · 1+2 · 2+1).
            <ServiceCard key={key} serviceKey={key} className={WIDE_CELLS.has(i) ? "lg:col-span-2" : ""} />
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.2} className="mt-12 flex flex-col items-center gap-3 text-center">
          <CtaLink href="/services" variant="secondary" size="lg">
            {t("home.services.cta")}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </CtaLink>
          <p className="text-caption text-[var(--text-muted)]">{t("common.vatNote")}</p>
        </AnimatedSection>
      </Container>
    </section>
  );
}

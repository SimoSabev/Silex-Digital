"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Magnetic from "@/components/ui/Magnetic";
import { useI18n } from "@/lib/i18n";
import { contactHref } from "./offer-copy";

export default function FinalCta() {
  const { t } = useI18n();

  return (
    <section className="bg-[var(--accent)] py-20 md:py-28 lg:py-32">
      <Container>
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-display text-white">{t("cta.title")}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lead text-white/90">{t("cta.sub")}</p>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Magnetic className="block">
              <Link
                href={contactHref.call()}
                className="btn-lg inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white font-bold text-[var(--accent)] shadow-apple transition-transform hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                {t("cta.button")}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </Magnetic>
            <Link
              href="/pricing"
              className="btn-lg inline-flex items-center justify-center rounded-xl border-2 border-white/80 font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

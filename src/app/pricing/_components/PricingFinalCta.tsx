import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Locale } from "@/lib/offer";
import { callContactHref, tr } from "./offer-utils";

export default function PricingFinalCta({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="atelier-band-dark relative z-10 overflow-hidden rounded-[32px] border border-white/10 px-6 py-14 text-center sm:px-12 md:py-20"
    >
      <h2 id="final-cta-title" className="mx-auto mb-4 max-w-2xl text-h2 text-[var(--color-text-on-dark)]">
        {tr(locale, "Не сте сигурни откъде да започнете?", "Not sure where to start?")}
      </h2>
      <p className="mx-auto mb-8 max-w-xl text-lead text-[var(--color-text-on-dark)]/70">
        {tr(
          locale,
          "За 30 минути ще разберем какво ви трябва сега и какво може да почака — и ще ви кажем коя услуга или пакет излиза най-изгодно.",
          "In 30 minutes we'll work out what you need now and what can wait — and tell you which service or bundle works out best.",
        )}
      </p>
      <Link
        href={callContactHref()}
        className="btn-primary btn-lg group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-10)]"
      >
        {tr(locale, "Безплатна 30-минутна среща", "Free 30-minute call")}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </section>
  );
}

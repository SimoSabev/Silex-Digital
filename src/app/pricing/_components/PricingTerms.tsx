import { Check, Minus } from "lucide-react";
import { BUNDLE_TERMS, type Locale } from "@/lib/offer";
import { tr } from "./offer-utils";

const NOT_INCLUDED = {
  bg: [
    "Рекламен бюджет — плаща се директно на Meta или Google",
    "Печат на визитки, флаери и други материали",
    "Домейн — регистрира се на ваше име",
    "Такси за SMS напомняния",
  ],
  en: [
    "Ad spend — paid directly to Meta or Google",
    "Printing of business cards, flyers and other materials",
    "Domain — registered in your name",
    "SMS reminder fees",
  ],
} as const;

export default function PricingTerms({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="terms-title" className="relative z-10 mb-28">
      <h2 id="terms-title" className="mb-8 max-w-2xl text-h2 text-[var(--text-main)]">
        {tr(locale, "Условията, на един екран", "The terms, on one screen")}
      </h2>
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
          <h3 className="mb-5 text-h4 text-[var(--text-main)]">{tr(locale, "Как работят пакетите", "How bundles work")}</h3>
          <ul className="space-y-3">
            {BUNDLE_TERMS[locale].map((term) => (
              <li key={term} className="flex items-start gap-3 text-body text-[var(--text-sub)]">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-section)] p-6 sm:p-8">
          <h3 className="mb-5 text-h4 text-[var(--text-main)]">{tr(locale, "Какво не е включено", "What isn't included")}</h3>
          <ul className="space-y-3">
            {NOT_INCLUDED[locale].map((item) => (
              <li key={item} className="flex items-start gap-3 text-body text-[var(--text-sub)]">
                <Minus className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-[var(--border)] pt-4 text-small font-semibold text-[var(--text-main)]">
            {tr(locale, "Всички цени са без ДДС.", "All prices exclude VAT.")}
          </p>
        </div>
      </div>
    </section>
  );
}

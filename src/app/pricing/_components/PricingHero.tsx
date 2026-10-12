import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatEur, getService, perMonth, type Locale, type ServiceId } from "@/lib/offer";
import { tr } from "./offer-utils";

type StripItem = { id: ServiceId; label: { bg: string; en: string }; monthly?: boolean };

// Labels are short forms; prices come from the catalog.
const STRIP: readonly StripItem[] = [
  { id: "logo", label: { bg: "Лого", en: "Logo" } },
  { id: "business-site", label: { bg: "Сайт", en: "Website" } },
  { id: "seo-start", label: { bg: "SEO Старт", en: "SEO Start" } },
  { id: "care", label: { bg: "Хостинг", en: "Hosting" }, monthly: true },
];

function stripPrice(item: StripItem, locale: Locale): string {
  const { price } = getService(item.id);
  return item.monthly
    ? `${formatEur(price.monthly ?? 0, locale)}${perMonth(locale)}`
    : formatEur(price.oneTime ?? 0, locale);
}

export default function PricingHero({ locale }: { locale: Locale }) {
  return (
    <div className="atelier-band-dark relative z-10 mb-20 overflow-hidden rounded-[32px] border border-white/10 px-6 py-14 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:px-12 md:py-20">
      <Image
        src="/images/hero-ribbon-dark.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-30 mix-blend-screen"
      />
      <div className="relative z-10 max-w-3xl">
        <Reveal variant="blur">
          <p className="mb-5 eyebrow-mono text-[var(--color-text-on-dark)]/50">
            {tr(locale, "Цени · SilexBrand", "Pricing · SilexBrand")}
          </p>
        </Reveal>
        <h1 className="mb-6 text-display text-[var(--color-text-on-dark)]">
          {tr(locale, "Всяко евро,", "Every euro,")}
          <br />
          <span className="text-[var(--accent-10)]">{tr(locale, "обяснено.", "explained.")}</span>
        </h1>
        <Reveal variant="rise" delay={0.12}>
          <p className="mb-8 max-w-xl text-lead text-[var(--color-text-on-dark)]/70">
            {tr(
              locale,
              "Купувате една услуга или пакет. Пакетите излизат по-евтино от същите услуги поотделно — и разликата е изписана.",
              "Buy a single service or a bundle. Bundles cost less than the same services bought separately — and the difference is written out.",
            )}
          </p>
        </Reveal>
        <Reveal variant="rise" delay={0.2}>
          <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 font-mono text-caption text-[var(--color-text-on-dark)]/70">
            {STRIP.map((item) => (
              <li key={item.id} className="nums">
                {item.label[locale]} · {stripPrice(item, locale)}
              </li>
            ))}
            <li className="text-[var(--accent-10)]">{tr(locale, "Всички цени са без ДДС", "All prices exclude VAT")}</li>
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#bundles"
              className="btn-primary btn-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-10)]"
            >
              {tr(locale, "Вижте пакетите", "See the bundles")}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="btn-lg inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-white/20 font-semibold text-[var(--color-text-on-dark)] transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-10)]"
            >
              {tr(locale, "Единични услуги", "Single services")}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

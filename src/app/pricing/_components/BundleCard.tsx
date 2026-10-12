"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Clock } from "lucide-react";
import { formatEur, getBundleMath, perMonth, type Bundle, type Locale } from "@/lib/offer";
import BundleBreakdown from "./BundleBreakdown";
import { bundleContactHref, bundleLineCosts, deliveryLabel, lineName, pctLabel, tr } from "./offer-utils";

type Props = {
  bundle: Bundle;
  locale: Locale;
};

function SavingChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="nums inline-flex items-center whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] px-2.5 py-0.5 text-caption font-semibold text-[var(--color-success)]">
      {children}
    </span>
  );
}

type PriceRowProps = {
  label: string;
  list: string;
  price: string;
  chip: string;
  note?: string;
  locale: Locale;
};

function PriceRow({ label, list, price, chip, note, locale }: PriceRowProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-section)] px-4 py-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="eyebrow text-[var(--text-muted)]">{label}</span>
        {note && <span className="text-caption text-[var(--text-muted)]">{note}</span>}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="sr-only">{tr(locale, "Поотделно", "Separately")}</span>
        <s className="nums text-small text-[var(--text-muted)]">{list}</s>
        <span className="sr-only">{tr(locale, "В пакета", "In the bundle")}</span>
        <span className="nums whitespace-nowrap font-display text-h3 text-[var(--text-main)]">{price}</span>
        <SavingChip>{chip}</SavingChip>
      </div>
    </div>
  );
}

export default function BundleCard({ bundle, locale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const math = getBundleMath(bundle);
  const lines = bundleLineCosts(bundle);
  const eur = (n: number) => formatEur(n, locale);
  const mo = perMonth(locale);

  return (
    <article
      id={`bundle-${bundle.id}`}
      tabIndex={-1}
      aria-labelledby={`${panelId}-title`}
      className={`relative flex scroll-mt-28 flex-col rounded-[24px] p-6 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:p-8 ${
        bundle.highlight
          ? "card-2026 shadow-[0_24px_50px_-24px_color-mix(in_srgb,var(--accent)_40%,transparent)]"
          : "border border-[var(--border)] bg-[var(--bg-card)] shadow-apple"
      }`}
    >
      {bundle.highlight && (
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-[24px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-10)]" aria-hidden="true" />
      )}

      <header className="mb-5">
        {bundle.badge && (
          <span
            className={`mb-3 inline-flex rounded-full px-3 py-1 text-caption font-semibold ${
              bundle.highlight ? "bg-[var(--accent)] text-[var(--accent-text)]" : "badge-neutral"
            }`}
          >
            {bundle.badge[locale]}
          </span>
        )}
        <h3 id={`${panelId}-title`} className="mb-2 text-h3 text-[var(--text-main)]">
          {bundle.name[locale]}
        </h3>
        <p className="text-small text-[var(--text-sub)]">{bundle.tagline[locale]}</p>
      </header>

      <div className="mb-4 flex flex-col gap-3">
        <PriceRow
          locale={locale}
          label={tr(locale, "Еднократно", "One-time")}
          list={eur(math.listOneTime)}
          price={eur(bundle.price.oneTime)}
          chip={`−${eur(math.saveOneTime)} · −${pctLabel(math.pctOneTime, locale)}`}
        />
        <PriceRow
          locale={locale}
          label={tr(locale, "Месечно", "Monthly")}
          note={tr(locale, `мин. ${bundle.minTermMonths} мес.`, `min. ${bundle.minTermMonths} mo`)}
          list={`${eur(math.listMonthly)}${mo}`}
          price={`${eur(bundle.price.monthly)}${mo}`}
          chip={`−${eur(math.saveMonthly)}${mo} · −${pctLabel(math.pctMonthly, locale)}`}
        />
      </div>

      <p className="nums mb-6 text-small text-[var(--text-sub)]">
        {tr(locale, "Първа година:", "First year:")}{" "}
        <strong className="font-semibold text-[var(--text-main)]">{eur(math.firstYearPrice)}</strong>{" "}
        {tr(locale, "вместо", "instead of")} {eur(math.firstYearList)} →{" "}
        <strong className="font-semibold text-[var(--color-success)]">
          {tr(locale, "спестявате", "you save")} {eur(math.firstYearSave)}
        </strong>
      </p>

      <h4 className="mb-3 eyebrow text-[var(--text-muted)]">{tr(locale, "Какво е включено", "What's included")}</h4>
      <ul className="mb-5 grid gap-2 sm:grid-cols-2">
        {lines.map((line) => (
          <li key={line.service.id} className="flex items-start gap-2 text-small text-[var(--text-main)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <span>{lineName(line, locale)}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${panelId}-breakdown`}
        onClick={() => setIsOpen((open) => !open)}
        className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md text-small font-semibold text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {isOpen ? tr(locale, "Скрийте разбивката", "Hide the breakdown") : tr(locale, "Вижте разбивката", "See the breakdown")}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${panelId}-breakdown`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mb-5 overflow-hidden"
          >
            <BundleBreakdown bundle={bundle} math={math} locale={locale} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto space-y-4 pt-2">
        <p className="flex items-center gap-2 text-caption text-[var(--text-muted)]">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {tr(locale, "Изработка:", "Delivery:")} {deliveryLabel(bundle.delivery, locale)}
        </p>
        <Link
          href={bundleContactHref(bundle.id)}
          className={`group w-full ${bundle.highlight ? "btn-primary" : "btn-secondary"} btn-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
        >
          {bundle.cta[locale]}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

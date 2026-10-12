"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { bundles, formatEur, getBundleMath, perMonth, type Bundle, type Locale } from "@/lib/offer";
import { VAT_NOTE } from "./prices";

const labels = {
  bg: { list: "Поотделно", price: "В пакета", save: "Спестявате" },
  en: { list: "Separately", price: "In the bundle", save: "You save" },
} as const;

const pctLabel = (pct: number, locale: Locale): string => (locale === "bg" ? `(−${pct} %)` : `(−${pct}%)`);

type Tone = "muted" | "strong" | "accent";

const toneClass: Record<Tone, string> = {
  muted: "text-[var(--color-text-on-dark)]/50",
  strong: "text-[var(--color-text-on-dark)]",
  accent: "text-[var(--accent-10)]",
};

function Figure({
  label,
  oneTime,
  monthly,
  pct,
  tone,
}: {
  label: string;
  oneTime: string;
  monthly: string;
  pct?: { oneTime: string; monthly: string };
  tone: Tone;
}) {
  return (
    <div className="min-w-0">
      <dt className="mb-1 text-caption text-[var(--color-text-on-dark)]/40">{label}</dt>
      <dd className={`nums ${toneClass[tone]}`}>
        <span className="block text-h4">{oneTime}</span>
        {pct && <span className="block text-caption">{pct.oneTime}</span>}
        <span className="mt-1 block text-caption sm:text-small">{monthly}</span>
        {pct && <span className="block text-caption">{pct.monthly}</span>}
      </dd>
    </div>
  );
}

function BundleRow({ bundle, locale }: { bundle: Bundle; locale: Locale }) {
  const m = getBundleMath(bundle);
  const t = labels[locale];
  const mo = perMonth(locale);
  const eur = (n: number) => formatEur(n, locale);
  const frame = bundle.highlight
    ? "border-[var(--accent-10)]/60 bg-[var(--accent-10)]/[0.08] shadow-[0_24px_60px_-30px_var(--accent)]"
    : "border-white/10 bg-white/[0.02]";

  return (
    <div className={`grid gap-5 rounded-2xl border p-5 sm:p-6 md:grid-cols-[1.3fr_2fr] md:items-center md:gap-8 ${frame}`}>
      <div>
        <h3 className="mb-1 text-h4 text-[var(--color-text-on-dark)]">{bundle.name[locale]}</h3>
        <p className="text-small text-[var(--color-text-on-dark)]/50">{bundle.tagline[locale]}</p>
      </div>
      <dl className="grid grid-cols-3 gap-3 sm:gap-6">
        <Figure label={t.list} oneTime={eur(m.listOneTime)} monthly={`${eur(m.listMonthly)}${mo}`} tone="muted" />
        <Figure label={t.price} oneTime={eur(bundle.price.oneTime)} monthly={`${eur(bundle.price.monthly)}${mo}`} tone="strong" />
        <Figure
          label={t.save}
          oneTime={eur(m.saveOneTime)}
          monthly={`${eur(m.saveMonthly)}${mo}`}
          pct={{ oneTime: pctLabel(m.pctOneTime, locale), monthly: pctLabel(m.pctMonthly, locale) }}
          tone="accent"
        />
      </dl>
    </div>
  );
}

/** Shared minimum term, if every bundle uses the same one. */
const sharedMinTerm: number | null = bundles.every((b) => b.minTermMonths === bundles[0]?.minTermMonths)
  ? (bundles[0]?.minTermMonths ?? null)
  : null;

export default function BundleSavings({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  const termNote =
    sharedMinTerm === null
      ? ""
      : bg
        ? ` Месечната част е с минимален срок ${sharedMinTerm} месеца.`
        : ` The monthly part has a ${sharedMinTerm}-month minimum.`;

  return (
    <section className="border-t border-white/10 bg-black/20 py-20 md:py-28" aria-labelledby="bundles-title">
      <Container>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-3 eyebrow-mono text-[var(--color-text-on-dark)]/40">{bg ? "Пакети" : "Bundles"}</p>
          <h2 id="bundles-title" className="mb-4 text-h2 text-[var(--color-text-on-dark)]">
            {bg ? "Заедно излиза по-евтино" : "Together costs less"}
          </h2>
          <p className="text-lead text-[var(--color-text-on-dark)]/60">
            {bg
              ? "Пакетите събират услугите на една цена. Виждате сумата поотделно, цената в пакета и разликата."
              : "Bundles put the services at one price. You see the total separately, the bundle price and the difference."}
          </p>
        </Reveal>

        <RevealGroup className="grid gap-4">
          {bundles.map((b) => (
            <RevealItem key={b.id} variant="rise">
              <BundleRow bundle={b} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-caption text-[var(--color-text-on-dark)]/40">
            {VAT_NOTE[locale]}
            {termNote}
          </p>
          <Link
            href="/pricing#bundles"
            className="inline-flex items-center gap-1.5 text-small font-bold text-[var(--accent-10)] transition-opacity hover:opacity-75"
          >
            {bg ? "Сравнете пакетите" : "Compare the bundles"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}

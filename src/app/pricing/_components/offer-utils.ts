// View helpers for the pricing and contact pages. Every number shown to a
// visitor comes from the catalog in "@/lib/offer" — nothing here is typed by hand.
import {
  bundles,
  formatEur,
  getBundleMath,
  getService,
  perMonth,
  services,
  type Bundle,
  type BundleId,
  type BundleMath,
  type DayRange,
  type Locale,
  type ServiceId,
  type ServiceItem,
} from "@/lib/offer";

export const tr = (locale: Locale, bg: string, en: string): string => (locale === "bg" ? bg : en);

/** "from …" and hourly services can't go in a cart — they get a quote CTA. */
export function isQuoteOnly(svc: ServiceItem): boolean {
  return Boolean(svc.price.isFrom) || svc.price.unit === "hour";
}

/** "24 %" in Bulgarian typography, "24%" in English. */
export const pctLabel = (pct: number, locale: Locale): string => (locale === "bg" ? `${pct} %` : `${pct}%`);

export function deliveryLabel(range: DayRange, locale: Locale): string {
  return tr(locale, `${range.min}–${range.max} работни дни`, `${range.min}–${range.max} working days`);
}

export function monthsLabel(months: number, locale: Locale): string {
  if (locale === "bg") return months === 1 ? "1 месец" : `${months} месеца`;
  return months === 1 ? "1 month" : `${months} months`;
}

export function servicesCountLabel(count: number, locale: Locale): string {
  if (locale === "bg") return count === 1 ? "1 услуга" : `${count} услуги`;
  return count === 1 ? "1 service" : `${count} services`;
}

/** "390 € + 119 €/мес." style label for a single service. */
export function servicePriceLabel(svc: ServiceItem, locale: Locale): string {
  const { oneTime, monthly, isFrom, unit } = svc.price;
  const parts: string[] = [];
  if (oneTime !== undefined) {
    const base = formatEur(oneTime, locale);
    const suffix = unit === "hour" ? tr(locale, "/час", "/hr") : "";
    parts.push(`${isFrom ? tr(locale, "от ", "from ") : ""}${base}${suffix}`);
  }
  if (monthly !== undefined) parts.push(`${formatEur(monthly, locale)}${perMonth(locale)}`);
  return parts.join(" + ");
}

/** Builds a /contact link. Ids are [a-z-] slugs, so commas stay readable. */
export function contactHref(params: Readonly<Record<string, string>>): string {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value.split(",").map(encodeURIComponent).join(",")}`)
    .join("&");
  return `/contact?${query}`;
}

export const bundleContactHref = (id: BundleId): string =>
  contactHref({ source: "pricing", kind: "bundle", bundle: id });

export const servicesContactHref = (ids: readonly ServiceId[], source = "pricing"): string =>
  contactHref({ source, kind: "services", services: ids.join(",") });

export const callContactHref = (source = "pricing"): string => contactHref({ source, kind: "call" });

// ── Bundle lines ──────────────────────────────────────────────────────────

export interface LineCost {
  readonly service: ServiceItem;
  /** One-time part counted in the bundle's "separately" total. */
  readonly oneTime: number;
  /** Monthly part counted in the bundle's "separately" total. */
  readonly monthly: number;
  readonly prepaidMonths: number;
}

/** Mirrors computeBundleMath line by line, so the rows add up to listOneTime/listMonthly. */
export function bundleLineCosts(bundle: Bundle): readonly LineCost[] {
  return bundle.lines.map((line) => {
    const service = getService(line.service);
    const monthlyFee = service.price.monthly ?? 0;
    const prepaidMonths = line.prepaidMonths ?? 0;
    return {
      service,
      oneTime: ((line.oneTime ?? true) ? (service.price.oneTime ?? 0) : 0) + prepaidMonths * monthlyFee,
      monthly: (line.monthly ?? true) ? monthlyFee : 0,
      prepaidMonths,
    };
  });
}

/** Display name of a bundle line, e.g. "Управление на реклами — 1 месец". */
export function lineName(line: LineCost, locale: Locale): string {
  const name = line.service.name[locale];
  const prepaidOnly = line.prepaidMonths > 0 && line.monthly === 0;
  return prepaidOnly ? `${name} — ${monthsLabel(line.prepaidMonths, locale)}` : name;
}

/** The bundle service that already covers `id` (same service or one that supersedes it). */
export function bundleCoverage(bundle: Bundle, id: ServiceId): ServiceItem | undefined {
  for (const line of bundle.lines) {
    const svc = getService(line.service);
    if (svc.id === id || svc.supersedes?.includes(id)) return svc;
  }
  return undefined;
}

/** Services that appear in at least one bundle, in catalog order. */
export const bundleServices: readonly ServiceItem[] = services.filter((svc) =>
  bundles.some((b) => b.lines.some((l) => l.service === svc.id)),
);

// ── Selection (à-la-carte cart) ───────────────────────────────────────────

export interface Totals {
  readonly oneTime: number;
  readonly monthly: number;
}

export function selectionTotals(ids: readonly ServiceId[]): Totals {
  return ids.reduce<Totals>(
    (acc, id) => {
      const { price } = getService(id);
      return { oneTime: acc.oneTime + (price.oneTime ?? 0), monthly: acc.monthly + (price.monthly ?? 0) };
    },
    { oneTime: 0, monthly: 0 },
  );
}

/** "1 990 € еднократно + 239 €/мес." — omits a zero side. */
export function totalsLabel(totals: Totals, locale: Locale): string {
  const parts: string[] = [];
  if (totals.oneTime > 0) parts.push(`${formatEur(totals.oneTime, locale)} ${tr(locale, "еднократно", "one-time")}`);
  if (totals.monthly > 0) parts.push(`${formatEur(totals.monthly, locale)}${perMonth(locale)}`);
  return parts.join(" + ");
}

/** The selected service that already includes `id`, if any (e.g. brand identity includes the logo). */
export function coveredBy(id: ServiceId, selected: readonly ServiceId[]): ServiceItem | undefined {
  return selected.map(getService).find((svc) => svc.supersedes?.includes(id));
}

export function addToSelection(selected: readonly ServiceId[], id: ServiceId): readonly ServiceId[] {
  const svc = getService(id);
  if (isQuoteOnly(svc) || selected.includes(id) || coveredBy(id, selected)) return selected;
  const superseded = svc.supersedes ?? [];
  return [...selected.filter((s) => !superseded.includes(s)), id];
}

export function removeFromSelection(selected: readonly ServiceId[], id: ServiceId): readonly ServiceId[] {
  return selected.filter((s) => s !== id);
}

export interface UnmetRequirement {
  readonly service: ServiceItem;
  readonly options: readonly ServiceItem[];
}

export function unmetRequirements(selected: readonly ServiceId[]): readonly UnmetRequirement[] {
  return selected.flatMap((id) => {
    const svc = getService(id);
    const req = svc.requiresAnyOf;
    if (!req || req.some((r) => selected.includes(r))) return [];
    return [{ service: svc, options: req.map(getService) }];
  });
}

// ── Bundle hint ───────────────────────────────────────────────────────────

const HINT_THRESHOLD = 0.6;
const HINT_MIN_OVERLAP = 2;

export interface BundleHint {
  readonly bundle: Bundle;
  readonly math: BundleMath;
  readonly overlap: number;
}

/** Comparable value: one-time + the monthly part over the bundle's minimum term. */
const termValue = (oneTime: number, monthly: number, months: number): number => oneTime + monthly * months;

/**
 * Suggests a bundle when the selection is worth ≥60% of that bundle's
 * "separately" value and shares at least two services with it.
 */
export function findBundleHint(selected: readonly ServiceId[]): BundleHint | null {
  if (selected.length < HINT_MIN_OVERLAP) return null;
  const totals = selectionTotals(selected);
  const candidates = bundles.flatMap((bundle) => {
    const math = getBundleMath(bundle);
    const overlap = selected.filter((id) => bundleCoverage(bundle, id)).length;
    const listValue = termValue(math.listOneTime, math.listMonthly, bundle.minTermMonths);
    const ratio = termValue(totals.oneTime, totals.monthly, bundle.minTermMonths) / listValue;
    if (overlap < HINT_MIN_OVERLAP || ratio < HINT_THRESHOLD) return [];
    return [{ bundle, math, overlap, ratio }];
  });
  const best = candidates.sort((a, b) => b.overlap - a.overlap || b.ratio - a.ratio)[0];
  return best ? { bundle: best.bundle, math: best.math, overlap: best.overlap } : null;
}

// ── Budget estimate (contact form) ────────────────────────────────────────

export const BUDGET_IDS = ["under-500", "500-1500", "1500-3000", "3000-plus"] as const;
export type BudgetId = (typeof BUDGET_IDS)[number];

const BUDGET_CEILINGS: readonly [number, BudgetId][] = [
  [500, "under-500"],
  [1500, "500-1500"],
  [3000, "1500-3000"],
];

export function budgetBucket(oneTimeTotal: number): BudgetId {
  return BUDGET_CEILINGS.find(([ceiling]) => oneTimeTotal <= ceiling)?.[1] ?? "3000-plus";
}

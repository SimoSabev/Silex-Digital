// Public API of the offer model. Import from "@/lib/offer" only.
import { bundles } from "./bundles";
import { computeBundleMath } from "./math";
import { createServices } from "./services-create";
import { growServices } from "./services-grow";
import type { Bundle, BundleId, BundleMath, ServiceCategory, ServiceCategoryId, ServiceId, ServiceItem } from "./types";

export * from "./types";
export { bundles, BUNDLE_TERMS } from "./bundles";
export { computeBundleMath, formatEur, perMonth } from "./math";

export const services: readonly ServiceItem[] = [...createServices, ...growServices];

export const serviceCategories: readonly ServiceCategory[] = [
  { id: "brand", name: { bg: "Бранд и идентичност", en: "Brand & identity" } },
  { id: "web", name: { bg: "Уебсайт", en: "Website" } },
  { id: "content", name: { bg: "Съдържание и социални мрежи", en: "Content & social" } },
  { id: "ads", name: { bg: "Реклама", en: "Ads" } },
  { id: "seo", name: { bg: "SEO", en: "SEO" } },
  { id: "ai", name: { bg: "AI и автоматизация", en: "AI & automation" } },
  { id: "care", name: { bg: "Поддръжка", en: "Care" } },
];

const catalog: ReadonlyMap<ServiceId, ServiceItem> = new Map(services.map((s) => [s.id, s]));

export function getService(id: ServiceId): ServiceItem {
  const svc = catalog.get(id);
  if (!svc) throw new Error(`Unknown service "${id}"`);
  return svc;
}

export function servicesByCategory(category: ServiceCategoryId): readonly ServiceItem[] {
  return services.filter((s) => s.category === category);
}

export function getBundle(id: BundleId): Bundle {
  const bundle = bundles.find((b) => b.id === id);
  if (!bundle) throw new Error(`Unknown bundle "${id}"`);
  return bundle;
}

export function getBundleMath(bundle: Bundle): BundleMath {
  return computeBundleMath(bundle, catalog);
}

export function isServiceId(value: string): value is ServiceId {
  return catalog.has(value as ServiceId);
}

export function isBundleId(value: string): value is BundleId {
  return bundles.some((b) => b.id === value);
}

// ── Invariants — evaluated at import, so a bad price fails the build ──
const MIN_SAVING_PCT = 15;
const MAX_SAVING_PCT = 30;

for (const bundle of bundles) {
  const m = getBundleMath(bundle);
  const ids = new Set(bundle.lines.map((l) => l.service));
  const problems: string[] = [];
  if (m.saveOneTime <= 0 || m.saveMonthly <= 0) problems.push("bundle is not cheaper than its parts");
  for (const p of [m.pctOneTime, m.pctMonthly]) {
    if (p < MIN_SAVING_PCT || p > MAX_SAVING_PCT) problems.push(`saving ${p}% outside ${MIN_SAVING_PCT}–${MAX_SAVING_PCT}%`);
  }
  for (const id of ids) {
    const req = getService(id).requiresAnyOf;
    if (req && !req.some((r) => ids.has(r))) problems.push(`"${id}" requires one of ${req.join(", ")}`);
  }
  if (problems.length > 0) throw new Error(`Bundle "${bundle.id}": ${problems.join("; ")}`);
}

/** Lowest monthly and highest one-time price — for structured data (AggregateOffer). */
export const priceRange = {
  low: Math.min(...services.flatMap((s) => (s.price.monthly && !s.requiresAnyOf ? [s.price.monthly] : []))),
  high: Math.max(...bundles.map((b) => b.price.oneTime)),
} as const;

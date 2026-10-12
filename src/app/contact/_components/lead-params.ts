// Parses and validates the /contact query string. The URL is user-controlled,
// so every value is checked against the catalog or a whitelist; anything
// unknown is dropped rather than shown or sent.
import {
  bundles,
  formatEur,
  getBundle,
  getService,
  isBundleId,
  isServiceId,
  perMonth,
  type BundleId,
  type Locale,
  type ServiceCategoryId,
  type ServiceId,
} from "@/lib/offer";
import { selectionTotals, totalsLabel, tr } from "@/app/pricing/_components/offer-utils";

export const LEAD_KINDS = ["call", "bundle", "services", "project"] as const;
export type LeadKind = (typeof LEAD_KINDS)[number];

export const INDUSTRIES = ["retail", "food", "beauty", "medical", "automotive", "property", "professional", "other"] as const;

const MAX_SERVICES = 20;
const SLUG = /^[a-z0-9-]{1,40}$/;
const DIGITS = /^\d{1,7}$/;

const WEB_CATEGORIES: readonly ServiceCategoryId[] = ["brand", "web", "content", "care"];

export const DEFAULT_BUNDLE: BundleId = bundles.find((b) => b.highlight)?.id ?? "brand-from-zero";

export interface LeadParams {
  readonly kind: LeadKind;
  readonly bundleId: BundleId | null;
  readonly services: readonly ServiceId[];
  readonly source: string;
  readonly industry: string;
  readonly monthlyLeads: string;
  readonly leadValue: string;
}

interface ParamReader {
  get(name: string): string | null;
}

function parseServices(raw: string | null): readonly ServiceId[] {
  if (!raw) return [];
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(isServiceId);
  return [...new Set(ids)].slice(0, MAX_SERVICES);
}

export function parseLeadParams(params: ParamReader): LeadParams {
  const rawKind = params.get("kind");
  const rawBundle = params.get("bundle") ?? "";
  const bundleId = rawKind === "bundle" && isBundleId(rawBundle) ? rawBundle : null;
  const services = rawKind === "services" ? parseServices(params.get("services")) : [];

  // A kind whose payload didn't validate falls back to a general inquiry.
  const kind: LeadKind =
    rawKind === "bundle" ? (bundleId ? "bundle" : "project")
    : rawKind === "services" ? (services.length > 0 ? "services" : "project")
    : rawKind === "project" ? "project"
    : "call";

  const source = params.get("source") ?? "";
  const industry = params.get("industry") ?? "";
  const monthlyLeads = params.get("monthlyLeads") ?? "";
  const leadValue = params.get("leadValue") ?? "";

  return {
    kind,
    bundleId,
    services,
    source: SLUG.test(source) ? source : "contact-page",
    industry: (INDUSTRIES as readonly string[]).includes(industry) ? industry : "",
    monthlyLeads: DIGITS.test(monthlyLeads) ? monthlyLeads : "",
    leadValue: DIGITS.test(leadValue) ? leadValue : "",
  };
}

/** One-time total used for the budget estimate, or null when there's nothing to price. */
export function oneTimeEstimate(kind: LeadKind, bundleId: BundleId, services: readonly ServiceId[]): number | null {
  if (kind === "bundle") return getBundle(bundleId).price.oneTime;
  if (kind === "services" && services.length > 0) return selectionTotals(services).oneTime;
  return null;
}

/** Maps the request onto the projectType values the lead API and emails already know. */
export function deriveProjectType(kind: LeadKind, bundleId: BundleId, services: readonly ServiceId[]): string {
  if (kind === "bundle") return bundleId === "ai-growth" ? "ai-agent" : "web-development";
  if (kind !== "services") return "web-development";
  if (services.includes("online-store")) return "ecommerce";
  const categories = new Set(services.map((id) => getService(id).category));
  if (WEB_CATEGORIES.some((c) => categories.has(c))) return "web-development";
  if (categories.has("ai")) return "ai-agent";
  if (categories.has("seo")) return "seo";
  return "other";
}

/** Default message text for the request, in the visitor's language. */
export function messagePrefill(
  kind: LeadKind,
  bundleId: BundleId,
  services: readonly ServiceId[],
  locale: Locale,
): string {
  if (kind === "call") return tr(locale, "Искам безплатна 30-минутна среща.", "I'd like a free 30-minute call.");
  if (kind === "bundle") {
    const b = getBundle(bundleId);
    const price = `${formatEur(b.price.oneTime, locale)} ${tr(locale, "еднократно", "one-time")} + ${formatEur(b.price.monthly, locale)}${perMonth(locale)}`;
    return tr(locale, `Интересувам се от пакет „${b.name.bg}“ (${price}).`, `I'm interested in the “${b.name.en}” bundle (${price}).`);
  }
  if (kind === "services" && services.length > 0) {
    const names = services.map((id) => getService(id).name[locale]).join(", ");
    const total = totalsLabel(selectionTotals(services), locale);
    return tr(locale, `Интересувам се от: ${names} (${total}).`, `I'm interested in: ${names} (${total}).`);
  }
  return "";
}

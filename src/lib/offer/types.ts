// Offer model: à-la-carte services + bundles built from them.
// All prices are EUR, excluding VAT. Bundle savings are always computed from
// the catalog (see math.ts) — never typed by hand anywhere in the UI.

export type Locale = "bg" | "en";
export type L10n = Readonly<Record<Locale, string>>;
export type L10nList = Readonly<Record<Locale, readonly string[]>>;

export const SERVICE_CATEGORY_IDS = ["brand", "web", "content", "ads", "seo", "ai", "care"] as const;
export type ServiceCategoryId = (typeof SERVICE_CATEGORY_IDS)[number];

export const SERVICE_IDS = [
  "logo", "brand-identity", "naming", "print-kit",
  "landing", "business-site", "online-store", "copywriting", "extra-page", "second-language",
  "photo-session", "reels-pack", "social-setup", "social-lite", "social-standard",
  "meta-ads-setup", "google-ads-setup", "ads-management",
  "seo-start", "seo-local", "seo-growth", "seo-aggressive",
  "ai-assistant", "booking-crm", "extra-channel", "workflow-automation",
  "care", "care-plus", "hourly",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

/** Working days. */
export interface DayRange {
  readonly min: number;
  readonly max: number;
}

export interface ServicePrice {
  /** One-time fee, EUR excl. VAT. */
  readonly oneTime?: number;
  /** Recurring fee, EUR/month excl. VAT. */
  readonly monthly?: number;
  /** "from …" price → quote CTA only, never part of a cart or bundle. */
  readonly isFrom?: boolean;
  readonly unit?: "hour";
}

export interface ServiceCategory {
  readonly id: ServiceCategoryId;
  readonly name: L10n;
}

export interface ServiceItem {
  readonly id: ServiceId;
  readonly category: ServiceCategoryId;
  readonly name: L10n;
  readonly summary: L10n;
  readonly included: L10nList;
  readonly price: ServicePrice;
  /** null = recurring-only service, no delivery window. */
  readonly delivery: DayRange | null;
  readonly requiresAnyOf?: readonly ServiceId[];
  readonly supersedes?: readonly ServiceId[];
  readonly note?: L10n;
}

export const BUNDLE_IDS = ["quick-start", "brand-from-zero", "ai-growth", "full-brand"] as const;
export type BundleId = (typeof BUNDLE_IDS)[number];

export interface BundleLine {
  readonly service: ServiceId;
  /** Include the service's one-time fee (default true). */
  readonly oneTime?: boolean;
  /** Include its recurring fee in the bundle's monthly total (default true). */
  readonly monthly?: boolean;
  /** Recurring months prepaid inside the one-time price. */
  readonly prepaidMonths?: number;
}

export interface Bundle {
  readonly id: BundleId;
  readonly name: L10n;
  readonly audience: "new-business" | "existing-business";
  readonly tagline: L10n;
  readonly lines: readonly BundleLine[];
  readonly price: { readonly oneTime: number; readonly monthly: number };
  readonly minTermMonths: number;
  readonly delivery: DayRange;
  readonly highlight: boolean;
  readonly badge?: L10n;
  readonly cta: L10n;
}

export interface BundleMath {
  readonly listOneTime: number;
  readonly listMonthly: number;
  readonly saveOneTime: number;
  readonly saveMonthly: number;
  /** Floored integer percentages — never promise more than the real saving. */
  readonly pctOneTime: number;
  readonly pctMonthly: number;
  readonly firstYearList: number;
  readonly firstYearPrice: number;
  readonly firstYearSave: number;
  readonly pctFirstYear: number;
}

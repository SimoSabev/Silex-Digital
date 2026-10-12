// Price and link helpers for the home page. Every amount shown on the home
// page is derived here from "@/lib/offer" — never typed into copy.
import {
  formatEur,
  getBundle,
  getService,
  perMonth,
  type BundleId,
  type Locale,
  type ServiceId,
} from "@/lib/offer";
import { interpolate, type TranslationKey } from "@/lib/i18n";

export type Translate = (key: TranslationKey) => string;

export const HOME_SERVICE_KEYS = ["identity", "website", "content", "ads", "seo", "ai"] as const;
export type HomeServiceKey = (typeof HOME_SERVICE_KEYS)[number];

/** The six user-facing service groups shown across the home page. */
export const SERVICE_GROUP_COUNT = HOME_SERVICE_KEYS.length;

/** Assumed lift from faster replies in the sample calculation (illustration only). */
export const SAMPLE_CONVERSION_LIFT_PCT = 18;

export function oneTimeOf(id: ServiceId): number {
  const value = getService(id).price.oneTime;
  if (value === undefined) throw new Error(`Service "${id}" has no one-time price`);
  return value;
}

export function monthlyOf(id: ServiceId): number {
  const value = getService(id).price.monthly;
  if (value === undefined) throw new Error(`Service "${id}" has no monthly price`);
  return value;
}

export const eur = (amount: number, locale: Locale): string => formatEur(amount, locale);
export const eurMonthly = (amount: number, locale: Locale): string =>
  `${formatEur(amount, locale)}${perMonth(locale)}`;

/** "1 990 € + 239 €/мес." */
export function oneTimePlusMonthly(oneTime: number, monthly: number, locale: Locale): string {
  return `${eur(oneTime, locale)} + ${eurMonthly(monthly, locale)}`;
}

/** Working days to a live standard website (business-site delivery window). */
export function standardSiteDays(): number {
  const delivery = getService("business-site").delivery;
  if (!delivery) throw new Error('Service "business-site" has no delivery window');
  return delivery.max;
}

/** Starting-price line for one of the six home service groups. */
export function homeServicePrice(key: HomeServiceKey, locale: Locale, t: Translate): string {
  const template = t(`svc.${key}.price`);
  switch (key) {
    case "identity":
      return interpolate(template, { price: eur(oneTimeOf("logo"), locale) });
    case "website":
      return interpolate(template, { price: eur(oneTimeOf("landing"), locale) });
    case "content":
      return interpolate(template, { price: eur(oneTimeOf("photo-session"), locale) });
    case "ads":
      return interpolate(template, { price: eur(oneTimeOf("meta-ads-setup"), locale) });
    case "seo":
      return interpolate(template, { price: eurMonthly(monthlyOf("seo-local"), locale) });
    case "ai":
      return interpolate(template, {
        oneTime: eur(oneTimeOf("ai-assistant"), locale),
        monthly: eurMonthly(monthlyOf("ai-assistant"), locale),
      });
  }
}

/** "Пакет „Бранд от нула“ — 1 990 € + 239 €/мес." */
export function bundlePriceLine(id: BundleId, locale: Locale, t: Translate): string {
  const bundle = getBundle(id);
  return interpolate(t("home.paths.bundlePrice"), {
    name: bundle.name[locale],
    oneTime: eur(bundle.price.oneTime, locale),
    monthly: eurMonthly(bundle.price.monthly, locale),
  });
}

// ── Contact links (query contract owned by ContactContent) ──
const CONTACT_SOURCE = "home";

export const contactHref = {
  call: (extra: Readonly<Record<string, string | number>> = {}): string => {
    const params = new URLSearchParams({ source: CONTACT_SOURCE, kind: "call" });
    for (const [key, value] of Object.entries(extra)) params.set(key, String(value));
    return `/contact?${params.toString()}`;
  },
  bundle: (id: BundleId): string => `/contact?source=${CONTACT_SOURCE}&kind=bundle&bundle=${id}`,
  services: (ids: readonly ServiceId[]): string =>
    `/contact?source=${CONTACT_SOURCE}&kind=services&services=${ids.join(",")}`,
};

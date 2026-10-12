// Price labels for the services page. Every number comes from the offer
// catalog (@/lib/offer) — nothing here is typed by hand.
import { formatEur, perMonth, services, type Bundle, type Locale, type ServiceItem } from "@/lib/offer";

const ONE_TIME_LABEL: Record<Locale, string> = { bg: "еднократно", en: "one-time" };
const FROM_LABEL: Record<Locale, string> = { bg: "от", en: "from" };
const PER_HOUR: Record<Locale, string> = { bg: "/час", en: "/hr" };

export interface PriceParts {
  /** Main figure, e.g. "390 €" or "от 1 690 €". */
  readonly primary: string;
  /** Qualifier after the main figure, e.g. "еднократно", "/мес." or "+ 119 €/мес.". */
  readonly secondary: string;
}

/** Split label so the figure and the qualifier can be styled separately. */
export function servicePriceParts(svc: ServiceItem, locale: Locale): PriceParts {
  const { oneTime, monthly, isFrom, unit } = svc.price;

  if (unit === "hour" && oneTime !== undefined) {
    return { primary: formatEur(oneTime, locale), secondary: PER_HOUR[locale] };
  }
  if (oneTime !== undefined && monthly !== undefined) {
    return { primary: formatEur(oneTime, locale), secondary: `+ ${formatEur(monthly, locale)}${perMonth(locale)}` };
  }
  if (oneTime !== undefined) {
    const figure = formatEur(oneTime, locale);
    return { primary: isFrom ? `${FROM_LABEL[locale]} ${figure}` : figure, secondary: ONE_TIME_LABEL[locale] };
  }
  if (monthly !== undefined) {
    return { primary: formatEur(monthly, locale), secondary: perMonth(locale) };
  }
  return { primary: "", secondary: "" };
}

/** "1 990 € + 239 €/мес." — a bundle's package price on one line. */
export function bundlePriceLabel(bundle: Bundle, locale: Locale): string {
  return `${formatEur(bundle.price.oneTime, locale)} + ${formatEur(bundle.price.monthly, locale)}${perMonth(locale)}`;
}

/**
 * Lowest one-time price of a service you can buy on its own: excludes
 * hourly work, quote-only ("from") prices and add-ons that need another
 * service first.
 */
export const lowestStandaloneOneTime: number = Math.min(
  ...services.flatMap((s) =>
    s.price.oneTime !== undefined && !s.price.unit && !s.price.isFrom && !s.requiresAnyOf
      ? [s.price.oneTime]
      : [],
  ),
);

export const VAT_NOTE: Record<Locale, string> = {
  bg: "Цените са без ДДС.",
  en: "Prices exclude VAT.",
};

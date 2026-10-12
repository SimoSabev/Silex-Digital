import type { Locale, ServiceItem } from "@/lib/offer";
import { servicePriceParts } from "./prices";

/** "390 € + 119 €/мес." with the figure emphasized. Suffixes like "/мес." attach without a space. */
export default function PriceTag({
  svc,
  locale,
  className = "",
}: {
  svc: ServiceItem;
  locale: Locale;
  className?: string;
}) {
  const { primary, secondary } = servicePriceParts(svc, locale);
  const suffix = secondary.startsWith("/") ? secondary : ` ${secondary}`;
  return (
    <p className={`nums whitespace-nowrap ${className}`}>
      <span className="text-body font-bold text-[var(--color-text-on-dark)]">{primary}</span>
      <span className="text-caption text-[var(--color-text-on-dark)]/45">{suffix}</span>
    </p>
  );
}

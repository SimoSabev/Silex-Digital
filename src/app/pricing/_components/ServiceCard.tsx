import Link from "next/link";
import { ArrowRight, Check, Clock, Plus } from "lucide-react";
import { formatEur, getService, perMonth, type Locale, type ServiceItem } from "@/lib/offer";
import { deliveryLabel, isQuoteOnly, servicesContactHref, tr } from "./offer-utils";

type Props = {
  service: ServiceItem;
  locale: Locale;
  isSelected: boolean;
  /** Selected service that already includes this one (e.g. brand identity → logo). */
  includedIn?: ServiceItem;
  onToggle: () => void;
};

function PriceBlock({ service, locale }: { service: ServiceItem; locale: Locale }) {
  const { oneTime, monthly, isFrom, unit } = service.price;
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      {oneTime !== undefined && (
        <p className="flex items-baseline gap-1.5">
          <span className="nums whitespace-nowrap font-display text-h3 text-[var(--text-main)]">
            {isFrom && <span className="text-small font-body font-semibold text-[var(--text-sub)]">{tr(locale, "от ", "from ")}</span>}
            {formatEur(oneTime, locale)}
          </span>
          <span className="text-caption text-[var(--text-muted)]">
            {unit === "hour" ? tr(locale, "/час", "/hour") : tr(locale, "еднократно", "one-time")}
          </span>
        </p>
      )}
      {monthly !== undefined && (
        <p className="flex items-baseline gap-1.5">
          {oneTime !== undefined && <span className="text-small text-[var(--text-muted)]">+</span>}
          <span className="nums whitespace-nowrap font-display text-h3 text-[var(--text-main)]">
            {formatEur(monthly, locale)}
          </span>
          <span className="text-caption text-[var(--text-muted)]">{perMonth(locale)}</span>
        </p>
      )}
    </div>
  );
}

function requirementText(service: ServiceItem, locale: Locale): string | null {
  const req = service.requiresAnyOf;
  if (!req) return null;
  const names = req.map((id) => `„${getService(id).name[locale]}“`).join(tr(locale, " или ", " or "));
  return tr(locale, `Добавя се към ${names}.`, `Added on top of ${names}.`);
}

export default function ServiceCard({ service, locale, isSelected, includedIn, onToggle }: Props) {
  const quoteOnly = isQuoteOnly(service);
  const requirement = requirementText(service, locale);
  const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  return (
    <article
      className={`flex flex-col rounded-[20px] border p-6 transition-colors ${
        isSelected
          ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_4%,var(--bg-card))]"
          : "border-[var(--border)] bg-[var(--bg-card)]"
      }`}
    >
      <h3 className="mb-2 text-h4 text-[var(--text-main)]">{service.name[locale]}</h3>
      <p className="mb-4 text-small text-[var(--text-sub)]">{service.summary[locale]}</p>

      <ul className="mb-5 space-y-1.5">
        {service.included[locale].map((item) => (
          <li key={item} className="flex items-start gap-2 text-small text-[var(--text-main)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-3">
        <PriceBlock service={service} locale={locale} />
        <p className="flex items-center gap-2 text-caption text-[var(--text-muted)]">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {service.delivery
            ? deliveryLabel(service.delivery, locale)
            : quoteOnly
              ? tr(locale, "По договаряне", "As agreed")
              : tr(locale, "Месечна услуга, без минимален срок", "Monthly service, no minimum term")}
        </p>
        {service.note && <p className="text-caption text-[var(--text-sub)]">{service.note[locale]}</p>}
        {requirement && <p className="text-caption text-[var(--text-sub)]">{requirement}</p>}

        {quoteOnly ? (
          <Link href={servicesContactHref([service.id])} className={`btn-secondary w-full ${focusRing}`}>
            {tr(locale, "Поискайте оферта", "Request a quote")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : includedIn ? (
          <button type="button" disabled className="btn-secondary w-full cursor-not-allowed opacity-70">
            <Check className="h-4 w-4" aria-hidden="true" />
            {tr(locale, `Включено в „${includedIn.name.bg}“`, `Included in “${includedIn.name.en}”`)}
          </button>
        ) : (
          <button
            type="button"
            aria-pressed={isSelected}
            onClick={onToggle}
            className={`w-full ${isSelected ? "btn-primary" : "btn-secondary"} ${focusRing}`}
          >
            {isSelected ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            {isSelected ? tr(locale, "Добавено", "Added") : tr(locale, "Добавете", "Add")}
            <span className="sr-only">{service.name[locale]}</span>
          </button>
        )}
      </div>
    </article>
  );
}

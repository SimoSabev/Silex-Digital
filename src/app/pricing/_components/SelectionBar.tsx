import Link from "next/link";
import { ArrowRight, Info, X } from "lucide-react";
import { formatEur, perMonth, type BundleId, type Locale, type ServiceId } from "@/lib/offer";
import {
  findBundleHint,
  selectionTotals,
  servicesContactHref,
  servicesCountLabel,
  totalsLabel,
  tr,
  unmetRequirements,
} from "./offer-utils";

type Props = {
  selected: readonly ServiceId[];
  locale: Locale;
  onClear: () => void;
  onSwitchToBundle: (id: BundleId) => void;
};

const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-10)]";

export default function SelectionBar({ selected, locale, onClear, onSwitchToBundle }: Props) {
  if (selected.length === 0) return null;

  const totals = selectionTotals(selected);
  const hint = findBundleHint(selected);
  const unmet = unmetRequirements(selected);
  const eur = (n: number) => formatEur(n, locale);

  return (
    <div
      role="region"
      aria-label={tr(locale, "Избрани услуги", "Selected services")}
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 safe-area-pb sm:px-6"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)] shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.45)]">
        {hint && (
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[color-mix(in_srgb,var(--accent)_35%,transparent)] px-4 py-2.5 sm:px-5 sm:py-3">
            <p className="nums text-caption sm:text-small">
              {tr(
                locale,
                `Пакетът „${hint.bundle.name.bg}“ съдържа ${hint.overlap} от избраните и е с ${eur(hint.math.saveOneTime)} еднократно и ${eur(hint.math.saveMonthly)}${perMonth(locale)} по-евтин от същите услуги поотделно.`,
                `The “${hint.bundle.name.en}” bundle contains ${hint.overlap} of your picks and is ${eur(hint.math.saveOneTime)} one-time and ${eur(hint.math.saveMonthly)}${perMonth(locale)} cheaper than the same services separately.`,
              )}
            </p>
            <button
              type="button"
              onClick={() => onSwitchToBundle(hint.bundle.id)}
              className={`shrink-0 whitespace-nowrap rounded-lg border border-white/30 px-2.5 py-1.5 text-caption font-semibold sm:px-3 sm:text-small transition-colors hover:bg-white/10 ${FOCUS_RING}`}
            >
              {tr(locale, "Вижте пакета", "See the bundle")}
            </button>
          </div>
        )}

        {unmet.length > 0 && (
          <ul className="space-y-1 border-b border-white/10 px-4 py-2.5 text-caption text-[var(--color-text-on-dark)]/80 sm:px-5">
            {unmet.map(({ service, options }) => (
              <li key={service.id} className="flex items-start gap-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {tr(
                  locale,
                  `„${service.name.bg}“ се добавя към ${options.map((o) => `„${o.name.bg}“`).join(" или ")}.`,
                  `“${service.name.en}” is added on top of ${options.map((o) => `“${o.name.en}”`).join(" or ")}.`,
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
          <p className="nums text-caption sm:text-small" aria-live="polite">
            <strong className="font-semibold">{servicesCountLabel(selected.length, locale)}</strong>
            <span className="text-[var(--color-text-on-dark)]/70">
              {" "}
              · {totalsLabel(totals, locale)} · {tr(locale, "без ДДС", "excl. VAT")}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onClear}
              className={`inline-flex items-center gap-1 rounded-lg p-2 text-small text-[var(--color-text-on-dark)]/70 transition-colors hover:bg-white/10 hover:text-[var(--color-text-on-dark)] sm:px-3 ${FOCUS_RING}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{tr(locale, "Изчистете", "Clear")}</span>
            </button>
            <Link href={servicesContactHref(selected)} className={`btn-primary flex-1 whitespace-nowrap sm:flex-none ${FOCUS_RING}`}>
              {tr(locale, "Поискайте оферта", "Request a quote")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

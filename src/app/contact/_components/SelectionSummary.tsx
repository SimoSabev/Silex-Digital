import Link from "next/link";
import { X } from "lucide-react";
import { bundles, formatEur, getBundle, getBundleMath, getService, perMonth, type BundleId, type Locale, type ServiceId } from "@/lib/offer";
import {
  deliveryLabel,
  selectionTotals,
  servicePriceLabel,
  totalsLabel,
  tr,
} from "@/app/pricing/_components/offer-utils";

const LABEL = "mb-2 block text-small font-semibold text-[var(--text-sub)]";
const BOX = "rounded-xl border border-[var(--border)] bg-[var(--bg-section)] p-4 text-small";

type BundleProps = {
  bundleId: BundleId;
  onBundleChange: (id: BundleId) => void;
  locale: Locale;
};

export function BundleSummary({ bundleId, onBundleChange, locale }: BundleProps) {
  const bundle = getBundle(bundleId);
  const math = getBundleMath(bundle);
  const eur = (n: number) => formatEur(n, locale);
  const mo = perMonth(locale);

  return (
    <div className="md:col-span-2">
      <label htmlFor="bundle" className={LABEL}>
        {tr(locale, "Пакет", "Bundle")}
      </label>
      <select
        id="bundle"
        name="bundle"
        value={bundleId}
        onChange={(e) => {
          const next = bundles.find((b) => b.id === e.target.value);
          if (next) onBundleChange(next.id);
        }}
        className="input mb-3"
      >
        {bundles.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name[locale]}
          </option>
        ))}
      </select>
      <div className={`${BOX} nums space-y-1`}>
        <p className="flex flex-wrap justify-between gap-2">
          <span className="text-[var(--text-sub)]">{tr(locale, "Еднократно", "One-time")}</span>
          <span>
            <s className="mr-2 text-[var(--text-muted)]">{eur(math.listOneTime)}</s>
            <strong className="text-[var(--text-main)]">{eur(bundle.price.oneTime)}</strong>
          </span>
        </p>
        <p className="flex flex-wrap justify-between gap-2">
          <span className="text-[var(--text-sub)]">
            {tr(locale, "Месечно", "Monthly")} · {tr(locale, `мин. ${bundle.minTermMonths} мес.`, `min. ${bundle.minTermMonths} mo`)}
          </span>
          <span>
            <s className="mr-2 text-[var(--text-muted)]">
              {eur(math.listMonthly)}
              {mo}
            </s>
            <strong className="text-[var(--text-main)]">
              {eur(bundle.price.monthly)}
              {mo}
            </strong>
          </span>
        </p>
        <p className="text-caption text-[var(--text-muted)]">
          {tr(locale, "Изработка:", "Delivery:")} {deliveryLabel(bundle.delivery, locale)} ·{" "}
          {tr(locale, "Цени без ДДС", "Prices excl. VAT")} ·{" "}
          <Link href={`/pricing#bundle-${bundle.id}`} className="text-[var(--accent)] underline-offset-2 hover:underline">
            {tr(locale, "Вижте разбивката", "See the breakdown")}
          </Link>
        </p>
      </div>
    </div>
  );
}

type ServicesProps = {
  services: readonly ServiceId[];
  onRemove: (id: ServiceId) => void;
  locale: Locale;
};

export function ServicesSummary({ services, onRemove, locale }: ServicesProps) {
  if (services.length === 0) {
    return (
      <div className={`${BOX} md:col-span-2`}>
        {tr(locale, "Не сте избрали услуги. ", "You haven't picked any services. ")}
        <Link href="/pricing#services" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">
          {tr(locale, "Изберете от ценоразписа", "Pick from the price list")}
        </Link>
      </div>
    );
  }

  const hasFromPrice = services.some((id) => getService(id).price.isFrom);

  return (
    <div className="md:col-span-2">
      <p className={LABEL}>{tr(locale, "Избрани услуги", "Selected services")}</p>
      <div className={BOX}>
        <ul className="divide-y divide-[var(--border)]">
          {services.map((id) => {
            const svc = getService(id);
            return (
              <li key={id} className="flex items-center justify-between gap-3 py-2 first:pt-0">
                <span className="text-[var(--text-main)]">{svc.name[locale]}</span>
                <span className="flex items-center gap-2">
                  <span className="nums whitespace-nowrap text-[var(--text-sub)]">{servicePriceLabel(svc, locale)}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(id)}
                    aria-label={tr(locale, `Премахнете ${svc.name.bg}`, `Remove ${svc.name.en}`)}
                    className="rounded-md p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="nums mt-2 border-t border-[var(--border)] pt-2 font-semibold text-[var(--text-main)]">
          {tr(locale, "Ориентировъчно: ", "Estimate: ")}
          {totalsLabel(selectionTotals(services), locale)}
        </p>
        <p className="mt-1 text-caption text-[var(--text-muted)]">
          {tr(locale, "Цени без ДДС.", "Prices excl. VAT.")}
          {hasFromPrice &&
            tr(locale, " Цените „от“ уточняваме след разговор.", " “From” prices are confirmed after a call.")}
        </p>
      </div>
    </div>
  );
}

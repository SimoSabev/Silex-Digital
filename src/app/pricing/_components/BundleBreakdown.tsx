import { formatEur, perMonth, type Bundle, type BundleMath, type Locale } from "@/lib/offer";
import { bundleLineCosts, lineName, tr } from "./offer-utils";

type Props = {
  bundle: Bundle;
  math: BundleMath;
  locale: Locale;
};

type GroupProps = {
  title: string;
  rows: readonly { key: string; label: string; amount: string }[];
  listTotal: string;
  discount: string;
  price: string;
  locale: Locale;
};

function Group({ title, rows, listTotal, discount, price, locale }: GroupProps) {
  return (
    <div>
      <h4 className="mb-2 eyebrow text-[var(--accent)]">{title}</h4>
      <dl className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-baseline justify-between gap-4 text-small text-[var(--text-sub)]">
            <dt>{row.label}</dt>
            <dd className="nums shrink-0 whitespace-nowrap text-[var(--text-main)]">{row.amount}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-t border-[var(--border)] pt-1.5 text-small text-[var(--text-sub)]">
          <dt>{tr(locale, "Поотделно", "Separately")}</dt>
          <dd className="nums whitespace-nowrap">{listTotal}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 text-small font-semibold text-[var(--color-success)]">
          <dt>{tr(locale, "Отстъпка на пакета", "Bundle discount")}</dt>
          <dd className="nums whitespace-nowrap">−{discount}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 text-small font-bold text-[var(--text-main)]">
          <dt>{tr(locale, "Цена в пакета", "Bundle price")}</dt>
          <dd className="nums whitespace-nowrap">{price}</dd>
        </div>
      </dl>
    </div>
  );
}

/** Every line of the bundle with its separate price, then the discount. */
export default function BundleBreakdown({ bundle, math, locale }: Props) {
  const lines = bundleLineCosts(bundle);
  const mo = perMonth(locale);
  const eur = (n: number) => formatEur(n, locale);

  const oneTimeRows = lines
    .filter((l) => l.oneTime > 0)
    .map((l) => ({ key: l.service.id, label: lineName(l, locale), amount: eur(l.oneTime) }));
  const monthlyRows = lines
    .filter((l) => l.monthly > 0)
    .map((l) => ({ key: l.service.id, label: l.service.name[locale], amount: `${eur(l.monthly)}${mo}` }));

  return (
    <div className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-section)] p-4 sm:p-5">
      <Group
        title={tr(locale, "Еднократно", "One-time")}
        rows={oneTimeRows}
        listTotal={eur(math.listOneTime)}
        discount={eur(math.saveOneTime)}
        price={eur(bundle.price.oneTime)}
        locale={locale}
      />
      <Group
        title={tr(locale, "Месечно", "Monthly")}
        rows={monthlyRows}
        listTotal={`${eur(math.listMonthly)}${mo}`}
        discount={`${eur(math.saveMonthly)}${mo}`}
        price={`${eur(bundle.price.monthly)}${mo}`}
        locale={locale}
      />
      <p className="border-t border-[var(--border)] pt-3 text-small font-semibold text-[var(--text-main)]">
        {tr(locale, "Отстъпка на пакета", "Bundle discount")}:{" "}
        <span className="nums">
          −{eur(math.saveOneTime)} {tr(locale, "еднократно", "one-time")} · −{eur(math.saveMonthly)}
          {mo}
        </span>
      </p>
    </div>
  );
}

import type { Bundle, BundleMath, Locale, ServiceId, ServiceItem } from "./types";

const pct = (save: number, list: number): number => (list > 0 ? Math.floor((save / list) * 100) : 0);

export function computeBundleMath(
  bundle: Bundle,
  catalog: ReadonlyMap<ServiceId, ServiceItem>,
): BundleMath {
  const totals = bundle.lines.reduce(
    (acc, line) => {
      const svc = catalog.get(line.service);
      if (!svc) throw new Error(`Bundle "${bundle.id}": unknown service "${line.service}"`);
      if (svc.price.isFrom) throw new Error(`Bundle "${bundle.id}": quote-only service "${svc.id}"`);
      const oneTime = svc.price.oneTime ?? 0;
      const monthly = svc.price.monthly ?? 0;
      return {
        oneTime: acc.oneTime + ((line.oneTime ?? true) ? oneTime : 0) + (line.prepaidMonths ?? 0) * monthly,
        monthly: acc.monthly + ((line.monthly ?? true) ? monthly : 0),
      };
    },
    { oneTime: 0, monthly: 0 },
  );

  const saveOneTime = totals.oneTime - bundle.price.oneTime;
  const saveMonthly = totals.monthly - bundle.price.monthly;
  const firstYearList = totals.oneTime + totals.monthly * 12;
  const firstYearPrice = bundle.price.oneTime + bundle.price.monthly * 12;

  return {
    listOneTime: totals.oneTime,
    listMonthly: totals.monthly,
    saveOneTime,
    saveMonthly,
    pctOneTime: pct(saveOneTime, totals.oneTime),
    pctMonthly: pct(saveMonthly, totals.monthly),
    firstYearList,
    firstYearPrice,
    firstYearSave: firstYearList - firstYearPrice,
    pctFirstYear: pct(firstYearList - firstYearPrice, firstYearList),
  };
}

/** "1 990 €" (bg) / "€1,990" (en). Non-breaking space keeps "€" on the number's line. */
export function formatEur(amount: number, locale: Locale): string {
  if (locale === "bg") {
    // bg-BG Intl omits the separator for 4-digit numbers; group every 3 digits explicitly.
    const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${digits} €`;
  }
  return `€${amount.toLocaleString("en-US")}`;
}

export const perMonth = (locale: Locale): string => (locale === "bg" ? "/мес." : "/mo");

import { Check, Minus } from "lucide-react";
import { bundles, formatEur, getBundleMath, perMonth, type Bundle, type Locale, type ServiceItem } from "@/lib/offer";
import { bundleCoverage, bundleServices, monthsLabel, servicePriceLabel, tr } from "./offer-utils";

const STICKY_CELL =
  "sticky left-0 z-10 bg-[var(--bg-card)] shadow-[1px_0_0_var(--border)] text-left";

function Cell({ bundle, service, locale }: { bundle: Bundle; service: ServiceItem; locale: Locale }) {
  const line = bundle.lines.find((l) => l.service === service.id);
  if (line?.prepaidMonths && line.monthly === false) {
    return (
      <span className="text-caption font-semibold text-[var(--text-main)]">
        {monthsLabel(line.prepaidMonths, locale)}
      </span>
    );
  }
  if (line) {
    return (
      <>
        <Check className="mx-auto h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
        <span className="sr-only">{tr(locale, "Включено", "Included")}</span>
      </>
    );
  }
  const via = bundleCoverage(bundle, service.id);
  if (via) {
    return (
      <span className="text-caption text-[var(--text-sub)]">
        {tr(locale, "в", "in")} „{via.name[locale]}“
      </span>
    );
  }
  return (
    <>
      <Minus className="mx-auto h-4 w-4 text-[var(--text-muted)] opacity-60" aria-hidden="true" />
      <span className="sr-only">{tr(locale, "Не е включено", "Not included")}</span>
    </>
  );
}

export default function ComparisonMatrix({ locale }: { locale: Locale }) {
  const mo = perMonth(locale);
  const eur = (n: number) => formatEur(n, locale);
  const maths = bundles.map((b) => ({ bundle: b, math: getBundleMath(b) }));

  return (
    <section aria-labelledby="compare-title" className="relative z-10 mb-28">
      <div className="mb-8 max-w-2xl">
        <h2 id="compare-title" className="mb-3 text-h2 text-[var(--text-main)]">
          {tr(locale, "Какво има във всеки пакет", "What's in each bundle")}
        </h2>
        <p className="text-body text-[var(--text-sub)]">
          {tr(
            locale,
            "Последната колона показва цената на всяка услуга, ако я купите сама.",
            "The last column shows the price of each service bought on its own.",
          )}
        </p>
        <p className="mt-2 text-caption text-[var(--text-muted)] md:hidden">
          {tr(locale, "Плъзнете таблицата настрани, за да видите всички колони.", "Swipe the table sideways to see every column.")}
        </p>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] shadow-apple">
        <div className="scroll-hint-x overflow-x-auto" tabIndex={0} role="region" aria-labelledby="compare-title">
          <table className="w-full min-w-[760px] border-collapse text-small">
            <caption className="sr-only">
              {tr(locale, "Сравнение на услугите в пакетите", "Comparison of services across bundles")}
            </caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className={`${STICKY_CELL} w-[8.5rem] min-w-[8.5rem] p-3 sm:w-auto sm:min-w-[11rem] sm:p-4 eyebrow text-[var(--text-muted)]`}>
                  {tr(locale, "Услуга", "Service")}
                </th>
                {bundles.map((b) => (
                  <th
                    key={b.id}
                    scope="col"
                    className={`p-4 text-center font-display text-small font-bold ${b.highlight ? "bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] text-[var(--accent)]" : "text-[var(--text-main)]"}`}
                  >
                    {b.name[locale]}
                  </th>
                ))}
                <th scope="col" className="p-4 text-right eyebrow text-[var(--text-muted)]">
                  {tr(locale, "Поотделно", "Separately")}
                </th>
              </tr>
            </thead>
            <tbody>
              {bundleServices.map((svc) => (
                <tr key={svc.id} className="border-b border-[var(--border)] last:border-b-0">
                  <th scope="row" className={`${STICKY_CELL} p-3 font-medium sm:p-4 text-[var(--text-main)]`}>
                    {svc.name[locale]}
                  </th>
                  {bundles.map((b) => (
                    <td
                      key={b.id}
                      className={`p-4 text-center ${b.highlight ? "bg-[color-mix(in_srgb,var(--accent)_4%,transparent)]" : ""}`}
                    >
                      <Cell bundle={b} service={svc} locale={locale} />
                    </td>
                  ))}
                  <td className="nums whitespace-nowrap p-4 text-right text-[var(--text-sub)]">
                    {servicePriceLabel(svc, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-[var(--border)]">
              <tr>
                <th scope="row" className={`${STICKY_CELL} p-3 font-semibold sm:p-4 text-[var(--text-main)]`}>
                  {tr(locale, "Еднократно", "One-time")}
                </th>
                {maths.map(({ bundle, math }) => (
                  <td key={bundle.id} className="nums p-4 text-center">
                    <s className="block text-caption text-[var(--text-muted)]">{eur(math.listOneTime)}</s>
                    <span className="font-bold text-[var(--text-main)]">{eur(bundle.price.oneTime)}</span>
                  </td>
                ))}
                <td aria-hidden="true" />
              </tr>
              <tr>
                <th scope="row" className={`${STICKY_CELL} p-3 font-semibold sm:p-4 text-[var(--text-main)]`}>
                  {tr(locale, "Месечно", "Monthly")}
                </th>
                {maths.map(({ bundle, math }) => (
                  <td key={bundle.id} className="nums p-4 text-center">
                    <s className="block text-caption text-[var(--text-muted)]">
                      {eur(math.listMonthly)}
                      {mo}
                    </s>
                    <span className="font-bold text-[var(--text-main)]">
                      {eur(bundle.price.monthly)}
                      {mo}
                    </span>
                  </td>
                ))}
                <td aria-hidden="true" />
              </tr>
              <tr>
                <th scope="row" className={`${STICKY_CELL} p-3 font-semibold sm:p-4 text-[var(--text-main)]`}>
                  {tr(locale, "Спестявате първата година", "First-year saving")}
                </th>
                {maths.map(({ bundle, math }) => (
                  <td key={bundle.id} className="nums p-4 text-center font-bold text-[var(--color-success)]">
                    {eur(math.firstYearSave)}
                  </td>
                ))}
                <td aria-hidden="true" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

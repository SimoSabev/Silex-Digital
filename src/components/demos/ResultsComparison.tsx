"use client";

import type { Locale } from "@/lib/i18n";
import type { DemoComparisonMetric } from "@/types/demo";
import DemoMetricCard from "@/components/demos/DemoMetricCard";

interface ResultsComparisonProps {
  locale: Locale;
  metrics: DemoComparisonMetric[];
}

export default function ResultsComparison({
  locale,
  metrics,
}: ResultsComparisonProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
      <h4 className="mb-3 text-sm font-semibold text-[var(--text-main)]">
        {locale === "bg" ? "Преди vs След" : "Before vs After"}
      </h4>
      <div className="grid gap-3 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="space-y-2">
            <DemoMetricCard
              locale={locale}
              label={metric.label}
              value={`${locale === "bg" ? "Преди" : "Before"}: ${metric.before}`}
            />
            <DemoMetricCard
              locale={locale}
              label={metric.label}
              value={`${locale === "bg" ? "След" : "After"}: ${metric.after}`}
              tone="positive"
            />
            {metric.delta ? (
              <p className="text-xs font-semibold text-[var(--accent)]">
                {locale === "bg" ? "Промяна" : "Delta"}: {metric.delta}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

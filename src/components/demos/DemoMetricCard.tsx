"use client";

import type { Locale } from "@/lib/i18n";

interface DemoMetricCardProps {
  locale: Locale;
  label: { bg: string; en: string };
  value: string;
  tone?: "neutral" | "positive";
}

export default function DemoMetricCard({
  locale,
  label,
  value,
  tone = "neutral",
}: DemoMetricCardProps) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        tone === "positive"
          ? "border-[var(--accent)]/30 bg-[var(--accent)]/10"
          : "border-[var(--border)] bg-[var(--bg-section)]"
      }`}
    >
      <p className="text-xs text-[var(--text-sub)]">{label[locale]}</p>
      <p className="mt-1 text-lg font-semibold text-[var(--text-main)]">{value}</p>
    </div>
  );
}

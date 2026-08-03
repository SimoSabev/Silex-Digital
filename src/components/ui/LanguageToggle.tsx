"use client";

import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "bg" ? "en" : "bg")}
      className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--bg-section)]"
      aria-label={locale === "bg" ? "Switch to English" : "Превключи на български"}
    >
      <span className={locale === "bg" ? "font-bold text-[var(--accent)]" : "text-[var(--text-muted)]"}>BG</span>
      <span className="text-[var(--text-muted)]">|</span>
      <span className={locale === "en" ? "font-bold text-[var(--accent)]" : "text-[var(--text-muted)]"}>EN</span>
    </button>
  );
}

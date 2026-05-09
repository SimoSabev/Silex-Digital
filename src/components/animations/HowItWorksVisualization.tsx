"use client";

import { useState, useEffect } from "react";
import { useI18n, type Locale } from "@/lib/i18n";

type StepDef = {
  icon: string;
  color: "blue" | "green" | "orange";
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
};

const STEPS: readonly StepDef[] = [
  { icon: "💬", color: "blue",   title: { bg: "Клиентът пише",           en: "Client reaches out"       }, detail: { bg: "Съобщение, обаждане, форма или WhatsApp", en: "Message, call, form or WhatsApp"     } },
  { icon: "⚡", color: "blue",   title: { bg: "Системата улавя",          en: "System captures it"       }, detail: { bg: "Автоматично разпознаване на намерение",  en: "Automatic intent recognition"        } },
  { icon: "🤖", color: "green",  title: { bg: "Мигновен отговор",         en: "Instant reply"            }, detail: { bg: "Персонализиран AI отговор за секунди",   en: "Personalised AI reply in seconds"    } },
  { icon: "🎯", color: "green",  title: { bg: "Лийд квалифициран",        en: "Lead qualified"           }, detail: { bg: "Автоматично оценяване и категоризиране", en: "Automatic scoring and categorisation"} },
  { icon: "🔔", color: "orange", title: { bg: "Получаваш нотификация",    en: "You get notified"         }, detail: { bg: "Dashboard + SMS + Email",                en: "Dashboard + SMS + Email"             } },
  { icon: "💰", color: "green",  title: { bg: "Конверсия",                en: "Conversion"               }, detail: { bg: "Резервация потвърдена за 47 секунди",    en: "Booking confirmed in 47 seconds"     } },
] as const;

const colorConfig: Record<StepDef["color"], { dot: string; bg: string; border: string; text: string; subtext: string }> = {
  blue: {
    dot:     "bg-blue-500",
    bg:      "bg-blue-50 dark:bg-blue-900/20",
    border:  "border-blue-200 dark:border-blue-800",
    text:    "text-blue-800 dark:text-blue-200",
    subtext: "text-blue-600 dark:text-blue-400",
  },
  green: {
    dot:     "bg-emerald-500",
    bg:      "bg-emerald-50 dark:bg-emerald-900/20",
    border:  "border-emerald-200 dark:border-emerald-800",
    text:    "text-emerald-800 dark:text-emerald-200",
    subtext: "text-emerald-600 dark:text-emerald-400",
  },
  orange: {
    dot:     "bg-orange-500",
    bg:      "bg-orange-50 dark:bg-orange-900/20",
    border:  "border-orange-200 dark:border-orange-800",
    text:    "text-orange-800 dark:text-orange-200",
    subtext: "text-orange-600 dark:text-orange-400",
  },
};

export default function HowItWorksVisualization() {
  const { locale } = useI18n();
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2200);
    return () => clearInterval(t);
  }, [resetKey]);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[var(--border)] via-[var(--border)] to-transparent" aria-hidden="true" />

        <div className="space-y-1">
          {STEPS.map((step, i) => {
            const cfg = colorConfig[step.color];
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => { setActive(i); setResetKey((k) => k + 1); }}
                aria-pressed={isActive}
                className="group relative w-full text-left focus:outline-none"
              >
                <div className={`flex items-start gap-4 rounded-xl border px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? `${cfg.bg} ${cfg.border} shadow-sm`
                    : "border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-card)]"
                }`}>
                  {/* Step dot + icon */}
                  <div className="relative flex-none">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? `${cfg.bg} ${cfg.border}`
                        : "border-[var(--border)] bg-[var(--bg-page)]"
                    }`}>
                      <span className={`text-base leading-none transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-40"}`}>
                        {step.icon}
                      </span>
                    </div>
                    {isActive && (
                      <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ${cfg.dot} ring-2 ring-[var(--bg-page)]`} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1 pt-1">
                    <p className={`text-sm font-semibold leading-snug transition-all duration-300 ${
                      isActive ? cfg.text : "text-[var(--text-sub)] opacity-60 group-hover:opacity-90"
                    }`}>
                      {step.title[locale]}
                    </p>
                    {isActive && (
                      <p className={`mt-1 text-xs leading-relaxed ${cfg.subtext}`}>
                        {step.detail[locale]}
                      </p>
                    )}
                  </div>

                  {/* Step counter */}
                  <span className={`flex-none pt-1 text-xs font-bold transition-opacity duration-300 ${
                    isActive ? cfg.subtext : "text-[var(--text-muted)] opacity-40"
                  }`}>
                    {i + 1}/{STEPS.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i === active ? "bg-[var(--lime)]" : i < active ? "bg-[var(--lime)]/40" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
        <p className="flex-none text-xs font-semibold text-[var(--text-muted)]">
          {locale === "bg" ? "47 сек." : "47 sec."}
        </p>
      </div>
    </div>
  );
}

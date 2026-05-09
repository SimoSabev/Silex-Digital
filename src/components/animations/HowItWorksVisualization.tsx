"use client";

import { useState, useEffect } from "react";
import { useI18n, type Locale } from "@/lib/i18n";

const STEPS = [
  { icon: "💬", color: "blue",   title: { bg: "Клиентът пише",           en: "Client reaches out"       }, detail: { bg: "Съобщение, обаждане, форма или WhatsApp", en: "Message, call, form or WhatsApp"              } },
  { icon: "⚡", color: "blue",   title: { bg: "Системата улавя",          en: "System captures it"       }, detail: { bg: "Автоматично разпознаване на намерение",  en: "Automatic intent recognition"                 } },
  { icon: "🤖", color: "green",  title: { bg: "Мигновен отговор",         en: "Instant reply"            }, detail: { bg: "Персонализиран AI отговор за секунди",   en: "Personalised AI reply in seconds"             } },
  { icon: "🎯", color: "green",  title: { bg: "Лийд квалифициран",        en: "Lead qualified"           }, detail: { bg: "Автоматично оценяване и категоризиране", en: "Automatic scoring and categorisation"         } },
  { icon: "🔔", color: "orange", title: { bg: "Получаваш нотификация",    en: "You get notified"         }, detail: { bg: "Dashboard + SMS + Email",                en: "Dashboard + SMS + Email"                      } },
  { icon: "💰", color: "green",  title: { bg: "Конверсия",                en: "Conversion"               }, detail: { bg: "Резервация потвърдена за 47 секунди",    en: "Booking confirmed in 47 seconds"              } },
] as const;

const ringColor: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  green:  "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  orange: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
};

export default function HowItWorksVisualization() {
  const { locale } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-2">
      {STEPS.map((step, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`w-full flex items-start gap-4 p-3 rounded-xl border text-left transition-all duration-400 ${
            i === active
              ? (ringColor[step.color] ?? ringColor.blue)
              : "border-transparent opacity-40 hover:opacity-70"
          }`}
        >
          <span className="text-xl leading-none mt-0.5">{step.icon}</span>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-snug">{step.title[locale as Locale]}</p>
            {i === active && (
              <p className="text-xs mt-0.5 opacity-80 leading-snug">{step.detail[locale as Locale]}</p>
            )}
          </div>
          <span className="ml-auto text-xs font-bold opacity-50 shrink-0 mt-0.5">{i + 1}/6</span>
        </button>
      ))}
      <p className="text-center text-xs text-[var(--text-muted)] pt-2 font-medium">
        {locale === "bg" ? "Целият процес: 47 секунди" : "Full journey: 47 seconds"}
      </p>
    </div>
  );
}

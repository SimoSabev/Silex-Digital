"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

type Locale = "bg" | "en";

const SCENARIOS = [
  {
    id: "message",
    tab:   { bg: "Изпуснато съобщение", en: "Missed message" },
    steps: [
      { icon: "💬", delay: 0,    color: "slate",  label: { bg: 'Клиент: "Имате ли свободна дата?"', en: 'Client: "Do you have availability?"' } },
      { icon: "⏳", delay: 900,  color: "yellow", label: { bg: "1 час... 3 часа... 5 часа без отговор", en: "1 hour… 3 hours… 5 hours with no reply" } },
      { icon: "😤", delay: 1900, color: "red",    label: { bg: "Клиентът се обажда на конкурента", en: "Client calls your competitor" } },
      { icon: "🏆", delay: 2900, color: "red",    label: { bg: "Конкурентът спечелва клиента", en: "Competitor wins the client" } },
    ],
  },
  {
    id: "call",
    tab:   { bg: "Пропуснато обаждане", en: "Missed call" },
    steps: [
      { icon: "📞", delay: 0,    color: "slate",  label: { bg: "Телефонът звъни...", en: "Phone is ringing…" } },
      { icon: "🔕", delay: 900,  color: "yellow", label: { bg: "Пропуснато обаждане — пак и пак", en: "Missed call — again and again" } },
      { icon: "📱", delay: 1900, color: "red",    label: { bg: "Клиентът пише на конкурента", en: "Client messages a competitor" } },
      { icon: "💸", delay: 2900, color: "red",    label: { bg: "-1 клиент | -150 лв приход", en: "-1 client | -150 BGN revenue lost" } },
    ],
  },
  {
    id: "visitor",
    tab:   { bg: "Изгубени посетители", en: "Lost visitors" },
    steps: [
      { icon: "👥", delay: 0,    color: "slate",  label: { bg: "50 посетители идват на сайта", en: "50 visitors land on your site" } },
      { icon: "🚶", delay: 900,  color: "yellow", label: { bg: "46 напускат без никакво действие", en: "46 leave without taking action" } },
      { icon: "😔", delay: 1900, color: "red",    label: { bg: "92 % изчезват без лийд", en: "92 % vanish with no lead captured" } },
      { icon: "💰", delay: 2900, color: "red",    label: { bg: "Пропуснат приход: ~690 лв / ден", en: "Missed revenue: ~690 BGN / day" } },
    ],
  },
] as const;

const stepColor: Record<string, string> = {
  slate:  "text-[var(--text-main)]",
  yellow: "text-yellow-600 dark:text-yellow-400",
  red:    "text-red-600 dark:text-red-400",
};

export default function ProblemVisualization() {
  const { locale } = useI18n();
  const [activeIdx, setActiveIdx]       = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    setVisibleSteps([]);
    const scenario = SCENARIOS[activeIdx]!;
    const timers = scenario.steps.map((step, i) =>
      setTimeout(() => setVisibleSteps((prev) => [...prev, i]), step.delay),
    );
    const cycleTimer = setTimeout(
      () => setActiveIdx((prev) => (prev + 1) % SCENARIOS.length),
      4600,
    );
    return () => { timers.forEach(clearTimeout); clearTimeout(cycleTimer); };
  }, [activeIdx]);

  const scenario = SCENARIOS[activeIdx]!;

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/60 dark:bg-red-950/20 dark:border-red-800/50 p-6 min-h-[200px]">
      {/* Tab row */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(i)}
            className={`text-xs px-3 py-1 rounded-full font-semibold transition-all ${
              i === activeIdx
                ? "bg-red-500 text-white shadow-sm"
                : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300 hover:bg-red-200"
            }`}
          >
            {s.tab[locale as Locale]}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {scenario.steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${
              visibleSteps.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-xl leading-none">{step.icon}</span>
            <span className={`text-sm font-medium ${stepColor[step.color] ?? stepColor.slate}`}>
              {step.label[locale as Locale]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

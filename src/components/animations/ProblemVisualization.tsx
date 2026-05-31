"use client";

import { useState, useEffect } from "react";
import { useI18n, type Locale } from "@/lib/i18n";

const SCENARIOS = [
  {
    id: "message",
    tab:   { bg: "Съобщение", en: "Message" },
    steps: [
      { icon: "💬", color: "slate",  label: { bg: 'Клиент: "Имате ли свободна дата?"', en: 'Client: "Do you have availability?"' } },
      { icon: "⏳", color: "yellow", label: { bg: "1 ч… 3 ч… 5 ч без отговор",         en: "1 hr… 3 hrs… 5 hrs with no reply"   } },
      { icon: "😤", color: "red",    label: { bg: "Клиентът се обажда на конкурента",   en: "Client calls your competitor"       } },
      { icon: "🏆", color: "red",    label: { bg: "Конкурентът спечелва клиента",       en: "Competitor wins the client"         } },
    ],
    delay: 4600,
  },
  {
    id: "call",
    tab:   { bg: "Обаждане", en: "Call" },
    steps: [
      { icon: "📞", color: "slate",  label: { bg: "Телефонът звъни…",              en: "Phone is ringing…"             } },
      { icon: "🔕", color: "yellow", label: { bg: "Пропуснато обаждане — отново",  en: "Missed call — again and again" } },
      { icon: "📱", color: "red",    label: { bg: "Клиентът пише на конкурента",   en: "Client messages a competitor"  } },
      { icon: "💸", color: "red",    label: { bg: "-1 клиент | -150 лв приход",    en: "-1 client | -150 BGN revenue"  } },
    ],
    delay: 4600,
  },
  {
    id: "visitor",
    tab:   { bg: "Посетители", en: "Visitors" },
    steps: [
      { icon: "👥", color: "slate",  label: { bg: "50 посетители на сайта",       en: "50 visitors land on site"       } },
      { icon: "🚶", color: "yellow", label: { bg: "46 напускат без действие",      en: "46 leave without taking action" } },
      { icon: "😔", color: "red",    label: { bg: "92 % без лийд",                en: "92 % vanish, no lead captured"  } },
      { icon: "💰", color: "red",    label: { bg: "~690 лв / ден изгубен приход", en: "~690 BGN / day missed revenue"  } },
    ],
    delay: 4600,
  },
] as const;

const stepColor: Record<string, string> = {
  slate:  "text-[var(--text-main)]",
  yellow: "text-accent/70",
  red:    "text-accent",
};

const stepBg: Record<string, string> = {
  slate:  "bg-[var(--bg-card)] border border-[var(--border)]",
  yellow: "bg-accent/5 border border-accent/10",
  red:    "bg-accent/10 border border-accent/20",
};

export default function ProblemVisualization() {
  const { locale } = useI18n();
  const [activeIdx, setActiveIdx]       = useState(0);
  const [cycleKey, setCycleKey]         = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    setVisibleSteps([]);
    const scenario = SCENARIOS[activeIdx]!;
    const timers = scenario.steps.map((_, i) =>
      setTimeout(() => setVisibleSteps((prev) => [...prev, i]), i * 900),
    );
    const cycleTimer = setTimeout(
      () => { setActiveIdx((prev) => (prev + 1) % SCENARIOS.length); setCycleKey((k) => k + 1); },
      scenario.delay,
    );
    return () => { timers.forEach(clearTimeout); clearTimeout(cycleTimer); };
  }, [activeIdx, cycleKey]);

  const scenario = SCENARIOS[activeIdx]!;

  return (
    <div className="w-full rounded-xl border border-accent/20 bg-accent/5 p-4">
      {/* Tab row */}
      <div className="mb-4 flex gap-1.5">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveIdx(i); setCycleKey((k) => k + 1); }}
            className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all ${
              i === activeIdx
                ? "bg-accent text-white shadow-sm"
                : "bg-accent/10 text-accent hover:bg-accent/20"
            }`}
          >
            {s.tab[locale as Locale]}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {scenario.steps.map((step, i) => (
          <div
            key={`${activeIdx}-${i}`}
            className={`flex items-center gap-3 rounded-lg p-2.5 transition-all duration-500 ${stepBg[step.color]} ${
              visibleSteps.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="flex-none text-lg leading-none">{step.icon}</span>
            <span className={`text-xs font-medium leading-snug ${stepColor[step.color] ?? stepColor.slate}`}>
              {step.label[locale as Locale]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

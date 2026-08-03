"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Bot,
  CalendarCheck,
  PartyPopper,
  PhoneIncoming,
  Send,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Rocket,
} from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

const SCENARIOS = [
  {
    id: "message",
    tab:   { bg: "Съобщение", en: "Message" },
    steps: [
      { icon: MessageCircle, color: "slate",  label: { bg: 'Клиент: "Имате ли свободна дата?"', en: 'Client: "Do you have availability?"' } },
      { icon: Bot,           color: "lime",   label: { bg: "AI асистентът отговаря мигновено (за 47с)", en: "AI assistant replies instantly (in 47s)" } },
      { icon: CalendarCheck, color: "lime",   label: { bg: "Клиентът избира час и резервира",         en: "Client chooses a time and books" } },
      { icon: PartyPopper,   color: "green",  label: { bg: "Спечелен нов клиент! Резервацията е записана", en: "New client booked! Booking saved in CRM" } },
    ],
    delay: 4600,
  },
  {
    id: "call",
    tab:   { bg: "Обаждане", en: "Call" },
    steps: [
      { icon: PhoneIncoming, color: "slate",  label: { bg: "Телефонът звъни извън работно време", en: "Phone rings after hours" } },
      { icon: Send,          color: "lime",   label: { bg: "Автоматичен SMS с линк за записване", en: "Automatic SMS sent with booking link" } },
      { icon: Clock,         color: "lime",   label: { bg: "Клиентът се записва сам за 30 секунди", en: "Client books themselves in 30 seconds" } },
      { icon: TrendingUp,    color: "green",  label: { bg: "Защитен приход (+75 €)", en: "Captured revenue (+75 EUR)" } },
    ],
    delay: 4600,
  },
  {
    id: "visitor",
    tab:   { bg: "Посетители", en: "Visitors" },
    steps: [
      { icon: Users,         color: "slate",  label: { bg: "50 посетители на сайта", en: "50 visitors land on site" } },
      { icon: MessageCircle, color: "lime",   label: { bg: "AI чатботът ги ангажира веднага", en: "AI chatbot engages them instantly" } },
      { icon: Zap,           color: "lime",   label: { bg: "18 запитвания уловени автоматично", en: "18 leads captured automatically" } },
      { icon: Rocket,        color: "green",  label: { bg: "Забележителен ръст в продажбите (+18%)", en: "Significant growth in sales (+18% lift)" } },
    ],
    delay: 4600,
  },
] as const;

const stepColor: Record<string, string> = {
  slate:  "text-[var(--text-main)]",
  lime:   "text-[var(--color-success)]",
  green:  "text-[var(--color-success)] font-bold",
};

const stepBg: Record<string, string> = {
  slate:  "bg-[var(--bg-card)] border border-[var(--border)]",
  lime:   "bg-success/5 border border-success/15",
  green:  "bg-success/10 border border-success/20",
};

export default function SolutionVisualization() {
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
    <div className="w-full rounded-xl border border-success/20 bg-success/5 p-4">
      {/* Tab row */}
      <div className="mb-4 flex gap-1.5">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveIdx(i); setCycleKey((k) => k + 1); }}
            className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold ${
              i === activeIdx
                ? "bg-[var(--color-success)] text-white shadow-sm"
                : "bg-success/10 text-[var(--color-success)] hover:bg-success/20"
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
            <step.icon
              className={`h-4 w-4 flex-none ${stepColor[step.color] ?? stepColor.slate}`}
              strokeWidth={2.25}
            />
            <span className={`text-xs font-medium leading-snug ${stepColor[step.color] ?? stepColor.slate}`}>
              {step.label[locale as Locale]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

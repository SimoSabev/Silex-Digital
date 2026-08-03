"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Zap,
  Bot,
  Target,
  Bell,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n, type Locale } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StepDef = {
  icon: LucideIcon;
  color: "accent" | "success";
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
};

const STEPS: readonly StepDef[] = [
  { icon: MessageSquare, color: "accent",  title: { bg: "Клиентът пише",           en: "Client reaches out"       }, detail: { bg: "Съобщение, обаждане, форма или WhatsApp", en: "Message, call, form or WhatsApp"     } },
  { icon: Zap,           color: "accent",  title: { bg: "Системата улавя",          en: "System captures it"       }, detail: { bg: "Автоматично разпознаване на намерение",  en: "Automatic intent recognition"        } },
  { icon: Bot,           color: "success", title: { bg: "Мигновен отговор",         en: "Instant reply"            }, detail: { bg: "Персонализиран AI отговор за секунди",   en: "Personalised AI reply in seconds"    } },
  { icon: Target,        color: "success", title: { bg: "Лийд квалифициран",        en: "Lead qualified"           }, detail: { bg: "Автоматично оценяване и категоризиране", en: "Automatic scoring and categorisation"} },
  { icon: Bell,          color: "accent",  title: { bg: "Получаваш нотификация",    en: "You get notified"         }, detail: { bg: "Dashboard + SMS + Email",                en: "Dashboard + SMS + Email"             } },
  { icon: Wallet,        color: "success", title: { bg: "Конверсия",                en: "Conversion"               }, detail: { bg: "Резервация потвърдена за 47 секунди",    en: "Booking confirmed in 47 seconds"     } },
] as const;

const colorConfig: Record<StepDef["color"], { dot: string; bg: string; border: string; text: string; subtext: string }> = {
  accent: {
    dot:     "bg-[var(--accent)]",
    bg:      "bg-accent/10",
    border:  "border-accent/20",
    text:    "text-[var(--accent)]",
    subtext: "text-[var(--accent)]/80",
  },
  success: {
    dot:     "bg-[var(--color-success)]",
    bg:      "bg-success/10",
    border:  "border-success/20",
    text:    "text-[var(--color-success)]",
    subtext: "text-[var(--color-success)]/80",
  },
};

export default function HowItWorksVisualization() {
  const { locale } = useI18n();
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Fallback for reduced-motion users: a gentle timed cycle instead of scroll-scrubbing.
  useEffect(() => {
    if (!prefersReduced) return;
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2200);
    return () => clearInterval(t);
  }, [resetKey, prefersReduced]);

  // Scroll-scrubbed: the active step advances in sync with how far this
  // component has scrolled through the viewport — "discover on scroll"
  // instead of a timer nobody asked for.
  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        const idx = Math.min(
          STEPS.length - 1,
          Math.floor(self.progress * STEPS.length),
        );
        setActive(idx);
      },
    });

    return () => trigger.kill();
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="w-full">
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
                className="group relative w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]"
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
                      <step.icon
                        className={`h-4 w-4 transition-opacity duration-300 ${cfg.text} ${isActive ? "opacity-100" : "opacity-40"}`}
                        strokeWidth={2.25}
                      />
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
                i === active ? "bg-[var(--accent)]" : i < active ? "bg-accent/40" : "bg-[var(--border)]"
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

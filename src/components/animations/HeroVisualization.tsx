"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Channel = { name: string; color: string; bg: string };
const CHANNELS: Channel[] = [
  { name: "WhatsApp", color: "#25D366", bg: "rgba(37,211,102,0.12)"  },
  { name: "Email",    color: "#4A90E2", bg: "rgba(74,144,226,0.12)"  },
  { name: "SMS",      color: "#FB923C", bg: "rgba(251,146,60,0.12)"  },
  { name: "Form",     color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
];

type Conversation = {
  id: number;
  initials: string;
  name: string;
  channel: Channel;
  msg: string;
  reply: string;
  time: string;
};
const CONVERSATIONS: Conversation[] = [
  { id: 1, initials: "MK", name: "Maria K.",  channel: CHANNELS[0]!, msg: "Имате ли свободна дата за утре?",   reply: "Здравей! Имаме от 10:00 до 15:00. Кое е удобно?",              time: "0.8s" },
  { id: 2, initials: "SP", name: "Stefan P.", channel: CHANNELS[1]!, msg: "Колко струва стандартният пакет?",  reply: "Grow пакетът е 599 лв/мес — AI агент + автоматизации.",       time: "1.1s" },
  { id: 3, initials: "ET", name: "Elena T.",  channel: CHANNELS[2]!, msg: "Искам демо на вашата платформа.",   reply: "Резервирах 30-мин. демо за утре в 11:00. Очаквайте!",          time: "0.6s" },
  { id: 4, initials: "BV", name: "Boris V.",  channel: CHANNELS[3]!, msg: "Мога ли да интегрирам с моя CRM?", reply: "Да! Поддържаме HubSpot, Salesforce и Pipedrive от кутията.",   time: "0.9s" },
];

const TOASTS = [
  { icon: "💰", label: "Нова резервация", sub: "Maria K. · сега",  accent: "#4ADE80" },
  { icon: "📈", label: "+3 лийда днес",   sub: "Над план с 40%",   accent: "#818CF8" },
  { icon: "⚡", label: "Workflow готов",   sub: "0.6s изпълнение",  accent: "#CCFF00" },
  { icon: "🔔", label: "Репорт изпратен", sub: "Месечен отчет",    accent: "#FB923C" },
];

const METRICS = [
  { label: { bg: "Ср. отговор",       en: "Avg reply"    }, value: "0.8s", accent: "#CCFF00" },
  { label: { bg: "Запитвания / ден",  en: "Leads / day"  }, value: "24",   accent: "#4ADE80" },
  { label: { bg: "Конверсия",         en: "Conversion"   }, value: "94%",  accent: "#818CF8" },
  { label: { bg: "Спест. часа",       en: "Saved hrs"    }, value: "15h",  accent: "#FB923C" },
];

const BAR_DATA = [14, 21, 18, 27, 24, 31, 24];
const BAR_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 flex-none">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
    </span>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]/80"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.13, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

type Phase = "incoming" | "typing" | "replied";

export default function HeroVisualization() {
  const { locale } = useI18n();
  const [convIdx, setConvIdx]   = useState(0);
  const [phase, setPhase]       = useState<Phase>("incoming");
  const [toastIdx, setToastIdx] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (ms: number, fn: () => void) => { const t = setTimeout(fn, ms); timers.current.push(t); };

  useEffect(() => {
    clear();
    setPhase("incoming");
    after(1100, () => {
      setPhase("typing");
      after(1700, () => {
        setPhase("replied");
        const ti = Math.floor(Math.random() * TOASTS.length);
        after(500, () => {
          setToastIdx(ti);
          after(2400, () => {
            setToastIdx(null);
            after(800, () => setConvIdx((i) => (i + 1) % CONVERSATIONS.length));
          });
        });
      });
    });
    return clear;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convIdx]);

  const conv  = CONVERSATIONS[convIdx]!;
  const toast = toastIdx !== null ? TOASTS[toastIdx] : null;

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#08080E]" aria-hidden="true">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-[#4A90E2]/12 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-[#CCFF00]/10 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-48 w-48 rounded-full bg-[#818CF8]/10 blur-3xl" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── LEFT PANEL: conversation ─────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col border-white/6 p-4 sm:p-5 lg:w-[55%] lg:border-r">

        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LiveDot />
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{locale === "bg" ? "На живо" : "Live inbox"}</span>
          </div>
          {/* Channel pills — hidden on very small screens */}
          <div className="hidden gap-1 sm:flex">
            {CHANNELS.map((ch) => (
              <div
                key={ch.name}
                className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                style={{ backgroundColor: ch.bg, color: ch.color }}
              >
                {ch.name}
              </div>
            ))}
          </div>
        </div>

        {/* Resolved conversations (faded) */}
        <div className="mb-3 space-y-1.5">
          {CONVERSATIONS.filter((_, i) => i !== convIdx).slice(0, 2).map((c) => (
            <div key={c.id} className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-1.5">
              <div
                className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: `linear-gradient(135deg,${c.channel.color}66,${c.channel.color}33)` }}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-white/35">{c.name}</p>
                <p className="truncate text-[9px] text-white/20">{c.msg}</p>
              </div>
              <svg viewBox="0 0 10 10" className="h-3 w-3 flex-none" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Active conversation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-3 sm:p-4"
          >
            {/* Sender */}
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg,${conv.channel.color},${conv.channel.color}88)` }}
              >
                {conv.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-white">{conv.name}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                    style={{ backgroundColor: conv.channel.bg, color: conv.channel.color }}
                  >
                    {conv.channel.name}
                  </span>
                </div>
                <span className="text-[10px] text-white/25">{locale === "bg" ? "току що" : "just now"}</span>
              </div>
            </div>

            {/* Message */}
            <div className="mb-3 rounded-xl rounded-tl-sm bg-white/8 px-3 py-2 text-xs leading-relaxed text-white/75 sm:text-sm">
              {conv.msg}
            </div>

            {/* AI reply */}
            <AnimatePresence>
              {(phase === "typing" || phase === "replied") && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl rounded-tl-sm border px-3 py-2.5"
                  style={{ borderColor: `${conv.channel.color}30`, background: `${conv.channel.color}0D` }}
                >
                  {phase === "typing" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold" style={{ color: conv.channel.color }}>
                        🤖 AI генерира отговор
                      </span>
                      <TypingDots />
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="mb-1.5 text-[11px] leading-relaxed text-white/70 sm:text-xs">{conv.reply}</p>
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 12 12" className="h-3 w-3 text-[#4ADE80]" fill="none">
                          <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[10px] font-semibold text-[#4ADE80]">Изпратен за {conv.time}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── RIGHT PANEL: metrics — hidden on mobile ───────────────── */}
      <div className="relative z-10 hidden flex-col p-5 lg:flex lg:w-[45%]">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{locale === "bg" ? "Представяне" : "Performance"}</span>
          <div className="rounded-full bg-[#CCFF00]/15 px-2.5 py-1 text-[9px] font-bold text-[#CCFF00]">
            {locale === "bg" ? "↑ 40% тази седмица" : "↑ 40% this week"}
          </div>
        </div>

        {/* Metrics 2×2 */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          {METRICS.map((m) => (
            <div key={m.label.en} className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="text-2xl font-black leading-none" style={{ color: m.accent }}>{m.value}</div>
              <div className="mt-1 text-[10px] text-white/30">{m.label[locale]}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mb-4 rounded-xl border border-white/8 bg-white/[0.03] p-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            {locale === "bg" ? "Запитвания тази седмица" : "Leads this week"}
          </div>
          <div className="flex h-12 items-end gap-1">
            {BAR_DATA.map((v, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                initial={{ height: "0%" }}
                animate={{ height: `${(v / 31) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                style={{ backgroundColor: i === 6 ? "#CCFF00" : "#CCFF0038" }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-white/20">
            {BAR_DAYS.map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>

        {/* Active automations */}
        <div className="flex-1 space-y-1.5">
          {[
            { label: { bg: "Имейл отговор",        en: "Email reply"         }, status: { bg: "активен",     en: "running" }, color: "#4ADE80", key: "email" },
            { label: { bg: "Разпределение",         en: "Lead qualification"  }, status: { bg: "активен",     en: "running" }, color: "#4ADE80", key: "lead"  },
            { label: { bg: "Напомняне за среща",    en: "Booking reminder"    }, status: { bg: "на опашка",   en: "queued"  }, color: "#FB923C", key: "book"  },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-3 py-2">
              <div className="relative h-2 w-2 flex-none">
                {item.status.en === "running" && (
                  <span className="absolute inset-0 animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: item.color }} />
                )}
                <span className="relative block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
              <span className="flex-1 truncate text-[11px] text-white/50">{item.label[locale]}</span>
              <span className="flex-none text-[9px] font-bold uppercase tracking-wider"
                style={{ color: item.color }}>{item.status[locale]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile metrics strip — shown only on mobile ────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex border-t border-white/8 bg-[#08080E]/90 px-4 py-2.5 backdrop-blur-sm lg:hidden">
        {METRICS.map((m) => (
          <div key={m.label.en} className="flex-1 text-center">
            <div className="text-sm font-black" style={{ color: m.accent }}>{m.value}</div>
            <div className="text-[9px] text-white/30">{m.label[locale]}</div>
          </div>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toastIdx}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="absolute bottom-14 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-[#14141E]/95 px-4 py-2.5 shadow-2xl backdrop-blur-xl lg:bottom-5"
          >
            <div
              className="flex h-8 w-8 flex-none items-center justify-center rounded-xl text-base"
              style={{ backgroundColor: `${toast.accent}1A` }}
            >
              {toast.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-white">{toast.label}</p>
              <p className="text-[10px]" style={{ color: toast.accent }}>{toast.sub}</p>
            </div>
            <div className="ml-1 h-1.5 w-1.5 flex-none animate-pulse rounded-full"
              style={{ backgroundColor: toast.accent }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

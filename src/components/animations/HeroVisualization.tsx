"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  name: string;
  channel: string;
  channelColor: string;
  text: string;
  replyTime: string;
  reply: string;
};

const MESSAGES: Message[] = [
  {
    id: 1,
    name: "Maria K.",
    channel: "WhatsApp",
    channelColor: "#25D366",
    text: "Имате ли свободна дата за утре?",
    replyTime: "0.8s",
    reply: "Здравейте, Maria! Да, имаме свободни часове от 10:00 до 15:00. Кое ви е най-удобно?",
  },
  {
    id: 2,
    name: "Stefan P.",
    channel: "Email",
    channelColor: "#4A90E2",
    text: "Колко струва стандартният пакет?",
    replyTime: "1.1s",
    reply: "Здравейте, Stefan! Стандартният Grow пакет е 599 лв/мес и включва AI агент + автоматизации.",
  },
  {
    id: 3,
    name: "Elena T.",
    channel: "Form",
    channelColor: "#B8E986",
    text: "Искам демо на вашата платформа.",
    replyTime: "0.6s",
    reply: "Страхотно, Elena! Резервирах ви 30-минутна демонстрация за утре в 11:00. Очаквайте потвърждение!",
  },
];

const NOTIFICATIONS = [
  { icon: "💰", text: "Нова резервация потвърдена", color: "#4ADE80" },
  { icon: "📊", text: "+3 нови лийда днес",          color: "#818CF8" },
  { icon: "⚡", text: "Workflow изпълнен за 0.6s",   color: "#CCFF00" },
  { icon: "🔔", text: "Report изпратен на клиента",  color: "#FB923C" },
];

const STATS = [
  { label: "Avg reply", value: "0.8s" },
  { label: "Today leads", value: "24" },
  { label: "Conversion", value: "94%" },
];

type Phase = "incoming" | "typing" | "replied" | "done";

export default function HeroVisualization() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("incoming");
  const [notifIndex, setNotifIndex] = useState<number | null>(null);
  const [statVisible, setStatVisible] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const msg = MESSAGES[msgIndex]!;

  useEffect(() => {
    setStatVisible(true);
    const runCycle = () => {
      setPhase("incoming");
      cycleRef.current = setTimeout(() => {
        setPhase("typing");
        cycleRef.current = setTimeout(() => {
          setPhase("replied");
          // Show a random notification
          const ni = Math.floor(Math.random() * NOTIFICATIONS.length);
          notifRef.current = setTimeout(() => {
            setNotifIndex(ni);
            notifRef.current = setTimeout(() => {
              setNotifIndex(null);
              cycleRef.current = setTimeout(() => {
                setPhase("done");
                cycleRef.current = setTimeout(() => {
                  setMsgIndex((i) => (i + 1) % MESSAGES.length);
                  runCycle();
                }, 600);
              }, 1200);
            }, 2200);
          }, 400);
        }, 1800);
      }, 1200);
    };
    runCycle();
    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current);
      if (notifRef.current) clearTimeout(notifRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgIndex]);

  const notif = notifIndex !== null ? NOTIFICATIONS[notifIndex] : null;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0A0A0F] p-4 md:p-6">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#4A90E2]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#CCFF00]/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#818CF8]/8 blur-3xl" />
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#111118]/90 shadow-2xl backdrop-blur-md"
      >
        {/* Header bar */}
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
              </span>
              Silex AI · Live
            </div>
          </div>
          <div className="text-xs text-white/20">v2.4</div>
        </div>

        {/* Message feed */}
        <div className="px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {/* Incoming message */}
              <div className="mb-3 flex items-start gap-3">
                {/* Avatar */}
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#4A90E2] to-[#818CF8] text-xs font-bold text-white">
                  {msg.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{msg.name}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold text-black"
                      style={{ backgroundColor: msg.channelColor }}
                    >
                      {msg.channel}
                    </span>
                    <span className="text-[10px] text-white/30">just now</span>
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-white/8 px-3 py-2 text-sm text-white/80">
                    {msg.text}
                  </div>
                </div>
              </div>

              {/* AI response */}
              <AnimatePresence>
                {(phase === "typing" || phase === "replied") && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-11 flex items-start gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      {phase === "typing" ? (
                        <div className="rounded-xl rounded-tl-sm bg-[#CCFF00]/15 px-3 py-2.5 border border-[#CCFF00]/20">
                          <div className="mb-1 flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#CCFF00]">🤖 AI генерира отговор</span>
                          </div>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]/70"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="rounded-xl rounded-tl-sm bg-[#CCFF00]/10 px-3 py-2.5 border border-[#CCFF00]/25"
                        >
                          <p className="mb-1.5 text-xs leading-relaxed text-white/80">{msg.reply}</p>
                          <div className="flex items-center gap-1.5">
                            <svg viewBox="0 0 12 12" className="h-3 w-3 text-[#4ADE80]" fill="none">
                              <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-[10px] font-semibold text-[#4ADE80]">
                              Изпратен за {msg.replyTime}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: statVisible ? 1 : 0 }}
          className="flex items-center justify-around border-t border-white/8 px-4 py-3"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-base font-bold text-[#CCFF00]">{stat.value}</div>
              <div className="text-[10px] text-white/35">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating notification */}
      <AnimatePresence>
        {notif && (
          <motion.div
            key={notifIndex}
            initial={{ opacity: 0, x: 40, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="absolute right-4 top-8 z-20 flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#18181f]/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
          >
            <span className="text-lg leading-none">{notif.icon}</span>
            <span className="text-xs font-semibold text-white/80">{notif.text}</span>
            <div
              className="ml-1 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: notif.color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Channel source pills — floating left */}
      <div className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2" aria-hidden="true">
        {[
          { label: "WhatsApp", color: "#25D366" },
          { label: "Email",    color: "#4A90E2" },
          { label: "SMS",      color: "#FB923C" },
          { label: "Form",     color: "#818CF8" },
        ].map((src, i) => (
          <motion.div
            key={src.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#111118]/80 px-2.5 py-1 backdrop-blur-sm"
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: src.color }} />
            <span className="text-[10px] font-medium text-white/50">{src.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

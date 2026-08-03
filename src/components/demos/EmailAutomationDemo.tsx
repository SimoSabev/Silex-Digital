"use client";

import { useState, useEffect, useRef, useCallback, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, MessageCircle, Smartphone, AtSign, Bot, Database, Server, RefreshCw, CheckCircle2, Mail, Send, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useDemoAnalytics } from "@/hooks/useDemoAnalytics";

type Source = "messenger" | "viber" | "whatsapp" | "instagram" | "telegram" | "email";

type Message = {
  id: string;
  source: Source;
  text: string;
  product: string;
  status: "falling" | "processing" | "done";
};

type LineCoord = { x1: number; y1: number; x2: number; y2: number; source: Source };

const CHANNELS: Record<Source, { icon: ReactElement; bgName: string; enName: string; borderColor: string; bgColor: string; activeColor: string }> = {
  viber:     { icon: <Smartphone size={20} />,    bgName: "Viber",     enName: "Viber",     borderColor: "border-purple-500/30", bgColor: "bg-purple-500/10", activeColor: "bg-purple-500" },
  messenger: { icon: <MessageCircle size={20} />, bgName: "Messenger", enName: "Messenger", borderColor: "border-blue-500/30",   bgColor: "bg-blue-500/10",   activeColor: "bg-blue-500"   },
  whatsapp:  { icon: <MessageCircle size={20} />, bgName: "WhatsApp",  enName: "WhatsApp",  borderColor: "border-green-500/30",  bgColor: "bg-green-500/10",  activeColor: "bg-green-500"  },
  telegram:  { icon: <Send size={20} />,          bgName: "Telegram",  enName: "Telegram",  borderColor: "border-sky-500/30",    bgColor: "bg-sky-500/10",    activeColor: "bg-sky-500"    },
  instagram: { icon: <AtSign size={20} />,        bgName: "Instagram", enName: "Instagram", borderColor: "border-pink-500/30",   bgColor: "bg-pink-500/10",   activeColor: "bg-pink-500"   },
  email:     { icon: <Mail size={20} />,          bgName: "Имейл",     enName: "Email",     borderColor: "border-orange-500/30", bgColor: "bg-orange-500/10", activeColor: "bg-orange-500" },
};

const ALL_MOCK_MESSAGES: Record<Source, { text: { bg: string; en: string }; product: { bg: string; en: string } }[]> = {
  messenger: [{ text: { bg: "Искам да поръчам 2бр от модел Х. Адрес: София...", en: "I want to order 2 units of Model X. Address: Sofia..." }, product: { bg: "Модел Х (2бр)", en: "Model X (x2)" } }],
  viber:     [{ text: { bg: "Може ли да пратите обувките размер 43 до офис?", en: "Can you send the size 43 shoes to shipping office?" },     product: { bg: "Обувки р.43", en: "Shoes size 43" } }],
  whatsapp:  [{ text: { bg: "Търся части за колата, водна помпа за Голф 4.", en: "Looking for car parts, water pump for Golf 4." },            product: { bg: "Водна Помпа (Голф 4)", en: "Water Pump (Golf 4)" } }],
  telegram:  [{ text: { bg: "Здравейте, интересувам се от абонамента за 1 година.", en: "Hello, I am interested in the 1-year subscription." }, product: { bg: "Годишен Абонамент", en: "1-Year Subscription" } }],
  instagram: [{ text: { bg: "Налична ли е синята рокля за 45€?", en: "Is the blue dress for 45 EUR available?" },                              product: { bg: "Синя Рокля", en: "Blue Dress" } }],
  email:     [{ text: { bg: "Заявка за оферта: 5бр лаптопи Dell Latitude.", en: "Quote request: 5x Dell Latitude laptops." },                  product: { bg: "Dell Latitude (5бр)", en: "Dell Latitude (x5)" } }],
};

export default function EmailAutomationDemo() {
  const { locale, t } = useI18n();
  const { trackEvent } = useDemoAnalytics("email-automation", locale);

  const [activeSources, setActiveSources] = useState<Source[]>(["viber", "messenger", "instagram"]);
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orders, setOrders] = useState<Message[]>([]);
  const [processingMsg, setProcessingMsg] = useState<Message | null>(null);
  const [lines, setLines] = useState<LineCoord[]>([]);

  // Refs for measuring positions
  const workspaceRef = useRef<HTMLDivElement>(null);
  const channelIconRefs = useRef<Map<Source, HTMLDivElement>>(new Map());
  const aiCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => { void trackEvent("demo_viewed"); }, [trackEvent]);

  // Recalculate SVG line coordinates from real DOM positions
  const recalcLines = useCallback(() => {
    if (!workspaceRef.current || !aiCenterRef.current) return;
    const containerRect = workspaceRef.current.getBoundingClientRect();
    const aiRect = aiCenterRef.current.getBoundingClientRect();
    const x2 = aiRect.left - containerRect.left + aiRect.width / 2;
    const y2 = aiRect.top  - containerRect.top  + aiRect.height / 2;

    const next: LineCoord[] = [];
    for (const source of activeSources) {
      const el = channelIconRefs.current.get(source);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next.push({
        x1: r.left - containerRect.left + r.width / 2,
        y1: r.top  - containerRect.top  + r.height,   // bottom-center of icon
        x2,
        y2,
        source,
      });
    }
    setLines(next);
  }, [activeSources]);

  // Recalc on mount, source change, and resize
  useEffect(() => {
    // Small delay so layout has settled after AnimatePresence transitions
    const id = setTimeout(recalcLines, 80);
    return () => clearTimeout(id);
  }, [recalcLines]);

  useEffect(() => {
    const obs = new ResizeObserver(recalcLines);
    if (workspaceRef.current) obs.observe(workspaceRef.current);
    return () => obs.disconnect();
  }, [recalcLines]);

  const toggleSource = (source: Source) => {
    if (isRunning) return;
    setActiveSources(prev =>
      prev.includes(source) && prev.length > 1
        ? prev.filter(s => s !== source)
        : prev.includes(source) ? prev : [...prev, source]
    );
  };

  const startSimulation = () => {
    if (isRunning || activeSources.length === 0) return;
    setIsRunning(true);
    setMessages([]);
    setOrders([]);
    setProcessingMsg(null);
    void trackEvent("simulation_started", { sources: activeSources.join(",") });

    let msgCount = 0;
    const totalMsgs = activeSources.length * 2;
    const messagePool = activeSources.flatMap(s => ALL_MOCK_MESSAGES[s].map(p => ({ source: s, p })));

    const interval = setInterval(() => {
      if (msgCount >= totalMsgs) {
        clearInterval(interval);
        setTimeout(() => { setIsRunning(false); void trackEvent("simulation_completed"); }, 3000);
        return;
      }

      const pick = messagePool[Math.floor(Math.random() * messagePool.length)];
      if (!pick) return;
      const newId = `msg-${Date.now()}-${msgCount}`;
      const newMsg: Message = { id: newId, source: pick.source, text: pick.p.text[locale], product: pick.p.product[locale], status: "falling" };

      setMessages(prev => [...prev, newMsg]);

      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== newId));
        setProcessingMsg(newMsg);
        setTimeout(() => {
          setProcessingMsg(null);
          setOrders(prev => [{ ...newMsg, status: "done" as const }, ...prev].slice(0, 5));
        }, 1200);
      }, 1500);

      msgCount++;
    }, 2000);
  };

  return (
    <div className="flex flex-col rounded-2xl sm:rounded-[24px] bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl overflow-hidden min-h-[min(520px,85dvh)] sm:min-h-[600px] lg:min-h-[700px] relative font-[family-name:var(--font-main)]">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 border-b border-[var(--border)] bg-transparent relative z-20 gap-4">
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-[var(--text-main)] leading-tight tracking-tight mb-1">
            {t("demo.multichannel.title")}
          </h3>
          <p className="text-sm text-[var(--text-sub)]">
            {t("demo.multichannel.sub")}
          </p>
        </div>

        <button
          onClick={startSimulation}
          disabled={isRunning || activeSources.length === 0}
          className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(106,46,58,0.35)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(106,46,58,0.45)] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
        >
          {isRunning ? (
            <><RefreshCw size={18} className="animate-spin" /><span>{t("demo.multichannel.running")}</span></>
          ) : (
            <><Play size={18} fill="currentColor" /><span>{t("demo.multichannel.run")}</span></>
          )}
        </button>
      </div>

      {/* Channel selector bar */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 bg-[var(--bg-section)] border-b border-[var(--border)] flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center z-20 relative">
        {(Object.keys(CHANNELS) as Source[]).map(source => {
          const isActive = activeSources.includes(source);
          const c = CHANNELS[source];
          return (
            <button
              key={source}
              onClick={() => toggleSource(source)}
              disabled={isRunning}
              className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_4px_15px_rgba(124,58,237,0.15)]"
                  : "border-[var(--border)] bg-transparent text-[var(--text-sub)] hover:border-[var(--text-muted)]"
              } ${isRunning ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5"}`}
            >
              <div className={isActive ? "text-[var(--accent)]" : ""}>{c.icon}</div>
              <span className="hidden sm:inline">{c[locale === "bg" ? "bgName" : "enName"]}</span>
              {isActive && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-1">
                  <CheckCircle2 size={14} className="text-[var(--accent)]" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* Workspace */}
      <div ref={workspaceRef} className="relative flex-1 bg-transparent overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-[length:32px_32px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-section)]/50 to-[var(--bg-section)] z-0" />

        {/* SVG connecting lines — drawn from real DOM positions */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--text-muted)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <AnimatePresence>
            {lines.map(l => (
              <motion.line
                key={l.source}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </AnimatePresence>
        </svg>

        <div className="relative z-20 w-full max-w-4xl px-2 sm:px-4 flex flex-col h-full items-center justify-between pointer-events-none py-6 sm:py-10 min-h-[380px] sm:min-h-0">

          {/* TOP: channel icons */}
          <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-8 md:gap-16 relative mb-8 sm:mb-16 max-w-full">
            <AnimatePresence>
              {activeSources.map(channel => {
                const c = CHANNELS[channel];
                return (
                  <motion.div
                    layout
                    key={channel}
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onLayoutAnimationComplete={recalcLines}
                    className="flex flex-col items-center relative z-20"
                  >
                    <div
                      ref={el => {
                        if (el) channelIconRefs.current.set(channel, el);
                        else channelIconRefs.current.delete(channel);
                      }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] border border-[var(--border)] flex items-center justify-center backdrop-blur-xl transition-all duration-500 shadow-xl bg-[var(--bg-card)]/90 relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-[1.25rem] opacity-30 dark:opacity-10" />
                      <div className={`drop-shadow-sm ${c.activeColor.replace("bg-", "text-")}`}>{c.icon}</div>
                      {isRunning && (
                        <div className={`absolute inset-0 rounded-[1.25rem] ${c.activeColor} opacity-20 animate-ping`}
                          style={{ animationDuration: "3s" }} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Falling messages */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <AnimatePresence>
              {messages.map(msg => {
                const sourceIdx = activeSources.indexOf(msg.source);
                const offset = sourceIdx - (activeSources.length - 1) / 2;
                const spread = activeSources.length > 4 ? 48 : 64;
                const startX = `calc(50% + ${offset * spread}px)`;
                const c = CHANNELS[msg.source];
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ top: "10%", left: startX, opacity: 0, scale: 0.5 }}
                    animate={{ top: "50%", left: "50%", opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      top: { duration: 1.5, ease: [0.12, 0, 0.39, 0] },
                      left: { duration: 1.5, ease: "linear" },
                      opacity: { duration: 0.3 },
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-2xl sm:rounded-[24px] border border-[var(--border)] shadow-xl backdrop-blur-2xl max-w-[min(200px,42vw)] min-w-[120px] sm:min-w-[160px] bg-[var(--bg-card)]/95"
                  >
                    <div className={`absolute inset-0 rounded-[24px] ${c.bgColor} opacity-40`} />
                    <div className="relative z-10 flex gap-2 items-center mb-1.5 border-b border-[var(--border)] pb-1.5">
                      <div className={`scale-75 p-1 rounded-md ${c.bgColor} ${c.activeColor.replace("bg-", "text-")}`}>{c.icon}</div>
                      <span className="text-[10px] font-bold uppercase text-[var(--text-sub)] tracking-widest">{t("demo.multichannel.newInquiry")}</span>
                    </div>
                    <p className="relative z-10 text-xs text-[var(--text-main)] font-medium line-clamp-2 leading-relaxed">{msg.text}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* MIDDLE: AI Core */}
          <div className="relative mt-8 md:mt-0 z-40">
            <AnimatePresence>
              {processingMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.5, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full blur-3xl z-0 bg-[var(--accent)]"
                />
              )}
            </AnimatePresence>

            <div
              ref={aiCenterRef}
              className={`relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full border flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-2xl ${
                processingMsg
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white scale-110 shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] shadow-xl"
              }`}
            >
              <Bot size={processingMsg ? 32 : 28} className={processingMsg ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" : ""} />
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-2 ${processingMsg ? "opacity-90" : "opacity-60"}`}>
                {processingMsg ? t("demo.multichannel.extracting") : t("demo.multichannel.aiCore")}
              </span>
              <AnimatePresence>
                {processingMsg && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-[-4px] border border-transparent rounded-full"
                  >
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scanner popup */}
            <AnimatePresence>
              {processingMsg && (
                <motion.div
                  initial={{ opacity: 0, x: -20, rotateY: 90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 sm:left-full sm:ml-4 sm:translate-x-0 sm:top-1/2 sm:-translate-y-1/2 sm:mt-0 w-[min(100%,12rem)] sm:w-48 p-3 sm:p-3.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--accent)]/30 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                >
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] opacity-30 z-0"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Database size={10} className="text-[var(--accent)]" />
                      <div className="text-[9px] text-[var(--accent)] font-mono uppercase tracking-[0.2em]">{"<Data_Map>"}</div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-[var(--text-sub)] font-mono flex flex-col gap-1.5">
                      <span className="flex justify-between">{t("demo.multichannel.source")} <span className="text-[var(--text-main)] font-bold">{CHANNELS[processingMsg.source][locale === "bg" ? "bgName" : "enName"]}</span></span>
                      <span className="flex justify-between items-center gap-2">{t("demo.multichannel.item")} <span className="text-[var(--accent)] font-bold truncate">{processingMsg.product}</span></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM: ERP table */}
          <div className="w-full mt-auto relative z-50 px-2 sm:px-0">
            <div className="text-center font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 md:mb-4">
              {t("demo.multichannel.vaultTitle")}
            </div>
            <div className="w-full max-w-3xl mx-auto h-40 sm:h-52 bg-[var(--bg-card)]/80 border border-[var(--border)] rounded-2xl sm:rounded-[24px] shadow-xl backdrop-blur-2xl p-3 sm:p-4 overflow-hidden relative flex flex-col gap-2">
              {orders.length === 0 && !isRunning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 text-[var(--text-muted)]">
                  <Server size={32} className="mb-3 opacity-60" />
                  <span className="text-xs uppercase tracking-widest font-semibold font-mono">
                    {t("demo.multichannel.vaultEmpty")}
                  </span>
                </div>
              )}
              <AnimatePresence initial={false}>
                {orders.map(order => (
                  <motion.div
                    layout
                    key={order.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="w-full p-2.5 sm:p-3 bg-transparent/50 hover:bg-transparent border border-[var(--border)] rounded-xl flex items-center justify-between text-sm shrink-0 transition-colors"
                  >
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden pr-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--accent)]/20 shadow-[0_0_10px_rgba(132,204,22,0.1)] relative">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                          <Check size={16} strokeWidth={3} />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ opacity: 0, scale: 2 }}
                          transition={{ duration: 1 }}
                          className="absolute inset-0 rounded-full border border-[var(--accent)]"
                        />
                      </div>
                      <div className="truncate min-w-0 flex-1">
                        <div className="font-bold text-[var(--text-main)] flex items-center gap-2 text-xs sm:text-sm truncate">
                          {order.product}
                          <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md ${CHANNELS[order.source].bgColor} ${CHANNELS[order.source].activeColor.replace("bg-", "text-")} shrink-0 border border-transparent`}>
                            {CHANNELS[order.source][locale === "bg" ? "bgName" : "enName"]}
                          </span>
                        </div>
                        <div className="text-[10px] sm:text-xs text-[var(--text-sub)] truncate mt-0.5 font-mono">
                          {t("demo.multichannel.from")} &quot;{order.text}&quot;
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex shrink-0 items-center gap-1.5 text-[9px] font-bold text-[var(--accent)] py-1 px-2.5 rounded border border-[var(--accent)]/20 uppercase tracking-widest bg-[var(--accent)]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                      {t("demo.multichannel.stored")}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

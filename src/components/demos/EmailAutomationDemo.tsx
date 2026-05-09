"use client";

import { useState, useEffect, useRef, type ReactElement } from "react";
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

const CHANNELS: Record<Source, { icon: ReactElement; bgName: string; enName: string; borderColor: string; bgColor: string; activeColor: string }> = {
  viber: { icon: <Smartphone size={20} />, bgName: "Viber", enName: "Viber", borderColor: "border-purple-500/30", bgColor: "bg-purple-500/10", activeColor: "bg-purple-500" },
  messenger: { icon: <MessageCircle size={20} />, bgName: "Messenger", enName: "Messenger", borderColor: "border-blue-500/30", bgColor: "bg-blue-500/10", activeColor: "bg-blue-500" },
  whatsapp: { icon: <MessageCircle size={20} />, bgName: "WhatsApp", enName: "WhatsApp", borderColor: "border-green-500/30", bgColor: "bg-green-500/10", activeColor: "bg-green-500" },
  telegram: { icon: <Send size={20} />, bgName: "Telegram", enName: "Telegram", borderColor: "border-sky-500/30", bgColor: "bg-sky-500/10", activeColor: "bg-sky-500" },
  instagram: { icon: <AtSign size={20} />, bgName: "Instagram", enName: "Instagram", borderColor: "border-pink-500/30", bgColor: "bg-pink-500/10", activeColor: "bg-pink-500" },
  email: { icon: <Mail size={20} />, bgName: "Имейл", enName: "Email", borderColor: "border-orange-500/30", bgColor: "bg-orange-500/10", activeColor: "bg-orange-500" },
};

const ALL_MOCK_MESSAGES: Record<Source, { text: { bg: string; en: string }; product: { bg: string; en: string } }[]> = {
  messenger: [
    { text: { bg: "Искам да поръчам 2бр от модел Х. Адрес: София...", en: "I want to order 2 units of Model X. Address: Sofia..." }, product: { bg: "Модел Х (2бр)", en: "Model X (x2)" } }
  ],
  viber: [
    { text: { bg: "Може ли да пратите обувките размер 43 до офис?", en: "Can you send the size 43 shoes to shipping office?" }, product: { bg: "Обувки р.43", en: "Shoes size 43" } }
  ],
  whatsapp: [
    { text: { bg: "Търся части за колата, водна помпа за Голф 4.", en: "Looking for car parts, water pump for Golf 4." }, product: { bg: "Водна Помпа (Голф 4)", en: "Water Pump (Golf 4)" } }
  ],
  telegram: [
    { text: { bg: "Здравейте, интересувам се от абонамента за 1 година.", en: "Hello, I am interested in the 1-year subscription." }, product: { bg: "Годишен Абонамент", en: "1-Year Subscription" } }
  ],
  instagram: [
    { text: { bg: "Налична ли е синята рокля за 89лв?", en: "Is the blue dress for $89 available?" }, product: { bg: "Синя Рокля", en: "Blue Dress" } }
  ],
  email: [
    { text: { bg: "Заявка за оферта: 5бр лаптопи Dell Latitude.", en: "Quote request: 5x Dell Latitude laptops." }, product: { bg: "Dell Latitude (5бр)", en: "Dell Latitude (x5)" } }
  ]
};

export default function EmailAutomationDemo() {
  const { locale } = useI18n();
  const { trackEvent } = useDemoAnalytics("email-automation", locale);

  const [activeSources, setActiveSources] = useState<Source[]>(["viber", "messenger", "instagram"]);
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orders, setOrders] = useState<Message[]>([]);
  const [processingMsg, setProcessingMsg] = useState<Message | null>(null);

  useEffect(() => {
    void trackEvent("demo_viewed");
  }, [trackEvent]);

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
    const totalMessagesToSimulate = activeSources.length * 2; // e.g. 6 messages if 3 sources
    
    // Create a pool of messages based on selected sources
    let messagePool: { source: Source, p: any }[] = [];
    activeSources.forEach(s => {
      ALL_MOCK_MESSAGES[s].forEach(p => {
        messagePool.push({ source: s, p });
      });
    });

    const interval = setInterval(() => {
      if (msgCount >= totalMessagesToSimulate) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          void trackEvent("simulation_completed");
        }, 3000);
        return;
      }

      // Pick a random message from the pool
      const randomMsgTemp = messagePool[Math.floor(Math.random() * messagePool.length)];
      if (!randomMsgTemp) return;
      const newId = `msg-${Date.now()}-${msgCount}`;

      const newMsg: Message = {
        id: newId,
        source: randomMsgTemp.source,
        text: randomMsgTemp.p.text[locale],
        product: randomMsgTemp.p.product[locale],
        status: "falling"
      };

      setMessages(prev => [...prev, newMsg]);

      // Move from falling to processing
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== newId));
        setProcessingMsg(newMsg);
        
        // Move from processing to done
        setTimeout(() => {
          setProcessingMsg(null);
          setOrders(prev => [{ ...newMsg, status: "done" as const }, ...prev].slice(0, 5)); // Keep only latest 5 visually
        }, 1200);

      }, 1500); // Time it takes to fall into AI node

      msgCount++;
    }, 2000); // Send message every 2s
  };

  return (
    <div className="flex flex-col rounded-[24px] bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl overflow-hidden min-h-[700px] relative font-[family-name:var(--font-main)]">
      
      {/* Header Info & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 border-b border-[var(--border)] bg-transparent relative z-20 gap-4">
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-[var(--text-main)] leading-tight tracking-tight mb-1">
             {locale === "bg" ? "Свържи каналите си" : "Connect Your Channels"}
          </h3>
          <p className="text-sm text-[var(--text-sub)]">
             {locale === "bg" 
                ? "Избери платформите, които твоите клиенти използват, и остави AI да автоматизира поръчките ти." 
                : "Select the platforms your customers use and let AI automate your orders."}
          </p>
        </div>
        
        <button
          onClick={startSimulation}
          disabled={isRunning || activeSources.length === 0}
          className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--violet)] to-[#8b5cf6] px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
        >
          {isRunning ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>{locale === "bg" ? "Работа в реално време..." : "Processing Live..."}</span>
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              <span>{locale === "bg" ? "Започни автоматизация" : "Start Automation"}</span>
            </>
          )}
        </button>
      </div>

      {/* Settings / Selection Bar */}
      <div className="px-6 py-4 bg-[var(--bg-section)] border-b border-[var(--border)] flex flex-wrap gap-2 md:gap-3 justify-center z-20 relative">
         {(Object.keys(CHANNELS) as Source[]).map((source) => {
           const isActive = activeSources.includes(source);
           const c = CHANNELS[source];
           return (
             <button
               key={source}
               onClick={() => toggleSource(source)}
               disabled={isRunning}
               className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                 isActive 
                   ? `border-[var(--violet)] bg-[var(--violet)]/10 text-[var(--violet)] shadow-[0_4px_15px_rgba(124,58,237,0.15)]` 
                   : "border-[var(--border)] bg-transparent text-[var(--text-sub)] hover:border-[var(--text-muted)]"
               } ${isRunning ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5"}`}
             >
               <div className={isActive ? `text-[var(--violet)]` : ""}>{c.icon}</div>
               <span className="hidden sm:inline">{c[locale === "bg" ? "bgName" : "enName"]}</span>
               {isActive && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-1">
                   <CheckCircle2 size={14} className="text-[var(--violet)]" />
                 </motion.div>
               )}
             </button>
           );
         })}
      </div>

      {/* Workspace Area - The Funnel */}
      <div className="relative flex-1 bg-transparent overflow-hidden flex flex-col items-center">
        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-[length:32px_32px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-section)]/50 to-[var(--bg-section)] z-0" />

        <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col h-full items-center justify-between pointer-events-none py-10">
          
          {/* TOP: Active Channel Nodes */}
          <div className="w-full flex justify-center gap-4 sm:gap-8 md:gap-16 relative mb-16">
            <AnimatePresence>
              {activeSources.map((channel, idx) => {
                const c = CHANNELS[channel];
                const offset = idx - (activeSources.length - 1) / 2;
                const rotateDeg = offset * 20;

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    key={channel} 
                    className="flex flex-col items-center relative z-20"
                  >
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] border border-[var(--border)] flex items-center justify-center backdrop-blur-xl transition-all duration-500 shadow-xl bg-[var(--bg-card)]/90 relative group`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-[1.25rem] opacity-30 dark:opacity-10" />
                      <div className={`drop-shadow-sm ${c.activeColor.replace('bg-', 'text-')}`}>
                         {c.icon}
                      </div>

                      {/* Glowing pulse ring if running */}
                      {isRunning && (
                         <div className={`absolute inset-0 rounded-[1.25rem] ${c.activeColor} opacity-20 animate-ping`} style={{ animationDuration: '3s', animationDelay: `${idx * 0.5}s` }} />
                      )}
                    </div>
                    
                    {/* Ghostly Data Stream Line */}
                    <motion.div 
                       layout
                       className="absolute top-[60px] md:top-[70px] w-0.5 h-32 md:h-48 origin-top opacity-30" 
                       style={{
                         background: `linear-gradient(to bottom, var(--text-muted), transparent)`,
                         rotate: `${rotateDeg}deg`,
                       }} 
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* FALLING MESSAGES ANIMATION LAYER */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <AnimatePresence>
              {messages.map((msg) => {
                const sourceIdx = activeSources.indexOf(msg.source);
                const offset = sourceIdx - (activeSources.length - 1) / 2;
                const startX = `calc(50% + ${offset * 80}px)`; 
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
                       opacity: { duration: 0.3 }
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-[24px] border border-[var(--border)] shadow-xl backdrop-blur-2xl max-w-[200px] min-w-[160px] bg-[var(--bg-card)]/95`}
                  >
                    <div className={`absolute inset-0 rounded-[24px] ${c.bgColor} opacity-40`} />

                    <div className="relative z-10 flex gap-2 items-center mb-1.5 border-b border-[var(--border)] pb-1.5">
                      <div className={`scale-75 p-1 rounded-md ${c.bgColor} ${c.activeColor.replace('bg-', 'text-')}`}>{c.icon}</div>
                      <span className="text-[10px] font-bold uppercase text-[var(--text-sub)] tracking-widest">New Order</span>
                    </div>
                    <p className="relative z-10 text-xs text-[var(--text-main)] font-medium line-clamp-2 leading-relaxed">
                       {msg.text}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* MIDDLE: AI Processor Center */}
          <div className="relative mt-8 md:mt-0 z-40">
             {/* Dynamic Brain Pulse */}
             <AnimatePresence>
               {processingMsg && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.5, 1] }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   transition={{ duration: 1, repeat: Infinity }}
                   className={`absolute inset-0 rounded-full blur-3xl z-0 bg-[var(--violet)]`}
                 />
               )}
             </AnimatePresence>
             
             <div className={`relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full border flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-2xl ${processingMsg ? "border-[var(--violet)] bg-[var(--violet)] text-white scale-110 shadow-[0_0_40px_rgba(124,58,237,0.3)]" : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] shadow-xl"}`}>
                <Bot size={processingMsg ? 32 : 28} className={processingMsg ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" : ""} />
                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-2 ${processingMsg ? "opacity-90" : "opacity-60"}`}>
                  {processingMsg ? (locale === "bg" ? "Извличане..." : "Extracting") : "AI Core"}
                </span>

                {/* Satellite orbiting dot when processing */}
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

             {/* Holographic scanner popup */}
             <AnimatePresence>
               {processingMsg && (
                 <motion.div 
                   initial={{ opacity: 0, x: -20, rotateY: 90 }}
                   animate={{ opacity: 1, x: 0, rotateY: 0 }}
                   exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                   transition={{ type: "spring", damping: 20 }}
                   className="absolute left-full ml-6 top-1/2 -translate-y-1/2 w-48 p-3.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--violet)]/30 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                 >
                   {/* Scanning line animation inside popup */}
                   <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-[var(--violet)] shadow-[0_0_8px_var(--violet)] opacity-30 z-0" 
                   />

                   <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-2">
                       <Database size={10} className="text-[var(--violet)]" />
                       <div className="text-[9px] text-[var(--violet)] font-mono uppercase tracking-[0.2em]">{"<Data_Map>"}</div>
                     </div>
                     <div className="text-[10px] sm:text-xs text-[var(--text-sub)] font-mono flex flex-col gap-1.5">
                       <span className="flex justify-between">Source: <span className="text-[var(--text-main)] font-bold">{CHANNELS[processingMsg.source].enName}</span></span>
                       <span className="flex justify-between items-center gap-2">Item: <span className="text-[var(--lime)] font-bold truncate">{processingMsg.product}</span></span>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* BOTTOM: Unified ERP Base */}
          <div className="w-full mt-auto relative z-50 px-2 sm:px-0">
            <div className="text-center font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 md:mb-4">
               {locale === "bg" ? "Синхронизация с ERP" : "ERP Dashboard Sync"}
            </div>
            
            <div className="w-full max-w-3xl mx-auto h-52 bg-[var(--bg-card)]/80 border border-[var(--border)] rounded-[24px] shadow-xl backdrop-blur-2xl p-4 overflow-hidden relative flex flex-col gap-2">
               
               {orders.length === 0 && !isRunning && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 text-[var(--text-muted)]">
                   <Server size={32} className="mb-3 opacity-60" />
                   <span className="text-xs uppercase tracking-widest font-semibold font-mono">
                      {locale === "bg" ? "Системата е в готовност" : "System ready for deployment"}
                   </span>
                 </div>
               )}

               <AnimatePresence initial={false}>
                 {orders.map((order) => (
                   <motion.div
                     layout
                     key={order.id}
                     initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                     animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
                     className="w-full p-2.5 sm:p-3 bg-transparent/50 hover:bg-transparent border border-[var(--border)] rounded-xl flex items-center justify-between text-sm shrink-0 transition-colors"
                   >
                     <div className="flex items-center gap-3 md:gap-4 overflow-hidden pr-2">
                       {/* Animated Check */}
                       <div className="w-8 h-8 rounded-full bg-[var(--lime)]/10 text-[var(--lime)] flex items-center justify-center shrink-0 border border-[var(--lime)]/20 shadow-[0_0_10px_rgba(132,204,22,0.1)] relative">
                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                           <Check size={16} strokeWidth={3} />
                         </motion.div>
                         <motion.div 
                           initial={{ opacity: 1, scale: 1 }} 
                           animate={{ opacity: 0, scale: 2 }} 
                           transition={{ duration: 1 }}
                           className="absolute inset-0 rounded-full border border-[var(--lime)]"
                         />
                       </div>

                       <div className="truncate min-w-0 flex-1">
                         <div className="font-bold text-[var(--text-main)] flex items-center gap-2 text-xs sm:text-sm truncate">
                           {order.product}
                           <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md ${CHANNELS[order.source].bgColor} ${CHANNELS[order.source].activeColor.replace('bg-', 'text-')} shrink-0 border border-transparent`}>
                             {CHANNELS[order.source][locale === "bg" ? "bgName" : "enName"]}
                           </span>
                         </div>
                         <div className="text-[10px] sm:text-xs text-[var(--text-sub)] truncate mt-0.5 font-mono">
                           from: "{order.text}"
                         </div>
                       </div>
                     </div>

                     <div className="hidden sm:flex shrink-0 items-center gap-1.5 text-[9px] font-bold text-[var(--lime)] py-1 px-2.5 rounded border border-[var(--lime)]/20 uppercase tracking-widest bg-[var(--lime)]/10">
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-pulse" />
                       Stored
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

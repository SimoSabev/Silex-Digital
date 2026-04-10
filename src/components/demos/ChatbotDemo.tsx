"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Sparkles, Server, Zap, CheckCircle2, ChevronRight, Binary, Code2, ShieldCheck, Database } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useDemoAnalytics } from "@/hooks/useDemoAnalytics";

type Message = { id: string; role: "user" | "bot"; text: string };
type AgentThought = { id: string; text: { bg: string; en: string }; type: "parsing" | "searching" | "action"; log?: string };

const predefinedResponses = {
  pricing: {
    keywords: ["price", "cost", "how much", "цена", "струва", "колко"],
    thoughts: [
      { id: "1", text: { bg: "Анализ на намерение: Запитване за цени", en: "Intent analysis: Pricing query" }, type: "parsing" as const, log: "INIT_NLU_MATCH_PRICE" },
      { id: "2", text: { bg: "Извличане на ценови листи от базата...", en: "Extracting pricing from database..." }, type: "searching" as const, log: "DB_INDEX_SCAN_PLANS" },
    ],
    reply: { bg: "За да ви дам точна ценова оферта, бихте ли споделили какъв е обемът на клиентите ви месечно?", en: "To provide an accurate quote, could you share your approximate monthly customer volume?" }
  },
  integration: {
    keywords: ["connect", "hubspot", "crm", "api", "интеграция", "свързване"],
    thoughts: [
      { id: "1", text: { bg: "Анализ на намерение: Техническа интеграция", en: "Intent analysis: Technical integration" }, type: "parsing" as const, log: "INIT_NLU_TECH_REQ" },
      { id: "2", text: { bg: "Проверка на API документация за HubSpot/Salesforce...", en: "Checking API docs for HubSpot/Salesforce..." }, type: "searching" as const, log: "API_SCHEMA_VALIDATE" },
      { id: "3", text: { bg: "Конфигуриране на webhook отговор...", en: "Configuring webhook response..." }, type: "action" as const, log: "WEBHOOK_PAYLOAD_GEN" }
    ],
    reply: { bg: "Да, поддържаме пълни API и Webhook интеграции с платформи като HubSpot, Salesforce и персонализирани CRM системи. Имате ли конкретна платформа предвид?", en: "Yes, we support full API and Webhook integrations with platforms like HubSpot, Salesforce, and custom CRMs. Do you have a specific platform in mind?" }
  },
  default: {
    thoughts: [
      { id: "1", text: { bg: "Натурална езикова обработка (NLP) активирана...", en: "Natural Language Processing (NLP) engaged..." }, type: "parsing" as const, log: "NLP_MODEL_START" },
      { id: "2", text: { bg: "Генериране на персонализиран отговор...", en: "Generating personalized response..." }, type: "action" as const, log: "LLM_GEN_STREAM" }
    ],
    reply: { bg: "Разбирам! Нашият AI агент е обучен да поема подобни запитвания автоматично 24/7. Какво друго бихте искали да автоматизирате?", en: "I understand! Our AI agent is trained to handle such inquiries 24/7 automatically. What else would you like to automate?" }
  }
};

export default function ChatbotDemo() {
  const { locale } = useI18n();
  const { trackEvent } = useDemoAnalytics("chatbot", locale);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeThoughts, setActiveThoughts] = useState<AgentThought[]>([]);
  const [botPulsing, setBotPulsing] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void trackEvent("demo_viewed");
    // Initial welcome message
    setTimeout(() => {
      setMessages([{
        id: "welcome",
        role: "bot",
        text: locale === "bg" ? "Здравейте! Аз съм AI асистентът на Silex Digital. Напишете ми какво искате да автоматизирате (напр. 'Цена за чатбот' или 'Интеграция с CRM')." : "Hello! I am Silex Digital's AI assistant. Let me know what you want to automate (e.g., 'Chatbot pricing' or 'CRM Integration')."
      }]);
    }, 600);
  }, [trackEvent, locale]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, activeThoughts]);

  const determineResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (predefinedResponses.pricing.keywords.some(kw => lowerInput.includes(kw))) return predefinedResponses.pricing;
    if (predefinedResponses.integration.keywords.some(kw => lowerInput.includes(kw))) return predefinedResponses.integration;
    return predefinedResponses.default;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");
    setActiveThoughts([]);
    
    // Add user message
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: "user", text: userText }]);
    setIsTyping(true);
    setBotPulsing(true);
    void trackEvent("simulation_started", { input: userText });

    const responsePlan = determineResponse(userText);

    // Simulate thinking process sequentially
    let delay = 0;
    responsePlan.thoughts.forEach((thought) => {
      delay += 800 + Math.random() * 400; // slightly randomized delay for realism
      setTimeout(() => {
        setActiveThoughts(prev => [...prev, thought]);
      }, delay);
    });

    // Final response
    delay += 1000;
    setTimeout(() => {
      setIsTyping(false);
      setBotPulsing(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "bot", text: responsePlan.reply[locale] }]);
      // Keep thoughts visible for a moment then clear them
      setTimeout(() => setActiveThoughts([]), 3000);
      void trackEvent("simulation_completed", { outcome: responsePlan.reply[locale].substring(0, 20) });
    }, delay);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-[2rem] bg-[var(--bg-card)] overflow-hidden border border-[var(--border)] shadow-2xl flex-1 min-h-[600px] font-[family-name:var(--font-main)]">
      
      {/* Left: Chat Interface */}
      <div className="lg:col-span-3 flex flex-col h-full border-r border-[var(--border)] relative bg-transparent z-10 shadow-lg">
        {/* Chat header */}
        <div className="flex items-center gap-4 border-b border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-5 sticky top-0 z-20">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[var(--violet)] to-[var(--coral)] text-white shadow-lg">
              <Bot size={24} />
            </div>
            <motion.div 
              animate={botPulsing ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-[var(--bg-card)] ${isTyping ? "bg-[var(--coral)]" : "bg-[var(--lime)]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)] leading-tight tracking-tight flex items-center gap-2">
              Silex AI Agent
              <ShieldCheck size={16} className="text-[var(--violet)]" />
            </h3>
            <p className="text-xs font-semibold text-[var(--text-sub)]">
               {isTyping 
                  ? (locale === "bg" ? "Анализира заявката..." : "Analyzing request...") 
                  : (locale === "bg" ? "Онлайн и готов" : "Online & Ready")}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scroll-smooth bg-[url('/img/grid.svg')] bg-[length:32px_32px]">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                layout
                key={msg.id}
                initial={{ opacity: 0, scale: 0.9, y: 15, originY: 1, originX: msg.role === "user" ? 1 : 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                   <div className="shrink-0 h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--violet)]/20 to-[var(--coral)]/20 flex md:hidden items-center justify-center text-[var(--violet)] mr-2 mt-auto">
                     <Bot size={14} />
                   </div>
                )}
                
                <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3.5 text-[15px] leading-relaxed shadow-md backdrop-blur-md relative ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[var(--violet)] to-[#8b5cf6] text-white rounded-[1.5rem] rounded-br-sm"
                        : "bg-[var(--bg-card)]/90 text-[var(--text-main)] border border-[var(--border)] rounded-[1.5rem] rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10, scale: 0.9, originX: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-end justify-start max-w-[80%]"
              >
                <div className="shrink-0 h-8 w-8 rounded-lg bg-[var(--violet)]/10 flex items-center justify-center text-[var(--violet)] mr-3 border border-[var(--violet)]/20">
                   <Bot size={16} className="animate-pulse" />
                </div>
                <div className="bg-[var(--bg-card)]/80 border border-[var(--border)] rounded-[1.5rem] rounded-bl-sm px-5 py-4 flex gap-1.5 items-center w-20 shadow-sm backdrop-blur-md">
                  <motion.div className="h-1.5 w-1.5 bg-[var(--violet)] rounded-full" animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                  <motion.div className="h-1.5 w-1.5 bg-[var(--violet)] rounded-full" animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                  <motion.div className="h-1.5 w-1.5 bg-[var(--violet)] rounded-full" animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                </div>
              </motion.div>
            )}
            
            {/* Empty space at bottom to push content up slightly */}
            <div className="h-4" />
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-5 bg-[var(--bg-card)] border-t border-[var(--border)] relative z-20">
          
          <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar pb-1 px-1">
             <button type="button" disabled={isTyping} onClick={() => setInputValue(locale === "bg" ? "Интересува ме цена." : "I need pricing.")} className="shrink-0 whitespace-nowrap rounded-full border border-[var(--border)] bg-transparent px-4 py-1.5 text-xs font-semibold text-[var(--text-sub)] hover:border-[var(--violet)] hover:text-[var(--violet)] hover:bg-[var(--violet)]/5 hover:shadow-sm transition-all disabled:opacity-50">
               💰 {locale === "bg" ? "Запитване за цена" : "Pricing Inquiry"}
             </button>
             <button type="button" disabled={isTyping} onClick={() => setInputValue(locale === "bg" ? "Може ли интеграция с HubSpot?" : "Can we integrate with HubSpot?")} className="shrink-0 whitespace-nowrap rounded-full border border-[var(--border)] bg-transparent px-4 py-1.5 text-xs font-semibold text-[var(--text-sub)] hover:border-[var(--violet)] hover:text-[var(--violet)] hover:bg-[var(--violet)]/5 hover:shadow-sm transition-all disabled:opacity-50">
               🔌 {locale === "bg" ? "Въпрос за API" : "API Question"}
             </button>
          </div>

          <form onSubmit={handleSendMessage} className="relative flex items-center group">
            {/* Input Glow Effect */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--coral)] opacity-20 blur transition-opacity duration-500 group-hover:opacity-40" />
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={locale === "bg" ? "Попитай нещо..." : "Ask something..."}
              disabled={isTyping}
              className="relative w-full rounded-full border border-[var(--border)] bg-transparent py-3.5 pl-5 pr-14 text-sm font-medium text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--violet)] shadow-inner transition-all disabled:opacity-60"
            />
            <button
               type="submit"
               disabled={!inputValue.trim() || isTyping}
               className="absolute right-2 h-10 w-10 rounded-full bg-[var(--violet)] flex items-center justify-center text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] disabled:opacity-30 disabled:hover:scale-100 disabled:shadow-none"
             >
               <Send size={18} className="translate-x-[1px]" />
            </button>
          </form>
        </div>
      </div>

      {/* Right: AI Brain Activity Panel (Light Theme) */}
      <div className="lg:col-span-2 bg-[var(--bg-section)] border-l border-[var(--border)] p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
        
        {/* Radar Background grid */}
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-[length:24px_24px] opacity-40 pointer-events-none" />
        
        {/* Dynamic Abstract Brain Sphere Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none z-0">
           <motion.div 
             animate={botPulsing ? { rotate: 360, scale: [1, 1.1, 1] } : { rotate: 0 }}
             transition={{ rotate: { repeat: Infinity, duration: 10, ease: "linear" }, scale: { repeat: Infinity, duration: 2 } }}
             className="absolute inset-0 rounded-full border border-[var(--violet)]/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--violet)]/10 via-transparent to-transparent flex items-center justify-center"
           >
              <div className="w-[150px] h-[150px] rounded-full border border-[var(--violet)]/20 animate-[spin_15s_linear_infinite_reverse]" />
           </motion.div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
            <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--violet)]/30 shadow-sm">
               <Binary className="text-[var(--violet)] h-4 w-4" />
            </div>
            <h4 className="font-[family-name:var(--font-mono)] font-bold text-[var(--text-main)] uppercase tracking-widest text-[10px] md:text-xs">
              {locale === "bg" ? "Live: Лог на агента" : "Live: Agent Terminal"}
            </h4>
            {botPulsing && <span className="ml-auto w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse shadow-[0_0_8px_rgba(132,204,22,0.8)]" />}
          </div>

          <div className="flex flex-col space-y-3 font-[family-name:var(--font-mono)] text-sm">
            {activeThoughts.length === 0 && !isTyping ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center text-[var(--text-muted)] p-10 h-48 border border-[var(--border)] bg-[var(--bg-card)]/50 rounded-[24px] backdrop-blur-md shadow-inner">
                <Database className="h-8 w-8 mb-4 opacity-50" />
                <p className="text-xs tracking-wider uppercase font-semibold">{locale === "bg" ? "СИСТЕМАТА ОЧАКВА ДАННИ" : "SYSTEM STANDBY"}</p>
                <div className="mt-2 w-12 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                   <motion.div className="h-full bg-[var(--violet)]/30" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
                </div>
              </motion.div>
            ) : (
               <div className="h-64 sm:h-auto overflow-y-auto hide-scrollbar space-y-3 pb-8">
                 <AnimatePresence>
                   {activeThoughts.map((thought, idx) => (
                     <motion.div
                       layout
                       key={thought.id}
                       initial={{ opacity: 0, x: 20, scale: 0.95 }}
                       animate={{ opacity: 1, x: 0, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       transition={{ type: "spring", stiffness: 300, damping: 25 }}
                       className="flex flex-col bg-[var(--bg-card)]/90 p-3.5 rounded-xl border border-[var(--violet)]/20 shadow-md backdrop-blur-xl relative overflow-hidden group"
                     >
                       {/* Scanner line inside log box */}
                       <motion.div 
                          initial={{ left: "-100%" }} animate={{ left: "100%" }} transition={{ duration: 1 }}
                          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--violet)]/10 to-transparent skew-x-[-20deg]"
                       />

                       <div className="flex items-center gap-2 mb-1.5 opacity-80">
                         {thought.type === "parsing" ? <Code2 className="h-3 w-3 text-[var(--coral)]" /> :
                          thought.type === "searching" ? <Database className="h-3 w-3 text-[var(--violet)]" /> :
                          <Zap className="h-3 w-3 text-[var(--lime)]" />}
                         <span className="text-[9px] text-[var(--text-sub)] uppercase tracking-widest leading-none">{thought.log}</span>
                       </div>
                       
                       <div className="flex gap-2 relative z-10">
                         <ChevronRight size={14} className="text-[var(--violet)] shrink-0 mt-0.5" />
                         <span className="text-[11px] md:text-xs leading-relaxed text-[var(--text-main)] font-medium">
                           {thought.text[locale]}
                         </span>
                       </div>
                     </motion.div>
                   ))}
                   {isTyping && (
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="flex items-center gap-2 h-6 pl-2"
                     >
                        <div className="w-1 h-3 bg-[var(--violet)] animate-pulse" />
                        <span className="text-[10px] text-[var(--violet)] uppercase tracking-widest font-bold font-mono">
                          {locale === "bg" ? "Процесиране_В_Ход..." : "Processing_Stream..."}
                        </span>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            )}
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-auto border-t border-[var(--border)] pt-4 relative z-10 flex justify-between items-center px-1">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase text-[var(--text-muted)] tracking-widest mb-0.5 font-mono">Latency</span>
            <span className="text-xs font-bold text-[var(--lime)] font-mono animate-pulse">24ms</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[9px] uppercase text-[var(--text-muted)] tracking-widest mb-0.5 font-mono">Model</span>
            <span className="text-xs font-bold text-[var(--text-sub)] font-mono">SD-Agent-v2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

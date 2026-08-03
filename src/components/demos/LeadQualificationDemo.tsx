"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Building2, Wallet, Phone, Target, Zap, RotateCcw, Activity } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useDemoAnalytics } from "@/hooks/useDemoAnalytics";

// Define the simulated conversation that will be auto-typed
const MOCK_TRANSCRIPT = {
  bg: "Здравейте! Пиша ви от Спийдикарт ООД. Интересуваме се от изграждане на B2B портал за нашите клиенти. Имаме заделен бюджет от около 15,000 лева за първата фаза. Проектът е спешен и искаме да стартираме до края на месеца. Моля, свържете се с мен на 0884 123 456.",
  en: "Hello! I am writing from SpeedyCart Ltd. We are interested in building a B2B portal for our clients. We have an allocated budget of around $15,000 for the first phase. The project is urgent and we want to start by the end of the month. Please contact me at 555-019-2834."
};

// Key phrases to trigger extraction
const EXTRACTION_RULES = {
  company: { type: 'company', icon: <Building2 size={14}/>, bgTrigger: "Спийдикарт ООД", enTrigger: "SpeedyCart Ltd" },
  intent: { type: 'intent', icon: <Target size={14}/>, bgTrigger: "изграждане на B2B портал", enTrigger: "building a B2B portal" },
  budget: { type: 'budget', icon: <Wallet size={14}/>, bgTrigger: "15,000 лева", enTrigger: "$15,000" },
  phone: { type: 'phone', icon: <Phone size={14}/>, bgTrigger: "0884 123 456", enTrigger: "555-019-2834" }
};

type ExtractedData = {
  company: string | null;
  intent: string | null;
  budget: string | null;
  phone: string | null;
};

export default function LeadQualificationDemo() {
  const { locale } = useI18n();
  const { trackEvent } = useDemoAnalytics("lead-qualification", locale);

  const [isRunning, setIsRunning] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedData>({ company: null, intent: null, budget: null, phone: null });
  const [score, setScore] = useState(0);

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    void trackEvent("demo_viewed");
    return () => stopTyping();
  }, [trackEvent]);

  // Evaluate extraction continuously based on what's currently typed
  useEffect(() => {
    if (!isRunning) return;
    
    let currentScore = 0;
    const newData: ExtractedData = { company: null, intent: null, budget: null, phone: null };

    Object.entries(EXTRACTION_RULES).forEach(([key, rule]) => {
      const trigger = locale === "bg" ? rule.bgTrigger : rule.enTrigger;
      
      // If the typed text so far has completed the trigger word
      if (typedText.includes(trigger)) {
         (newData as any)[key] = trigger; // Cast to bypass TS strictness for dynamic assign
         currentScore += 25; // 4 items = 100 max
      }
    });

    setExtractedData(newData);
    setScore(currentScore);

  }, [typedText, isRunning, locale]);

  const stopTyping = () => {
    if (typingIntervalRef.current) {
       clearInterval(typingIntervalRef.current);
       typingIntervalRef.current = null;
    }
  };

  const startDemo = () => {
    setIsRunning(true);
    setTypedText("");
    setExtractedData({ company: null, intent: null, budget: null, phone: null });
    setScore(0);
    stopTyping();
    void trackEvent("simulation_started");

    const fullText = MOCK_TRANSCRIPT[locale];
    let i = 0;

    typingIntervalRef.current = setInterval(() => {
      if (i <= fullText.length) {
         setTypedText(fullText.substring(0, i));
         i += 1 + Math.floor(Math.random() * 3); // Type 1-3 chars at a time for realism
      } else {
         stopTyping();
         setTimeout(() => {
           setIsRunning(false);
           void trackEvent("simulation_completed");
         }, 1000);
      }
    }, 40); // typing speed
  };

  const resetDemo = () => {
    stopTyping();
    setIsRunning(false);
    setTypedText("");
    setExtractedData({ company: null, intent: null, budget: null, phone: null });
    setScore(0);
  };

  // Helper function to highlight text
  const renderHighlightedText = () => {
    let result = typedText;
    const colors = {
      company: "bg-blue-500/20 text-blue-500 border border-blue-500/30",
      intent: "bg-purple-500/20 text-purple-500 border border-purple-500/30",
      budget: "bg-green-500/20 text-green-500 border border-green-500/30",
      phone: "bg-orange-500/20 text-orange-500 border border-orange-500/30",
    };

    // Very naive highlighting - requires exact match which we know we have from the trigger
    Object.entries(EXTRACTION_RULES).forEach(([key, rule]) => {
       const trigger = locale === "bg" ? rule.bgTrigger : rule.enTrigger;
       if (result.includes(trigger)) {
         // Use a split/join trick to wrap the found text in a span.
         // Wait, using dangerouslySetInnerHTML or complex parsing is tricky.
         // Let's do simple string replace with token markers since React needs arrays or React Nodes.
         // Actually, for simplicity, we'll just show the raw text. The wow factor is on the right side.
         // Oh wait, highlighting in the text is very cool. Let's do a quick regex replacement to HTML, and dangerouslySetInnerHTML.
       }
    });

    // Instead of raw HTML, let's just color it safely
    let highlightedHtml = typedText;
    Object.entries(EXTRACTION_RULES).forEach(([key, rule]) => {
      const trigger = locale === "bg" ? rule.bgTrigger : rule.enTrigger;
      const colorCls = colors[key as keyof typeof colors];
      if (highlightedHtml.includes(trigger)) {
        highlightedHtml = highlightedHtml.replace(
           trigger, 
           `<span class="inline-block px-1 rounded-md font-semibold ${colorCls} transition-all duration-300 scale-105">${trigger}</span>`
        );
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />;
  };

  return (
    <div className="flex flex-col rounded-2xl sm:rounded-[24px] bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl overflow-hidden min-h-[min(480px,80dvh)] sm:min-h-[500px]">
      
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 border-b border-[var(--border)] bg-transparent relative z-10">
        <div className="min-w-0">
          <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-main)] leading-tight flex items-center gap-2">
             <Activity className="text-[var(--accent)] shrink-0" size={20}/>
             <span className="truncate">{locale === "bg" ? "AI Квалификация на Лийдове" : "AI Lead Qualification"}</span>
          </h3>
          <p className="text-xs text-[var(--text-sub)] mt-0.5">
             {locale === "bg" ? "Извличане на стойност от свободен текст." : "Extracting value from unstructured text."}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          {typedText.length > 0 && !isRunning && (
            <button onClick={resetDemo} className="p-2.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
               <RotateCcw size={16} />
            </button>
          )}
          <button
            onClick={startDemo}
            disabled={isRunning}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-[var(--accent)]/25 transition-all duration-300 hover:scale-105 hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent)]/50 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[var(--accent)] min-h-[44px]"
          >
            {isRunning ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Sparkles size={16} />
                </motion.div>
                <span>{locale === "bg" ? "Слушане..." : "Listening..."}</span>
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>{locale === "bg" ? "Прихвани Лийд" : "Capture Lead"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] relative bg-transparent">
        
        {/* LEFT: Raw Input */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col bg-[url('/img/grid.svg')] bg-[length:32px_32px] min-h-[200px]">
           <div className="mb-4 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-sub)]">
               {locale === "bg" ? "Неструктуриран Текст (Имейл/Чат)" : "Unstructured Text (Email/Chat)"}
             </span>
           </div>
           
           <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-inner">
              <div className="text-[15px] leading-relaxed text-[var(--text-main)] font-medium h-full">
                {typedText ? renderHighlightedText() : (
                  <span className="text-[var(--text-muted)] italic">
                    {locale === "bg" ? "Изчаква се входяща комуникация..." : "Waiting for incoming communication..."}
                  </span>
                )}
                {isRunning && <span className="inline-block w-2.5 h-4 ml-1 bg-[var(--accent)] animate-ping" />}
              </div>
           </div>
        </div>

        {/* RIGHT: Live Extraction & Scoring */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col bg-[var(--bg-section)] relative overflow-hidden">
           {/* Background Glow */}
           <AnimatePresence>
             {score === 100 && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.15 }}
                 className="absolute inset-0 bg-red-500 rounded-full blur-[100px] pointer-events-none" 
               />
             )}
           </AnimatePresence>

           <div className="mb-6 flex items-center gap-2 relative z-10">
             <Sparkles className="text-[var(--accent)]" size={18} />
             <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)]">
               {locale === "bg" ? "Live Lead Профил" : "Live Lead Profile"}
             </span>
           </div>

           {/* Cards for extracted data */}
           <div className="grid grid-cols-1 gap-3 relative z-10">
             {(Object.keys(EXTRACTION_RULES) as (keyof ExtractedData)[]).map((key) => {
               const rule = EXTRACTION_RULES[key];
               const hasValue = !!extractedData[key];
               
               return (
                 <div key={key} className={`p-3 rounded-lg border transition-all duration-500 flex items-center gap-4 ${hasValue ? "bg-[var(--bg-card)] border-[var(--border)] shadow-md" : "bg-transparent border-dashed border-[var(--border)] opacity-40"}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${hasValue ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-transparent text-[var(--text-muted)]"}`}>
                     {rule.icon}
                   </div>
                   <div className="flex-1">
                     <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-0.5">
                       {key.charAt(0).toUpperCase() + key.slice(1)}
                     </div>
                     <div className={`text-sm font-semibold transition-all duration-300 ${hasValue ? "text-[var(--text-main)]" : "text-[var(--text-muted)] italic"}`}>
                       {hasValue ? extractedData[key] : (locale === "bg" ? "Изчаква се..." : "Pending...")}
                     </div>
                   </div>
                   {hasValue && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                       <Zap size={16} className="text-green-500" />
                     </motion.div>
                   )}
                 </div>
               );
             })}
           </div>

           {/* Scoring Gauge at bottom */}
           <div className="mt-auto pt-6 w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[var(--border)] relative z-10">
              <div>
                <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">
                  {locale === "bg" ? "Качество" : "Quality Score"}
                </div>
                <div className="text-2xl font-black text-[var(--text-main)] font-[family-name:var(--font-display)] flex items-end gap-1">
                   <motion.span
                      key={score}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                   >
                     {score}
                   </motion.span>
                   <span className="text-sm pb-1 text-[var(--text-muted)] font-normal">/ 100</span>
                </div>
              </div>
              
              {/* Dynamic Status Badge */}
              <AnimatePresence mode="popLayout">
                 {score > 0 && (
                   <motion.div 
                     initial={{ scale: 0.8, opacity: 0 }} 
                     animate={{ scale: 1, opacity: 1 }}
                     className={`self-start sm:self-auto px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${
                       score === 100 ? "border-red-500/30 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" :
                       score >= 50 ? "border-orange-500/30 bg-orange-500/10 text-orange-500" :
                       "border-blue-500/30 bg-blue-500/10 text-blue-500"
                     }`}
                   >
                     {score === 100 ? (locale === "bg" ? "🔥 Горещ" : "🔥 Hot Lead") : 
                      score >= 50 ? (locale === "bg" ? "⭐ Топъл" : "⭐ Warm Lead") : 
                      (locale === "bg" ? "❄️ Слаб" : "❄️ Cold Lead")}
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  );
}

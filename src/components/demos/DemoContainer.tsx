"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Maximize2, ArrowRight, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { useDemoAnalytics } from "@/hooks/useDemoAnalytics";
import { APPLE_EASE } from "@/components/ui/LazyReveal";

interface DemoContainerProps {
  demoId?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
}

export default function DemoContainer({
  demoId,
  title,
  description,
  icon,
  children,
  ctaText = "View full demo",
  ctaLink = "/contact",
  badge,
}: DemoContainerProps) {
  const { locale } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);
  
  const { trackEvent } = useDemoAnalytics(
    demoId ?? title.toLowerCase().replace(/\s+/g, "-"),
    locale,
  );

  useEffect(() => {
    if (isExpanded) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/demos/${demoId ?? title.toLowerCase().replace(/\s+/g, "-")}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed silently (permission denied, non-HTTPS, iframe)
    }
  };

  return (
    <>
      {/* SHRUNK PREVIEW CARD */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.5, ease: APPLE_EASE }}
        className="card group flex flex-col h-full cursor-pointer overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-lg hover:shadow-2xl transition-all"
        onClick={() => setIsExpanded(true)}
      >
        <div className="p-6 pb-4 border-b border-[var(--border)]">
          {badge && (
            <span className="badge badge-primary mb-4 inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--violet)]" />
              {badge}
            </span>
          )}
          <div className="flex items-center gap-3 mb-3">
             {icon && (
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-section)] text-[var(--violet)] group-hover:bg-[var(--violet)] group-hover:text-white transition-colors duration-500">
                 {icon}
               </div>
             )}
             <h3 className="text-xl font-bold text-[var(--text-main)]">{title}</h3>
          </div>
          <p className="text-sm text-[var(--text-sub)]">{description}</p>
        </div>

        {/* Pristine Abstract Visual Cover */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8 bg-[var(--bg-section)]">
           {/* Decorative Background Mesh */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
           
           {/* Center Glowing Icon Presentation */}
           <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]">
             {/* Pulse rings */}
             <div className="absolute w-24 h-24 rounded-full border border-[var(--violet)]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
             <div className="absolute w-32 h-32 rounded-full border border-[var(--coral)]/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-1000" />
             
             {/* Core Icon Box */}
             <div className="relative w-16 h-16 rounded-[24px] bg-gradient-to-br from-[var(--violet)] to-[var(--coral)] flex items-center justify-center text-white shadow-[0_0_40px_rgba(124,58,237,0.4)]">
               {icon}
             </div>
           </div>

           {/* Floating "Click to interact" Pill */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 y-4 group-hover:opacity-100 group-hover:y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
              <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-main)] px-5 py-2.5 rounded-full font-bold shadow-xl backdrop-blur-md">
                <Maximize2 size={16} className="text-[var(--violet)]" />
                {locale === "bg" ? "Интерактивно демо" : "Launch Demo"}
              </div>
           </div>
        </div>
      </motion.div>

      {/* EXPANDED FULL-SCREEN MODAL */}
      {mounted && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-8"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
              className="flex flex-col w-full max-w-7xl max-h-[95vh] rounded-[24px] border border-white/20 bg-transparent shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] p-6 bg-[var(--bg-card)]/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  {icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-gradient-to-tr from-[var(--violet)] to-[var(--coral)] text-white shadow-lg">
                      {icon}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-main)] font-[family-name:var(--font-display)]">{title}</h3>
                    <p className="text-sm text-[var(--text-sub)]">
                      {locale === "bg" ? "Интерактивна симулация" : "Interactive Simulation"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label={locale === "bg" ? "Затвори" : "Close"}
                  className="rounded-full bg-[var(--bg-section)] p-3 text-[var(--text-sub)] transition-all hover:bg-[var(--violet)] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content - Fully Interactive */}
              <div className="flex-1 overflow-y-auto bg-[var(--bg-section)] p-6 md:p-10 relative">
                {/* Subtle gradient glow in background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--violet)]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--coral)]/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 max-w-5xl mx-auto">
                  {children}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center border-t border-[var(--border)] bg-[var(--bg-card)] p-6">
                <p className="text-sm text-[var(--text-muted)] hidden md:block">
                   {locale === "bg" ? "Хареса ли ви резултатът?" : "Like what you see?"}
                </p>
                <div className="flex gap-4 w-full md:w-auto">
                  <Button
                    variant="ghost"
                    onClick={handleShare}
                    className="flex-1 md:flex-none flex items-center gap-2"
                    title={locale === "bg" ? "Копирай линк за споделяне" : "Copy share link"}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
                    {copied
                      ? (locale === "bg" ? "Копирано!" : "Copied!")
                      : (locale === "bg" ? "Сподели" : "Share")}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="flex-1 md:flex-none"
                  >
                    {locale === "bg" ? "Затвори" : "Close"}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      void trackEvent("demo_cta_clicked", { ctaLink, placement: "modal" });
                      window.location.href = ctaLink;
                    }}
                    className="flex-1 md:flex-none btn-primary hover:scale-[1.02] transition-transform shadow-xl hover:shadow-[var(--violet)]/30"
                  >
                    {locale === "bg" ? "Заяви това за своя бизнес" : "Request this for your business"} <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

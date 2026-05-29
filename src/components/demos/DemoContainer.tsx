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
  /** Open the interactive demo immediately (e.g. dedicated /demos/[id] pages). */
  startExpanded?: boolean;
  /** Render demo inline without preview card / modal (for /demos/[id] pages). */
  displayMode?: "modal" | "inline";
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
  startExpanded = false,
  displayMode = "modal",
}: DemoContainerProps) {
  const { locale } = useI18n();
  const [isExpanded, setIsExpanded] = useState(startExpanded);
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

  if (displayMode === "inline") {
    return (
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="overflow-x-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-section)]">
          {children}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            variant="ghost"
            onClick={handleShare}
            className="min-h-[44px] w-full sm:w-auto"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
            {copied
              ? (locale === "bg" ? "Копирано!" : "Copied!")
              : (locale === "bg" ? "Сподели" : "Share")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              void trackEvent("demo_cta_clicked", { ctaLink, placement: "inline" });
              window.location.href = ctaLink;
            }}
            className="btn-primary min-h-[48px] w-full sm:w-auto"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SHRUNK PREVIEW CARD */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.5, ease: APPLE_EASE }}
        className="card group flex flex-col h-full cursor-pointer overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-lg hover:shadow-2xl transition-all max-sm:active:scale-[0.99]"
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
             <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] line-clamp-2">{title}</h3>
          </div>
          <p className="text-sm text-[var(--text-sub)]">{description}</p>
        </div>

        {/* Preview Visual */}
        <div className="relative h-52 overflow-hidden flex items-center justify-center bg-[var(--bg-section)]">
           {/* Dot mesh */}
           <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

           {/* Gradient glow behind icon */}
           <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-[var(--violet)]/25 to-[var(--coral)]/15 blur-2xl" />

           {/* Center icon with rings */}
           <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]">
             <div className="absolute w-20 h-20 rounded-full border border-[var(--violet)]/25 animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
             <div className="absolute w-28 h-28 rounded-full border border-[var(--coral)]/15 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '1s' }} />
             <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--violet)] to-[var(--coral)] flex items-center justify-center text-white shadow-[0_0_32px_rgba(124,58,237,0.45)]">
               {icon}
             </div>
           </div>

           {/* Launch pill — visible always, brighter on hover */}
           <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-main)] px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-md whitespace-nowrap">
               <Maximize2 size={14} className="text-[var(--violet)] shrink-0" />
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
            className="fixed inset-0 z-[250] flex items-stretch sm:items-center justify-center bg-black/60 p-0 sm:p-4 md:p-8"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.98, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 24, opacity: 0 }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
              className="flex flex-col w-full h-dvh sm:h-auto sm:max-h-[95dvh] max-w-7xl sm:rounded-[24px] border-0 sm:border border-white/20 bg-[var(--bg-card)] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[var(--border)] p-4 sm:p-6 bg-[var(--bg-card)]/95 backdrop-blur-md safe-area-pt">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  {icon && (
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl sm:rounded-[24px] bg-gradient-to-tr from-[var(--violet)] to-[var(--coral)] text-white shadow-lg">
                      {icon}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-2xl font-bold text-[var(--text-main)] font-[family-name:var(--font-display)] leading-tight truncate sm:whitespace-normal">{title}</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-sub)]">
                      {locale === "bg" ? "Интерактивна симулация" : "Interactive Simulation"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label={locale === "bg" ? "Затвори" : "Close"}
                  className="shrink-0 rounded-full bg-[var(--bg-section)] p-2.5 sm:p-3 text-[var(--text-sub)] transition-all hover:bg-[var(--violet)] hover:text-white touch-target"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content - Fully Interactive */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-[var(--bg-section)] p-3 sm:p-6 md:p-10 relative overscroll-contain">
                <div className="absolute top-0 right-0 w-[min(100%,500px)] h-[min(100%,500px)] bg-[var(--violet)]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[min(100%,500px)] h-[min(100%,500px)] bg-[var(--coral)]/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 max-w-5xl mx-auto w-full">
                  {children}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex shrink-0 flex-col gap-3 border-t border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 safe-area-pb sm:flex-row sm:justify-between sm:items-center">
                <p className="text-sm text-[var(--text-muted)] hidden md:block">
                   {locale === "bg" ? "Хареса ли ви резултатът?" : "Like what you see?"}
                </p>
                <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
                    title={locale === "bg" ? "Копирай линк за споделяне" : "Copy share link"}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500 shrink-0" /> : <Share2 className="h-4 w-4 shrink-0" />}
                    <span className="truncate">{copied
                      ? (locale === "bg" ? "Копирано!" : "Copied!")
                      : (locale === "bg" ? "Сподели" : "Share")}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="min-h-[44px] text-sm"
                  >
                    {locale === "bg" ? "Затвори" : "Close"}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      void trackEvent("demo_cta_clicked", { ctaLink, placement: "modal" });
                      window.location.href = ctaLink;
                    }}
                    className="col-span-2 sm:col-span-1 btn-primary min-h-[48px] text-sm sm:text-base hover:scale-[1.02] transition-transform shadow-xl hover:shadow-[var(--violet)]/30"
                  >
                    <span className="truncate">
                      {locale === "bg" ? "Заяви за моя бизнес" : "Request for my business"}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-1 shrink-0" />
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

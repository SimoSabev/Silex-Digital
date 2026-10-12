"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { pricingFaqsBg, pricingFaqsEn } from "@/lib/pricing-data";
import { type Locale } from "@/lib/offer";
import { tr } from "./offer-utils";

export default function PricingFaq({ locale }: { locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const faqs = locale === "bg" ? pricingFaqsBg : pricingFaqsEn;

  return (
    <section aria-labelledby="faq-title" className="relative z-10 mx-auto mb-28 max-w-3xl">
      <h2 id="faq-title" className="mb-10 text-center text-h2 text-[var(--text-main)]">
        {tr(locale, "Въпроси за цените", "Questions about pricing")}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `${baseId}-panel-${idx}`;
          return (
            <div
              key={faq.q}
              className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] transition-colors hover:border-[var(--text-muted)]"
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-body text-body font-semibold text-[var(--text-main)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-6"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-section)] transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-5 text-body text-[var(--text-sub)] sm:px-6">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

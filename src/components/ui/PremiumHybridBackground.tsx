"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Global site backdrop — the "atelier" system.
 *
 * SilexBrand's positioning is bespoke ("Не предлагаме готови пакети.
 * Изграждаме решения."), so the signature texture is a tailored-suit
 * pinstripe lattice in the brand wine, kept visible — not a watermark —
 * under a confident wine wash at the top of every page.
 *
 * All layers are CSS/SVG: crisp at any DPI, zero network weight.
 */
export default function PremiumHybridBackground() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Base */}
      <div
        className="pointer-events-none fixed inset-0 -z-50 bg-[var(--bg-page)]"
        aria-hidden="true"
      />

      {/* Static texture stack — always visible, no mount gate */}
      <div className="pointer-events-none fixed inset-0 -z-40" aria-hidden="true">
        {/* Top wine wash — gives every page a designed "head" */}
        <div
          className="absolute inset-x-0 top-0 h-[70vh]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% -20%, color-mix(in srgb, var(--accent) 22%, transparent) 0%, color-mix(in srgb, var(--accent-10) 45%, transparent) 38%, transparent 72%)",
          }}
        />

        {/* Signature: atelier pinstripe lattice (tailored-fabric diagonal) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, color-mix(in srgb, var(--accent) 9%, transparent) 0px, color-mix(in srgb, var(--accent) 9%, transparent) 1px, transparent 1px, transparent 64px)",
          }}
        />
        {/* Cross-thread: a second, sparser run at the opposite angle */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-115deg, color-mix(in srgb, var(--accent) 6%, transparent) 0px, color-mix(in srgb, var(--accent) 6%, transparent) 1px, transparent 1px, transparent 160px)",
          }}
        />

        {/* Corner glows with real presence */}
        <div
          className="absolute -top-[15%] -left-[10%] h-[55vh] w-[55vw] rounded-full blur-[130px]"
          style={{ background: "color-mix(in srgb, var(--accent) 13%, transparent)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[12%] h-[60vh] w-[50vw] rounded-full blur-[140px]"
          style={{ background: "color-mix(in srgb, var(--accent-10) 55%, transparent)" }}
        />

        {/* Film grain for tactility */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Slow drifting accent glow — deferred, skipped on reduced motion */}
      {mounted && !prefersReduced && (
        <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div
              className="animate-float-slow absolute top-[35%] right-[5%] h-[40vh] w-[35vw] rounded-full blur-[120px]"
              style={{
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                animationDuration: "28s",
              }}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}

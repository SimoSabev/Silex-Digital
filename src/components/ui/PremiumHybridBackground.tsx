"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PremiumHybridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Background Layer: Ambient Slow Moving Neon Orbs (Tech-Noir Glow) */}
      <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[var(--bg-page)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-[var(--violet)]/10 blur-[140px] mix-blend-multiply animate-float-slow"
            style={{ animationDuration: '25s' }}
          />
          <div 
            className="absolute bottom-[-10%] right-[-10%] h-[70%] w-[50%] rounded-full bg-[var(--coral)]/5 blur-[120px] mix-blend-multiply animate-float-slow"
            style={{ animationDuration: '30s', animationDelay: '5s' }}
          />
          <div 
            className="absolute top-[30%] right-[10%] h-[40%] w-[40%] rounded-full bg-[var(--lime)]/5 blur-[100px] mix-blend-multiply animate-float-slow"
            style={{ animationDuration: '20s', animationDelay: '2s' }}
          />
        </motion.div>
      </div>

      {/* Overlay Layer: Universal Premium Texture (Noise + Dot Grid) */}
      <div className="pointer-events-none fixed inset-0 z-[9999]">
        {/* Apple-like Custom Film Grain / Paper Texture */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Structural Custom Dot Grid (Neo-Brutalist Frame) */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black 10%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 95%)'
          }}
        />
      </div>
    </>
  );
}

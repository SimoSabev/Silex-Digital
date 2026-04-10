"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

interface LazyRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function LazyReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = ""
}: LazyRevealProps) {
  
  const getInitial = () => {
    switch(direction) {
      case "up": return { opacity: 0, y: 40 };
      case "down": return { opacity: 0, y: -40 };
      case "left": return { opacity: 0, x: 40 };
      case "right": return { opacity: 0, x: -40 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: APPLE_EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealVariant = "rise" | "blur" | "scale" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  /** Re-run the animation each time it enters view instead of once. */
  repeat?: boolean;
};

const buildVariants = (variant: RevealVariant): Variants => {
  const hidden: Record<RevealVariant, Record<string, number | string>> = {
    rise: { opacity: 0, y: 36 },
    blur: { opacity: 0, y: 20, filter: "blur(10px)" },
    scale: { opacity: 0, scale: 0.94 },
    left: { opacity: 0, x: -48 },
    right: { opacity: 0, x: 48 },
  };
  return {
    hidden: hidden[variant],
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  };
};

/** Scroll-triggered reveal. Fades in when the element enters the viewport. */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className = "",
  repeat = false,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const variants = buildVariants(variant);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/** Parent that staggers direct <RevealItem> children as the group enters view. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}: RevealGroupProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
};

/** Child of <RevealGroup>; inherits the group's stagger timing. */
export function RevealItem({
  children,
  variant = "rise",
  className = "",
}: RevealItemProps) {
  const variants = buildVariants(variant);
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

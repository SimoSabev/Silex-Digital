"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

type AnimationMode = "immediate" | "inView";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  /**
   * "immediate" — animates on mount (use above the fold so SSR content
   *   is never opacity:0 waiting for a scroll trigger).
   * "inView"    — animates when the element scrolls into view (default,
   *   use below the fold).
   */
  mode?: AnimationMode;
}

const directionOffsets = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
  mode = "inView",
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();
  const offset = directionOffsets[direction];

  // When reduced motion is requested, render children with no animation.
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      },
    },
  };

  if (mode === "immediate") {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger containers ────────────────────────────────────────────────────

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.05,
  mode = "inView",
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  mode?: AnimationMode;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };

  if (mode === "immediate") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

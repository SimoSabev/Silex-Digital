"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

interface ParallaxBackgroundProps {
  src: string;
  opacity?: number;
  /** How far the image drifts as its section scrolls through view, in vh. */
  travel?: number;
  /** Adds a fade-to-page-background gradient over the image for text legibility. */
  fade?: "top" | "bottom" | "both" | "none";
  priority?: boolean;
  className?: string;
}

export default function ParallaxBackground({
  src,
  opacity = 0.16,
  travel = 18,
  fade = "both",
  priority = false,
  className = "",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  const fadeClass = {
    top: "bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)]/10 to-transparent",
    bottom: "bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/10 to-transparent",
    both: "bg-gradient-to-b from-[var(--bg-page)]/70 via-transparent to-[var(--bg-page)]",
    none: "",
  }[fade];

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="absolute inset-x-0 -top-[20%] h-[140%] w-full"
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ opacity }}
        />
      </motion.div>
      {fadeClass && <div className={`absolute inset-0 ${fadeClass}`} />}
    </div>
  );
}

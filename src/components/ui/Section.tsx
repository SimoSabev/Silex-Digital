"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  variant?: "default" | "muted" | "gradient" | "dark" | "primary";
  size?: "sm" | "md" | "lg" | "xl";
  id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      title,
      subtitle,
      centered = false,
      variant = "default",
      size = "lg",
      id,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variants: Record<string, string> = {
      default: "bg-[var(--color-bg-primary)]",
      muted: "bg-[var(--color-bg-secondary)]",
      gradient:
        "bg-gradient-to-b from-[var(--color-bg-primary)] via-emerald-950/20 to-[var(--color-bg-primary)]",
      dark: "bg-black",
      primary: "bg-[var(--color-bg-primary)]",
    };

    const paddings: Record<string, string> = {
      sm: "py-32 md:py-40",
      md: "py-40 md:py-52",
      lg: "py-48 md:py-60",
      xl: "py-56 md:py-72",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={`${paddings[size]} ${variants[variant]} relative overflow-hidden ${className}`}
        {...props}
      >
        <div className="relative z-10">
          {(title ?? subtitle) && (
            <div
              className={`container mx-auto ${centered ? "text-center" : "text-left"} mb-20 md:mb-28`}
            >
              {title && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl ${
                    centered ? "mx-auto" : ""
                  }`}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          )}
          <div className="container mx-auto">{children}</div>
        </div>
      </section>
    );
  },
);

Section.displayName = "Section";
export default Section;

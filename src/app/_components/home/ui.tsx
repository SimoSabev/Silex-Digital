"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({ badge, title, sub, align = "center", className = "" }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <AnimatedSection className={`max-w-3xl ${alignment} ${className}`}>
      {badge && (
        <p className="mb-5 inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-1.5 eyebrow text-[var(--accent)]">
          {badge}
        </p>
      )}
      <h2 className="text-h2 text-[var(--text-main)]">{title}</h2>
      {sub && <p className="mt-4 text-lead text-[var(--text-sub)]">{sub}</p>}
    </AnimatedSection>
  );
}

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

const CTA_VARIANTS: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  primary: "btn-primary font-bold transition-transform hover:-translate-y-0.5",
  secondary: "btn-secondary font-semibold",
  ghost: "btn-ghost font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/10",
};

/** A link styled as a button — avoids nesting <button> inside <a>. */
export function CtaLink({ href, children, variant = "primary", size = "md", className = "" }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={`${CTA_VARIANTS[variant]} ${size === "lg" ? "btn-lg" : ""} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className}`}
    >
      {children}
    </Link>
  );
}

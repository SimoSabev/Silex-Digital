"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

type DarkHeroProps = {
  /** Optional ribbon/atmosphere image layered over the dark band. */
  image?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Shared cinematic dark hero band used across sub-pages (Services, Pricing,
 * Demos, Contact). Charcoal + wine pinstripe with an optional glass-ribbon
 * image that glows on the dark background.
 */
export default function DarkHero({
  image,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: DarkHeroProps) {
  return (
    <section
      className={`atelier-band-dark relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 ${className}`}
    >
      {image && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-dark)]/85" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {eyebrow && (
          <Reveal variant="rise">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-bold tracking-[0.14em] text-[var(--color-text-on-dark)]/85 uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-10)]" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal variant="blur" delay={0.08}>
          <h1 className="font-display text-[2rem] leading-[1.08] font-extrabold tracking-tight text-[var(--color-text-on-dark)] sm:text-[2.75rem] md:text-[3.5rem]">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal variant="rise" delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[var(--color-text-on-dark)]/70 md:text-[19px]">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal variant="rise" delay={0.24}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

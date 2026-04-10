"use client";

import type { HTMLAttributes, ReactNode } from "react";

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={`mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

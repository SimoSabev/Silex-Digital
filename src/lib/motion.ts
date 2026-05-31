"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has requested reduced motion via OS / browser
 * accessibility settings (`prefers-reduced-motion: reduce`).
 *
 * Safe to call in SSR — returns `false` on the server so we never gate
 * animations during hydration (they will be correctly suppressed once the
 * client media query resolves on the next tick).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Respect the OS/browser "reduce motion" preference — skip Lenis entirely.
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger's scroll-position reads in sync with Lenis's
    // virtual scroll instead of each running its own independent RAF loop.
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleMenuToggle = (e: Event) => {
      const open = (e as CustomEvent<{ open: boolean }>).detail.open;
      if (open) {
        lenis.stop();
        document.body.classList.add("menu-open");
      } else {
        lenis.start();
        document.body.classList.remove("menu-open");
      }
    };

    window.addEventListener("silex-menu-toggle", handleMenuToggle);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.removeEventListener("silex-menu-toggle", handleMenuToggle);
      document.body.classList.remove("menu-open");
    };
  }, [prefersReduced]);

  return <>{children}</>;
}

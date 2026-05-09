"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
      lenis.destroy();
      window.removeEventListener("silex-menu-toggle", handleMenuToggle);
      document.body.classList.remove("menu-open");
    };
  }, []);

  return <>{children}</>;
}

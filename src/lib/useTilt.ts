"use client";

import { useCallback, useRef } from "react";
import type { MouseEvent } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Mouse-follow 3D tilt. Writes the transform directly to the DOM node instead
 * of through React state, so a mousemove doesn't trigger a re-render per frame.
 */
export function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 2 * maxDeg;
      const rotateX = (0.5 - py) * 2 * maxDeg;
      ref.current.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    },
    [maxDeg, prefersReduced],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

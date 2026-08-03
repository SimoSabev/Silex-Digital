"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Ambient hero signature: the brand's zigzag "S" mark, rendered as a field of
 * small squares that assemble on load and drift apart at the same corner
 * where the static logo itself dissolves into pixels. Pure canvas 2D — no
 * WebGL/Three.js/Spline runtime, so it costs ~2KB of code instead of a
 * multi-hundred-KB 3D dependency (see the redesign plan's bundget guardrail).
 */

type Particle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  floats: boolean;
  floatPhase: number;
};

const CURVE_POINTS = 34;
const BAND_JITTER = 0.05;
const DISSOLVE_FRACTION = 0.22; // top-right tail stays perpetually loose, echoing the static logo

function buildParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  const margin = width * 0.18;
  const usableW = width - margin * 2;
  const usableH = height - margin * 2;

  for (let i = 0; i < CURVE_POINTS; i++) {
    const t = i / (CURVE_POINTS - 1);
    // Parametric S-curve spine: a full sine period traces a bold "S".
    const spineX = 0.5 + 0.34 * Math.sin(t * Math.PI * 2);
    const spineY = t;

    // A couple of neighbors per step, offset perpendicular to the spine, for stroke width.
    for (const bandOffset of [-1, 0, 1]) {
      const jitter = (Math.random() - 0.5) * BAND_JITTER;
      const targetX = margin + (spineX + bandOffset * 0.06 + jitter) * usableW;
      const targetY = margin + (spineY + jitter * 0.4) * usableH;

      const floats = t > 1 - DISSOLVE_FRACTION && bandOffset !== 0;

      const angle = Math.random() * Math.PI * 2;
      const radius = width * (0.35 + Math.random() * 0.35);

      particles.push({
        startX: targetX + Math.cos(angle) * radius,
        startY: targetY + Math.sin(angle) * radius,
        targetX,
        targetY,
        size: 5 + Math.random() * 6,
        delay: t * 0.5 + Math.random() * 0.15,
        floats,
        floatPhase: Math.random() * Math.PI * 2,
      });
    }
  }
  return particles;
}

function easeOutExpo(x: number): number {
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export default function BrandDissolveMark({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.getBoundingClientRect().width || 600;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--accent-10").trim() ||
      "#E0C8CC";

    const particles = buildParticles(size, size);

    if (prefersReduced) {
      // No animation loop for reduced-motion users — draw the assembled mark once.
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = accent;
      for (const p of particles) {
        ctx.globalAlpha = 0.9;
        ctx.fillRect(p.targetX - p.size / 2, p.targetY - p.size / 2, p.size, p.size);
      }
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const assembleDuration = 1600;

    const render = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = accent;

      for (const p of particles) {
        const localT = Math.min(
          1,
          Math.max(0, (elapsed - p.delay * 1000) / assembleDuration),
        );
        const eased = easeOutExpo(localT);
        let x = p.startX + (p.targetX - p.startX) * eased;
        let y = p.startY + (p.targetY - p.startY) * eased;

        // Once assembled, the dissolve-corner particles keep a slow ambient drift.
        if (p.floats && localT >= 1) {
          const t = elapsed / 1000;
          x += Math.sin(t * 0.6 + p.floatPhase) * 10;
          y += Math.cos(t * 0.5 + p.floatPhase) * 8;
        }

        ctx.globalAlpha = 0.35 + 0.55 * eased;
        ctx.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

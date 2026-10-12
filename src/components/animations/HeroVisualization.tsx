"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/lib/motion";

export type BrandLayer = {
  key: "identity" | "website" | "content" | "ads" | "seo" | "ai";
  title: string;
  /** Starting price, already formatted from "@/lib/offer". */
  price: string;
  icon: LucideIcon;
};

type HeroVisualizationProps = {
  layers: readonly BrandLayer[];
  title: string;
  layersLabel: string;
  readyLabel: string;
};

const STEP_MS = 1400;
const HOLD_MS = 2600;

/**
 * The six layers of a brand being built in order — foundation first.
 * Left: the layer list with starting prices. Right (lg+): a preview where each
 * layer's piece appears once it is built. Purely illustrative; prices are
 * passed in from the offer catalog.
 */
export default function HeroVisualization({ layers, title, layersLabel, readyLabel }: HeroVisualizationProps) {
  const prefersReduced = useReducedMotion();
  const [built, setBuilt] = useState(0);
  const total = layers.length;
  const shown = prefersReduced ? total : built;
  const isComplete = shown >= total;

  useEffect(() => {
    if (prefersReduced) return;
    const delay = built >= total ? HOLD_MS : STEP_MS;
    const id = setTimeout(() => setBuilt((n) => (n >= total ? 0 : n + 1)), delay);
    return () => clearTimeout(id);
  }, [built, total, prefersReduced]);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[var(--color-bg-dark)]" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      </div>

      {/* Layer list */}
      <div className="relative z-10 flex w-full flex-col p-4 sm:p-6 lg:w-[52%] lg:border-r lg:border-white/[0.08]">
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <span className="eyebrow text-white/45">{layersLabel}</span>
          <span className="nums text-micro font-bold text-[var(--accent-10)]">
            {Math.min(shown, total)} / {total}
          </span>
        </div>

        {/* Reversed so the foundation (identity) sits at the bottom and the brand builds upward. */}
        <ol className="flex flex-1 flex-col-reverse gap-1.5 sm:gap-2">
          {layers.map((layer, i) => {
            const isBuilt = i < shown;
            const isNext = i === shown && !isComplete;
            const Icon = layer.icon;
            return (
              <li
                key={layer.key}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors duration-500 sm:py-2.5 ${
                  isBuilt
                    ? "border-[var(--accent-10)]/25 bg-white/[0.07]"
                    : isNext
                      ? "border-white/15 bg-white/[0.04]"
                      : "border-white/[0.06] bg-transparent"
                }`}
              >
                <span className="nums w-5 text-micro font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg transition-colors duration-500 ${
                    isBuilt ? "bg-[var(--accent)] text-white" : "bg-white/[0.06] text-white/40"
                  }`}
                >
                  {isBuilt ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Icon className="h-3.5 w-3.5" />}
                </span>
                <span className={`min-w-0 flex-1 truncate text-small font-semibold ${isBuilt ? "text-white" : "text-white/55"}`}>
                  {layer.title}
                </span>
                <span className={`nums hidden flex-none text-micro sm:inline ${isBuilt ? "text-[var(--accent-10)]" : "text-white/35"}`}>
                  {layer.price}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.08] sm:mt-4">
          <motion.div
            className="h-full rounded-full bg-[var(--accent-10)]"
            initial={false}
            animate={{ scaleX: shown / total }}
            style={{ originX: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Brand preview */}
      <div className="relative z-10 hidden flex-col p-6 lg:flex lg:w-[48%]">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-white/45">{title}</span>
          <motion.span
            className="rounded-full bg-[var(--color-success)]/15 px-2.5 py-1 text-micro font-bold text-[var(--color-success-10)]"
            animate={{ opacity: isComplete ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {readyLabel}
          </motion.span>
        </div>
        <div className="grid flex-1 grid-cols-2 grid-rows-3 gap-2.5">
          {layers.map((layer, i) => (
            <PreviewTile key={layer.key} layerKey={layer.key} isBuilt={i < shown} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewTile({ layerKey, isBuilt }: { layerKey: BrandLayer["key"]; isBuilt: boolean }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] p-3"
      animate={{ opacity: isBuilt ? 1 : 0.18, scale: isBuilt ? 1 : 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <TileArt layerKey={layerKey} />
    </motion.div>
  );
}

function TileArt({ layerKey }: { layerKey: BrandLayer["key"] }) {
  switch (layerKey) {
    case "identity":
      return (
        <div className="flex h-full items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] font-display text-h4 text-white">S</span>
          <div className="flex gap-1">
            {["var(--accent)", "var(--accent-10)", "var(--color-text-on-dark)"].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full border border-white/10" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      );
    case "website":
      return (
        <div className="flex h-full flex-col gap-1.5">
          <div className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/25" />
            ))}
          </div>
          <div className="h-2 w-3/4 rounded bg-white/30" />
          <div className="h-2 w-1/2 rounded bg-white/15" />
          <div className="mt-auto h-4 w-16 rounded-md bg-[var(--accent)]" />
        </div>
      );
    case "content":
      return (
        <div className="grid h-full grid-cols-3 gap-1.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="rounded-md bg-gradient-to-br from-[var(--accent)]/70 to-white/10" />
          ))}
        </div>
      );
    case "ads":
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          <span className="w-fit rounded bg-white/10 px-1.5 py-0.5 text-micro text-white/60">Ad</span>
          <div className="h-2 w-4/5 rounded bg-white/30" />
          <div className="h-2 w-2/3 rounded bg-white/15" />
        </div>
      );
    case "seo":
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          <div className="h-1.5 w-1/2 rounded bg-[var(--color-success)]/60" />
          <div className="h-2 w-5/6 rounded bg-[var(--accent-10)]/70" />
          <div className="h-1.5 w-3/4 rounded bg-white/15" />
        </div>
      );
    case "ai":
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          <div className="h-3 w-3/5 rounded-lg rounded-bl-sm bg-white/15" />
          <div className="ml-auto h-3 w-2/3 rounded-lg rounded-br-sm bg-[var(--accent)]" />
        </div>
      );
  }
}

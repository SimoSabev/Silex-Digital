"use client";

import { Check, Loader2, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { SimulationEvent } from "@/types/demo";

interface SimulationTimelineProps {
  locale: Locale;
  events: SimulationEvent[];
  running: boolean;
}

function StatusIcon({ status }: { status: SimulationEvent["status"] }) {
  if (status === "completed") {
    return <Check className="h-4 w-4 text-[var(--lime)]" />;
  }
  if (status === "processing") {
    return <Loader2 className="h-4 w-4 animate-spin text-[var(--violet)]" />;
  }
  if (status === "failed") {
    return <X className="h-4 w-4 text-red-400" />;
  }
  return <span className="h-2 w-2 rounded-full bg-[var(--text-muted)]" />;
}

export default function SimulationTimeline({
  locale,
  events,
  running,
}: SimulationTimelineProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--text-sub)]">
          {locale === "bg" ? "Симулационна линия" : "Simulation timeline"}
        </p>
        <span className="text-xs text-[var(--text-muted)]">
          {running
            ? locale === "bg"
              ? "Изпълнява се"
              : "Running"
            : locale === "bg"
              ? "Готово"
              : "Ready"}
        </span>
      </div>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-section)] px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <StatusIcon status={event.status} />
              <p className="text-sm text-[var(--text-main)]">{event.label[locale]}</p>
            </div>
            <span className="text-xs text-[var(--text-muted)]">{event.timeMs}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}

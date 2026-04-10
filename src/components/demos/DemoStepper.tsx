"use client";

import type { Locale } from "@/lib/i18n";

interface DemoStepperProps {
  steps: string[];
  activeStep: number;
  locale: Locale;
}

export default function DemoStepper({
  steps,
  activeStep,
  locale,
}: DemoStepperProps) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--bg-card) p-3">
      <p className="mb-3 text-xs tracking-wide text-(--text-muted) uppercase">
        {locale === "bg" ? "Прогрес" : "Progress"}
      </p>
      <div className="grid gap-2 sm:grid-cols-5">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < activeStep;

          return (
            <div
              key={step}
              className={`rounded-lg border px-2 py-2 text-xs transition-all ${
                isActive
                  ? "border-(--violet)/40 bg-(--violet)/15 text-(--violet)"
                  : isDone
                    ? "border-(--lime)/30 bg-(--lime)/10 text-(--lime)"
                      : "border-(--border) bg-(--bg-section) text-(--text-muted)"
              }`}
            >
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px]">
                {index + 1}
              </span>
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}

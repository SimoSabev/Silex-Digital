"use client";

import type { Locale } from "@/lib/i18n";
import type { DemoScenario } from "@/types/demo";

interface ScenarioPickerProps {
  locale: Locale;
  scenarios: DemoScenario[];
  selectedScenarioId: string;
  onSelect: (scenarioId: string) => void;
}

export default function ScenarioPicker({
  locale,
  scenarios,
  selectedScenarioId,
  onSelect,
}: ScenarioPickerProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-[var(--text-sub)]">
        {locale === "bg" ? "Сценарий" : "Scenario"}
      </label>
      <div className="grid gap-2">
        {scenarios.map((scenario) => {
          const selected = scenario.id === selectedScenarioId;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario.id)}
              className={`rounded-xl border p-3 text-left transition-all ${
                selected
                  ? "border-[var(--violet)]/40 bg-[var(--violet)]/15"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)]"
              }`}
            >
              <p className="text-sm font-semibold text-[var(--text-main)]">
                {scenario.name[locale]}
              </p>
              <p className="mt-1 text-xs text-[var(--text-sub)]">
                {scenario.description[locale]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

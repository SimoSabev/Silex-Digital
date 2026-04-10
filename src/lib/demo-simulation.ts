import type { DemoComparisonMetric, SimulationEvent } from "@/types/demo";

export function createEmailAutomationTimeline(
  triggerLabel: { bg: string; en: string },
  actions: Array<{ bg: string; en: string }>,
): SimulationEvent[] {
  const events: SimulationEvent[] = [
    {
      id: "input-received",
      timeMs: 300,
      status: "completed",
      label: {
        bg: `Получен тригър: ${triggerLabel.bg}`,
        en: `Trigger received: ${triggerLabel.en}`,
      },
    },
    {
      id: "workflow-started",
      timeMs: 900,
      status: "processing",
      label: {
        bg: "Стартирана автоматизация",
        en: "Automation workflow started",
      },
    },
  ];

  actions.forEach((action, index) => {
    events.push({
      id: `action-${index}`,
      timeMs: 1500 + index * 600,
      status: "completed",
      label: {
        bg: `Изпълнено действие: ${action.bg}`,
        en: `Action executed: ${action.en}`,
      },
    });
  });

  events.push({
    id: "workflow-finished",
    timeMs: 1500 + actions.length * 600,
    status: "completed",
    label: {
      bg: "Потокът завърши успешно",
      en: "Workflow completed successfully",
    },
  });

  return events;
}

export function createEmailAutomationComparison(
  actionCount: number,
): DemoComparisonMetric[] {
  const automationGain = Math.max(1, actionCount);

  return [
    {
      id: "response-time",
      label: { bg: "Време за реакция", en: "Response time" },
      before: "4h 20m",
      after: "35s",
      delta: "-99%",
    },
    {
      id: "manual-steps",
      label: { bg: "Ръчни стъпки", en: "Manual steps" },
      before: `${4 + automationGain}`,
      after: "1",
      delta: `-${3 + automationGain}`,
    },
    {
      id: "lead-capture",
      label: { bg: "Уловени лийдове", en: "Captured leads" },
      before: "62%",
      after: "94%",
      delta: "+32pp",
    },
  ];
}

export function createLeadQualificationTimeline(
  score: number,
): SimulationEvent[] {
  const isHigh = score >= 70;
  const isMid = score >= 40 && score < 70;

  return [
    {
      id: "lead-submitted",
      timeMs: 300,
      status: "completed",
      label: {
        bg: "Получени входни данни за лийд",
        en: "Lead input data received",
      },
    },
    {
      id: "data-validation",
      timeMs: 900,
      status: "completed",
      label: {
        bg: "Валидация на данните",
        en: "Data validation",
      },
    },
    {
      id: "ai-scoring",
      timeMs: 1500,
      status: "processing",
      label: {
        bg: "AI оценяване на потенциал",
        en: "AI potential scoring",
      },
    },
    {
      id: "priority-assigned",
      timeMs: 2200,
      status: "completed",
      label: {
        bg: isHigh
          ? "Присвоен приоритет: Незабавен контакт"
          : isMid
            ? "Присвоен приоритет: Контакт до 24 часа"
            : "Присвоен приоритет: Nurture кампания",
        en: isHigh
          ? "Priority assigned: Immediate contact"
          : isMid
            ? "Priority assigned: Contact within 24 hours"
            : "Priority assigned: Nurture campaign",
      },
    },
  ];
}

export function createLeadQualificationComparison(
  score: number,
): DemoComparisonMetric[] {
  const qualificationLift = Math.round(score * 0.25);

  return [
    {
      id: "qualification-accuracy",
      label: { bg: "Точност на класификация", en: "Qualification accuracy" },
      before: "61%",
      after: `${Math.min(98, 75 + qualificationLift)}%`,
      delta: `+${Math.max(8, qualificationLift)}pp`,
    },
    {
      id: "time-to-priority",
      label: { bg: "Време до приоритизация", en: "Time to prioritize" },
      before: "22m",
      after: "45s",
      delta: "-96%",
    },
    {
      id: "sales-ready-rate",
      label: { bg: "Sales-ready лийдове", en: "Sales-ready leads" },
      before: "34%",
      after: `${Math.min(90, 50 + Math.round(score * 0.3))}%`,
      delta: "+18pp",
    },
  ];
}

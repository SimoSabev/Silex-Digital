export type DemoType = "emailAutomation" | "leadQualification";

export interface LocalizedText {
  bg: string;
  en: string;
}

export interface DemoScenario {
  id: string;
  demoType: DemoType;
  name: LocalizedText;
  description: LocalizedText;
  defaults: Record<string, string | string[]>;
}

export type SimulationStatus = "pending" | "processing" | "completed" | "failed";

export interface SimulationEvent {
  id: string;
  label: LocalizedText;
  timeMs: number;
  status: SimulationStatus;
}

export interface DemoMetric {
  id: string;
  label: LocalizedText;
  value: string;
}

export interface DemoComparisonMetric {
  id: string;
  label: LocalizedText;
  before: string;
  after: string;
  delta?: string;
}

export type DemoAnalyticsEventName =
  | "demo_viewed"
  | "scenario_selected"
  | "simulation_started"
  | "simulation_completed"
  | "compare_used"
  | "demo_cta_clicked";

export interface DemoAnalyticsEvent {
  event: DemoAnalyticsEventName;
  demoId: string;
  locale: "bg" | "en";
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
}

# Interactive Demos Implementation Plan

Date: 2026-04-01  
Owner: Product + Frontend  
Status: Draft for execution

## 1. Goal

Upgrade the current demo experience from simple widget interactions to high-engagement, conversion-focused product simulations.

Primary outcomes:
- Increase demo completion rate.
- Increase CTA clicks from demo pages.
- Make value delivery visible in the first 10 seconds.
- Keep full Bulgarian/English parity for all demo content.

## 2. Current Gaps

Current state (from existing demo pages/components):
- Two active demos, four "coming soon" cards.
- Interactions are useful but linear and short.
- Minimal scenario depth (few branching outcomes).
- No persistent progress, score history, or guided flow.
- Limited instrumentation for behavior analysis.

## 3. Product Direction

Move to a "Choose Scenario -> Configure -> Simulate -> Compare -> Convert" flow.

Each demo should provide:
- A realistic business scenario selector.
- A guided setup with defaults and advanced controls.
- A live simulation timeline with state transitions.
- Before/after impact metrics.
- A clear next step CTA with context ("Send me this setup").

## 4. Core Experience Upgrades

### 4.1 Demo Shell (shared UX layer)

Build a reusable shell that all demos use:
- Step rail: `Scenario`, `Inputs`, `Run`, `Results`, `Next step`.
- Sticky progress header with completion percentage.
- Session reset and "try another path" shortcuts.
- Keyboard accessibility (`Tab`, `Enter`, `Space`, `Esc`).

### 4.2 Scenario Engine

Introduce scenario presets per demo:
- Small business.
- Service agency.
- Ecommerce.
- Enterprise inbound team.

Each preset includes:
- Input defaults.
- Constraints.
- Expected KPI ranges.
- Suggested automation sequence.

### 4.3 Rich Simulation Layer

Upgrade static results to visual state simulation:
- Event timeline with timestamps.
- Animated queue states (received, processing, completed, failed).
- Optional failures (rate limit, invalid data, no response) to show resilience.
- Replay support with different speed modes (`1x`, `2x`, `4x`).

### 4.4 Results and Comparison

Add impact views users can understand quickly:
- Before/after conversion delta.
- Response-time delta.
- Estimated hours saved per week.
- Lead quality lift summary.

Include compare mode:
- Compare two configurations side by side.
- Highlight best setup with explicit reasoning.

### 4.5 Conversion Layer

Reduce drop-off after interaction:
- Context-aware CTA: "Book this exact workflow".
- Pre-filled contact payload with selected scenario and config.
- Optional email summary export for the user.
- Frictionless route from demo to `contact` with captured context.

## 5. Technical Architecture

### 5.1 Shared Types and Config

Create central types and scenario configuration:
- `src/types/demo.ts` for shared contracts.
- `src/config/demo-scenarios.ts` for preset definitions.
- `src/lib/demo-simulation.ts` for deterministic simulation logic.

Suggested core interfaces:
- `DemoScenario`
- `DemoInputState`
- `SimulationEvent`
- `SimulationResult`
- `DemoAnalyticsEvent`

### 5.2 State Management

Use local reducer-based state for each demo:
- `useReducer` for predictable transitions.
- Event-driven updates for timeline playback.
- Shared hooks for progress, replay, and compare mode.

Proposed hooks:
- `useDemoScenario`
- `useDemoSimulation`
- `useDemoAnalytics`

### 5.3 UI Component System

Add reusable demo components under `src/components/demos/`:
- `DemoStepper.tsx`
- `ScenarioPicker.tsx`
- `SimulationTimeline.tsx`
- `ResultsComparison.tsx`
- `DemoMetricCard.tsx`

Refactor existing demos to consume shared components incrementally.

### 5.4 Instrumentation

Track meaningful interactions:
- `demo_viewed`
- `scenario_selected`
- `simulation_started`
- `simulation_completed`
- `compare_used`
- `demo_cta_clicked`

Ship events through existing API route strategy (or lightweight endpoint) and persist to analytics storage.

## 6. Internationalization Requirements

Non-negotiable:
- Bulgarian remains default locale.
- Every new label, step, helper, and result message must have BG + EN copy.
- No mixed-language UI states.

Implementation approach:
- Move demo copy into locale dictionaries rather than inline strings.
- Keep identical structure keys for BG and EN.

## 7. Performance and Accessibility

Performance:
- Keep initial demo bundle lean via lazy loading for heavy visual modules.
- Use memoized selectors for timeline/event rendering.
- Avoid layout thrashing during animation.

Accessibility:
- Full keyboard navigation for controls.
- Proper ARIA for stepper, timeline, and status updates.
- Color contrast checks for all result states.
- Reduced motion mode for simulation playback.

## 8. Implementation Phases

### Phase 1: Foundation (3-4 days)
- Add shared demo types and scenario config.
- Build stepper + scenario picker + analytics hook scaffolding.
- Add i18n keys for new shared shell.

### Phase 2: Upgrade Existing Demos (4-6 days)
- Refactor Email Automation demo to scenario-driven flow.
- Refactor Lead Qualification demo with timeline + compare mode.
- Add unified results panels and contextual CTA payload.

### Phase 3: Launch 2 New Demos (5-7 days)
- Implement AI Chatbot interactive demo.
- Implement CRM Integration interactive demo.
- Reuse shell + simulation engine.

### Phase 4: Optimization (2-3 days)
- Add A/B experiment for CTA placement and wording.
- Tune animation pacing and onboarding hints from analytics.
- Final performance and accessibility pass.

## 9. File-Level Execution Plan

Update:
- `src/app/demos/page.tsx` (new shell integration, dynamic loading, event wiring)
- `src/components/demos/DemoContainer.tsx` (becomes composition wrapper)
- `src/components/demos/EmailAutomationDemo.tsx` (scenario + timeline + compare)
- `src/components/demos/LeadQualificationDemo.tsx` (scenario + timeline + compare)

Add:
- `src/types/demo.ts`
- `src/config/demo-scenarios.ts`
- `src/lib/demo-simulation.ts`
- `src/components/demos/DemoStepper.tsx`
- `src/components/demos/ScenarioPicker.tsx`
- `src/components/demos/SimulationTimeline.tsx`
- `src/components/demos/ResultsComparison.tsx`
- `src/components/demos/DemoMetricCard.tsx`

Optional (if endpoint needed):
- `src/app/api/demo-events/route.ts`

## 10. Success Metrics

Track weekly:
- Demo start rate.
- Demo completion rate.
- Time-to-first-value (target < 10s).
- Compare mode usage rate.
- Demo-to-contact CTR.
- Qualified lead rate from demo CTA.

Initial targets (first 30 days after release):
- +35% demo completion.
- +25% demo CTA click-through.
- +15% contact form submission rate from demo traffic.

## 11. Risks and Mitigations

Risk: Overly complex controls reduce completion.  
Mitigation: progressive disclosure, sensible defaults, one-click preset start.

Risk: Animation-heavy demos hurt performance.  
Mitigation: lazy load, cap particle/event density, reduced motion path.

Risk: Inconsistent i18n across demo states.  
Mitigation: central copy map and locale parity checks during PR review.

## 12. Definition of Done

Done means:
- At least 4 fully interactive demos are live.
- Shared demo shell is used by all active demos.
- BG/EN locale parity is complete.
- Instrumentation dashboards show full funnel events.
- Accessibility and performance checks pass for demo pages.

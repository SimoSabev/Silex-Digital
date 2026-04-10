# Silex Digital - Implementation Plan & New Site Architecture

**Date:** March 2026  
**Based on:** MARKET-RESEARCH.md  
**Purpose:** Technical execution plan for new platform

---

## 1. Site Architecture Overview

```
silex-digital/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Home
│   │   ├── services/
│   │   │   ├── page.tsx               # Services overview
│   │   │   ├── automation/
│   │   │   │   └── page.tsx           # Workflow automation
│   │   │   ├── ai-agents/
│   │   │   │   └── page.tsx           # AI agents
│   │   │   ├── web-development/
│   │   │   │   └── page.tsx           # Custom development
│   │   │   └── cms-integration/
│   │   │       └── page.tsx           # CMS services
│   │   ├── demos/
│   │   │   ├── page.tsx               # Demo hub
│   │   │   ├── email-automation/
│   │   │   ├── lead-qualification/
│   │   │   ├── chatbot/
│   │   │   ├── crm-integration/
│   │   │   └── invoice-automation/
│   │   ├── case-studies/
│   │   │   ├── page.tsx               # All case studies
│   │   │   └── [slug]/page.tsx        # Individual study
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/
│   │   ├── leads/
│   │   └── demo-request/
│   └── layout.tsx                      # Root layout
├── components/
│   ├── ui/                            # Design system
│   ├── sections/                       # Page sections
│   ├── demos/                         # Interactive demos
│   └── forms/                         # Lead capture forms
├── lib/
└── styles/
```

---

## 2. Design System

### 2.1 Color Palette

```css
:root {
  /* Primary - Trust Blue */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;

  /* Secondary - Growth Green */
  --color-secondary-500: #10b981;
  --color-secondary-600: #059669;

  /* Accent - Energy Orange */
  --color-accent-500: #f97316;
  --color-accent-600: #ea580c;

  /* Neutrals - Slate */
  --color-neutral-50: #f8fafc;
  --color-neutral-900: #0f172a;

  /* Semantic */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

### 2.2 Typography

| Element | Font           | Size    | Weight | Line Height |
| ------- | -------------- | ------- | ------ | ----------- |
| H1      | Inter          | 48-64px | 800    | 1.1         |
| H2      | Inter          | 32-40px | 700    | 1.2         |
| H3      | Inter          | 24-28px | 600    | 1.3         |
| Body    | Inter          | 16-18px | 400    | 1.6         |
| Small   | Inter          | 14px    | 400    | 1.5         |
| Mono    | JetBrains Mono | 14px    | 400    | 1.5         |

### 2.3 Spacing System

```css
/* 4px base unit */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-24: 6rem; /* 96px */
--space-32: 8rem; /* 128px */
```

### 2.4 Component States

| State    | Primary Color | Border      | Shadow     |
| -------- | ------------- | ----------- | ---------- |
| Default  | primary-600   | none        | sm         |
| Hover    | primary-700   | none        | md         |
| Active   | primary-800   | primary-400 | lg         |
| Disabled | gray-300      | none        | none       |
| Loading  | primary-600   | none        | sm + pulse |

---

## 3. Page-by-Page Specification

### 3.1 Home Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR                                                      │
│  [Logo]  [Services ▼] [Demos] [Pricing] [Case Studies]       │
│                                              [Contact Us]   │
├─────────────────────────────────────────────────────────────┤
│  HERO SECTION                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  H1: "От идея до автоматизация за 14 дни"              ││
│  │                                                         ││
│  │  Subhead: "Работи като имаш 10 екстри служители.       ││
│  │           AI агенти и автоматизации за български бизнес" ││
│  │                                                         ││
│  │  [Primary CTA: "Виж как работи"]                        ││
│  │  [Secondary: "Виж демо"]                                ││
│  │                                                         ││
│  │  ┌─────────────────────────────────────────────────┐   ││
│  │  │  Animated automation workflow visualization      │   ││
│  │  │  (CSS/SVG - no Three.js for performance)        │   ││
│  │  └─────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  SOCIAL PROOF BAR                                            │
│  "Trusted by 50+ Bulgarian businesses"                       │
│  [Logo] [Logo] [Logo] [Logo] [Logo]                         │
├─────────────────────────────────────────────────────────────┤
│  PROBLEM → SOLUTION SECTION                                  │
│  ┌────────────────────┐  ┌────────────────────┐           │
│  │ PAIN: "Ръчното     │  │ SOLUTION:           │           │
│  │      изпълнение    │  │ Автоматизация       │           │
│  │      отнема 20+    │  │ която работи        │           │
│  │      часа седмично" │  │ 24/7 без грешки"   │           │
│  └────────────────────┘  └────────────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  SERVICES GRID (3 columns)                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │  Workflow    │ │  AI Agents   │ │  Custom Dev   │        │
│  │  Automation  │ │              │ │              │        │
│  │  [Icon]      │ │  [Icon]      │ │  [Icon]       │        │
│  │              │ │              │ │              │        │
│  │  от 500 лв.  │ │  от 2000 лв. │ │  от 3000 лв. │        │
│  │  [Виж демо →]│ │  [Виж демо →]│ │  [Виж демо →]│        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  INTERACTIVE DEMO PREVIEW                                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  "Пробвай сега" - Live mini demo                        ││
│  │  [Interactive email automation simulator]               ││
│  │  User builds a simple workflow, sees result             ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  CASE STUDY HIGHLIGHT                                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [Company Logo]                                         ││
│  │  "How [Company] saved 15h/week with automation"        ││
│  │  [Before/After metrics]                                  ││
│  │  [Read full case study →]                               ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIALS (Carousel)                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  "Best decision for our business..." - [Name], [Role]  ││
│  │  ○ ● ○ ○ ○  [Auto-rotate every 5s]                     ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  PRICING TEASER                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│  │ Starter │  │ Pro ★  │  │Custom│                       │
│  │ 500 лв  │  │2,500 лв│  │  от 10K │                      │
│  │ [CTA]   │  │ [CTA]   │  │ [CTA]   │                      │
│  └─────────┘  └─────────┘  └─────────┘                      │
├─────────────────────────────────────────────────────────────┤
│  FINAL CTA                                                   │
│  "Готов да автоматизираш бизнеса си?"                       │
│  [Book Free Consultation] [See All Demos]                   │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  [Services] [Demos] [Resources] [Company] [Legal]            │
│  [Contact Info] [Social Links] [Language: BG/EN]            │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Service Page Template

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky)                                             │
├─────────────────────────────────────────────────────────────┤
│  SERVICE HERO                                                │
│  H1: [Service Name]                                          │
│  Subhead: [Value proposition]                                │
│  [Key stats: "500+ automations", "15h saved/week avg"]       │
├─────────────────────────────────────────────────────────────┤
│  WHAT IT IS (Explanation)                                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [Illustration/Diagram]  │  [Text explanation]          ││
│  │                         │  Non-technical language      ││
│  │                         │  Real Bulgarian examples      ││
│  └─────────────────────────┴───────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  LIVE DEMO SECTION ★★★ (Interactive)                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  "Try it yourself"                                       ││
│  │                                                          ││
│  │  [Interactive Demo Component]                            ││
│  │  - Step 1: [Input] → Step 2: [Select] → Step 3: [Output]││
│  │                                                          ││
│  │  "This is how YOUR automation would work"                ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  USE CASES (3-4 examples)                                    │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │ E-commerce    │ │ Real Estate   │ │ Consulting    │   │
│  │ [Use case 1]  │ │ [Use case 2]  │ │ [Use case 3]   │   │
│  └────────────────┘ └────────────────┘ └────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  PROCESS/METHODOLOGY                                         │
│  1. Discovery → 2. Design → 3. Build → 4. Test → 5. Launch  │
│  [Timeline: 7-14 days typical]                               │
├─────────────────────────────────────────────────────────────┤
│  PRICING TIERS                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Essential│  │ Pro     │  │ Enterprise│                   │
│  │ [Price] │  │ [Price] │  │ [Price]   │                   │
│  │ [List]  │  │ [List]  │  │ [List]    │                   │
│  │ [CTA]   │  │ [CTA]   │  │ [CTA]     │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
├─────────────────────────────────────────────────────────────┤
│  FAQ (Accordion)                                             │
│  Q: "How long does it take?"                                 │
│  Q: "Do I need technical skills?"                            │
│  Q: "What if I need changes?"                                │
│  Q: "Is there ongoing support?"                              │
├─────────────────────────────────────────────────────────────┤
│  FINAL CTA                                                   │
│  "Get started with [Service]"                                │
│  [Book Free Consultation] or [Start with Demo]              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Demo Hub Page

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR                                                      │
├─────────────────────────────────────────────────────────────┤
│  DEMO HUB HERO                                               │
│  H1: "Виж как работи"                                        │
│  Subhead: "Интерактивни демонстрации на всяка услуга"       │
├─────────────────────────────────────────────────────────────┤
│  DEMO FILTERS                                                │
│  [All] [Workflow] [AI Agents] [Integrations] [Custom Dev]   │
├─────────────────────────────────────────────────────────────┤
│  DEMO GRID                                                   │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ EMAIL AUTOMATION    │  │ LEAD QUALIFICATION   │          │
│  │ [Live Preview]      │  │ [Live Preview]       │          │
│  │ "Build your first   │  │ "AI-powered lead     │          │
│  │  workflow"         │  │  scoring"            │          │
│  │ [Launch Demo →]    │  │ [Launch Demo →]      │          │
│  └─────────────────────┘  └─────────────────────┘          │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ AI CHATBOT         │  │ CRM INTEGRATION      │          │
│  │ [Live Preview]     │  │ [Live Preview]       │          │
│  │ "24/7 customer     │  │ "Connect your tools" │          │
│  │  support"          │  │ [Launch Demo →]      │          │
│  │ [Launch Demo →]    │  │                     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ INVOICE AUTOMATION  │  │ API INTEGRATION      │          │
│  │ [Live Preview]      │  │ [Live Preview]       │          │
│  │ "Auto-generate &    │  │ "Custom integrations"│          │
│  │  send invoices"    │  │ [Launch Demo →]      │          │
│  │ [Launch Demo →]    │  │                     │          │
│  └─────────────────────┘  └─────────────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  DEMO REQUEST CTA                                             │
│  "Need a custom demo?"                                       │
│  [Request Custom Demo]                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Interactive Demo Components

### 4.1 Email Automation Demo

**Concept:** User selects trigger → actions → sees workflow visualization

```tsx
// Demo: Email Automation Builder
// User interaction:
// 1. Select trigger: "New form submission" / "Schedule" / "API call"
// 2. Add actions: "Send email" / "Add to list" / "Update CRM"
// 3. See animated workflow diagram build in real-time
// 4. See sample output

Features:
- Drag-and-drop (simplified)
- Real-time visualization
- Sample data preview
- "Request this for my business" CTA
```

### 4.2 AI Chatbot Demo

**Concept:** Live chat with AI (real AI, limited scope)

```tsx
// Demo: AI Chatbot Simulation
// User interaction:
// 1. Select industry: "E-commerce" / "Real Estate" / "Restaurant"
// 2. Type a question
// 3. See AI response + explanation of how it works

Features:
- Real Claude/OpenAI integration (sandboxed)
- Pre-defined question suggestions
- "Behind the scenes" panel showing logic
- Lead capture on exit
```

### 4.3 Lead Qualification Demo

**Concept:** Simulate lead scoring flow

```tsx
// Demo: Lead Qualification Flow
// User interaction:
// 1. Enter sample lead data
// 2. Watch scoring algorithm (simple rules for demo)
// 3. See output: Hot/Warm/Cold + recommended action

Features:
- Visual scoring breakdown
- "What-if" scenarios
- Real-time score updates
```

### 4.4 CRM Integration Demo

**Concept:** Visual connector diagram

```tsx
// Demo: CRM Integration Builder
// User interaction:
// 1. Select source: "Form" / "Email" / "Phone"
// 2. Select destination: "HubSpot" / "Pipedrive" / "Custom"
// 3. Select fields to map
// 4. See visual flow diagram

Features:
- Animated data flow
- Field mapping interface
- Real integration examples
```

---

## 5. Component Library

### 5.1 Core UI Components

| Component | States                                    | Notes                                 |
| --------- | ----------------------------------------- | ------------------------------------- |
| Button    | default, hover, active, disabled, loading | 3 variants: primary, secondary, ghost |
| Input     | default, focus, error, disabled           | With label + error message            |
| Card      | default, hover, selected                  | Lift on hover                         |
| Badge     | Various colors                            | For pricing/features                  |
| Accordion | collapsed, expanded                       | Smooth animation                      |
| Tabs      | active, inactive                          | Smooth underline transition           |
| Modal     | open, closed                              | Backdrop blur                         |
| Toast     | success, error, warning, info             | Auto-dismiss                          |

### 5.2 Section Components

| Component           | Purpose                        |
| ------------------- | ------------------------------ |
| Hero                | Service/page hero with CTA     |
| FeatureGrid         | 2-4 column feature display     |
| PricingTable        | Tiered pricing comparison      |
| TestimonialCarousel | Auto-rotating testimonials     |
| CTABanner           | Conversion-focused sections    |
| FAQ                 | Accordion FAQ                  |
| CaseStudyCard       | Preview of case studies        |
| DemoCard            | Demo preview cards             |
| ProcessSteps        | Numbered process visualization |

### 5.3 Form Components

| Component       | Purpose                       |
| --------------- | ----------------------------- |
| LeadForm        | Name, email, company, message |
| DemoRequestForm | Demo-specific lead capture    |
| BookingForm     | Calendar + details            |
| NewsletterForm  | Email capture                 |

---

## 6. Animation & Motion Design

### 6.1 Principles

1. **Purposeful** — Animation serves UX, not decoration
2. **Subtle** — Don't distract from content
3. **Fast** — 200-400ms for micro-interactions
4. **Accessible** — Respect prefers-reduced-motion

### 6.2 Animation Specs

| Element       | Animation                 | Duration | Easing      |
| ------------- | ------------------------- | -------- | ----------- |
| Page load     | Fade up + stagger         | 400ms    | ease-out    |
| Button hover  | Scale 1.02 + shadow       | 150ms    | ease-out    |
| Card hover    | Lift (translateY -4px)    | 200ms    | ease-out    |
| Modal open    | Fade + scale from 0.95    | 300ms    | ease-out    |
| Accordion     | Height + rotate           | 300ms    | ease-in-out |
| Scroll reveal | Fade up                   | 500ms    | ease-out    |
| Workflow demo | Sequential path animation | 1000ms+  | linear      |

### 6.3 Implementation

```tsx
// Using Framer Motion (existing)
import { motion } from "framer-motion";

// Stagger children animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
```

---

## 7. Responsive Breakpoints

```css
/* Mobile first */
--breakpoint-sm: 640px; /* Tablet portrait */
--breakpoint-md: 768px; /* Tablet landscape */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### 7.1 Grid System

| Breakpoint | Columns | Gutter | Container                 |
| ---------- | ------- | ------ | ------------------------- |
| Mobile     | 4       | 16px   | 100% - 32px               |
| Tablet     | 8       | 24px   | 100% - 48px               |
| Desktop    | 12      | 32px   | 100% - 64px (max: 1280px) |

---

## 8. Technical Implementation Order

### Phase 1: Foundation (Week 1-2)

```
Day 1-2:   Design system setup
           - CSS variables
           - Core components
           - Typography scale

Day 3-4:   Layout components
           - Navbar (sticky, mobile menu)
           - Footer
           - Container

Day 5-7:   Home page sections
           - Hero
           - Social proof
           - Services grid
           - CTA sections
```

### Phase 2: Service Pages (Week 2-3)

```
Day 8-10:  Service page template
           - Reusable sections
           - Interactive elements

Day 11-14: Individual service pages
           - Automation
           - AI Agents
           - Web Development
           - CMS Integration
```

### Phase 3: Demo System (Week 3-4)

```
Day 15-18: Demo infrastructure
           - Demo container
           - Demo card
           - Lead capture

Day 19-21: Interactive demos
           - Email automation (MVP)
           - Lead qualification (MVP)

Day 22-28: Additional demos + polish
```

### Phase 4: Supporting Pages (Week 4-5)

```
Day 29-32: Case studies + About + Pricing
Day 33-35: Contact flow + Forms
```

---

## 9. Migration Checklist

### To Remove (from current site):

- [ ] `/blog` - Blog system (not priority)
- [ ] `/industries` - Can be case studies instead
- [ ] `/admin` - Keep for internal use
- [ ] `Three.js HeroScene` - Performance cost
- [ ] Old demo pages (`/demo/*`) - Replace with new system
- [ ] Current pricing page - Redesign needed
- [ ] `_components/HeroContent.tsx` - Legacy

### To Keep:

- [ ] `/contact` - Enhance
- [ ] `/portfolio` - Convert to case studies
- [ ] Supabase setup
- [ ] API routes (adapt)
- [ ] UI components (refactor to design system)

### To Add:

- [ ] Interactive demo system
- [ ] Case studies
- [ ] Transparent pricing
- [ ] Booking system
- [ ] Multi-language support

---

## 10. Success Metrics

| Metric                       | Target           | Measurement     |
| ---------------------------- | ---------------- | --------------- |
| Page load                    | < 2.5s           | Lighthouse      |
| Demo engagement              | 30%+ interaction | Analytics       |
| Lead form completion         | 15%+             | Funnel analysis |
| Scroll depth (service pages) | 75%+             | Hotjar          |
| CTA click rate               | 5%+              | A/B testing     |

---

## 11. Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation for all demos
- Screen reader support
- Color contrast 4.5:1 minimum
- Focus indicators visible
- prefers-reduced-motion respected

---

## 12. Files to Create/Modify

### New Files:

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── demos/
│   │   ├── case-studies/
│   │   ├── pricing/
│   │   ├── about/
│   │   └── contact/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── service-card.tsx
│   │   ├── demo-card.tsx
│   │   └── ...
│   └── demos/
│       ├── demo-container.tsx
│       ├── email-automation-demo.tsx
│       ├── lead-qualification-demo.tsx
│       └── ...
└── styles/
    └── globals.css
```

### Files to Delete:

```
src/app/
├── blog/              (remove)
├── industries/       (remove)
├── demo/             (remove - replace with new)
├── demos/            (remove - replace with new)
├── _components/      (remove legacy)

src/components/
├── three/            (remove Three.js hero)
├── sections/         (partial - redesign)
├── demo/             (remove - replace)
├── blog/             (remove)
```

---

_Implementation-ready document_  
_Next step: Execution phase_

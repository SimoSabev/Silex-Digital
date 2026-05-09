# Work Plan: Interactive Service Presentation + SEO Optimization

## TL;DR

> **Quick Summary**: Transform Silex Digital's service presentation into an interactive, conversion-optimized experience with 6 engaging features (ROI calculator, service configurator, case studies, process visualization, pricing toggle, before/after), while implementing comprehensive SEO for Bulgarian market dominance.
> 
> **Deliverables**:
> - 6 interactive components integrated into services/case-study pages
> - Complete SEO infrastructure (technical, local, schema, content)
> - Google Business Profile optimization
> - Bulgaria-specific local SEO (citations, city pages)
> - Core Web Vitals optimization
> - Lead capture and conversion tracking
> 
> **Estimated Effort**: Large (20-25 tasks)
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Wave 1 (Foundation) → Wave 2 (Core Interactive) → Wave 4 (SEO Content) → Wave 5 (Launch)

---

## Context

### Original Request
Create a more sustainable, user-entertaining, and "hookable" service presentation with full SEO optimization for Google indexing and Bulgarian market visibility.

### Current State
- **Platform**: T3 Stack (Next.js 15, React 19, Tailwind v4, Supabase, tRPC)
- **Existing**: Home, Services, Contact, Pricing, Case Studies, Demos, Admin pages
- **Design**: Neo-brutalist + glassmorphism (violet, coral, lime on pearl)
- **Services**: Workflow automation, AI agents, Web development, CMS integrations
- **Backend**: Supabase database, Resend email service

### Interview Summary
**Interactive Features Selected**:
- ROI Calculator - Show potential savings from automation
- Service Configurator - Build custom service packages
- Case Study Filter/Gallery - Filterable portfolio showcase
- Process Visualization - Animated workflow demonstration
- Pricing Toggle/Estimator - Dynamic pricing based on options
- Before/After Comparisons - Interactive transformation sliders

**SEO Goals**: Rank for service keywords, local visibility (Sofia/Bulgaria), brand awareness, lead generation

**Target Audience**: Businesses in Bulgaria needing automation/web dev services with budget

---

## Work Objectives

### Core Objective
Transform the existing Silex Digital website into an engaging, conversion-optimized service presentation with comprehensive SEO infrastructure to dominate Bulgarian market searches.

### Concrete Deliverables
1. **6 Interactive Components** fully integrated
2. **SEO Infrastructure**: Technical, local, schema markup, content optimization
3. **Google Business Profile**: Fully optimized with posts, services, reviews
4. **Local SEO**: Bulgaria citations, city pages (Sofia, Plovdiv, Varna)
5. **Performance**: Core Web Vitals compliance (LCP < 2.5s, INP < 200ms, CLS < 0.1)
6. **Conversion**: Lead capture forms, tracking, CRM integration

### Definition of Done
- [ ] All 6 interactive features functional and tested
- [ ] Google Search Console shows 0 indexing errors
- [ ] Core Web Vitals all "Good" in PageSpeed Insights
- [ ] GBP showing in local pack for "automation services Sofia"
- [ ] Lead form submissions tracked in GA4
- [ ] All service pages have unique schema markup

### Must Have
- Interactive ROI calculator with real savings estimates
- Service configurator with package builder
- Filterable case study gallery
- Animated process visualization
- Dynamic pricing estimator
- Before/after comparison sliders
- Complete LocalBusiness + Service schema
- Google Business Profile optimization
- Bulgarian local citations (Golden Pages, Firmi.bg)
- City-specific landing pages
- Core Web Vitals optimization
- Lead capture and tracking

### Must NOT Have (Guardrails)
- Client-side rendering for SEO-critical content (use Server Components)
- Duplicate/template content across city pages (60%+ unique required)
- Blocking JavaScript that delays indexing
- Missing NAP consistency across channels
- Slow LCP (>4s) or poor INP (>500ms)

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES (Next.js project with testing capability)
- **Automated tests**: Tests-after (implement features first, then add tests)
- **Framework**: bun test (comes with T3 Stack)
- **If tests-after**: Each task includes QA scenarios executed by agent

### QA Policy
Every task MUST include agent-executed QA scenarios:
- **Frontend/UI**: Use Playwright - Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) - Send requests, assert status + response
- **SEO**: Use Bash (curl + tools) - Validate schema, check indexing, measure performance
- **Performance**: Use PageSpeed Insights API or Lighthouse CLI

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - SEO Infrastructure):
├── Task 1: Set up Google Search Console + verify property
├── Task 2: Create sitemap.ts and robots.ts
├── Task 3: Implement LocalBusiness + Service schema markup
├── Task 4: Optimize existing metadata for all pages
└── Task 5: Core Web Vitals baseline + critical fixes

Wave 2 (Interactive Components - MAX PARALLEL):
├── Task 6: ROI Calculator component
├── Task 7: Service Configurator component
├── Task 8: Case Study Filter/Gallery component
├── Task 9: Process Visualization animations
├── Task 10: Pricing Toggle/Estimator component
└── Task 11: Before/After Comparison component

Wave 3 (Integration + Polish):
├── Task 12: Integrate all components into Services page
├── Task 13: Integrate components into Case Studies page
├── Task 14: Create interactive demo scenarios
├── Task 15: Add lead capture forms to interactive elements
└── Task 16: Implement conversion tracking (GA4 events)

Wave 4 (Local SEO + Content):
├── Task 17: Optimize Google Business Profile
├── Task 18: Create Sofia service area page
├── Task 19: Create Plovdiv service area page
├── Task 20: Create Varna service area page
├── Task 21: Build Bulgarian citation list + submit to directories
└── Task 22: Add FAQ schema + location-specific FAQs

Wave 5 (Launch + Monitoring):
├── Task 23: Final SEO audit + schema validation
├── Task 24: Performance optimization pass
├── Task 25: Request Google indexing for all pages
└── Task 26: Set up monitoring (GSC, GA4, Core Web Vitals)

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: Wave 1 → Wave 2 → Wave 3 → Wave 4 → Wave 5 → F1-F4 → user okay
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 6 (Wave 2)
```

### Dependency Matrix

| Task | Blocked By | Blocks |
|------|-----------|--------|
| 1 (GSC) | - | 23, 25 |
| 2 (Sitemap) | - | 3, 25 |
| 3 (Schema) | 2 | 12, 13, 23 |
| 4 (Metadata) | - | 12, 13, 17 |
| 5 (Core Web Vitals) | - | 24 |
| 6-11 (Components) | - | 12, 13 |
| 12 (Services Integration) | 3, 4, 6-11 | 15, 16 |
| 13 (Case Studies Integration) | 3, 4, 8 | 15, 16 |
| 14 (Demo Scenarios) | 6-11 | 15 |
| 15 (Lead Capture) | 12, 13, 14 | 16 |
| 16 (Conversion Tracking) | 15 | 26 |
| 17 (GBP) | 4 | 21 |
| 18-20 (City Pages) | 3, 4 | 21, 23 |
| 21 (Citations) | 17, 18-20 | - |
| 22 (FAQ Schema) | 18-20 | 23 |
| 23 (SEO Audit) | 1, 2, 3, 12, 13, 18-20, 22 | 25 |
| 24 (Performance) | 5, 12, 13 | - |
| 25 (Request Indexing) | 1, 2, 23 | 26 |
| 26 (Monitoring) | 16, 25 | - |
| F1-F4 | All 1-26 | - |

### Agent Dispatch Summary

- **Wave 1**: **5** - T1-T5 → `quick` (SEO setup tasks)
- **Wave 2**: **6** - T6-T11 → `visual-engineering` (Interactive components)
- **Wave 3**: **5** - T12-T16 → `unspecified-high` (Integration + tracking)
- **Wave 4**: **6** - T17-T22 → `unspecified-high` (Local SEO + content)
- **Wave 5**: **4** - T23-T26 → `quick` + `unspecified-high` (Launch + monitoring)
- **FINAL**: **4** - F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Set up Google Search Console + Verify Property

  **What to do**:
  - Add silex-digital.com (or current domain) to Google Search Console
  - Verify ownership via HTML tag, DNS record, or Google Analytics
  - Submit initial sitemap
  - Configure domain property vs URL-prefix property
  - Set up email notifications for indexing issues

  **Must NOT do**:
  - Don't use URL-prefix if you have www/non-www versions (use domain property)
  - Don't skip verification steps

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A - this is setup/configuration

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 23 (SEO Audit), Task 25 (Request Indexing)
  - **Blocked By**: None

  **References**:
  - Google Search Console: https://search.google.com/search-console
  - Verification methods: https://support.google.com/webmasters/answer/9008080
  - Next.js metadataBase: See src/app/layout.tsx for domain config

  **Acceptance Criteria**:
  - [ ] Property shows as "Verified" in GSC
  - [ ] Can access URL Inspection tool
  - [ ] Sitemap submission successful (0 errors)

  **QA Scenarios**:
  ```
  Scenario: Verify GSC property is accessible
    Tool: Bash (curl)
    Steps:
      1. curl -I https://search.google.com/search-console
      2. Verify HTTP 200 response
    Expected Result: GSC accessible, property verified
    Evidence: .sisyphus/evidence/task-1-gsc-verified.txt
  ```

  **Commit**: NO (config-only, no code changes)

---

- [ ] 2. Create Dynamic Sitemap and Robots.txt

  **What to do**:
  - Create `src/app/sitemap.ts` with dynamic route generation
  - Include all pages: home, services, pricing, contact, case-studies, demos
  - Add lastModified dates, changeFrequency, priority
  - Create `src/app/robots.ts` with allow/disallow rules
  - Exclude: /api/, /admin/, demo simulations
  - Include sitemap reference in robots.txt

  **Must NOT do**:
  - Don't include noindex pages in sitemap
  - Don't use static sitemap.xml (use dynamic .ts)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - This is straightforward Next.js API implementation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 3 (Schema), Task 25 (Request Indexing)
  - **Blocked By**: None

  **References**:
  - Next.js sitemap docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
  - Next.js robots docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
  - Existing routes: See src/app/ directory structure

  **Acceptance Criteria**:
  - [ ] /sitemap.xml returns valid XML with all routes
  - [ ] /robots.txt returns valid robots directives
  - [ ] Sitemap includes lastModified dates
  - [ ] Robots references sitemap URL
  - [ ] bun run build succeeds

  **QA Scenarios**:
  ```
  Scenario: Verify sitemap generation
    Tool: Bash (curl)
    Steps:
      1. curl http://localhost:3000/sitemap.xml
      2. Validate XML structure
      3. Check all expected routes present
    Expected Result: Valid sitemap with 8+ routes
    Evidence: .sisyphus/evidence/task-2-sitemap.xml

  Scenario: Verify robots.txt
    Tool: Bash (curl)
    Steps:
      1. curl http://localhost:3000/robots.txt
      2. Check User-agent and Allow/Disallow rules
    Expected Result: Proper robots.txt with sitemap reference
    Evidence: .sisyphus/evidence/task-2-robots.txt
  ```

  **Commit**: YES
  - Message: `feat(seo): add dynamic sitemap and robots.txt`
  - Files: `src/app/sitemap.ts`, `src/app/robots.ts`
  - Pre-commit: `bun run build`

---

- [ ] 3. Implement LocalBusiness + Service Schema Markup

  **What to do**:
  - Create JSON-LD schema components in src/components/seo/
  - LocalBusiness schema with full NAP (Name, Address, Phone)
  - Service schema for each offering (automation, AI, web dev, CMS)
  - Organization schema as foundation
  - Use @id references to link schemas
  - Add to layout.tsx (Organization) and service pages (Service)

  **Must NOT do**:
  - Don't use CSR for schema (must be in initial HTML)
  - Don't have NAP inconsistencies with GBP

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - JSON-LD implementation is straightforward markup

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2 complete)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 12, 13 (Integration), Task 18-20 (City Pages), Task 23 (Audit)
  - **Blocked By**: Task 2 (Sitemap structure knowledge)

  **References**:
  - Schema.org LocalBusiness: https://schema.org/LocalBusiness
  - Schema.org Service: https://schema.org/Service
  - Google's structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data
  - Rich Results Test: https://search.google.com/test/rich-results

  **Acceptance Criteria**:
  - [ ] Organization schema on homepage
  - [ ] LocalBusiness schema on all pages
  - [ ] Individual Service schemas on /services
  - [ ] All schemas validate in Rich Results Test
  - [ ] NAP matches planned GBP data

  **QA Scenarios**:
  ```
  Scenario: Validate schema markup
    Tool: Bash (curl + extraction)
    Steps:
      1. curl http://localhost:3000 | grep -o '<script type="application/ld+json">.*</script>'
      2. Verify JSON-LD structure
      3. Check @context and @type fields
    Expected Result: Valid JSON-LD schema present
    Evidence: .sisyphus/evidence/task-3-schema.json

  Scenario: Rich Results Test validation
    Tool: Bash (manual verification - note in evidence)
    Steps:
      1. Copy page source
      2. Paste into https://search.google.com/test/rich-results
      3. Verify 0 errors, warnings only
    Expected Result: Schema validates without errors
    Evidence: .sisyphus/evidence/task-3-rich-results.txt
  ```

  **Commit**: YES
  - Message: `feat(seo): add LocalBusiness and Service schema markup`
  - Files: `src/components/seo/OrganizationSchema.tsx`, `src/components/seo/LocalBusinessSchema.tsx`, `src/components/seo/ServiceSchema.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 4. Optimize Metadata for All Pages

  **What to do**:
  - Audit and update metadata in src/app/layout.tsx (root)
  - Update metadata in each page.tsx (page-specific)
  - Unique titles: 50-60 chars, keyword at start
  - Unique descriptions: 150-160 chars, include call-to-action
  - Add Open Graph tags (og:title, og:description, og:image, og:type)
  - Add Twitter Card meta
  - Set metadataBase in layout.tsx
  - Canonical tags on all pages

  **Must NOT do**:
  - Don't duplicate titles/descriptions across pages
  - Don't exceed character limits
  - Don't forget metadataBase (causes og:image issues)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Metadata updates are configuration changes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 12, 13 (Integration), Task 17 (GBP), Task 18-20 (City Pages)
  - **Blocked By**: None

  **References**:
  - Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  - Title tag best practices: https://developers.google.com/search/docs/appearance/title-link
  - Meta description guidelines: https://developers.google.com/search/docs/appearance/snippet
  - Open Graph protocol: https://ogp.me/

  **Acceptance Criteria**:
  - [ ] All pages have unique titles (50-60 chars)
  - [ ] All pages have unique descriptions (150-160 chars)
  - [ ] Open Graph tags present on all pages
  - [ ] metadataBase set correctly
  - [ ] Canonical self-references on all pages

  **QA Scenarios**:
  ```
  Scenario: Verify metadata on all pages
    Tool: Bash (curl + grep)
    Steps:
      1. curl http://localhost:3000 | grep -i '<title>'
      2. curl http://localhost:3000/services | grep -i '<title>'
      3. Check title length and uniqueness
    Expected Result: Unique, properly-sized titles on all pages
    Evidence: .sisyphus/evidence/task-4-metadata-check.txt
  ```

  **Commit**: YES
  - Message: `feat(seo): optimize metadata for all pages`
  - Files: `src/app/layout.tsx`, `src/app/*/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 5. Core Web Vitals Baseline + Critical Fixes

  **What to do**:
  - Run Lighthouse/PageSpeed Insights on current site
  - Document baseline LCP, INP, CLS scores
  - Fix critical issues:
    - Preload hero images (LCP)
    - Add width/height to images (CLS)
    - Defer non-critical JS (INP)
    - Optimize font loading
  - Use next/image for all images
  - Check for render-blocking resources
  - Implement loading.tsx for streaming

  **Must NOT do**:
  - Don't ignore LCP > 4s (31% ranking drop risk)
  - Don't use unoptimized images
  - Don't block main thread with heavy JS

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Requires performance analysis and optimization

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 24 (Performance optimization pass)
  - **Blocked By**: None

  **References**:
  - Core Web Vitals: https://web.dev/vitals/
  - Next.js image optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
  - Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci

  **Acceptance Criteria**:
  - [ ] LCP < 2.5s (or documented plan to achieve)
  - [ ] INP < 200ms (or documented plan)
  - [ ] CLS < 0.1 (or documented plan)
  - [ ] All images use next/image
  - [ ] No render-blocking resources

  **QA Scenarios**:
  ```
  Scenario: Measure Core Web Vitals
    Tool: Bash (Lighthouse CI or PageSpeed Insights)
    Steps:
      1. Run Lighthouse on homepage
      2. Extract LCP, INP, CLS scores
      3. Verify all scores documented
    Expected Result: Baseline metrics recorded with critical issues flagged
    Evidence: .sisyphus/evidence/task-5-cwv-baseline.json
  ```

  **Commit**: YES (if fixes needed)
  - Message: `perf: fix critical Core Web Vitals issues`
  - Files: Image components, font loading, etc.
  - Pre-commit: `bun run build`

---

- [ ] 6. ROI Calculator Component

  **What to do**:
  - Create interactive calculator showing savings from automation
  - Input fields: employees, hours spent on repetitive tasks, hourly rate
  - Calculate: hours saved per month, cost savings, ROI percentage
  - Visual: Animated number counters, progress bars showing savings
  - CTA: "Get your custom automation quote" button
  - Responsive design matching neo-brutalist theme
  - Save calculation to Supabase (optional lead capture)

  **Must NOT do**:
  - Don't make calculations unrealistic (be conservative)
  - Don't skip mobile responsiveness
  - Don't block page rendering (use Client Component appropriately)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For interactive component design, animations, and conversion-optimized UI patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES (all Wave 2 components parallel)
  - **Parallel Group**: Wave 2 (with Tasks 7-11)
  - **Blocks**: Task 12, 14 (Integration)
  - **Blocked By**: None

  **References**:
  - Existing Button component: src/components/ui/Button.tsx
  - Tailwind config: src/styles/globals.css (violet, coral, lime theme)
  - SectionContainer: src/components/layout/SectionContainer.tsx

  **Acceptance Criteria**:
  - [ ] Calculator accepts all inputs
  - [ ] Calculations are accurate and realistic
  - [ ] Visual feedback shows savings clearly
  - [ ] CTA button present and functional
  - [ ] Mobile responsive
  - [ ] Matches design system

  **QA Scenarios**:
  ```
  Scenario: Test ROI calculation
    Tool: Playwright
    Steps:
      1. Navigate to /services
      2. Scroll to ROI calculator
      3. Input: 5 employees, 10 hours/week, 20€/hour
      4. Click "Calculate"
    Expected Result: Shows ~400€/month savings, 240% ROI
    Evidence: .sisyphus/evidence/task-6-roi-calculator.png

  Scenario: Mobile responsiveness
    Tool: Playwright
    Steps:
      1. Set viewport to 375px width
      2. Navigate to calculator
      3. Verify inputs are usable
    Expected Result: Calculator usable on mobile
    Evidence: .sisyphus/evidence/task-6-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(components): add ROI calculator for service savings`
  - Files: `src/components/interactive/ROICalculator.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 7. Service Configurator Component

  **What to do**:
  - Create interactive package builder
  - Service options: Workflow automation, AI agents, Web dev, CMS
  - Tiers/options for each: Basic, Standard, Premium
  - Real-time price calculation based on selections
  - Visual: Cards with icons, toggle switches, summary panel
  - "Build your package" → "Get quote" flow
  - Save configuration to state/Supabase

  **Must NOT do**:
  - Don't overwhelm with too many options (max 4 services)
  - Don't hide pricing (show ranges upfront)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For card layouts, toggle interactions, and pricing display patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12 (Services Integration)
  - **Blocked By**: None

  **References**:
  - Service pricing in existing page: src/app/services/page.tsx
  - Design system: Tailwind theme in globals.css
  - Existing card patterns in components/ui/

  **Acceptance Criteria**:
  - [ ] All 4 services selectable
  - [ ] Price updates in real-time
  - [ ] Summary shows selected items
  - [ ] "Get quote" CTA functional
  - [ ] Smooth animations

  **QA Scenarios**:
  ```
  Scenario: Configure custom package
    Tool: Playwright
    Steps:
      1. Navigate to configurator
      2. Select: Workflow automation (Standard) + AI agents (Basic)
      3. Verify price calculation
      4. Click "Get quote"
    Expected Result: Price shows correctly, form opens
    Evidence: .sisyphus/evidence/task-7-configurator.png
  ```

  **Commit**: YES
  - Message: `feat(components): add service configurator with pricing`
  - Files: `src/components/interactive/ServiceConfigurator.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 8. Case Study Filter/Gallery Component

  **What to do**:
  - Create filterable portfolio gallery
  - Filter by: Service type, Industry, Technology
  - Cards with: Thumbnail, title, industry, results metric, "View case study"
  - Grid layout with smooth filtering animations
  - Lazy load images
  - Individual case study detail views (modals or pages)

  **Must NOT do**:
  - Don't use low-quality images
  - Don't make filters confusing (clear labels)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For gallery layouts, filtering animations, and card designs

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 13 (Case Studies Integration)
  - **Blocked By**: None

  **References**:
  - Existing case studies page: src/app/case-studies/page.tsx
  - Image component: next/image
  - Filter UI patterns

  **Acceptance Criteria**:
  - [ ] All case studies display in grid
  - [ ] Filters work correctly
  - [ ] Animations smooth
  - [ ] Images lazy-loaded
  - [ ] Detail view accessible

  **QA Scenarios**:
  ```
  Scenario: Filter case studies
    Tool: Playwright
    Steps:
      1. Navigate to /case-studies
      2. Click filter "AI Automation"
      3. Verify only AI cases show
      4. Clear filter
    Expected Result: Filtering works, animations smooth
    Evidence: .sisyphus/evidence/task-8-filter-gallery.png
  ```

  **Commit**: YES
  - Message: `feat(components): add filterable case study gallery`
  - Files: `src/components/interactive/CaseStudyGallery.tsx`, `src/components/interactive/CaseStudyCard.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 9. Process Visualization Component

  **What to do**:
  - Create animated workflow showing your 4-6 step process
  - Steps: Discovery → Planning → Development → Testing → Launch → Support
  - Visual: Timeline or step cards with icons
  - Animations: Scroll-triggered reveals, connecting lines
  - Interactive: Hover states with more details
  - Mobile: Vertical timeline
  - Desktop: Horizontal or alternating layout

  **Must NOT do**:
  - Don't make animations too slow (keep under 1s)
  - Don't skip accessibility (respects prefers-reduced-motion)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For scroll animations, timeline layouts, and interaction patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12 (Services Integration)
  - **Blocked By**: None

  **References**:
  - Tailwind animations: Built-in transitions
  - Framer Motion (if needed): For complex scroll animations
  - SectionContainer: src/components/layout/SectionContainer.tsx

  **Acceptance Criteria**:
  - [ ] All process steps visible
  - [ ] Scroll animations work
  - [ ] Hover interactions functional
  - [ ] Mobile responsive
  - [ ] Accessible (reduced motion support)

  **QA Scenarios**:
  ```
  Scenario: View process visualization
    Tool: Playwright
    Steps:
      1. Navigate to /services
      2. Scroll to process section
      3. Verify steps animate in
      4. Hover over step 2
    Expected Result: Animations trigger, hover shows details
    Evidence: .sisyphus/evidence/task-9-process-viz.png
  ```

  **Commit**: YES
  - Message: `feat(components): add animated process visualization`
  - Files: `src/components/interactive/ProcessVisualization.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 10. Pricing Toggle/Estimator Component

  **What to do**:
  - Create dynamic pricing display
  - Toggle between: One-time project vs Monthly retainer
  - Variables: Project complexity, team size, timeline
  - Show price range (not exact - "from X€")
  - Visual: Pricing cards with feature lists
  - CTA: "Get detailed quote" per tier
  - Highlight recommended option

  **Must NOT do**:
  - Don't show exact prices (use ranges)
  - Don't make it too complex (3 tiers max)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For pricing table layouts and toggle interactions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12 (Services Integration)
  - **Blocked By**: None

  **References**:
  - Existing pricing page: src/app/pricing/page.tsx
  - Design system: Colors, typography
  - Toggle component pattern

  **Acceptance Criteria**:
  - [ ] Toggle switches pricing display
  - [ ] Variables affect price ranges
  - [ ] 3 pricing tiers shown
  - [ ] CTAs functional
  - [ ] Recommended tier highlighted

  **QA Scenarios**:
  ```
  Scenario: Toggle pricing view
    Tool: Playwright
    Steps:
      1. Navigate to pricing section
      2. Toggle to "Monthly retainer"
      3. Verify prices update
      4. Click "Get quote" on Standard tier
    Expected Result: Prices toggle correctly, CTA works
    Evidence: .sisyphus/evidence/task-10-pricing-toggle.png
  ```

  **Commit**: YES
  - Message: `feat(components): add pricing toggle with dynamic estimates`
  - Files: `src/components/interactive/PricingToggle.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 11. Before/After Comparison Component

  **What to do**:
  - Create interactive before/after slider
  - Use case: Show transformation (manual process → automated)
  - Visual: Split screen with draggable slider handle
  - Metrics: Time saved, error reduction, cost comparison
  - Multiple examples (3-4 different transformations)
  - Responsive design

  **Must NOT do**:
  - Don't use fake/mock comparisons (real client results)
  - Don't make slider unusable on mobile

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For comparison sliders and transformation showcases

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12, 14 (Integration)
  - **Blocked By**: None

  **References**:
  - Before/after slider libraries (react-compare-slider)
  - Case study data structure
  - Responsive image handling

  **Acceptance Criteria**:
  - [ ] Slider draggable on desktop and mobile
  - [ ] Before/after content clearly shown
  - [ ] Metrics displayed
  - [ ] Multiple examples available
  - [ ] Smooth interaction

  **QA Scenarios**:
  ```
  Scenario: Use before/after slider
    Tool: Playwright
    Steps:
      1. Navigate to case study with comparison
      2. Drag slider from left to right
      3. Verify smooth transition
      4. Check metrics display
    Expected Result: Slider works smoothly, metrics visible
    Evidence: .sisyphus/evidence/task-11-before-after.png
  ```

  **Commit**: YES
  - Message: `feat(components): add before/after comparison slider`
  - Files: `src/components/interactive/BeforeAfterSlider.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 12. Integrate Components into Services Page

  **What to do**:
  - Update src/app/services/page.tsx to include all interactive components
  - Layout: Hero → Process visualization → ROI calculator → Service configurator → Pricing toggle → CTA
  - Ensure proper spacing and flow
  - Add scroll animations between sections
  - Maintain Server Components where possible (move interactive parts to client boundaries)
  - Test full page functionality

  **Must NOT do**:
  - Don't make the page too long (break into logical sections)
  - Don't lose existing service descriptions

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Integration work requiring understanding of both existing code and new components

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential after Wave 2)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 15, 16 (Lead capture, tracking)
  - **Blocked By**: Tasks 3, 4, 6, 7, 9, 10 (Components ready)

  **References**:
  - Existing services page: src/app/services/page.tsx
  - All components from Tasks 6-11
  - SectionContainer: src/components/layout/SectionContainer.tsx

  **Acceptance Criteria**:
  - [ ] All interactive components integrated
  - [ ] Page flows logically
  - [ ] No console errors
  - [ ] Mobile responsive
  - [ ] Build succeeds

  **QA Scenarios**:
  ```
  Scenario: Full services page test
    Tool: Playwright
    Steps:
      1. Navigate to /services
      2. Scroll through entire page
      3. Test each interactive component
      4. Verify all sections visible
    Expected Result: All components functional, no errors
    Evidence: .sisyphus/evidence/task-12-services-page.png
  ```

  **Commit**: YES
  - Message: `feat(services): integrate all interactive components`
  - Files: `src/app/services/page.tsx`
  - Pre-commit: `bun run build && bun test`

---

- [ ] 13. Integrate Components into Case Studies Page

  **What to do**:
  - Update src/app/case-studies/page.tsx
  - Add Case Study Gallery (Task 8)
  - Add Before/After Sliders to individual case studies
  - Add process visualization per case study
  - Ensure filtering works with real data
  - Link from gallery to detail views

  **Must NOT do**:
  - Don't duplicate content between list and detail views

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Integration requiring component composition

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 12)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 15, 16
  - **Blocked By**: Tasks 3, 4, 8, 11 (Components ready)

  **References**:
  - Existing case studies page: src/app/case-studies/page.tsx
  - Components: CaseStudyGallery, BeforeAfterSlider

  **Acceptance Criteria**:
  - [ ] Gallery integrated and functional
  - [ ] Case studies have before/after comparisons
  - [ ] Filtering works
  - [ ] Detail views accessible

  **QA Scenarios**:
  ```
  Scenario: Test case studies page
    Tool: Playwright
    Steps:
      1. Navigate to /case-studies
      2. Use filters
      3. Click on case study
      4. View before/after
    Expected Result: Gallery and comparisons work
    Evidence: .sisyphus/evidence/task-13-case-studies.png
  ```

  **Commit**: YES
  - Message: `feat(case-studies): integrate gallery and comparisons`
  - Files: `src/app/case-studies/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 14. Create Interactive Demo Scenarios

  **What to do**:
  - Build 2-3 interactive demos showing your solutions
  - Demo 1: Workflow automation simulation (drag-drop workflow builder)
  - Demo 2: AI chatbot interaction (functional chat interface)
  - Demo 3: Dashboard preview (mock analytics dashboard)
  - Use existing demos infrastructure in src/app/demos/
  - Make them engaging but not overly complex
  - Clear "This is a demo" labeling

  **Must NOT do**:
  - Don't make demos too complex (keep under 2 hours each)
  - Don't promise features you can't deliver

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`ui-ux-pro-max`]
  - `ui-ux-pro-max`: For interactive demo designs and user engagement patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 15 (Lead capture on demos)
  - **Blocked By**: None

  **References**:
  - Existing demos: src/app/demos/
  - Demo simulation logic: src/lib/demo/

  **Acceptance Criteria**:
  - [ ] 3 demos created
  - [ ] Each demo is interactive
  - [ ] Clear demo labeling
  - [ ] Mobile responsive
  - [ ] Performance acceptable

  **QA Scenarios**:
  ```
  Scenario: Test workflow demo
    Tool: Playwright
    Steps:
      1. Navigate to /demos/workflow
      2. Interact with demo
      3. Complete demo flow
    Expected Result: Demo works smoothly
    Evidence: .sisyphus/evidence/task-14-demo.png
  ```

  **Commit**: YES
  - Message: `feat(demos): add interactive demo scenarios`
  - Files: `src/app/demos/*/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 15. Add Lead Capture Forms to Interactive Elements

  **What to do**:
  - Add lead forms to:
    - ROI calculator ("Get detailed savings report")
    - Service configurator ("Get custom quote")
    - Pricing estimator ("Get detailed pricing")
    - Case studies ("Discuss similar project")
    - Demos ("Build this for me")
  - Form fields: Name, Email, Company, Phone (optional), Message
  - Use Supabase or Resend for form submission
  - Validation: Client-side + server-side
  - Success state: Thank you message + next steps
  - Store leads in database

  **Must NOT do**:
  - Don't make forms too long (max 5 fields)
  - Don't skip validation

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Requires backend integration with Supabase/Resend

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 16)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Tasks 12, 13, 14 (Components integrated)

  **References**:
  - Supabase client: src/lib/supabase.ts
  - Resend config: src/lib/resend.ts
  - Existing forms in contact page

  **Acceptance Criteria**:
  - [ ] Forms added to all interactive elements
  - [ ] Validation works
  - [ ] Submissions stored
  - [ ] Success states shown
  - [ ] Admin can view leads

  **QA Scenarios**:
  ```
  Scenario: Submit lead form
    Tool: Playwright
    Steps:
      1. Navigate to ROI calculator
      2. Click "Get detailed savings report"
      3. Fill form: test@example.com, Test Company
      4. Submit
    Expected Result: Form submits, success message shown
    Evidence: .sisyphus/evidence/task-15-lead-form.png
  ```

  **Commit**: YES
  - Message: `feat(forms): add lead capture to interactive components`
  - Files: `src/components/forms/LeadCaptureForm.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 16. Implement Conversion Tracking (GA4 Events)

  **What to do**:
  - Set up Google Analytics 4 (if not already)
  - Track events:
    - Calculator usage (roi_calculated)
    - Configurator usage (package_configured)
    - Form submissions (lead_form_submit)
    - Case study views (case_study_view)
    - Demo interactions (demo_started, demo_completed)
    - Pricing toggle (pricing_viewed)
    - CTA clicks (cta_click)
  - Use next/script for GA4
  - Set up conversion goals in GA4
  - Verify events firing correctly

  **Must NOT do**:
  - Don't track PII (personally identifiable information)
  - Don't block page load with analytics

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Analytics setup and event tracking

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 15)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 26 (Monitoring)
  - **Blocked By**: Task 15 (Forms ready)

  **References**:
  - GA4 documentation: https://developers.google.com/analytics/devguides/collection/ga4
  - next/script: https://nextjs.org/docs/app/building-your-application/optimizing/scripts

  **Acceptance Criteria**:
  - [ ] GA4 script added
  - [ ] All events tracked
  - [ ] Conversions set up
  - [ ] Events verified in DebugView

  **QA Scenarios**:
  ```
  Scenario: Verify GA4 events
    Tool: Bash (check network requests)
    Steps:
      1. Open site with GA DebugView
      2. Trigger calculator usage
      3. Check event fires
    Expected Result: Events appear in GA4
    Evidence: .sisyphus/evidence/task-16-ga4-events.txt
  ```

  **Commit**: YES
  - Message: `feat(analytics): add GA4 conversion tracking`
  - Files: `src/components/analytics/GA4.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 17. Optimize Google Business Profile

  **What to do**:
  - Create or claim GBP listing for Silex Digital
  - Fill ALL fields:
    - Business name, category (Computer Support and Services)
    - Address (if physical) or service area (Sofia, Bulgaria)
    - Phone, website, hours
    - Description (750 chars max, include keywords)
    - Services (list all 4 with descriptions)
    - Attributes (B2B service, etc.)
  - Upload 20-30 photos (team, office, work samples)
  - Create first post (offer, update, or event)
  - Enable messaging
  - Set up Q&A

  **Must NOT do**:
  - Don't use virtual office addresses
  - Don't keyword stuff business name

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - GBP setup is configuration work

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 21 (Citations need GBP URL)
  - **Blocked By**: None

  **References**:
  - GBP guidelines: https://support.google.com/business/answer/3038177
  - Category selection: https://support.google.com/business/answer/6098334

  **Acceptance Criteria**:
  - [ ] GBP verified and published
  - [ ] All fields completed
  - [ ] Photos uploaded (20+)
  - [ ] First post created
  - [ ] Services listed

  **QA Scenarios**:
  ```
  Scenario: Verify GBP listing
    Tool: Bash (curl + search)
    Steps:
      1. Search "Silex Digital Sofia" on Google
      2. Verify Knowledge Panel appears
      3. Check all information displays
    Expected Result: GBP visible in search results
    Evidence: .sisyphus/evidence/task-17-gbp-listing.txt
  ```

  **Commit**: NO (external platform, no code changes)

---

- [ ] 18. Create Sofia Service Area Page

  **What to do**:
  - Create src/app/services/sofia/page.tsx
  - Content (60%+ unique from main services page):
    - H1: "Automation Services in Sofia, Bulgaria"
    - Intro specific to Sofia market
    - Service coverage: neighborhoods, districts
    - Local proof: Sofia-based clients, case studies
    - Local FAQs (3-5 unique)
    - CTA: Contact for Sofia services
  - Add LocalBusiness schema with Sofia areaServed
  - Link from main services page
  - Include in sitemap

  **Must NOT do**:
  - Don't duplicate template content (must be 60%+ unique)
  - Don't create doorway pages

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`ui-ux-pro-max`]
  - Requires local content writing + SEO optimization

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 21, 23
  - **Blocked By**: Tasks 3, 4 (Schema and metadata patterns)

  **References**:
  - Main services page: src/app/services/page.tsx
  - Schema pattern: Task 3
  - Sofia-specific information (research needed)

  **Acceptance Criteria**:
  - [ ] Page created at /services/sofia
  - [ ] 60%+ unique content
  - [ ] Local schema implemented
  - [ ] Local FAQs included
  - [ ] Links to main services

  **QA Scenarios**:
  ```
  Scenario: View Sofia page
    Tool: Playwright
    Steps:
      1. Navigate to /services/sofia
      2. Verify local content
      3. Check schema
    Expected Result: Unique Sofia-focused content
    Evidence: .sisyphus/evidence/task-18-sofia-page.png
  ```

  **Commit**: YES
  - Message: `feat(seo): add Sofia service area page`
  - Files: `src/app/services/sofia/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 19. Create Plovdiv Service Area Page

  **What to do**:
  - Create src/app/services/plovdiv/page.tsx
  - Same structure as Sofia page but Plovdiv-focused
  - Plovdiv-specific content:
    - Local business environment
    - Plovdiv industries you serve
    - Local case studies or examples
    - Plovdiv-specific FAQs
  - LocalBusiness schema with Plovdiv areaServed

  **Must NOT do**:
  - Don't just replace "Sofia" with "Plovdiv" (unique content required)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`ui-ux-pro-max`]
  - Content + SEO optimization

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 18, 20)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 21, 23
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Sofia page structure: Task 18
  - Plovdiv research (second largest city, different industries)

  **Acceptance Criteria**:
  - [ ] Page at /services/plovdiv
  - [ ] Plovdiv-specific content
  - [ ] Unique from Sofia page
  - [ ] Schema implemented

  **QA Scenarios**:
  ```
  Scenario: View Plovdiv page
    Tool: Playwright
    Steps:
      1. Navigate to /services/plovdiv
      2. Verify Plovdiv content
    Expected Result: Unique Plovdiv content
    Evidence: .sisyphus/evidence/task-19-plovdiv-page.png
  ```

  **Commit**: YES
  - Message: `feat(seo): add Plovdiv service area page`
  - Files: `src/app/services/plovdiv/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 20. Create Varna Service Area Page

  **What to do**:
  - Create src/app/services/varna/page.tsx
  - Varna-focused content:
    - Maritime/logistics industry focus
    - Tourism tech services
    - Varna business community
    - Local examples and FAQs
  - Same quality standards as Sofia/Plovdiv

  **Must NOT do**:
  - Don't duplicate content across city pages

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`ui-ux-pro-max`]
  - Content + SEO

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 18, 19)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 21, 23
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Sofia/Plovdiv page patterns
  - Varna research (maritime city, different business mix)

  **Acceptance Criteria**:
  - [ ] Page at /services/varna
  - [ ] Varna-specific content
  - [ ] Unique from other cities
  - [ ] Schema implemented

  **QA Scenarios**:
  ```
  Scenario: View Varna page
    Tool: Playwright
    Steps:
      1. Navigate to /services/varna
      2. Verify Varna content
    Expected Result: Unique Varna content
    Evidence: .sisyphus/evidence/task-20-varna-page.png
  ```

  **Commit**: YES
  - Message: `feat(seo): add Varna service area page`
  - Files: `src/app/services/varna/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 21. Build Bulgarian Citation List + Submit to Directories

  **What to do**:
  - Create consistent NAP (Name, Address, Phone) across all platforms
  - Submit to Bulgarian directories:
    - Golden Pages Bulgaria (goldenpages.bg)
    - Firmi.bg (firmi.bg)
    - BULSTAT Register (if applicable)
    - Business.bg (business.bg)
    - Bazar.bg Business (bazar.bg)
  - Submit to general directories:
    - Yelp Bulgaria
    - Facebook Business
    - LinkedIn Company
  - Document all submissions with URLs
  - Ensure NAP consistency (critical!)

  **Must NOT do**:
  - Don't have NAP inconsistencies (hurts rankings)
  - Don't use automated submission tools

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Manual directory submissions

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 18-20)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: Task 17 (GBP ready for citation)

  **References**:
  - GBP listing: Task 17
  - NAP consistency guide: https://moz.com/learn/seo/citations

  **Acceptance Criteria**:
  - [ ] Submitted to 5+ Bulgarian directories
  - [ ] NAP consistent everywhere
  - [ ] Submissions documented
  - [ ] Listings verified/approved

  **QA Scenarios**:
  ```
  Scenario: Verify citations
    Tool: Bash (manual verification)
    Steps:
      1. Check each directory for listing
      2. Verify NAP matches GBP
      3. Document URLs
    Expected Result: Consistent listings across directories
    Evidence: .sisyphus/evidence/task-21-citations.txt
  ```

  **Commit**: NO (external submissions)

---

- [ ] 22. Add FAQ Schema + Location-Specific FAQs

  **What to do**:
  - Add FAQ sections to:
    - Main services page (general FAQs)
    - Each city page (location-specific FAQs)
  - 3-5 FAQs per page
  - FAQPage schema markup (JSON-LD)
  - Questions based on real customer queries
  - Include pricing, timeline, process questions

  **Must NOT do**:
  - Don't create fake FAQs (use real customer questions)
  - Don't add FAQs just for schema (must provide value)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Content creation + schema implementation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 23 (Audit)
  - **Blocked By**: Tasks 18-20 (City pages exist)

  **References**:
  - FAQPage schema: https://schema.org/FAQPage
  - Google FAQ guidelines: https://developers.google.com/search/docs/appearance/structured-data/faqpage

  **Acceptance Criteria**:
  - [ ] FAQ sections on services + city pages
  - [ ] FAQPage schema implemented
  - [ ] 3-5 FAQs per page
  - [ ] Schema validates

  **QA Scenarios**:
  ```
  Scenario: Verify FAQ schema
    Tool: Bash (Rich Results Test)
    Steps:
      1. Test page with FAQPage schema
      2. Verify FAQ appears in test
    Expected Result: Valid FAQPage schema
    Evidence: .sisyphus/evidence/task-22-faq-schema.txt
  ```

  **Commit**: YES
  - Message: `feat(seo): add FAQ sections with schema markup`
  - Files: `src/components/seo/FAQSchema.tsx`, updated page files
  - Pre-commit: `bun run build`

---

- [ ] 23. Final SEO Audit + Schema Validation

  **What to do**:
  - Run comprehensive SEO audit:
    - Screaming Frog or similar crawler
    - Check all pages indexed
    - Verify schema on all pages
    - Check for broken links
    - Verify canonical tags
    - Check meta descriptions
  - Validate all structured data:
    - Organization schema
    - LocalBusiness schema
    - Service schema
    - FAQPage schema
  - Check for duplicate content
  - Verify internal linking structure
  - Generate audit report

  **Must NOT do**:
  - Don't ignore validation errors
  - Don't skip mobile checks

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - SEO auditing and validation

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 24)
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 25 (Request Indexing)
  - **Blocked By**: Tasks 1, 2, 3, 12, 13, 18-20, 22 (All SEO work complete)

  **References**:
  - Google Rich Results Test: https://search.google.com/test/rich-results
  - Schema validator: https://validator.schema.org/
  - Screaming Frog (if available)

  **Acceptance Criteria**:
  - [ ] All schemas validate
  - [ ] 0 broken links
  - [ ] All pages have unique meta
  - [ ] No duplicate content issues
  - [ ] Audit report generated

  **QA Scenarios**:
  ```
  Scenario: Run SEO audit
    Tool: Bash (curl + tools)
    Steps:
      1. Crawl all pages
      2. Check schemas
      3. Verify links
    Expected Result: Clean audit report
    Evidence: .sisyphus/evidence/task-23-seo-audit.txt
  ```

  **Commit**: NO (audit only)

---

- [ ] 24. Performance Optimization Pass

  **What to do**:
  - Run PageSpeed Insights on all key pages
  - Address any remaining issues:
    - Image optimization
    - Font loading
    - JavaScript bundles
    - Third-party scripts
  - Verify Core Web Vitals:
    - LCP < 2.5s
    - INP < 200ms
    - CLS < 0.1
  - Run Lighthouse CI if available
  - Document performance scores

  **Must NOT do**:
  - Don't ignore performance warnings
  - Don't add more heavy scripts

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Performance optimization

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 23)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: Tasks 5, 12, 13 (Components integrated)

  **References**:
  - PageSpeed Insights: https://pagespeed.web.dev/
  - Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci

  **Acceptance Criteria**:
  - [ ] All pages pass Core Web Vitals
  - [ ] Performance scores > 90
  - [ ] No critical issues
  - [ ] Mobile scores acceptable

  **QA Scenarios**:
  ```
  Scenario: Performance check
    Tool: Bash (Lighthouse)
    Steps:
      1. Run Lighthouse on homepage
      2. Check LCP, INP, CLS
      3. Verify scores
    Expected Result: All metrics green
    Evidence: .sisyphus/evidence/task-24-performance.json
  ```

  **Commit**: YES (if fixes needed)
  - Message: `perf: final optimization pass`
  - Files: Various optimization fixes
  - Pre-commit: `bun run build`

---

- [ ] 25. Request Google Indexing for All Pages

  **What to do**:
  - Submit all pages to Google Search Console:
    - Home
    - Services (+ city pages)
    - Pricing
    - Case Studies
    - Contact
    - Demos
  - Use URL Inspection tool for each
  - Request indexing
  - Monitor for indexing status
  - Check for coverage issues

  **Must NOT do**:
  - Don't submit noindex pages
  - Don't spam submissions

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - GSC management

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 26 (Monitoring)
  - **Blocked By**: Tasks 1, 2, 23 (GSC ready, sitemap ready, audit passed)

  **References**:
  - URL Inspection tool: https://support.google.com/webmasters/answer/9012289
  - Indexing guide: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

  **Acceptance Criteria**:
  - [ ] All key pages submitted
  - [ ] No indexing errors
  - [ ] Coverage report shows "Valid"
  - [ ] Sitemap submitted successfully

  **QA Scenarios**:
  ```
  Scenario: Verify indexing status
    Tool: Bash (GSC API if available, else manual check)
    Steps:
      1. Check GSC Coverage report
      2. Verify all pages valid
      3. Check for errors
    Expected Result: All pages indexed
    Evidence: .sisyphus/evidence/task-25-indexing.txt
  ```

  **Commit**: NO (GSC action only)

---

- [ ] 26. Set Up Monitoring (GSC, GA4, Core Web Vitals)

  **What to do**:
  - Configure Google Search Console monitoring:
    - Set up email alerts for issues
    - Schedule monthly coverage reviews
  - Set up GA4 monitoring:
    - Create custom dashboards
    - Set up conversion goals
    - Configure alerts for traffic drops
  - Set up Core Web Vitals monitoring:
    - CrUX dashboard (if available)
    - PageSpeed Insights monitoring
    - Lighthouse CI integration (optional)
  - Create monitoring checklist
  - Document escalation procedures

  **Must NOT do**:
  - Don't ignore alerts
  - Don't skip regular reviews

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Analytics and monitoring setup

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 16, 25 (GSC, GA4, Indexing ready)

  **References**:
  - GSC alerts: https://support.google.com/webmasters/answer/7686226
  - GA4 custom dashboards: https://support.google.com/analytics/answer/1068218

  **Acceptance Criteria**:
  - [ ] Email alerts configured
  - [ ] Dashboards created
  - [ ] Monitoring schedule documented
  - [ ] Team knows how to check metrics

  **QA Scenarios**:
  ```
  Scenario: Verify monitoring setup
    Tool: Bash (check configurations)
    Steps:
      1. Check GSC alert settings
      2. Verify GA4 dashboards
      3. Test email delivery
    Expected Result: All monitoring active
    Evidence: .sisyphus/evidence/task-26-monitoring.txt
  ```

  **Commit**: NO (configuration only)

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  **Verification checklist**:
  - [ ] All 6 interactive components present and functional
  - [ ] Schema markup on all pages
  - [ ] City pages created (Sofia, Plovdiv, Varna)
  - [ ] GBP optimized
  - [ ] Citations submitted
  - [ ] Core Web Vitals compliant
  - [ ] Lead capture forms working
  - [ ] GA4 tracking active
  
  **Output**: `Must Have [16/16] | Must NOT Have [6/6] | Tasks [26/26] | VERDICT: APPROVE/REJECT`
  **Evidence**: .sisyphus/evidence/f1-compliance-audit.txt

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `bun run build` + `bun test` + linter. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  **Verification checklist**:
  - [ ] Build passes with 0 errors
  - [ ] Tests pass (if any)
  - [ ] No TypeScript errors
  - [ ] No console.log statements
  - [ ] No unused imports
  - [ ] Components properly typed
  
  **Output**: `Build [PASS/FAIL] | Tests [N pass/N fail] | Lint [PASS/FAIL] | VERDICT`
  **Evidence**: .sisyphus/evidence/f2-code-quality.txt

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together). Test edge cases: empty state, invalid input, rapid actions.
  **Verification checklist**:
  - [ ] ROI Calculator: calculations accurate, mobile responsive
  - [ ] Service Configurator: pricing updates, CTA works
  - [ ] Case Study Gallery: filters work, detail views accessible
  - [ ] Process Visualization: animations trigger, accessible
  - [ ] Pricing Toggle: switches correctly, ranges accurate
  - [ ] Before/After: slider works on mobile and desktop
  - [ ] Lead forms: validation, submission, success state
  - [ ] All interactive components on /services
  - [ ] All interactive components on /case-studies
  
  **Output**: `Scenarios [26/26 pass] | Integration [10/10] | Edge Cases [10 tested] | VERDICT`
  **Evidence**: .sisyphus/evidence/f3-manual-qa/

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance. Detect cross-task contamination.
  **Verification checklist**:
  - [ ] Tasks 1-26 completed as specified
  - [ ] No unauthorized features added
  - [ ] "Must NOT do" constraints respected
  - [ ] No scope creep detected
  - [ ] Evidence files exist for all QA scenarios
  
  **Output**: `Tasks [26/26 compliant] | Contamination [CLEAN/N issues] | VERDICT`
  **Evidence**: .sisyphus/evidence/f4-scope-fidelity.txt

**FINAL DELIVERABLE**: Present consolidated review results to user. Get explicit "okay" before marking work complete. If any reviewer REJECTS, fix issues and re-run F1-F4.

---

## Commit Strategy

- **Wave 1 (SEO Infrastructure)**: Individual commits per task
  - `feat(seo): add dynamic sitemap and robots.txt`
  - `feat(seo): add LocalBusiness and Service schema markup`
  - `feat(seo): optimize metadata for all pages`
  - `perf: fix critical Core Web Vitals issues`

- **Wave 2 (Interactive Components)**: Individual commits per component
  - `feat(components): add ROI calculator for service savings`
  - `feat(components): add service configurator with pricing`
  - `feat(components): add filterable case study gallery`
  - `feat(components): add animated process visualization`
  - `feat(components): add pricing toggle with dynamic estimates`
  - `feat(components): add before/after comparison slider`

- **Wave 3 (Integration + Tracking)**: Integration commits
  - `feat(services): integrate all interactive components`
  - `feat(case-studies): integrate gallery and comparisons`
  - `feat(demos): add interactive demo scenarios`
  - `feat(forms): add lead capture to interactive components`
  - `feat(analytics): add GA4 conversion tracking`

- **Wave 4 (Local SEO + Content)**: Content commits
  - `feat(seo): add Sofia service area page`
  - `feat(seo): add Plovdiv service area page`
  - `feat(seo): add Varna service area page`
  - `feat(seo): add FAQ sections with schema markup`

- **Wave 5 (Optimization)**: Performance commits (if needed)
  - `perf: final optimization pass`

---

## Success Criteria

### Verification Commands

```bash
# Build verification
bun run build

# Type checking
bun run typecheck

# SEO validation (example with curl)
curl -s http://localhost:3000/sitemap.xml | head -20
curl -s http://localhost:3000/robots.txt

# Performance check (Lighthouse CI)
npx lighthouse http://localhost:3000 --output=json --chrome-flags="--headless"

# Schema validation
# Use https://validator.schema.org/ or Rich Results Test
```

### Final Checklist

- [ ] **All "Must Have" present**
  - [ ] 6 interactive components functional
  - [ ] Complete schema markup
  - [ ] GBP optimized
  - [ ] City pages created
  - [ ] Citations submitted
  - [ ] Core Web Vitals compliant
  - [ ] Lead capture working
  - [ ] GA4 tracking active

- [ ] **All "Must NOT Have" absent**
  - [ ] No CSR for SEO content
  - [ ] No duplicate/template content
  - [ ] No blocking JavaScript
  - [ ] No NAP inconsistencies
  - [ ] No performance issues

- [ ] **All tests pass**
  - [ ] Build succeeds
  - [ ] Type checking passes
  - [ ] QA scenarios all pass
  - [ ] Performance scores > 90

- [ ] **Google Search Console**
  - [ ] Property verified
  - [ ] Sitemap submitted
  - [ ] All pages indexed
  - [ ] 0 coverage errors

- [ ] **Google Business Profile**
  - [ ] Listing verified
  - [ ] All fields complete
  - [ ] Services listed
  - [ ] Photos uploaded (20+)
  - [ ] First post created

### Phase Breakdown (From Production to Launch)

**Production (Building)**: 50%
- Wave 1: SEO Infrastructure (Foundation)
- Wave 2: Interactive Components (Core Features)
- Wave 3: Integration + Polish (Bringing it together)

**Launch Preparation**: 30%
- Wave 4: Local SEO + Content (Location targeting)
- Wave 5: Optimization + Indexing (Performance + Google)

**Post-Launch**: 20%
- Monitoring setup
- Review responses
- Content updates
- Performance tracking

---

## Summary

This plan transforms Silex Digital from a static service website into an engaging, conversion-optimized platform with:

1. **6 Interactive Features** that hook visitors and demonstrate value
2. **Complete SEO Infrastructure** for Bulgarian market dominance
3. **Local SEO** targeting Sofia, Plovdiv, Varna
4. **Lead Generation** through strategic forms and tracking
5. **Performance Optimization** for Core Web Vitals compliance
6. **Google Integration** (GBP, Search Console, Analytics)

**Estimated Timeline**: 3-4 weeks (depending on parallel execution efficiency)

**Ready to execute?** Run `/start-work interactive-services-seo` to begin.

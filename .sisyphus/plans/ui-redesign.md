# UI Redesign Plan - Silex Digital

## TL;DR

> **Quick Summary**: Complete UI overhaul with Slate & Emerald color palette, unified design tokens, and dark/light mode support. Fix all component inconsistencies and modernize with glow effects.
>
> **Deliverables**:
>
> - New design token system (CSS variables for dark/light themes)
> - Updated all UI components (Button, Badge, Card, Input, etc.)
> - Theme toggle component with system detection
> - Modernized home page with new color scheme
> - Smooth theme transitions
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Design tokens → Theme system → Components → Pages

---

## Context

### Original Request

User wants to fix all UI problems and modernize with new, modern colors. Specifically requested:

- Slate & Emerald color scheme (dark slate with green accents)
- Full redesign (fix all inconsistencies)
- Both dark and light mode support

### Interview Summary

**Key Discussions**:

- Color scheme: Slate & Emerald (confirmed)
- Scope: Full redesign - everything (confirmed)
- Theme: Both dark and light (confirmed)

**Current State Analysis**:

- globals.css defines gold accent colors but components use blue
- Button.tsx uses blue-600 as primary
- Badge.tsx uses blue/emerald variants
- No light mode currently exists
- Mixed Tailwind colors vs CSS variables

### Metis Review

(Consultation timed out - proceeding with comprehensive plan based on analysis)

---

## Work Objectives

### Core Objective

Transform Silex Digital UI from inconsistent dark/gold theme to polished Slate & Emerald design with proper dark/light mode support.

### Concrete Deliverables

- Updated `src/styles/globals.css` with new design tokens
- Theme toggle in navbar
- Updated Button, Badge, Card, Input, Select, Textarea components
- Modernized home page sections
- Consistent design language across all pages

### Definition of Done

- [ ] Dark mode uses Slate backgrounds with Emerald accents
- [ ] Light mode uses white/slate backgrounds with Emerald accents
- [ ] Theme toggle works and persists preference
- [ ] All components use design tokens (no hardcoded colors)
- [ ] Smooth transitions between themes
- [ ] Build passes with no errors

### Must Have

- Unified color palette
- Dark/light mode toggle
- Consistent component styling
- Responsive design preserved

### Must NOT Have (Guardrails)

- Keep existing layout structure (don't redesign page layouts)
- Preserve Framer Motion animations
- Keep existing functionality
- Don't add new pages - just modernize current ones

---

## Verification Strategy

### Test Decision

- **Infrastructure exists**: NO (no automated tests in project)
- **Automated tests**: NO
- **Agent-Executed QA**: YES - Every task verified via manual Playwright/browser testing

### QA Policy

Every task verified by:

- Starting dev server
- Opening localhost in browser
- Visual verification of colors, spacing, interactions
- Theme toggle testing

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - Design Tokens + Theme System):
├── Task 1: Define new design tokens (globals.css)
├── Task 2: Create theme context + toggle component
├── Task 3: Update Button component to use new tokens
├── Task 4: Update Badge component to use new tokens
└── Task 5: Update Card component to use new tokens

Wave 2 (Form Components):
├── Task 6: Update Input component with new tokens
├── Task 7: Update Select component with new tokens
├── Task 8: Update Textarea component with new tokens
├── Task 9: Update Container component (if needed)
└── Task 10: Update Section component (if needed)

Wave 3 (Layout Components + Home Page):
├── Task 11: Update Navbar with theme toggle + new colors
├── Task 12: Update Footer with new colors
├── Task 13: Modernize Hero section
├── Task 14: Modernize Services section
├── Task 15: Modernize Testimonials section
├── Task 16: Modernize Pricing section
└── Task 17: Modernize CTA section

Wave 4 (Final Polish):
├── Task 18: Fix any remaining inconsistencies
├── Task 19: Add glow effects and polish
├── Task 20: Verify dark/light mode everywhere
└── Task 21: Final visual QA

Critical Path: Task 1 → Task 2 → Task 3-5 → Task 11-12 → Task 13-17
```

### Dependency Matrix

- **1-5**: — — 6-21, 1
- **6-10**: 1, 3-5 — 18, 11, 12
- **11-17**: 1, 2, 6-10 — 18-20
- **18-21**: 11-17 — —

---

## TODOs

- [x] 1. Define new design tokens in globals.css (Slate & Emerald)

  **What to do**:
  - Replace current color variables with Slate & Emerald palette
  - Add both dark-mode and light-mode color sets
  - Define emerald accent colors: emerald-400, emerald-500, emerald-600
  - Define slate backgrounds: slate-900, slate-800, slate-950 (dark) vs slate-50, slate-100, white (light)
  - Update utility classes for new colors
  - Add theme-aware glow effects

  **Must NOT do**:
  - Don't change font families
  - Don't add new CSS beyond colors/utilities

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: CSS and design token work requires visual precision
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-5)
  - **Blocks**: Tasks 2, 6-21
  - **Blocked By**: None (can start immediately)

  **References**:
  - `src/styles/globals.css:1-30` - Current design tokens structure to follow
  - Tailwind CSS v4 dark mode docs - Theme variable syntax

  **Acceptance Criteria**:
  - [ ] globals.css has dark and light mode color variables
  - [ ] Emerald accent colors defined and consistent
  - [ ] Existing utility classes updated or new ones added

  **QA Scenarios**:

  ```
  Scenario: Design tokens are properly defined
    Tool: Bash (read file)
    Preconditions: File exists at src/styles/globals.css
    Steps:
      1. Read the globals.css file
      2. Verify @theme block contains both dark and light colors
      3. Check emerald accent colors are defined
    Expected Result: Colors section has slate-*, emerald-*, dark/light variants
    Evidence: .sisyphus/evidence/task-1-tokens.{ext}

  Scenario: New tokens don't break existing layout
    Tool: interactive_bash (dev server)
    Preconditions: npm run dev started
    Steps:
      1. Start dev server
      2. Open localhost:3000
      3. Verify page loads without errors
    Expected Result: Page renders correctly with new or fallback colors
    Evidence: .sisyphus/evidence/task-1-layout.{ext}
  ```

  **Commit**: YES (groups with 2-5)
  - Message: `feat(design): add slate-emerald design tokens`
  - Files: `src/styles/globals.css`

---

- [x] 2. Create theme context and toggle component

  **What to do**:
  - Create theme context provider (dark/light state)
  - Create ThemeToggle component for navbar
  - Add system preference detection
  - Add localStorage persistence
  - Apply theme class to HTML element

  **Must NOT do**:
  - Don't change existing provider structure (I18nProvider)
  - Don't break existing i18n functionality

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: React context + component creation
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-5)
  - **Blocks**: Task 11
  - **Blocked By**: Task 1

  **References**:
  - `src/lib/i18n.tsx` - How providers are structured
  - `src/components/ui/LanguageToggle.tsx` - Similar toggle component to reference

  **Acceptance Criteria**:
  - [ ] Theme context exists and provides theme state
  - [ ] ThemeToggle component renders in navbar
  - [ ] Clicking toggle switches between dark/light
  - [ ] Theme preference persists on refresh

  **QA Scenarios**:

  ```
  Scenario: Theme toggle appears in navbar
    Tool: interactive_bash
    Preconditions: Dev server running
    Steps:
      1. Open localhost:3000
      2. Look for theme/sun/moon icon in navbar
    Expected Result: Toggle icon visible
    Evidence: .sisyphus/evidence/task-2-toggle.{ext}

  Scenario: Theme toggle switches themes
    Tool: interactive_bash
    Preconditions: Page loaded
    Steps:
      1. Click theme toggle
      2. Verify colors change (background, text)
      3. Click again to switch back
    Expected Result: Colors switch between dark and light
    Evidence: .sisyphus/evidence/task-2-switch.{ext}
  ```

  **Commit**: YES (groups with 1, 3-5)
  - Message: `feat(theme): add dark/light theme toggle`
  - Files: `src/components/ui/ThemeToggle.tsx`, `src/lib/theme.tsx`

---

- [x] 3. Update Button component with new design tokens

  **What to do**:
  - Replace hardcoded blue colors with emerald
  - Use CSS variables for all colors
  - Ensure button works in both dark and light modes
  - Keep existing variants (primary, secondary, ghost, etc.)
  - Verify hover/focus states in both themes

  **Must NOT do**:
  - Don't change button behavior or API
  - Don't remove existing variants

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Component styling updates
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-2, 4-5)
  - **Blocks**: Task 11, 13-17
  - **Blocked By**: Task 1

  **References**:
  - `src/components/ui/Button.tsx:44-56` - Current button variants to update

  **Acceptance Criteria**:
  - [ ] Primary button uses emerald accent
  - [ ] All variants use design tokens (CSS variables)
  - [ ] Button looks good in both dark and light mode

  **QA Scenarios**:

  ```
  Scenario: Button renders correctly in dark mode
    Tool: interactive_bash
    Preconditions: Dark mode active, dev server running
    Steps:
      1. Open localhost:3000 in dark mode
      2. Find primary and secondary buttons
      3. Check colors match emerald theme
    Expected Result: Buttons use emerald/green accent colors
    Evidence: .sisyphus/evidence/task-3-dark.{ext}

  Scenario: Button renders correctly in light mode
    Tool: interactive_bash
    Preconditions: Light mode active
    Steps:
      1. Toggle to light mode
      2. Check button colors are visible and correct
    Expected Result: Buttons have proper contrast in light mode
    Evidence: .sisyphus/evidence/task-3-light.{ext}
  ```

  **Commit**: YES (groups with 1-2, 4-5)
  - Message: `feat(components): update Button with emerald tokens`
  - Files: `src/components/ui/Button.tsx`

---

- [x] 4. Update Badge component with new design tokens

  **What to do**:
  - Replace blue colors with emerald/green palette
  - Use CSS variables for badge backgrounds
  - Ensure badges work in both themes
  - Add light mode variants if needed

  **Must NOT do**:
  - Don't change badge API or structure
  - Don't remove existing variant options

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Component styling updates
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5)
  - **Blocks**: Tasks 13-17
  - **Blocked By**: Task 1

  **References**:
  - `src/components/ui/Badge.tsx:16-24` - Current badge variants

  **Acceptance Criteria**:
  - [ ] Badge variants use emerald/green colors
  - [ ] Works in both dark and light mode

  **QA Scenarios**:

  ```
  Scenario: Badges visible in dark mode
    Tool: interactive_bash
    Preconditions: Dark mode
    Steps:
      1. Open home page
      2. Find badges (e.g., "Услуги", "Казуси")
      3. Verify emerald/green color
    Evidence: .sisyphus/evidence/task-4-dark.{ext}

  Scenario: Badges visible in light mode
    Tool: interactive_bash
    Preconditions: Light mode
    Steps:
      1. Toggle to light mode
      2. Check badges have proper contrast
    Evidence: .sisyphus/evidence/task-4-light.{ext}
  ```

  **Commit**: YES (groups with 1-3, 5)
  - Message: `feat(components): update Badge with emerald tokens`
  - Files: `src/components/ui/Badge.tsx`

---

- [x] 5. Update Card component with new design tokens

  **What to do**:
  - Update card background colors for dark/light modes
  - Use CSS variables for borders and shadows
  - Ensure glass-card variant works in both themes
  - Test hover states in both modes

  **Must NOT do**:
  - Don't change Card API
  - Don't remove sub-components (CardHeader, CardTitle, etc.)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Component styling
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4)
  - **Blocks**: Tasks 13-17
  - **Blocked By**: Task 1

  **References**:
  - `src/components/ui/Card.tsx:15-26` - Current card styles

  **Acceptance Criteria**:
  - [ ] Cards use appropriate backgrounds for dark mode
  - [ ] Cards use appropriate backgrounds for light mode
  - [ ] Hover states work in both themes

  **QA Scenarios**:

  ```
  Scenario: Cards in dark mode
    Tool: interactive_bash
    Preconditions: Dark mode
    Steps:
      1. Open home page services section
      2. Hover over service cards
      3. Verify hover effects work
    Evidence: .sisyphus/evidence/task-5-dark.{ext}

  Scenario: Cards in light mode
    Tool: interactive_bash
    Preconditions: Light mode
    Steps:
      1. Toggle to light mode
      2. Check cards have proper styling
    Evidence: .sisyphus/evidence/task-5-light.{ext}
  ```

  **Commit**: YES (groups with 1-4)
  - Message: `feat(components): update Card with emerald tokens`
  - Files: `src/components/ui/Card.tsx`, `src/styles/globals.css`

---

- [x] 6. Update Input component with new design tokens

  **What to do**:
  - Update Input to use design tokens
  - Ensure proper contrast in both themes
  - Update focus states with emerald glow
  - Test in forms on site

  **Must NOT do**:
  - Don't change Input API

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-10)
  - **Blocks**: Any form pages
  - **Blocked By**: Task 1

  **References**:
  - `src/components/ui/Input.tsx` - Current input component

  **Acceptance Criteria**:
  - [ ] Input uses design tokens
  - [ ] Focus state uses emerald accent

  **QA Scenarios**:

  ```
  Scenario: Input styling in both themes
    Tool: interactive_bash
    Preconditions: Contact page with form
    Steps:
      1. Open contact page
      2. Check input fields in dark mode
      3. Toggle to light mode
      4. Check inputs have proper styling
    Expected Result: Inputs visible and styled correctly in both modes
    Evidence: .sisyphus/evidence/task-6.{ext}
  ```

  **Commit**: YES (groups with 7-10)
  - Message: `feat(components): update Input with design tokens`
  - Files: `src/components/ui/Input.tsx`

---

- [x] 7. Update Select component with new design tokens

  **What to do**:
  - Update Select to use design tokens
  - Ensure dropdown works in both themes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8-10)
  - **Blocked By**: Task 1

  **Acceptance Criteria**:
  - [ ] Select uses design tokens

  **Commit**: YES (groups with 6, 8-10)
  - Message: `feat(components): update Select with design tokens`
  - Files: `src/components/ui/Select.tsx`

---

- [x] 8. Update Textarea component with new design tokens

  **What to do**:
  - Update Textarea to use design tokens
  - Ensure proper styling in both themes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6-7, 9-10)
  - **Blocked By**: Task 1

  **Acceptance Criteria**:
  - [ ] Textarea uses design tokens

  **Commit**: YES (groups with 6-8, 10)
  - Message: `feat(components): update Textarea with design tokens`
  - Files: `src/components/ui/Textarea.tsx`

---

- [x] 9. Update Container component (if needed)

  **What to do**:
  - Check if Container needs token updates
  - Update if necessary

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6-8, 10)
  - **Blocked By**: Task 1

  **Acceptance Criteria**:
  - [ ] Container works in both themes

  **Commit**: YES (groups with 6-9)
  - Message: `feat(components): update Container if needed`
  - Files: `src/components/ui/Container.tsx` (if changed)

---

- [x] 10. Update Section component (if needed)

  **What to do**:
  - Check if Section needs token updates
  - Update if necessary

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6-9)
  - **Blocked By**: Task 1

  **Commit**: YES (groups with 6-9)
  - Message: `feat(components): update Section if needed`
  - Files: `src/components/ui/Section.tsx` (if changed)

---

- [x] 11. Update Navbar with theme toggle and new colors

  **What to do**:
  - Add ThemeToggle component to navbar
  - Update navbar colors for dark/light modes
  - Ensure mobile menu works in both themes
  - Keep existing navigation structure

  **Must NOT do**:
  - Don't change navigation links
  - Don't break mobile menu

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - Reason: Navigation component updates
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 12)
  - **Blocks**: Final verification
  - **Blocked By**: Tasks 1-2

  **References**:
  - `src/components/layout/Navbar.tsx` - Current navbar
  - Task 2 - ThemeToggle component

  **Acceptance Criteria**:
  - [ ] Theme toggle visible in navbar
  - [ ] Navbar styled correctly in dark mode
  - [ ] Navbar styled correctly in light mode
  - [ ] Mobile menu works in both themes

  **QA Scenarios**:

  ```
  Scenario: Navbar in dark mode
    Tool: interactive_bash
    Preconditions: Dark mode
    Steps:
      1. Open localhost:3000
      2. Check navbar background and text colors
      3. Verify logo and links visible
    Expected Result: Navbar uses slate/emerald theme
    Evidence: .sisyphus/evidence/task-11-dark.{ext}

  Scenario: Navbar in light mode
    Tool: interactive_bash
    Preconditions: Light mode
    Steps:
      1. Toggle to light mode
      2. Check navbar is readable
    Expected Result: Navbar has proper contrast
    Evidence: .sisyphus/evidence/task-11-light.{ext}
  ```

  **Commit**: YES (groups with 12)
  - Message: `feat(layout): update Navbar with theme toggle`
  - Files: `src/components/layout/Navbar.tsx`

---

- [x] 12. Update Footer with new colors

  **What to do**:
  - Update footer background for dark/light modes
  - Ensure links and text are readable in both themes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 11)
  - **Blocked By**: Tasks 1-2

  **References**:
  - `src/components/layout/Footer.tsx`

  **Acceptance Criteria**:
  - [ ] Footer styled correctly in dark mode
  - [ ] Footer styled correctly in light mode

  **Commit**: YES (groups with 11)
  - Message: `feat(layout): update Footer with new theme`
  - Files: `src/components/layout/Footer.tsx`

---

- [x] 13. Modernize Hero section with new colors

  **What to do**:
  - Update hero section colors (background, text, accents)
  - Ensure gradient/glow effects work in both themes
  - Keep existing layout and copy

  **Must NOT do**:
  - Don't change hero copy or layout structure

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14-17)
  - **Blocked By**: Tasks 1-5, 11-12

  **References**:
  - `src/app/page.tsx:130-179` - Hero section

  **Acceptance Criteria**:
  - [ ] Hero uses new emerald/slate colors in dark mode
  - [ ] Hero uses new colors in light mode
  - [ ] Glow/gradient effects visible

  **QA Scenarios**:

  ```
  Scenario: Hero section theming
    Tool: interactive_bash
    Steps:
      1. Open home page in dark mode
      2. Check hero headline, buttons, stats
      3. Toggle to light mode
      4. Verify hero looks good
    Expected Result: Hero styled appropriately in both modes
    Evidence: .sisyphus/evidence/task-13.{ext}
  ```

  **Commit**: YES (groups with 14-17)
  - Message: `feat(page): modernize Hero section`
  - Files: `src/app/page.tsx`

---

- [ ] 14. Modernize Services section

  **What to do**:
  - Update services grid with new colors
  - Ensure cards have proper theming
  - Update icons if needed

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 15-17)
  - **Blocked By**: Tasks 1-5, 11-12

  **References**:
  - `src/app/page.tsx:240-300` - Services section

  **Acceptance Criteria**:
  - [ ] Services section updated with new colors

  **Commit**: YES (groups with 13, 15-17)
  - Message: `feat(page): modernize Services section`

---

- [ ] 15. Modernize Testimonials section

  **What to do**:
  - Update testimonial cards with new colors
  - Ensure quotes are readable in both themes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13-14, 16-17)
  - **Blocked By**: Tasks 1-5, 11-12

  **References**:
  - `src/app/page.tsx:347-388` - Testimonials section

  **Commit**: YES (groups with 13-14, 16-17)
  - Message: `feat(page): modernize Testimonials section`

---

- [ ] 16. Modernize Pricing section

  **What to do**:
  - Update pricing cards with new colors
  - Ensure pricing tiers are readable
  - Verify "Popular" badge stands out

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13-15, 17)
  - **Blocked By**: Tasks 1-5, 11-12

  **References**:
  - `src/app/page.tsx:390-496` - Pricing section

  **Commit**: YES (groups with 13-15, 17)
  - Message: `feat(page): modernize Pricing section`

---

- [ ] 17. Modernize CTA section

  **What to do**:
  - Update call-to-action section with new colors
  - Ensure buttons are prominent in both themes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13-16)
  - **Blocked By**: Tasks 1-5, 11-12

  **References**:
  - `src/app/page.tsx:498-529` - CTA section

  **Commit**: YES (groups with 13-16)
  - Message: `feat(page): modernize CTA section`

---

- [x] 18. Fix any remaining inconsistencies

  **What to do**:
  - Check for any components still using old colors
  - Fix inline styles that bypass design tokens
  - Ensure all pages use consistent colors

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (fix-up task)
  - **Blocked By**: Tasks 13-17

  **Acceptance Criteria**:
  - [ ] No hardcoded colors remaining
  - [ ] Consistent styling across all pages

---

- [ ] 19. Add glow effects and polish

  **What to do**:
  - Add emerald glow effects to interactive elements
  - Add subtle animations where appropriate
  - Polish hover states

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on 18)
  - **Blocked By**: Task 18

  **Acceptance Criteria**:
  - [ ] Glow effects visible on buttons/cards
  - [ ] Smooth hover transitions

---

- [ ] 20. Verify dark/light mode everywhere

  **What to do**:
  - Test all sections in both themes
  - Verify no unstyled elements
  - Check all interactive elements

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocked By**: Task 19

  **Acceptance Criteria**:
  - [ ] All pages work in dark mode
  - [ ] All pages work in light mode

---

- [ ] 21. Final visual QA

  **What to do**:
  - Full visual check of entire site
  - Verify design consistency
  - Check responsiveness

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocked By**: Task 20

  **Acceptance Criteria**:
  - [ ] Site looks polished in dark mode
  - [ ] Site looks polished in light mode
  - [ ] All sections consistent

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE.

- [ ] F1. **Plan Compliance Audit** — `oracle`
      Verify all tasks completed per plan.
      Output: `Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
      Run `npm run check` (lint + typecheck)
      Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | VERDICT`

- [ ] F3. **Visual QA** — `unspecified-high`
      Open site in browser, test both themes
      Output: `Dark Mode [PASS/FAIL] | Light Mode [PASS/FAIL] | VERDICT`

- [ ] F4. **Theme Toggle Test** — `deep`
      Verify toggle persists, works on all pages
      Output: `Toggle [WORKING/NOT] | Persistence [WORKING/NOT] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(design): add slate-emerald design tokens + theme system`
- **Wave 2**: `feat(components): update form components with design tokens`
- **Wave 3**: `feat(layout): update layout + pages with new theme`
- **Wave 4**: `fix(ui): polish and finalize theme consistency`

---

## Success Criteria

### Verification Commands

```bash
npm run check    # Lint + typecheck passes
npm run build    # Production build succeeds
```

### Final Checklist

- [ ] Dark mode uses Slate & Emerald colors
- [ ] Light mode works with proper contrast
- [ ] Theme toggle functional
- [ ] All components use design tokens
- [ ] No build errors
- [ ] No lint errors

---
target: whole site (homepage, pricing, services) — AI slop / design quality audit
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-07-28T16-12-38Z
slug: src-app-components-homecontent-tsx
---
Method: dual-agent (A: a0f17010df21f8808 · B: ae010539d5c3d07cc)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Live inbox ticker, animated stats, ROI calculator update instantly. Strong. |
| 2 | Match System / Real World | 3 | Authentic BG small-business idiom, undercut by a real currency clash (EUR vs BGN vs USD across files) |
| 3 | User Control and Freedom | 3 | Billing toggle, add-ons, "not included" accordions, locale switch all present; contact-form recovery untested |
| 4 | Consistency and Standards | 1 | 4 brand color tokens (`--violet/--lime/--coral/--amber`) are all aliased to one literal accent — components built for 4 colors render as 1 |
| 5 | Error Prevention | 3 | Sliders are min/max-bounded; no destructive actions on these pages |
| 6 | Recognition Rather Than Recall | 3 | Persistent nav, shallow IA; two comparison-table rows have icon-only cells with no accessible text alternative (confirmed via DOM) |
| 7 | Flexibility and Efficiency | n/a | Not applicable to a marketing/landing site |
| 8 | Aesthetic and Minimalist Design | 2 | Homepage stacks 12+ heavy sections before the footer; individually clean, cumulatively dense |
| 9 | Error Recovery | 2 | No visible error/validation states found for interactive widgets or forms in reviewed source |
| 10 | Help and Documentation | n/a | Marketing site; pricing FAQ partially substitutes |
| **Total** | | **21/32** | **Acceptable (66%)** |

Heuristics 7 and 10 scored n/a (not applicable to a Persuade-mode marketing site) and excluded from the denominator.

## Design Specificity Verdict

**LLM assessment (Assessment A):** This is not a copy-pasted shadcn template — there is real authorial intent: a wine-burgundy (#6A2E3A) brand color, a custom pinstripe "atelier" texture, a `card-2026` gradient-hairline treatment, JetBrains Mono for numerals, and Bulgaria-specific copy (Viber, "лв", local testimonial names). A competitor could not lift the copy or the ROI-calculator's Bulgarian-market assumptions unchanged.

But the execution of the color system undermines that intent. `src/styles/globals.css` collapses four semantically-named tokens into one value (`--violet`, `--coral`, `--lime`, `--amber` all `= var(--accent)`), while the component code throughout `HomeContent.tsx`, `pricing/page.tsx`, and `services/page.tsx` still branches as if they were four distinct hues (a `serviceColorMap` mapping 4 services to 4 "different" colors, pricing comparison-table checkmarks meant to differentiate Grow/Pro columns, three "differently colored" service icons, a two-tone CTA gradient). Every one of these renders as flat, identical burgundy. The specificity that exists in copy and texture doesn't reach the component layer, which still architecturally believes it has a multi-color system it no longer has — this reads as an unfinished rebrand, not a deliberate restrained palette, and it is the single biggest reason the site can feel generic/flat despite genuinely distinctive copy and texture work underneath.

**Deterministic scan (Assessment B):** `detect.mjs --json` against the four target surfaces (`HomeContent.tsx`, `pricing/page.tsx`, `services/page.tsx`, `src/components/ui/*`) exited 0 with an empty findings array — the mechanical detector flagged nothing. This is a notable disagreement: the automated "AI slop" pattern detector does not catch the color-token collapse (P0 below) because it's a cross-file semantic bug (tokens vs. usage), not a single-file visual-template pattern the detector scans for. The detector is not wrong to return clean; it simply operates at a different layer than the biggest issue found here. Where the detector *does* add value is purely mechanical evidence the design review didn't check: one broken image request (`GET /img/grid.svg → 404`), a heading-order skip on the homepage (H1 → H3, no H2), and two comparison-table rows ("AI помощник", "Всички канали") whose icon-only cells have no accessible text alternative for Start/Grow/Pro — confirmed identically at desktop and mobile widths. No horizontal-overflow was found on any page at 375px, and no console errors/warnings or duplicate IDs were found.

**Visual overlays:** Browser screenshot compositing is unavailable in this environment ("Browser pane is not displayed, so the page is not compositing frames") — confirmed independently by both assessments on first attempt. Live DOM mutation/injection itself *did* work (title + script injection succeeded), so the detector's browser-overlay script could run if a compositing-capable browser were used; no user-visible overlay exists in this run. All visual evidence here comes from the accessibility tree, extracted page text, and direct source reading, not pixel inspection — treat layout/spacing/color claims as code-derived, not eyeballed.

## Overall Impression

The site has more authored identity than a typical "AI slop" template — a real palette, a real texture, real Bulgarian-market copy and interactive proof points (the live-inbox hero, the ROI calculator) — but a rebrand was left half-finished at the token layer, so four "distinct" brand colors collapsed into one silently. That single bug is doing more damage to the site's visual specificity than any generic-template pattern would. The second-biggest problem is pure density: the homepage stacks roughly a dozen heavy, differently-shaped sections before the footer, and the pricing cards each carry up to four collapsible regions, which pushes cognitive load higher than the content actually requires.

## What's Working

1. **The live-inbox hero widget** simulates a real multi-channel inbox (WhatsApp/Email/SMS/Form) answering a message in real time, tied to a stat block (0.8s avg response, 94% conversion) — it *proves* the product's core promise instead of just claiming it. Rare and effective.
2. **Progressive disclosure on pricing cards is deliberate, not accidental** — code comments explicitly justify collapsing add-ons and "not included" by default so each card leads with one clear price, not three panels competing for attention.
3. **The two-block price presentation** (one-time "Изработка" vs. recurring "Поддръжка") plus an optional "Financial audit" breakdown is unusually transparent for this category and matches the site's own "brutally transparent" claim — a genuinely differentiated pattern for small Bulgarian business buyers unfamiliar with SaaS-style pricing.

## Priority Issues

**[P0] Brand color system is collapsed to a single hue, silently breaking every component built to use four colors**
- *Why it matters:* `globals.css` aliases `--violet`/`--coral`/`--lime`/`--amber` all to `--accent`, but `serviceColorMap`, the pricing comparison table's per-column checkmarks, the services page's three icon colors, and the final-CTA gradient all still branch as if these were 4 distinct hues. The color-coded hierarchy the code visibly intends is invisible in the shipped UI, and any accessibility redundancy (color + position + text) that depended on it is gone too.
- *Fix:* Pick one: either commit to a single-accent system and delete/simplify the `serviceColorMap`-style branching, or restore genuinely distinct hues for the four semantic slots so the palette becomes real again.
- *Suggested command:* `/impeccable colorize` (or a manual token pass) followed by `/impeccable polish`

**[P0] Leftover hardcoded purple shadow/hover on the most-clicked CTA contradicts the current brand color**
- *Why it matters:* `pricing/page.tsx`'s "Grow" (Popular) plan CTA uses `shadow-[0_10px_20px_rgba(107,45,219,0.3)]` and `hover:bg-[#5a22bd]` — literal purple hex values from what looks like a pre-rebrand direction, not `var(--accent)` (wine burgundy). This is the single most prominent, most-clicked button on the pricing page.
- *Fix:* Replace with `var(--accent)`/`var(--accent-hover)` and a `color-mix()`-based shadow consistent with `.btn-primary` elsewhere in `globals.css`.
- *Suggested command:* `/impeccable polish`

**[P1] Currency inconsistency: EUR site-wide, BGN inside the emotionally-critical Before/After section, USD in one demo**
- *Why it matters:* Every priced item on the site is EUR, but the homepage's loss-aversion "Before/After" panel shows amounts in "лв" (BGN), and one demo component shows a price in USD in the English locale — three currencies across live-rendered strings. This sits directly inside the section designed to create urgency about lost revenue, exactly where a "wait, is this euros or leva?" moment is most costly.
- *Fix:* Standardize on EUR everywhere, or make the multi-currency intentional and labeled (e.g., "≈690 лв (~350 €) / day").
- *Suggested command:* `/impeccable clarify`

**[P1] Two pricing-comparison-table rows have icon-only cells with no accessible text alternative**
- *Why it matters:* Confirmed via DOM/accessibility-tree inspection: the "AI помощник" and "Всички канали" rows render empty text for Start/Grow/Pro at both desktop and mobile widths — a screen-reader user gets no signal of included/excluded for exactly the two features most likely to differentiate tiers.
- *Fix:* Add `aria-label` or visually-hidden text ("Included"/"Not included") alongside the check/x icons in the comparison table.
- *Suggested command:* `/impeccable audit` (accessibility pass) then `/impeccable harden`

**[P2] Homepage cognitive load is high: 12+ structurally heavy sections stacked before the footer, each a different shape**
- *Why it matters:* Hero (with sub-widget) → live ticker → stat strip → "Silex Pact" → 2 pillar cards → before/after → how-it-works → 4-card services grid → live demo → ROI calculator → testimonial carousel → 3 pricing cards → final CTA. Individually well-built, but a distracted mobile visitor has to learn several distinct interaction modes (drag sliders, tap-to-cycle steps, horizontal swipe) in one long scroll before ever reaching pricing.
- *Fix:* Audit for merge/cut candidates (the "Silex Pact" callout and the two pillar cards cover similar ground to the 4-card services grid just below it); consider collapsing overlapping sections or adding a sticky in-page nav so visitors can jump straight to pricing/demos.
- *Suggested command:* `/impeccable distill`

**[P2] Pricing page hand-rolls its own hero markup instead of reusing the shared `DarkHero` component**
- *Why it matters:* `DarkHero.tsx` is documented as the shared cinematic dark hero used across sub-pages and is used by `services/page.tsx`, but `pricing/page.tsx` duplicates near-identical markup with its own variant (rounded corners, animated underline SVG) that the shared component doesn't support — the two will drift further with every future hero tweak.
- *Fix:* Extend `DarkHero` to support the underline-SVG variant, or explicitly document why pricing's hero is intentionally divergent.
- *Suggested command:* `/impeccable extract`

**[P3] Dead "Neo-Brutalist" CSS shipping to production, referenced nowhere**
- *Why it matters:* `globals.css` defines `.shadow-neo`/`.shadow-neo-hover`/`.shadow-neo-active` under a "Neo-Brutalist" comment block, unused anywhere else in the codebase — evidence of an abandoned prior design direction left uncleaned, which misleads anyone reading the CSS cold about the current design language.
- *Fix:* Delete the dead utility classes and stale comment headers.
- *Suggested command:* `/impeccable distill`

**[P3] One broken image request and a homepage heading-level skip**
- *Why it matters:* `GET /img/grid.svg` 404s on homepage load (minor but a real broken reference); homepage heading order goes H1 → H3, skipping H2, which affects screen-reader users navigating by heading level.
- *Fix:* Remove or fix the `grid.svg` reference; insert the missing H2 level or restructure heading hierarchy.
- *Suggested command:* `/impeccable audit`

## Persona Red Flags

**Impatient power user (BG small-business owner comparing 3 vendors in one sitting):** Hits the pricing page's combinatorial complexity — 3 cards × billing toggle × add-ons accordion × "not included" accordion × financial-audit reveal. Getting a fast side-by-side price comparison requires expanding up to 6 accordions across 3 cards before seeing the full picture.

**Distracted mobile user:** The homepage's single long scroll mixes drag sliders (ROI calculator), tap-to-cycle steps (how-it-works), and horizontal swipe (testimonial carousel) — three distinct interaction modes to learn in sequence before reaching pricing, on a device where interruption is the norm.

**Accessibility-dependent user:** Loses two independent signals at once — the color-coding across services/comparison-table/CTA gradient (P0, collapsed to one hue) and the two comparison-table rows with no accessible text alternative for their icon-only cells (P1) — both landing in the same "tell tiers/features apart" job-to-be-done.

## Minor Observations

- `Sparkles` icon appears 17 times across 7 files (free-trial badge, autopilot service icon, etc.) — not egregious yet, but edges toward generic "sparkle = premium/AI" icon overuse.
- A ~35-line commented-out (dead) marquee/social-proof section sits inline in `HomeContent.tsx`, which is already 1092 lines (over the project's own 500/800-line guidelines) — delete rather than leave commented.
- `rounded-2xl`/`rounded-[24px]`/`rounded-[28px]` appear 35 times across 5 page files — nearly every card/image/section shares one large-radius shape language; more radius variation (sharper on data-dense elements like the comparison table, soft on marketing cards) could reinforce hierarchy instead of flattening it.
- `serviceColorMap` routes through four layers of indirection (English name → brand token → CSS variable → hex) for a value that, post-P0, is always the same color — over-engineered for what it currently produces.
- Dev-mode bundle sizes (`main-app.js` ~1.76MB) are large but this is unminified dev output, not representative of production — flagged only as a caveat.

## Questions to Consider

1. What if the site committed to true polychromy instead of a single-accent-with-four-fake-names system — what would it look like to give the "Web Presence" and "AI Autopilot" pillars two genuinely different hues instead of maintaining scaffolding for an abandoned 4-color system?
2. What if the pricing page led with the plain comparison table for fast-scanning visitors, with the heavily-decorated cards as a secondary "tell me more" path?
3. What if the homepage's loss-aversion Before/After section used the same currency as the pricing section two scrolls later — would the urgency land harder if the loss and the offer were visibly the same money?

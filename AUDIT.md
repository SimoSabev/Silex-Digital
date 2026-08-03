# SilexBrand — Design & Technical Audit

**Scope:** Home, Services, Pricing (+ Pricing/SEO), Demos (list + detail), Contact, root layout/shared chrome.
**Method:** direct code read (`Read`/`Grep`), live dev-server render (`localhost:54507`) via browser accessibility tree + computed-style scripts, a real `next build` production bundle report, and `git log`/`git diff` for provenance. No Lighthouse/PageSpeed CLI or Chrome DevTools protocol was available in this environment — see the **Performance** section for what that limitation means for the numbers below, and Phase 4 for how it's handled.
**Context:** the working tree already has an uncommitted redesign pass in progress (34 files, prior session) and a prior research note (`SilexBrand-redesign-plan.md`) that already answered the "how much 3D/motion" question with real citations. This audit builds on that rather than re-deriving it.

Severity: **Critical** (breaks something users/Google see) · **High** (real cost, not breaking) · **Medium** · **Low**.

---

## 1. Technical SEO

**C1 — `hreflang` alternate points to a URL that doesn't exist.**
`src/app/layout.tsx:63-69` declares `alternates.languages: {"bg-BG": "/", "en-US": "/en"}`. There is no `/en` route anywhere in `src/app` (confirmed via `Glob src/app/en/**` → no results, and via the full route listing). Locale switching is done client-side by `LanguageToggle` mutating an i18n context, not by routing. Google will either ignore the tag or log a "no return tag" / broken-alternate error in Search Console — and today it has nothing to index at `/en` but a 404 page. This is pure downside with zero current benefit, since no English URL is actually crawlable.
*Fix path:* either implement real `/en` (and `/[locale]/...`) routes, or remove the `en-US` alternate entirely until they exist.

**C2 — NAP (name/address/phone) mismatch between structured-data source and the live site.**
`src/config/seo.ts:51-60` (used by `src/lib/structured-data.ts`'s `generateLocalBusinessSchema`/`generateOrganizationSchema`) hardcodes:
- Address: `ул. Витоша 100, София, 1000` (Sofia)
- Geo: `42.6977, 23.3219` (Sofia's coordinates)
- Phone: `+359 888 123 456`

The live Contact page (`src/app/contact/ContactContent.tsx:602-608`) and Footer both display **Варна, България / +359 88 503 1865**. `git log` shows `seo.ts` predates the `d7adee2` "Silex Digital → SilexBrand" rebrand and was never updated when the business's real city (Varna) and phone were wired into Contact/Footer. If this schema is ever rendered (see C3), it would tell Google the business is in Sofia while every other page and the sitemap's `pricing/seo` page explicitly say *"Фокус: локално търсене във Варна и региона"* — actively working against the site's own Varna/Sofia local-SEO targeting.

**C3 — A fully-built JSON-LD system exists and is never rendered.**
`src/lib/structured-data.ts` (349 lines) implements `generateOrganizationSchema`, `generateLocalBusinessSchema`, `generateWebsiteSchema`, `generateArticleSchema`, `generateBreadcrumbSchema`, `generateServiceSchema`, `generateOfferSchema`, `generateFAQSchema`. `Grep` for every one of those names plus the pre-built constant exports in `src/config/seo.ts` (`organizationSchema`, `localBusinessSchema`, `websiteSchema`, `softwareApplicationSchema`) across `src/app` returns **zero matches**. No `<script type="application/ld+json">` exists anywhere in the rendered app (confirmed by reading `layout.tsx` in full — no schema injection). Today SilexBrand is not eligible for any rich result (LocalBusiness knowledge panel, FAQ rich snippet, breadcrumb trail) despite having already written the code for it — and per C2, wiring it in as-is would ship wrong data.

**C4 — Google Search Console verification token is a literal placeholder.**
`src/app/layout.tsx:107-109`: `verification: { google: "your-google-site-verification-token" }`. The site cannot be verified in GSC in this state, meaning no indexing/coverage/CWV field data is being collected for silexbrand.com at all — this also explains why Phase 4 can't reference real GSC/CrUX data (see Performance section limitation).

**H1 — 5 of 8 primary routes have no page-specific metadata.**
`Grep` for `generateMetadata|export const metadata` under `src/app` returns matches only in `layout.tsx` (root defaults), `app/page.tsx` (home), `demos/[id]/page.tsx`, and `not-found.tsx`. **Services, Pricing, Pricing/SEO, Demos (list), and Contact have no metadata export.** Confirmed live, not just statically: navigating the dev server to `/services` renders the browser tab title as `"SilexBrand | Сайт, Google и Viber за местния бизнес"` — the root layout's generic homepage-oriented default — not anything services-specific. Every one of these pages ranks (or fails to rank) under the same title/description as the homepage, which is the single most common "quick win" mistake in technical SEO: distinct pages need distinct titles to compete against each other and against competitors in the SERP.

Worth noting: `src/config/seo.ts` already contains a full `pageSeo` object with hand-written BG titles/descriptions/keywords for `pricing`, `contact`, `services`, `demos`, `blog`, `industries`, `portfolio` — this content exists and is unused for the same reason as C3. Wiring `pageSeo` into each route's `generateMetadata` is close to a copy-paste fix (see Phase 4), *after* correcting for the Grow-tier pricing figures inside `pageSeo.pricing.description` which still says "Пакети от 99 €/месец" — the real Grow monthly price is €248, so this stale copy would need a rewrite, not a direct wire-in.

**H2 — `robots.ts` / `sitemap.ts` are correctly implemented, but the sitemap is incomplete.**
Both are real Next.js dynamic route handlers (not static stub files) — a positive, not a finding on their own. `robots.ts` correctly disallows `/admin/`, `/api/`, `/dashboard/`. `sitemap.ts` lists 8 URLs with sane priorities, but omits `/pricing/seo` (a real, linked, indexable page) entirely.

**M1 — Duplicated/inconsistent SEO source of truth.**
`src/config/seo.ts`'s `siteConfig` (used by nothing yet) and `src/app/layout.tsx`'s inline `metadata` (used, live) independently define overlapping title/description/keyword strings that have already drifted from each other (e.g. `siteConfig.title` omits "AI чатбот и CRM" that `layout.tsx`'s title includes). Whichever becomes the real source in Phase 4 needs to be singular.

---

## 2. Visual Design System

**Positive, verified:** the palette is a genuine, intentional brand system, not Tailwind defaults — `src/styles/globals.css:1-39` defines a single fixed "deep wine burgundy" palette (`--color-accent: #6A2E3A`) with an explicit comment: *"Removed class-based theme switching — fixed brand palette below."* This is a deliberate anti-generic choice (see `BRAND-PROFILE.md` for the anti-template checklist), not an oversight.

**H3 — Real, measured contrast failures, concentrated in specific components, not systemic.**
An automated contrast scan of the rendered homepage (937 real text leaf nodes, WCAG AA thresholds: 4.5:1 normal text / 3:1 large-or-bold text, using each node's actually-inherited computed color and nearest opaque ancestor background) found **34 failures (~3.6%)**, clustered in three places:
1. **Actual white-on-near-white button text** — the "Съобщение" channel-toggle buttons inside `ProblemVisualization`/`SolutionVisualization` (the Before/After section) render `color: rgb(255,255,255)` on `background: rgb(252,249,246)` — **contrast ratio 1.05:1**, i.e. the label is invisible except for anti-aliasing fuzz.
2. **Hero live-widget metric chrome** — small labels ("0.8s", "94%", "↑ 40% тази седмица") inside the hero's simulated-inbox mockup render the wine-accent color `rgb(106,46,58)` directly on the dark hero band `rgb(26,24,23)` — **1.74:1**, meant to read as a subtle accent-on-dark but too close in luminance to be legible at small sizes.
3. **Success-green and muted-gray text used below AA threshold repeatedly** — `--color-success: #7EA87A` (`rgb(126,168,122)`) on the off-white `--bg-page` is **2.58:1** (used for the "След SilexBrand" heading, and several success buttons/badges); the muted caption gray `rgb(154,154,154)` on the same background is **2.68:1** (used for captions, the process-step counters "2/6"–"6/6", and secondary copy across multiple sections) — both are recurring token choices, not one-off typos, so they'll reappear anywhere those tokens are reused.

*(Note on method: an earlier, cruder pass that queried wrapper elements instead of true text leaves flagged the hero `<h1>` itself as a false-positive "invisible text" bug — verified via direct computed-style inspection that the actual rendered `<span>` children are `#F5F0EB` on `#1A1817`, i.e. fine. Flagging this so the correction is on record, not silently dropped.)*

**M2 — Hero H1 copy undersells the strongest hook on the page.**
Live-rendered H1: *"Подобрете своя бранд. Лесно, бързо и ефективно."* ("Improve your brand. Easily, quickly, effectively.") — generic, template-adjacent phrasing that reads like stock SaaS copy. The same page's own `<meta name="description">` (`app/page.tsx:6-7`) and the Final CTA heading (`HomeContent.tsx:1092`: *"СПРИ ДА ИЗПУСКАШ КЛИЕНТИ ДНЕС"* — "STOP LOSING CLIENTS TODAY") both carry a much sharper, loss-aversion-driven hook. The strongest message on the page is currently buried at the bottom instead of leading.

**L1 — Testimonials cannot be verified from code.** `HomeContent.tsx:117-157` — 3 named clients (Maria Petrova/TechStore.bg, Ivan Kolev/EcoShop.bg, Elena Stoyanova/Beauty Studio Елена) with initials-only avatars, no photos, no outbound links. Flagging as an **unverified assumption** either way — this audit cannot confirm from the codebase alone whether these are real clients or illustrative placeholders; that's a fact only the business owner can supply, and it materially changes whether this counts as a trust signal or a liability (see BRAND-PROFILE.md).

---

## 3. UX / IA & Conversion

**Positive, verified:** the funnel (Home → Services/Demos → Pricing → Contact) is coherent and every pricing CTA already passes UTM-like query params (`?source=...&intent=...&pack=...`) into `/contact`, which `ContactContent.tsx` reads to pre-fill the form (`rawIntent`, `rawPack` parsing, `defaultProjectType`/`defaultBudget` logic). This is a genuinely well-built low-friction handoff — not something to change in Phase 4.

**H4 — Pricing page cognitive load is high for a first-time visitor.** `pricing/page.tsx` stacks, per plan card: two price blocks (setup + monthly) → an expandable "financial audit" line-item breakdown → an upsell nudge → an add-on configurator → a "what's not included" accordion → a CTA — five collapsible layers before the primary action. The *transparency* intent is good (confirmed by the FAQ: *"ценообразуването е брутално прозрачно"*) but the default-collapsed state of the "financial audit" walks a line between transparency and one-more-click friction. Not flagging the transparency itself — that's a validated design decision per Phase 3's local-trust research — flagging the layered-accordion execution as worth a lighter visual pass.

**M3 — `HowItWorksVisualization` step buttons remove the focus outline with no replacement.** `src/components/animations/HowItWorksVisualization.tsx:107`: `className="group relative w-full text-left focus:outline-none"` with no accompanying `focus-visible:ring-*`. Keyboard users tabbing through the 6-step process get no visible focus indicator on this component. By contrast, `Textarea.tsx`, `Select.tsx`, and `ChatbotDemo.tsx`'s input **do** correctly implement `focus-visible:ring-2` — so this is a localized miss in one component, not a systemic pattern.

---

## 4. Accessibility (beyond contrast, covered in §2)

**Positive, verified:** `prefers-reduced-motion` is genuinely, broadly honored — not a token gesture. `src/lib/motion.ts` exports a `useReducedMotion` hook consumed in **18 files**, including `SmoothScroll.tsx` (skips initializing Lenis entirely when reduced motion is preferred — not just pausing it) and `HomeContent.tsx` (skips the GSAP ScrollTrigger scrub timeline for the Before/After section). This is above the bar most sites hit.

**M3 (see §3) is the only confirmed keyboard-navigation gap found.** A full manual keyboard-only pass across all 6 routes was not performed (out of scope for the time available); this section should not be read as a clean bill of health, only as "no other gaps were found by the checks that were run."

---

## 5. Performance

**Real evidence available:** a genuine `next build` production run (not dev-mode, not estimated):

```
Route (app)                    Size    First Load JS
/                             14 kB          218 kB
/pricing                    14.2 kB          173 kB
/demos                       4.56 kB         181 kB
/services                    7.13 kB         166 kB
/contact                     7.07 kB         163 kB
/pricing/seo                 6.47 kB         165 kB
/demos/[id]                   205 B          176 kB
+ shared by all                              102 kB
```

The project's own performance rule (`rules/ecc/web/performance.md`) sets a **150kB gzipped JS budget for landing pages**. The homepage is at **218kB — 45% over budget**; every other route is 8–21% over. The shared 102kB baseline (React/Next framework runtime, present on every route regardless of content) is the floor — route-specific code adds another 60–116kB on top depending on the page.

**Positive, verified:** the heavy visual components (`HeroVisualization`, `BrandDissolveMark`, `EmailAutomationDemo`, `ProblemVisualization`, `SolutionVisualization`, `HowItWorksVisualization`) are already correctly code-split via `next/dynamic(..., {ssr:false, loading: ...})` in `HomeContent.tsx:41-69`, each with a skeleton fallback — confirmed both in source and live via the dev-server network tab, where each loads as its own chunk rather than inflating the main bundle. This is exactly the pattern the earlier `SilexBrand-redesign-plan.md` research recommended; it's already in place, not a gap.

**Limitation, stated explicitly:** no Lighthouse/PageSpeed CLI or CDP performance trace tool was available in this environment, and the GSC verification token being a placeholder (C4) means there is no real CrUX field data to pull either. The 218kB/173kB/etc. numbers above are real and load-bearing (they're the actual gzipped bytes the browser downloads), but LCP/INP/CLS millisecond figures for this audit are **not available and are not being fabricated**. Phase 4's before/after table will use bundle size as the primary real metric and will say so explicitly rather than inventing Lighthouse scores.

---

## Self-critique pass

Rereading this as a skeptical outside reviewer: the biggest risk in a document like this is presenting confident-sounding numbers that are actually measurement artifacts. That already happened once here — the first contrast pass flagged the hero `<h1>` itself as unreadable, which was wrong (it queried the wrapper element's inherited color, not the actual rendered `<span>`). Rather than silently fixing and re-running, I've kept the correction visible in §2 so it's clear the final 34-failure number was verified against true rendered leaf nodes, not trusted on the first pass.

Two things a reviewer would still press on: (1) the accessibility section only covers the homepage in depth — Services/Pricing/Demos/Contact were read for structure and metadata but not run through the same contrast/leaf-node script, so "34 failures on the homepage" should not be read as "34 failures site-wide"; and (2) performance numbers are production-build bundle sizes, a real and directly-relevant metric, but they are not Core Web Vitals — anyone expecting an LCP/INP number from this audit needs to know that number doesn't exist yet (C4 is why), not assume it was rounded away.

# SilexBrand — Brand Profile & Anti-Pattern Diagnosis

Reverse-engineered from the live codebase (copy, tokens, component choices), not from a brand brief — SilexBrand doesn't appear to have one on file in this repo. Where a claim depends on business context no file can supply (e.g. "are the testimonials real"), it's marked as such rather than assumed.

---

## 1. Current-state positioning

**What the code says the business is:** an AI-automation agency selling three tiers — Start (website + local SEO), Grow (AI assistant across Viber/Messenger/site), Pro (both combined) — to Bulgarian SMB owners, priced in EUR, bilingual bg/en, currently geo-targeting **both Sofia and Varna** in its keyword list (`src/config/seo.ts:31-32`: `"бизнес автоматизация София"`, `"бизнес автоматизация Варна"`) while the actual business address shown to customers is Varna (`ContactContent.tsx`, Footer) — Sofia appears only as stale schema data (see `AUDIT.md` C2), not as an intended second identity.

**The hook, stated three different ways at three different strengths:**
- Weakest (and most prominent — the H1): *"Подобрете своя бранд. Лесно, бързо и ефективно."* — generic improvement language, could belong to almost any agency.
- Stronger (page `<meta description>`): *"Не губете клиенти, защото отговаряте късно"* — a specific, loss-aversion mechanism.
- Strongest (Final CTA, bottom of page): *"СПРИ ДА ИЗПУСКАШ КЛИЕНТИ ДНЕС"* — the same mechanism, sharpened to an imperative.

This is a single finding worth being precise about: **the positioning itself is good and specific** ("you're losing money to slow replies, we fix that") — the problem is purely *placement*. The sharpest version of the message is buried at the point where a visitor who's already convinced clicks through, instead of leading the page for a visitor who hasn't decided yet.

**Voice/tone, bg vs. en:** consistent register in both — direct, second-person, transactional, light on jargon. No tone drift found between the two locales in the sections read (Home, Services, Pricing, Contact). This is a real, if unglamorous, strength: bilingual sites frequently let the English copy go stiffer/more formal than the native-language copy; this one doesn't.

**Naming inconsistency, confirmed in code:** both logo `<Image alt="Silex Digital">` instances (`Navbar.tsx:66,141`, `Footer.tsx:73`) still carry the pre-rebrand name as alt text, three commits after `d7adee2 "update branding from Silex Digital to SilexBrand"`. Screen readers and image-search indexing currently see the old name on every single page. Trivial fix, real inconsistency.

---

## 2. Visual personality — what's actually being said

`src/styles/globals.css:21` has this comment above the accent color definition, verbatim: *"Brand palette (deep wine burgundy — warm, premium, automotive-tech)."* That is the clearest first-party statement of intended personality available anywhere in the repo, and the execution largely backs it up:

- **Color:** a single deliberate wine-burgundy (`#6A2E3A`) as the signature, not a generic SaaS blue/purple — paired with warm charcoal-on-cream (light) and cream-on-charcoal (dark bands), plus a muted sage green reserved for success states. This is a genuinely differentiated palette for the "AI automation agency" category, which trends heavily toward blue/purple/teal gradients (this is asserted from general category familiarity, not a fresh competitive screenshot audit — flagged as **directionally confident, not independently re-verified in this phase**; Phase 3's research includes a live competitor pass that will confirm or correct it).
- **Type:** three deliberately different faces — Golos Text (body), Russo One (display headings — a bold, geometric, slightly technical-feeling face), JetBrains Mono (reserved specifically for numbers: prices, stats, the ROI calculator readout). Using a monospace face *only* for figures is a real, intentional signal — it reads as "these numbers are precise data, not marketing copy" — which directly reinforces the pricing page's stated goal of being *"брутално прозрачно"* (brutally transparent).
- **Motion:** Lenis smooth-scroll + GSAP ScrollTrigger scrub timelines for the Before/After section + a custom `BrandDissolveMark` component (the logo's "S" assembling from pixels, ambient in the hero). The redesign plan already on disk (`SilexBrand-redesign-plan.md`) flagged the lack of a signature branded visual moment as the site's core structural problem in an earlier pass — `BrandDissolveMark` is that moment, and it's already implemented and wired into the hero (`HomeContent.tsx:279`, dynamically imported). **That gap is closed, not open** — worth stating plainly since the plan doc reads as if it's still outstanding.

---

## 3. Anti-template checklist — checked against the actual banned-pattern list

| Banned pattern | Present? | Evidence |
|---|---|---|
| Default card grids, uniform spacing, no hierarchy | **No** | Home services grid uses bento spans (`bentoSpan = idx===0\|\|idx===3 ? "lg:col-span-2" : ""`, `HomeContent.tsx:591`) — first and last cards stretch wide, breaking the uniform grid. |
| Stock hero + gradient blob | **No** | Hero is a dark cinematic band with a real product mockup (simulated live-inbox widget showing actual conversation flow) plus the pixel-dissolve brand mark — not a centered headline over a blurred blob. |
| Unmodified library defaults passed off as design | **No** | Extensive custom utility classes (`atelier-band`, `atelier-band-dark`, `card-2026`, `cut-corner-tr`, `.roi-slider` with hand-built thumb/track styling) — this is not default shadcn/Tailwind-starter output. |
| Flat layouts, no depth/motion | **No** | Framer Motion + GSAP ScrollTrigger + Lenis, layered glass panels (`backdrop-blur-md`, `bg-white/[0.07]`) on dark bands. |
| Uniform radius/spacing/shadow everywhere | **Partially avoided** | Most cards share `--radius-xl`, but testimonials deliberately break the pattern with a cut-corner shape (`cut-corner-tr`) instead of a rounded card — a real, if small, intentional variation. Pricing cards, however, are close to interchangeable rounded-rectangle shapes differentiated mainly by the "Popular" badge — this is the one area still closest to the banned "default card grid" pattern (see `AUDIT.md` H4). |
| Safe gray-on-white, one decorative accent | **No** | Wine burgundy is used structurally (dark bands, CTAs, price highlights), not just as a link-color accent; sage green carries real semantic weight (success states only). |
| Dashboard-by-numbers layout | **N/A** | Not a dashboard product; doesn't apply to this site's pages. |
| Default font stack, no reason | **No** | Three-face system with a stated functional reason for the monospace choice (see §2). |

**Net finding:** SilexBrand does not read as a generic template today. The redesign-plan.md's self-diagnosis ("everything fades in the same way, every section is a card with padding") described a real earlier state, but the uncommitted changes already in the working tree (bento grid, cut-corner testimonials, scroll-scrubbed Before/After, the brand-mark hero moment) have already closed most of that gap. The remaining anti-pattern risk is narrower and more specific than "looks templated" — it's the **pricing card layer** (see table) and the **H1 undershooting the site's own strongest copy** (§1) — both fixable without a redesign.

---

## 4. Target audience — implicit vs. explicit

**Explicit (from copy/keywords):** Bulgarian SMB owners — the contact form's industry list (`ContactContent.tsx:266-289`) names retail, food/restaurants, beauty/spa, medical/dental, automotive, real estate, professional services — a broad small-business net, not a single vertical.

**Implicit (from design/pricing choices):** someone comfortable paying in EUR (not BGN — every price on the site is EUR-denominated, worth flagging since Phase 5 has to reconcile this against a BGN-pricing local market), sensitive enough to price that the pricing page leads with a full cost breakdown, and not assumed to be deeply technical (no jargon in the process steps: "Discovery → Design → Build → Launch").

**Gap vs. target:** for a *coastal-city* market specifically (Varna/Burgas), nothing on the site currently signals "we understand seasonal/tourism-adjacent business rhythms" — every industry example and every testimonial (TechStore.bg, EcoShop.bg, a beauty studio) reads as generic urban SMB, not coastal-specific. This is addressed in `PRICING-STRATEGY.md` (Phase 5) with a concrete vertical recommendation.

---

## 5. Gap list — current state → target state

| Area | Current | Target | Priority |
|---|---|---|---|
| Hero headline | Generic improvement language | Lead with the loss-aversion hook already proven in the meta description / final CTA | High (quick win, no redesign) |
| Brand name in alt text | "Silex Digital" (pre-rebrand) on every page | "SilexBrand" everywhere | High (quick win) |
| NAP data | Sofia (dead schema) vs. Varna (live pages) | Single Varna source of truth, wired live | Critical (blocks Phase 4 schema work) |
| Pricing card differentiation | Three near-interchangeable rounded cards + badge | Keep the financial-transparency content (validated strength) but reduce the accordion-layer count | Medium |
| Coastal-market signal | None — generic urban SMB examples only | Vertical-specific proof point (see Phase 5) | Medium — depends on Phase 5's vertical pick before it can be built |
| Testimonial provenance | Unverifiable from code | Confirm with business owner whether these are real clients (and if so, real photos) or need replacing | **Needs owner input — not a code fix** |

---

## Self-critique pass

The main thing to challenge here: is "avoids most banned patterns" too generous, given this site was flagged for a full anti-pattern audit? Rereading the checklist table, the honest answer is that it's accurate specifically *because* a substantial uncommitted redesign pass already happened this session before this audit began (bento grid, cut-corner testimonials, brand-mark hero) — this profile is describing the *current working tree*, not the last-committed state on `main`. That distinction is made explicit in §2 and §3 rather than claimed as a clean bill of health for "SilexBrand" as a static, finished product — because it isn't finished, it's mid-redesign, and the pricing-card layer plus the H1 are the two places that redesign hasn't reached yet.

The other place a reviewer would push back: the competitive color/type differentiation claim in §2 ("wine burgundy differentiates from category-typical blue/purple") is stated as directionally confident but not independently re-verified with fresh screenshots in this phase — it's flagged as such rather than presented as a Phase-1-grade verified fact, and Phase 3's research closes that gap with real competitor data.

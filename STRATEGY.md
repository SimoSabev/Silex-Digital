# SilexBrand — Converting + Beautiful + SEO/GEO Strategy

One integrated strategy, not three checklists. Built on real search research (queries and sources listed per section) plus the audit evidence in `AUDIT.md`/`BRAND-PROFILE.md` — not memorized generalities. Where research came up genuinely thin (Bulgaria-specific consumer-trust data), that's stated rather than papered over with a confident-sounding general claim.

---

## 1. Motion/3D "wow factor" vs. Core Web Vitals & accessibility — the explicit rule

This exact question was already researched in-repo (`SilexBrand-redesign-plan.md`, cited sources on GSAP vs. Framer Motion weight, Three.js's ~600KB core cost, Spline vs. R3F) before this engagement started. Re-running that research would violate the "don't re-run the same query twice" instruction, so this section **applies** that prior research rather than repeating it, and adds one thing it didn't cover: what 2026 SaaS conversion research says about *when interactivity beats decoration*, which sharpens the plan's tiering into an actual decision rule.

Fresh research (`WebSearch: "high converting landing page design 2026 avoid generic template SaaS agency conversion best practices"`) converges on the same conclusion from the conversion side that the plan doc reached from the performance side: **bento grids and real interactive demos now outperform decorative 3D/motion for SaaS conversion** — "interactive demos now replace static screenshots," and the biggest single conversion lever found across sources was cutting to *one* clear claim and *one* CTA above the fold, not adding more visual flourish.

**The rule, stated once, explicitly:**

> Keep a motion/3D effect only if it does one of two things: (a) it **is** the product — SilexBrand's own interactive demos (`ChatbotDemo`, `EmailAutomationDemo`, `LeadQualificationDemo`) qualify, because the interactivity *is* the sales pitch, not decoration around it — or (b) it materializes something structurally true about the brand that can't be said in text as fast (the `BrandDissolveMark` pixel-dissolve hero moment qualifies on this basis: it's a 3-second visual restatement of "we turn scattered inputs into one system," which is the whole pitch). Cut anything that's decoration without a job — full-bleed WebGL scenes, particle systems, motion on every single section transition — and cut it *before* asking whether it's under budget, not after, because the CWV math from the redesign plan (Three.js core alone = 4× the entire landing-page JS budget) means "cut it" and "the site is fast" are the same decision, not two separate ones.

Applied to SilexBrand today: the three interactive demos and the one brand-mark hero moment pass the rule. The GSAP-scrubbed Before/After timeline (`HomeContent.tsx`) is borderline — it clarifies a real before/after *narrative*, which leans toward keeping it, but it's the one place worth re-checking against real CWV numbers once GSC is verified (`AUDIT.md` C4) rather than assuming.

---

## 2. SEO + GEO for a bilingual bg/en local-service-plus-SaaS hybrid

Research: `WebSearch: "GEO generative engine optimization best practices 2026 AI Overviews ChatGPT Perplexity visibility"`.

Four things GEO research says matter, mapped directly onto what `AUDIT.md` already found:

1. **"Focus on questions, not keywords" + "FAQ sections matching real user prompts."** SilexBrand already has this instinct — `pricing/page.tsx`'s FAQ ("Защо цената е разделена...", "Има ли скрити условия?") and `pricing/seo/page.tsx`'s explicit framing ("Когато някой пита AI 'коя фирма да наема'...") are already written in the right shape. The gap isn't the copy, it's that `generateFAQSchema` in `structured-data.ts` exists and is never called (`AUDIT.md` C3) — so none of this question-shaped content is machine-readable as FAQ content to an AI crawler today. **This is the single highest-leverage GEO fix available**, because the content already exists; it only needs to be wired, not written.
2. **"JSON-LD schema stacking" + "evidence-dense writing with specific data points."** Same gap, same fix — `LocalBusiness`/`Organization`/`Service`/`FAQPage` schema all already coded, all unwired, and blocked on fixing the NAP mismatch first (`AUDIT.md` C2) — wiring wrong data would actively hurt GEO trust signals, not just fail to help.
3. **"Technical accessibility — many sites block AI crawlers without realizing it."** `robots.ts` (`AUDIT.md` H2) currently allows `*` with only `/admin/`, `/api/`, `/dashboard/` disallowed — this is already correctly open to AI crawlers (GPTBot, PerplexityBot, etc. aren't blocked). No action needed here; worth confirming explicitly since it's an easy thing to get wrong by accident.
4. **"Content freshness — older content loses citation priority."** N/A as a current gap (site is new), but relevant to Phase 4/5: once the SEO tier's monthly content cadence (`pricing/seo/page.tsx`: "1–2 материала месечно") starts producing pages, dating them and updating them matters for GEO the same way it does for classic SEO.

**Bilingual-specific implication:** GEO citation-worthiness depends on an AI system being able to resolve *which* URL is the canonical answer for a bg-language query vs. an en-language query. Right now that resolution is impossible — the `hreflang` alternate points at a non-existent `/en` (`AUDIT.md` C1) — so today AI engines answering in English have no distinct SilexBrand URL to cite even if they wanted to; they'd have to cite the Bulgarian-language homepage for an English query, which is a weak citation. **This makes C1 not just a classic-SEO bug but a GEO blocker** — fixing it (real `/en` routes or removing the false alternate) is a prerequisite for any bilingual GEO strategy, not a nice-to-have alongside it.

---

## 3. Local trust signals — what transmits from US/UK playbooks and what's specifically Bulgarian

Research: `WebSearch: "Bulgaria small business trust signals local SEO Google Business Profile 2026"` (returned only generic, geography-agnostic results — Bulgaria-specific consumer-trust research is thin online, stated here rather than papered over) and `WebSearch: "Viber usage statistics Bulgaria 2025 2026 messaging app market share"` (returned a strong, specific, directly usable data point).

**What translates directly (generic playbook, still true in Bulgaria):** Google Business Profile completeness and review volume/response rate remain the dominant local-trust mechanism — "customers are 70% more likely to visit businesses with a complete Business Profile," "89% more likely to choose a business that responds to all its reviews." Nothing found suggests Bulgaria is an exception to this; it should be treated as a safe baseline, not a BG-specific insight.

**What is specifically Bulgarian, and matters a lot: Viber, not WhatsApp, is the dominant channel.** Viber holds roughly **90% market share in Bulgaria** and is the #1 messaging app in the country, part of a broader ~70% Viber penetration across the CEE/CIS region — a sharp contrast to US/UK playbooks, which default to SMS or WhatsApp as the "obvious" business-messaging channel. **This is the concrete evidence that SilexBrand's entire product bet (Viber-first AI assistant, not WhatsApp-first) is the correct one for this market, not an arbitrary channel choice** — and it's worth stating on the site itself as a credibility signal ("built for how Bulgarians actually message, not a generic WhatsApp bot") rather than leaving it implicit. This is a genuine finding, not a restatement of something the site already claims — the site currently sells "Viber, Messenger and WhatsApp" as three interchangeable channels (`services/page.tsx` service #2 title even leads with "AI Дигитален секретар & Канали" listing multiple channels equally); the research says Viber deserves to lead, not sit alongside WhatsApp as an equal.

**What's an open, honestly-unverified question:** whether a Bulgarian equivalent of a "Better Business Bureau" trust badge (e.g., a Търговски регистър / commercial-registry lookup badge, or a BG-specific review aggregator beyond Google) meaningfully moves SMB buyer trust the way it might in the US. No search evidence was found either way — flagged as an **unverified assumption** rather than asserted, and not incorporated into the recommendations below as if it were confirmed.

---

## 4. The integrated strategy — explicit tradeoff calls

Reconciled into one set of calls, not a wishlist:

1. **Fix the GEO/local-SEO foundation before any new content or design work — it's a blocker, not a parallel track.** NAP correction (C2) → schema wiring (C3) → hreflang fix (C1) → per-route metadata (H1), in that order, because each later step either depends on or is undermined by the one before it (wiring schema before fixing NAP would ship wrong data; adding `/en` content before fixing hreflang would be built on a broken foundation).
2. **Lead with Viber-specificity, not channel-neutrality.** Rewrite the "AI Дигитален секретар & Канали" framing to name Viber first and explain *why* (the 90% stat), rather than listing Viber/Messenger/WhatsApp as interchangeable. This is a copy change, not a redesign — low cost, directly evidence-backed, and differentiates from any competitor running a translated US/UK-market pitch deck.
3. **Don't add motion — reallocate the motion budget already spent.** The rule in §1 says the demos and the brand-mark are worth their cost; the GSAP Before/After scrub is borderline-worth-it. Nothing in the audit or this research suggests *adding* new 3D/WebGL (Spline hero, etc.) is currently justified — the plan doc's Tier 3 recommendation is the ceiling, not a target to reach for its own sake, and the conversion research above suggests the marginal next dollar of effort is worth more spent on the H1 rewrite (`AUDIT.md` M2) and pricing-card simplification (`AUDIT.md` H4) than on more visual effects.
4. **Local trust signals: verify the GBP/review foundation is real before investing further.** Before writing more content or schema, confirm (owner input needed, flagged in `BRAND-PROFILE.md`) whether the three testimonials are real, verifiable clients — GEO and classic local-SEO both depend on citation-worthy, verifiable facts; an unverifiable testimonial is a liability under both frameworks, not just a nice-to-have to eventually confirm.
5. **Coastal-market-specific trust signals are a Phase 5 decision, not a Phase 3 one.** This strategy deliberately does not prescribe a Varna/Burgas vertical example yet — that requires the market/pricing research done in `PRICING-STRATEGY.md`, so the two aren't decided independently and then reconciled after the fact.

---

## Self-critique pass

The weakest link in this document, honestly: the Bulgaria-specific "local trust signals" research came back thin — the search genuinely did not surface Bulgaria-specific consumer-trust data beyond the Viber statistic, and a lazier version of this document would have papered over that with confident-sounding generic claims dressed up as local insight. Instead §3 states plainly that the GBP/reviews guidance is a geography-agnostic baseline being *applied* to Bulgaria, not *derived* from Bulgaria-specific research, and marks the commercial-registry-badge question as genuinely open rather than asserting an answer either way.

A skeptical reviewer would also ask: is the Viber-90%-market-share stat itself reliable, or is it Viber's own marketing claim inflating its number? The search results explicitly noted this ("Viber asserts that it holds a 90% market share in Bulgaria") — the word "asserts" is doing real work there, and third-party corroboration (70% CEE/CIS penetration, Viber being described independently as "#1 in Bulgaria" by other sources in the same result set) makes it credible enough to act on for a copy/positioning change, but not confident enough to use as a hard number in customer-facing marketing copy without a second, independent source.

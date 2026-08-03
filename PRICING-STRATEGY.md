# SilexBrand — Varna/Burgas Pricing Strategy

## 1. Real market data (not assumption)

**Regional purchasing power** (`WebSearch: "average salary Varna Burgas Bulgaria 2026 vs Sofia purchasing power"`):

| City | Avg. monthly salary (EUR) | vs. Sofia |
|---|---|---|
| Sofia | €1,914 | — |
| Varna | €1,284 | 67% of Sofia |
| Burgas | €1,055 | 55% of Sofia |

**Bulgaria-wide website market** (`WebSearch: "website design price Bulgaria Varna Burgas agency BGN 2026 small business"`): template sites from €300; custom-built sites €2,000–8,000; average corporate site ≈4,500 BGN (≈€2,300). Varna/Burgas specifically noted as adding "niche talent and nearshore capacity" — coastal agencies compete on value, not premium.

**Freelance/dev labor cost** (`WebSearch: "freelance web developer chatbot hourly rate Bulgaria 2026 Fiverr Upwork BGN"`): Eastern Europe freelance rates run **$25–60/hr**, chatbot developers specifically **$30–61/hr** — this is the real cost floor behind any AI-assistant setup line item.

**Currency context, confirmed and important:** search results reference "Bulgaria (After the Euro Changeover)" — Bulgaria has adopted the Euro. SilexBrand's EUR-denominated pricing is not a foreign/import signal to local buyers, it's simply the current national currency. This resolves what would otherwise be a reasonable question (why price a Bulgarian SMB site in EUR, not BGN) — no action needed, but worth having verified rather than assumed.

**Coastal hospitality precedent, real and named** (`WebSearch: "Bulgaria hotel restaurant chatbot AI automation booking Black Sea 2026"`):
- **Grand Assistant** — described as the first AI hotel-reservation chatbot in Bulgaria, already live in three named hotels: Grand Hotel Therme, Grand Hotel Bansko, and **Grand Hotel Sveti Vlas** — Sveti Vlas is a Black Sea coastal resort town near Burgas, i.e. real, current, in-market precedent in exactly the geography this strategy targets.
- **HotPilot** — a Bulgarian AI hotel-booking-platform startup, launched July 2026 — confirms this is an active, currently-forming competitive space, not a hypothetical opportunity.
- Industry ROI figures cited: AI chatbots integrated with booking systems lift direct bookings **12–20%**; one Bulgarian hotel implementation reportedly saved **~7,000 staff-hours/month** (the equivalent of 3–4 FTEs).
- Separately (from `STRATEGY.md`'s research), Bulgaria's coastal resorts are in a **real 2026 occupancy downturn** — foreign visitor numbers down, shorter stays, weaker early bookings. This cuts two ways for pricing: automation is *more* valuable when every booking matters more, but seasonal businesses under revenue pressure are also more price- and cash-flow-sensitive right now.

---

## 2. Re-checking the current three tiers against this evidence

Current tiers (`src/lib/pricing-data.ts`): **Start** €690 setup + €49/mo · **Grow** €290 setup + €248/mo · **Pro** €990 setup + €298/mo.

**Are the absolute numbers reasonable for this market?** Yes, and comfortably so. Start's €690 setup sits between the BG-wide "template" floor (€300) and "custom" range (€2,000–8,000) — a credible "more than a template, less than bespoke" position for the general Bulgarian market. Nothing in the research suggests these numbers are mispriced *for Bulgaria generally*.

**Should they be discounted specifically for Varna/Burgas, given the 33–45% salary gap vs. Sofia?** This is the real question the brief asks, and the honest answer is **no, not as a blanket cut** — for a reason the salary data alone doesn't capture: SilexBrand's own pricing is already EUR-flat, city-agnostic, and the buyer isn't an individual employee comparing the price to their salary — it's an SMB *owner* comparing it to business revenue. For the specific vertical this strategy ends up recommending (hospitality, below), Black Sea *business* revenue is seasonally tourism-driven and not well-proxied by average local salaries at all — a hotel or restaurant's summer revenue can rival or exceed Sofia-market business revenue even though the town's average employee salary is lower. Cutting price against a salary statistic that doesn't describe the actual buyer would leave money on the table without evidence it's needed.

What *should* respond to the coastal-market data is **payment timing, not price level** — the real 2026 occupancy downturn means seasonal businesses are cash-flow-constrained right now in a way a flat "10% off" wouldn't fix. See recommendation in §4.

### The Grow-vs-Start setup-fee oddity — resolved with evidence, not a guess

The brief asks explicitly whether Grow's lower setup fee (€290 vs. Start's €690) is an intentional low-friction upsell or a pricing-architecture mistake. Both the itemized "financial audit" breakdown already built into `pricing-data.ts` and the freelance-rate research above answer this directly: **it's cost-reflective, not arbitrary.**

- Start's €690 setup breaks down as: professional build (€300) + copywriting (€150) + Google Maps/SEO setup (€140) + security/GDPR (€100) — this is genuine design-and-build labor, the kind of work billed at the $25–60/hr Eastern-European freelance rate over many hours.
- Grow's €290 setup breaks down as: AI persona/character training (€150) + knowledge-base compiling (€90) + channel integration (€50) — meaningfully less one-time labor than building a website from scratch, because it's *configuring* an assistant on top of existing chat platforms (Viber, the client's site), not constructing new infrastructure.

The lower Grow setup fee is honest pricing for genuinely less setup work — **not** a discount subsidized by inflating the monthly fee. It's confirmed separately in the audit breakdown for the shape of the monthly figure: Grow's €248/mo is *not* margin padding, it's covering LLM API usage, weekly accuracy audits, hosting, and the CRM database — real, recurring operating costs of running an AI agent, which a one-time website build simply doesn't have.

That said, the research also confirms a **second, valid, non-contradictory reason** this pricing shape is smart: classic SaaS pricing research (`WebSearch` on loss-leader/introductory pricing psychology) confirms that products needing time to prove ROI benefit from a **lower upfront commitment that grows into the higher-margin recurring relationship** — which is exactly the Start→Grow upgrade path `pricing-data.ts` already encodes (`nextTierTarget`/`nextTierName` fields, and the pricing page's "you're close to Grow!" nudge). The lower entry cost isn't accidental *or* purely cost-based — it's cost-based pricing that also happens to produce good upgrade psychology. **Recommendation: sign off on the current structure as-is.** No architecture fix needed; if anything, make the "why Grow's setup is lower" reasoning explicit in the pricing FAQ, since right now a sharp-eyed visitor could reasonably wonder the same thing this brief asked.

---

## 3. Competitor benchmark table

| Player | Positioning | Setup | Monthly | Note |
|---|---|---|---|---|
| BG-wide template agencies | Basic site only | from €300 | — | Below SilexBrand Start; no AI/automation offering |
| BG-wide custom agencies | Bespoke design | €2,000–8,000 | — | 3–12x SilexBrand Start; no standard AI-assistant tier found in research |
| Grand Assistant (hospitality AI) | Hotel reservation chatbot, live in 3 named BG hotels incl. one Black Sea resort | Not published | Not published | Direct precedent for demand; no public pricing found — genuinely unverified, not omitted by choice |
| HotPilot (hospitality AI, new) | AI hotel booking platform, July 2026 launch | Not published | Not published | Same — new entrant, pricing not public |
| Freelance chatbot devs (Upwork/Fiverr, Eastern Europe) | Custom, one-off builds | $25–61/hr, project-based | — | Real cost floor behind Grow/Pro's setup labor; not a packaged, maintained product like SilexBrand |
| **SilexBrand Grow** | Packaged, maintained AI assistant + web presence, Varna-based | €290 | €248 | Only offering found in this research combining a *published, packaged, transparent* price with a *maintained* (not one-off) AI assistant |

**Honest gap in this table:** neither Grand Assistant nor HotPilot publish pricing anywhere findable in this research — meaning SilexBrand cannot benchmark its Grow/Pro tiers against direct hospitality-AI competitor pricing, only against general freelance/agency rates. This is stated as a real limitation, not glossed over — if precise competitor pricing matters for a future decision, it would require direct outreach (a sales call posing as a prospect), which is outside what research tools can supply.

---

## 4. Recommendation

**On the numbers: sign off, with one packaging addition — do not cut prices.** The evidence doesn't support a blanket Varna/Burgas discount (§2). The Grow/Start setup-fee shape is correct as designed (§2).

**Add: a seasonal-payment option for hospitality clients, not a discount.** Given the real, current (2026) coastal occupancy downturn, offer Grow/Pro hospitality clients the option to weight payments toward the high season (e.g., a lower fixed monthly base off-season with a small in-season top-up, same annual total) rather than a flat year-round €248/mo. This addresses actual cash-flow pressure the research surfaced without discounting the product's value — and it's a packaging change, which is lower-risk than a price change.

**Vertical recommendation: hospitality (hotels first, restaurants as natural expansion) — not a guess, the strongest evidenced fit found.**

Justification, all evidence-backed:
1. **Real local precedent already exists and is succeeding** — Grand Assistant live in 3 named hotels including a Black Sea resort town; a second Bulgarian competitor (HotPilot) just entered the same space in July 2026. This isn't a speculative niche; it's a proven, currently-active demand signal in exactly this market.
2. **The core product pitch fits the vertical better than any other tested.** SilexBrand's whole thesis is "you lose clients to slow replies" (`AUDIT.md`/`STRATEGY.md`) — for a hotel or B&B fielding international guest inquiries across time zones, a 24/7 Viber/chat assistant isn't a nice-to-have, it's the difference between winning and losing a booking to a competitor who replies faster. This is a sharper version of the same pain point SilexBrand already sells generically.
3. **Quantified ROI exists to anchor pricing conversations**: the 12–20% direct-booking lift and ~7,000-hours/month-saved figures are real, citable numbers a sales conversation can use to justify Grow/Pro pricing against — something the site currently lacks for any vertical (its ROI calculator uses generic, self-reported inputs, not an industry-sourced benchmark).
4. **It doesn't require a new product** — Grow's existing feature set (Viber/site AI assistant, automated booking, CRM) maps directly onto hotel/B&B reservation handling with no re-engineering, only re-positioning (case studies, industry-specific copy, maybe a hospitality-specific demo scenario alongside the existing three).

**What this recommendation deliberately does not claim:** that hospitality is a *guaranteed* win, or that restaurants/real estate/spa are wrong choices — only that of the verticals checked, hospitality is the one with real, current, named local proof that AI-assistant demand exists and converts, which is a meaningfully stronger basis than the generic "we serve every sector" positioning the site currently uses (`ContactContent.tsx`'s industry dropdown lists 7 sectors with no differentiation).

---

## Self-critique pass

The weakest point here, stated plainly: neither Grand Assistant nor HotPilot's actual pricing could be found, so the "competitor benchmark" for the *specific* AI-hospitality-assistant category is really a demand-validation argument, not a pricing-validation argument — I know the vertical is real and active, I don't know what it currently costs to buy from a competitor. Presenting this as a full pricing benchmark would overclaim; the table above states the gap directly rather than filling it with an estimate dressed as data.

A skeptical reviewer would also push on the "don't discount for Varna/Burgas" call — it rests on the argument that SMB revenue doesn't track individual salary data, which is directionally sound but is my own reasoning applied to the salary statistics, not something a source directly confirmed. If SilexBrand's actual sales conversations later show coastal prospects consistently balking at price in a way Sofia prospects don't, that would be real evidence this call was wrong, and it should be revisited then — this recommendation is a starting position backed by the best available evidence, not a permanent verdict immune to real sales data once it exists.

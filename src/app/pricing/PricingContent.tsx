"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Plus, X, Sparkles, TrendingUp, ChevronDown, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";
import { pricingPlans, availableAddons, pricingFaqsBg, pricingFaqsEn } from "@/lib/pricing-data";

const comparisonFeatures = [
  { name: { bg: "Брой автоматизации", en: "Number of automations" }, start: "1", grow: "До 4", pro: "6+" },
  { name: { bg: "AI помощник", en: "AI assistant" }, start: false, grow: true, pro: true },
  { name: { bg: "Следене на клиентите", en: "Client tracking" }, start: "Базово", grow: "Базово", pro: "Разширено" },
  { name: { bg: "Всички канали", en: "All channels" }, start: false, grow: false, pro: true },
  { name: { bg: "Месечни подобрения", en: "Monthly improvements" }, start: "Отчет", grow: "2 пъти", pro: "Консултация" },
  { name: { bg: "Поддръжка", en: "Support" }, start: "Стандартна", grow: "Приоритетна", pro: "24/7" },
];

export default function PricingContent() {
  const { locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Monthly vs annual (-10%) billing toggle, shared across all three cards.
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  // State to track selected addons per plan (e.g. { "Start": ["extra-automation"], "Grow": [] })
  const [selectedAddons, setSelectedAddons] = useState<Record<string, string[]>>({
    Start: [],
    Grow: [],
    Pro: [],
  });

  // "What's NOT included" starts collapsed on every plan so it stays a
  // one-click reveal instead of visual clutter on first load.
  const [openNotIncluded, setOpenNotIncluded] = useState<Record<string, boolean>>({
    Start: false,
    Grow: false,
    Pro: false,
  });

  const toggleNotIncluded = (planName: string) => {
    setOpenNotIncluded((prev) => ({ ...prev, [planName]: !prev[planName] }));
  };

  // State to track expanded financial audits per plan
  const [activeAudits, setActiveAudits] = useState<Record<string, boolean>>({
    Start: false,
    Grow: false,
    Pro: false,
  });

  const toggleAudit = (planName: string) => {
    setActiveAudits((prev) => ({
      ...prev,
      [planName]: !prev[planName],
    }));
  };

  // Add-ons start collapsed so each plan card leads with one clear price + feature
  // list, not three simultaneous UI panels competing for attention.
  const [openAddonPanels, setOpenAddonPanels] = useState<Record<string, boolean>>({
    Start: false,
    Grow: false,
    Pro: false,
  });

  const toggleAddonPanel = (planName: string) => {
    setOpenAddonPanels((prev) => ({
      ...prev,
      [planName]: !prev[planName],
    }));
  };

  const faqs = locale === "bg" ? pricingFaqsBg : pricingFaqsEn;

  const toggleAddon = (planName: string, addonId: string) => {
    setSelectedAddons((prev) => {
      const planAddons = prev[planName] ?? [];
      const hasAddon = planAddons.includes(addonId);
      return {
        ...prev,
        [planName]: hasAddon
          ? planAddons.filter((id) => id !== addonId)
          : [...planAddons, addonId],
      };
    });
  };

  // Add-ons are a monthly extra, so they only layer onto the monthly view —
  // the annual figure is a fixed prepaid total.
  const getAddonsTotal = (planName: string) => {
    const addons = selectedAddons[planName] ?? [];
    return addons.reduce((total, addonId) => {
      const addon = availableAddons.find((a) => a.id === addonId);
      return total + (addon?.price ?? 0);
    }, 0);
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)] overflow-hidden">
      <Container>
        <section className="py-24 md:py-32 relative">
          {/* Background decorations */}
          <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[120px]"></div>
          <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[150px]"></div>

          {/* Hero — asymmetric, oversized type, the receipt strip is the real
              product device (mirrors the financial-audit breakdown below)
              instead of a decorative badge + underline flourish. */}
          <div className="atelier-band-dark relative z-10 mb-20 overflow-hidden rounded-[32px] border border-white/10 px-6 py-16 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:px-12 md:py-20">
            <Image
              src="/images/hero-ribbon-dark.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="pointer-events-none object-cover opacity-30 mix-blend-screen"
            />
            <div className="relative z-10 max-w-3xl">
              <Reveal variant="blur">
                <p className="mb-5 font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text-on-dark)]/40 uppercase">
                  {locale === "bg" ? "Цени · SilexBrand" : "Pricing · SilexBrand"}
                </p>
              </Reveal>
              <h1 className="mb-6 font-display text-[2.5rem] leading-[0.98] font-extrabold tracking-tight text-[var(--color-text-on-dark)] sm:text-[3.5rem] md:text-[4.5rem]">
                {locale === "bg" ? (
                  <>Всяко евро,<br /><span className="text-[var(--accent-10)]">обяснено.</span></>
                ) : (
                  <>Every euro,<br /><span className="text-[var(--accent-10)]">explained.</span></>
                )}
              </h1>
              <Reveal variant="rise" delay={0.12}>
                <p className="mb-8 max-w-lg text-[17px] leading-relaxed text-[var(--color-text-on-dark)]/60 md:text-[19px]">
                  {locale === "bg"
                    ? "Не блендирани абонаменти. Всеки план се разгъва до последното евро — вижте къде отива всяка стотинка, преди да платите."
                    : "No blended subscriptions. Every plan unfolds down to the last euro — see where each cent goes before you pay."}
                </p>
              </Reveal>
              <Reveal variant="rise" delay={0.2}>
                <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 font-mono text-[13px] text-[var(--color-text-on-dark)]/45">
                  <span>{locale === "bg" ? "Дизайн" : "Design"} · €300</span>
                  <span>{locale === "bg" ? "Текстове" : "Copy"} · €150</span>
                  <span>SEO · €140</span>
                  <span>{locale === "bg" ? "Хостинг" : "Hosting"} · €15{locale === "bg" ? "/мес" : "/mo"}</span>
                  <span className="text-[var(--accent-10)]/70">{locale === "bg" ? "…всичко видимо" : "…all visible"}</span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Free Trial Full Width Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="card-featured relative mb-16 overflow-hidden rounded-[24px] border-2 border-[var(--accent)]/40 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-card)] p-1 shadow-[0_20px_50px_-24px_color-mix(in_srgb,var(--accent)_45%,transparent)] group hover:shadow-[0_28px_60px_-24px_color-mix(in_srgb,var(--accent)_55%,transparent)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent z-0"></div>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles size={250} className="translate-x-1/4 -translate-y-1/4 text-[var(--accent)]" />
            </div>

            <div className="relative z-10 bg-[var(--bg-card)]/80 backdrop-blur-md rounded-[1.3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <Badge className="mb-4 border-none bg-[var(--accent)] px-4 py-1.5 text-sm font-bold text-black uppercase tracking-wider">
                  {locale === "bg" ? "Лимитирана оферта" : "Limited time offer"}
                </Badge>
                <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl text-[var(--text-main)]">
                  {locale === "bg"
                    ? "Започни напълно безплатно — 30 дни"
                    : "Start completely free — 30 days"}
                </h2>
                <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-[17px] font-medium text-[var(--text-sub)]">
                  {[
                    { bg: "5 снимки", en: "5 photos" },
                    { bg: "1 видео", en: "1 video" },
                    { bg: "Лек SEO старт", en: "Basic SEO setup" },
                    { bg: "Брандинг", en: "Branding" },
                  ].map((item) => (
                    <div key={item.bg} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                        <Check className="text-[var(--accent)]" size={18} />
                      </div>
                      {item[locale]}
                    </div>
                  ))}
                </div>
                <Link href="/contact?source=pricing-page-trial">
                  <Button className="rounded-full border-none bg-[var(--accent)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[var(--accent-hover)] hover:scale-105 hover:shadow-xl">
                    {locale === "bg" ? "Вземи бонуса сега" : "Claim bonus now"} <ArrowRight className="inline ml-2" size={20}/>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Billing Toggle */}
          <div className="relative z-10 mb-12 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-1.5 shadow-apple">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                  billing === "monthly" ? "text-white" : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
                }`}
              >
                {billing === "monthly" && (
                  <motion.span
                    layoutId="billing-pill"
                    initial={false}
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{locale === "bg" ? "Месечно" : "Monthly"}</span>
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                  billing === "annual" ? "text-white" : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
                }`}
              >
                {billing === "annual" && (
                  <motion.span
                    layoutId="billing-pill"
                    initial={false}
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {locale === "bg" ? "Годишно" : "Annual"}
                </span>
                <span className={`relative z-10 rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${
                  billing === "annual" ? "bg-white/20 text-white" : "bg-[var(--accent)]/20 text-[var(--accent)]"
                }`}>
                  {locale === "bg" ? "-10%" : "save 10%"}
                </span>
              </button>
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="mb-32 grid items-stretch gap-8 md:grid-cols-3 lg:gap-8 relative z-10 w-full xl:max-w-7xl mx-auto">
            {pricingPlans.map((plan, planIdx) => {
              const isPopular = plan.popular;
              const addonsTotal = billing === "monthly" ? getAddonsTotal(plan.name) : 0;
              const displayMonthlyPrice = plan.monthly.price + addonsTotal;
              const displayAnnualPrice = plan.monthly.annualPrice;
              const annualEquivalentMonthly = Math.round(plan.monthly.annualPrice / 12);

              // Smart Ladder Recommendation logic — only meaningful in monthly view
              const isCloseToNext =
                billing === "monthly" &&
                plan.nextTierTarget !== null &&
                displayMonthlyPrice >= plan.nextTierTarget * 0.85;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: planIdx * 0.15, duration: 0.6 }}
                  className={`relative flex flex-col rounded-[24px] p-8 transition-all duration-400 group hover:-translate-y-2 overflow-hidden ${
                    isPopular
                      ? "card-2026 shadow-[0_24px_50px_-24px_color-mix(in_srgb,var(--accent)_40%,transparent)] md:scale-[1.03]"
                      : "border border-[var(--border)] bg-[var(--bg-card)] shadow-apple hover:shadow-apple-hover"
                  }`}
                >
                  {/* Hover background injection */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 0%, color-mix(in srgb, var(--accent) 8%, transparent) 100%)" }}></div>

                  {isPopular && (
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-10)]"></div>
                  )}

                  {isPopular && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> {locale === "bg" ? "Популярен" : "Popular"}
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6 relative z-10">
                    <h3 className="mb-3 font-display text-3xl font-bold text-[var(--text-main)]">
                      {plan.name}
                    </h3>
                    <p className="mb-2 h-[40px] text-sm text-[var(--text-sub)]">
                      {plan.description[locale]}
                    </p>
                  </div>

                  {/* Two visually separated price blocks: one-time setup vs. recurring support */}
                  <div className="mb-6 flex flex-col gap-3 relative z-10">
                    {/* Block 1 — Еднократна изработка */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-section)] p-5">
                      <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">
                        {locale === "bg" ? "Еднократна изработка" : "One-time setup"}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
                          {locale === "bg" ? "от " : "from "}{plan.setup.price} €
                        </span>
                        <span className="text-xs font-bold text-[var(--text-muted)]">
                          {locale === "bg" ? "еднократно" : "one-time"}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {plan.setup.included[locale].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-sub)]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Block 2 — Месечна поддръжка / абонамент */}
                    <div
                      className="rounded-2xl border p-5"
                      style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, var(--border))", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                          {locale === "bg" ? "Месечна поддръжка" : "Monthly support"}
                        </span>
                        {billing === "annual" && (
                          <span className="text-[11px] font-bold text-[var(--text-muted)] line-through">
                            {plan.monthly.annualListPrice} €
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={`${billing}-${displayMonthlyPrice}-${displayAnnualPrice}`}
                            initial={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="font-display text-4xl font-extrabold tracking-tighter"
                            style={{ color: "var(--accent)" }}
                          >
                            {billing === "monthly" ? displayMonthlyPrice : displayAnnualPrice} €
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-sm font-medium text-[var(--text-muted)]">
                          {billing === "monthly" ? (locale === "bg" ? "/месец" : "/month") : (locale === "bg" ? "/год" : "/year")}
                        </span>
                      </div>
                      {billing === "annual" && (
                        <div className="mt-1 text-[12px] font-medium text-[var(--text-muted)]">
                          {locale === "bg"
                            ? `~${annualEquivalentMonthly} €/мес, платено годишно`
                            : `~€${annualEquivalentMonthly}/mo, billed annually`}
                        </div>
                      )}
                      {billing === "monthly" && (
                        <div className="mt-1 text-[12px] font-medium text-[var(--text-muted)]">
                          {locale === "bg" ? "по желание — прекратявате по всяко време" : "optional — cancel anytime"}
                        </div>
                      )}

                      <ul className="mt-4 space-y-2">
                        {plan.monthly.included[locale].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-main)]/90">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Financial Audit Trigger */}
                      <button
                        onClick={() => toggleAudit(plan.name)}
                        className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                      >
                        <span>{activeAudits[plan.name] ? (locale === "bg" ? "🔽 Скрий одита" : "🔽 Hide audit") : (locale === "bg" ? "🔍 Виж финансов одит" : "🔍 View financial audit")}</span>
                      </button>

                      <AnimatePresence>
                        {activeAudits[plan.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 text-xs font-medium relative z-10 shadow-inner overflow-hidden text-left"
                          >
                            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3 pb-1 border-b border-[var(--border)]">
                              {locale === "bg" ? "Финансов одит (Къде отива всяко €)" : "Financial Audit (Where the money goes)"}
                            </h4>

                            <div className="mb-3">
                              <h5 className="font-extrabold mb-1.5 uppercase tracking-wide text-[10px]" style={{ color: "var(--accent)" }}>
                                {locale === "bg" ? `Еднократна такса (${plan.setup.price} €)` : `Setup Fee (${plan.setup.price} €)`}
                              </h5>
                              <div className="space-y-1">
                                {plan.audit[locale].setup.map((item, i) => (
                                  <div key={i} className="flex items-center justify-between text-[11px] text-[var(--text-sub)]">
                                    <span>{item.label}</span>
                                    <span className="font-bold text-[var(--text-main)]">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="font-extrabold mb-1.5 uppercase tracking-wide text-[10px]" style={{ color: "var(--accent)" }}>
                                {locale === "bg" ? `Месечен абонамент (${plan.monthly.price} €/мес)` : `Monthly Subscription (${plan.monthly.price} €/mo)`}
                              </h5>
                              <div className="space-y-1">
                                {plan.audit[locale].monthly.map((item, i) => (
                                  <div key={i} className="flex items-center justify-between text-[11px] text-[var(--text-sub)]">
                                    <span>{item.label}</span>
                                    <span className="font-bold text-[var(--text-main)]">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Price Ladder Upsell notification */}
                    <AnimatePresence>
                      {isCloseToNext && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="w-full bg-[var(--bg-section)] border border-[var(--border)] rounded-lg p-3 text-xs md:text-sm font-medium flex items-start gap-2 shadow-inner"
                        >
                          <TrendingUp className="text-[var(--accent)] shrink-0 w-4 h-4 mt-0.5" />
                          <span>
                            {locale === "bg"
                              ? `За още малко доближавате плана ${plan.nextTierName}! Обмислете ъпгрейд.`
                              : `You're very close to the ${plan.nextTierName} plan! Consider upgrading.`}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Addons Dynamic Configurator — monthly billing only; collapsed by default */}
                  {plan.name !== "Pro" && billing === "monthly" && (
                    <div className="mb-6 border border-[var(--border)] bg-transparent rounded-xl relative z-10 transition-colors hover:border-[var(--text-muted)] group/addons overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleAddonPanel(plan.name)}
                        className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
                      >
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover/addons:text-[var(--text-main)] transition-colors">
                          {locale === "bg" ? "Надгради с Add-on" : "Upgrade with Add-ons"}
                          {(selectedAddons[plan.name]?.length ?? 0) > 0 && (
                            <span className="ml-2 rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[11px] font-bold text-[var(--accent)] normal-case tracking-normal">
                              {selectedAddons[plan.name]!.length}
                            </span>
                          )}
                        </h4>
                        <motion.div
                          animate={{ rotate: openAddonPanels[plan.name] ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openAddonPanels[plan.name] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="space-y-3 px-4 pb-4">
                              {availableAddons.map((addon) => {
                                const isSelected = selectedAddons[plan.name]?.includes(addon.id);
                                return (
                                  <label
                                    key={addon.id}
                                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${isSelected ? "bg-[var(--bg-section)] border-[var(--border)] shadow-sm" : "hover:bg-[var(--bg-section)]/50 border-transparent"} border`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-5 h-5 rounded border ${isSelected ? "bg-[var(--accent)] border-[var(--accent)] flex items-center justify-center text-white" : "border-[var(--text-muted)]"}`}>
                                        {isSelected && <Check size={14} strokeWidth={3} />}
                                      </div>
                                      <span className={`text-[14px] ${isSelected ? "text-[var(--text-main)] font-medium" : "text-[var(--text-sub)]"}`}>
                                        {addon.name[locale]}
                                      </span>
                                    </div>
                                    <span className={`text-[13px] font-bold ${isSelected ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
                                      +{addon.price}{locale === "bg" ? "€" : "EUR"}
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="hidden"
                                      checked={isSelected}
                                      onChange={() => toggleAddon(plan.name, addon.id)}
                                    />
                                  </label>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* What's NOT included — collapsed accordion, one click to reveal */}
                  <div className="mb-8 border border-[var(--border)] bg-transparent rounded-xl relative z-10 transition-colors hover:border-[var(--text-muted)] group/notincluded overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleNotIncluded(plan.name)}
                      className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover/notincluded:text-[var(--text-main)] transition-colors">
                        {locale === "bg" ? "Какво НЕ е включено" : "What's NOT included"}
                      </h4>
                      <motion.div
                        animate={{ rotate: openNotIncluded[plan.name] ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openNotIncluded[plan.name] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <ul className="space-y-2 px-4 pb-4">
                            {plan.notIncluded[locale].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-sub)]">
                                <X className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)] opacity-70" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto relative z-10">
                    <Link
                      href={`/contact?source=pricing-page&offer=first-order-bonus&intent=${plan.intent}&pack=${plan.pack}&billing=${billing}&addons=${(selectedAddons[plan.name] || []).join(',')}`}
                      className="block"
                    >
                      <Button
                        className={`w-full rounded-xl py-4 flex items-center justify-center gap-2 text-lg font-bold transition-all relative overflow-hidden group/btn ${
                          isPopular
                            ? "border-none bg-[var(--accent)] text-white shadow-[0_10px_20px_color-mix(in_srgb,var(--accent)_30%,transparent)] hover:bg-[var(--accent-hover)] hover:shadow-[0_15px_30px_color-mix(in_srgb,var(--accent)_40%,transparent)] hover:-translate-y-1"
                            : "border border-[var(--border)] bg-[var(--bg-section)] text-[var(--text-main)] hover:border-transparent hover:bg-[var(--text-main)] hover:text-black hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] hover:-translate-y-1"
                        }`}
                      >
                        <span className="relative z-10">{plan.cta[locale]}</span>
                        <ArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" size={20} />
                      </Button>
                    </Link>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* SEO Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-8 md:flex-row md:p-10 relative z-10"
          >
            <div className="text-center md:text-left">
              <Badge className="mb-3 inline-flex">
                {locale === "bg" ? "Продължение на сайта" : "The next step after your site"}
              </Badge>
              <h3 className="mb-2 font-display text-2xl font-bold md:text-3xl">
                {locale === "bg" ? "Сайтът е готов. SEO ще те направи видим." : "Your site is ready. SEO makes you visible."}
              </h3>
              <p className="max-w-xl text-[15px] text-[var(--text-sub)]">
                {locale === "bg"
                  ? "Отделни SEO нива от €80/мес — плюс проследяване дали ChatGPT и Gemini те споменават."
                  : "Standalone SEO tiers from €80/mo — plus tracking whether ChatGPT and Gemini mention you."}
              </p>
            </div>
            <Link href="/pricing/seo" className="shrink-0">
              <Button variant="secondary" size="lg">
                {locale === "bg" ? "Виж SEO нивата" : "View SEO tiers"}
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 scroll-hint-x overflow-x-auto relative z-10 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="mb-2 sm:mb-4 font-display text-2xl sm:text-3xl font-bold md:text-5xl">
                {locale === "bg" ? "Сравни плановете" : "Compare plans"}
              </h2>
              <p className="text-sm text-[var(--text-muted)] md:hidden">
                {locale === "bg" ? "Плъзни наляво/надясно за пълната таблица" : "Swipe sideways for the full table"}
              </p>
            </div>
            <div className="bg-[var(--bg-card)] rounded-[24px] border border-[var(--border)] overflow-hidden shadow-2xl">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="bg-transparent">
                    <th className="p-6 text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase w-1/4">
                      {locale === "bg" ? "Функционалност" : "Feature"}
                    </th>
                    <th className="p-6 text-center text-xl font-bold text-[var(--text-main)] w-1/4">
                      Start
                    </th>
                    <th className="p-6 text-center text-xl font-bold text-[var(--accent)] w-1/4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[var(--accent)]/5"></div>
                      <span className="relative z-10">Grow</span>
                    </th>
                    <th className="p-6 text-center text-xl font-bold text-[var(--text-main)] w-1/4">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr
                      key={idx}
                      className="group border-t border-[var(--border)] transition-colors hover:bg-[var(--bg-section)]/50"
                    >
                      <td className="p-6 font-medium text-[var(--text-main)]">
                        {feature.name[locale]}
                      </td>
                      <td className="p-6 text-center text-[var(--text-sub)]">
                        {typeof feature.start === "boolean" ? (
                          feature.start ? (
                            <>
                              <Check className="mx-auto text-[var(--accent)]" size={24} aria-hidden="true" />
                              <span className="sr-only">{locale === "bg" ? "Включено" : "Included"}</span>
                            </>
                          ) : (
                            <>
                              <X className="mx-auto text-[var(--text-muted)] opacity-50" size={20} aria-hidden="true" />
                              <span className="sr-only">{locale === "bg" ? "Не е включено" : "Not included"}</span>
                            </>
                          )
                        ) : (
                          <span className="font-semibold">{feature.start}</span>
                        )}
                      </td>
                      <td className="p-6 text-center font-bold text-[var(--accent)] bg-[var(--accent)]/[0.02] group-hover:bg-[var(--accent)]/[0.05] transition-colors relative">
                        {typeof feature.grow === "boolean" ? (
                          feature.grow ? (
                            <>
                              <Check className="mx-auto text-[var(--accent)]" size={24} aria-hidden="true" />
                              <span className="sr-only">{locale === "bg" ? "Включено" : "Included"}</span>
                            </>
                          ) : (
                            <>
                              <X className="mx-auto text-[var(--text-muted)] opacity-50" size={20} aria-hidden="true" />
                              <span className="sr-only">{locale === "bg" ? "Не е включено" : "Not included"}</span>
                            </>
                          )
                        ) : (
                          <span className="font-bold text-[var(--accent)]">{feature.grow}</span>
                        )}
                      </td>
                      <td className="p-6 text-center text-[var(--text-sub)]">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <>
                              <Check className="mx-auto text-[var(--accent)]" size={24} aria-hidden="true" />
                              <span className="sr-only">{locale === "bg" ? "Включено" : "Included"}</span>
                            </>
                          ) : (
                            <>
                              <X className="mx-auto text-[var(--text-muted)] opacity-50" size={20} aria-hidden="true" />
                              <span className="sr-only">{locale === "bg" ? "Не е включено" : "Not included"}</span>
                            </>
                          )
                        ) : (
                          <span className="font-semibold">{feature.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="mx-auto max-w-3xl relative z-10">
            <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-5xl">
              {locale === "bg" ? "Имате въпроси?" : "Have questions?"}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] transition-colors hover:border-[var(--text-muted)]"
                  >
                    <button
                      className="flex w-full items-center justify-between bg-transparent px-6 py-6 text-left"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span className="pr-8 text-lg font-bold text-[var(--text-main)]">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-section)]"
                      >
                        <Plus className="text-[var(--text-main)]" size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-[16px] leading-relaxed text-[var(--text-sub)]">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

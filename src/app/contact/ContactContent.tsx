"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";
import { getBundle, type BundleId, type ServiceId } from "@/lib/offer";
import { BUDGET_IDS, budgetBucket, removeFromSelection, tr, type BudgetId } from "@/app/pricing/_components/offer-utils";
import ContactAside from "./_components/ContactAside";
import { BundleSummary, ServicesSummary } from "./_components/SelectionSummary";
import {
  DEFAULT_BUNDLE,
  INDUSTRIES,
  LEAD_KINDS,
  deriveProjectType,
  messagePrefill,
  oneTimeEstimate,
  parseLeadParams,
  type LeadKind,
} from "./_components/lead-params";

const LABEL = "mb-2 block text-small font-semibold text-[var(--text-sub)]";
const MESSAGE_MAX = 1400;

const KIND_LABELS: Record<LeadKind, { bg: string; en: string }> = {
  call: { bg: "Безплатна 30-минутна среща", en: "Free 30-minute call" },
  bundle: { bg: "Пакет", en: "Bundle" },
  services: { bg: "Единични услуги", en: "Single services" },
  project: { bg: "Друго запитване", en: "Other inquiry" },
};

const INDUSTRY_LABELS: Record<(typeof INDUSTRIES)[number], { bg: string; en: string }> = {
  retail: { bg: "Магазини и търговски обекти", en: "Shops and retail" },
  food: { bg: "Заведения и ресторанти", en: "Restaurants and cafés" },
  beauty: { bg: "Салони за красота и СПА", en: "Beauty salons and spa" },
  medical: { bg: "Лекарски и зъболекарски кабинети", en: "Medical and dental clinics" },
  automotive: { bg: "Автокъщи и автосервизи", en: "Car dealers and auto repair" },
  property: { bg: "Имоти, наеми и строителство", en: "Real estate and construction" },
  professional: { bg: "Свободни професии и услуги", en: "Professional services" },
  other: { bg: "Друга сфера", en: "Other" },
};

const PROJECT_TYPES: readonly { id: string; label: { bg: string; en: string } }[] = [
  { id: "web-development", label: { bg: "Сайт и бранд", en: "Website and brand" } },
  { id: "ecommerce", label: { bg: "Онлайн магазин", en: "Online store" } },
  { id: "seo", label: { bg: "SEO", en: "SEO" } },
  { id: "ai-agent", label: { bg: "AI асистент", en: "AI assistant" } },
  { id: "automation", label: { bg: "Автоматизация", en: "Automation" } },
  { id: "other", label: { bg: "Друго", en: "Other" } },
];

const BUDGET_LABELS: Record<BudgetId, { bg: string; en: string }> = {
  "under-500": { bg: "До 500 €", en: "Up to €500" },
  "500-1500": { bg: "500 – 1 500 €", en: "€500 – €1,500" },
  "1500-3000": { bg: "1 500 – 3 000 €", en: "€1,500 – €3,000" },
  "3000-plus": { bg: "Над 3 000 €", en: "Over €3,000" },
};

const EMPTY_CONTACT = { name: "", email: "", phone: "", company: "" };

export default function ContactContent() {
  const { locale } = useI18n();
  const searchParams = useSearchParams();
  const initial = useMemo(() => parseLeadParams(searchParams), [searchParams]);

  const [kind, setKind] = useState<LeadKind>(initial.kind);
  const [bundleId, setBundleId] = useState<BundleId>(initial.bundleId ?? DEFAULT_BUNDLE);
  const [services, setServices] = useState<readonly ServiceId[]>(initial.services);
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [industry, setIndustry] = useState(initial.industry);
  // null = not touched by the visitor → show the value derived from the selection.
  const [projectType, setProjectType] = useState<string | null>(null);
  const [budget, setBudget] = useState<BudgetId | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isCall = kind === "call";
  const hasSelection = initial.kind === "bundle" || initial.kind === "services";
  const estimate = oneTimeEstimate(kind, bundleId, services);
  const budgetValue: BudgetId = budget ?? (estimate === null ? "500-1500" : budgetBucket(estimate));
  const projectTypeValue = projectType ?? deriveProjectType(kind, bundleId, services);
  const messageValue = message ?? messagePrefill(kind, bundleId, services, locale);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const contextLines = (): string =>
    [
      "",
      "---",
      "Lead Context",
      `source: ${initial.source}`,
      `kind: ${kind}`,
      `bundle: ${kind === "bundle" ? bundleId : "n/a"}`,
      `services: ${kind === "services" && services.length > 0 ? services.join(",") : "n/a"}`,
      `oneTimeEstimate: ${estimate ?? "n/a"}`,
      `phone: ${contact.phone.trim() || "n/a"}`,
      `industry: ${industry || "n/a"}`,
      `monthlyLeads: ${initial.monthlyLeads || "n/a"}`,
      `leadValue: ${initial.leadValue || "n/a"}`,
    ].join("\n");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!consentGiven) {
      setSubmitError(
        tr(
          locale,
          "Моля, потвърдете съгласието си за обработка на личните данни.",
          "Please confirm consent to the processing of your personal data.",
        ),
      );
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: contact.name,
      email: contact.email,
      company: contact.company.trim() || (isCall ? "Consultation request" : "N/A"),
      projectType: isCall ? "consultation" : projectTypeValue,
      budget: isCall ? "consultation" : budgetValue,
      message: `${messageValue}${contextLines()}`,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { error?: string; details?: string[] };
        const details = errorBody.details?.join(", ");
        throw new Error(details ?? errorBody.error ?? "Failed to submit lead");
      }

      setSubmitSuccess(true);
      setContact(EMPTY_CONTACT);
      setMessage("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = isSubmitting
    ? tr(locale, "Изпращане…", "Sending…")
    : isCall
      ? tr(locale, "Заявете безплатна среща", "Request a free call")
      : tr(locale, "Изпратете запитването", "Send the inquiry");

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      <section className="atelier-band-dark relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal variant="blur">
              <p className="mb-5 eyebrow-mono text-[var(--color-text-on-dark)]/50">
                {tr(locale, "Контакти · SilexBrand", "Contact · SilexBrand")}
              </p>
            </Reveal>
            <h1 className="text-display text-[var(--color-text-on-dark)]">
              {tr(locale, "Отговор до ", "A reply in ")}
              <span className="text-[var(--accent-10)]">{tr(locale, "2 часа", "2 hours")}</span>.
              <br />
              {tr(locale, "Не до 2 дни.", "Not 2 days.")}
            </h1>
            <Reveal variant="rise" delay={0.14}>
              <p className="mx-auto mt-7 max-w-lg text-lead text-[var(--color-text-on-dark)]/70">
                {tr(
                  locale,
                  "Попълнете формата — ще ви пишем или ще се обадим. Или просто вдигнете телефона, посочен вдясно.",
                  "Fill in the form — we'll email or call you back. Or just call the number on the right.",
                )}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <section className="section pt-16 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-[60%_1fr] lg:gap-16">
            <div className={`${hasSelection ? "order-1" : "order-2"} lg:order-1`}>
              <form id="consultation-form" onSubmit={handleSubmit} className="card scroll-mt-28 space-y-6 p-6 sm:p-8 md:p-10">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label htmlFor="leadKind" className={LABEL}>
                      {tr(locale, "Какво ви интересува", "What are you interested in")}
                    </label>
                    <select
                      id="leadKind"
                      name="leadKind"
                      value={kind}
                      onChange={(e) => {
                        const next = LEAD_KINDS.find((k) => k === e.target.value);
                        if (next) setKind(next);
                      }}
                      className="input"
                    >
                      {LEAD_KINDS.map((k) => (
                        <option key={k} value={k}>
                          {KIND_LABELS[k][locale]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {kind === "bundle" && <BundleSummary bundleId={bundleId} onBundleChange={setBundleId} locale={locale} />}
                  {kind === "services" && (
                    <ServicesSummary
                      services={services}
                      onRemove={(id) => setServices((prev) => removeFromSelection(prev, id))}
                      locale={locale}
                    />
                  )}

                  {!isCall && (
                    <>
                      <div>
                        <label htmlFor="projectType" className={LABEL}>
                          {tr(locale, "Тип проект", "Project type")}
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={projectTypeValue}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="input"
                        >
                          {PROJECT_TYPES.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.label[locale]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className={LABEL}>
                          {tr(locale, "Бюджет за изработка", "One-time budget")}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          required
                          value={budgetValue}
                          onChange={(e) => {
                            const next = BUDGET_IDS.find((b) => b === e.target.value);
                            if (next) setBudget(next);
                          }}
                          className="input"
                        >
                          {BUDGET_IDS.map((b) => (
                            <option key={b} value={b}>
                              {BUDGET_LABELS[b][locale]}
                            </option>
                          ))}
                        </select>
                        {estimate !== null && budget === null && (
                          <p className="mt-1.5 text-caption text-[var(--text-muted)]">
                            {tr(locale, "Попълнено според избора ви, без ДДС.", "Filled in from your selection, excl. VAT.")}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="industry" className={LABEL}>
                          {tr(locale, "Сфера", "Industry")}
                          <span className="ml-1 font-normal text-[var(--text-muted)]">({tr(locale, "по избор", "optional")})</span>
                        </label>
                        <select id="industry" name="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="input">
                          <option value="">{tr(locale, "Изберете сфера", "Select an industry")}</option>
                          {INDUSTRIES.map((id) => (
                            <option key={id} value={id}>
                              {INDUSTRY_LABELS[id][locale]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="section-divider my-4" />

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className={LABEL}>
                      {tr(locale, "Име", "Name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={contact.name}
                      onChange={handleContactChange}
                      className="input"
                      placeholder={tr(locale, "Вашето име", "Your name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={LABEL}>
                      {tr(locale, "Имейл", "Email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={contact.email}
                      onChange={handleContactChange}
                      className="input"
                      placeholder={tr(locale, "вие@имейл.bg", "you@email.com")}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={LABEL}>
                      {tr(locale, "Телефон", "Phone")}
                      <span className="ml-1 font-normal text-[var(--text-muted)]">({tr(locale, "по избор", "optional")})</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={contact.phone}
                      onChange={handleContactChange}
                      className="input"
                      placeholder="+359 ..."
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={LABEL}>
                      {tr(locale, "Фирма", "Company")}
                      {isCall && (
                        <span className="ml-1 font-normal text-[var(--text-muted)]">({tr(locale, "по избор", "optional")})</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required={!isCall}
                      autoComplete="organization"
                      value={contact.company}
                      onChange={handleContactChange}
                      className="input"
                      placeholder={tr(locale, "Името на вашата фирма", "Your company name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className={LABEL}>
                      {tr(locale, "Съобщение", "Message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={MESSAGE_MAX}
                      rows={5}
                      value={messageValue}
                      onChange={(e) => setMessage(e.target.value)}
                      className="input resize-none"
                      placeholder={tr(
                        locale,
                        "Накратко опишете бизнеса и какво ви трябва.",
                        "Briefly describe your business and what you need.",
                      )}
                    />
                  </div>
                </div>

                <label htmlFor="consent" className="flex items-start gap-3 text-small text-[var(--text-sub)]">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--border)] accent-[var(--accent)]"
                  />
                  <span>
                    {tr(locale, "Съгласен съм личните ми данни да бъдат обработени съгласно ", "I agree to have my personal data processed under the ")}
                    <Link href="/privacy" target="_blank" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      {tr(locale, "Политиката за поверителност", "Privacy Policy")}
                    </Link>
                    {tr(locale, ", за да получа отговор на запитването си.", ", so I can receive a reply to my request.")}
                  </span>
                </label>

                {submitError && (
                  <p role="alert" className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 text-small font-medium text-[var(--accent)]">
                    {submitError}
                  </p>
                )}
                {submitSuccess && (
                  <p role="status" className="rounded-xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 p-4 text-small font-medium text-[var(--color-success)]">
                    {tr(
                      locale,
                      "Получихме запитването ви. Ще ви пишем или ще се обадим до 2 часа в работни дни.",
                      "We received your request. We'll email or call you within 2 hours on business days.",
                    )}
                  </p>
                )}

                <button type="submit" disabled={isSubmitting || !consentGiven} className="btn-primary btn-lg group w-full">
                  {submitLabel}
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                {kind === "bundle" && (
                  <p className="text-center text-caption text-[var(--text-muted)]">
                    {tr(
                      locale,
                      `Изпращането не е поръчка — първо ще обсъдим „${getBundle(bundleId).name.bg}“ с вас.`,
                      `Sending this isn't an order — we'll talk “${getBundle(bundleId).name.en}” through with you first.`,
                    )}
                  </p>
                )}
              </form>
            </div>

            <ContactAside locale={locale} isAfterForm={hasSelection} />
          </div>
        </section>
      </Container>
    </div>
  );
}

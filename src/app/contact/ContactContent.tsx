"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Container from "@/components/ui/Container";
import DarkHero from "@/components/ui/DarkHero";
import { useI18n } from "@/lib/i18n";

export default function ContactContent() {
  const { locale } = useI18n();
  const searchParams = useSearchParams();

  const rawIndustry = searchParams.get("industry") ?? "";
  const rawPack = searchParams.get("pack") ?? "";
  const rawIntent = searchParams.get("intent") ?? "";

  const industry = ["retail", "food", "beauty", "medical", "automotive", "property", "professional", "other"].includes(
    rawIndustry,
  )
    ? rawIndustry
    : "";
  const pack = ["start", "grow", "pro"].includes(rawPack) ? rawPack : "";
  const intent = [
    "industry-pack",
    "roi-estimate",
    "starter-pack",
    "grow-pack",
    "pro-pack",
    "consultation",
  ].includes(rawIntent)
    ? rawIntent
    : "consultation";

  const offer = searchParams.get("offer") ?? "first-order-bonus";
  const source = searchParams.get("source") ?? "contact-page";
  const monthlyLeads = searchParams.get("monthlyLeads") ?? "";
  const leadValue = searchParams.get("leadValue") ?? "";

  const defaultProjectType =
    intent === "industry-pack"
      ? "automation"
      : intent === "roi-estimate"
        ? "automation"
        : intent === "starter-pack"
          ? "automation"
          : intent === "grow-pack"
            ? "ai-agent"
            : intent === "pro-pack"
              ? "custom-platform"
              : "automation";

  const defaultBudget =
    pack === "start"
      ? "under-500"
      : pack === "grow"
        ? "500-1500"
        : pack === "pro"
          ? "1500-3000"
          : "500-1500";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: defaultProjectType,
    budget: defaultBudget,
    message: "",
    leadIntent: intent,
    industry,
    requestedPack: pack,
  });
  const [showProjectDetails, setShowProjectDetails] = useState(
    intent !== "consultation",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isConsultation = formData.leadIntent === "consultation";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    const contextLines = [
      "",
      "---",
      "Lead Context",
      `offer: ${offer}`,
      `source: ${source}`,
      `intent: ${formData.leadIntent || "consultation"}`,
      `phone: ${formData.phone.trim() || "n/a"}`,
      `industry: ${formData.industry || "n/a"}`,
      `pack: ${formData.requestedPack || "n/a"}`,
      `monthlyLeads: ${monthlyLeads || "n/a"}`,
      `leadValue: ${leadValue || "n/a"}`,
    ].join("\n");

    const payload = {
      name: formData.name,
      email: formData.email,
      company:
        formData.company.trim() ||
        (isConsultation ? "Consultation request" : "N/A"),
      projectType: isConsultation ? "consultation" : formData.projectType,
      budget: isConsultation ? "consultation" : formData.budget,
      message: `${formData.message}${contextLines}`,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as {
          error?: string;
          details?: string[];
        };
        const details = errorBody.details?.join(", ");
        throw new Error((details ?? errorBody.error) ?? "Failed to submit lead");
      }

      setSubmitSuccess(true);
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-[family-name:var(--font-body)] text-[var(--text-main)]">
      {/* Hero — cinematic dark band */}
      <DarkHero
        image="/images/hero-sphere-dark.png"
        eyebrow={locale === "bg" ? "Свържи се с нас" : "Contact us"}
        title={
          locale === "bg" ? "Заяви безплатна консултация" : "Request a free consultation"
        }
        subtitle={
          locale === "bg"
            ? "Попълнете формата по-долу — ще ви пишем или ще ви се обадим. Можете и директно на телефона."
            : "Fill in the form below — we will email or call you back. You can also call us anytime."
        }
      />

      <Container>
        <section className="section pt-16 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-[60%_1fr] lg:gap-16">
            {/* Form (Left - 60%) */}
            <div className="order-2 lg:order-1">
              <form
                id="consultation-form"
                onSubmit={handleSubmit}
                className="card space-y-6 p-8 md:p-10"
              >
                <div className="flex items-start gap-3 rounded-xl border border-[var(--lime)]/30 bg-[var(--lime)]/10 p-5 text-sm font-medium text-[var(--text-main)]">
                  <div className="mt-0.5 shrink-0 text-[var(--lime)]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <p>
                    {locale === "bg"
                      ? "Първа поръчка: сайт + снимки + кратко видео + free light SEO + free light automation за 1 месец."
                      : "First order: website + photos + short video + free light SEO + free light automation for 1 month."}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className={isConsultation ? "md:col-span-2" : ""}>
                    <label
                      htmlFor="leadIntent"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Тип заявка" : "Request type"}
                    </label>
                    <select
                      id="leadIntent"
                      name="leadIntent"
                      value={formData.leadIntent}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value === "consultation") {
                          setShowProjectDetails(false);
                        } else {
                          setShowProjectDetails(true);
                        }
                      }}
                      className="input"
                    >
                      <option value="consultation">
                        {locale === "bg"
                          ? "Обща консултация"
                          : "General consultation"}
                      </option>
                      <option value="industry-pack">
                        {locale === "bg"
                          ? "Индустриален пакет"
                          : "Industry pack"}
                      </option>
                      <option value="roi-estimate">
                        {locale === "bg" ? "ROI оценка" : "ROI estimate"}
                      </option>
                      <option value="starter-pack">Start</option>
                      <option value="grow-pack">Grow</option>
                      <option value="pro-pack">Pro</option>
                    </select>
                  </div>

                  {showProjectDetails && (
                  <>
                  <div>
                    <label
                      htmlFor="industry"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Сектор" : "Industry"}
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">
                        {locale === "bg" ? "Избери сектор" : "Select sector"}
                      </option>
                      <option value="retail">
                        {locale === "bg" ? "Магазини и Търговски обекти" : "Shops & Retail"}
                      </option>
                      <option value="food">
                        {locale === "bg" ? "Заведения и Ресторанти" : "Restaurants & Cafes"}
                      </option>
                      <option value="beauty">
                        {locale === "bg" ? "Салони за красота и СПА" : "Beauty Salons & Spa"}
                      </option>
                      <option value="medical">
                        {locale === "bg" ? "Лекарски и зъболекарски кабинети" : "Medical & Dental Clinics"}
                      </option>
                      <option value="automotive">
                        {locale === "bg" ? "Автокъщи, автосалони и автосервизи" : "Car Dealerships & Auto Repairs"}
                      </option>
                      <option value="property">
                        {locale === "bg" ? "Имоти, наеми и строителство" : "Real Estate & Property Management"}
                      </option>
                      <option value="professional">
                        {locale === "bg" ? "Свободни професии и услуги" : "Professional Services"}
                      </option>
                      <option value="other">
                        {locale === "bg" ? "Друга сфера" : "Other Sector"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="requestedPack"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg"
                        ? "Интерес към пакет"
                        : "Requested package"}
                    </label>
                    <select
                      id="requestedPack"
                      name="requestedPack"
                      value={formData.requestedPack}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">
                        {locale === "bg" ? "Избери пакет" : "Select package"}
                      </option>
                      <option value="start">Start</option>
                      <option value="grow">Grow</option>
                      <option value="pro">Pro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Тип проект" : "Project type"}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="automation">
                        {locale === "bg" ? "Автоматизации" : "Automations"}
                      </option>
                      <option value="ai-agent">
                        {locale === "bg" ? "AI интеграции" : "AI Integrations"}
                      </option>
                      <option value="web-development">
                        {locale === "bg" ? "Уеб услуги" : "Web Services"}
                      </option>
                      <option value="custom-platform">
                        {locale === "bg" ? "Оптимизация" : "Optimization"}
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="budget"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Бюджет" : "Budget"}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="under-500">
                        {locale === "bg" ? "Под 500 €" : "Under 500 EUR"}
                      </option>
                      <option value="500-1500">500 - 1500 EUR</option>
                      <option value="1500-3000">1500 - 3000 EUR</option>
                      <option value="3000-plus">3000+ EUR</option>
                    </select>
                  </div>
                  </>
                  )}
                </div>

                {isConsultation && !showProjectDetails && (
                  <button
                    type="button"
                    onClick={() => setShowProjectDetails(true)}
                    className="flex w-full items-center justify-center gap-2 text-sm font-medium text-[var(--violet)] transition-colors hover:text-[var(--violet)]/80"
                  >
                    {locale === "bg"
                      ? "Добави детайли за проекта (по избор)"
                      : "Add project details (optional)"}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {isConsultation && showProjectDetails && (
                  <button
                    type="button"
                    onClick={() => setShowProjectDetails(false)}
                    className="flex w-full items-center justify-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-sub)]"
                  >
                    {locale === "bg"
                      ? "Скрий детайлите за проекта"
                      : "Hide project details"}
                    <ChevronUp className="h-4 w-4" />
                  </button>
                )}

                <div className="section-divider my-4" />

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Име" : "Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder={locale === "bg" ? "Твоето име" : "Your name"}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder={
                        locale === "bg" ? "твой@имейл.com" : "you@email.com"
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Телефон" : "Phone"}
                      <span className="ml-1 font-normal text-[var(--text-muted)]">
                        ({locale === "bg" ? "по избор" : "optional"})
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="+359 ..."
                    />
                  </div>

                  {(showProjectDetails || !isConsultation) && (
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Компания" : "Company"}
                      {isConsultation && (
                        <span className="ml-1 font-normal text-[var(--text-muted)]">
                          ({locale === "bg" ? "по избор" : "optional"})
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required={!isConsultation}
                      value={formData.company}
                      onChange={handleChange}
                      className="input"
                      placeholder={
                        locale === "bg" ? "Твоята компания" : "Your company"
                      }
                    />
                  </div>
                  )}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-[family-name:var(--font-display)] text-sm font-[600] text-[var(--text-sub)]"
                    >
                      {locale === "bg" ? "Съобщение" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="input resize-none"
                      placeholder={
                        locale === "bg"
                          ? "Кратко опишете бизнеса и какво ви трябва — ще се обадим."
                          : "Briefly describe your business and what you need — we will contact you."
                      }
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="rounded-xl border border-[var(--coral)]/30 bg-[var(--coral)]/10 p-4 text-sm font-medium text-[var(--coral)]">
                    {submitError}
                  </p>
                )}

                {submitSuccess && (
                  <p className="rounded-xl border border-[var(--lime)]/30 bg-[var(--lime)]/10 p-4 text-sm font-medium text-[var(--lime)]">
                    {locale === "bg"
                      ? "Получихме заявката ви. Ще ви пишем или ще ви се обадим в рамките на 2 часа в работни дни."
                      : "We received your request. We will email or call you within 2 hours on business days."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary btn-lg group w-full"
                >
                  {isSubmitting
                    ? locale === "bg"
                      ? "Изпращане..."
                      : "Sending..."
                    : isConsultation
                      ? locale === "bg"
                        ? "Заяви безплатна консултация"
                        : "Request free consultation"
                      : locale === "bg"
                        ? "Изпрати съобщение"
                        : "Send message"}
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            {/* Contact Info (Right - 40%) */}
            <div className="order-1 space-y-6 lg:order-2">
              <div className="card space-y-8 border-none bg-[var(--bg-section)] p-6 md:p-8">
                <div>
                  <h3 className="mb-6 font-[family-name:var(--font-display)] text-xl font-[700] text-[var(--text-main)]">
                    {locale === "bg" ? "Контакти" : "Contacts"}
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:info@silexbrand.com"
                      className="group card flex items-center gap-4 bg-[var(--bg-card)] p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--violet)]/10 text-[var(--violet)] transition-colors group-hover:bg-[var(--violet)] group-hover:text-white">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                          Email
                        </p>
                        <p className="text-sm font-medium text-[var(--text-main)]">
                          info@silexbrand.com
                        </p>
                      </div>
                    </a>

                    <a
                      href="tel:+359885031865"
                      className="group card flex items-center gap-4 bg-[var(--bg-card)] p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--coral)]/10 text-[var(--coral)] transition-colors group-hover:bg-[var(--coral)] group-hover:text-white">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                          {locale === "bg" ? "Телефон" : "Phone"}
                        </p>
                        <p className="text-sm font-medium text-[var(--text-main)]">
                          +359 88 503 1865
                        </p>
                      </div>
                    </a>

                    <div className="card flex items-center gap-4 bg-[var(--bg-card)] p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--lime)]/10 text-[var(--lime)]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                          {locale === "bg" ? "Локация" : "Location"}
                        </p>
                        <p className="text-sm font-medium text-[var(--text-main)]">
                          {locale === "bg"
                            ? "Варна, България"
                            : "Varna, Bulgaria"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider" />

                {/* Response times */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[var(--text-muted)]" />
                    <h4 className="font-[family-name:var(--font-display)] font-[600] text-[var(--text-main)]">
                      {locale === "bg"
                        ? "Отговаряме в рамките на 2 часа"
                        : "We reply within 2 hours"}
                    </h4>
                  </div>
                  <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 text-sm text-[var(--text-sub)]">
                    <div className="flex justify-between border-b border-[var(--border)] pb-2">
                      <span className="font-medium text-[var(--text-main)]">
                        {locale === "bg" ? "Работни дни" : "Weekdays"}
                      </span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--border)] pb-2">
                      <span className="font-medium text-[var(--text-main)]">
                        {locale === "bg"
                          ? "Вечерна поддръжка"
                          : "Evening support"}
                      </span>
                      <span>
                        {locale === "bg" ? "до 24:00" : "until 24:00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[var(--text-main)]">
                        {locale === "bg" ? "Уикенди" : "Weekends"}
                      </span>
                      <span>
                        {locale === "bg" ? "По договаряне" : "By arrangement"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation — email or call */}
              <div className="card-featured flex flex-col items-center p-6 text-center md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--coral)]/10 text-[var(--coral)]">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-[700] text-[var(--text-main)]">
                  {locale === "bg"
                    ? "Предпочитате да говорите сега?"
                    : "Prefer to talk now?"}
                </h3>
                <p className="mb-6 text-sm text-[var(--text-sub)]">
                  {locale === "bg"
                    ? "Изпратете формата вляво и ще ви отговорим по имейл или телефон. Или се обадете сами — ще уговорим удобен час."
                    : "Submit the form on the left and we will reply by email or phone. Or call us — we will find a time that works."}
                </p>
                <div className="flex w-full flex-col gap-3">
                  <a href="#consultation-form" className="btn-primary w-full">
                    {locale === "bg"
                      ? "Към формата за консултация"
                      : "Go to consultation form"}
                  </a>
                  <a
                    href="tel:+359885031865"
                    className="btn-secondary w-full"
                  >
                    {locale === "bg" ? "Обади се сега" : "Call us now"}
                  </a>
                  <a
                    href="mailto:info@silexbrand.com?subject=Consultation%20request"
                    className="text-sm font-medium text-[var(--violet)] underline-offset-2 hover:underline"
                  >
                    info@silexbrand.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

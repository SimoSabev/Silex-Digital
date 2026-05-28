"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n";

const caseStudies = [
  {
    id: 1,
    company: "TechFlow Solutions",
    industry: { bg: "IT Консултантски", en: "IT Consulting" },
    challenge: {
      bg: "50+ имейла дневно, ръчна обработка на заявки, загубени лийдове поради бавен отговор",
      en: "50+ emails per day, manual request processing, and lost leads because of slow replies",
    },
    solution: {
      bg: "AI помощник за автоматичен отговор, автоматично разпределение на запитванията, свързване на системите",
      en: "AI assistant for automatic replies, automated inquiry routing, and system integration",
    },
    results: {
      bg: [
        "95% автоматизирани отговори",
        "3 часа спестени дневно",
        "40% повече конвертирани лийдове",
        "24 часа средно време за отговор → 2 минути",
      ],
      en: [
        "95% automated responses",
        "3 hours saved daily",
        "40% more converted leads",
        "24-hour average response time -> 2 minutes",
      ],
    },
    metrics: [
      {
        label: { bg: "Автоматизирани отговори", en: "Automated replies" },
        value: "95%",
      },
      { label: { bg: "Повече лийдове", en: "More leads" }, value: "+40%" },
    ],
    testimonial: {
      text: {
        bg: "SilexBrand промени начина по който работим. Вече се фокусираме върху стратегия, не върху имейли.",
        en: "SilexBrand changed the way we work. We now focus on strategy, not emails.",
      },
      author: "Иван Петров",
      role: {
        bg: "Директор, TechFlow Solutions",
        en: "Director, TechFlow Solutions",
      },
    },
  },
  {
    id: 2,
    company: "BulgaryEats Restaurant Group",
    industry: { bg: "Хранене и услуги", en: "Food and hospitality" },
    challenge: {
      bg: "Ръчни резервации, дублирани заявки, загубени клиентски данни, неорганизирано управление",
      en: "Manual bookings, duplicate requests, lost customer data, and disorganized operations",
    },
    solution: {
      bg: "Автоматична онлайн резервация, SMS потвърждения, синхронизация на данни, следене на клиентите",
      en: "Automated online booking, SMS confirmations, data synchronization, and client tracking",
    },
    results: {
      bg: [
        "100% дигитални резервации",
        "75% намаление в дублирани заявки",
        "50% повече онлайн резервации",
        "Автоматизирано управление",
      ],
      en: [
        "100% digital reservations",
        "75% fewer duplicate requests",
        "50% more online reservations",
        "Automated operations",
      ],
    },
    metrics: [
      {
        label: { bg: "Онлайн резервации", en: "Online reservations" },
        value: "+50%",
      },
      {
        label: { bg: "Дублирани заявки", en: "Duplicate requests" },
        value: "-75%",
      },
    ],
    testimonial: {
      text: {
        bg: "Клиентите ни са доволни, че могат да резервират онлайн. Ние се фокусираме върху качеството на услугата.",
        en: "Our clients are happy they can book online. We can now focus on service quality.",
      },
      author: "Мария Георгиева",
      role: { bg: "Управител, BulgaryEats", en: "Manager, BulgaryEats" },
    },
  },
  {
    id: 3,
    company: "ZenDesign Studio",
    industry: { bg: "Дизайн и маркетинг", en: "Design and marketing" },
    challenge: {
      bg: "Сложни проектни процеси, пропуснати одобрения, закъснения в доставката",
      en: "Complex project processes, missed approvals, and delivery delays",
    },
    solution: {
      bg: "Персонализиран процес на одобрение, автоматични напомняния, проследяване на статус, клиентски портал",
      en: "Custom approval process, automated reminders, status tracking, and client portal",
    },
    results: {
      bg: [
        "30% по-бързи проекти",
        "0 пропуснати крайни срокове",
        "98% доволни клиенти",
        "Отговори в рамките на 1 час",
      ],
      en: [
        "30% faster projects",
        "0 missed deadlines",
        "98% client satisfaction",
        "Responses within 1 hour",
      ],
    },
    metrics: [
      {
        label: { bg: "По-бързи проекти", en: "Faster projects" },
        value: "30%",
      },
      {
        label: { bg: "Доволни клиенти", en: "Client satisfaction" },
        value: "98%",
      },
    ],
    testimonial: {
      text: {
        bg: "Системата дава спокойствие на целия екип. Всеки знае точно какво се случва в проекта.",
        en: "The system gives peace of mind to the whole team. Everyone knows exactly what is happening in each project.",
      },
      author: "Александър Михайлов",
      role: {
        bg: "Собственик, ZenDesign Studio",
        en: "Owner, ZenDesign Studio",
      },
    },
  },
];

export default function CaseStudiesPage() {
  const { locale } = useI18n();

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-[family-name:var(--font-body)] text-[var(--text-main)]">
      <Container>
        <section className="section pb-12">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
            <span className="badge badge-lime mb-4">
              {locale === "bg" ? "Казуси на успеха" : "Success stories"}
            </span>
            <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl leading-tight font-[700] tracking-tight md:text-5xl lg:text-[56px]">
              {locale === "bg"
                ? "Реални резултати от реални бизнеси"
                : "Real results from real businesses"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-sub)] md:text-xl">
              {locale === "bg"
                ? "Виж как реални бизнеси в България спряха да изпускат клиенти и започнаха да печелят повече — без да работят повече часа."
                : "See how real Bulgarian businesses stopped losing clients and started earning more — without working more hours."}
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-16 md:space-y-24">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:flex-row"
              >
                {/* Image Placeholder with Hover Zoom */}
                <div className="relative h-64 w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-section)] md:h-auto md:w-2/5 md:border-r md:border-b-0">
                  <div className="absolute inset-0 bg-linear-to-br from-[var(--violet)] to-[var(--coral)] opacity-10 transition-opacity duration-500 group-hover:opacity-20" />
                  <div className="absolute inset-0 flex scale-100 transform items-center justify-center font-[family-name:var(--font-display)] text-2xl font-bold tracking-wider text-[var(--text-muted)] uppercase opacity-30 transition-transform duration-500 group-hover:scale-105">
                    {study.company.substring(0, 2)} Image
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-neutral border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-sm">
                      {study.industry[locale]}
                    </span>
                  </div>
                </div>

                <div className="flex w-full flex-col justify-between p-6 md:w-3/5 md:p-10 lg:p-12">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="font-[family-name:var(--font-display)] text-3xl font-[700] text-[var(--text-main)]">
                        {study.company}
                      </h3>
                      <TrendingUp className="h-6 w-6 shrink-0 text-[var(--lime)]" />
                    </div>

                    <div className="mb-8 grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                          {locale === "bg" ? "Преди" : "Before"}
                        </h4>
                        <p className="text-sm text-[var(--text-sub)]">
                          {study.challenge[locale]}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                          {locale === "bg" ? "След" : "After"}
                        </h4>
                        <p className="text-sm text-[var(--text-sub)]">
                          {study.solution[locale]}
                        </p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="mb-10 flex flex-wrap gap-8 border-b border-[var(--border)] pb-8">
                      {study.metrics.map((metric, i) => (
                        <div key={i}>
                          <p className="font-[family-name:var(--font-mono)] text-3xl font-bold tracking-tight text-[var(--lime)] tabular-nums md:text-4xl">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-sm font-medium text-[var(--text-sub)]">
                            {metric.label[locale]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial & Link */}
                  <div>
                    <blockquote className="mb-6 border-l-4 border-[var(--violet)] pl-4">
                      <p className="text-base font-medium text-[var(--text-main)] italic">
                        "{study.testimonial.text[locale]}"
                      </p>
                      <footer className="mt-3">
                        <p className="text-sm font-semibold text-[var(--text-main)]">
                          {study.testimonial.author}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {study.testimonial.role[locale]}
                        </p>
                      </footer>
                    </blockquote>

                    <Link
                      href="/contact"
                      className="group/link inline-flex items-center gap-2 font-[family-name:var(--font-display)] font-[600] text-[var(--coral)] transition-colors hover:text-[var(--coral-hover)]"
                    >
                      {locale === "bg" ? "Прочети повече" : "Read more"}
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="card-featured mx-auto mt-16 max-w-4xl p-10 text-center md:mt-24 md:p-16">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-[700] text-[var(--text-main)]">
              {locale === "bg"
                ? "Готов ли си да постигнеш подобни резултати?"
                : "Ready to achieve similar results?"}
            </h2>
            <p className="mb-8 text-lg text-[var(--text-sub)]">
              {locale === "bg"
                ? "Свържи се с нас днес и открий как SilexBrand може да трансформира твоя бизнес."
                : "Contact us today and discover how SilexBrand can transform your business."}
            </p>
            <Link
              href="/contact"
              className="btn-primary btn-lg group inline-flex"
            >
              {locale === "bg" ? "Започни сега" : "Get started now"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}

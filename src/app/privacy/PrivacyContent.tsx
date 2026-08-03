"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

type Block = { h: string; p: (string | string[])[] };

const CONTENT: Record<"bg" | "en", { updated: string; intro: string; blocks: Block[] }> = {
  bg: {
    updated: "Последна актуализация: август 2026",
    intro:
      "SilexBrand EOOD (\"ние\", \"нас\"), със седалище във Варна, България, е администратор на лични данни за посетителите и клиентите на silexbrand.com. Този документ обяснява какви данни събираме, защо, за колко време ги пазим и какви права имате.",
    blocks: [
      {
        h: "1. Кой обработва данните ви",
        p: [
          "SilexBrand EOOD, гр. Варна, България. ЕИК: [попълва се от собственика на бизнеса — задължително преди публикуване]. Имейл за въпроси, свързани с лични данни: info@silexbrand.com.",
        ],
      },
      {
        h: "2. Какви данни събираме",
        p: [
          [
            "Данни от формата за контакт: име, имейл, телефон (по избор), компания (по избор), тип запитване и съобщението, което въвеждате.",
            "Технически данни от посещението на сайта: обобщена, анонимизирана статистика за трафик и представяне (Vercel Analytics и Speed Insights) — без рекламни бисквитки и без проследяване между сайтове.",
          ],
        ],
      },
      {
        h: "3. Защо ги обработваме и на какво основание",
        p: [
          [
            "За да отговорим на заявка за консултация или оферта — на основание вашето съгласие/инициатива за контакт (чл. 6, §1, б. \"б\" GDPR — предприемане на стъпки по договор по ваше искане).",
            "За подобряване на сайта чрез обобщена статистика — на основание законен интерес (чл. 6, §1, б. \"е\" GDPR), без индивидуално профилиране.",
          ],
        ],
      },
      {
        h: "4. С кого споделяме данни",
        p: [
          [
            "Resend — доставчик за изпращане на имейл известия при нова заявка.",
            "Supabase — база данни, в която се съхраняват изпратените запитвания.",
            "Vercel — хостинг на сайта и обобщена аналитика.",
            "Не продаваме и не споделяме данните ви с трети страни за маркетингови цели.",
          ],
        ],
      },
      {
        h: "5. Срок на съхранение",
        p: [
          "Пазим данните от формата за контакт, докато трае комуникацията и евентуалното бизнес взаимоотношение, а при сключен договор — за срока, изискван от българското счетоводно и данъчно законодателство. При липса на отговор от ваша страна изтриваме запитването в разумен срок, но не по-дълъго от 24 месеца.",
        ],
      },
      {
        h: "6. Вашите права по GDPR",
        p: [
          [
            "Достъп до данните, които съхраняваме за вас.",
            "Коригиране на неточни данни.",
            "Изтриване (\"право да бъдеш забравен\").",
            "Ограничаване или възражение срещу обработването.",
            "Преносимост на данните.",
            "Жалба до Комисията за защита на личните данни (КЗЛД), ако смятате, че правата ви са нарушени.",
          ],
          "За да упражните някое от тези права, пишете ни на info@silexbrand.com — отговаряме в рамките на 30 дни.",
        ],
      },
      {
        h: "7. Бисквитки",
        p: [
          "Сайтът не използва рекламни или проследяващи бисквитки на трети страни. Аналитичните инструменти, които използваме, не разчитат на бисквитки за идентифициране на отделен посетител.",
        ],
      },
      {
        h: "8. Промени в тази политика",
        p: [
          "Можем да актуализираме тази политика при промяна на услугите или законодателството. Датата по-горе показва последната актуализация.",
        ],
      },
    ],
  },
  en: {
    updated: "Last updated: August 2026",
    intro:
      "SilexBrand EOOD (\"we\", \"us\"), based in Varna, Bulgaria, is the data controller for visitors and clients of silexbrand.com. This document explains what data we collect, why, how long we keep it, and what rights you have.",
    blocks: [
      {
        h: "1. Who processes your data",
        p: [
          "SilexBrand EOOD, Varna, Bulgaria. Company registration number (EIK): [to be filled in by the business owner — required before publishing]. Contact for data-related questions: info@silexbrand.com.",
        ],
      },
      {
        h: "2. What data we collect",
        p: [
          [
            "Contact form data: name, email, phone (optional), company (optional), request type, and the message you enter.",
            "Technical site-visit data: aggregated, anonymized traffic and performance statistics (Vercel Analytics and Speed Insights) — no advertising cookies, no cross-site tracking.",
          ],
        ],
      },
      {
        h: "3. Why we process it and the legal basis",
        p: [
          [
            "To respond to a consultation or quote request — based on your consent/initiative to contact us (GDPR Art. 6(1)(b) — steps taken at your request prior to a contract).",
            "To improve the site through aggregated statistics — based on legitimate interest (GDPR Art. 6(1)(f)), without individual profiling.",
          ],
        ],
      },
      {
        h: "4. Who we share data with",
        p: [
          [
            "Resend — email delivery provider for new-lead notifications.",
            "Supabase — database where submitted inquiries are stored.",
            "Vercel — site hosting and aggregated analytics.",
            "We do not sell or share your data with third parties for marketing purposes.",
          ],
        ],
      },
      {
        h: "5. Retention period",
        p: [
          "We keep contact-form data for as long as the conversation or business relationship continues, and — once a contract is signed — for the period required by Bulgarian accounting and tax law. If you don't respond, we delete the inquiry within a reasonable period, no longer than 24 months.",
        ],
      },
      {
        h: "6. Your rights under GDPR",
        p: [
          [
            "Access to the data we hold about you.",
            "Correction of inaccurate data.",
            "Erasure (\"right to be forgotten\").",
            "Restriction of, or objection to, processing.",
            "Data portability.",
            "Complaint to Bulgaria's Commission for Personal Data Protection (CPDP) if you believe your rights were violated.",
          ],
          "To exercise any of these rights, email info@silexbrand.com — we respond within 30 days.",
        ],
      },
      {
        h: "7. Cookies",
        p: [
          "The site does not use advertising or third-party tracking cookies. The analytics tools we use do not rely on cookies to identify individual visitors.",
        ],
      },
      {
        h: "8. Changes to this policy",
        p: [
          "We may update this policy as our services or the law change. The date above reflects the last update.",
        ],
      },
    ],
  },
};

export default function PrivacyContent() {
  const { locale } = useI18n();
  const data = CONTENT[locale];

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-[family-name:var(--font-body)] text-[var(--text-main)]">
      <section className="atelier-band-dark relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal variant="blur">
              <p className="mb-5 font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text-on-dark)]/40 uppercase">
                {locale === "bg" ? "Поверителност · SilexBrand" : "Privacy · SilexBrand"}
              </p>
            </Reveal>
            <h1 className="font-display text-[2.25rem] leading-[1.05] font-extrabold tracking-tight text-[var(--color-text-on-dark)] sm:text-[3rem]">
              {locale === "bg" ? "Политика за поверителност" : "Privacy Policy"}
            </h1>
            <p className="mt-4 text-sm text-[var(--color-text-on-dark)]/50">{data.updated}</p>
          </div>
        </Container>
      </section>

      <Container>
        <section className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-3xl">
            <div className="card space-y-10 p-8 md:p-10">
              <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">{data.intro}</p>

              {data.blocks.map((block) => (
                <div key={block.h}>
                  <h2 className="mb-3 font-[family-name:var(--font-display)] text-lg font-[700] text-[var(--text-main)]">
                    {block.h}
                  </h2>
                  <div className="space-y-3 text-[15px] leading-relaxed text-[var(--text-sub)]">
                    {block.p.map((item, i) =>
                      Array.isArray(item) ? (
                        <ul key={i} className="list-disc space-y-1.5 pl-5">
                          {item.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{item}</p>
                      ),
                    )}
                  </div>
                </div>
              ))}

              <div className="section-divider" />

              <p className="text-sm text-[var(--text-muted)]">
                {locale === "bg" ? (
                  <>
                    Свързани документи:{" "}
                    <Link href="/terms" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Общи условия
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Related documents:{" "}
                    <Link href="/terms" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Terms of Service
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

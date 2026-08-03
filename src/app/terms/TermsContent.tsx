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
      "Тези общи условия уреждат отношенията между SilexBrand EOOD (\"SilexBrand\", \"ние\") и клиент, който поръчва уебсайт, AI асистент, автоматизация или свързана услуга през silexbrand.com или по друг договорен начин.",
    blocks: [
      {
        h: "1. Услугите",
        p: [
          "Точният обхват на всяка услуга (Start, Grow, Pro или индивидуална оферта) се договаря писмено преди началото на работа — по имейл или в отделен договор — и включва конкретните артикули, изброени на страницата за цени към датата на офертата.",
        ],
      },
      {
        h: "2. Цени и плащане",
        p: [
          [
            "Цената за изработка (еднократна) се дължи съгласно договорения график — обичайно част авансово, остатъкът при предаване.",
            "Месечният абонамент (поддръжка/AI асистент) се таксува предварително за съответния месец и може да бъде платен и на годишна база с договорената отстъпка.",
            "Няма скрити такси извън изрично описаните в офертата и финансовия одит на съответния план.",
          ],
        ],
      },
      {
        h: "3. Анулиране и възстановяване на еднократната такса",
        p: [
          [
            "Преди да започне работа по проекта: пълно възстановяване на аванса.",
            "След начало на работа, но преди предаване: възстановяваме частта от аванса, която надвишава реално извършената работа към момента на анулиране — оценена добросъвестно спрямо изпълнените етапи.",
            "След предаване и приемане на проекта: еднократната такса за изработка не подлежи на възстановяване.",
          ],
        ],
      },
      {
        h: "4. Месечен абонамент — прекратяване",
        p: [
          "Месечните планове са без дългосрочно обвързване. Можете да прекратите с 30-дневно писмено предизвестие на info@silexbrand.com. Не начисляваме такси за прекратяване. Вече платени месеци не се възстановяват пропорционално, освен ако друго не е уговорено писмено.",
        ],
      },
      {
        h: "5. Отговорности на SilexBrand",
        p: [
          "Полагаме грижа изработката да съответства на договорения обхват и да бъде доставена в разумен срок. AI асистентът отговаря въз основа на предоставената от клиента информация (цени, услуги, правила) — SilexBrand не носи отговорност за неточности, произтичащи от остаряла или непълна информация, предоставена от клиента.",
        ],
      },
      {
        h: "6. Отговорности на клиента",
        p: [
          "Клиентът предоставя навреме необходимите материали (текстове, снимки, достъп до акаунти), актуална и точна информация за цени/услуги за обучение на AI асистента, и заплаща договорените суми в срок.",
        ],
      },
      {
        h: "7. Интелектуална собственост",
        p: [
          "След пълно заплащане на еднократната такса за изработка, клиентът получава правата на ползване върху доставения сайт/система за собствения си бизнес. SilexBrand запазва правото да използва обезличени резултати (без вашите поверителни данни) като портфолио, освен ако изрично не е уговорено друго.",
        ],
      },
      {
        h: "8. Ограничение на отговорността",
        p: [
          "SilexBrand не носи отговорност за пропуснати ползи или косвени вреди, произтичащи от временна недостъпност на трети страни (хостинг доставчици, Viber/Meta платформи, доставчици на AI модели), извън нашия контрол.",
        ],
      },
      {
        h: "9. Приложимо право",
        p: [
          "Тези условия се уреждат от българското законодателство. Спорове, които не могат да се разрешат доброволно, се отнасят пред компетентния български съд.",
        ],
      },
    ],
  },
  en: {
    updated: "Last updated: August 2026",
    intro:
      "These Terms govern the relationship between SilexBrand EOOD (\"SilexBrand\", \"we\") and a client ordering a website, AI assistant, automation, or related service through silexbrand.com or another agreed channel.",
    blocks: [
      {
        h: "1. The services",
        p: [
          "The exact scope of each service (Start, Grow, Pro, or a custom quote) is agreed in writing before work begins — by email or a separate contract — and includes the specific items listed on the pricing page as of the quote date.",
        ],
      },
      {
        h: "2. Pricing and payment",
        p: [
          [
            "The one-time setup fee is due per the agreed schedule — typically part upfront, the remainder on delivery.",
            "The monthly subscription (support/AI assistant) is billed in advance for the relevant month, and can also be paid annually at the agreed discount.",
            "There are no hidden fees beyond what's explicitly described in the quote and the financial breakdown for that plan.",
          ],
        ],
      },
      {
        h: "3. Cancellation and refund of the one-time fee",
        p: [
          [
            "Before work on the project begins: full refund of any deposit.",
            "After work begins but before delivery: we refund the portion of the deposit exceeding work actually performed at the time of cancellation, assessed in good faith against completed milestones.",
            "After delivery and acceptance of the project: the one-time setup fee is non-refundable.",
          ],
        ],
      },
      {
        h: "4. Monthly subscription — termination",
        p: [
          "Monthly plans carry no long-term lock-in. You may cancel with 30 days' written notice to info@silexbrand.com. We charge no cancellation fees. Months already paid are not refunded pro-rata unless otherwise agreed in writing.",
        ],
      },
      {
        h: "5. SilexBrand's responsibilities",
        p: [
          "We take care to deliver work matching the agreed scope within a reasonable timeframe. The AI assistant answers based on information the client provides (prices, services, rules) — SilexBrand is not liable for inaccuracies stemming from outdated or incomplete information supplied by the client.",
        ],
      },
      {
        h: "6. Client responsibilities",
        p: [
          "The client provides required materials on time (copy, photos, account access), keeps pricing/service information used to train the AI assistant accurate and current, and pays agreed amounts on schedule.",
        ],
      },
      {
        h: "7. Intellectual property",
        p: [
          "Once the one-time setup fee is paid in full, the client receives usage rights to the delivered site/system for their own business. SilexBrand retains the right to use anonymized results (excluding your confidential data) as portfolio material, unless otherwise explicitly agreed.",
        ],
      },
      {
        h: "8. Limitation of liability",
        p: [
          "SilexBrand is not liable for lost profits or indirect damages arising from temporary unavailability of third parties (hosting providers, Viber/Meta platforms, AI model providers) outside our control.",
        ],
      },
      {
        h: "9. Governing law",
        p: [
          "These Terms are governed by Bulgarian law. Disputes that cannot be resolved amicably are referred to the competent Bulgarian court.",
        ],
      },
    ],
  },
};

export default function TermsContent() {
  const { locale } = useI18n();
  const data = CONTENT[locale];

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-[family-name:var(--font-body)] text-[var(--text-main)]">
      <section className="atelier-band-dark relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal variant="blur">
              <p className="mb-5 font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text-on-dark)]/40 uppercase">
                {locale === "bg" ? "Общи условия · SilexBrand" : "Terms · SilexBrand"}
              </p>
            </Reveal>
            <h1 className="font-display text-[2.25rem] leading-[1.05] font-extrabold tracking-tight text-[var(--color-text-on-dark)] sm:text-[3rem]">
              {locale === "bg" ? "Общи условия" : "Terms of Service"}
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
                    <Link href="/privacy" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Политика за поверителност
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Related documents:{" "}
                    <Link href="/privacy" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Privacy Policy
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

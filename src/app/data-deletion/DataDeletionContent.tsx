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
      "Ако сте писали на бизнес, който използва AI асистента на SilexBrand във Viber, Messenger, WhatsApp или на своя сайт, тази страница обяснява как да поискате изтриване на съобщенията и данните, свързани с вашия разговор.",
    blocks: [
      {
        h: "1. Какво се изтрива",
        p: [
          [
            "Съдържанието на изпратените от вас съобщения и прикачени файлове.",
            "Идентификатори на подателя (напр. Viber/Messenger ID) и времеви маркери.",
            "Всякакви контактни данни, въведени от вас в разговора (име, телефон, имейл).",
          ],
          "Запазваме единствено обобщени, анонимизирани статистики (напр. брой запитвания на ден), от които не може да бъдете разпознати, както и счетоводни записи, изисквани по закон от бизнеса, с когото сте общували.",
        ],
      },
      {
        h: "2. Как да поискате изтриване",
        p: [
          [
            "През Meta (Facebook/Instagram/Messenger): в настройките на вашия Facebook или Instagram профил можете да прекратите достъпа на конкретния бизнес до съобщенията ви — това автоматично задейства заявка за изтриване на нашата страна в рамките на около 30 дни.",
            "По имейл: пишете ни на info@silexbrand.com от имейла или с телефонния номер, използван в разговора, и посочете за кой бизнес/канал се отнася заявката. Отговаряме и изпълняваме изтриването в рамките на 30 дни.",
            "Чрез бизнеса, с когото сте общували: той може директно да поиска изтриване на вашите данни от нашата система.",
          ],
        ],
      },
      {
        h: "3. Правно основание",
        p: [
          "Тази процедура изпълнява правото на изтриване по чл. 17 GDPR (\"право да бъдеш забравен\") и изискванията на Meta Platform Terms за приложения, обработващи съобщения през Messenger/Instagram.",
        ],
      },
      {
        h: "4. Кога не изтриваме веднага",
        p: [
          "Ако вече е сключен договор или е издадена фактура въз основа на разговора, пазим необходимия минимум данни за счетоводни и данъчни цели за законово изисквания срок, дори при заявка за изтриване на останалите данни.",
        ],
      },
    ],
  },
  en: {
    updated: "Last updated: August 2026",
    intro:
      "If you've messaged a business that uses SilexBrand's AI assistant on Viber, Messenger, WhatsApp, or their website, this page explains how to request deletion of your messages and conversation data.",
    blocks: [
      {
        h: "1. What gets deleted",
        p: [
          [
            "The content of messages and attachments you sent.",
            "Sender identifiers (e.g. Viber/Messenger ID) and timestamps.",
            "Any contact details you shared in the conversation (name, phone, email).",
          ],
          "We only retain aggregated, anonymized statistics (e.g. inquiries per day) that cannot identify you, and accounting records the business you contacted is legally required to keep.",
        ],
      },
      {
        h: "2. How to request deletion",
        p: [
          [
            "Via Meta (Facebook/Instagram/Messenger): in your Facebook or Instagram settings, you can revoke that business's access to your messages — this automatically triggers a deletion request on our side within about 30 days.",
            "By email: write to info@silexbrand.com from the email or phone number used in the conversation, and note which business/channel the request concerns. We respond and complete deletion within 30 days.",
            "Through the business you contacted: they can request deletion of your data from our system directly.",
          ],
        ],
      },
      {
        h: "3. Legal basis",
        p: [
          "This procedure fulfills the right to erasure under GDPR Art. 17 (\"right to be forgotten\") and Meta Platform Terms' requirements for apps processing messages via Messenger/Instagram.",
        ],
      },
      {
        h: "4. When we don't delete immediately",
        p: [
          "If a contract has already been signed or an invoice issued based on the conversation, we keep the minimum data required for accounting and tax purposes for the legally required period, even if you request deletion of the rest.",
        ],
      },
    ],
  },
};

export default function DataDeletionContent() {
  const { locale } = useI18n();
  const data = CONTENT[locale];

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] font-body text-[var(--text-main)]">
      <section className="atelier-band-dark relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal variant="blur">
              <p className="mb-5 eyebrow-mono text-[var(--color-text-on-dark)]/40">
                {locale === "bg" ? "Изтриване на данни · SilexBrand" : "Data Deletion · SilexBrand"}
              </p>
            </Reveal>
            <h1 className="text-h1 text-[var(--color-text-on-dark)]">
              {locale === "bg" ? "Инструкции за изтриване на данни" : "Data Deletion Instructions"}
            </h1>
            <p className="mt-4 text-small text-[var(--color-text-on-dark)]/50">{data.updated}</p>
          </div>
        </Container>
      </section>

      <Container>
        <section className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-3xl">
            <div className="card space-y-10 p-8 md:p-10">
              <p className="max-w-prose text-body text-[var(--text-sub)]">{data.intro}</p>

              {data.blocks.map((block) => (
                <div key={block.h}>
                  <h2 className="mb-3 text-h4 text-[var(--text-main)]">
                    {block.h}
                  </h2>
                  <div className="max-w-prose space-y-3 text-body text-[var(--text-sub)]">
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

              <p className="text-small text-[var(--text-muted)]">
                {locale === "bg" ? (
                  <>
                    Свързани документи:{" "}
                    <Link href="/privacy" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Политика за поверителност
                    </Link>{" "}
                    ·{" "}
                    <Link href="/terms" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Общи условия
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Related documents:{" "}
                    <Link href="/privacy" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    ·{" "}
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

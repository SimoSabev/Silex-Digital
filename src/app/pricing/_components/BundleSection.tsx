"use client";

import { Reveal } from "@/components/ui/Reveal";
import { bundles, type Bundle, type Locale } from "@/lib/offer";
import BundleCard from "./BundleCard";
import { tr } from "./offer-utils";

export type Audience = Bundle["audience"];

const GROUPS: readonly { audience: Audience; label: { bg: string; en: string } }[] = [
  { audience: "new-business", label: { bg: "Започвате от нула", en: "Starting from scratch" } },
  { audience: "existing-business", label: { bg: "Вече имате бизнес", en: "Already in business" } },
];

type Props = {
  locale: Locale;
  /** Which group is shown on phones (both are always shown from md up). */
  audience: Audience;
  onAudienceChange: (audience: Audience) => void;
};

export default function BundleSection({ locale, audience, onAudienceChange }: Props) {
  return (
    <section id="bundles" aria-labelledby="bundles-title" className="relative z-10 mb-28 scroll-mt-28">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 eyebrow text-[var(--accent)]">{tr(locale, "Пакети", "Bundles")}</p>
        <Reveal variant="rise">
          <h2 id="bundles-title" className="mb-4 text-h2 text-[var(--text-main)]">
            {tr(locale, "Четири пакета, всеки по-евтин от частите си", "Four bundles, each cheaper than its parts")}
          </h2>
        </Reveal>
        <p className="text-body text-[var(--text-sub)]">
          {tr(
            locale,
            "На всяка карта виждате колко струват същите услуги поотделно и колко спестявате. Всички цени са без ДДС.",
            "Every card shows what the same services cost separately and how much you save. All prices exclude VAT.",
          )}
        </p>
      </div>

      {/* Phones: one group at a time. */}
      <div role="group" aria-label={tr(locale, "Изберете ситуация", "Choose your situation")} className="mb-8 grid grid-cols-2 gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-1 md:hidden">
        {GROUPS.map((group) => {
          const isActive = group.audience === audience;
          return (
            <button
              key={group.audience}
              type="button"
              aria-pressed={isActive}
              onClick={() => onAudienceChange(group.audience)}
              className={`rounded-full px-3 py-2.5 text-small font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                isActive ? "bg-[var(--accent)] text-[var(--accent-text)]" : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
              }`}
            >
              {group.label[locale]}
            </button>
          );
        })}
      </div>

      <div className="space-y-14">
        {GROUPS.map((group) => (
          <div key={group.audience} className={group.audience === audience ? "block" : "hidden md:block"}>
            <p className="mb-5 hidden items-center gap-4 eyebrow text-[var(--text-muted)] md:flex">
              {group.label[locale]}
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {bundles
                .filter((b) => b.audience === group.audience)
                .map((bundle) => (
                  <BundleCard key={bundle.id} bundle={bundle} locale={locale} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

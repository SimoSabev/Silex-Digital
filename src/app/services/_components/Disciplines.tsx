"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useTilt } from "@/lib/useTilt";
import { serviceCategories, servicesByCategory, type Locale, type ServiceItem } from "@/lib/offer";
import { disciplines, type DisciplineCopy } from "./categoryCopy";
import { VAT_NOTE } from "./prices";
import PriceTag from "./PriceTag";
import CareNote from "./CareNote";

const TILT_DEG = 3;

const categoryName = (id: DisciplineCopy["id"], locale: Locale): string =>
  serviceCategories.find((c) => c.id === id)?.name[locale] ?? id;

function BeforeAfterChip({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-small font-semibold">
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[var(--color-text-on-dark)]/50 line-through">
        {before}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-text-on-dark)]/30" aria-hidden />
      <span className="rounded-full border border-[var(--accent-10)]/30 bg-[var(--accent-10)]/10 px-3 py-1.5 text-[var(--accent-10)]">
        {after}
      </span>
    </div>
  );
}

function ServiceRow({ svc, locale }: { svc: ServiceItem; locale: Locale }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/[0.08] py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1 basis-48">
        <p className="text-body font-semibold text-[var(--color-text-on-dark)]">{svc.name[locale]}</p>
        <p className="text-small text-[var(--color-text-on-dark)]/50">{svc.summary[locale]}</p>
      </div>
      <PriceTag svc={svc} locale={locale} className="text-right" />
    </li>
  );
}

function DisciplineCaseFile({
  discipline,
  index,
  locale,
}: {
  discipline: DisciplineCopy;
  index: number;
  locale: Locale;
}) {
  const tilt = useTilt(TILT_DEG);
  const isEven = index % 2 === 1;
  const Icon = discipline.icon;
  const items = servicesByCategory(discipline.id);
  const number = String(index + 1).padStart(2, "0");
  const title = categoryName(discipline.id, locale);

  return (
    <article
      aria-labelledby={`discipline-${discipline.id}`}
      className="grid gap-8 border-t border-white/10 py-14 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-14 md:py-20"
    >
      <span aria-hidden className="text-display font-mono nums text-white/[0.08]">
        {number}
      </span>

      <Reveal variant="rise" className={isEven ? "md:order-3" : ""}>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-10)]/15 text-[var(--accent-10)]">
          <Icon size={24} aria-hidden />
        </div>
        <h3 id={`discipline-${discipline.id}`} className="mb-4 text-h2 text-[var(--color-text-on-dark)]">
          {title}
        </h3>
        <p className="mb-6 max-w-md text-lead text-[var(--color-text-on-dark)]/65">{discipline.promise[locale]}</p>
        <div className="mb-7">
          <BeforeAfterChip before={discipline.before[locale]} after={discipline.after[locale]} />
        </div>
        <Link
          href="/pricing#services"
          className="inline-flex items-center gap-1.5 text-small font-bold text-[var(--accent-10)] transition-opacity hover:opacity-75"
        >
          {locale === "bg" ? "Вижте цените" : "See the prices"}
          <span className="sr-only">{` — ${title}`}</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>

      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:p-7 ${isEven ? "md:order-2" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="mb-5 eyebrow-mono text-[var(--color-text-on-dark)]/35">
          {locale === "bg" ? `Направление ${number} · цени` : `Discipline ${number} · prices`}
        </p>
        <ul>
          {items.map((svc) => (
            <ServiceRow key={svc.id} svc={svc} locale={locale} />
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Disciplines({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  return (
    <section className="border-t border-white/10 pt-20 md:pt-28" aria-labelledby="disciplines-title">
      <Container>
        <Reveal className="mb-10 max-w-xl md:mb-14">
          <p className="mb-3 eyebrow-mono text-[var(--color-text-on-dark)]/40">{bg ? "Услуги" : "Services"}</p>
          <h2 id="disciplines-title" className="mb-4 text-h2 text-[var(--color-text-on-dark)]">
            {bg ? "Шестте направления" : "The six disciplines"}
          </h2>
          <p className="text-lead text-[var(--color-text-on-dark)]/60">
            {bg
              ? "Всяко направление има собствени услуги и цени. Изберете едно или ги съчетайте."
              : "Each discipline has its own services and prices. Pick one or combine them."}
          </p>
        </Reveal>

        {disciplines.map((d, i) => (
          <DisciplineCaseFile key={d.id} discipline={d} index={i} locale={locale} />
        ))}

        <CareNote locale={locale} />
        <p className="pb-20 pt-6 text-caption text-[var(--color-text-on-dark)]/40 md:pb-28">{VAT_NOTE[locale]}</p>
      </Container>
    </section>
  );
}

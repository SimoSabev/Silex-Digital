"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarRange, FileCheck2, MonitorPlay, ReceiptText, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { useI18n, type TranslationKey } from "@/lib/i18n";

type ProofItem = { icon: LucideIcon; title: TranslationKey; body: TranslationKey; href?: string };

// Replaces the former testimonials carousel: only claims a visitor can verify on this site.
const ITEMS: readonly ProofItem[] = [
  { icon: ReceiptText, title: "home.proof.item1.title", body: "home.proof.item1.body", href: "/pricing" },
  { icon: MonitorPlay, title: "home.proof.item2.title", body: "home.proof.item2.body", href: "/demos" },
  { icon: FileCheck2, title: "home.proof.item3.title", body: "home.proof.item3.body" },
  { icon: CalendarRange, title: "home.proof.item4.title", body: "home.proof.item4.body", href: "/pricing" },
];

export default function ProofSection() {
  const { t } = useI18n();

  return (
    <section className="atelier-band-dark relative overflow-hidden border-y border-white/10 py-16 md:py-24 lg:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <h2 className="text-h2 text-[var(--color-text-on-dark)]">{t("home.proof.title")}</h2>
          <p className="mt-4 text-lead text-[var(--color-text-on-dark)]/70">{t("home.proof.sub")}</p>
        </div>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, body, href }) => {
            const content = (
              <>
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[var(--accent-10)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mb-2 text-h4 text-[var(--color-text-on-dark)]">{t(title)}</h3>
                <p className="text-small text-[var(--color-text-on-dark)]/70">{t(body)}</p>
                {href && (
                  <ArrowUpRight
                    className="absolute top-6 right-6 h-4 w-4 text-[var(--color-text-on-dark)]/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-10)]"
                    aria-hidden
                  />
                )}
              </>
            );
            const cardClass =
              "group relative block h-full rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-colors duration-300";
            return (
              <StaggerItem key={title}>
                {href ? (
                  <Link href={href} className={`${cardClass} hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-[var(--accent-10)]`}>
                    {content}
                  </Link>
                ) : (
                  <div className={cardClass}>{content}</div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}

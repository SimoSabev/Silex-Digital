"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Magnetic from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/lib/offer";

const CONTACT_HREF = "/contact?source=services&kind=call";

export default function ServicesCta({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  return (
    <section className="border-t border-white/10 py-24 md:py-32" aria-labelledby="services-cta-title">
      <Container>
        <Reveal variant="scale" className="mx-auto max-w-2xl text-center">
          <h2 id="services-cta-title" className="mb-6 text-h2 text-[var(--color-text-on-dark)]">
            {bg ? "С коя част да започнем?" : "Which part should we start with?"}
          </h2>
          <p className="mb-10 text-lead text-[var(--color-text-on-dark)]/60">
            {bg
              ? "30 минути, без ангажимент. Казваме ви какво ви трябва и колко струва — писмено."
              : "30 minutes, no commitment. We tell you what you need and what it costs, in writing."}
          </p>
          <Magnetic className="inline-block">
            <Link
              href={CONTACT_HREF}
              className="btn-primary btn-lg inline-flex items-center gap-2 rounded-full border-none bg-[var(--accent)] px-9 py-4 font-bold text-white shadow-[0_20px_50px_-15px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
            >
              {bg ? "Заявете среща" : "Book a call"}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}

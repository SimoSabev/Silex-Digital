"use client";

/**
 * DIRECTION: "Transformation, staged." The category default for an agency
 * services page is a centered dark hero + three alternating zigzag cards —
 * exactly what this page was before. This version refuses that shell.
 *
 * OWN-WORLD: near-black as the dominant ground (not a hero band accent),
 * oversized editorial type as the structural device, a literal word-swap
 * (problem -> outcome) standing in for the brand's pixel-dissolve motif in
 * text form. Each service is a numbered "case file" — large index, tilt-on-
 * hover artifact, a Before/After chip pair — not a card in a grid.
 *
 * PROOF: no invented client work. The three real interactive demos and the
 * concrete process are the evidence until real case studies exist.
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Code,
  ArrowRight,
  Check,
  Search,
  PenTool,
  Wrench,
  Rocket,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useTilt } from "@/lib/useTilt";
import { useI18n } from "@/lib/i18n";

const heroWords = {
  bg: [
    { before: "Невидим", after: "Намерен" },
    { before: "Бавен", after: "Мигновен" },
    { before: "Генеричен", after: "Разпознаваем" },
  ],
  en: [
    { before: "Invisible", after: "Found" },
    { before: "Slow", after: "Instant" },
    { before: "Generic", after: "Unmistakable" },
  ],
};

const services = [
  {
    index: "01",
    icon: <Code size={28} />,
    image: "/images/service-presence-mockup.png",
    title: { bg: "Уебсайт & Google Търсене", en: "Website & Google Search" },
    description: {
      bg: "Не строим шаблон — строим лицето на бизнеса ви онлайн. Всеки пиксел работи за доверие и позиция в Google, от първия ден.",
      en: "We don't build a template — we build the face of your business online. Every pixel works toward trust and Google position, from day one.",
    },
    before: { bg: "Сайт никой не намира", en: "A site nobody finds" },
    after: { bg: "Първа страница в Google", en: "First page on Google" },
    price: { bg: "690 € старт + 49 €/мес", en: "€690 setup + €49/mo" },
  },
  {
    index: "02",
    icon: <Bot size={28} />,
    image: "/images/service-automate-mockup.png",
    title: { bg: "AI Дигитален секретар", en: "AI Digital Secretary" },
    description: {
      bg: "Обучаваме асистент на вашите реални цени, продукти и правила. Той отговаря във Viber за секунди, не часове — и никога не спи.",
      en: "We train an assistant on your real prices, products, and rules. It replies on Viber in seconds, not hours — and it never sleeps.",
    },
    before: { bg: "Отговор след 3 часа", en: "3-hour reply time" },
    after: { bg: "Отговор за 12 секунди", en: "12-second reply time" },
    price: { bg: "290 € старт + 248 €/мес", en: "€290 setup + €248/mo" },
  },
  {
    index: "03",
    icon: <Sparkles size={28} />,
    image: "/images/service-autopilot-mockup.png",
    title: { bg: "Дигитален Автопилот", en: "Digital Autopilot" },
    description: {
      bg: "Сайт, Google и AI асистент — синхронизирани в една система. За бизнеси, готови да спрат да управляват ръчно всеки канал поотделно.",
      en: "Site, Google, and AI assistant — synced into one system. For businesses ready to stop managing every channel by hand.",
    },
    before: { bg: "Пет разпокъсани инструмента", en: "Five disconnected tools" },
    after: { bg: "Една синхронизирана система", en: "One synced system" },
    price: { bg: "990 € старт + 298 €/мес", en: "€990 setup + €298/mo" },
  },
];

const processSteps = [
  {
    icon: <Search className="h-7 w-7" />,
    title: { bg: "Диагноза", en: "Diagnosis" },
    description: {
      bg: "30 минути. Не ви продаваме пакет — казваме ви къде точно губите клиенти.",
      en: "30 minutes. We don't pitch a package — we tell you exactly where you're losing clients.",
    },
  },
  {
    icon: <PenTool className="h-7 w-7" />,
    title: { bg: "Архитектура", en: "Architecture" },
    description: {
      bg: "Виждате визуален план преди един ред код да бъде написан.",
      en: "You see a visual plan before a single line of code is written.",
    },
  },
  {
    icon: <Wrench className="h-7 w-7" />,
    title: { bg: "Изграждане", en: "Build" },
    description: {
      bg: "Изграждаме на етапи, с редовни чекпойнти — без изненади на финала.",
      en: "We build in stages with regular checkpoints — no surprises at the end.",
    },
  },
  {
    icon: <Rocket className="h-7 w-7" />,
    title: { bg: "Пускане", en: "Launch" },
    description: {
      bg: "14 дни от диагноза до работеща система, приемаща реални клиенти.",
      en: "14 days from diagnosis to a live system, taking real clients.",
    },
  },
];

function HeroWordSwap({ locale }: { locale: "bg" | "en" }) {
  const words = heroWords[locale];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [locale, words.length]);

  const current = words[idx]!;

  return (
    <span className="inline-grid">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${locale}-${idx}`}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          <span className="text-[var(--accent-10)]/50 line-through decoration-2">
            {current.before}
          </span>
          <span aria-hidden className="mx-3 text-[var(--color-text-on-dark)]/30">
            →
          </span>
          <span className="text-[var(--accent-10)]">{current.after}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ServiceCaseFile({
  service,
  locale,
}: {
  service: (typeof services)[number];
  locale: "bg" | "en";
}) {
  const tilt = useTilt(5);
  const isEven = Number(service.index) % 2 === 0;

  return (
    <div className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-14 md:py-24">
      <span className="font-mono text-6xl font-black text-white/[0.08] md:text-7xl">
        {service.index}
      </span>

      <div className={isEven ? "md:order-3" : ""}>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-10)]/15 text-[var(--accent-10)]">
          {service.icon}
        </div>
        <h2 className="mb-4 font-display text-3xl leading-[1.05] font-extrabold text-[var(--color-text-on-dark)] md:text-[2.75rem]">
          {service.title[locale]}
        </h2>
        <p className="mb-6 max-w-md text-[16px] leading-relaxed text-[var(--color-text-on-dark)]/65 md:text-[17px]">
          {service.description[locale]}
        </p>

        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[var(--color-text-on-dark)]/50 line-through">
            {service.before[locale]}
          </span>
          <ArrowRight className="h-4 w-4 text-[var(--color-text-on-dark)]/30" />
          <span className="rounded-full border border-[var(--accent-10)]/30 bg-[var(--accent-10)]/10 px-3 py-1.5 text-[var(--accent-10)]">
            {service.after[locale]}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <span className="font-mono text-sm font-bold text-[var(--color-text-on-dark)]/70">
            {service.price[locale]}
          </span>
          <Link
            href="/demos"
            className="flex items-center gap-1.5 text-sm font-bold text-[var(--accent-10)] transition-opacity hover:opacity-75"
          >
            {locale === "bg" ? "Виж го на живо" : "See it live"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ${isEven ? "md:order-2" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={service.image}
          alt={service.title[locale]}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/50 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function ServicesContent() {
  const { locale } = useI18n();

  return (
    <div className="min-h-dvh bg-[var(--color-bg-dark)] font-body">
      {/* Hero — full-bleed near-black, oversized type, literal transformation device */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 55%)",
          }}
          aria-hidden
        />
        <Container>
          <Reveal variant="blur">
            <p className="mb-6 font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text-on-dark)]/40 uppercase">
              {locale === "bg" ? "Услуги · SilexBrand" : "Services · SilexBrand"}
            </p>
          </Reveal>
          <h1 className="max-w-4xl font-display text-[2.75rem] leading-[0.98] font-extrabold tracking-tight text-[var(--color-text-on-dark)] sm:text-[4rem] md:text-[5.5rem]">
            {locale === "bg" ? "От " : "From "}
            <HeroWordSwap locale={locale} />
            <br />
            {locale === "bg" ? "за 14 дни." : "in 14 days."}
          </h1>
          <Reveal variant="rise" delay={0.15}>
            <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-[var(--color-text-on-dark)]/60">
              {locale === "bg"
                ? "Три конкретни системи. Никакви шаблони. Всяка изградена около това какво реално губите — не какво звучи добре в оферта."
                : "Three concrete systems. No templates. Each built around what you're actually losing — not what sounds good in a proposal."}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Services — numbered case files, not a card grid */}
      <section>
        <Container>
          {services.map((service) => (
            <ServiceCaseFile key={service.index} service={service} locale={locale} />
          ))}
        </Container>
      </section>

      {/* Process — dark punch, quieter rhythm after the case files */}
      <section className="border-t border-white/10 bg-black/20 py-20 md:py-28">
        <Container>
          <Reveal className="mb-16 max-w-lg">
            <p className="mb-3 font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-text-on-dark)]/40 uppercase">
              {locale === "bg" ? "Процес" : "Process"}
            </p>
            <h2 className="font-display text-3xl font-extrabold text-[var(--color-text-on-dark)] md:text-4xl">
              {locale === "bg" ? "Как всъщност работим" : "How we actually work"}
            </h2>
          </Reveal>

          <RevealGroup className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <RevealItem key={idx} variant="rise">
                <span className="mb-4 block font-mono text-sm font-bold text-[var(--accent-10)]/50">
                  0{idx + 1}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[var(--color-text-on-dark)]/80">
                  {step.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-[var(--color-text-on-dark)]">
                  {step.title[locale]}
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-text-on-dark)]/55">
                  {step.description[locale]}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <Container>
          <Reveal variant="scale" className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 font-display text-4xl leading-[1.05] font-extrabold text-[var(--color-text-on-dark)] md:text-5xl">
              {locale === "bg"
                ? "Кое от трите губите вие?"
                : "Which of these three are you losing?"}
            </h2>
            <p className="mb-10 text-lg text-[var(--color-text-on-dark)]/60">
              {locale === "bg"
                ? "30 минути — казваме ви точно, без да продаваме нищо предварително."
                : "30 minutes — we'll tell you exactly, without selling anything first."}
            </p>
            <Link href="/contact">
              <Magnetic>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full border-none bg-[var(--accent)] px-9 py-4 text-lg font-bold text-white shadow-[0_20px_50px_-15px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
                >
                  <Check className="h-5 w-5" />
                  {locale === "bg" ? "Заяви диагноза" : "Request a diagnosis"}
                </Button>
              </Magnetic>
            </Link>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

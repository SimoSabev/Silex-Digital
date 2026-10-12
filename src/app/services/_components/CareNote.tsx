import { Wrench } from "lucide-react";
import { servicesByCategory, type Locale } from "@/lib/offer";
import PriceTag from "./PriceTag";

/** Slim closing note for hosting & care — not a full discipline block. */
export default function CareNote({ locale }: { locale: Locale }) {
  const items = servicesByCategory("care");
  const bg = locale === "bg";

  return (
    <aside
      aria-labelledby="care-note-title"
      className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-7 md:flex-row md:items-start md:gap-10"
    >
      <div className="flex items-start gap-4 md:max-w-xs">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-[var(--color-text-on-dark)]/70">
          <Wrench size={18} aria-hidden />
        </div>
        <div>
          <h3 id="care-note-title" className="mb-1 text-h4 text-[var(--color-text-on-dark)]">
            {bg ? "И след пускането" : "And after launch"}
          </h3>
          <p className="text-small text-[var(--color-text-on-dark)]/55">
            {bg
              ? "Всеки сайт върви с хостинг и поддръжка. Работа извън обхвата се отчита по часове."
              : "Every site runs on hosting and care. Work outside the scope is billed by the hour."}
          </p>
        </div>
      </div>

      <ul className="flex flex-1 flex-wrap gap-x-8 gap-y-3 md:justify-end">
        {items.map((svc) => (
          <li key={svc.id} className="min-w-0">
            <p className="text-small text-[var(--color-text-on-dark)]/60">{svc.name[locale]}</p>
            <PriceTag svc={svc} locale={locale} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { type Locale } from "@/lib/offer";
import { tr } from "@/app/pricing/_components/offer-utils";

const ICON_BOX =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] transition-colors";

const HOURS: readonly { label: { bg: string; en: string }; value: { bg: string; en: string } }[] = [
  { label: { bg: "Работни дни", en: "Weekdays" }, value: { bg: "09:00 – 18:00", en: "09:00 – 18:00" } },
  { label: { bg: "Вечерна поддръжка", en: "Evening support" }, value: { bg: "до 24:00", en: "until 24:00" } },
  { label: { bg: "Уикенди", en: "Weekends" }, value: { bg: "По договаряне", en: "By arrangement" } },
];

type Props = {
  locale: Locale;
  /** Phones: show the form first when the visitor arrives with a selection. */
  isAfterForm: boolean;
};

export default function ContactAside({ locale, isAfterForm }: Props) {
  return (
    <div className={`${isAfterForm ? "order-2" : "order-1"} space-y-6 lg:order-2`}>
      <div className="card space-y-8 border-none bg-[var(--bg-section)] p-6 md:p-8">
        <div>
          <h2 className="mb-6 text-h3 text-[var(--text-main)]">{tr(locale, "Контакти", "Contacts")}</h2>
          <div className="space-y-4">
            <a href="mailto:info@silexbrand.com" className="group card flex items-center gap-4 bg-[var(--bg-card)] p-4">
              <div className={`${ICON_BOX} group-hover:bg-[var(--accent)] group-hover:text-white`}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="eyebrow text-[var(--text-muted)]">Email</p>
                <p className="text-small font-medium text-[var(--text-main)]">info@silexbrand.com</p>
              </div>
            </a>
            <a href="tel:+359885031865" className="group card flex items-center gap-4 bg-[var(--bg-card)] p-4">
              <div className={`${ICON_BOX} group-hover:bg-[var(--accent)] group-hover:text-white`}>
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="eyebrow text-[var(--text-muted)]">{tr(locale, "Телефон", "Phone")}</p>
                <p className="text-small font-medium text-[var(--text-main)]">+359 88 503 1865</p>
              </div>
            </a>
            <div className="card flex items-center gap-4 bg-[var(--bg-card)] p-4">
              <div className={ICON_BOX}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="eyebrow text-[var(--text-muted)]">{tr(locale, "Локация", "Location")}</p>
                <p className="text-small font-medium text-[var(--text-main)]">{tr(locale, "Варна, България", "Varna, Bulgaria")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider" />

        <div>
          <div className="mb-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />
            <h3 className="text-h4 text-[var(--text-main)]">
              {tr(locale, "Отговаряме в рамките на 2 часа", "We reply within 2 hours")}
            </h3>
          </div>
          <dl className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 text-small text-[var(--text-sub)]">
            {HOURS.map((row, idx) => (
              <div
                key={row.label.en}
                className={`flex justify-between ${idx < HOURS.length - 1 ? "border-b border-[var(--border)] pb-2" : ""}`}
              >
                <dt className="font-medium text-[var(--text-main)]">{row.label[locale]}</dt>
                <dd>{row.value[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="card-featured flex flex-col items-center p-6 text-center md:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mb-2 text-h3 text-[var(--text-main)]">{tr(locale, "Предпочитате да говорим?", "Prefer to talk?")}</h2>
        <p className="mb-6 text-small text-[var(--text-sub)]">
          {tr(
            locale,
            "Изпратете формата и ще ви отговорим по имейл или телефон. Или се обадете — ще уговорим удобен час за безплатна 30-минутна среща.",
            "Send the form and we'll reply by email or phone. Or call us — we'll find a time for a free 30-minute call.",
          )}
        </p>
        <div className="flex w-full flex-col gap-3">
          <a href="#consultation-form" className="btn-primary w-full">
            {tr(locale, "Към формата", "Go to the form")}
          </a>
          <a href="tel:+359885031865" className="btn-secondary w-full">
            {tr(locale, "Обадете се", "Call us")}
          </a>
          <a
            href="mailto:info@silexbrand.com?subject=Consultation%20request"
            className="text-small font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            info@silexbrand.com
          </a>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Страницата не е намерена | SilexBrand" },
  description: "Страницата, която търсите, не съществува. Вижте услугите и цените на SilexBrand или се върнете към началото.",
  robots: {
    index: false,
    follow: false,
  },
};

const HELPFUL_LINKS = [
  { label: "Услуги", href: "/services" },
  { label: "Цени и пакети", href: "/pricing" },
  { label: "Демота", href: "/demos" },
  { label: "Заявете безплатна среща", href: "/contact?source=404&kind=call" },
] as const;

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-(--bg-page) px-4 py-28">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border border-(--accent)/20 bg-(--accent)/10">
          <Search className="h-10 w-10 text-(--accent)" aria-hidden />
        </div>

        <p className="nums mb-3 eyebrow text-(--text-muted)">404</p>
        <h1 className="mb-4 text-h1 text-(--text-main)">Страницата не е намерена</h1>
        <p className="mx-auto mb-2 max-w-lg text-lead text-(--text-sub)">
          Адресът може да е грешен или страницата да е преместена.
        </p>
        <p lang="en" className="mx-auto mb-10 max-w-lg text-small text-(--text-muted)">
          Page not found. The address may be wrong or the page may have moved.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary btn-lg font-bold">
            <Home className="h-5 w-5" aria-hidden />
            Към началото
          </Link>
          <Link href="/services" className="btn-secondary btn-lg font-semibold">
            Вижте услугите
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>

        <nav aria-label="Полезни връзки" className="mt-14 border-t border-(--border) pt-8">
          <h2 className="mb-5 text-h4 text-(--text-main)">Може би търсите</h2>
          <ul className="mx-auto grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            {HELPFUL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="card block p-4 text-left text-body text-(--text-sub) transition-colors hover:bg-(--bg-section) hover:text-(--text-main)"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

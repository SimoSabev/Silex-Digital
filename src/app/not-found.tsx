import Link from 'next/link';
import { Home, ArrowRight, Search } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | 404 | Silex-Digital',
  description: 'The page you are looking for does not exist. Explore our services or return to the home page.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-(--bg-page)">
      <div className="px-4 w-full relative z-10">
        <div className="w-full text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex h-32 w-32 items-center justify-center rounded-full border border-(--violet)/20 bg-linear-to-br from-(--violet)/10 to-(--coral)/10 shadow-2xl shadow-(--violet)/10">
              <Search className="h-16 w-16 text-(--violet)" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-gradient-hero mb-4">
            404
          </h1>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-(--text-main) md:text-3xl">
            Page not found
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-(--text-sub)">
            Sorry, the page you are looking for does not exist or has been moved.
            You might be looking for one of our services.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <button className="inline-flex items-center gap-2 rounded-[24px] bg-(--violet) px-8 py-3.5 font-bold text-white transition-all hover:bg-(--violet-hover)">
                <Home className="w-5 h-5" />
                Home page
              </button>
            </Link>
            <Link href="/services">
              <button className="inline-flex items-center gap-2 rounded-[24px] border border-(--border) bg-(--bg-card) px-8 py-3.5 font-bold text-(--text-sub) transition-all hover:border-(--violet)/30 hover:bg-(--bg-section)">
                Browse services
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-14 border-t border-(--border) pt-8">
            <h3 className="mb-5 text-lg font-bold text-(--text-main)">
              You may be looking for:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              {[
                { label: 'Web Development', href: '/services' },
                { label: 'E-commerce', href: '/services' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="card p-4 text-left text-(--text-sub) transition-all hover:bg-(--bg-section) hover:text-(--text-main)"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="card mx-auto mt-12 max-w-lg border-(--violet)/10 p-6">
            <p className="mb-4 text-(--text-sub)">
              Need help or have questions?
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 rounded-xl bg-(--violet) px-6 py-2.5 font-bold text-white transition-all hover:bg-(--violet-hover)">
                Contact us
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

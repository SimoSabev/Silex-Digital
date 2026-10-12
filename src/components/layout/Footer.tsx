"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  const serviceLinks = [
    { label: t("svc.identity.title"), href: "/services" },
    { label: t("svc.website.title"), href: "/services" },
    { label: t("svc.content.title"), href: "/services" },
    { label: t("svc.ads.title"), href: "/services" },
    { label: t("svc.seo.title"), href: "/pricing/seo" },
    { label: t("svc.ai.short"), href: "/demos" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  // Social icons are intentionally not rendered until real, live SilexBrand
  // profiles exist — a "#" href that looks clickable but goes nowhere is worse
  // for trust than no icon at all. Re-add with real URLs once the profiles
  // are live (see also organizationSchema.sameAs in src/config/seo.ts).

  const legalLinks = [
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
    { label: t("footer.dataDeletion"), href: "/data-deletion" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--bg-section)]">
      {/* Premium Glowing Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)]/25 via-[var(--accent)]/35 via-[var(--accent)]/25 to-transparent" />

      {/* Subtle Ambient Background Glows */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative z-10 w-full py-12 sm:py-16">
        <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            
            {/* Left Column: Brand Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 w-full"
            >
              <div className="w-full flex flex-col gap-6 rounded-2xl border border-[var(--border)]/50 bg-[var(--bg-card)]/15 backdrop-blur-xs p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link 
                    href="/" 
                    className="h-[44px] sm:h-[52px] w-[180px] sm:w-[220px] overflow-hidden flex items-center justify-start relative -ml-1.5"
                  >
                    <Image 
                      src="/new-logo.png" 
                      alt="SilexBrand" 
                      width={220} 
                      height={55} 
                      className="h-[140px] sm:h-[180px] w-auto object-contain max-w-none"
                      priority
                    />
                  </Link>
                  
                  <Link
                    href="/contact?source=footer&kind=call"
                    className="flex items-center gap-2 self-start rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1.5 text-caption font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/15 sm:self-auto"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                    {t("footer.freeCall")}
                  </Link>
                </div>

                <p className="text-small text-[var(--text-sub)]">
                  {t("footer.description")}
                </p>

                <div className="w-full h-[1px] bg-[var(--border)]/40 my-1" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="eyebrow text-[var(--text-muted)]">
                    {t("footer.legal")}
                  </span>
                  <div className="flex gap-4">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-caption font-semibold text-[var(--text-sub)] underline-offset-2 transition-colors hover:text-[var(--accent)] hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle Column: Interactive Solutions Navigator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="lg:col-span-3 flex flex-col items-start lg:pl-2"
            >
              <h3 className="mb-6 flex items-center gap-2 eyebrow text-[var(--text-main)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {t("footer.services")}
              </h3>
              <div className="flex flex-col gap-3 w-full">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 w-full rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 hover:bg-[var(--bg-card)]/30 hover:border-[var(--accent)]/25 px-4 py-3.5 shadow-xs transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent)] scale-50 group-hover:scale-100 transition-transform duration-300" />
                      <span className="text-small font-semibold text-[var(--text-sub)] transition-colors group-hover:text-[var(--text-main)]">
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Contact info Hub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end w-full"
            >
              <div className="w-full max-w-sm lg:text-right">
                <h3 className="mb-6 flex items-center gap-2 eyebrow text-[var(--text-main)] lg:justify-end">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  {t("footer.contact")}
                </h3>
                
                <div className="flex flex-col gap-3 w-full max-w-sm lg:ml-auto">
                  {/* Address Widget */}
                  <div className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--accent)]/25 hover:bg-[var(--bg-card)]/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="eyebrow text-[var(--text-muted)]">
                        {t("footer.office")}
                      </span>
                      <span className="text-small font-semibold text-[var(--text-sub)]">
                        {t("footer.city")}
                      </span>
                    </div>
                  </div>

                  {/* Phone Widget */}
                  <a
                    href="tel:+359885031865"
                    className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--accent)]/25 hover:bg-[var(--bg-card)]/30 hover:shadow-[var(--accent)]/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="eyebrow text-[var(--text-muted)]">
                        {t("footer.phone")}
                      </span>
                      <span className="text-small font-semibold text-[var(--text-sub)] transition-colors group-hover:text-[var(--text-main)]">
                        +359 88 503 1865
                      </span>
                    </div>
                  </a>

                  {/* Email Widget */}
                  <a
                    href="mailto:info@silexbrand.com"
                    className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--accent)]/25 hover:bg-[var(--bg-card)]/30 hover:shadow-[var(--accent)]/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="eyebrow text-[var(--text-muted)]">
                        {t("footer.email")}
                      </span>
                      <span className="text-small font-semibold text-[var(--text-sub)] transition-colors group-hover:text-[var(--text-main)]">
                        info@silexbrand.com
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-[var(--border)]/60 bg-transparent">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 px-4 py-6 sm:flex-row sm:px-6 sm:py-7 md:px-8 lg:px-12">
          <p className="eyebrow font-medium text-[var(--text-muted)]">
            © {new Date().getFullYear()} SilexBrand. {t("footer.rights")}
          </p>
          <p className="text-caption text-[var(--text-muted)]">{t("common.vatNote")}</p>
        </div>
      </div>
    </footer>
  );
}

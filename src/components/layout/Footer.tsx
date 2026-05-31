"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function Footer() {
  const { t, locale } = useI18n();

  const solutions = [
    { label: t("footer.automation"), href: "/services" },
    { label: t("footer.cmsLayer"), href: "/services" },
    { label: t("footer.codeLayer"), href: "/services" },
    { label: t("footer.integrations"), href: "/demos" },
  ];

  const socials = [
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--bg-section)]">
      {/* Premium Glowing Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--violet)]/25 via-[var(--coral)]/35 via-[var(--lime)]/25 to-transparent" />

      {/* Subtle Ambient Background Glows */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-[var(--violet)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[var(--coral)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />

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
                      alt="Silex Digital" 
                      width={220} 
                      height={55} 
                      className="h-[140px] sm:h-[180px] w-auto object-contain max-w-none"
                      priority
                    />
                  </Link>
                  
                  {/* Premium System Operational Indicator */}
                  <div className="flex items-center gap-2 self-start sm:self-auto rounded-full border border-[var(--lime)]/20 bg-[var(--lime)]/10 px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] text-[var(--lime)] uppercase">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--lime)]"></span>
                    </span>
                    {locale === "bg" ? "Всички системи активни" : "Systems Online"}
                  </div>
                </div>

                <p className="font-inter text-sm leading-relaxed text-[var(--text-sub)]">
                  {t("footer.description")}
                </p>

                <div className="w-full h-[1px] bg-[var(--border)]/40 my-1" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[var(--text-muted)] uppercase">
                    {locale === "bg" ? "Свържете се с нас" : "Follow us"}
                  </span>
                  <div className="flex gap-2.5">
                    {socials.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/40 text-[var(--text-sub)] shadow-xs transition-all duration-300 hover:border-[var(--violet)]/40 hover:text-[var(--violet)] hover:shadow-[var(--violet)]/10 hover:shadow-md"
                        aria-label={social.label}
                      >
                        <social.icon />
                      </motion.a>
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
              <h3 className="font-space mb-6 flex items-center gap-2 text-xs font-[800] tracking-[0.2em] text-[var(--text-main)] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--violet)] animate-pulse" />
                {t("footer.solutions")}
              </h3>
              <div className="flex flex-col gap-3 w-full">
                {solutions.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group font-inter flex items-center justify-between gap-3 w-full rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 hover:bg-[var(--bg-card)]/30 hover:border-[var(--violet)]/25 px-4 py-3.5 shadow-xs transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-1 w-1 rounded-full bg-[var(--violet)] scale-50 group-hover:scale-100 transition-transform duration-300" />
                      <span className="text-sm font-semibold text-[var(--text-sub)] transition-colors group-hover:text-[var(--text-main)]">
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--violet)]" />
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
                <h3 className="font-space mb-6 flex items-center gap-2 text-xs font-[800] tracking-[0.2em] text-[var(--text-main)] uppercase lg:justify-end">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)] animate-pulse" />
                  {t("footer.contact")}
                </h3>
                
                <div className="flex flex-col gap-3 w-full max-w-sm lg:ml-auto">
                  {/* Address Widget */}
                  <div className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--violet)]/25 hover:bg-[var(--bg-card)]/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--violet)]/10 text-[var(--violet)] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] font-[800] tracking-[0.1em] text-[var(--text-muted)] uppercase">
                        {locale === "bg" ? "Офис" : "Office"}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-sub)]">
                        {locale === "bg" ? "Варна, България" : "Varna, Bulgaria"}
                      </span>
                    </div>
                  </div>

                  {/* Phone Widget */}
                  <a
                    href="tel:+359885031865"
                    className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--violet)]/25 hover:bg-[var(--bg-card)]/30 hover:shadow-[var(--violet)]/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--violet)]/10 text-[var(--violet)] transition-colors group-hover:bg-[var(--violet)] group-hover:text-white shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] font-[800] tracking-[0.1em] text-[var(--text-muted)] uppercase">
                        {locale === "bg" ? "Телефон" : "Phone"}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-sub)] transition-colors group-hover:text-[var(--text-main)]">
                        +359 88 503 1865
                      </span>
                    </div>
                  </a>

                  {/* Email Widget */}
                  <a
                    href="mailto:info@silexbrand.com"
                    className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)]/40 bg-[var(--bg-card)]/10 p-3.5 shadow-xs transition-all duration-300 hover:border-[var(--violet)]/25 hover:bg-[var(--bg-card)]/30 hover:shadow-[var(--violet)]/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--violet)]/10 text-[var(--violet)] transition-colors group-hover:bg-[var(--violet)] group-hover:text-white shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] font-[800] tracking-[0.1em] text-[var(--text-muted)] uppercase">
                        {locale === "bg" ? "Имейл" : "Email"}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-sub)] transition-colors group-hover:text-[var(--text-main)]">
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
          <p className="font-inter text-xs tracking-wider text-[var(--text-muted)] uppercase">
            © {new Date().getFullYear()} SilexBrand. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

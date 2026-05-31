"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();
  const pathname = usePathname();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.demos"), href: "/demos" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
      window.dispatchEvent(
        new CustomEvent("silex-menu-toggle", { detail: { open: true } })
      );
    } else {
      document.body.classList.remove("menu-open");
      window.dispatchEvent(
        new CustomEvent("silex-menu-toggle", { detail: { open: false } })
      );
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const mobileMenu =
    mounted && isMobileMenuOpen
      ? createPortal(
          <div
            id="mobile-nav-menu"
            className="fixed inset-0 z-[9998] flex flex-col bg-[var(--bg-page)] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3 safe-area-pt">
              <Image src="/new-logo.png" alt="Silex Digital" width={160} height={40} className="h-10 w-auto object-contain" />
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-md touch-target"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex flex-col items-center text-center"
                  >
                    <span
                      className={`font-display text-3xl font-bold transition-colors sm:text-4xl ${
                        isActive
                          ? "text-[var(--violet)]"
                          : "text-[var(--text-sub)] group-hover:text-[var(--violet)]"
                      }`}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="mt-2 h-[3px] w-12 rounded-full bg-[var(--accent)]" />
                    )}
                  </Link>
                );
              })}

              <div className="mt-4 w-full max-w-sm space-y-4">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-bold text-white shadow-[0_10px_30px_rgba(212,115,94,0.18)]"
                >
                  <Sparkles size={18} />
                  {t("nav.getStarted") || t("common.contactUs")}
                </Link>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[200] flex w-full justify-center transition-all duration-500 ${
          isScrolled ? "px-4 pb-4 pt-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 transition-all duration-500 ${
            isScrolled
              ? "rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 px-6 shadow-apple backdrop-blur-xl"
              : "border-b border-transparent px-6 sm:px-8"
          }`}
        >
          <Link href="/" className="flex justify-center items-center">
            <Image src="/logo-new.png" alt="Silex Digital" width={180} height={44} className="h-20 w-auto object-contain" />
          </Link>

          <div className="hidden items-center justify-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2"
                >
                  <span
                    className={`relative z-10 text-[15px] font-[600] transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--violet)]"
                        : "text-[var(--text-sub)] group-hover:text-[var(--violet)]"
                    }`}
                  >
                    {link.label}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--bg-section)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    layoutId="nav-hover-pill"
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-1 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-section)]/50 p-1">
              <LanguageToggle />
            </div>
            <Link href="/contact" className="group relative">
              <div className="absolute -inset-1 rounded-full bg-[var(--accent)] opacity-30 blur-sm transition duration-500 group-hover:opacity-50" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-[700] text-white shadow-lg transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 text-white group-hover:animate-pulse" />
                {t("common.contactUs")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>

          <button
            type="button"
            className="relative z-[201] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-transparent bg-[var(--accent)] text-white shadow-md transition-colors lg:hidden touch-target"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {mobileMenu}
    </>
  );
}

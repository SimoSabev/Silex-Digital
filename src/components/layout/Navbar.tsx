"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useI18n();
  const pathname = usePathname();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.demos"), href: "/demos" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("silex-menu-toggle", { detail: { open: isMobileMenuOpen } })
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("silex-menu-toggle", { detail: { open: false } })
      );
    };
  }, [isMobileMenuOpen]);

  // Framer Motion variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" as const }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const, staggerChildren: 0.1, keyframes: undefined }
    }
  };

  const mobileLinkVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <>
      {/* Desktop Navbar container */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center w-full ${
          isScrolled ? "pt-4 px-4 pb-4" : "pt-0 px-0"
        }`}
      >
        <div className={`w-full max-w-7xl transition-all duration-500 flex h-[72px] items-center justify-between gap-6 ${
          isScrolled 
            ? "px-6 bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-full shadow-apple" 
            : "px-6 sm:px-8 border-b border-transparent"
        }`}>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex flex-col shrink-0 justify-center relative overflow-hidden"
          >
            <Image 
              src="/long-logo.png" 
              alt="Silex Digital" 
              width={140} 
              height={35} 
              className="h-64w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 group"
                >
                  <span className={`relative z-10 text-[15px] font-[600] transition-colors duration-300 ${
                    isActive ? "text-[var(--violet)]" : "text-[var(--text-sub)] group-hover:text-[var(--violet)]"
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Hover effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[var(--bg-section)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    layoutId="nav-hover-pill" 
                  />

                  {/* Active effect */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-1 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--coral)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right side settings / CTA */}
          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <div className="flex items-center bg-[var(--bg-section)]/50 rounded-full p-1 border border-[var(--border)]">
              <LanguageToggle />
            </div>
            <ThemeToggle />
            
            <Link href="/contact" className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--violet)] via-[var(--coral)] to-[var(--lime)] opacity-30 blur-sm group-hover:opacity-100 group-hover:blur transition duration-500"></div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--coral)] px-5 py-2.5 text-[14px] font-[700] text-white shadow-lg transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-[var(--lime)] group-hover:animate-pulse" />
                {t("common.contactUs")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger — only button, no language toggle here */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-[var(--violet)] to-[var(--coral)] text-white shadow-md transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-page)]/95 backdrop-blur-2xl lg:hidden"
          >
            {/* Ambient Background Glow in Mobile Menu */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[var(--violet)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[var(--coral)]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center justify-center space-y-6 w-full px-6 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={mobileLinkVariants}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={`text-[32px] sm:text-[40px] font-display font-bold transition-colors duration-300 ${
                        isActive ? "text-[var(--violet)]" : "text-[var(--text-sub)] group-hover:text-[var(--violet)]"
                      }`}>
                        {link.label}
                      </span>
                      {isActive && (
                        <motion.div 
                          layoutId="mobile-active-indicator"
                          className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--coral)] mt-2" 
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={mobileLinkVariants} className="w-full max-w-sm mt-8 space-y-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--coral)] px-6 py-4 text-[18px] font-[700] text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02]"
                >
                  <Sparkles size={18} />
                  {t("nav.getStarted") || t("common.contactUs")}
                </Link>
                <div className="flex justify-center items-center gap-4 pt-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

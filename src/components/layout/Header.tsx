"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Monogram from "@/components/ui/Monogram";

const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center"
        style={{ padding: isScrolled ? "0.5rem 1rem" : "1rem 1rem" }}
      >
        <motion.nav
          className={`nav-pill flex items-center gap-1 transition-all duration-500 ${
            isScrolled ? "nav-pill-compact" : ""
          }`}
          style={{
            borderRadius: "9999px",
            padding: isScrolled ? "0.375rem 1rem" : "0.5rem 1.25rem",
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Logo / Monogram */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 px-2 py-1 cursor-pointer"
            aria-label="Scroll to top"
          >
            <Monogram size={28} className="text-[#1A1A1A]" bgCutoutColor="#F5F1EA" />
          </button>

          {/* Separator */}
          <div
            className="hidden md:block w-px h-5 mx-2"
            style={{ background: "var(--color-border)" }}
          />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="link-underline px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Separator */}
          <div
            className="hidden md:block w-px h-5 mx-2"
            style={{ background: "var(--color-border)" }}
          />

          {/* Available Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span
              className="text-xs font-medium"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
                fontSize: "0.6875rem",
                letterSpacing: "0.05em",
              }}
            >
              Available
            </span>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1 px-2 py-2 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              className="block w-5 h-0.5 rounded-full"
              style={{ background: "var(--color-text-primary)" }}
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-0.5 rounded-full"
              style={{ background: "var(--color-text-primary)" }}
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 rounded-full"
              style={{ background: "var(--color-text-primary)" }}
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] menu-overlay flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-3xl font-medium cursor-pointer"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-primary)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Available badge mobile */}
              <motion.div
                className="flex items-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Available for opportunities
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MagneticButton } from "../animations/MagneticButton";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
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

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3"
            : "py-4 md:py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background with gradient and blur */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isScrolled
              ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
              : "bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent"
          )}
        />

        {/* Subtle top line accent when scrolled */}
        {isScrolled && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              {/* Logo Icon */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] p-[1px]">
                <div className="w-full h-full rounded-xl bg-[#0a0a0a] flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">S</span>
                </div>
              </div>

              {/* Logo Text - Hidden on small mobile */}
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                  Sunil
                </span>
                <span className="text-xl font-bold gradient-text ml-1">
                  Baghel
                </span>
              </div>
            </Link>
          </MagneticButton>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <MagneticButton key={item.name} strength={0.15}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                    pathname === item.href
                      ? "text-[#00f0ff]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.span
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#a855f7] rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </MagneticButton>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <MagneticButton strength={0.2}>
              <Link
                href="/contact"
                className="group relative px-5 py-2.5 rounded-xl overflow-hidden"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#a855f7] opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Shine effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" /> */}

                <span className="relative text-sm font-semibold text-black">
                  Let's Talk
                </span>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-center items-center">
              <motion.span
                className="absolute w-5 h-0.5 bg-white rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -5,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute w-5 h-0.5 bg-white rounded-full"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute w-5 h-0.5 bg-white rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 5,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </motion.div>

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="h-full bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/10 flex flex-col">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <span className="text-lg font-semibold text-white">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  <motion.div
                    className="space-y-2"
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                      },
                      closed: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 },
                      },
                    }}
                  >
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        variants={{
                          open: { opacity: 1, x: 0 },
                          closed: { opacity: 0, x: 20 },
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200",
                            pathname === item.href
                              ? "bg-gradient-to-r from-[#00f0ff]/10 to-[#a855f7]/10 border border-[#00f0ff]/20"
                              : "hover:bg-white/5"
                          )}
                        >
                          {/* Number indicator */}
                          <span
                            className={cn(
                              "text-xs font-mono",
                              pathname === item.href
                                ? "text-[#00f0ff]"
                                : "text-white/30"
                            )}
                          >
                            0{index + 1}
                          </span>

                          <span
                            className={cn(
                              "text-lg font-medium",
                              pathname === item.href
                                ? "text-white"
                                : "text-white/70"
                            )}
                          >
                            {item.name}
                          </span>

                          {pathname === item.href && (
                            <motion.div
                              className="ml-auto w-2 h-2 rounded-full bg-[#00f0ff]"
                              layoutId="mobileActiveNav"
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </nav>

                {/* Menu Footer */}
                <div className="p-4 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-center text-black font-semibold hover:opacity-90 transition-opacity"
                  >
                    Let's Work Together
                  </Link>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <a
                      href="https://github.com/SunilBaghel002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/sunilbaghel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/sunilbaghel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
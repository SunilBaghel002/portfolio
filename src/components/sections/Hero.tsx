"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "@/components/animations/Marquee";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const tags = ["Full-Stack", "Fintech", "SaaS", "Desktop Apps"];

const marqueeItems = [
  "Available for Work",
  "8 Hackathon Wins",
  "2× National Winner",
  "560+ Solo Commits",
  "Co-Founder @ Forgeweb",
  "10,000+ Users Reached",
  "385-Day GitHub Streak",
];

export default function Hero() {
  const handleScroll = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Masthead Strip */}
      <motion.div
        className="pt-24 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="container-editorial max-w-6xl">
          <div
            className="flex items-center justify-between py-3"
            style={{
              borderTop: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span
              className="tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--color-text-muted)",
                fontWeight: 600,
              }}
            >
              The Builder&apos;s Journal
            </span>
            <span
              className="hidden sm:block tracking-[0.15em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--color-text-muted)",
              }}
            >
              Vol. 03 · Issue 01
            </span>
            <span
              className="tracking-[0.15em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--color-text-muted)",
              }}
            >
              July 2026
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Area */}
      <div className="flex-1 flex items-center">
        <div className="container-editorial max-w-6xl w-full py-12 lg:py-20">
          <motion.div
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Left Column (Content - 7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Chapter marker */}
              <motion.div variants={fadeInUp} className="chapter-marker mb-8">
                <span>Chapter One</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeInUp}
                className="mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 7vw, 6.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                }}
              >
                Building
                <br />
                things that
                <br />
                <span className="text-highlight">work.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="max-w-lg mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1875rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                I&apos;m Sunil — a full-stack developer building fintech
                platforms, SaaS products, and desktop applications from a small
                town in India.
              </motion.p>

              {/* Handwritten note */}
              <motion.p
                variants={fadeInUp}
                className="mb-8"
                style={{
                  fontFamily: "var(--font-handwritten)",
                  fontSize: "1.25rem",
                  color: "var(--color-accent)",
                }}
              >
                Currently: 3rd year CSE · Co-founder @ Forgeweb
              </motion.p>

              {/* Tags */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-2 mb-8"
              >
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => handleScroll("#about")}
                  className="btn-primary"
                >
                  Read My Story
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  onClick={() => handleScroll("#contact")}
                  className="btn-secondary"
                >
                  Get In Touch
                </button>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-5 flex flex-col items-center lg:items-center gap-8"
              variants={fadeInUp}
            >
              {/* Polaroid Photo */}
              <div className="polaroid relative max-w-[280px] w-full">
                <div className="polaroid-tape" />
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/personal/profile.png"
                    alt="Sunil Baghel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 70vw, 280px"
                    priority
                  />
                </div>
                <p
                  className="mt-2 text-center"
                  style={{
                    fontFamily: "var(--font-handwritten)",
                    fontSize: "1rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  That&apos;s me, 3rd year CSE
                </p>
              </div>

              {/* Metadata Card */}
              <div
                className="w-full max-w-[280px] text-left"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem",
                }}
              >
                {/* Currently Building */}
                <div className="mb-4">
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Currently Building
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    PayDeskNow — B2B Fintech Platform
                  </p>
                </div>

                <div
                  className="mb-4"
                  style={{
                    borderTop: "1px solid var(--color-border-light)",
                    paddingTop: "0.75rem",
                  }}
                >
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Status
                  </p>
                  <p
                    className="flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--color-green)",
                      fontWeight: 500,
                    }}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    Available for opportunities
                  </p>
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--color-border-light)",
                    paddingTop: "0.75rem",
                  }}
                >
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Location
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    India · Working globally
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Marquee Ticker */}
      <div
        className="py-4"
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Marquee speed={25}>
          <div className="flex items-center gap-8 px-4">
            {marqueeItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-3 whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-secondary)",
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "var(--color-accent)" }}>●</span>
                {item}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
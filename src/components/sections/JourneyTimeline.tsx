"use client";

import { motion } from "framer-motion";
import {
  Factory,
  GraduationCap,
  Target,
  Smartphone,
  Laptop,
  Trophy,
  Flame,
  Rocket,
  Star,
  LucideIcon,
} from "lucide-react";

interface Chapter {
  date: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
  annotation?: string;
}

const chapters: Chapter[] = [
  {
    date: "May 2023",
    icon: Factory,
    title: "The Beginning",
    description:
      "Started working in a hose pipe factory the day after 12th boards. Earned money for my first phone.",
    annotation: "↑ Where it all started",
  },
  {
    date: "September 2023",
    icon: GraduationCap,
    title: "The Unexpected Path",
    description:
      "Enrolled in a Tier 3 engineering college. Never planned to be an engineer.",
  },
  {
    date: "January 2024",
    icon: Target,
    title: "The Test",
    description:
      "Attempted JEE with zero preparation. Scored 94 percentile. Chose to stay for financial reasons.",
  },
  {
    date: "May 2024",
    icon: Smartphone,
    title: "The Turning Point",
    description:
      "Started learning to code. On a phone. Because I didn't own a laptop.",
    annotation: "← This changed everything",
  },
  {
    date: "September 2024",
    icon: Laptop,
    title: "The First Tool",
    description:
      "Bought my first laptop on my birthday. Half from savings, half from father. Everything changed.",
  },
  {
    date: "January 2025",
    icon: Trophy,
    title: "The First Win — National",
    description:
      "6th Technovation, Sharda University. First hackathon ever. National level. Won ₹25,000. Project: PIPH. Knew only HTML, CSS, JS.",
    highlight: true,
    annotation: "★ First hackathon, national win!",
  },
  {
    date: "2025",
    icon: Flame,
    title: "The Storm Year",
    description:
      "Won 6 more hackathons. Built Smart Power (hardware + software). 2nd National win at Geeta University. Co-founded Skill Shastra.",
    highlight: true,
  },
  {
    date: "January 2026",
    icon: Rocket,
    title: "The Agency",
    description:
      "Co-founded Forgeweb with Aryan. Started shipping production apps for real clients.",
  },
  {
    date: "Now",
    icon: Star,
    title: "The Next Chapter",
    description:
      "Actively looking for opportunities to build things that matter. Open to full-time roles, internships, and collaborations.",
    annotation: "You could be part of this →",
  },
];

export default function JourneyTimeline() {
  return (
    <section id="journey" className="section-padding">
      <div className="container-editorial">
        {/* Chapter marker */}
        <motion.div
          className="chapter-marker mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Chapter 03 — The Journey</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-h1 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          24 months. In chapters.
        </motion.h2>

        <motion.p
          className="mb-16"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          From a factory floor to shipping code for clients.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop center, mobile left) */}
          <div
            className="absolute top-0 bottom-0 w-px hidden md:block"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--color-border)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-px md:hidden"
            style={{
              left: "20px",
              background: "var(--color-border)",
            }}
          />

          {/* Chapters */}
          <div className="flex flex-col gap-12 md:gap-16">
            {chapters.map((chapter, i) => {
              const isEven = i % 2 === 0;
              const Icon = chapter.icon;

              return (
                <motion.div
                  key={chapter.date}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-2 gap-12 items-center">
                    {/* Left side */}
                    <div
                      className={`${isEven ? "text-right pr-12" : "order-2 pl-12"}`}
                    >
                      {isEven ? (
                        /* Date + icon on left */
                        <div className="flex flex-col items-end gap-2">
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              letterSpacing: "0.1em",
                              color: "var(--color-text-muted)",
                              textTransform: "uppercase",
                            }}
                          >
                            {chapter.date}
                          </span>
                          <div style={{ color: "var(--color-accent)" }}>
                            <Icon className="w-8 h-8" />
                          </div>
                        </div>
                      ) : (
                        /* Content on left */
                        <div
                          className={`card-warm p-6 ${chapter.highlight ? "gold-border" : ""}`}
                          style={{
                            transform: `rotate(${isEven ? "-0.5" : "0.5"}deg)`,
                          }}
                        >
                          <h3
                            className="mb-2"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.375rem",
                              fontWeight: 500,
                              color: "var(--color-text-primary)",
                            }}
                          >
                            {chapter.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.9375rem",
                              lineHeight: 1.7,
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {chapter.description}
                          </p>
                          {chapter.annotation && (
                            <p
                              className="mt-3"
                              style={{
                                fontFamily: "var(--font-handwritten)",
                                fontSize: "1.125rem",
                                color: "var(--color-accent)",
                              }}
                            >
                              {chapter.annotation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right side */}
                    <div
                      className={`${isEven ? "order-2 pl-12" : "text-right pr-12 order-1"}`}
                    >
                      {isEven ? (
                        /* Content on right */
                        <div
                          className={`card-warm p-6 ${chapter.highlight ? "gold-border" : ""}`}
                          style={{
                            transform: `rotate(${isEven ? "0.5" : "-0.5"}deg)`,
                          }}
                        >
                          <h3
                            className="mb-2"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.375rem",
                              fontWeight: 500,
                              color: "var(--color-text-primary)",
                            }}
                          >
                            {chapter.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.9375rem",
                              lineHeight: 1.7,
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {chapter.description}
                          </p>
                          {chapter.annotation && (
                            <p
                              className="mt-3"
                              style={{
                                fontFamily: "var(--font-handwritten)",
                                fontSize: "1.125rem",
                                color: "var(--color-accent)",
                              }}
                            >
                              {chapter.annotation}
                            </p>
                          )}
                        </div>
                      ) : (
                        /* Date + icon on right */
                        <div className="flex flex-col items-end gap-2">
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              letterSpacing: "0.1em",
                              color: "var(--color-text-muted)",
                              textTransform: "uppercase",
                            }}
                          >
                            {chapter.date}
                          </span>
                          <div style={{ color: "var(--color-accent)" }}>
                            <Icon className="w-8 h-8" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center node */}
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div
                        className={`timeline-node ${chapter.highlight ? "national" : "active"}`}
                      />
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden pl-12 relative">
                    {/* Node */}
                    <div
                      className="absolute left-[14px] top-2"
                    >
                      <div
                        className={`timeline-node ${chapter.highlight ? "national" : "active"}`}
                      />
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: "var(--color-accent)" }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          color: "var(--color-text-muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        {chapter.date}
                      </span>
                    </div>
                    <div
                      className={`card-warm p-5 ${chapter.highlight ? "gold-border" : ""}`}
                    >
                      <h3
                        className="mb-1.5"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {chapter.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          lineHeight: 1.7,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {chapter.description}
                      </p>
                      {chapter.annotation && (
                        <p
                          className="mt-2"
                          style={{
                            fontFamily: "var(--font-handwritten)",
                            fontSize: "1rem",
                            color: "var(--color-accent)",
                          }}
                        >
                          {chapter.annotation}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

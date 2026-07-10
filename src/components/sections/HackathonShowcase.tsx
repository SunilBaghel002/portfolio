"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import CountUp from "@/components/animations/CountUp";
import { hackathons, hackathonStats } from "@/data/hackathons";

export default function HackathonShowcase() {
  const nationalWins = hackathons.filter((h) => h.isNational);
  const regularWins = hackathons.filter((h) => !h.isNational);

  return (
    <section className="section-padding">
      <div className="container-editorial">
        {/* Chapter marker */}
        <motion.div
          className="chapter-marker mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Chapter 05 — Hackathon Wins</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-h1 mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          8 wins. 2 national titles.
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
          Building under pressure taught me more than any course.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            {
              value: hackathonStats.totalParticipated,
              suffix: "+",
              label: "Attempted",
            },
            { value: hackathonStats.totalWins, suffix: "", label: "Won" },
            { value: hackathonStats.nationalWins, suffix: "", label: "National" },
            {
              value: 80,
              prefix: "₹",
              suffix: "K+",
              label: "Prize Money",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div className="stat-number">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix}
                />
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* National Wins - Featured */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {nationalWins.map((hack, i) => (
            <motion.div
              key={hack.id}
              className="gold-border p-8"
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="gold-badge flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  National Win
                </span>
              </div>

              <h3
                className="mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                {hack.event}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {hack.location}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {hack.date}
                </span>
              </div>

              {hack.prize && (
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                  }}
                >
                  ₹{hack.prize.toLocaleString()}
                </p>
              )}

              <p
                className="mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                Project: {hack.project}
              </p>

              {hack.note && (
                <p
                  style={{
                    fontFamily: "var(--font-handwritten)",
                    fontSize: "1.125rem",
                    color: "var(--color-accent)",
                  }}
                >
                  &quot;{hack.note}&quot;
                </p>
              )}

              {hack.story && (
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {hack.story.split("\n")[0]}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Regular Wins - Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularWins.map((hack, i) => (
            <motion.div
              key={hack.id}
              className="card-warm p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div style={{ color: "var(--color-accent)" }}>
                  <Trophy className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {hack.date}
                </span>
              </div>

              <h4
                className="mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                {hack.event}
              </h4>

              <p
                className="mb-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {hack.location}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Project: {hack.project}
              </p>

              {hack.prize && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                  }}
                >
                  ₹{hack.prize.toLocaleString()}
                </p>
              )}

              {hack.note && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-handwritten)",
                    fontSize: "1rem",
                    color: "var(--color-accent)",
                  }}
                >
                  {hack.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

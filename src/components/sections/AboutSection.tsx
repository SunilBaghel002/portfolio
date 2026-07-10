"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Rocket, Zap } from "lucide-react";

const quickFacts = [
  { icon: MapPin, label: "Based in", value: "India" },
  { icon: GraduationCap, label: "Studying", value: "CSE, 3rd Year" },
  { icon: Briefcase, label: "Role", value: "Co-Founder @ Forgeweb" },
  { icon: Rocket, label: "Building", value: "PayDeskNow" },
  { icon: Zap, label: "Streak", value: "385 days" },
];

const availableFor = [
  "Full-time roles",
  "Internships",
  "Client projects",
  "Collaborations",
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-editorial">
        {/* Chapter marker */}
        <motion.div
          className="chapter-marker mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Chapter 02 — About</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-h1 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How a factory worker
          <br />
          became a developer.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="mb-16 max-w-2xl"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          An honest account of the two years that changed everything.
        </motion.p>

        {/* Article + Sidebar */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Article Content */}
          <motion.div
            className="lg:col-span-7 content-width"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Drop cap paragraph */}
            <p
              className="drop-cap mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              I never planned to be a developer. In May 2023, the day after my
              Class 12 board exams ended, I was in a factory manufacturing hose
              pipes for cars. Two months of that bought me my first phone.
            </p>

            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              By September 2023, I was at a Tier 3 engineering college in
              India — a place I&apos;d never planned to be. But a friend was
              preparing for JEE, so I tried too. Scored 94 percentile in
              January 2024. Then 90 in April. Both with zero preparation.
            </p>

            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              May 2024 was the turning point.{" "}
              <em>&quot;Sunil, this isn&apos;t going to work,&quot;</em> I told
              myself. <em>&quot;Start coding.&quot;</em>
            </p>

            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              But I didn&apos;t have a laptop. So I learned to code on my
              phone. Frontend Mentor challenges on a 5-inch screen. Not
              glamorous. But it worked.
            </p>

            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              September 2024 — my birthday — I bought my first laptop. Half
              from savings, half from my father. Everything changed. Within
              four months, I won my first hackathon. National level. At Sharda
              University. Knowing only HTML, CSS, and JavaScript. I walked out
              with ₹25,000 and a feeling I couldn&apos;t explain.
            </p>

            <p
              className="mb-8"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              In 2025, I won 7 more hackathons, co-founded{" "}
              <strong>Forgeweb</strong> with Aryan, started shipping production
              apps for real clients, and built Smart Power — a project that
              generates electricity from footsteps. Today, I&apos;m looking
              for the next challenge. Something that matters.
            </p>

            {/* Pull quote */}
            <blockquote className="pull-quote">
              &quot;The gap between &apos;factory worker&apos; and &apos;shipping
              code&apos; isn&apos;t talent. It&apos;s just refusing to wait for
              permission.&quot;
            </blockquote>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-5 lg:col-start-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              {/* Quick Facts */}
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                }}
              >
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Quick Facts
                </h3>
                <div className="flex flex-col gap-3">
                  {quickFacts.map((fact) => {
                    const Icon = fact.icon;
                    return (
                      <div key={fact.label} className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.75rem",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {fact.label}:{" "}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.8125rem",
                              fontWeight: 500,
                              color: "var(--color-text-primary)",
                            }}
                          >
                            {fact.value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Available For */}
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                }}
              >
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Available For
                </h3>
                <div className="flex flex-col gap-2">
                  {availableFor.map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <span style={{ color: "var(--color-accent)" }}>→</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

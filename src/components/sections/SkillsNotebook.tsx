"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  subtitle: string;
  skills: string[];
  note?: string;
  rotation: number;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    subtitle: "The visible side of things.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    note: "Building interfaces people actually enjoy using.",
    rotation: -0.5,
  },
  {
    title: "Backend",
    subtitle: "Where the logic lives.",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "REST APIs",
      "Payment Gateway Integration",
    ],
    note: "Real transactions require real reliability.",
    rotation: 0.5,
  },
  {
    title: "Databases",
    subtitle: "Storing what matters.",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Supabase"],
    rotation: -0.3,
  },
  {
    title: "Desktop & Cross-Platform",
    subtitle: "Beyond the browser.",
    skills: ["Electron.js", "SQLite for offline-first apps"],
    note: "Built FlashBill POS with 120+ solo commits using this stack.",
    rotation: 0.4,
  },
  {
    title: "Integrations",
    subtitle: "Connecting systems.",
    skills: [
      "Razorpay",
      "Stripe",
      "WhatsApp Business API",
      "AEPS/BBPS APIs",
      "Firebase Auth",
    ],
    rotation: -0.6,
  },
  {
    title: "Tools & Workflow",
    subtitle: "Daily companions.",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Netlify",
      "Postman",
      "VS Code",
      "Cursor",
      "Figma",
    ],
    rotation: 0.3,
  },
  {
    title: "Currently Learning",
    subtitle: "Growth in progress.",
    skills: [
      "System Design",
      "Distributed Systems",
      "Rust",
      "Docker",
      "Kubernetes basics",
    ],
    note: "The learning never stops.",
    rotation: -0.4,
  },
];

export default function SkillsNotebook() {
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
          <span>Chapter 06 — Toolkit</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-h1 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What I build with.
        </motion.h2>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              className="page-fold card-warm p-6"
              style={{
                transform: `rotate(${category.rotation}deg)`,
              }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Category title */}
              <h3
                className="mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.375rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                {category.title}
              </h3>

              <p
                className="mb-4"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                  color: "var(--color-text-muted)",
                }}
              >
                {category.subtitle}
              </p>

              {/* Divider */}
              <div
                className="mb-4"
                style={{
                  height: "1px",
                  background: "var(--color-border-light)",
                }}
              />

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Handwritten note */}
              {category.note && (
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-handwritten)",
                    fontSize: "1.0625rem",
                    color: "var(--color-accent)",
                  }}
                >
                  {category.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

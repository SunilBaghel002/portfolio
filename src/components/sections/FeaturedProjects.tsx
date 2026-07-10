"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";

type FilterType = "all" | "client" | "hardware";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Client Work", value: "client" },
  { label: "Innovation", value: "hardware" },
];

export default function FeaturedProjects() {
  const [filter, setFilter] = useState<FilterType>("all");

  // Show only the 6 main projects
  const mainProjectIds = [
    "paydesknow",
    "flashbill",
    "hello-pizza-cafe",
    "mobitel",
    "proton-sms",
    "smart-power",
  ];

  const filteredProjects = projects
    .filter((p) => mainProjectIds.includes(p.id))
    .filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="work" className="section-padding">
      <div className="container-editorial">
        {/* Chapter marker */}
        <motion.div
          className="chapter-marker mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Chapter 04 — Selected Work</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-h1 mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Things I&apos;ve shipped.
        </motion.h2>

        <motion.p
          className="mb-10"
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
          Real projects. Real clients. Real users.
        </motion.p>

        {/* Filter tabs */}
        <motion.div
          className="flex gap-2 mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "var(--font-sans)",
                background:
                  filter === f.value
                    ? "var(--color-accent)"
                    : "var(--color-surface)",
                color: filter === f.value ? "#fff" : "var(--color-text-secondary)",
                border: `1px solid ${
                  filter === f.value
                    ? "var(--color-accent)"
                    : "var(--color-border-light)"
                }`,
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="flex flex-col gap-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.article
                  key={project.id}
                  className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                  data-cursor="view"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Content */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? "" : "lg:order-2"
                    }`}
                  >
                    {/* Project number & type */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          color: "var(--color-text-muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.number}
                      </span>
                      <span
                        className="w-8 h-px"
                        style={{ background: "var(--color-border)" }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.08em",
                          color: "var(--color-accent)",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.isFlagship ? "Flagship" : project.type}
                      </span>
                    </div>

                    {/* Project name */}
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                        lineHeight: 1.15,
                      }}
                    >
                      {project.name}
                    </h3>

                    {/* Tagline */}
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontStyle: "italic",
                        fontSize: "1.0625rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      &quot;{project.tagline}&quot;
                    </p>

                    {/* Description */}
                    <p
                      className="mb-6"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                      {project.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h.text}
                          className="flex items-center gap-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8125rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          <span style={{ color: "var(--color-accent)" }}>
                            ●
                          </span>
                          {h.text}
                        </span>
                      ))}
                    </div>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="skill-pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ fontSize: "0.8125rem", padding: "0.625rem 1.25rem" }}
                        >
                          Live Site
                          <span aria-hidden="true">→</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{ fontSize: "0.8125rem", padding: "0.625rem 1.25rem" }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? "lg:order-2" : ""
                    }`}
                  >
                    <div
                      className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border-light)",
                        transform: `rotate(${isEven ? "1" : "-1"}deg)`,
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
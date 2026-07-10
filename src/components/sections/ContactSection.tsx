"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Globe } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "sunil@forgeweb.in",
    href: "mailto:sunil@forgeweb.in",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sunil-baghel",
    href: "https://linkedin.com/in/sunil-baghel-140a60348",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/SunilBaghel002",
    href: "https://github.com/SunilBaghel002",
  },
  {
    icon: Globe,
    label: "Forgeweb",
    value: "forgeweb.in",
    href: "https://forgeweb.in",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-editorial">
        {/* Chapter marker */}
        <motion.div
          className="chapter-marker mb-8 justify-center"
          style={{ justifyContent: "center" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Chapter 08 — Let&apos;s Talk</span>
        </motion.div>

        {/* Centered content */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-h1 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Have a story
            <br />
            to tell?
          </motion.h2>

          <motion.p
            className="mb-12"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "1.125rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            I&apos;m always up for a conversation about building things that
            matter.
          </motion.p>

          {/* Postcard */}
          <motion.div
            className="postcard text-left mx-auto max-w-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="p-8">
              {/* Contact links */}
              <div className="flex flex-col gap-5 mb-8">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group transition-colors duration-300"
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: "var(--color-accent)" }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.625rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {link.label}
                        </p>
                        <p
                          className="link-underline"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9375rem",
                            fontWeight: 500,
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {link.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Divider */}
              <div
                className="mb-6"
                style={{
                  height: "1px",
                  background: "var(--color-border-light)",
                }}
              />

              {/* Response time & availability */}
              <div className="flex flex-col gap-3">
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Response Time
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Usually within 24 hours ⚡
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Current Availability
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
              </div>
            </div>
          </motion.div>

          {/* Handwritten signature */}
          <motion.p
            className="mt-12"
            style={{
              fontFamily: "var(--font-handwritten)",
              fontSize: "2rem",
              color: "var(--color-text-primary)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            — Sunil
          </motion.p>
        </div>
      </div>
    </section>
  );
}

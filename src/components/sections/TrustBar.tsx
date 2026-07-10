"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Briefcase, Smartphone, Zap } from "lucide-react";

const achievements = [
  { icon: Award, text: "2× National Hackathon Winner" },
  { icon: Trophy, text: "8 Total Hackathon Wins" },
  { icon: Briefcase, text: "Co-Founder @ Forgeweb" },
  { icon: Smartphone, text: "10,000+ Users Reached" },
  { icon: Zap, text: "385-Day GitHub Streak" },
];

export default function TrustBar() {
  return (
    <section className="section-padding" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container-editorial">
        <motion.p
          className="chapter-marker mb-8 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ justifyContent: "center" }}
        >
          <span>Featured Achievements</span>
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                className="flex flex-col items-center text-center px-4 py-4 relative group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Separator line on left (desktop) */}
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                    style={{ background: "var(--color-border)" }}
                  />
                )}

                <div className="mb-2 transition-transform duration-300 group-hover:scale-110" style={{ color: "var(--color-accent)" }}>
                  <Icon className="w-6 h-6" />
                </div>
                <p
                  className="transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

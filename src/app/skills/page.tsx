"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { portfolioData } from "@/lib/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedHeading } from "@/components/animations/AnimatedText";
import { X, ExternalLink, Folder } from "lucide-react";

const SkillGalaxy = dynamic(() => import("@/components/three/SkillGalaxy"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-accent-neon border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface SkillModalProps {
  skill: typeof portfolioData.skills[0];
  onClose: () => void;
}

function SkillModal({ skill, onClose }: SkillModalProps) {
  // Example projects using this skill
  const relatedProjects = portfolioData.projects.filter((p) =>
    p.tags.some((t) => t.toLowerCase().includes(skill.name.toLowerCase()))
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-lg rounded-3xl glass-strong overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div
          className="p-8 relative"
          style={{
            background: `linear-gradient(135deg, ${skill.color}20, transparent)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${skill.color}30` }}
          >
            <span className="text-2xl font-bold" style={{ color: skill.color }}>
              {skill.name.charAt(0)}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
          <p className="text-white/60 mt-1 capitalize">{skill.category}</p>
        </div>

        {/* Content */}
        <div className="p-8 pt-0">
          {/* Skill Level */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Proficiency</span>
              <span style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 mb-6">
            I&apos;ve been working with {skill.name} for several years, building
            production-ready applications and contributing to open-source projects.
            This skill is essential in my development workflow.
          </p>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">
                Related Projects
              </h4>
              <div className="space-y-2">
                {relatedProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Folder className="w-4 h-4 text-accent-neon" />
                    <span className="text-white/80 flex-1">{project.title}</span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 text-white/40 hover:text-accent-neon" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillCard({ skill, onClick }: { skill: typeof portfolioData.skills[0]; onClick: () => void }) {
  return (
    <motion.div
      className="glass p-6 rounded-2xl cursor-pointer group"
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${skill.color}20` }}
        >
          <span className="text-lg font-bold" style={{ color: skill.color }}>
            {skill.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-white group-hover:text-accent-neon transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm text-white/40 capitalize">{skill.category}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<typeof portfolioData.skills[0] | null>(null);

  const categories = Array.from(new Set(portfolioData.skills.map((s) => s.category)));

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-accent-neon text-sm font-medium uppercase tracking-wider mb-4 block">
              Expertise
            </span>
          </ScrollReveal>
          <AnimatedHeading>Skills Galaxy</AnimatedHeading>
          <ScrollReveal delay={0.2}>
            <p className="text-white/60 max-w-2xl mx-auto mt-6">
              Explore my technical skills visualized as an interactive galaxy. 
              Each node represents a technology I work with. Click to learn more.
            </p>
          </ScrollReveal>
        </div>

        {/* 3D Galaxy */}
        <ScrollReveal delay={0.3}>
          <div className="mb-20 glass rounded-3xl overflow-hidden">
            <SkillGalaxy onSkillClick={setSelectedSkill} />
          </div>
        </ScrollReveal>

        {/* Skills Grid by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-16">
            <ScrollReveal>
              <h3 className="text-xl font-semibold text-white mb-6 capitalize">
                {category}
              </h3>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioData.skills
                .filter((s) => s.category === category)
                .map((skill, index) => (
                  <ScrollReveal key={skill.name} delay={index * 0.1}>
                    <SkillCard skill={skill} onClick={() => setSelectedSkill(skill)} />
                  </ScrollReveal>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent-neon/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-[128px]" />
      </div>
    </div>
  );
}
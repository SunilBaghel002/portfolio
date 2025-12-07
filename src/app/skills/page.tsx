"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Skill } from "@/lib/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedHeading } from "@/components/animations/AnimatedText";
import {
  ConcentricOrbits,
  TechCard,
  TechIcon,
} from "@/components/ui/TechIcon";
import { X, ExternalLink, Folder } from "lucide-react";

interface SkillModalProps {
  skill: { name: string; level: number };
  category: string;
  color: string;
  onClose: () => void;
}

function SkillModal({ skill, category, color, onClose }: SkillModalProps) {
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
        className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-lg rounded-3xl glass-strong overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div
          className="p-8 relative"
          style={{
            background: `linear-gradient(135deg, ${color}20, transparent)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: `${color}20`,
                border: `2px solid ${color}40`,
              }}
            >
              <TechIcon name={skill.name} color={color} size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
              <p className="text-white/60 capitalize">{category}</p>
            </div>
          </div>
        </div>

        <div className="p-8 pt-0">
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Proficiency</span>
              <span style={{ color }}>{skill.level}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <p className="text-white/70 mb-6">
            I&apos;ve been working with {skill.name} extensively, building
            production-ready applications. This skill is essential in my {category.toLowerCase()} workflow.
          </p>

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
                    <Folder className="w-4 h-4" style={{ color }} />
                    <span className="text-white/80 flex-1">{project.title}</span>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-white/40 hover:text-white" />
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

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<{
    skill: { name: string; level: number };
    category: string;
    color: string;
  } | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block">
              Technical Arsenal
            </span>
          </ScrollReveal>
          <AnimatedHeading>Skills Universe</AnimatedHeading>
          <ScrollReveal delay={0.2}>
            <p className="text-white/60 max-w-2xl mx-auto mt-6">
              Explore my technical skills organized in concentric orbits.
              Each ring represents a different domain of expertise.
              Hover over skills to see proficiency levels.
            </p>
          </ScrollReveal>
        </div>

        {/* Concentric Orbits Visualization */}
        <ScrollReveal delay={0.3}>
          <div className="mb-32">
            <ConcentricOrbits categories={portfolioData.skillCategories} />
          </div>
        </ScrollReveal>

        {/* Skills Grid by Category */}
        <div className="mt-32 space-y-16">
          {portfolioData.skillCategories.map((category, catIndex) => (
            <div key={category.name}>
              <ScrollReveal delay={catIndex * 0.1}>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <ScrollReveal
                    key={skill.name}
                    delay={catIndex * 0.1 + skillIndex * 0.03}
                    direction="scale"
                  >
                    <TechCard
                      name={skill.name}
                      color={category.color}
                      level={skill.level}
                      category={category.name}
                      onClick={() =>
                        setSelectedSkill({
                          skill,
                          category: category.name,
                          color: category.color,
                        })
                      }
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill.skill}
            category={selectedSkill.category}
            color={selectedSkill.color}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ec4899]/3 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/lib/data";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import {
  AnimatedHeading,
} from "@/components/animations/AnimatedText";
import { SkillConstellation, TechBadge } from "@/components/ui/TechIcon";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "Senior Developer",
    company: "Tech Corp",
    description: "Leading frontend architecture and mentoring junior developers.",
    icon: Briefcase,
    technologies: ["React", "TypeScript", "AWS"],
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    company: "Startup Inc",
    description: "Built core product features driving 300% user growth.",
    icon: Briefcase,
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Agency Co",
    description: "Crafted award-winning websites for Fortune 500 clients.",
    icon: Briefcase,
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    year: "2018",
    title: "Computer Science Degree",
    company: "University",
    description: "Graduated with honors, specializing in web technologies.",
    icon: GraduationCap,
    technologies: ["Python", "JavaScript", "Git"],
  },
];

const interests = [
  { name: "Open Source", icon: "💻" },
  { name: "Photography", icon: "📷" },
  { name: "Music Production", icon: "🎵" },
  { name: "Travel", icon: "✈️" },
  { name: "Gaming", icon: "🎮" },
  { name: "Coffee", icon: "☕" },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <ScrollReveal
      direction={isLeft ? "left" : "right"}
      delay={index * 0.1}
      className="relative"
    >
      <div
        className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"
          }`}
      >
        {/* Content */}
        <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
          <motion.div
            className="glass p-6 rounded-2xl inline-block"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <span className="text-[#00f0ff] text-sm font-mono">{item.year}</span>
            <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
            <p className="text-[#a855f7] text-sm mt-1">{item.company}</p>
            <p className="text-white/60 text-sm mt-2">{item.description}</p>

            {/* Tech badges */}
            <div
              className={`flex flex-wrap gap-2 mt-4 ${isLeft ? "justify-end" : "justify-start"
                }`}
            >
              {item.technologies.map((tech) => {
                const skill = portfolioData.skills.find(
                  (s) => s.name.toLowerCase() === tech.toLowerCase()
                );
                return (
                  <TechBadge
                    key={tech}
                    name={tech}
                    color={skill?.color || "#00f0ff"}
                    variant="glow"
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Center Icon */}
        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Empty space for alignment */}
        <div className="flex-1" />
      </div>
    </ScrollReveal>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#00f0ff]/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#a855f7]/30 rounded-full blur-[120px]" />
        </motion.div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative">
                <motion.div
                  className="relative aspect-square rounded-3xl overflow-hidden glass"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/20 to-[#a855f7]/20" />
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                    alt={portfolioData.name}
                    fill
                    className="object-cover mix-blend-luminosity opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -right-4 top-10 glass px-4 py-2 rounded-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-[#00f0ff] font-bold">5+</span>
                  <span className="text-white/60 text-sm ml-1">Years</span>
                </motion.div>

                <motion.div
                  className="absolute -left-4 bottom-20 glass px-4 py-2 rounded-xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-[#a855f7] font-bold">50+</span>
                  <span className="text-white/60 text-sm ml-1">Projects</span>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Content */}
            <div className="space-y-8">
              <ScrollReveal>
                <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider">
                  About Me
                </span>
              </ScrollReveal>

              <AnimatedHeading>Crafting Digital Experiences</AnimatedHeading>

              <ScrollReveal delay={0.2}>
                <p className="text-xl text-white/80 leading-relaxed">
                  {portfolioData.bio}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-white/60 leading-relaxed">
                  I believe in the power of clean code and beautiful design.
                  Every project is an opportunity to push boundaries and create
                  something extraordinary. My approach combines technical
                  excellence with creative problem-solving.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4 text-[#00f0ff]" />
                    {portfolioData.location}
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar className="w-4 h-4 text-[#a855f7]" />
                    Available for freelance
                  </div>
                </div>
              </ScrollReveal>

              {/* Tech Stack Preview */}
              <ScrollReveal delay={0.5}>
                <div className="flex flex-wrap gap-2 pt-4">
                  {portfolioData.skills.slice(0, 6).map((skill) => (
                    <TechBadge
                      key={skill.name}
                      name={skill.name}
                      color={skill.color}
                      variant="glow"
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block">
                Journey
              </span>
            </ScrollReveal>
            <AnimatedHeading>My Story</AnimatedHeading>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f0ff] via-[#a855f7] to-[#ec4899]" />

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Constellation */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block">
                  Expertise
                </span>
              </ScrollReveal>
              <AnimatedHeading>Skill Constellation</AnimatedHeading>
              <ScrollReveal delay={0.2}>
                <p className="text-white/60 mt-6">
                  My skills form an interconnected ecosystem, each one enhancing
                  the others to create comprehensive solutions. Hover over the
                  nodes to explore.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <SkillConstellation skills={portfolioData.skills.slice(0, 8)} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block">
                Beyond Code
              </span>
            </ScrollReveal>
            <AnimatedHeading>Interests & Hobbies</AnimatedHeading>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest) => (
              <StaggerItem key={interest.name}>
                <motion.div
                  className="glass p-6 rounded-2xl text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-4xl mb-3 block">{interest.icon}</span>
                  <span className="text-white/80">{interest.name}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
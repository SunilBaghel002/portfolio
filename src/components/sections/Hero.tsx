"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Simple floating orb with CSS animation only
function FloatingOrb({
  skill,
  position,
  delay,
}: {
  skill: { name: string; color: string };
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}) {
  return (
    <div
      className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
      style={{
        ...position,
        background: `radial-gradient(circle at 30% 30%, ${skill.color}50, ${skill.color}20)`,
        border: `1px solid ${skill.color}60`,
        boxShadow: `0 0 20px ${skill.color}30`,
        animation: `float 5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <span className="text-[10px] font-medium text-white/90">
        {skill.name.slice(0, 3)}
      </span>
    </div>
  );
}

// Pre-defined positions - no random values
const orbConfigs = [
  { position: { top: "18%", left: "8%" }, delay: 0 },
  { position: { top: "25%", right: "10%" }, delay: 0.8 },
  { position: { top: "55%", left: "5%" }, delay: 1.6 },
  { position: { top: "65%", right: "8%" }, delay: 2.4 },
  { position: { bottom: "30%", left: "12%" }, delay: 3.2 },
  { position: { bottom: "25%", right: "12%" }, delay: 4 },
];

// Simple fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export default function Hero() {
  const floatingSkills = portfolioData.skills.slice(0, 6);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static Background Blobs - CSS only, no Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full blur-[80px] md:blur-[100px] animate-blob"
          style={{ background: "rgba(0, 240, 255, 0.15)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] animate-blob"
          style={{ background: "rgba(168, 85, 247, 0.15)", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full blur-[60px] md:blur-[80px] animate-blob"
          style={{ background: "rgba(236, 72, 153, 0.1)", animationDelay: "4s" }}
        />
      </div>

      {/* Grid Pattern - Static */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Floating Skill Orbs - CSS animations only */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floatingSkills.map((skill, i) => (
          <FloatingOrb
            key={skill.name}
            skill={skill}
            position={orbConfigs[i].position}
            delay={orbConfigs[i].delay}
          />
        ))}
      </div>

      {/* Main Content - NO PARALLAX */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00f0ff]/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-sm text-white/80">Available for work</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4"
        >
          <span className="gradient-text block">Sunil</span>
          <span className="gradient-text block">Baghel</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-lg md:text-xl lg:text-2xl text-white/80 font-light mb-6"
        >
          {portfolioData.role}
        </motion.p>

        {/* Achievement Badges */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6"
        >
          {[
            { label: "8× Hackathon Winner", icon: "🏆" },
            { label: "Full Stack Developer", icon: "💻" },
            { label: "Open Source", icon: "⚡" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white/70 hover:border-[#00f0ff]/30 transition-colors duration-200"
            >
              <span>{item.icon}</span>
              {item.label}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <Link href="/projects">
            <Button
              variant="default"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View My Work
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<Mail className="w-4 h-4" />}
            >
              Get in Touch
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="default"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            Resume
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="flex items-center justify-center gap-3"
        >
          {portfolioData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glass border border-white/10 text-white/60 hover:text-white hover:border-[#00f0ff]/40 transition-all duration-200"
            >
              {social.icon === "github" && <Github className="w-5 h-5" />}
              {social.icon === "linkedin" && <Linkedin className="w-5 h-5" />}
              {social.icon === "twitter" && <Twitter className="w-5 h-5" />}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-[10px] uppercase tracking-widest text-white/40">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-white/50 animate-scroll-dot" />
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
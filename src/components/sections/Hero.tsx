// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { GlitchText } from "../animations/AnimatedText";
import { Button } from "../ui/button";

import {
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Trophy,
  Layers,
  GitFork,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import GradientName from "@/components/ui/GradientName";

// Lazy load heavy components
const FloatingTechOrbs = dynamic(() => import("../ui/TechIcon").then((mod) => mod.FloatingTechOrbs), {
  ssr: false
});
const Text3D = dynamic(() => import("@/components/three/Text3D"), {
  ssr: false,
  loading: () => <NamePlaceholder />,
});

// Loading placeholder
function NamePlaceholder() {
  return (
    <div className="h-[120px] md:h-[150px] flex items-center justify-center">
      <motion.div
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="gradient-text">SUNIL BAGHEL</span>
      </motion.div>
    </div>
  );
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Achievement data
const achievements = [
  {
    label: "8× Hackathon Winner",
    icon: Trophy,
    color: "#FFD700",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    label: "Full Stack Expert",
    icon: Layers,
    color: "#00f0ff",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    label: "Open Source Contributor",
    icon: GitFork,
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-500",
  },
];

// Achievement Badge Component
function AchievementBadge({
  label,
  icon: Icon,
  color,
  gradient,
  index,
}: {
  label: string;
  icon: any;
  color: string;
  gradient: string;
  index: number;
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 1 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-lg"
        style={{ background: `${color}20` }}
      />

      <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/10 group-hover:border-white/20 backdrop-blur-sm transition-all duration-200">
        <div
          className={`p-1.5 rounded-lg bg-gradient-to-br ${gradient}`}
          style={{ boxShadow: `0 0 12px ${color}30` }}
        >
          <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>

        <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// Floating code symbols
function FloatingCodeSymbols() {
  const symbols = [
    { char: "</>", x: "8%", y: "20%" },
    { char: "{}", x: "88%", y: "15%" },
    { char: "()", x: "5%", y: "60%" },
    { char: "[]", x: "92%", y: "55%" },
    { char: "=>", x: "10%", y: "40%" },
    { char: "//", x: "85%", y: "38%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => (
        <motion.span
          key={i}
          className="absolute text-white/[0.015] font-mono text-2xl md:text-4xl font-bold select-none"
          style={{ left: symbol.x, top: symbol.y }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.015, 0.04, 0.015],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {symbol.char}
        </motion.span>
      ))}
    </div>
  );
}

// Main Hero Component
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const floatingSkills = portfolioData.skills.slice(0, 6).map((skill) => ({
    name: skill.name,
    color: skill.color,
    level: skill.level,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8"
    >
      {/* Background decorations */}
      <FloatingCodeSymbols />

      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#00f0ff]/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[110px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.1, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ec4899]/5 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* Floating skill orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingTechOrbs skills={floatingSkills} className="opacity-40" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Status badge */}
        <motion.div
          variants={fadeInUp}
          className="mb-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] border border-[#00f0ff]/20 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-xs sm:text-sm text-white/60 font-medium">
            Available for opportunities
          </span>
        </motion.div>

        {/* 3D Name */}
        <motion.div className="mb-6" variants={fadeInUp}>
          <GradientName
            firstName="{SUNIL"
            lastName="BAGHEL}"
            primaryColor="#00f0ff"
            secondaryColor="#a855f7"
          />
        </motion.div>

        {/* Role */}
        <motion.div variants={fadeInUp} className="mb-6">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <motion.span
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#00f0ff]/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
            <Terminal className="w-4 h-4 text-[#00f0ff]/50" />
            <motion.span
              className="h-px w-8 bg-gradient-to-l from-transparent to-[#00f0ff]/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
          </div>
          <GlitchText
            text={portfolioData.role}
            className="text-base sm:text-lg md:text-xl text-white/50 font-light tracking-wide"
          />
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2.5 mb-8"
        >
          {achievements.map((achievement, i) => (
            <AchievementBadge key={achievement.label} {...achievement} index={i} />
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          className="text-sm sm:text-base text-white/35 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <Link href="/projects">
            <Button
              variant="gradient"
              size="lg"
              magnetic
              magneticStrength={0.15}
              shine
              glowOnHover
              className="group min-w-[150px]"
            >
              <span>View Work</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="neon"
              size="lg"
              magnetic
              magneticStrength={0.15}
              className="min-w-[150px]"
            >
              <Mail className="w-4 h-4 mr-1.5" />
              <span>Contact</span>
            </Button>
          </Link>

          <Button
            variant="glass"
            size="lg"
            magnetic
            className="min-w-[120px]"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <Download className="w-4 h-4 mr-1.5" />
            <span>Resume</span>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-2.5"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-widest mr-1.5">
            Connect
          </span>

          {portfolioData.socials.map((social, i) => {
            const Icon =
              social.icon === "github"
                ? Github
                : social.icon === "linkedin"
                  ? Linkedin
                  : Twitter;

            const hoverColor =
              social.icon === "github"
                ? "#ffffff"
                : social.icon === "linkedin"
                  ? "#0077b5"
                  : "#1da1f2";

            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-white/30 hover:text-white/80 transition-all duration-200"
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  borderColor: `${hoverColor}30`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a]/40 to-transparent pointer-events-none" />
    </section>
  );
}
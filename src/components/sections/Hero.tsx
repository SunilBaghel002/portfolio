// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { GlitchText } from "../animations/AnimatedText";
import { Button } from "../ui/button";
import { FloatingTechOrbs } from "../ui/TechIcon";
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
import { useRef, useState, useEffect } from "react";

const Text3D = dynamic(() => import("@/components/three/Text3D"), {
  ssr: false,
  loading: () => <NameLoadingState />,
});

const Text3DCSS = dynamic(() => import("@/components/ui/Text3DCSS"), {
  ssr: false,
  loading: () => <NameLoadingState />,
});

function NameLoadingState() {
  return (
    <div className="h-[120px] md:h-[150px] flex items-center justify-center">
      <motion.div
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="gradient-text">SUNIL BAGHEL</span>
      </motion.div>
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 1.2 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
        style={{ background: `linear-gradient(135deg, ${color}30, transparent)` }}
      />

      <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-white/20 backdrop-blur-sm transition-all duration-300">
        <div
          className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}
          style={{ boxShadow: `0 0 15px ${color}30` }}
        >
          <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>

        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function FloatingCodeSymbols() {
  const symbols = [
    { char: "</>", x: "8%", y: "18%" },
    { char: "{}", x: "88%", y: "12%" },
    { char: "( )", x: "3%", y: "65%" },
    { char: "[ ]", x: "92%", y: "60%" },
    { char: "=>", x: "12%", y: "40%" },
    { char: "//", x: "85%", y: "35%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => (
        <motion.span
          key={i}
          className="absolute text-white/[0.02] font-mono text-3xl md:text-5xl font-bold select-none"
          style={{ left: symbol.x, top: symbol.y }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.02, 0.06, 0.02],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {symbol.char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const [use3DCanvas, setUse3DCanvas] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const floatingSkills = portfolioData.skills.slice(0, 6).map((skill) => ({
    name: skill.name,
    color: skill.color,
    level: skill.level,
  }));

  useEffect(() => {
    const checkCapabilities = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) return;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const cores = navigator.hardwareConcurrency || 4;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!prefersReducedMotion && !isMobile && cores >= 4) {
          setUse3DCanvas(true);
        }
      } catch {
        // Use CSS fallback
      }
    };

    const timer = setTimeout(checkCapabilities, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      <FloatingCodeSymbols />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00f0ff]/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[120px]"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.15, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#ec4899]/8 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <FloatingTechOrbs skills={floatingSkills} className="opacity-50" />
      </div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-[#00f0ff]/20 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-sm text-white/70 font-medium">
            Available for opportunities
          </span>
        </motion.div>

        <motion.div
          className="mb-6"
          variants={fadeInUp}
        >
          {use3DCanvas ? (
            <Text3D
              firstName="SUNIL"
              lastName="BAGHEL"
              primaryColor="#00f0ff"
              secondaryColor="#a855f7"
              size={0.7}
              height={150}
              className="w-full"
            />
          ) : (
            <Text3DCSS
              firstName="SUNIL"
              lastName="BAGHEL"
              primaryColor="#00f0ff"
              secondaryColor="#a855f7"
            />
          )}
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.span
              className="h-px w-10 bg-gradient-to-r from-transparent to-[#00f0ff]/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
            <Terminal className="w-4 h-4 text-[#00f0ff]/60" />
            <motion.span
              className="h-px w-10 bg-gradient-to-l from-transparent to-[#00f0ff]/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </div>
          <GlitchText
            text={portfolioData.role}
            className="text-lg md:text-xl lg:text-2xl text-white/60 font-light tracking-wide"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {achievements.map((achievement, i) => (
            <AchievementBadge key={achievement.label} {...achievement} index={i} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <Link href="/projects">
            <Button
              variant="gradient"
              size="lg"
              magnetic
              magneticStrength={0.2}
              shine
              glowOnHover
              className="group min-w-[160px]"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="neon"
              size="lg"
              magnetic
              magneticStrength={0.2}
              className="group min-w-[160px]"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>Get in Touch</span>
            </Button>
          </Link>

          <Button
            variant="glass"
            size="lg"
            magnetic
            className="group min-w-[130px]"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Resume</span>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-xs text-white/25 uppercase tracking-widest mr-2">
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
                ? "#fff"
                : social.icon === "linkedin"
                  ? "#0077b5"
                  : "#1da1f2";

            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/40 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
              >
                <Icon className="w-5 h-5" style={{ color: "inherit" }} />
                <motion.span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at center, ${hoverColor}10, transparent 70%)`,
                    boxShadow: `0 0 20px ${hoverColor}20`,
                  }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent pointer-events-none" />
    </section>
  );
}
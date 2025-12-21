// components/sections/Hero.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { AnimatedText, GlitchText } from "../animations/AnimatedText";
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
  Code2,
  Zap,
  Star,
  Rocket,
  Terminal,
  Braces,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";

const Text3D = dynamic(() => import("@/components/three/Text3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[180px] md:h-[250px] flex items-center justify-center">
      <motion.span
        className="text-6xl md:text-8xl font-bold gradient-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SUNIL
      </motion.span>
    </div>
  ),
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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
  index
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
        delay: 1.5 + index * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
        style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
      />

      <div className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-white/20 backdrop-blur-sm transition-all duration-300">
        <div
          className={`p-2 rounded-xl bg-gradient-to-br ${gradient}`}
          style={{ boxShadow: `0 0 20px ${color}40` }}
        >
          <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>

        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
          {label}
        </span>

        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function Name3DFallback() {
  return (
    <div className="relative py-8">
      <motion.h1
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="relative inline-block">
          <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50" />
          <span className="relative gradient-text">SUNIL</span>
        </span>
      </motion.h1>
    </div>
  );
}

function FloatingCodeSymbols() {
  const symbols = [
    { char: "</>", x: "10%", y: "20%" },
    { char: "{}", x: "85%", y: "15%" },
    { char: "( )", x: "5%", y: "70%" },
    { char: "[ ]", x: "90%", y: "65%" },
    { char: "=>", x: "15%", y: "45%" },
    { char: "//", x: "80%", y: "40%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => (
        <motion.span
          key={i}
          className="absolute text-white/[0.03] font-mono text-4xl md:text-6xl font-bold select-none"
          style={{ left: symbol.x, top: symbol.y }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
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
  const [use3D, setUse3D] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const floatingSkills = portfolioData.skills.slice(0, 6).map(skill => ({
    name: skill.name,
    color: skill.color,
    level: skill.level,
  }));

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) setUse3D(false);
      } catch {
        setUse3D(false);
      }
    };
    checkWebGL();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <FloatingCodeSymbols />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/15 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#a855f7]/15 rounded-full blur-[150px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ec4899]/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <FloatingTechOrbs skills={floatingSkills} className="opacity-60" />
      </div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="mb-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-[#00f0ff]/30 backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-sm text-white/80 font-medium">
            Available for opportunities
          </span>
        </motion.div>

        <motion.div className="mb-4" variants={fadeInUp}>
          {use3D ? (
            <Text3D
              text="<SUNIL/>"
              color="#00f0ff"
              secondaryColor="#a855f7"
              size={1.2}
              height={200}
              className="w-full"
              animated
            />
          ) : (
            <Name3DFallback />
          )}
        </motion.div>

        <motion.div
          className="mb-6"
          variants={fadeInUp}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="text-white/90">{`{`}</span>
            </motion.span>
            <AnimatedText
              text="Baghel"
              className="gradient-text inline"
              delay={1}
              type="chars"
              animation="reveal"
            />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <span className="text-white/90">{`}`}</span>
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.span
              className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00f0ff]/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            />
            <Terminal className="w-5 h-5 text-[#00f0ff]" />
            <motion.span
              className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#00f0ff]/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            />
          </div>
          <GlitchText
            text={portfolioData.role}
            className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light tracking-wide"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
        >
          {achievements.map((achievement, i) => (
            <AchievementBadge key={achievement.label} {...achievement} index={i} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/projects">
            <Button
              variant="gradient"
              size="lg"
              magnetic
              magneticStrength={0.3}
              shine
              glowOnHover
              className="group min-w-[180px]"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="neon"
              size="lg"
              magnetic
              magneticStrength={0.3}
              className="group min-w-[180px]"
            >
              <Mail className="w-5 h-5 mr-2" />
              <span>Get in Touch</span>
            </Button>
          </Link>

          <Button
            variant="glass"
            size="lg"
            magnetic
            className="group min-w-[140px]"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            <span>Resume</span>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest mr-2">
            Connect
          </span>

          {portfolioData.socials.map((social, i) => {
            const Icon = social.icon === "github" ? Github
              : social.icon === "linkedin" ? Linkedin
                : Twitter;

            const hoverColor = social.icon === "github" ? "#fff"
              : social.icon === "linkedin" ? "#0077b5"
                : "#1da1f2";

            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + i * 0.1 }}
                style={{
                  ["--hover-color" as any]: hoverColor
                }}
              >
                <Icon className="w-5 h-5 group-hover:text-[var(--hover-color)]" />
                <motion.span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at center, ${hoverColor}15, transparent 70%)`
                  }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a]/60 to-transparent pointer-events-none" />
    </section>
  );
}
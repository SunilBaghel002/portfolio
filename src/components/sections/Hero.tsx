// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
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
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Text3D = dynamic(() => import("@/components/three/Text3D"), {
  ssr: false,
  loading: () => <div className="h-[200px] flex items-center justify-center">
    <span className="text-4xl font-bold gradient-text">Loading...</span>
  </div>
});

// Animation variants for cleaner code
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Hero() {
  // Get skills with their colors for floating orbs
  const floatingSkills = portfolioData.skills.slice(0, 6).map(skill => ({
    name: skill.name,
    color: skill.color,
    level: skill.level,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static Background Blobs - No Parallax, Just Subtle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#a855f7]/20 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ec4899]/15 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Floating Skill Orbs - Static position */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingTechOrbs skills={floatingSkills} className="opacity-70" />
      </div>

      {/* Main Content - No Parallax Transform */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Status Badge */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-[#00f0ff]/40 backdrop-blur-xl"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400 m-3.5"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-sm text-white/90 font-medium">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div className="mb-6">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Text3D
              text="SUNIL"
              color="#00f0ff"
              size={1.5}
              height={300}
              className="w-full"
            />
            <AnimatedText
              text="{Baghel}"
              className="gradient-text block"
              delay={0.8}
              type="chars"
              animation="reveal"
            />
          </motion.h1>
        </motion.div>

        {/* Role with Glitch Effect */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-6"
        >
          <GlitchText
            text={portfolioData.role}
            className="text-xl md:text-3xl text-white/90 font-light tracking-wide"
          />
        </motion.div>

        {/* Achievements highlight */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {[
            { label: "8× Hackathon Winner", icon: "🏆" },
            { label: "Full Stack Expert", icon: "💻" },
            { label: "Open Source Contributor", icon: "⚡" },
          ].map((item, i) => (
            <motion.span
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(0,240,255,0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link href="/projects">
            <Button
              variant="gradient"
              size="lg"
              magnetic
              magneticStrength={0.3}
              shine
              glowOnHover
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              View My Work
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="neon"
              size="lg"
              magnetic
              magneticStrength={0.3}
              rightIcon={<Mail className="w-5 h-5" />}
            >
              Get in Touch
            </Button>
          </Link>
          <Button
            variant="glass"
            size="lg"
            magnetic
            leftIcon={<Download className="w-5 h-5" />}
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            Resume
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 2 }}
          className="flex items-center justify-center gap-4"
        >
          {portfolioData.socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-[#00f0ff]/40 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 + i * 0.1 }}
            >
              {social.icon === "github" && <Github className="w-5 h-5" />}
              {social.icon === "linkedin" && <Linkedin className="w-5 h-5" />}
              {social.icon === "twitter" && <ExternalLink className="w-5 h-5" />}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent pointer-events-none" />
    </section>
  );
}
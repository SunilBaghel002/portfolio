"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { AnimatedText, GlitchText } from "../animations/AnimatedText";
import { Button } from "../ui/button";
import { FloatingTechOrbs } from "../ui/TechIcon";
import {
  ArrowDown,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yOrbs = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Spring for smooth animation
  const springConfig = { stiffness: 100, damping: 30 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // Get skills with their colors for floating orbs
  const floatingSkills = portfolioData.skills.slice(0, 6).map(skill => ({
    name: skill.name,
    color: skill.color,
    level: skill.level,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Blobs with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/20 rounded-full blur-[120px]"
          style={{ y: yBg1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#a855f7]/20 rounded-full blur-[150px]"
          style={{ y: yBg2 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -40, 0],
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
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating Skill Orbs with Parallax */}
      <motion.div style={{ y: yOrbs }} className="absolute inset-0">
        <FloatingTechOrbs skills={floatingSkills} className="opacity-70" />
      </motion.div>

      {/* Main Content with Parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y: ySpring, opacity, scale: scaleSpring }}
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-[#00f0ff]/40 backdrop-blur-xl"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-sm text-white/90 font-medium">Available for opportunities</span>
        </motion.div>

        {/* Main Heading with Parallax */}
        <motion.div
          className="mb-6"
          style={{ rotate }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <AnimatedText
              text="Sunil"
              className="gradient-text block"
              delay={0.5}
              type="chars"
              animation="reveal"
            />
            <AnimatedText
              text="Baghel"
              className="gradient-text block"
              delay={0.8}
              type="chars"
              animation="reveal"
            />
          </motion.h1>
        </motion.div>

        {/* Role with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <GlitchText
            text={portfolioData.role}
            className="text-xl md:text-3xl text-white/90 font-light tracking-wide"
          />
        </motion.div>

        {/* Achievements highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
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
              whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.3)" }}
            >
              <span>{item.icon}</span>
              {item.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2, ease: "easeOut" }}
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

      {/* Scroll Indicator with Enhanced Animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">
            Scroll to explore
          </span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 group-hover:border-[#00f0ff]/50 flex justify-center pt-2 transition-colors"
            animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(0,240,255,0.3)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-[#00f0ff]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent pointer-events-none" />
    </section>
  );
}
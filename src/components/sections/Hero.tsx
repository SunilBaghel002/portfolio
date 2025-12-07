"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { AnimatedText, GlitchText } from "../animations/AnimatedText";
import { Button } from "../ui/button";
import { FloatingTechOrbs } from "../ui/TechIcon";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Skill Orbs with Icons - Now with fixed positions */}
      <FloatingTechOrbs skills={floatingSkills} className="opacity-80" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00f0ff]/30"
        >
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-sm text-white/80">Available for work</span>
        </motion.div>

        {/* Main Heading */}
        <div className="mb-6">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <AnimatedText
              text={portfolioData.name}
              className="gradient-text"
              delay={0.5}
              type="chars"
              animation="reveal"
            />
          </motion.h1>
        </div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <GlitchText
            text={portfolioData.role}
            className="text-xl md:text-2xl text-white/80 font-light"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
        >
          {portfolioData.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects">
            <Button variant="default" size="lg" magnetic>
              View My Work
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" magnetic>
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />
    </section>
  );
}
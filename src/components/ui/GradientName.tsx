// components/ui/GradientName.tsx
"use client";

import { motion } from "framer-motion";

interface GradientNameProps {
  firstName?: string;
  lastName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export default function GradientName({
  firstName = "SUNIL",
  lastName = "BAGHEL",
  primaryColor = "#00f0ff",
  secondaryColor = "#a855f7",
  className = "",
}: GradientNameProps) {
  // Letter animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const firstNameLetters = firstName.split("");
  const lastNameLetters = lastName.split("");

  return (
    <div className={`relative ${className}`}>
      {/* Subtle glow background */}
      <div
        className="absolute inset-0 blur-3xl opacity-30 -z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${primaryColor}40 0%, ${secondaryColor}20 50%, transparent 70%)`,
        }}
      />

      {/* Main text container */}
      <motion.div
        className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* First Name */}
        <div className="flex">
          {firstNameLetters.map((letter, index) => (
            <motion.span
              key={`first-${index}`}
              variants={letterVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight inline-block"
              style={{
                background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `0 0 40px ${primaryColor}30`,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Last Name */}
        <div className="flex">
          {lastNameLetters.map((letter, index) => (
            <motion.span
              key={`last-${index}`}
              variants={letterVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight inline-block"
              style={{
                background: `linear-gradient(180deg, ${secondaryColor} 0%, #ec4899 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `0 0 40px ${secondaryColor}30`,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Trophy, Star, Award, X, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  trophy: Trophy,
  star: Star,
  award: Award,
  rocket: TrendingUp,
};

interface AchievementCardProps {
  achievement: typeof portfolioData.achievements[0];
  index: number;
  onClick: () => void;
}

function AchievementCard({ achievement, index, onClick }: AchievementCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative h-full p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden group-hover:border-[#00f0ff]/50 transition-colors duration-500">
        {/* Holographic Shine */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(0, 240, 255, 0.4) 25%, transparent 30%, transparent 45%, rgba(168, 85, 247, 0.4) 50%, transparent 55%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 0%",
            filter: "blur(5px)"
          }}
        />

        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(0,240,255,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Icon with animated background */}
        <motion.div
          className="absolute top-6 right-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: index * 0.15 + 0.3,
          }}
        >
          <motion.div
            className="relative p-4 rounded-xl bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 border border-[#00f0ff]/20 group-hover:border-[#00f0ff] transition-colors"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-6 h-6 text-[#00f0ff]" />

            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Year badge */}
        <motion.div
          className="inline-block px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono font-semibold mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          {achievement.year}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-3 pr-16 group-hover:text-[#00f0ff] transition-colors duration-300">
            {achievement.title}
          </h3>
          <p className="text-[#00f0ff]/80 text-sm font-medium mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" />
            {achievement.organization}
          </p>
          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
            {achievement.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TrophyIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="absolute -top-24 left-1/2 -translate-x-1/2 z-10"
      initial={{ opacity: 0, y: 100, scale: 0 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-28 h-28 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-yellow-500/50 border-4 border-white/10"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Trophy className="w-14 h-14 text-white drop-shadow-lg" />
        </motion.div>

        {/* Orbiting stars */}
        {[0, 120, 240].map((rotation, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              rotate: rotation,
            }}
            animate={{
              rotate: [rotation, rotation + 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-4 h-4 bg-yellow-400 rounded-full blur-sm" style={{ transform: "translate(-50%, -50%) translateY(-60px)" }} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Stats section
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Hackathon Wins", value: "8+", icon: Trophy },
    { label: "Projects Completed", value: "15+", icon: Award },
    { label: "Open Source", value: "50+", icon: Star },
    { label: "Years Experience", value: "2+", icon: TrendingUp },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center group hover:border-[#00f0ff]/50 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <stat.icon className="w-6 h-6 text-[#00f0ff] mx-auto mb-2" />
          <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
          <div className="text-white/50 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<
    typeof portfolioData.achievements[0] | null
  >(null);

  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-64 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[128px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-64 w-96 h-96 bg-yellow-500/5 rounded-full blur-[128px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative" ref={headingRef}>
          <TrophyIntro />

          <motion.span
            className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Recognition & Milestones
          </motion.span>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">Achievements</span>
            <br />
            <span className="text-white/20">& Awards</span>
          </motion.h2>

          <motion.p
            className="text-white/60 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A showcase of recognition, victories, and milestones achieved through innovation and dedication.
          </motion.p>
        </div>

        {/* Stats */}
        <StatsSection />

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
              onClick={() => setSelectedAchievement(achievement)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl"
              onClick={() => setSelectedAchievement(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-2xl p-10 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-white/20 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-white" />
              </motion.button>

              <div className="mb-8">
                {/* Icon */}
                <motion.div
                  className="inline-block p-5 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#a855f7]/20 border border-[#00f0ff]/30 mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  {(() => {
                    const Icon = iconMap[selectedAchievement.icon as keyof typeof iconMap] || Trophy;
                    return <Icon className="w-10 h-10 text-[#00f0ff]" />;
                  })()}
                </motion.div>

                {/* Meta */}
                <motion.div
                  className="flex items-center gap-3 text-sm mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] font-mono">
                    {selectedAchievement.year}
                  </span>
                  <span className="text-white/50">•</span>
                  <span className="text-white/70">{selectedAchievement.organization}</span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-4xl font-bold gradient-text mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedAchievement.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-white/70 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedAchievement.description}
                </motion.p>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] rounded-b-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
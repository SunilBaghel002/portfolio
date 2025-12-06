"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { Trophy, Star, Mic, Award, X } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  trophy: Trophy,
  star: Star,
  mic: Mic,
  award: Award,
};

interface AchievementCardProps {
  achievement: typeof portfolioData.achievements[0];
  index: number;
  onClick: () => void;
}

function AchievementCard({ achievement, index, onClick }: AchievementCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[achievement.icon as keyof typeof iconMap];

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
      }}
    >
      <div className="relative h-full p-8 rounded-2xl glass overflow-hidden">
        {/* Trophy animation */}
        <motion.div
          className="absolute top-6 right-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: index * 0.2 + 0.4,
          }}
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent-neon/20 to-accent-purple/20 border border-accent-neon/30">
            <Icon className="w-6 h-6 text-accent-neon" />
          </div>
        </motion.div>

        {/* Year badge */}
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs font-mono mb-4">
          {achievement.year}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2 pr-16 group-hover:text-accent-neon transition-colors">
          {achievement.title}
        </h3>
        <p className="text-accent-neon/80 text-sm mb-3">{achievement.organization}</p>
        <p className="text-white/50 text-sm">{achievement.description}</p>

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
      className="absolute -top-20 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0, y: 100, scale: 0 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
          <Trophy className="w-12 h-12 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<
    typeof portfolioData.achievements[0] | null
  >(null);

  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24 relative">
          <TrophyIntro />
          <ScrollReveal>
            <span className="text-accent-neon text-sm font-medium uppercase tracking-wider mb-4 block">
              Recognition
            </span>
          </ScrollReveal>
          <AnimatedHeading>Achievements & Awards</AnimatedHeading>
        </div>

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
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedAchievement(null)}
            />
            <motion.div
              className="relative w-full max-w-lg p-8 rounded-3xl glass-strong"
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-accent-neon/20 to-accent-purple/20 border border-accent-neon/30 mb-4">
                  {(() => {
                    const Icon = iconMap[selectedAchievement.icon as keyof typeof iconMap];
                    return <Icon className="w-8 h-8 text-accent-neon" />;
                  })()}
                </div>
                <span className="text-accent-neon/80 text-sm block mb-2">
                  {selectedAchievement.organization} • {selectedAchievement.year}
                </span>
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  {selectedAchievement.title}
                </h3>
                <p className="text-white/70">{selectedAchievement.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[128px] pointer-events-none" />
    </section>
  );
}
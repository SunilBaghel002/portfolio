"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================
// 3D TILT CARD
// ============================================

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: number;
  border?: boolean;
  shine?: boolean;
  shadow?: boolean;
  glare?: boolean;
}

export function Card3D({
  children,
  className,
  intensity = 10,
  border = true,
  shine = true,
  shadow = true,
  glare = false,
  ...props
}: Card3DProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity]);

  // For shine effect
  const shineX = useTransform(xSpring, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(ySpring, [-0.5, 0.5], [0, 100]);

  // For glare effect
  const glareX = useTransform(xSpring, [-0.5, 0.5], [-50, 150]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], [-50, 150]);
  const glareOpacity = useTransform(
    [xSpring, ySpring],
    ([latestX, latestY]: number[]) => {
      return Math.abs(latestX) + Math.abs(latestY);
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl p-[1px] transition-all duration-300",
        border && "bg-gradient-to-br from-white/20 via-transparent to-white/5",
        shadow && isHovered && "shadow-2xl shadow-[#00f0ff]/10",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.02 }}
      data-cursor="view"
      data-cursor-text="View"
      {...props}
    >
      <div className="relative h-full w-full rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl overflow-hidden">
        {/* Shine effect */}
        {shine && (
          <motion.div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: useTransform(
                [shineX, shineY],
                ([x, y]: number[]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(0, 240, 255, 0.15), transparent 50%)`
              ),
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Glare effect */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]: number[]) =>
                  `linear-gradient(${135 + x * 0.5}deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)`
              ),
              opacity: isHovered ? glareOpacity : 0,
            }}
          />
        )}

        {children}
      </div>
    </motion.div>
  );
}

// ============================================
// GLASS CARD
// ============================================

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "strong" | "subtle";
  hoverEffect?: boolean;
  glowColor?: string;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hoverEffect = true,
  glowColor = "#00f0ff",
  ...props
}: GlassCardProps) {
  const variants = {
    default: "bg-white/5 backdrop-blur-xl border border-white/10",
    strong: "bg-white/10 backdrop-blur-2xl border border-white/20",
    subtle: "bg-white/[0.02] backdrop-blur-lg border border-white/5",
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        className
      )}
      whileHover={
        hoverEffect
          ? {
            scale: 1.02,
            boxShadow: `0 0 40px ${glowColor}20`,
            borderColor: `${glowColor}30`,
          }
          : undefined
      }
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// HOVER CARD (Expands on hover)
// ============================================

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
}

export function HoverCard({
  children,
  className,
  expandedContent,
  ...props
}: HoverCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden glass cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        height: isHovered && expandedContent ? "auto" : undefined,
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}

      {/* Expanded content */}
      {expandedContent && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {expandedContent}
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// GRADIENT BORDER CARD
// ============================================

interface GradientBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  animated?: boolean;
  borderWidth?: number;
}

export function GradientBorderCard({
  children,
  className,
  gradientFrom = "#00f0ff",
  gradientVia = "#a855f7",
  gradientTo = "#ec4899",
  animated = false,
  borderWidth = 1,
  ...props
}: GradientBorderCardProps) {
  return (
    <div
      className={cn("relative rounded-2xl", className)}
      style={{ padding: borderWidth }}
      {...props}
    >
      {/* Gradient border */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          animated && "animate-gradient"
        )}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
          backgroundSize: animated ? "200% 200%" : undefined,
        }}
      />

      {/* Content */}
      <div className="relative rounded-[calc(1rem-1px)] bg-[#0a0a0a] h-full">
        {children}
      </div>
    </div>
  );
}

// ============================================
// SPOTLIGHT CARD
// ============================================

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "#00f0ff",
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden glass group",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]: number[]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}15, transparent 40%)`
          ),
        }}
      />

      {/* Border gradient on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]: number[]) =>
              `radial-gradient(200px circle at ${x}px ${y}px, ${spotlightColor}40, transparent 40%)`
          ),
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />

      {children}
    </motion.div>
  );
}

// ============================================
// FLIP CARD
// ============================================

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className={cn("relative perspective-1000", className)}
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl glass"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl glass"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
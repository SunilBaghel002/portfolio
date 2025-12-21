// components/ui/Text3DCSS.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";

interface Text3DCSSProps {
  firstName?: string;
  lastName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export const Text3DCSS = memo(function Text3DCSS({
  firstName = "SUNIL",
  lastName = "BAGHEL",
  primaryColor = "#00f0ff",
  secondaryColor = "#a855f7",
  className = "",
}: Text3DCSSProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const layers = [
    { offset: 6, color: "#ec4899", opacity: 0.2, blur: 0 },
    { offset: 4, color: secondaryColor, opacity: 0.4, blur: 0 },
    { offset: 2, color: secondaryColor, opacity: 0.6, blur: 0 },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: isMounted ? rotateX : 0,
          rotateY: isMounted ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 blur-3xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40, #ec489940)`,
            opacity: isHovered ? 0.8 : 0.5,
            transform: "translateZ(-50px) scale(1.2)",
          }}
        />

        {layers.map((layer, i) => (
          <span
            key={i}
            className="absolute whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
            style={{
              color: layer.color,
              opacity: layer.opacity,
              transform: `translateZ(${-20 - i * 10}px) translate(${layer.offset}px, ${layer.offset}px)`,
              filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
            }}
          >
            {firstName}{" "}
            <span style={{ color: layer.color }}>{lastName}</span>
          </span>
        ))}

        <motion.span
          className="relative whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight inline-block"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)",
          }}
          animate={{
            textShadow: isHovered
              ? `0 0 60px ${primaryColor}80, 0 0 120px ${primaryColor}40`
              : `0 0 30px ${primaryColor}50, 0 0 60px ${primaryColor}20`,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 45%, ${secondaryColor} 55%, ${secondaryColor} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {firstName}
          </span>
          {" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${secondaryColor} 0%, #ec4899 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {lastName}
          </span>
        </motion.span>

        <motion.span
          className="absolute inset-0 whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            backgroundPosition: isHovered ? ["-200% 0%", "200% 0%"] : "-200% 0%",
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1,
          }}
        >
          {firstName} {lastName}
        </motion.span>
      </motion.div>
    </div>
  );
});

export default Text3DCSS;
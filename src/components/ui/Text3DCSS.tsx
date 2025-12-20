// components/ui/Text3DCSS.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Text3DCSSProps {
  text: string;
  className?: string;
}

export function Text3DCSS({ text, className = "" }: Text3DCSSProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.h1
        className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter select-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <span
          className="absolute inset-0 blur-3xl opacity-60"
          style={{
            background: "linear-gradient(135deg, #00f0ff, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: "translateZ(-20px)",
          }}
        >
          {text}
        </span>
        
        <span
          className="absolute"
          style={{
            background: "#ec4899",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: "translateZ(-15px) translate(4px, 4px)",
            opacity: 0.4,
          }}
        >
          {text}
        </span>
        
        <span
          className="absolute"
          style={{
            background: "#a855f7",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: "translateZ(-10px) translate(2px, 2px)",
            opacity: 0.6,
          }}
        >
          {text}
        </span>
        
        <span
          className="relative"
          style={{
            background: "linear-gradient(135deg, #00f0ff 0%, #a855f7 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: isHovered 
              ? "drop-shadow(0 0 40px rgba(0,240,255,0.8))" 
              : "drop-shadow(0 0 20px rgba(0,240,255,0.4))",
            transform: "translateZ(0)",
          }}
        >
          {text}
        </span>
        
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: isHovered ? ["200% 0%", "-200% 0%"] : "200% 0%",
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
      </motion.h1>
    </motion.div>
  );
}
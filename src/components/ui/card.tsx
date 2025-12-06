"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: number;
  border?: boolean;
  shine?: boolean;
}

export function Card3D({
  children,
  className,
  intensity = 10,
  border = true,
  shine = true,
  ...props
}: Card3DProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity]);
  
  const shineX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

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
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl p-[1px] transition-shadow duration-300",
        border && "bg-gradient-to-br from-white/20 via-transparent to-white/5",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      <div className="relative h-full w-full rounded-2xl bg-background/80 backdrop-blur-xl overflow-hidden">
        {shine && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(0, 240, 255, 0.15), transparent 50%)`,
            }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
}

export function GlassCard({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6",
        className
      )}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)"
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
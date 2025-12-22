// components/ui/GradientName.tsx
"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={containerRef}
            className={`relative select-none ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 blur-3xl"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}30, ${secondaryColor}30, #ec489930)`,
                }}
                animate={{
                    opacity: isHovered ? 0.8 : 0.4,
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Shadow layer 1 */}
            <span
                className="absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight whitespace-nowrap"
                style={{
                    color: "#ec4899",
                    transform: "translate(6px, 6px)",
                    opacity: 0.15,
                }}
            >
                {firstName} {lastName}
            </span>

            {/* Shadow layer 2 */}
            <span
                className="absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight whitespace-nowrap"
                style={{
                    color: secondaryColor,
                    transform: "translate(3px, 3px)",
                    opacity: 0.3,
                }}
            >
                {firstName} {lastName}
            </span>

            {/* Main text */}
            <motion.span
                className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight whitespace-nowrap inline-flex"
                animate={{
                    textShadow: isHovered
                        ? `0 0 60px ${primaryColor}60, 0 0 120px ${secondaryColor}40`
                        : `0 0 30px ${primaryColor}40, 0 0 60px ${secondaryColor}20`,
                }}
                transition={{ duration: 0.3 }}
            >
                <span
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    {firstName}
                </span>
                <span className="mx-2 sm:mx-3 md:mx-4" />
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

            {/* Shine effect */}
            <motion.span
                className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight whitespace-nowrap pointer-events-none overflow-hidden"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
                animate={{
                    backgroundPosition: isHovered ? ["200% 0%", "-200% 0%"] : "200% 0%",
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
            >
                {firstName} {lastName}
            </motion.span>
        </motion.div>
    );
}
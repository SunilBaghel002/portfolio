// components/ui/OptimizedConcentricOrbits.tsx
"use client";

import { useState, useEffect, useRef, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SkillCategory } from "@/lib/data";
import { FaCode } from "react-icons/fa";
import { TechIcon } from "./TechIcon";

interface ConcentricOrbitsProps {
    categories: SkillCategory[];
    className?: string;
}

// Memoized skill orb component
const SkillOrb = memo(function SkillOrb({
    skill,
    skillColor,
    angle,
    radius,
    orbSize,
    iconSize,
    categoryName,
    isVisible,
    onHover,
    isHovered,
}: {
    skill: { name: string; level: number; color?: string };
    skillColor: string;
    angle: number;
    radius: number;
    orbSize: number;
    iconSize: number;
    categoryName: string;
    isVisible: boolean;
    onHover: (name: string | null) => void;
    isHovered: boolean;
}) {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (!isVisible) return null;

    return (
        <div
            className="absolute group"
            style={{
                left: `calc(50% + ${x}px - ${orbSize / 2}px)`,
                top: `calc(50% + ${y}px - ${orbSize / 2}px)`,
                width: orbSize,
                height: orbSize,
                transition: "opacity 0.3s, transform 0.3s",
            }}
            onMouseEnter={() => onHover(skill.name)}
            onMouseLeave={() => onHover(null)}
        >
            <div
                className={cn(
                    "w-full h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-200",
                    isHovered && "scale-130 z-50"
                )}
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${skillColor}50, ${skillColor}15)`,
                    border: `2px solid ${skillColor}`,
                    boxShadow: isHovered
                        ? `0 0 25px ${skillColor}80, 0 0 50px ${skillColor}40`
                        : `0 0 15px ${skillColor}40`,
                    transform: isHovered ? "scale(1.3)" : "scale(1)",
                    zIndex: isHovered ? 50 : 1,
                }}
            >
                <TechIcon name={skill.name} color={skillColor} size={iconSize} />
            </div>

            {/* Tooltip - Only render when hovered */}
            {isHovered && (
                <div
                    className="absolute -top-20 left-1/2 -translate-x-1/2 glass px-4 py-3 rounded-xl whitespace-nowrap pointer-events-none z-[100] min-w-[140px]"
                    style={{
                        border: `1px solid ${skillColor}40`,
                        boxShadow: `0 0 20px ${skillColor}30`,
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-semibold text-white">{skill.name}</span>
                        <div className="w-full">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white/50">Proficiency</span>
                                <span style={{ color: skillColor }}>{skill.level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${skill.level}%`,
                                        backgroundColor: skillColor,
                                    }}
                                />
                            </div>
                        </div>
                        <span className="text-xs text-white/40">{categoryName}</span>
                    </div>
                </div>
            )}
        </div>
    );
});

export const ConcentricOrbits = memo(function ConcentricOrbits({
    categories,
    className,
}: ConcentricOrbitsProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Container size and orbit calculations
    const containerSize = 700;
    const centerSize = 70;
    const baseRadius = 60;
    const radiusStep = 45;

    // Intersection Observer for lazy loading
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Pre-calculate all skill positions
    const skillPositions = useMemo(() => {
        return categories.map((category, catIndex) => {
            const radius = baseRadius + catIndex * radiusStep;
            return category.skills.map((skill, skillIndex) => {
                const angle = (skillIndex / category.skills.length) * Math.PI * 2 - Math.PI / 2;
                const orbSize = skill.level >= 85 ? 44 : skill.level >= 70 ? 38 : 32;
                const iconSize = skill.level >= 85 ? 20 : skill.level >= 70 ? 16 : 14;

                return {
                    skill,
                    angle,
                    radius,
                    orbSize,
                    iconSize,
                    skillColor: skill.color || category.color,
                    categoryName: category.name,
                };
            });
        });
    }, [categories]);

    return (
        <div
            ref={containerRef}
            className={cn("relative mx-auto", className)}
            style={{ width: containerSize, height: containerSize }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* CSS-based animations for orbits */}
            <style jsx>{`
        @keyframes orbit-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes orbit-rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes counter-rotate-reverse {
          from { transform: rotate(-360deg); }
          to { transform: rotate(0deg); }
        }
        
        .orbit-container {
          animation-play-state: ${isPaused ? 'paused' : 'running'};
        }
        
        .counter-rotate {
          animation-play-state: ${isPaused ? 'paused' : 'running'};
        }
      `}</style>

            {/* SVG for orbit rings - static, no animation */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${containerSize} ${containerSize}`}
            >
                <defs>
                    <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {categories.map((category, index) => {
                    const radius = baseRadius + index * radiusStep;
                    const isActive = activeCategory === null || activeCategory === category.name;
                    const isHighlighted = activeCategory === category.name;

                    return (
                        <circle
                            key={category.name}
                            cx={containerSize / 2}
                            cy={containerSize / 2}
                            r={radius}
                            fill="none"
                            stroke={category.color}
                            strokeWidth={isHighlighted ? 2 : 1}
                            strokeOpacity={isActive ? 0.4 : 0.1}
                            strokeDasharray={isHighlighted ? "none" : "6 4"}
                            style={{
                                transition: "stroke-width 0.3s, stroke-opacity 0.3s",
                            }}
                        />
                    );
                })}
            </svg>

            {/* Center - Developer Icon */}
            <div
                className="absolute z-30"
                style={{
                    left: containerSize / 2 - centerSize / 2,
                    top: containerSize / 2 - centerSize / 2,
                    width: centerSize,
                    height: centerSize,
                }}
            >
                <div
                    className="w-full h-full rounded-full bg-gradient-to-br from-[#00f0ff] via-[#a855f7] to-[#ec4899] p-[3px]"
                    style={{
                        animation: isPaused ? "none" : "orbit-rotate 20s linear infinite",
                    }}
                >
                    <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                        <FaCode className="text-white" size={28} />
                    </div>
                </div>
            </div>

            {/* Skills on orbits - CSS animations */}
            {isVisible && categories.map((category, catIndex) => {
                const radius = baseRadius + catIndex * radiusStep;
                const rotationDuration = 60 + catIndex * 20;
                const isActive = activeCategory === null || activeCategory === category.name;
                const isReverse = catIndex % 2 !== 0;

                return (
                    <div
                        key={category.name}
                        className="absolute inset-0 orbit-container"
                        style={{
                            animation: `${isReverse ? 'orbit-rotate-reverse' : 'orbit-rotate'} ${rotationDuration}s linear infinite`,
                            opacity: isActive ? 1 : 0.3,
                            transition: "opacity 0.3s",
                        }}
                    >
                        {category.skills.map((skill, skillIndex) => {
                            const angle = (skillIndex / category.skills.length) * Math.PI * 2 - Math.PI / 2;
                            const skillColor = skill.color || category.color;
                            const orbSize = skill.level >= 85 ? 44 : skill.level >= 70 ? 38 : 32;
                            const iconSize = skill.level >= 85 ? 20 : skill.level >= 70 ? 16 : 14;
                            const x = radius * Math.cos(angle);
                            const y = radius * Math.sin(angle);

                            return (
                                <div
                                    key={skill.name}
                                    className="absolute counter-rotate"
                                    style={{
                                        left: `calc(50% + ${x}px - ${orbSize / 2}px)`,
                                        top: `calc(50% + ${y}px - ${orbSize / 2}px)`,
                                        width: orbSize,
                                        height: orbSize,
                                        animation: `${isReverse ? 'counter-rotate-reverse' : 'counter-rotate'} ${rotationDuration}s linear infinite`,
                                    }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    <div
                                        className="w-full h-full rounded-full flex items-center justify-center cursor-pointer"
                                        style={{
                                            background: `radial-gradient(circle at 30% 30%, ${skillColor}50, ${skillColor}15)`,
                                            border: `2px solid ${skillColor}`,
                                            boxShadow: hoveredSkill === skill.name
                                                ? `0 0 25px ${skillColor}80, 0 0 50px ${skillColor}40`
                                                : `0 0 15px ${skillColor}40`,
                                            transform: hoveredSkill === skill.name ? "scale(1.3)" : "scale(1)",
                                            transition: "transform 0.2s, box-shadow 0.2s",
                                            zIndex: hoveredSkill === skill.name ? 50 : 1,
                                        }}
                                    >
                                        <TechIcon name={skill.name} color={skillColor} size={iconSize} />
                                    </div>

                                    {/* Tooltip */}
                                    {hoveredSkill === skill.name && (
                                        <div
                                            className="absolute -top-20 left-1/2 -translate-x-1/2 glass px-4 py-3 rounded-xl whitespace-nowrap pointer-events-none z-[100] min-w-[140px]"
                                            style={{
                                                border: `1px solid ${skillColor}40`,
                                                boxShadow: `0 0 20px ${skillColor}30`,
                                            }}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm font-semibold text-white">{skill.name}</span>
                                                <div className="w-full">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-white/50">Proficiency</span>
                                                        <span style={{ color: skillColor }}>{skill.level}%</span>
                                                    </div>
                                                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${skill.level}%`,
                                                                backgroundColor: skillColor,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-xs text-white/40">{category.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}

            {/* Category Legend - Right Side */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full hidden xl:flex flex-col gap-3 pl-8">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Categories
                </div>
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all text-left",
                            activeCategory === category.name
                                ? "bg-white/10 backdrop-blur-sm"
                                : "hover:bg-white/5"
                        )}
                        style={{
                            color:
                                activeCategory === category.name || activeCategory === null
                                    ? category.color
                                    : "rgba(255,255,255,0.3)",
                            border:
                                activeCategory === category.name
                                    ? `1px solid ${category.color}40`
                                    : "1px solid transparent",
                        }}
                        onClick={() =>
                            setActiveCategory(
                                activeCategory === category.name ? null : category.name
                            )
                        }
                    >
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: category.color,
                                boxShadow:
                                    activeCategory === category.name
                                        ? `0 0 10px ${category.color}`
                                        : "none",
                            }}
                        />
                        <span>{category.name}</span>
                        <span className="text-xs text-white/30 ml-auto">
                            {category.skills.length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Mobile Category Selector */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 xl:hidden w-full max-w-[500px]">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                            activeCategory === category.name
                                ? "bg-white/15"
                                : "bg-white/5 hover:bg-white/10"
                        )}
                        style={{
                            color: category.color,
                            border: `1px solid ${activeCategory === category.name ? category.color : "transparent"
                                }`,
                            boxShadow:
                                activeCategory === category.name
                                    ? `0 0 15px ${category.color}40`
                                    : "none",
                        }}
                        onClick={() =>
                            setActiveCategory(
                                activeCategory === category.name ? null : category.name
                            )
                        }
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Instruction text */}
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 whitespace-nowrap xl:hidden">
                Hover to pause • Click category to filter
            </p>
        </div>
    );
});

export default ConcentricOrbits;
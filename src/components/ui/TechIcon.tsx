"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiPython,
    SiThreedotjs,
    SiPostgresql,
    SiDocker,
    SiAmazonwebservices,
    SiGraphql,
    SiTailwindcss,
    SiFramer,
    SiGit,
    SiGithub,
    SiMongodb,
    SiRedis,
    SiFirebase,
    SiVercel,
    SiFigma,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiRust,
    SiGo,
    SiKubernetes,
    SiTerraform,
    SiJest,
    SiCypress,
    SiStorybook,
    SiWebpack,
    SiVite,
    SiPrisma,
    SiSupabase,
    SiStripe,
    SiOpenai,
    SiSass,
    SiRedux,
    SiExpress,
    SiNestjs,
    SiDjango,
    SiFlask,
    SiFastapi,
    SiElectron,
    SiSocketdotio,
    SiLinux,
    SiNginx,
    SiJenkins,
    SiGitlab,
    SiBitbucket,
    SiJira,
    SiNotion,
    SiSlack,
    SiDiscord,
    SiSolidity,
    SiC,
    SiHtml5,
    SiCss3,
    SiLeaflet,
    SiRazorpay,
    SiCloudinary,
    SiJsonwebtokens,
    SiAuth0,
    SiPostman,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaCode, FaDatabase, FaServer, FaTools, FaRocket, FaBrain } from "react-icons/fa";
import { IconType } from "react-icons";
import { SkillCategory } from "@/lib/data";

// Icon mapping
export const techIcons: Record<string, IconType> = {
    react: SiReact,
    "react.js": SiReact,
    reactjs: SiReact,
    "next.js": SiNextdotjs,
    nextjs: SiNextdotjs,
    next: SiNextdotjs,
    typescript: SiTypescript,
    ts: SiTypescript,
    javascript: SiJavascript,
    js: SiJavascript,
    "node.js": SiNodedotjs,
    nodejs: SiNodedotjs,
    node: SiNodedotjs,
    python: SiPython,
    py: SiPython,
    "three.js": SiThreedotjs,
    threejs: SiThreedotjs,
    three: SiThreedotjs,
    postgresql: SiPostgresql,
    postgres: SiPostgresql,
    docker: SiDocker,
    aws: SiAmazonwebservices,
    graphql: SiGraphql,
    "tailwind css": SiTailwindcss,
    tailwindcss: SiTailwindcss,
    tailwind: SiTailwindcss,
    "framer motion": SiFramer,
    framer: SiFramer,
    git: SiGit,
    github: SiGithub,
    mongodb: SiMongodb,
    mongo: SiMongodb,
    redis: SiRedis,
    firebase: SiFirebase,
    vercel: SiVercel,
    figma: SiFigma,
    vue: SiVuedotjs,
    angular: SiAngular,
    svelte: SiSvelte,
    rust: SiRust,
    go: SiGo,
    kubernetes: SiKubernetes,
    terraform: SiTerraform,
    jest: SiJest,
    cypress: SiCypress,
    storybook: SiStorybook,
    webpack: SiWebpack,
    vite: SiVite,
    prisma: SiPrisma,
    supabase: SiSupabase,
    stripe: SiStripe,
    openai: SiOpenai,
    sass: SiSass,
    redux: SiRedux,
    express: SiExpress,
    nestjs: SiNestjs,
    django: SiDjango,
    flask: SiFlask,
    fastapi: SiFastapi,
    electron: SiElectron,
    "socket.io": SiSocketdotio,
    websockets: SiSocketdotio,
    linux: SiLinux,
    nginx: SiNginx,
    jenkins: SiJenkins,
    gitlab: SiGitlab,
    bitbucket: SiBitbucket,
    jira: SiJira,
    notion: SiNotion,
    slack: SiSlack,
    discord: SiDiscord,
    solidity: SiSolidity,
    c: SiC,
    html5: SiHtml5,
    html: SiHtml5,
    css3: SiCss3,
    css: SiCss3,
    "leaflet.js": SiLeaflet,
    leaflet: SiLeaflet,
    razorpay: SiRazorpay,
    cloudinary: SiCloudinary,
    jwt: SiJsonwebtokens,
    oauth: SiAuth0,
    auth0: SiAuth0,
    postman: SiPostman,
    "vs code": BiLogoVisualStudio,
    vscode: BiLogoVisualStudio,
    "visual studio code": BiLogoVisualStudio,
    // Fallback category icons
    blockchain: FaDatabase,
    "ai/ml": FaBrain,
    web3: FaRocket,
    "responsive design": FaCode,
    "rest apis": FaServer,
    "shadcn ui": FaCode,
    nodemailer: FaServer,
};

// Category icons for center
export const categoryIcons: Record<string, IconType> = {
    languages: FaCode,
    frontend: SiReact,
    backend: FaServer,
    databases: FaDatabase,
    "devops & tools": FaTools,
    "other technologies": FaRocket,
    exploring: FaBrain,
};

// Get icon by name
export function getTechIcon(name: string): IconType | null {
    const normalizedName = name.toLowerCase().trim();
    return techIcons[normalizedName] || null;
}

// Props interfaces
interface TechIconProps {
    name: string;
    color?: string;
    size?: number;
    showLabel?: boolean;
    labelPosition?: "bottom" | "right" | "tooltip";
    className?: string;
}

interface TechOrbProps {
    name: string;
    color?: string;
    size?: "sm" | "md" | "lg" | "xl";
    glowIntensity?: "none" | "low" | "medium" | "high";
    animated?: boolean;
    level?: number;
    className?: string;
}

interface TechCardProps {
    name: string;
    color?: string;
    level?: number;
    category?: string;
    description?: string;
    showProgress?: boolean;
    onClick?: () => void;
    className?: string;
}

interface TechBadgeProps {
    name: string;
    color?: string;
    variant?: "default" | "outline" | "ghost" | "glow";
    className?: string;
}

// Size mappings
const orbSizes = {
    sm: { container: "w-10 h-10", icon: 16 },
    md: { container: "w-14 h-14", icon: 22 },
    lg: { container: "w-18 h-18 md:w-20 md:h-20", icon: 28 },
    xl: { container: "w-24 h-24 md:w-28 md:h-28", icon: 36 },
};

// Basic Tech Icon
export function TechIcon({
    name,
    color = "#00f0ff",
    size = 24,
    showLabel = false,
    labelPosition = "bottom",
    className,
}: TechIconProps) {
    const Icon = getTechIcon(name);

    if (!Icon) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center rounded-lg bg-white/10",
                    className
                )}
                style={{ width: size, height: size }}
            >
                <span className="text-xs font-bold" style={{ color }}>
                    {name.slice(0, 2).toUpperCase()}
                </span>
            </div>
        );
    }

    const iconElement = (
        <Icon
            size={size}
            style={{ color }}
            className={cn("transition-all duration-300", className)}
        />
    );

    if (!showLabel) return iconElement;

    if (labelPosition === "tooltip") {
        return (
            <div className="relative group">
                {iconElement}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {name}
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex items-center gap-2",
                labelPosition === "bottom" && "flex-col"
            )}
        >
            {iconElement}
            <span className="text-sm text-white/80">{name}</span>
        </div>
    );
}

// Tech Orb (floating skill bubble)
export function TechOrb({
    name,
    color = "#00f0ff",
    size = "md",
    glowIntensity = "medium",
    animated = true,
    level,
    className,
}: TechOrbProps) {
    const Icon = getTechIcon(name);
    const sizeConfig = orbSizes[size];

    return (
        <motion.div
            className={cn("relative group cursor-pointer", className)}
            whileHover={{ scale: 1.2, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div
                className={cn(
                    "rounded-full flex items-center justify-center backdrop-blur-sm",
                    sizeConfig.container
                )}
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10)`,
                    border: `2px solid ${color}80`,
                    boxShadow: glowIntensity !== "none" ? `0 0 20px ${color}40` : undefined,
                }}
            >
                {Icon ? (
                    <Icon size={sizeConfig.icon} style={{ color }} className="drop-shadow-lg" />
                ) : (
                    <span
                        className="font-bold"
                        style={{ color, fontSize: sizeConfig.icon * 0.6 }}
                    >
                        {name.slice(0, 2).toUpperCase()}
                    </span>
                )}
            </motion.div>

            {/* Tooltip */}
            <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 glass px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
                initial={false}
            >
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-white">{name}</span>
                    {level !== undefined && (
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1 rounded-full bg-white/20 overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${level}%`, backgroundColor: color }}
                                />
                            </div>
                            <span className="text-xs" style={{ color }}>
                                {level}%
                            </span>
                        </div>
                    )}
                </div>
                <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass"
                />
            </motion.div>
        </motion.div>
    );
}

// Tech Card
export function TechCard({
    name,
    color = "#00f0ff",
    level,
    category,
    description,
    showProgress = true,
    onClick,
    className,
}: TechCardProps) {
    const Icon = getTechIcon(name);

    return (
        <motion.div
            className={cn(
                "glass p-6 rounded-2xl cursor-pointer group overflow-hidden relative",
                className
            )}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={onClick}
        >
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
                }}
            />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                            backgroundColor: `${color}20`,
                            border: `1px solid ${color}40`,
                        }}
                    >
                        {Icon ? (
                            <Icon size={28} style={{ color }} />
                        ) : (
                            <span className="text-lg font-bold" style={{ color }}>
                                {name.slice(0, 2).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
                            {name}
                        </h3>
                        {category && (
                            <p className="text-sm text-white/40 capitalize">{category}</p>
                        )}
                    </div>
                    {level !== undefined && (
                        <span className="text-lg font-bold" style={{ color }}>
                            {level}%
                        </span>
                    )}
                </div>

                {description && (
                    <p className="text-sm text-white/60 mb-4">{description}</p>
                )}

                {showProgress && level !== undefined && (
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Tech Badge
export function TechBadge({
    name,
    color = "#00f0ff",
    variant = "default",
    className,
}: TechBadgeProps) {
    const Icon = getTechIcon(name);

    const variants = {
        default: "bg-white/5 border-white/10",
        outline: "bg-transparent border-white/20",
        ghost: "bg-transparent border-transparent",
        glow: "bg-white/5",
    };

    return (
        <motion.span
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                variants[variant],
                className
            )}
            style={
                variant === "glow"
                    ? { boxShadow: `0 0 15px ${color}30`, borderColor: `${color}40` }
                    : undefined
            }
            whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${color}40`,
                borderColor: color,
            }}
        >
            {Icon ? (
                <Icon size={14} style={{ color }} />
            ) : (
                <span style={{ color }} className="text-xs font-bold">{name.slice(0, 1)}</span>
            )}
            <span className="text-white/80">{name}</span>
        </motion.span>
    );
}

// ============================================
// CONCENTRIC ORBITS VISUALIZATION - FIXED
// ============================================

interface ConcentricOrbitsProps {
    categories: SkillCategory[];
    className?: string;
}

export function ConcentricOrbits({ categories, className }: ConcentricOrbitsProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Container size and orbit calculations
    const containerSize = 700; // px
    const centerSize = 70;
    const baseRadius = 60; // Starting radius for first orbit
    const radiusStep = 45; // Gap between orbits

    // Calculate the center point
    const center = containerSize / 2;

    return (
        <div
            className={cn("relative mx-auto", className)}
            style={{ width: containerSize, height: containerSize }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* SVG for orbit rings */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${containerSize} ${containerSize}`}
            >
                <defs>
                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Draw orbit circles */}
                {categories.map((category, index) => {
                    const radius = baseRadius + index * radiusStep;
                    const isActive = activeCategory === null || activeCategory === category.name;
                    const isHighlighted = activeCategory === category.name;

                    return (
                        <g key={category.name}>
                            {/* Orbit ring */}
                            <motion.circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke={category.color}
                                strokeWidth={isHighlighted ? 2 : 1}
                                strokeOpacity={isActive ? 0.4 : 0.1}
                                strokeDasharray={isHighlighted ? "none" : "6 4"}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    strokeWidth: isHighlighted ? 2 : 1,
                                    strokeOpacity: isActive ? 0.4 : 0.1,
                                }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            />

                            {/* Glowing orbit for highlighted category */}
                            {isHighlighted && (
                                <motion.circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="none"
                                    stroke={category.color}
                                    strokeWidth={4}
                                    strokeOpacity={0.2}
                                    filter="url(#glow)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Center - Developer Icon */}
            <motion.div
                className="absolute z-30"
                style={{
                    left: center - centerSize / 2,
                    top: center - centerSize / 2,
                    width: centerSize,
                    height: centerSize,
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
                <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-[#00f0ff] via-[#a855f7] to-[#ec4899] p-[3px]"
                    animate={{ rotate: isPaused ? 0 : 360 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                        <FaCode className="text-white" size={28} />
                    </div>
                </motion.div>
            </motion.div>

            {/* Skills on orbits */}
            {categories.map((category, catIndex) => {
                const radius = baseRadius + catIndex * radiusStep;
                const skillCount = category.skills.length;
                const isActive = activeCategory === null || activeCategory === category.name;
                const rotationDuration = 60 + catIndex * 20; // Slower rotation for outer orbits

                return (
                    <motion.div
                        key={category.name}
                        className="absolute inset-0"
                        animate={{
                            rotate: isPaused ? 0 : 360
                        }}
                        transition={{
                            duration: rotationDuration,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                        style={{
                            // Alternate direction for visual interest
                            animationDirection: catIndex % 2 === 0 ? "normal" : "reverse"
                        }}
                    >
                        {category.skills.map((skill, skillIndex) => {
                            // Calculate position on the orbit circle
                            const angle = (skillIndex / skillCount) * Math.PI * 2 - Math.PI / 2;
                            const x = center + radius * Math.cos(angle);
                            const y = center + radius * Math.sin(angle);

                            // Use skill's own color, fallback to category color
                            const skillColor = skill.color || category.color;

                            // Size based on skill level
                            const orbSize = skill.level >= 85 ? 44 : skill.level >= 70 ? 38 : 32;
                            const iconSize = skill.level >= 85 ? 20 : skill.level >= 70 ? 16 : 14;

                            return (
                                <motion.div
                                    key={skill.name}
                                    className="absolute"
                                    style={{
                                        left: x - orbSize / 2,
                                        top: y - orbSize / 2,
                                        width: orbSize,
                                        height: orbSize,
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: isActive ? 1 : 0.5,
                                        opacity: isActive ? 1 : 0.3,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: catIndex * 0.1 + skillIndex * 0.03,
                                    }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    {/* Counter-rotate to keep icons upright */}
                                    <motion.div
                                        animate={{
                                            rotate: isPaused ? 0 : -360
                                        }}
                                        transition={{
                                            duration: rotationDuration,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatType: "loop"
                                        }}
                                        className="w-full h-full"
                                    >
                                        <motion.div
                                            className="w-full h-full rounded-full flex items-center justify-center cursor-pointer relative group"
                                            style={{
                                                background: `radial-gradient(circle at 30% 30%, ${skillColor}50, ${skillColor}15)`,
                                                border: `2px solid ${skillColor}`,
                                                boxShadow: hoveredSkill === skill.name
                                                    ? `0 0 25px ${skillColor}80, 0 0 50px ${skillColor}40`
                                                    : `0 0 15px ${skillColor}40`,
                                            }}
                                            whileHover={{ scale: 1.3, zIndex: 50 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <TechIcon
                                                name={skill.name}
                                                color={skillColor}
                                                size={iconSize}
                                            />

                                            {/* Tooltip */}
                                            <motion.div
                                                className="absolute -top-20 left-1/2 -translate-x-1/2 glass px-4 py-3 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] min-w-[140px]"
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
                                                                className="h-full rounded-full transition-all duration-300"
                                                                style={{
                                                                    width: `${skill.level}%`,
                                                                    backgroundColor: skillColor
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-white/40">{category.name}</span>
                                                </div>
                                                {/* Arrow */}
                                                <div
                                                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 glass"
                                                    style={{ borderColor: `${skillColor}40` }}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                );
            })}

            {/* Category Legend - Right Side (Desktop) */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full hidden xl:flex flex-col gap-3 pl-8">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Categories</div>
                {categories.map((category, index) => (
                    <motion.button
                        key={category.name}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all text-left",
                            activeCategory === category.name
                                ? "bg-white/10 backdrop-blur-sm"
                                : "hover:bg-white/5"
                        )}
                        style={{
                            color: activeCategory === category.name || activeCategory === null
                                ? category.color
                                : "rgba(255,255,255,0.3)",
                            border: activeCategory === category.name
                                ? `1px solid ${category.color}40`
                                : "1px solid transparent",
                        }}
                        onClick={() => setActiveCategory(
                            activeCategory === category.name ? null : category.name
                        )}
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: category.color,
                                boxShadow: activeCategory === category.name
                                    ? `0 0 10px ${category.color}`
                                    : 'none'
                            }}
                        />
                        <span>{category.name}</span>
                        <span className="text-xs text-white/30 ml-auto">
                            {category.skills.length}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Mobile Category Selector - Bottom */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 xl:hidden w-full max-w-[500px]">
                {categories.map((category) => (
                    <motion.button
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
                            boxShadow: activeCategory === category.name
                                ? `0 0 15px ${category.color}40`
                                : 'none',
                        }}
                        onClick={() => setActiveCategory(
                            activeCategory === category.name ? null : category.name
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </div>

            {/* Instruction text */}
            <motion.p
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 whitespace-nowrap xl:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Hover to pause • Click category to filter
            </motion.p>
        </div>
    );
}

// ============================================
// FIXED FLOATING TECH ORBS (No hydration issues)
// ============================================

interface FloatingTechOrbsProps {
    skills: Array<{ name: string; color: string; level?: number }>;
    className?: string;
}

// Use deterministic positions instead of Math.random()
export function FloatingTechOrbs({ skills, className }: FloatingTechOrbsProps) {
    // Pre-calculated positions to avoid hydration mismatch
    const positions = [
        { x: 85, y: 20 },
        { x: 15, y: 25 },
        { x: 80, y: 75 },
        { x: 20, y: 70 },
        { x: 10, y: 45 },
        { x: 90, y: 50 },
        { x: 50, y: 10 },
        { x: 50, y: 85 },
    ];

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
            {skills.slice(0, positions.length).map((skill, i) => (
                <motion.div
                    key={skill.name}
                    className="absolute pointer-events-auto"
                    style={{
                        left: `${positions[i].x}%`,
                        top: `${positions[i].y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                    }}
                >
                    <TechOrb
                        name={skill.name}
                        color={skill.color}
                        size="lg"
                        level={skill.level}
                        glowIntensity="medium"
                    />
                </motion.div>
            ))}
        </div>
    );
}

// ============================================
// ORBITING TECH DISPLAY (Fixed)
// ============================================

interface OrbitingTechDisplayProps {
    skills: Array<{ name: string; color: string; level?: number }>;
    centerContent?: React.ReactNode;
    radius?: number;
    className?: string;
}

export function OrbitingTechDisplay({
    skills,
    centerContent,
    radius = 180,
    className,
}: OrbitingTechDisplayProps) {
    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{ height: radius * 2 + 100 }}
        >
            {/* Orbit rings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    strokeDasharray="10 10"
                />
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius * 0.6}
                    fill="none"
                    stroke="rgba(0,240,255,0.1)"
                    strokeWidth="1"
                />
            </svg>

            {/* Center content */}
            {centerContent && (
                <div className="absolute z-10">{centerContent}</div>
            )}

            {/* Orbiting skills - deterministic positions */}
            {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={skill.name}
                        className="absolute"
                        style={{
                            left: "50%",
                            top: "50%",
                            x,
                            y,
                            marginLeft: "-28px",
                            marginTop: "-28px",
                        }}
                        animate={{
                            x: [x, x + Math.cos(angle) * 10, x],
                            y: [y, y + Math.sin(angle) * 10, y],
                        }}
                        transition={{
                            duration: 4 + index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <TechOrb
                            name={skill.name}
                            color={skill.color}
                            size="lg"
                            level={skill.level}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}

// ============================================
// SKILL CONSTELLATION (Fixed)
// ============================================

interface SkillConstellationProps {
    skills: Array<{ name: string; color: string; level?: number }>;
    className?: string;
}

export function SkillConstellation({ skills, className }: SkillConstellationProps) {
    const centerX = 200;
    const centerY = 200;
    const radius = 140;

    return (
        <div className={cn("relative h-[400px] w-[400px]", className)}>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
                {skills.map((skill, i) => {
                    const nextIndex = (i + 1) % skills.length;
                    const angle1 = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
                    const angle2 = (nextIndex / skills.length) * Math.PI * 2 - Math.PI / 2;

                    return (
                        <motion.line
                            key={i}
                            x1={centerX + Math.cos(angle1) * radius}
                            y1={centerY + Math.sin(angle1) * radius}
                            x2={centerX + Math.cos(angle2) * radius}
                            y2={centerY + Math.sin(angle2) * radius}
                            stroke={`${skill.color}40`}
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        />
                    );
                })}
                {/* Lines to center */}
                {skills.map((skill, i) => {
                    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
                    return (
                        <motion.line
                            key={`center-${i}`}
                            x1={centerX}
                            y1={centerY}
                            x2={centerX + Math.cos(angle) * radius}
                            y2={centerY + Math.sin(angle) * radius}
                            stroke={`${skill.color}20`}
                            strokeWidth="1"
                            strokeDasharray="5 5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                        />
                    );
                })}
            </svg>

            {/* Skill nodes */}
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={skill.name}
                        className="absolute"
                        style={{
                            left: x - 28,
                            top: y - 28,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.5 + i * 0.1,
                        }}
                    >
                        <TechOrb
                            name={skill.name}
                            color={skill.color}
                            size="md"
                            level={skill.level}
                            glowIntensity="high"
                        />
                    </motion.div>
                );
            })}

            {/* Center hub */}
            <motion.div
                className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center"
                style={{
                    left: centerX - 32,
                    top: centerY - 32,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <FaCode className="text-white" size={24} />
            </motion.div>
        </div>
    );
}

// ============================================
// TECH GRID
// ============================================

interface TechGridProps {
    skills: Array<{
        name: string;
        color: string;
        level?: number;
        category?: string;
    }>;
    onSkillClick?: (skill: TechGridProps["skills"][0]) => void;
    className?: string;
}

export function TechGrid({ skills, onSkillClick, className }: TechGridProps) {
    return (
        <div className={cn("grid md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
            {skills.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <TechCard
                        name={skill.name}
                        color={skill.color}
                        level={skill.level}
                        category={skill.category}
                        onClick={() => onSkillClick?.(skill)}
                    />
                </motion.div>
            ))}
        </div>
    );
}
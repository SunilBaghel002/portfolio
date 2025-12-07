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
// CONCENTRIC ORBITS VISUALIZATION
// ============================================

interface ConcentricOrbitsProps {
    categories: SkillCategory[];
    className?: string;
}

export function ConcentricOrbits({ categories, className }: ConcentricOrbitsProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    // Calculate orbit radii - start from center going outward
    const baseRadius = 80;
    const radiusStep = 60;
    const centerSize = 60;

    return (
        <div className={cn("relative w-full aspect-square max-w-[800px] mx-auto", className)}>
            {/* SVG for orbit lines */}
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    {categories.map((cat, index) => (
                        <linearGradient
                            key={`gradient-${index}`}
                            id={`orbit-gradient-${index}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor={cat.color} stopOpacity="0.3" />
                            <stop offset="50%" stopColor={cat.color} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={cat.color} stopOpacity="0.3" />
                        </linearGradient>
                    ))}
                </defs>

                {/* Orbit rings */}
                {categories.map((category, index) => {
                    const radius = baseRadius + index * radiusStep;
                    const isActive = activeCategory === category.name;

                    return (
                        <motion.circle
                            key={category.name}
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="none"
                            stroke={`url(#orbit-gradient-${index})`}
                            strokeWidth={isActive ? 3 : 1.5}
                            strokeDasharray={isActive ? "none" : "8 4"}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: isActive ? 1 : 0.5,
                                scale: 1,
                                strokeWidth: isActive ? 3 : 1.5,
                            }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                    );
                })}
            </svg>

            {/* Center - Developer Icon */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
                <motion.div
                    className="rounded-full bg-gradient-to-br from-[#00f0ff] via-[#a855f7] to-[#ec4899] p-1"
                    style={{ width: centerSize + 10, height: centerSize + 10 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <div
                        className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center"
                    >
                        <FaCode className="text-white" size={28} />
                    </div>
                </motion.div>
            </motion.div>

            {/* Category Labels on sides */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+20px)] hidden lg:flex flex-col gap-2">
                {categories.map((category) => (
                    <motion.button
                        key={category.name}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                            activeCategory === category.name
                                ? "bg-white/10"
                                : "hover:bg-white/5"
                        )}
                        style={{
                            color: activeCategory === category.name ? category.color : "rgba(255,255,255,0.6)",
                            borderLeft: `3px solid ${activeCategory === category.name ? category.color : "transparent"}`,
                        }}
                        onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                        whileHover={{ x: 5 }}
                    >
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                    </motion.button>
                ))}
            </div>

            {/* Orbiting Skills */}
            {categories.map((category, catIndex) => {
                const radius = baseRadius + catIndex * radiusStep;
                const skillCount = category.skills.length;
                const isActive = activeCategory === null || activeCategory === category.name;

                return category.skills.map((skill, skillIndex) => {
                    // Calculate position on orbit
                    const angle = (skillIndex / skillCount) * Math.PI * 2 - Math.PI / 2;
                    const x = 50 + (radius / 4) * Math.cos(angle);
                    const y = 50 + (radius / 4) * Math.sin(angle);

                    // Determine size based on level
                    const size = skill.level > 80 ? "md" : "sm";

                    return (
                        <motion.div
                            key={`${category.name}-${skill.name}`}
                            className="absolute"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: isActive ? 1 : 0.3,
                                scale: isActive ? 1 : 0.7,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: catIndex * 0.1 + skillIndex * 0.05,
                            }}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            {/* Orbit animation wrapper */}
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 30 + catIndex * 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    transformOrigin: `${50 - x}% ${50 - y}%`,
                                }}
                            >
                                <TechOrb
                                    name={skill.name}
                                    color={category.color}
                                    size={size}
                                    level={skill.level}
                                    glowIntensity={hoveredSkill === skill.name ? "high" : "medium"}
                                />
                            </motion.div>
                        </motion.div>
                    );
                });
            })}

            {/* Mobile Category Selector */}
            <div className="absolute -bottom-20 left-0 right-0 flex flex-wrap justify-center gap-2 lg:hidden">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                            activeCategory === category.name
                                ? "bg-white/20"
                                : "bg-white/5 hover:bg-white/10"
                        )}
                        style={{
                            color: category.color,
                            border: `1px solid ${activeCategory === category.name ? category.color : "transparent"}`,
                        }}
                        onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
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
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
    SiReactquery,
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
} from "react-icons/si";
import { IconType } from "react-icons";

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
    "amazon web services": SiAmazonwebservices,
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
    "vue.js": SiVuedotjs,
    vuejs: SiVuedotjs,
    angular: SiAngular,
    svelte: SiSvelte,
    rust: SiRust,
    go: SiGo,
    golang: SiGo,
    kubernetes: SiKubernetes,
    k8s: SiKubernetes,
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
    scss: SiSass,
    redux: SiRedux,
    express: SiExpress,
    "express.js": SiExpress,
    expressjs: SiExpress,
    nestjs: SiNestjs,
    "nest.js": SiNestjs,
    nest: SiNestjs,
    django: SiDjango,
    flask: SiFlask,
    fastapi: SiFastapi,
    electron: SiElectron,
    "react query": SiReactquery,
    reactquery: SiReactquery,
    "socket.io": SiSocketdotio,
    socketio: SiSocketdotio,
    linux: SiLinux,
    nginx: SiNginx,
    jenkins: SiJenkins,
    gitlab: SiGitlab,
    bitbucket: SiBitbucket,
    jira: SiJira,
    notion: SiNotion,
    slack: SiSlack,
    discord: SiDiscord,
};

// Get icon by name (case-insensitive)
export function getTechIcon(name: string): IconType | null {
    const normalizedName = name.toLowerCase().trim();
    return techIcons[normalizedName] || null;
}

// Props interfaces
interface BaseTechIconProps {
    name: string;
    color?: string;
    className?: string;
}

interface TechIconProps extends BaseTechIconProps {
    size?: number;
    showLabel?: boolean;
    labelPosition?: "bottom" | "right" | "tooltip";
}

interface TechOrbProps extends BaseTechIconProps {
    size?: "sm" | "md" | "lg" | "xl";
    glowIntensity?: "none" | "low" | "medium" | "high";
    animated?: boolean;
    level?: number;
}

interface TechCardProps extends BaseTechIconProps {
    level?: number;
    category?: string;
    description?: string;
    showProgress?: boolean;
    onClick?: () => void;
}

interface TechBadgeProps extends BaseTechIconProps {
    variant?: "default" | "outline" | "ghost" | "glow";
}

// Size mappings
const orbSizes = {
    sm: { container: "w-12 h-12", icon: 20 },
    md: { container: "w-16 h-16", icon: 28 },
    lg: { container: "w-20 h-20 md:w-24 md:h-24", icon: 36 },
    xl: { container: "w-28 h-28 md:w-32 md:h-32", icon: 48 },
};

const glowIntensities = {
    none: "",
    low: "20",
    medium: "40",
    high: "60",
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
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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
    const glow = glowIntensities[glowIntensity];

    return (
        <motion.div
            className={cn("relative group cursor-pointer", className)}
            whileHover={{ scale: 1.15, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div
                className={cn(
                    "rounded-full flex items-center justify-center backdrop-blur-sm",
                    sizeConfig.container
                )}
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${color}30, ${color}08)`,
                    border: `2px solid ${color}60`,
                    boxShadow: glow ? `0 0 ${parseInt(glow) * 1.5}px ${color}${glow}` : undefined,
                }}
                animate={
                    animated
                        ? {
                            boxShadow: [
                                `0 0 20px ${color}20`,
                                `0 0 40px ${color}40`,
                                `0 0 20px ${color}20`,
                            ],
                        }
                        : undefined
                }
                transition={animated ? { duration: 2, repeat: Infinity } : undefined}
            >
                {Icon ? (
                    <Icon size={sizeConfig.icon} style={{ color }} className="drop-shadow-lg" />
                ) : (
                    <span
                        className="font-bold text-lg"
                        style={{ color, fontSize: sizeConfig.icon * 0.5 }}
                    >
                        {name.slice(0, 2).toUpperCase()}
                    </span>
                )}
            </motion.div>

            {/* Tooltip */}
            <motion.div
                className="absolute -top-14 left-1/2 -translate-x-1/2 glass px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
                initial={false}
            >
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-white">{name}</span>
                    {level !== undefined && (
                        <span className="text-xs" style={{ color }}>
                            {level}% Proficiency
                        </span>
                    )}
                </div>
                {/* Arrow */}
                <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                />
            </motion.div>
        </motion.div>
    );
}

// Tech Card (detailed skill card)
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
            {/* Glow effect on hover */}
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

// Tech Badge (small inline badge)
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
                <span style={{ color }}>{name.slice(0, 1)}</span>
            )}
            <span className="text-white/80">{name}</span>
        </motion.span>
    );
}

// Floating Tech Orbs Container (for hero sections)
export function FloatingTechOrbs({
    skills,
    className,
}: {
    skills: Array<{ name: string; color: string; level?: number }>;
    className?: string;
}) {
    return (
        <div className={cn("absolute inset-0 pointer-events-none", className)}>
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                const radius = 30 + Math.random() * 10;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={skill.name}
                        className="absolute pointer-events-auto"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
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
                );
            })}
        </div>
    );
}

// Orbiting Tech Display (for skills preview)
export function OrbitingTechDisplay({
    skills,
    centerContent,
    radius = 180,
    className,
}: {
    skills: Array<{ name: string; color: string; level?: number }>;
    centerContent?: React.ReactNode;
    radius?: number;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative flex items-center justify-center",
                className
            )}
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
            <motion.div
                className="absolute z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {centerContent}
            </motion.div>

            {/* Orbiting skills */}
            {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={skill.name}
                        className="absolute"
                        style={{ x, y }}
                        animate={{
                            x: [x, x + Math.cos(angle + Math.PI) * 15, x],
                            y: [y, y + Math.sin(angle + Math.PI) * 15, y],
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

// Skill Constellation (connected nodes)
export function SkillConstellation({
    skills,
    className,
}: {
    skills: Array<{ name: string; color: string; level?: number }>;
    className?: string;
}) {
    const centerX = 200;
    const centerY = 200;
    const radius = 150;

    return (
        <div className={cn("relative h-[400px] w-full", className)}>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
                {skills.map((_, i) => {
                    const nextIndex = (i + 1) % skills.length;
                    const angle1 = (i / skills.length) * Math.PI * 2;
                    const angle2 = (nextIndex / skills.length) * Math.PI * 2;

                    return (
                        <motion.line
                            key={i}
                            x1={centerX + Math.cos(angle1) * radius}
                            y1={centerY + Math.sin(angle1) * radius}
                            x2={centerX + Math.cos(angle2) * radius}
                            y2={centerY + Math.sin(angle2) * radius}
                            stroke={`${skills[i].color}40`}
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        />
                    );
                })}
                {/* Lines to center */}
                {skills.map((skill, i) => {
                    const angle = (i / skills.length) * Math.PI * 2;
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
                const angle = (i / skills.length) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={skill.name}
                        className="absolute"
                        style={{
                            left: x,
                            top: y,
                            transform: "translate(-50%, -50%)",
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
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <span className="text-2xl">⚡</span>
            </motion.div>
        </div>
    );
}

// Tech Grid (for skills page)
export function TechGrid({
    skills,
    onSkillClick,
    className,
}: {
    skills: Array<{
        name: string;
        color: string;
        level?: number;
        category?: string;
    }>;
    onSkillClick?: (skill: typeof skills[0]) => void;
    className?: string;
}) {
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
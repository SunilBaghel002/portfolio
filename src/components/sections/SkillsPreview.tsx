// components/sections/SkillsPreview.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/lib/data";
import { ScrollReveal } from "../animations/ScrollReveal";
import { Button } from "../ui/button";
import { TechIcon } from "../ui/TechIcon";
import {
    ArrowRight,
    Sparkles,
    Code2,
    Server,
    Database,
    Layers,
    Zap,
    Terminal
} from "lucide-react";

// Category icons mapping
const categoryIcons: Record<string, any> = {
    "Languages": Code2,
    "Frontend": Layers,
    "Backend": Server,
    "Databases": Database,
    "DevOps & Tools": Terminal,
    "Other Technologies": Zap,
    "Exploring": Sparkles,
};

// Skill Card Component
function SkillCard({
    skill,
    index,
    isInView
}: {
    skill: { name: string; level: number; color: string };
    index: number;
    isInView: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
                    filter: "blur(20px)",
                }}
            />

            <div
                className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/10 group-hover:border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-[-4px]"
                style={{
                    borderColor: isHovered ? `${skill.color}40` : undefined,
                }}
            >
                <div className="flex items-center gap-3 mb-3">
                    {/* Icon */}
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                            background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                            border: `1px solid ${skill.color}30`,
                            boxShadow: isHovered ? `0 0 20px ${skill.color}30` : undefined,
                        }}
                    >
                        <TechIcon name={skill.name} color={skill.color} size={20} />
                    </div>

                    {/* Name and Level */}
                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-white/90">{skill.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: skill.color }}
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                    transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                                />
                            </div>
                            <span
                                className="text-xs font-medium"
                                style={{ color: skill.color }}
                            >
                                {skill.level}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Category Section Component
function CategorySection({
    category,
    index,
    isInView
}: {
    category: typeof portfolioData.skillCategories[0];
    index: number;
    isInView: boolean;
}) {
    const Icon = categoryIcons[category.name] || Code2;

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="p-2 rounded-lg"
                    style={{
                        background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
                        border: `1px solid ${category.color}40`,
                    }}
                >
                    <Icon className="w-4 h-4" style={{ color: category.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <div
                    className="flex-1 h-px"
                    style={{
                        background: `linear-gradient(to right, ${category.color}30, transparent)`,
                    }}
                />
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3">
                {category.skills.slice(0, 4).map((skill, skillIndex) => (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={skillIndex}
                        isInView={isInView}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// Floating Skills Animation
function FloatingSkillBubble({
    skill,
    index,
    total
}: {
    skill: { name: string; color: string };
    index: number;
    total: number;
}) {
    const angle = (index / total) * Math.PI * 2;
    const radius = 120;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
        <motion.div
            className="absolute"
            style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: [0, Math.cos(angle) * 10, 0],
                y: [0, Math.sin(angle) * 10, 0],
            }}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.1 },
                scale: { duration: 0.5, delay: index * 0.1 },
                x: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
            }}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`,
                    border: `2px solid ${skill.color}40`,
                    boxShadow: `0 0 20px ${skill.color}20`,
                }}
            >
                <TechIcon name={skill.name} color={skill.color} size={24} />
            </div>
        </motion.div>
    );
}

// Stats Card
function StatCard({
    number,
    label,
    color,
    delay
}: {
    number: string;
    label: string;
    color: string;
    delay: number;
}) {
    return (
        <motion.div
            className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                y: -5,
                borderColor: `${color}40`,
                boxShadow: `0 10px 40px ${color}10`
            }}
        >
            <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color }}
            >
                {number}
            </div>
            <div className="text-sm text-white/50">{label}</div>
        </motion.div>
    );
}

export default function SkillsPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Get top skills from different categories
    const topSkills = portfolioData.skills
        .sort((a, b) => b.level - a.level)
        .slice(0, 8);

    const featuredCategories = portfolioData.skillCategories.slice(0, 4);

    return (
        <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ec4899]/3 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#00f0ff]/20 mb-6"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Terminal className="w-4 h-4 text-[#00f0ff]" />
                            <span className="text-sm text-white/60">Technical Arsenal</span>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">Skills &</span>{" "}
                            <span className="gradient-text">Expertise</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="text-white/50 max-w-2xl mx-auto text-lg">
                            Technologies I use to bring ideas to life. From frontend frameworks
                            to backend systems and everything in between.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <StatCard
                        number="30+"
                        label="Technologies"
                        color="#00f0ff"
                        delay={0}
                    />
                    <StatCard
                        number="4+"
                        label="Years Experience"
                        color="#a855f7"
                        delay={0.1}
                    />
                    <StatCard
                        number="50+"
                        label="Projects Built"
                        color="#ec4899"
                        delay={0.2}
                    />
                    <StatCard
                        number="8×"
                        label="Hackathon Wins"
                        color="#F59E0B"
                        delay={0.3}
                    />
                </div>

                {/* Skills Visualization */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Orbiting Skills */}
                    <ScrollReveal>
                        <div className="relative h-[400px] flex items-center justify-center">
                            {/* Center Icon */}
                            <motion.div
                                className="absolute w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#a855f7]/20 flex items-center justify-center border border-white/10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Code2 className="w-10 h-10 text-[#00f0ff]" />
                            </motion.div>

                            {/* Orbiting Skills */}
                            {topSkills.map((skill, index) => (
                                <FloatingSkillBubble
                                    key={skill.name}
                                    skill={skill}
                                    index={index}
                                    total={topSkills.length}
                                />
                            ))}

                            {/* Orbit Ring */}
                            <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-white/10" />
                        </div>
                    </ScrollReveal>

                    {/* Right: Category Cards */}
                    <div className="space-y-6">
                        {featuredCategories.map((category, index) => (
                            <CategorySection
                                key={category.name}
                                category={category}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <ScrollReveal>
                    <div className="text-center">
                        <Link href="/skills">
                            <Button
                                variant="gradient"
                                size="lg"
                                className="group"
                                shine
                                glowOnHover
                            >
                                <span>Explore All Skills</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
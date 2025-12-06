"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/lib/data";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

function SkillOrb({ skill, index }: { skill: typeof portfolioData.skills[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className="relative group"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
            }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
        >
            <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${skill.color}40, ${skill.color}10)`,
                    border: `2px solid ${skill.color}50`,
                }}
                animate={{
                    boxShadow: [
                        `0 0 20px ${skill.color}20`,
                        `0 0 40px ${skill.color}30`,
                        `0 0 20px ${skill.color}20`,
                    ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-white font-semibold text-sm md:text-base">
                    {skill.name.slice(0, 4)}
                </span>
            </motion.div>

            {/* Tooltip */}
            <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
            >
                <span className="text-sm text-white">{skill.name}</span>
                <span className="text-xs text-[var(--color-accent-neon)] ml-2">{skill.level}%</span>
            </motion.div>
        </motion.div>
    );
}

export default function SkillsPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <span className="text-[var(--color-accent-neon)] text-sm font-medium uppercase tracking-wider mb-4 block">
                            What I Do
                        </span>
                    </ScrollReveal>
                    <AnimatedHeading>Technical Expertise</AnimatedHeading>
                    <ScrollReveal delay={0.2}>
                        <p className="text-white/60 max-w-2xl mx-auto mt-6">
                            A curated collection of technologies I work with daily to build
                            exceptional digital experiences.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Skills Orbit */}
                <div className="relative h-[500px] flex items-center justify-center mb-16">
                    {/* Center decoration */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-accent-neon)]/20 to-[var(--color-accent-purple)]/20 flex items-center justify-center"
                        style={{ rotate }}
                    >
                        <Sparkles className="w-12 h-12 text-[var(--color-accent-neon)]" />
                    </motion.div>

                    {/* Orbiting skills */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {portfolioData.skills.slice(0, 8).map((skill, index) => {
                            const angle = (index / 8) * Math.PI * 2;
                            const radius = 180;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={skill.name}
                                    className="absolute"
                                    style={{
                                        x,
                                        y,
                                    }}
                                    animate={{
                                        x: [x, x + Math.cos(angle + Math.PI) * 10, x],
                                        y: [y, y + Math.sin(angle + Math.PI) * 10, y],
                                    }}
                                    transition={{
                                        duration: 4 + index * 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <SkillOrb skill={skill} index={index} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Orbit rings */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="180"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                            strokeDasharray="10 10"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r="120"
                            fill="none"
                            stroke="rgba(0,240,255,0.1)"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* CTA */}
                <ScrollReveal>
                    <div className="text-center">
                        <Link href="/skills">
                            <Button variant="outline" size="lg" className="group">
                                Explore All Skills
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>

            {/* Background */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-accent-neon)]/5 rounded-full blur-[128px] pointer-events-none -translate-y-1/2" />
        </section>
    );
}
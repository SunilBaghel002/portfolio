"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/lib/data";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export default function FeaturedProjects() {
    const featuredProjects = portfolioData.projects.filter((p) => p.featured).slice(0, 3);

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <ScrollReveal>
                            <span className="text-[var(--color-accent-neon)] text-sm font-medium uppercase tracking-wider mb-4 block">
                                Selected Work
                            </span>
                        </ScrollReveal>
                        <AnimatedHeading>Featured Projects</AnimatedHeading>
                    </div>
                    <ScrollReveal direction="right">
                        <Link href="/projects">
                            <Button variant="ghost" className="group">
                                View All Projects
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Projects */}
                <div className="space-y-32">
                    {featuredProjects.map((project, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <ScrollReveal
                                key={project.id}
                                direction={isEven ? "left" : "right"}
                                delay={index * 0.2}
                            >
                                <motion.div
                                    className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"
                                        }`}
                                >
                                    {/* Image */}
                                    <motion.div
                                        className={`relative aspect-video rounded-3xl overflow-hidden glass ${isEven ? "" : "lg:order-2"
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-neon)]/20 to-[var(--color-accent-purple)]/20" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

                                        {/* Floating year badge */}
                                        <motion.div
                                            className="absolute top-6 right-6 glass px-4 py-2 rounded-full"
                                            initial={{ opacity: 0, y: -20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <span className="text-sm font-mono text-[var(--color-accent-neon)]">
                                                {project.year}
                                            </span>
                                        </motion.div>
                                    </motion.div>

                                    {/* Content */}
                                    <div className={`space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                                        <motion.div
                                            className="flex flex-wrap gap-2"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/60 border border-white/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </motion.div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                                            {project.title}
                                        </h3>

                                        <p className="text-white/60 text-lg leading-relaxed">
                                            {project.longDescription || project.description}
                                        </p>

                                        <div className="flex items-center gap-4 pt-4">
                                            {project.link && (
                                                <Button variant="default" asChild>
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            )}
                                            {project.github && (
                                                <Button variant="outline" asChild>
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Github className="w-4 h-4 mr-2" />
                                                        Source Code
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-accent-purple)]/10 rounded-full blur-[128px] pointer-events-none -translate-y-1/2" />
        </section>
    );
}
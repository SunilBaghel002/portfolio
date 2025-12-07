"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/lib/data";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { OrbitingTechDisplay } from "../ui/TechIcon";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
                        <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block">
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

                {/* Skills Orbit with Icons */}
                <ScrollReveal delay={0.3}>
                    <OrbitingTechDisplay
                        skills={portfolioData.skills.slice(0, 8)}
                        radius={180}
                        centerContent={
                            <motion.div
                                className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#a855f7]/20 flex items-center justify-center backdrop-blur-sm"
                                style={{ rotate }}
                            >
                                <Sparkles className="w-12 h-12 text-[#00f0ff]" />
                            </motion.div>
                        }
                        className="mb-16"
                    />
                </ScrollReveal>

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
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[128px] pointer-events-none -translate-y-1/2" />
        </section>
    );
}
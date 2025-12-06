"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { AnimatedText } from "../animations/AnimatedText";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Floating decorations */}
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-accent-neon)]/20 to-transparent"
                    style={{ y, rotate }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)]/20 to-transparent"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--color-accent-neon)]/30 mb-8"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="w-4 h-4 text-[var(--color-accent-neon)]" />
                        <span className="text-sm text-white/80">Ready to start?</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <AnimatedText
                            text="Let's Create"
                            className="block"
                            type="words"
                            animation="reveal"
                        />
                        <span className="gradient-text">Something Amazing</span>
                    </h2>

                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                        Have a project in mind? Let&apos;s collaborate and bring your vision to life
                        with cutting-edge technology and stunning design.
                    </p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href="/contact">
                            <Button size="lg" className="group">
                                Start a Project
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/projects">
                            <Button variant="outline" size="lg">
                                View My Work
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-[var(--color-accent-neon)]/10 via-[var(--color-accent-purple)]/5 to-transparent rounded-full blur-[100px]" />
            </div>
        </section>
    );
}
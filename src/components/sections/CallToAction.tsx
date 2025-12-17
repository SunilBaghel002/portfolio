// components/sections/CallToAction.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { AnimatedText } from "../animations/AnimatedText";
import {
    ArrowRight,
    Sparkles,
    Mail,
    Calendar,
    MessageCircle,
    Copy,
    Check,
    Github,
    Linkedin,
    Twitter
} from "lucide-react";
import { useState } from "react";

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Your contact info
const contactInfo = {
    email: "sunilbaghel@example.com", // Replace with your email
    calendly: "https://calendly.com/sunilbaghel", // Replace with your Calendly
    whatsapp: "+911234567890", // Replace with your WhatsApp number
    socials: {
        github: "https://github.com/SunilBaghel002",
        linkedin: "https://linkedin.com/in/sunilbaghel",
        twitter: "https://twitter.com/sunilbaghel",
    },
};

export default function CallToAction() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = contactInfo.email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Elements - Static, no parallax */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top left decoration */}
                <div className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-transparent blur-xl" />

                {/* Bottom right decoration */}
                <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-transparent blur-xl" />

                {/* Center glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-[#00f0ff]/10 via-[#a855f7]/5 to-transparent rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00f0ff]/30 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                        <span className="text-sm text-white/80">Ready to collaborate?</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                    >
                        <AnimatedText
                            text="Let's Create"
                            className="block"
                            type="words"
                            animation="reveal"
                        />
                        <span className="gradient-text">Something Amazing</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
                    >
                        Have a project in mind? Let&apos;s collaborate and bring your vision to life
                        with cutting-edge technology and stunning design.
                    </motion.p>

                    {/* Primary CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        {/* Email Button */}
                        <a href={`mailto:${contactInfo.email}`}>
                            <Button size="lg" variant="gradient" className="group min-w-[200px]">
                                <Mail className="w-5 h-5 mr-2" />
                                Send Email
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>

                        {/* Schedule Call */}
                        <a
                            href={contactInfo.calendly}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" variant="neon" className="min-w-[200px]">
                                <Calendar className="w-5 h-5 mr-2" />
                                Schedule a Call
                            </Button>
                        </a>
                    </motion.div>

                    {/* Quick Contact Options */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap items-center justify-center gap-3 mb-10"
                    >
                        {/* Copy Email */}
                        <button
                            onClick={copyEmail}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300 group"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-green-400">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 text-white/60 group-hover:text-[#00f0ff]" />
                                    <span className="text-sm text-white/60 group-hover:text-white">
                                        Copy Email
                                    </span>
                                </>
                            )}
                        </button>

                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-green-500/40 transition-all duration-300 group"
                        >
                            <MessageCircle className="w-4 h-4 text-white/60 group-hover:text-green-400" />
                            <span className="text-sm text-white/60 group-hover:text-white">
                                WhatsApp
                            </span>
                        </a>

                        {/* View Projects */}
                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-[#a855f7]/40 transition-all duration-300 group"
                        >
                            <Sparkles className="w-4 h-4 text-white/60 group-hover:text-[#a855f7]" />
                            <span className="text-sm text-white/60 group-hover:text-white">
                                View Projects
                            </span>
                        </Link>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex items-center justify-center gap-4"
                    >
                        <span className="text-sm text-white/40">Or connect on:</span>

                        <div className="flex items-center gap-3">
                            <a
                                href={contactInfo.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>

                            <a
                                href={contactInfo.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl glass border border-white/10 text-white/60 hover:text-[#0077b5] hover:border-[#0077b5]/30 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>

                            <a
                                href={contactInfo.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl glass border border-white/10 text-white/60 hover:text-[#1da1f2] hover:border-[#1da1f2]/30 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Email Display */}
                    <motion.p
                        variants={fadeInUp}
                        className="mt-8 text-sm text-white/40"
                    >
                        or email directly at{" "}
                        <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-[#00f0ff] hover:underline"
                        >
                            {contactInfo.email}
                        </a>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
// components/sections/CallToAction.tsx
"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
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
    Twitter,
    Send,
    Phone,
    MapPin,
    Clock
} from "lucide-react";
import { useState, useRef } from "react";
import { portfolioData } from "@/lib/data";

// Contact info
const contactInfo = {
    email: portfolioData.email || "sunilbaghel93100@gmail.com",
    calendly: "https://calendly.com/sunilbaghel",
    whatsapp: "+919310012345",
    location: portfolioData.location || "India",
};

// Animated background shapes
function FloatingShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Decorative elements */}
            <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-[#00f0ff]/50" />
            <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-[#a855f7]/50" />
            <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-[#ec4899]/50" />
            <div className="absolute bottom-20 right-[25%] w-4 h-4 rounded-full bg-[#00f0ff]/30" />
        </div>
    );
}

// Contact Method Card
function ContactCard({
    icon: Icon,
    title,
    description,
    action,
    href,
    color,
    delay,
}: {
    icon: any;
    title: string;
    description: string;
    action: string;
    href?: string;
    color: string;
    delay: number;
}) {
    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 text-left w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                y: -5,
                boxShadow: `0 20px 40px ${color}10`,
            }}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                        border: `1px solid ${color}30`,
                        boxShadow: `0 0 0 0 ${color}40`,
                    }}
                >
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-white/50 mb-4">{description}</p>

                <div
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
                    style={{ color }}
                >
                    <span>{action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Border glow on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                    border: `1px solid ${color}30`,
                }}
            />
        </Component>
    );
}

// Social Link
function SocialLink({
    href,
    icon: Icon,
    label,
    color,
    delay,
}: {
    href: string;
    icon: any;
    label: string;
    color: string;
    delay: number;
}) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={{
                y: -5,
                borderColor: `${color}40`,
            }}
            aria-label={label}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                    background: `linear-gradient(135deg, ${color}15, transparent)`,
                }}
            >
                <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                />
            </div>
            <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                {label}
            </span>

            {/* Hover glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: `radial-gradient(circle at center, ${color}10, transparent 70%)`,
                }}
            />
        </motion.a>
    );
}

export default function CallToAction() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
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
        <section
            ref={containerRef}
            className="py-24 md:py-32 relative overflow-hidden"
        >
            <FloatingShapes />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Main CTA */}
                <div className="text-center mb-16">
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#00f0ff]/20 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            👋
                        </motion.span>
                        <span className="text-sm text-white/60">Let's work together</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="text-white">Have a Project in</span>
                        <br />
                        <span className="gradient-text">Mind?</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        I'm always excited to collaborate on innovative projects.
                        Let's turn your ideas into reality with cutting-edge technology.
                    </motion.p>

                    {/* Primary CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <a href={`mailto:${contactInfo.email}`}>
                            <Button
                                size="lg"
                                variant="gradient"
                                className="group min-w-[200px]"
                                shine
                                glowOnHover
                            >
                                <Send className="w-5 h-5 mr-2" />
                                <span>Start a Project</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>

                        <Link href="/projects">
                            <Button
                                size="lg"
                                variant="glass"
                                className="min-w-[200px]"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                <span>View My Work</span>
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    <ContactCard
                        icon={Mail}
                        title="Email Me"
                        description="Best for detailed project discussions"
                        action="Send an email"
                        href={`mailto:${contactInfo.email}`}
                        color="#00f0ff"
                        delay={0}
                    />
                    <ContactCard
                        icon={Calendar}
                        title="Schedule a Call"
                        description="Book a 30-min video meeting"
                        action="Pick a time"
                        href={contactInfo.calendly}
                        color="#a855f7"
                        delay={0.1}
                    />
                    <ContactCard
                        icon={MessageCircle}
                        title="Quick Chat"
                        description="For quick questions on WhatsApp"
                        action="Start chatting"
                        href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                        color="#25D366"
                        delay={0.2}
                    />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="text-sm text-white/30">or connect on social</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <SocialLink
                        href={portfolioData.socials[0]?.url || "https://github.com/SunilBaghel002"}
                        icon={Github}
                        label="GitHub"
                        color="#ffffff"
                        delay={0}
                    />
                    <SocialLink
                        href={portfolioData.socials[1]?.url || "https://linkedin.com/in/sunilbaghel"}
                        icon={Linkedin}
                        label="LinkedIn"
                        color="#0077b5"
                        delay={0.1}
                    />
                    <SocialLink
                        href={portfolioData.socials[2]?.url || "https://twitter.com/sunilbaghel"}
                        icon={Twitter}
                        label="Twitter"
                        color="#1da1f2"
                        delay={0.2}
                    />
                </div>

                {/* Email Copy Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p className="text-sm text-white/40 mb-3">Or reach out directly at</p>
                    <button
                        onClick={copyEmail}
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00f0ff]/30 transition-all duration-300"
                    >
                        <span className="text-lg font-mono text-[#00f0ff]">
                            {contactInfo.email}
                        </span>
                        {copied ? (
                            <Check className="w-5 h-5 text-green-400" />
                        ) : (
                            <Copy className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                        )}
                    </button>
                    {copied && (
                        <motion.p
                            className="text-sm text-green-400 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            Copied to clipboard!
                        </motion.p>
                    )}
                </motion.div>

                {/* Location & Availability */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="flex items-center gap-2 text-sm text-white/40">
                        <MapPin className="w-4 h-4" />
                        <span>{contactInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                        <Clock className="w-4 h-4" />
                        <span>Usually responds within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                        </span>
                        <span className="text-green-400/80">Available for new projects</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
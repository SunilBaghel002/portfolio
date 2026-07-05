"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { AnimatedHeading } from "@/components/animations/AnimatedText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import {
    Send,
    Mail,
    MapPin,
    Phone,
    Github,
    Linkedin,
    Twitter,
    Dribbble,
    CheckCircle,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CyberGlobe = dynamic(() => import("@/components/three/CyberGlobe"), {
    ssr: false,
    loading: () => null,
});

const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    dribbble: Dribbble,
};

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function AnimatedInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    textarea = false,
}: {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    textarea?: boolean;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <motion.label
                className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none z-10",
                    isFocused || hasValue
                        ? "top-0 -translate-y-1/2 bg-[#0a0a0a] px-2 text-xs text-[#00f0ff]"
                        : "top-6 -translate-y-1/2 text-white/40"
                )}
            >
                {label}
            </motion.label>

            {textarea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? placeholder : ""}
                    rows={5}
                    className={cn(
                        "w-full pt-4 pb-4 px-4 rounded-xl bg-white/[0.03] border transition-all duration-300 resize-none outline-none",
                        isFocused
                            ? "border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.1)] bg-white/[0.05]"
                            : "border-white/10 hover:border-white/20"
                    )}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? placeholder : ""}
                    className={cn(
                        "w-full pt-4 pb-4 px-4 rounded-xl bg-white/[0.03] border transition-all duration-300 outline-none",
                        isFocused
                            ? "border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.1)] bg-white/[0.05]"
                            : "border-white/10 hover:border-white/20"
                    )}
                />
            )}
        </motion.div>
    );
}

function ContactInfo() {
    const info = [
        { icon: Mail, label: "Email", value: portfolioData.email },
        { icon: MapPin, label: "Location", value: portfolioData.location },
        { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    ];

    return (
        <div className="space-y-6">
            {info.map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 0.1} direction="left">
                    <motion.div
                        className="flex items-center gap-4 p-4 rounded-xl glass-subtle group border border-white/5 hover:border-[#00f0ff]/30 transition-colors"
                        whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 flex items-center justify-center group-hover:from-[#00f0ff]/20 group-hover:to-[#a855f7]/20 transition-all border border-white/5">
                            <item.icon className="w-5 h-5 text-[#00f0ff] group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <p className="text-sm text-white/40">{item.label}</p>
                            <p className="text-white font-medium tracking-wide">{item.value}</p>
                        </div>
                    </motion.div>
                </ScrollReveal>
            ))}
        </div>
    );
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* 3D Background */}
            <div className="absolute top-0 right-0 w-full h-[80vh] pointer-events-none">
                <CyberGlobe />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <span className="text-[#00f0ff] text-sm font-medium uppercase tracking-wider mb-4 block">
                            Get In Touch
                        </span>
                    </ScrollReveal>
                    <AnimatedHeading>Let&apos;s Work Together</AnimatedHeading>
                    <ScrollReveal delay={0.2}>
                        <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg">
                            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
                            Send me a message and I&apos;ll get back to you as soon as possible.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <ScrollReveal direction="up">
                        <motion.form
                            onSubmit={handleSubmit}
                            className="glass-strong p-8 md:p-10 rounded-[2rem] space-y-8 border border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden"
                            layout
                        >
                            {/* Form decorative glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-[80px] -z-10" />

                            <AnimatedInput
                                label="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                            <AnimatedInput
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                            <AnimatedInput
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Project Inquiry"
                            />
                            <AnimatedInput
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                textarea
                            />

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 text-lg"
                                variant="neon"
                                disabled={isSubmitting || isSubmitted}
                                magnetic
                                glowOnHover
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : isSubmitted ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Sent Successfully!
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </motion.form>
                    </ScrollReveal>

                    {/* Contact Info & Socials */}
                    <div className="space-y-12 pt-8">
                        <ContactInfo />

                        {/* Social Links */}
                        <div className="relative">
                            <ScrollReveal>
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-[#00f0ff]" />
                                    Connect With Me
                                </h3>
                            </ScrollReveal>
                            <StaggerContainer className="flex flex-wrap gap-4">
                                {portfolioData.socials.map((social) => {
                                    const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                                    return (
                                        <StaggerItem key={social.name}>
                                            <MagneticButton strength={0.4}>
                                                <motion.a
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-16 h-16 rounded-2xl glass-subtle flex items-center justify-center text-white/60 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/30 border border-white/5 transition-all group"
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Icon className="w-7 h-7" />
                                                </motion.a>
                                            </MagneticButton>
                                        </StaggerItem>
                                    );
                                })}
                            </StaggerContainer>
                        </div>

                        {/* Decorative Quote or Element */}
                        <ScrollReveal delay={0.4}>
                            <div className="relative p-8 rounded-3xl overflow-hidden glass-subtle border border-white/5">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-[#a855f7]/5" />
                                <motion.div
                                    className="absolute inset-0 opacity-30"
                                    animate={{
                                        backgroundPosition: ["0% 0%", "100% 100%"],
                                    }}
                                    style={{
                                        backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
                                        backgroundSize: "20px 20px",
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="relative z-10">
                                    <p className="text-white/80 text-lg italic leading-relaxed">
                                        &ldquo;The best way to predict the future is to create it.&rdquo;
                                    </p>
                                    <p className="text-[#00f0ff] mt-4 font-mono text-sm">— Alan Kay</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
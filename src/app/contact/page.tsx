"use client";

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
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    isFocused || hasValue
                        ? "top-2 text-xs text-accent-neon"
                        : "top-4 text-white/40"
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
                        "w-full pt-7 pb-4 px-4 rounded-xl bg-white/5 border transition-all duration-300 resize-none",
                        isFocused
                            ? "border-accent-neon shadow-[0_0_20px_rgba(0,240,255,0.1)]"
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
                        "w-full pt-7 pb-4 px-4 rounded-xl bg-white/5 border transition-all duration-300",
                        isFocused
                            ? "border-accent-neon shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                            : "border-white/10 hover:border-white/20"
                    )}
                />
            )}

            {/* Focus line animation */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-neon to-accent-purple"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.3 }}
            />
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
                        className="flex items-center gap-4 p-4 rounded-xl glass group"
                        whileHover={{ x: 10 }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-neon/20 to-accent-purple/20 flex items-center justify-center group-hover:from-accent-neon/30 group-hover:to-accent-purple/30 transition-all">
                            <item.icon className="w-5 h-5 text-accent-neon" />
                        </div>
                        <div>
                            <p className="text-sm text-white/40">{item.label}</p>
                            <p className="text-white font-medium">{item.value}</p>
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
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <span className="text-accent-neon text-sm font-medium uppercase tracking-wider mb-4 block">
                            Get In Touch
                        </span>
                    </ScrollReveal>
                    <AnimatedHeading>Let&apos;s Work Together</AnimatedHeading>
                    <ScrollReveal delay={0.2}>
                        <p className="text-white/60 max-w-2xl mx-auto mt-6">
                            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
                            Send me a message and I&apos;ll get back to you as soon as possible.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <ScrollReveal direction="up">
                        <motion.form
                            onSubmit={handleSubmit}
                            className="glass p-8 rounded-3xl space-y-6"
                            layout
                        >
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
                                className="w-full"
                                disabled={isSubmitting || isSubmitted}
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
                    <div className="space-y-12">
                        <ContactInfo />

                        {/* Social Links */}
                        <div>
                            <ScrollReveal>
                                <h3 className="text-lg font-semibold text-white mb-6">
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
                                                    className="w-14 h-14 rounded-xl glass flex items-center justify-center text-white/60 hover:text-accent-neon hover:border-accent-neon/50 transition-all group"
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </motion.a>
                                            </MagneticButton>
                                        </StaggerItem>
                                    );
                                })}
                            </StaggerContainer>
                        </div>

                        {/* Decorative */}
                        <ScrollReveal delay={0.4}>
                            <div className="relative p-8 rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-neon/10 to-accent-purple/10" />
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        background: [
                                            "radial-gradient(circle at 0% 0%, rgba(0,240,255,0.1) 0%, transparent 50%)",
                                            "radial-gradient(circle at 100% 100%, rgba(168,85,247,0.1) 0%, transparent 50%)",
                                            "radial-gradient(circle at 0% 100%, rgba(236,72,153,0.1) 0%, transparent 50%)",
                                            "radial-gradient(circle at 0% 0%, rgba(0,240,255,0.1) 0%, transparent 50%)",
                                        ],
                                    }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                />
                                <div className="relative">
                                    <p className="text-white/80 text-lg italic">
                                        &ldquo;The best way to predict the future is to create it.&rdquo;
                                    </p>
                                    <p className="text-accent-neon mt-2">— Alan Kay</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-neon/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-[128px]" />
            </div>
        </div>
    );
}
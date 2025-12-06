"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    type?: "chars" | "words" | "lines";
    animation?: "reveal" | "slide" | "fade" | "glitch";
}

export function AnimatedText({
    text,
    className,
    delay = 0,
    type = "chars",
    animation = "reveal",
}: AnimatedTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const elements = type === "chars"
        ? text.split("")
        : type === "words"
            ? text.split(" ")
            : [text];

    const getAnimation = () => {
        switch (animation) {
            case "reveal":
                return {
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                };
            case "slide":
                return {
                    hidden: { x: -50, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                };
            case "fade":
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                };
            case "glitch":
                return {
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                };
            default:
                return {
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                };
        }
    };

    const variants = getAnimation();

    return (
        <motion.span
            ref={ref}
            className={cn("inline-block", className)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {elements.map((element, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        variants={variants}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.03,
                            ease: "easeOut",
                        }}
                    >
                        {element === " " ? "\u00A0" : element}
                        {type === "words" && i < elements.length - 1 && "\u00A0"}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

interface AnimatedHeadingProps {
    children: string;
    className?: string;
    gradient?: boolean;
}

export function AnimatedHeading({ children, className, gradient = true }: AnimatedHeadingProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.h2
            ref={ref}
            className={cn(
                "text-4xl md:text-6xl font-bold",
                gradient && "gradient-text",
                className
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.h2>
    );
}

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
    return (
        <span className={cn("relative inline-block", className)}>
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0.5 text-[#00f0ff] opacity-70 animate-pulse"
                style={{ clipPath: "inset(45% 0 35% 0)" }}
            >
                {text}
            </span>
            <span
                className="absolute top-0 -left-0.5 text-[#ec4899] opacity-70 animate-pulse"
                style={{ clipPath: "inset(25% 0 55% 0)", animationDelay: "0.1s" }}
            >
                {text}
            </span>
        </span>
    );
}
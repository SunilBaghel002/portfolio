"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
    once?: boolean;
    amount?: number;
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 0.6,
    direction = "up",
    once = true,
    amount = 0.3,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const getVariants = (): Variants => {
        const directions = {
            up: { y: 60, x: 0 },
            down: { y: -60, x: 0 },
            left: { x: 60, y: 0 },
            right: { x: -60, y: 0 },
            scale: { scale: 0.8, y: 0, x: 0 },
            fade: { y: 0, x: 0 },
        };

        const { x, y, scale } = directions[direction];

        return {
            hidden: {
                opacity: 0,
                y,
                x,
                scale: direction === "scale" ? scale : 1,
            },
            visible: {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
            },
        };
    };

    return (
        <motion.div
            ref={ref}
            className={cn(className)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={getVariants()}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    delayChildren?: number;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    delayChildren = 0.2,
}: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
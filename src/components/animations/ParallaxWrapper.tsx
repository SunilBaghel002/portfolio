"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxWrapperProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: "up" | "down";
    opacity?: boolean;
    scale?: boolean;
}

export function ParallaxWrapper({
    children,
    className,
    speed = 0.5,
    direction = "up",
    opacity = false,
    scale = false,
}: ParallaxWrapperProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
    );

    const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <motion.div
            ref={ref}
            className={cn(className)}
            style={{
                y,
                opacity: opacity ? opacityValue : 1,
                scale: scale ? scaleValue : 1,
            }}
        >
            {children}
        </motion.div>
    );
}

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <div ref={containerRef} className={cn("relative h-[300vh]", className)}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div className="flex gap-8" style={{ x }}>
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============================================
// PARALLAX WRAPPER
// ============================================

interface ParallaxWrapperProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: "up" | "down" | "left" | "right";
    opacity?: boolean;
    scale?: boolean;
    rotate?: boolean;
    rotateAmount?: number;
}

export function ParallaxWrapper({
    children,
    className,
    speed = 0.5,
    direction = "up",
    opacity = false,
    scale = false,
    rotate = false,
    rotateAmount = 10,
}: ParallaxWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Movement transforms
    const yUp = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const yDown = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
    const xLeft = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const xRight = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

    const y = direction === "up" ? yUp : direction === "down" ? yDown : 0;
    const x = direction === "left" ? xLeft : direction === "right" ? xRight : 0;

    // Opacity transform
    const opacityValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Scale transform
    const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    // Rotation transform
    const rotateValue = useTransform(scrollYProgress, [0, 1], [-rotateAmount, rotateAmount]);

    return (
        <motion.div
            ref={ref}
            className={cn("relative", className)}
            style={{
                y: typeof y === 'number' ? y : y,
                x: typeof x === 'number' ? x : x,
                opacity: opacity ? opacityValue : 1,
                scale: scale ? scaleValue : 1,
                rotate: rotate ? rotateValue : 0,
            }}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// PARALLAX TEXT
// ============================================

interface ParallaxTextProps {
    children: string;
    className?: string;
    baseVelocity?: number;
    direction?: "left" | "right";
}

export function ParallaxText({
    children,
    className,
    baseVelocity = 5,
    direction = "left",
}: ParallaxTextProps) {
    const baseX = useRef(0);
    const { scrollY } = useScroll();

    const scrollVelocity = useSpring(
        useTransform(scrollY, (v) => v * 0.01),
        { damping: 50, stiffness: 400 }
    );

    const x = useTransform(scrollVelocity, (v) => {
        baseX.current += (direction === "left" ? -1 : 1) * baseVelocity * 0.01;
        if (baseX.current <= -100) baseX.current = 0;
        if (baseX.current >= 100) baseX.current = 0;
        return `${baseX.current + v * (direction === "left" ? -1 : 1)}%`;
    });

    return (
        <div className={cn("overflow-hidden whitespace-nowrap", className)}>
            <motion.div className="inline-flex" style={{ x }}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="mr-8">
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// ============================================
// HORIZONTAL SCROLL
// ============================================

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
    const xSpring = useSpring(x, { stiffness: 100, damping: 30 });

    return (
        <div ref={containerRef} className={cn("relative h-[300vh]", className)}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div className="flex gap-8" style={{ x: xSpring }}>
                    {children}
                </motion.div>
            </div>
        </div>
    );
}

// ============================================
// PARALLAX LAYERS
// ============================================

interface ParallaxLayerProps {
    children: ReactNode;
    className?: string;
    depth?: number; // 0 = foreground (fast), 1 = background (slow)
}

export function ParallaxLayer({
    children,
    className,
    depth = 0.5,
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const speed = (1 - depth) * 200;
    const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
    const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            className={cn("relative", className)}
            style={{ y: ySpring }}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// PARALLAX SECTION
// ============================================

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    backgroundImage?: string;
    backgroundSpeed?: number;
    overlay?: boolean;
    overlayOpacity?: number;
}

export function ParallaxSection({
    children,
    className,
    backgroundImage,
    backgroundSpeed = 0.5,
    overlay = true,
    overlayOpacity = 0.7,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${backgroundSpeed * 100}%`]);

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            {/* Parallax background */}
            {backgroundImage && (
                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        y,
                    }}
                />
            )}

            {/* Overlay */}
            {overlay && (
                <div
                    className="absolute inset-0 -z-10 bg-[#0a0a0a]"
                    style={{ opacity: overlayOpacity }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// ============================================
// ZOOM ON SCROLL
// ============================================

interface ZoomOnScrollProps {
    children: ReactNode;
    className?: string;
    startScale?: number;
    endScale?: number;
}

export function ZoomOnScroll({
    children,
    className,
    startScale = 0.8,
    endScale = 1,
}: ZoomOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [startScale, endScale]);
    const scaleSpring = useSpring(scale, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            className={cn("relative", className)}
            style={{ scale: scaleSpring }}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// ROTATE ON SCROLL
// ============================================

interface RotateOnScrollProps {
    children: ReactNode;
    className?: string;
    startRotation?: number;
    endRotation?: number;
}

export function RotateOnScroll({
    children,
    className,
    startRotation = -10,
    endRotation = 10,
}: RotateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [startRotation, endRotation]);
    const rotateSpring = useSpring(rotate, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            className={cn("relative", className)}
            style={{ rotate: rotateSpring }}
        >
            {children}
        </motion.div>
    );
}
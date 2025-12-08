"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer select-none",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-white shadow-lg shadow-[#00f0ff]/20 hover:shadow-xl hover:shadow-[#00f0ff]/30 hover:scale-[1.02] active:scale-[0.98]",
                secondary:
                    "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-[#a855f7]/20 hover:shadow-xl hover:shadow-[#a855f7]/30 hover:scale-[1.02] active:scale-[0.98]",
                outline:
                    "border-2 border-white/20 bg-transparent text-white hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 hover:shadow-lg hover:shadow-[#00f0ff]/10",
                ghost:
                    "bg-transparent text-white/70 hover:text-white hover:bg-white/10",
                glass:
                    "glass border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-xl",
                neon:
                    "bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3),inset_0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5),inset_0_0_25px_rgba(0,240,255,0.2)] hover:bg-[#00f0ff]/10",
                neonPurple:
                    "bg-transparent border-2 border-[#a855f7] text-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.3),inset_0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5),inset_0_0_25px_rgba(168,85,247,0.2)] hover:bg-[#a855f7]/10",
                gradient:
                    "bg-[length:200%_200%] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] text-white animate-gradient hover:scale-[1.02] active:scale-[0.98] shadow-lg",
                shimmer:
                    "bg-[#0a0a0a] text-white border border-white/10 hover:border-white/20",
                destructive:
                    "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98]",
                success:
                    "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]",
                link:
                    "text-[#00f0ff] underline-offset-4 hover:underline bg-transparent p-0 h-auto",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-8 text-base font-semibold",
                xl: "h-16 px-10 text-lg font-semibold",
                icon: "h-11 w-11 p-0",
                iconSm: "h-9 w-9 p-0",
                iconLg: "h-14 w-14 p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    magnetic?: boolean;
    magneticStrength?: number;
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    ripple?: boolean;
    shine?: boolean;
    glowOnHover?: boolean;
}

// Ripple effect component
function RippleEffect({
    x,
    y,
    onComplete
}: {
    x: number;
    y: number;
    onComplete: () => void;
}) {
    return (
        <motion.span
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{ left: x, top: y, x: "-50%", y: "-50%" }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 500, height: 500, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={onComplete}
        />
    );
}

// Shine effect component
function ShineEffect() {
    return (
        <motion.span
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: "100%", opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </motion.span>
    );
}

// Glow effect component
function GlowEffect({ color = "#00f0ff" }: { color?: string }) {
    return (
        <motion.span
            className="absolute inset-0 pointer-events-none rounded-xl opacity-0"
            style={{
                boxShadow: `0 0 30px ${color}60, 0 0 60px ${color}30`,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        />
    );
}

// Shimmer button background
function ShimmerBackground() {
    return (
        <motion.span
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
            initial={false}
        >
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                }}
            />
        </motion.span>
    );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            magnetic = false,
            magneticStrength = 0.2,
            loading = false,
            loadingText,
            leftIcon,
            rightIcon,
            ripple = true,
            shine = false,
            glowOnHover = false,
            children,
            disabled,
            onClick,
            ...props
        },
        ref
    ) => {
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
        const rippleIdRef = React.useRef(0);

        // Magnetic effect
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
        const x = useSpring(mouseX, springConfig);
        const y = useSpring(mouseY, springConfig);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!magnetic || !buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set((e.clientX - centerX) * magneticStrength);
            mouseY.set((e.clientY - centerY) * magneticStrength);
        };

        const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        };

        // Ripple effect handler
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (ripple && buttonRef.current && !loading && !disabled) {
                const rect = buttonRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const id = rippleIdRef.current++;
                setRipples((prev) => [...prev, { id, x, y }]);
            }
            onClick?.(e);
        };

        const removeRipple = (id: number) => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        };

        // Determine glow color based on variant
        const getGlowColor = () => {
            switch (variant) {
                case "secondary":
                case "neonPurple":
                    return "#a855f7";
                case "destructive":
                    return "#ef4444";
                case "success":
                    return "#22c55e";
                default:
                    return "#00f0ff";
            }
        };

        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }

        const isDisabled = disabled || loading;

        const buttonContent = (
            <>
                {/* Shimmer background for shimmer variant */}
                {variant === "shimmer" && <ShimmerBackground />}

                {/* Shine effect */}
                {shine && !isDisabled && <ShineEffect />}

                {/* Glow effect */}
                {glowOnHover && !isDisabled && <GlowEffect color={getGlowColor()} />}

                {/* Ripple effects */}
                {ripples.map((ripple) => (
                    <RippleEffect
                        key={ripple.id}
                        x={ripple.x}
                        y={ripple.y}
                        onComplete={() => removeRipple(ripple.id)}
                    />
                ))}

                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {loadingText && <span>{loadingText}</span>}
                        </>
                    ) : (
                        <>
                            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                            {children}
                            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                        </>
                    )}
                </span>

                {/* Gradient overlay for default/secondary variants on hover */}
                {(variant === "default" || variant === "secondary" || variant === "gradient") && (
                    <motion.span
                        className="absolute inset-0 bg-white/0 pointer-events-none rounded-xl"
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </>
        );

        // With magnetic effect
        if (magnetic) {
            return (
                <motion.div style={{ x, y }} className="inline-block">
                    <motion.button
                        ref={buttonRef}
                        className={cn(buttonVariants({ variant, size, className }))}
                        disabled={isDisabled}
                        onClick={handleClick}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                        {...props}
                    >
                        {buttonContent}
                    </motion.button>
                </motion.div>
            );
        }

        // Without magnetic effect
        return (
            <motion.button
                ref={buttonRef}
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={isDisabled}
                onClick={handleClick}
                whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                {...props}
            >
                {buttonContent}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

// Icon Button Component
interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "loadingText"> {
    icon: React.ReactNode;
    "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, size = "icon", className, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                size={size}
                className={cn("rounded-full", className)}
                {...props}
            >
                {icon}
            </Button>
        );
    }
);

IconButton.displayName = "IconButton";

// Button Group Component
interface ButtonGroupProps {
    children: React.ReactNode;
    className?: string;
    orientation?: "horizontal" | "vertical";
}

function ButtonGroup({ children, className, orientation = "horizontal" }: ButtonGroupProps) {
    return (
        <div
            className={cn(
                "inline-flex",
                orientation === "vertical" ? "flex-col" : "flex-row",
                "[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none",
                orientation === "vertical" && "[&>*:first-child]:rounded-b-none [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-t-none [&>*:last-child]:rounded-b-xl",
                "[&>*:not(:first-child)]:-ml-px",
                orientation === "vertical" && "[&>*:not(:first-child)]:ml-0 [&>*:not(:first-child)]:-mt-px",
                className
            )}
        >
            {children}
        </div>
    );
}

export { Button, IconButton, ButtonGroup, buttonVariants };
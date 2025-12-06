"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-white hover:shadow-lg hover:shadow-[#00f0ff]/25",
                outline:
                    "border border-white/20 bg-transparent hover:bg-white/5 hover:border-[#00f0ff]",
                ghost: "bg-transparent hover:bg-white/5",
                glass: "glass hover:bg-white/10 border-white/10",
                neon: "bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 neon-border",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-8 text-base",
                icon: "h-11 w-11",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, magnetic = false, children, ...props }, ref) => {
        const [position, setPosition] = React.useState({ x: 0, y: 0 });
        const buttonRef = React.useRef<HTMLButtonElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!magnetic || !buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            setPosition({ x: x * 0.2, y: y * 0.2 });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
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

        return (
            <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="inline-block"
            >
                <button
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={magnetic ? buttonRef : ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    {...props}
                >
                    <span className="relative z-10">{children}</span>
                </button>
            </motion.div>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
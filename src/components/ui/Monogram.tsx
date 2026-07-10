"use client";

import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg" | number;
  bgCutoutColor?: string;
}

export default function Monogram({
  className,
  size = "md",
  bgCutoutColor = "var(--color-background)",
}: MonogramProps) {
  const dimensions =
    size === "sm"
      ? "w-8 h-8"
      : size === "md"
      ? "w-10 h-10"
      : size === "lg"
      ? "w-16 h-16"
      : "";

  const customStyle =
    typeof size === "number" ? { width: size, height: size } : undefined;

  return (
    <div
      className={cn(
        "relative select-none pointer-events-none flex items-center justify-center",
        dimensions,
        className
      )}
      style={customStyle}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* 'B' letter in the back */}
        <text
          x="42"
          y="70"
          fontSize="64"
          fontFamily="var(--font-display), 'Georgia', serif"
          fontWeight="600"
          fill="currentColor"
        >
          B
        </text>

        {/* 'S' letter stroke (creates the cutout interlocking effect) */}
        <text
          x="22"
          y="66"
          fontSize="68"
          fontFamily="var(--font-display), 'Georgia', serif"
          fontWeight="300"
          fill="none"
          stroke={bgCutoutColor}
          strokeWidth="6"
        >
          S
        </text>

        {/* 'S' letter fill in the front */}
        <text
          x="22"
          y="66"
          fontSize="68"
          fontFamily="var(--font-display), 'Georgia', serif"
          fontWeight="300"
          fill="var(--color-accent)"
        >
          S
        </text>
      </svg>
    </div>
  );
}

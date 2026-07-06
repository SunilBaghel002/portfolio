"use client";

import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg" | number;
}

export default function Monogram({ className, size = "md" }: MonogramProps) {
  const dimensions =
    size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : size === "lg" ? "w-16 h-16" : "";

  const customStyle = typeof size === "number" ? { width: size, height: size } : undefined;

  return (
    <div
      className={cn("relative select-none pointer-events-none flex items-center justify-center", dimensions, className)}
      style={customStyle}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="monogramGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B38728" />
            <stop offset="25%" stopColor="#FBF5B7" />
            <stop offset="50%" stopColor="#DAA520" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          <linearGradient id="monogramSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
        </defs>

        {/* Outer subtle glow/ring */}
        <circle cx="50" cy="50" r="46" stroke="url(#monogramGold)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />

        {/* 'B' letter in the background - Gold */}
        <text
          x="44"
          y="68"
          fontSize="52"
          fontFamily="'Instrument Serif', 'Didot', 'Georgia', serif"
          fontWeight="400"
          fill="url(#monogramGold)"
          style={{ letterSpacing: "-0.05em" }}
        >
          B
        </text>

        {/* 'S' letter in the foreground - Silver/White intertwined */}
        <text
          x="28"
          y="56"
          fontSize="58"
          fontFamily="'Instrument Serif', 'Didot', 'Georgia', serif"
          fontWeight="300"
          fill="url(#monogramSilver)"
          style={{ letterSpacing: "-0.05em" }}
        >
          S
        </text>
      </svg>
    </div>
  );
}

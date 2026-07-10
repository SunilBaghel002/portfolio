"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`marquee-container ${className}`}
      style={{ overflow: "hidden" }}
    >
      <div
        className="marquee-content"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: "running",
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused";
          }
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running";
          }
        }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
}

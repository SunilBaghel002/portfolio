"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"none" | "link" | "project" | "text">("none");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for instant tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring follow lag
  const springConfig = { damping: 30, stiffness: 350, mass: 0.8 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouch);
    
    if (isTouch) {
      document.body.style.cursor = "auto";
      return;
    }

    // Hide default cursor
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = !!target.closest("a");
      const isButton = !!target.closest("button, [role='button']");
      const isProject = !!target.closest("[data-cursor='project']");
      const isTextInput = !!target.closest("input, textarea, [contenteditable='true']");

      if (isProject) {
        setHoverState("project");
      } else if (isLink || isButton) {
        setHoverState("link");
      } else if (isTextInput) {
        setHoverState("text");
      } else {
        setHoverState("none");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Suppress default cursor for desktop */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-element {
            display: none !important;
          }
          *, *::before, *::after {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-element fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isClicking ? 0.6 : hoverState === "link" ? 1.5 : hoverState === "project" ? 0 : 1,
          opacity: isVisible && hoverState !== "text" ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="custom-cursor-element fixed top-0 left-0 rounded-full border border-white/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          width: hoverState === "project" ? 80 : hoverState === "link" ? 48 : hoverState === "text" ? 2 : 32,
          height: hoverState === "project" ? 80 : hoverState === "link" ? 48 : hoverState === "text" ? 24 : 32,
          borderRadius: hoverState === "text" ? "1px" : "9999px",
          backgroundColor: hoverState === "link" ? "rgba(249, 115, 22, 0.08)" : "rgba(255, 255, 255, 0)",
          borderColor: hoverState === "link" ? "#F97316" : hoverState === "project" ? "#F97316" : hoverState === "text" ? "rgba(255,255,255,0.8)" : "rgba(255, 255, 255, 0.4)",
          scale: isClicking ? 0.9 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <AnimatePresence>
          {hoverState === "project" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono font-bold text-[#F97316] whitespace-nowrap"
            >
              VIEW →
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for trailing effect
  const cursorX = useSpring(0, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 30 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Track hoverable elements to animate expansion
  useEffect(() => {
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .cursor-pointer, input, textarea, select"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    const timer = setTimeout(handleElementHover, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full"
        style={{
          border: "1px solid var(--color-accent)",
          background: "rgba(193, 68, 14, 0.05)",
        }}
        animate={{
          width: isHovering ? 32 : 18,
          height: isHovering ? 32 : 18,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </motion.div>
  );
}
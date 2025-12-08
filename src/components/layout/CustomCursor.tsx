"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  isHoveringLink: boolean;
  isHoveringButton: boolean;
  isHoveringText: boolean;
  isHoveringImage: boolean;
  cursorText: string;
  cursorIcon: string | null;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    isHoveringLink: false,
    isHoveringButton: false,
    isHoveringText: false,
    isHoveringImage: false,
    cursorText: "",
    cursorIcon: null,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for the outer ring (follows with delay)
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Glow effect springs (more delayed)
  const glowSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const glowX = useSpring(cursorX, glowSpringConfig);
  const glowY = useSpring(cursorY, glowSpringConfig);

  // Update cursor position directly for the dot (no lag)
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // Direct DOM manipulation for instant dot response
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Check if device has touch (hide cursor on touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      updateCursorPosition(e);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    // Interactive element detection
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for various interactive elements
      const isLink = target.closest('a');
      const isButton = target.closest('button') || target.closest('[role="button"]');
      const isInput = target.closest('input') || target.closest('textarea');
      const isImage = target.closest('img') || target.closest('[data-cursor="image"]');
      const customCursor = target.closest('[data-cursor]');

      let newState: Partial<CursorState> = {
        isHovering: false,
        isHoveringLink: false,
        isHoveringButton: false,
        isHoveringText: false,
        isHoveringImage: false,
        cursorText: "",
        cursorIcon: null,
      };

      if (customCursor) {
        const cursorType = customCursor.getAttribute('data-cursor');
        const cursorText = customCursor.getAttribute('data-cursor-text') || '';

        newState = {
          ...newState,
          isHovering: true,
          cursorText,
          cursorIcon: cursorType,
        };
      } else if (isLink) {
        newState.isHoveringLink = true;
        newState.isHovering = true;
      } else if (isButton) {
        newState.isHoveringButton = true;
        newState.isHovering = true;
      } else if (isInput) {
        newState.isHoveringText = true;
        newState.isHovering = true;
      } else if (isImage) {
        newState.isHoveringImage = true;
        newState.isHovering = true;
      }

      setCursorState(prev => ({ ...prev, ...newState }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateCursorPosition]);

  // Hide on mobile/tablet
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  const {
    isHovering,
    isClicking,
    isHoveringLink,
    isHoveringButton,
    isHoveringText,
    isHoveringImage,
    cursorText
  } = cursorState;

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 1023px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Main cursor dot - instant response */}
      <div
        ref={cursorDotRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference",
          !isVisible && "opacity-0"
        )}
        style={{
          willChange: "transform",
        }}
      >
        <motion.div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
            isHoveringText && "w-[2px] h-6 rounded-none"
          )}
          animate={{
            width: isClicking ? 6 : isHovering ? 8 : 10,
            height: isClicking ? 6 : isHoveringText ? 24 : isHovering ? 8 : 10,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Outer ring - smooth follow */}
      <motion.div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998]",
          !isVisible && "opacity-0"
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: "transform",
        }}
      >
        <motion.div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center",
            isHoveringLink && "border-[#00f0ff]",
            isHoveringButton && "border-[#a855f7]",
            isHoveringImage && "border-[#ec4899]",
            !isHovering && "border-white/50"
          )}
          animate={{
            width: isClicking
              ? 30
              : isHoveringButton
                ? 60
                : isHoveringLink
                  ? 50
                  : isHoveringImage
                    ? 80
                    : 40,
            height: isClicking
              ? 30
              : isHoveringButton
                ? 60
                : isHoveringLink
                  ? 50
                  : isHoveringImage
                    ? 80
                    : 40,
            opacity: isHoveringText ? 0 : 1,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Cursor text */}
          {cursorText && (
            <motion.span
              className="text-xs font-medium text-white whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {cursorText}
            </motion.span>
          )}

          {/* Hover icons */}
          {isHoveringLink && !cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#00f0ff]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.div>
          )}

          {isHoveringImage && !cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#ec4899]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Glow effect - most delayed */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9997]",
          !isVisible && "opacity-0"
        )}
        style={{
          x: glowX,
          y: glowY,
          willChange: "transform",
        }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: isHovering ? 150 : 100,
            height: isHovering ? 150 : 100,
            background: isHoveringButton
              ? "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)"
              : isHoveringLink
                ? "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)"
                : isHoveringImage
                  ? "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Trail particles */}
      <CursorTrail x={cursorX} y={cursorY} isVisible={isVisible} />
    </>
  );
}

// Cursor trail effect
function CursorTrail({
  x,
  y,
  isVisible
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  isVisible: boolean;
}) {
  const trailCount = 5;
  const trails = Array.from({ length: trailCount }, (_, i) => {
    const delay = (i + 1) * 0.05;
    const springConfig = {
      damping: 30 + i * 5,
      stiffness: 300 - i * 30,
      mass: 0.5 + i * 0.1
    };

    return {
      x: useSpring(x, springConfig),
      y: useSpring(y, springConfig),
      opacity: 1 - (i / trailCount) * 0.8,
      scale: 1 - (i / trailCount) * 0.5,
    };
  });

  if (!isVisible) return null;

  return (
    <>
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{
            x: trail.x,
            y: trail.y,
          }}
        >
          <div
            className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#00f0ff]/30 to-[#a855f7]/30"
            style={{
              width: 6 * trail.scale,
              height: 6 * trail.scale,
              opacity: trail.opacity * 0.3,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
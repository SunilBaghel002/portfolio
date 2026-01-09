// components/ui/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  hoverType: 'none' | 'link' | 'button' | 'text' | 'image';
  cursorText: string;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Fixed: Provide initial value for useRef
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Store position in refs to avoid re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    hoverType: 'none',
    cursorText: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  // Smooth animation loop using RAF - single loop for performance
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null) {
      // Lerp the ring position towards mouse (easing factor)
      const ease = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      // Apply transforms directly - no React re-renders
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, isMobile]);

  // Mouse event handlers
  useEffect(() => {
    if (isMobile) return;

    let lastHoverCheck = 0;
    const HOVER_THROTTLE = 50;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      const now = Date.now();
      if (now - lastHoverCheck < HOVER_THROTTLE) return;
      lastHoverCheck = now;

      const target = e.target as HTMLElement;
      detectHoverState(target);
    };

    const detectHoverState = (target: HTMLElement) => {
      const isLink = !!target.closest('a');
      const isButton = !!target.closest('button, [role="button"]');
      const isInput = !!target.closest('input, textarea');
      const isImage = !!target.closest('img, [data-cursor="image"]');
      const customCursor = target.closest('[data-cursor]');

      let hoverType: CursorState['hoverType'] = 'none';
      let cursorText = '';

      if (customCursor) {
        cursorText = customCursor.getAttribute('data-cursor-text') || '';
        hoverType = 'button';
      } else if (isButton) hoverType = 'button';
      else if (isLink) hoverType = 'link';
      else if (isInput) hoverType = 'text';
      else if (isImage) hoverType = 'image';

      const isHovering = hoverType !== 'none';

      setCursorState(prev => {
        if (prev.hoverType === hoverType && prev.cursorText === cursorText) {
          return prev;
        }
        return { ...prev, isHovering, hoverType, cursorText };
      });
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  const { isHovering, isClicking, hoverType, cursorText } = cursorState;

  const dotSize = isClicking ? 6 : isHovering ? 8 : 10;
  const ringSize = isClicking ? 30 :
    hoverType === 'button' ? 60 :
      hoverType === 'link' ? 50 :
        hoverType === 'image' ? 80 : 40;

  const ringColor =
    hoverType === 'button' ? '#a855f7' :
      hoverType === 'link' ? '#00f0ff' :
        hoverType === 'image' ? '#ec4899' :
          'rgba(255,255,255,0.5)';

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>

      <div
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999]",
          !isVisible && "opacity-0"
        )}
        style={{ willChange: "transform" }}
      >
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height] duration-150",
            hoverType === 'text' && "!rounded-none"
          )}
          style={{
            width: hoverType === 'text' ? 2 : dotSize,
            height: hoverType === 'text' ? 24 : dotSize,
          }}
        />
      </div>

      <div
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998]",
          !isVisible && "opacity-0",
          hoverType === 'text' && "opacity-0"
        )}
        style={{ willChange: "transform" }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center transition-all duration-200"
          style={{
            width: ringSize,
            height: ringSize,
            borderColor: ringColor,
            borderWidth: isHovering ? 2 : 1,
          }}
        >
          {cursorText && (
            <span className="text-xs font-medium text-white whitespace-nowrap">
              {cursorText}
            </span>
          )}

          {hoverType === 'link' && !cursorText && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="#00f0ff" strokeWidth="2" className="opacity-80">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          )}

          {hoverType === 'image' && !cursorText && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#ec4899" strokeWidth="2" className="opacity-80">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
"use client";

import { useEffect, useRef } from "react";

export default function SimpleCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let rafId: number;

        const moveCursor = (e: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            });
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <style jsx global>{`
        @media (min-width: 1024px) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ willChange: "transform" }}
            />
        </>
    );
}
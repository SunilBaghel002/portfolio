// components/providers/ClientProviders.tsx
"use client";

import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import dynamic from "next/dynamic";

// ============================================
// Performance Context
// ============================================
interface PerformanceContextType {
  isLowPerformance: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isLoaded: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowPerformance: false,
  prefersReducedMotion: false,
  isMobile: false,
  isLoaded: false,
});

export const usePerformance = () => useContext(PerformanceContext);

// ============================================
// Dynamic Imports with Loading States
// ============================================
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  {
    ssr: false,
    loading: () => null, // No loading state needed for cursor
  }
);

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  {
    ssr: false,
    loading: () => (
      // Subtle loading gradient as placeholder
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-gray-950 to-black" />
    ),
  }
);

// ============================================
// Main Provider Component
// ============================================
export default function ClientProviders({ children }: { children: ReactNode }) {
  const [performanceState, setPerformanceState] = useState<PerformanceContextType>({
    isLowPerformance: false,
    prefersReducedMotion: false,
    isMobile: false,
    isLoaded: false,
  });

  useEffect(() => {
    // Detect performance capabilities
    const detectPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 8;

      const isLowPerformance =
        prefersReducedMotion ||
        cores <= 2 ||
        memory <= 2 ||
        (isMobile && cores <= 4);

      setPerformanceState({
        isLowPerformance,
        prefersReducedMotion,
        isMobile,
        isLoaded: true,
      });
    };

    // Delay detection to not block initial render
    const timer = requestAnimationFrame(() => {
      detectPerformance();
    });

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => detectPerformance();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      cancelAnimationFrame(timer);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const { isLowPerformance, isMobile, isLoaded } = performanceState;

  return (
    <PerformanceContext.Provider value={performanceState}>
      {/* Background Effects - Conditionally rendered based on performance */}
      {isLoaded && !isLowPerformance && <ParticleField />}

      {/* Low-performance fallback background */}
      {isLoaded && isLowPerformance && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#a855f7]/5" />
        </div>
      )}

      {/* Custom Cursor - Desktop only */}
      {isLoaded && !isMobile && <CustomCursor />}

      {/* Page Content */}
      {children}
    </PerformanceContext.Provider>
  );
}
// components/providers/ClientProviders.tsx
"use client";

import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import dynamic from "next/dynamic";

interface PerformanceContextType {
  isLowPerformance: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isLoaded: boolean;
  deviceTier: 'low' | 'medium' | 'high';
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowPerformance: false,
  prefersReducedMotion: false,
  isMobile: false,
  isLoaded: false,
  deviceTier: 'high',
});

export const usePerformance = () => useContext(PerformanceContext);

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [performanceState, setPerformanceState] = useState<PerformanceContextType>({
    isLowPerformance: false,
    prefersReducedMotion: false,
    isMobile: false,
    isLoaded: false,
    deviceTier: 'high',
  });

  useEffect(() => {
    const detectPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 8;

      // Determine device tier
      let deviceTier: 'low' | 'medium' | 'high' = 'high';
      if (cores <= 2 || memory <= 2) {
        deviceTier = 'low';
      } else if (cores <= 4 || memory <= 4) {
        deviceTier = 'medium';
      }

      const isLowPerformance = prefersReducedMotion || deviceTier === 'low';

      setPerformanceState({
        isLowPerformance,
        prefersReducedMotion,
        isMobile,
        isLoaded: true,
        deviceTier,
      });
    };

    const timer = setTimeout(detectPerformance, 50);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", detectPerformance);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", detectPerformance);
    };
  }, []);

  const { isMobile, isLoaded } = performanceState;

  return (
    <PerformanceContext.Provider value={performanceState}>
      {/* Static premium background - Zero JS, zero performance hit */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Simple Grid (Option 1) */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

        {/* Static soft gradients (Option 2 spotlight replacement) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Cursor - Desktop only */}
      {isLoaded && !isMobile && <CustomCursor />}

      {children}
    </PerformanceContext.Provider>
  );
}
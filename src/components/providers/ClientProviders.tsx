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

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
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

      // 🔍 DEBUG: Log device capabilities
      console.log("🖥️ Device Performance Check:", {
        cores,
        memory,
        isMobile,
        prefersReducedMotion,
        windowWidth: window.innerWidth,
        userAgent: navigator.userAgent.substring(0, 50) + "...",
      });

      // Determine device tier
      let deviceTier: 'low' | 'medium' | 'high' = 'high';
      if (cores <= 2 || memory <= 2) {
        deviceTier = 'low';
      } else if (cores <= 4 || memory <= 4) {
        deviceTier = 'medium';
      }

      // 🔧 FIXED: Less aggressive detection
      const isLowPerformance = prefersReducedMotion || deviceTier === 'low';

      console.log("📊 Performance Result:", {
        deviceTier,
        isLowPerformance,
        willShowParticles: !isLowPerformance,
      });

      setPerformanceState({
        isLowPerformance,
        prefersReducedMotion,
        isMobile,
        isLoaded: true,
        deviceTier,
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(detectPerformance, 50);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", detectPerformance);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", detectPerformance);
    };
  }, []);

  const { isLowPerformance, isMobile, isLoaded, deviceTier } = performanceState;

  // 🔍 DEBUG: Log render decisions
  useEffect(() => {
    if (isLoaded) {
      console.log("🎨 Render Decisions:", {
        showParticles: !isLowPerformance,
        showCursor: !isMobile,
        deviceTier,
      });
    }
  }, [isLoaded, isLowPerformance, isMobile, deviceTier]);

  return (
    <PerformanceContext.Provider value={performanceState}>
      {/* Particles - Show for medium and high performance */}
      {isLoaded && !isLowPerformance && <ParticleField />}

      {/* Fallback background for low performance */}
      {isLoaded && isLowPerformance && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#a855f7]/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* Cursor - Desktop only */}
      {isLoaded && !isMobile && <CustomCursor />}

      {children}
    </PerformanceContext.Provider>
  );
}
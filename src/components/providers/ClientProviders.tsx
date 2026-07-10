"use client";

import {
  ReactNode,
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
} from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";

interface PerformanceContextType {
  isLowPerformance: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isLoaded: boolean;
  deviceTier: "low" | "medium" | "high";
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowPerformance: false,
  prefersReducedMotion: false,
  isMobile: false,
  isLoaded: false,
  deviceTier: "high",
});

export const usePerformance = () => useContext(PerformanceContext);

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("@/components/sections/LoadingScreen"),
  { ssr: false }
);

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [performanceState, setPerformanceState] =
    useState<PerformanceContextType>({
      isLowPerformance: false,
      prefersReducedMotion: false,
      isMobile: false,
      isLoaded: false,
      deviceTier: "high",
    });

  const [showLoading, setShowLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Performance detection
  useEffect(() => {
    const detectPerformance = () => {
      const isMobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;

      let deviceTier: "low" | "medium" | "high" = "high";
      if (cores <= 2 || memory <= 2) {
        deviceTier = "low";
      } else if (cores <= 4 || memory <= 4) {
        deviceTier = "medium";
      }

      const isLowPerformance = prefersReducedMotion || deviceTier === "low";

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

  // Lenis smooth scroll
  useEffect(() => {
    if (performanceState.prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [performanceState.prefersReducedMotion]);

  const { isMobile, isLoaded } = performanceState;

  return (
    <PerformanceContext.Provider value={performanceState}>
      {/* Loading screen */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Custom cursor - Desktop only */}
      {isLoaded && !isMobile && <CustomCursor />}

      {children}
    </PerformanceContext.Provider>
  );
}
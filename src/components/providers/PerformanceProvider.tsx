// components/providers/PerformanceProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PerformanceContextType {
    isLowPerformance: boolean;
    prefersReducedMotion: boolean;
    isMobile: boolean;
    deviceTier: 'low' | 'medium' | 'high';
}

const PerformanceContext = createContext<PerformanceContextType>({
    isLowPerformance: false,
    prefersReducedMotion: false,
    isMobile: false,
    deviceTier: 'high',
});

export function usePerformance() {
    return useContext(PerformanceContext);
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
    const [perf, setPerf] = useState<PerformanceContextType>({
        isLowPerformance: false,
        prefersReducedMotion: false,
        isMobile: false,
        deviceTier: 'high',
    });

    useEffect(() => {
        const cores = navigator.hardwareConcurrency || 4;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        // Check device memory if available
        const deviceMemory = (navigator as any).deviceMemory || 8;

        let deviceTier: 'low' | 'medium' | 'high' = 'high';

        if (cores <= 2 || deviceMemory <= 2) {
            deviceTier = 'low';
        } else if (cores <= 4 || deviceMemory <= 4) {
            deviceTier = 'medium';
        }

        const isLowPerformance = deviceTier === 'low' || prefersReducedMotion;

        setPerf({
            isLowPerformance,
            prefersReducedMotion,
            isMobile,
            deviceTier,
        });
    }, []);

    return (
        <PerformanceContext.Provider value={perf}>
            {children}
        </PerformanceContext.Provider>
    );
}
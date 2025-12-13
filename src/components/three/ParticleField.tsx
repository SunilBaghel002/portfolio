// components/three/ParticleField.tsx
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Seeded random for SSR consistency
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Single combined particle system
function CombinedParticles() {
    const ref = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    // Detect if low-performance device
    const particleCount = useMemo(() => {
        if (typeof window === 'undefined') return 800;

        // Check for mobile or low-end device indicators
        const isMobile = window.innerWidth < 768;
        const isLowEnd = navigator.hardwareConcurrency <= 4;

        if (isMobile) return 300;
        if (isLowEnd) return 500;
        return 800;
    }, []);

    // Pre-compute all particle positions
    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        // Color palette
        const colorPalette = [
            new THREE.Color("#00f0ff"), // cyan
            new THREE.Color("#a855f7"), // purple
            new THREE.Color("#ec4899"), // pink
        ];

        for (let i = 0; i < particleCount; i++) {
            // Position
            positions[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 30;
            positions[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 30;
            positions[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 30;

            // Color - distribute across palette
            const colorIndex = i % 3;
            const color = colorPalette[colorIndex];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // Size variation
            sizes[i] = 0.015 + seededRandom(i * 7) * 0.015;
        }

        return { positions, colors, sizes };
    }, [particleCount]);

    // Throttled animation - skip frames for performance
    const frameSkip = useRef(0);
    const FRAME_SKIP = 2; // Only update every 2nd frame

    useFrame((state) => {
        if (!ref.current) return;

        // Skip frames for performance
        frameSkip.current++;
        if (frameSkip.current < FRAME_SKIP) return;
        frameSkip.current = 0;

        const time = state.clock.getElapsedTime();

        // Smooth rotation
        ref.current.rotation.x = time * 0.015;
        ref.current.rotation.y = time * 0.02;

        // Subtle mouse interaction
        ref.current.rotation.x += mouse.y * 0.02;
        ref.current.rotation.y += mouse.x * 0.02;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                vertexColors
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.5}
            />
        </Points>
    );
}

// Performance-aware canvas wrapper
function ParticleCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            dpr={[1, 1.5]} // Limit pixel ratio
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: false
            }}
            frameloop="always"
            style={{ background: 'transparent' }}
        >
            <CombinedParticles />
        </Canvas>
    );
}

export default function ParticleField() {
    const [shouldRender, setShouldRender] = useState(false);
    const [isLowPerf, setIsLowPerf] = useState(false);

    useEffect(() => {
        // Check performance capability
        const checkPerformance = () => {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isLowEnd = navigator.hardwareConcurrency <= 2;
            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

            if (prefersReducedMotion || isLowEnd) {
                setIsLowPerf(true);
            }

            // Don't render on very low-end mobile
            if (isMobile && isLowEnd) {
                setShouldRender(false);
                return;
            }

            setShouldRender(true);
        };

        // Delay canvas initialization to not block main thread
        const timer = setTimeout(checkPerformance, 100);
        return () => clearTimeout(timer);
    }, []);

    // Return static fallback for low-perf devices
    if (isLowPerf || !shouldRender) {
        return <StaticParticleFallback />;
    }

    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <ParticleCanvas />
        </div>
    );
}

// CSS-only fallback for low-performance devices
function StaticParticleFallback() {
    return (
        <div className="fixed inset-0 -z-10 opacity-40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-[#00f0ff]/5 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }} />
        </div>
    );
}
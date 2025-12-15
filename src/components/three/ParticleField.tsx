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
    const { mouse } = useThree();

    // Particle count based on screen size (calculated once)
    const particleCount = useMemo(() => {
        if (typeof window === "undefined") return 600;

        const width = window.innerWidth;
        if (width < 768) return 300;   // Mobile
        if (width < 1024) return 500;  // Tablet
        return 800;                     // Desktop
    }, []);

    // Pre-compute all particle data
    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color("#00f0ff"),
            new THREE.Color("#a855f7"),
            new THREE.Color("#ec4899"),
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 25;
            positions[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 25;
            positions[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 25;

            const color = colorPalette[i % 3];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, [particleCount]);

    // Animation with frame skipping
    const frameCount = useRef(0);

    useFrame((state) => {
        if (!ref.current) return;

        // Skip every other frame for performance
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        const time = state.clock.getElapsedTime();

        ref.current.rotation.x = time * 0.02;
        ref.current.rotation.y = time * 0.025;

        // Mouse interaction
        ref.current.rotation.x += mouse.y * 0.03;
        ref.current.rotation.y += mouse.x * 0.03;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                vertexColors
                size={0.03}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

function ParticleCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: false,
            }}
            style={{ background: "transparent" }}
        >
            <CombinedParticles />
        </Canvas>
    );
}

export default function ParticleField() {
    const [mounted, setMounted] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Simple mount check - performance is handled by ClientProviders
        setMounted(true);

        // 🔍 DEBUG
        console.log("🌟 ParticleField mounted");
    }, []);

    // Error boundary for WebGL issues
    useEffect(() => {
        const checkWebGL = () => {
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                if (!gl) {
                    console.warn("⚠️ WebGL not supported");
                    setHasError(true);
                } else {
                    console.log("✅ WebGL supported");
                }
            } catch (e) {
                console.error("❌ WebGL check failed:", e);
                setHasError(true);
            }
        };

        checkWebGL();
    }, []);

    // Show fallback if WebGL fails or not mounted
    if (hasError) {
        return <StaticParticleFallback />;
    }

    if (!mounted) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 opacity-70 pointer-events-none"
            style={{ zIndex: -1 }}
        >
            <ParticleCanvas />
        </div>
    );
}

// CSS-only fallback
function StaticParticleFallback() {
    return (
        <div
            className="fixed inset-0 opacity-50 overflow-hidden pointer-events-none"
            style={{ zIndex: -1 }}
        >
            <div className="absolute inset-0 bg-gradient-radial from-[#00f0ff]/10 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a855f7]/15 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ec4899]/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
            />
        </div>
    );
}
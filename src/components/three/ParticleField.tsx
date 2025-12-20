// components/three/ParticleField.tsx
"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random for consistency
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// The actual particles component
function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    // Track mouse for interaction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Calculate particle count based on screen
    const count = useMemo(() => {
        if (typeof window === "undefined") return 500;
        const width = window.innerWidth;
        if (width < 640) return 200;
        if (width < 1024) return 400;
        return 600;
    }, []);

    // Create geometry with positions and colors
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color("#00f0ff"), // cyan
            new THREE.Color("#a855f7"), // purple
            new THREE.Color("#ec4899"), // pink
        ];

        for (let i = 0; i < count; i++) {
            // Position - spread in a sphere-like distribution
            const radius = 10 + seededRandom(i * 7) * 10;
            const theta = seededRandom(i * 3) * Math.PI * 2;
            const phi = Math.acos(2 * seededRandom(i * 5) - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Color
            const color = colorPalette[i % 3];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        return geo;
    }, [count]);

    // Create material
    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
    }, []);

    // Animation
    const frameCount = useRef(0);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Skip frames for performance
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        const time = state.clock.getElapsedTime();

        // Slow rotation
        pointsRef.current.rotation.x = time * 0.02;
        pointsRef.current.rotation.y = time * 0.03;

        // Mouse interaction
        pointsRef.current.rotation.x += mousePos.current.y * 0.02;
        pointsRef.current.rotation.y += mousePos.current.x * 0.02;
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// Canvas wrapper with error boundary
function ParticleCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 15], fov: 75 }}
            dpr={[1, 2]}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
            }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "transparent",
            }}
        >
            <Suspense fallback={null}>
                <Particles />
            </Suspense>
        </Canvas>
    );
}

// Main export with mounting logic
export default function ParticleField() {
    const [state, setState] = useState<"loading" | "ready" | "error">("loading");

    useEffect(() => {
        // Check WebGL support
        const checkWebGL = () => {
            try {
                const canvas = document.createElement("canvas");
                const gl =
                    canvas.getContext("webgl2") ||
                    canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl");

                if (!gl) {
                    console.warn("❌ WebGL not supported");
                    setState("error");
                    return;
                }

                console.log("✅ WebGL supported, rendering particles");
                setState("ready");
            } catch (e) {
                console.error("❌ WebGL check failed:", e);
                setState("error");
            }
        };

        // Small delay to ensure client-side
        const timer = setTimeout(checkWebGL, 100);
        return () => clearTimeout(timer);
    }, []);

    // Loading state
    if (state === "loading") {
        return null;
    }

    // Error fallback
    if (state === "error") {
        return <StaticFallback />;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            <ParticleCanvas />
        </div>
    );
}

// Fallback for no WebGL
function StaticFallback() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "pulse 4s ease-in-out infinite",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "25%",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "pulse 4s ease-in-out infinite",
                    animationDelay: "2s",
                }}
            />
        </div>
    );
}
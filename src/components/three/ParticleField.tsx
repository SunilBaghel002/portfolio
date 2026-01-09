// components/three/ParticleField.tsx
"use client";

import { useRef, useMemo, useEffect, useState, Suspense, createContext, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, SparklesIcon, X, Eye, EyeOff } from "lucide-react";

// ============================================
// CONTEXT FOR PARTICLE TOGGLE
// ============================================
interface ParticleContextType {
    isEnabled: boolean;
    toggle: () => void;
}

const ParticleContext = createContext<ParticleContextType>({
    isEnabled: true,
    toggle: () => { },
});

export const useParticles = () => useContext(ParticleContext);

// ============================================
// SEEDED RANDOM
// ============================================
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// ============================================
// PARTICLES COMPONENT
// ============================================
function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Particle count based on screen size - Optimized for low-end devices
    const count = useMemo(() => {
        if (typeof window === "undefined") return 200;
        const width = window.innerWidth;
        if (width < 640) return 60; // Significantly reduced for mobile
        if (width < 1024) return 150;
        return 300; // Reduced from 500
    }, []);

    // Create geometry with SMALLER, uniform particles
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorPalette = [
            new THREE.Color("#00f0ff"),
            new THREE.Color("#a855f7"),
            new THREE.Color("#ec4899"),
        ];

        for (let i = 0; i < count; i++) {
            // Spread particles in a sphere
            const radius = 8 + seededRandom(i * 7) * 12;
            const theta = seededRandom(i * 3) * Math.PI * 2;
            const phi = Math.acos(2 * seededRandom(i * 5) - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Colors
            const color = colorPalette[i % 3];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // SMALLER sizes - uniform small particles
            sizes[i] = 0.02 + seededRandom(i * 11) * 0.015; // 0.02 to 0.035 (very small)
        }

        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        return geo;
    }, [count]);

    // Material with SMALLER size
    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 0.03, // Much smaller base size
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
    }, []);

    // Animation
    const frameCount = useRef(0);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Throttle animation on low-end devices/high refresh rate screens if needed
        // But for now, just standard rotation

        const time = state.clock.getElapsedTime();

        pointsRef.current.rotation.x = time * 0.015;
        pointsRef.current.rotation.y = time * 0.02;

        pointsRef.current.rotation.x += mousePos.current.y * 0.015;
        pointsRef.current.rotation.y += mousePos.current.x * 0.015;
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ============================================
// CANVAS WRAPPER
// ============================================
function ParticleCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 60 }}
            dpr={[0.8, 1.5]} // Allow slightly lower res on very weak devices
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

// ============================================
// TOGGLE BUTTON COMPONENT
// ============================================
function ParticleToggleButton({
    isEnabled,
    onToggle,
}: {
    isEnabled: boolean;
    onToggle: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isEnabled ? "Disable particles" : "Enable particles"}
        >
            {/* Button background */}
            <div
                className={`
          relative flex items-center gap-2 px-4 py-2.5 rounded-full
          border backdrop-blur-xl transition-all duration-300
          ${isEnabled
                        ? "bg-white/[0.05] border-[#00f0ff]/30 hover:border-[#00f0ff]/50"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }
        `}
            >
                {/* Glow effect when enabled */}
                {isEnabled && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "radial-gradient(circle at center, rgba(0,240,255,0.15), transparent 70%)",
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {/* Icon */}
                <motion.div
                    animate={{ rotate: isEnabled ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {isEnabled ? (
                        <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                    ) : (
                        <EyeOff className="w-4 h-4 text-white/40" />
                    )}
                </motion.div>

                {/* Label - shows on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            className="text-xs font-medium whitespace-nowrap"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ color: isEnabled ? "#00f0ff" : "rgba(255,255,255,0.5)" }}
                        >
                            {isEnabled ? "Particles On" : "Particles Off"}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Status indicator */}
                <div
                    className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${isEnabled
                            ? "bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                            : "bg-white/20"
                        }
          `}
                />
            </div>
        </motion.button>
    );
}

// ============================================
// ALTERNATIVE: MINIMAL TOGGLE BUTTON
// ============================================
function MinimalToggleButton({
    isEnabled,
    onToggle,
}: {
    isEnabled: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.button
            onClick={onToggle}
            className={`
        fixed bottom-6 right-6 z-50
        w-10 h-10 rounded-full
        flex items-center justify-center
        border backdrop-blur-md transition-all duration-300
        ${isEnabled
                    ? "bg-[#00f0ff]/10 border-[#00f0ff]/40 hover:bg-[#00f0ff]/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }
      `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isEnabled ? "Disable particles" : "Enable particles"}
        >
            {isEnabled ? (
                <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            ) : (
                <EyeOff className="w-4 h-4 text-white/40" />
            )}
        </motion.button>
    );
}

// ============================================
// STATIC FALLBACK
// ============================================
function StaticFallback() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div
                className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[80px] animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[80px] animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
                    animationDelay: "2s",
                }}
            />
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ParticleField() {
    const [state, setState] = useState<"loading" | "ready" | "error">("loading");
    const [isEnabled, setIsEnabled] = useState(true);

    // Load preference from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("particles-enabled");
        if (saved !== null) {
            setIsEnabled(saved === "true");
        }
    }, []);

    // Check WebGL support
    useEffect(() => {
        const checkWebGL = () => {
            try {
                const canvas = document.createElement("canvas");
                const gl =
                    canvas.getContext("webgl2") ||
                    canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl");

                if (!gl) {
                    setState("error");
                    return;
                }

                // Check for low-end devices
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const cores = navigator.hardwareConcurrency || 4;
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                if (prefersReducedMotion) {
                    setIsEnabled(false);
                }

                setState("ready");
            } catch {
                setState("error");
            }
        };

        const timer = setTimeout(checkWebGL, 100);
        return () => clearTimeout(timer);
    }, []);

    // Toggle handler with localStorage persistence
    const toggleParticles = () => {
        setIsEnabled((prev) => {
            const newValue = !prev;
            localStorage.setItem("particles-enabled", String(newValue));
            return newValue;
        });
    };

    // Loading state
    if (state === "loading") {
        return null;
    }

    // Error fallback (no toggle button needed)
    if (state === "error") {
        return <StaticFallback />;
    }

    return (
        <ParticleContext.Provider value={{ isEnabled, toggle: toggleParticles }}>
            {/* Particle Canvas */}
            <AnimatePresence>
                {isEnabled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static fallback when particles are disabled */}
            <AnimatePresence>
                {!isEnabled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <StaticFallback />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button - Use ParticleToggleButton or MinimalToggleButton */}
            <ParticleToggleButton isEnabled={isEnabled} onToggle={toggleParticles} />
        </ParticleContext.Provider>
    );
}

// ============================================
// EXPORT HOOK FOR EXTERNAL CONTROL
// ============================================
export { ParticleContext };
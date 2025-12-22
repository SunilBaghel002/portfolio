// components/three/Text3D.tsx
"use client";

import { useRef, useState, useEffect, Suspense, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Text3D as DreiText3D } from "@react-three/drei";
import * as THREE from "three";

// ============================================
// FONT URL - Use CDN (no local file needed)
// ============================================
const FONT_URL = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_bold.typeface.json";

// ============================================
// TYPES
// ============================================
interface Text3DProps {
    firstName?: string;
    lastName?: string;
    text?: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: number;
    height?: number;
    className?: string;
}

// ============================================
// 3D NAME COMPONENT
// ============================================
function Name3D({
    firstName,
    lastName,
    primaryColor = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 0.5,
}: {
    firstName: string;
    lastName: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const frameCount = useRef(0);

    // Animation
    useFrame((state) => {
        if (!groupRef.current) return;

        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.02;
    });

    const textOptions = {
        font: FONT_URL,
        size: size,
        height: 0.1,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.008,
        bevelSegments: 2,
    };

    // Calculate spacing
    const spacing = size * 0.4;
    const firstNameWidth = firstName.length * size * 0.6;

    return (
        <group ref={groupRef}>
            {/* Shadow layer */}
            <group position={[0.03, -0.03, -0.08]}>
                <Center>
                    <DreiText3D {...textOptions}>
                        {firstName} {lastName}
                        <meshStandardMaterial
                            color="#ec4899"
                            metalness={0.8}
                            roughness={0.2}
                            transparent
                            opacity={0.2}
                        />
                    </DreiText3D>
                </Center>
            </group>

            {/* Middle layer */}
            <group position={[0.015, -0.015, -0.04]}>
                <Center>
                    <DreiText3D {...textOptions}>
                        {firstName} {lastName}
                        <meshStandardMaterial
                            color={secondaryColor}
                            metalness={0.8}
                            roughness={0.2}
                            transparent
                            opacity={0.4}
                        />
                    </DreiText3D>
                </Center>
            </group>

            {/* Main layer - First name */}
            <Center>
                <group>
                    <DreiText3D
                        {...textOptions}
                        position={[-firstNameWidth / 2 - spacing / 2, 0, 0]}
                    >
                        {firstName}
                        <meshStandardMaterial
                            color={primaryColor}
                            metalness={0.9}
                            roughness={0.15}
                            emissive={primaryColor}
                            emissiveIntensity={0.2}
                        />
                    </DreiText3D>

                    <DreiText3D
                        {...textOptions}
                        position={[spacing / 2, 0, 0]}
                    >
                        {lastName}
                        <meshStandardMaterial
                            color={secondaryColor}
                            metalness={0.9}
                            roughness={0.15}
                            emissive={secondaryColor}
                            emissiveIntensity={0.2}
                        />
                    </DreiText3D>
                </group>
            </Center>
        </group>
    );
}

// ============================================
// LOADING COMPONENT
// ============================================
function LoadingBox({ color }: { color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 0.5, 0.2]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.5}
            />
        </mesh>
    );
}

// ============================================
// SCENE
// ============================================
function Scene({
    firstName,
    lastName,
    primaryColor,
    secondaryColor,
    size,
}: {
    firstName: string;
    lastName: string;
    primaryColor: string;
    secondaryColor: string;
    size: number;
}) {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00f0ff" />
            <directionalLight position={[-5, -3, 5]} intensity={0.5} color="#a855f7" />
            <pointLight position={[0, 0, 6]} intensity={0.4} color="#ffffff" />

            {/* 3D Text with Suspense */}
            <Suspense fallback={<LoadingBox color={primaryColor} />}>
                <Name3D
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    size={size}
                />
            </Suspense>
        </>
    );
}

// ============================================
// CSS FALLBACK
// ============================================
function CSSFallback({
    firstName,
    lastName,
    primaryColor = "#00f0ff",
    secondaryColor = "#a855f7",
    loading = false,
}: {
    firstName: string;
    lastName: string;
    primaryColor?: string;
    secondaryColor?: string;
    loading?: boolean;
}) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
                {/* Glow */}
                <div
                    className="absolute inset-0 blur-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
                        opacity: 0.5,
                    }}
                />

                {/* Shadow layers */}
                <span
                    className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight whitespace-nowrap"
                    style={{
                        color: "#ec4899",
                        transform: "translate(3px, 3px)",
                        opacity: 0.2,
                    }}
                >
                    {firstName} {lastName}
                </span>

                <span
                    className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight whitespace-nowrap"
                    style={{
                        color: secondaryColor,
                        transform: "translate(1.5px, 1.5px)",
                        opacity: 0.4,
                    }}
                >
                    {firstName} {lastName}
                </span>

                {/* Main text */}
                <span
                    className={`relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight whitespace-nowrap ${loading ? "animate-pulse" : ""
                        }`}
                >
                    <span
                        style={{
                            background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: `drop-shadow(0 0 20px ${primaryColor}40)`,
                        }}
                    >
                        {firstName}
                    </span>
                    {" "}
                    <span
                        style={{
                            background: `linear-gradient(135deg, ${secondaryColor}, #ec4899)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: `drop-shadow(0 0 20px ${secondaryColor}40)`,
                        }}
                    >
                        {lastName}
                    </span>
                </span>
            </div>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Text3D({
    firstName = "SUNIL",
    lastName = "BAGHEL",
    text,
    primaryColor = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 0.5,
    height = 150,
    className = "",
}: Text3DProps) {
    const [renderMode, setRenderMode] = useState<"loading" | "3d" | "css">("loading");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse text if provided
    if (text) {
        const parts = text.trim().split(/\s+/);
        firstName = parts[0] || "SUNIL";
        lastName = parts.slice(1).join(" ") || "BAGHEL";
    }

    // Intersection Observer
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Check capabilities
    useEffect(() => {
        if (!isVisible) return;

        const check = () => {
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

                if (!gl) {
                    setRenderMode("css");
                    return;
                }

                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const cores = navigator.hardwareConcurrency || 4;
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                if (prefersReducedMotion || (isMobile && cores <= 4) || cores <= 2) {
                    setRenderMode("css");
                    return;
                }

                setRenderMode("3d");
            } catch {
                setRenderMode("css");
            }
        };

        setTimeout(check, 50);
    }, [isVisible]);

    return (
        <div ref={containerRef} className={className} style={{ height }}>
            {/* Loading */}
            {(!isVisible || renderMode === "loading") && (
                <CSSFallback
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    loading
                />
            )}

            {/* CSS Fallback */}
            {isVisible && renderMode === "css" && (
                <CSSFallback
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            )}

            {/* 3D Canvas */}
            {isVisible && renderMode === "3d" && (
                <Canvas
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: "high-performance",
                    }}
                    frameloop="demand"
                    style={{ background: "transparent" }}
                >
                    <Scene
                        firstName={firstName}
                        lastName={lastName}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        size={size}
                    />
                </Canvas>
            )}
        </div>
    );
}
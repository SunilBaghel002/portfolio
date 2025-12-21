// components/three/Text3D.tsx
"use client";

import { useRef, useState, useEffect, Suspense, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// ============================================
// TYPES
// ============================================
interface NameTextProps {
    firstName: string;
    lastName: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: number;
}

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
// 3D TEXT MESH COMPONENT
// ============================================
const TextMesh = memo(function TextMesh({
    text,
    font,
    size,
    color,
    emissiveIntensity = 0.2,
    position = [0, 0, 0],
    opacity = 1,
}: {
    text: string;
    font: any;
    size: number;
    color: string;
    emissiveIntensity?: number;
    position?: [number, number, number];
    opacity?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Create geometry
    const geometry = new TextGeometry(text, {
        font: font,
        size: size,
        height: 0.12,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelSegments: 2,
    });
    geometry.center();

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            position={position}
        >
            <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={emissiveIntensity}
                transparent={opacity < 1}
                opacity={opacity}
            />
        </mesh>
    );
});

// ============================================
// ANIMATED NAME GROUP
// ============================================
const NameText = memo(function NameText({
    firstName,
    lastName,
    primaryColor = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 0.6,
}: NameTextProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [font, setFont] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const frameCount = useRef(0);
    const { viewport } = useThree();

    // Load font
    useEffect(() => {
        const loader = new FontLoader();
        loader.load(
            "/fonts/helvetiker_bold.typeface.json",
            (loadedFont) => {
                setFont(loadedFont);
                setIsLoaded(true);
            },
            undefined,
            (error) => {
                console.warn("Font load error:", error);
            }
        );
    }, []);

    // Animation
    useFrame((state) => {
        if (!groupRef.current) return;

        // Skip frames for performance
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        const time = state.clock.getElapsedTime();

        // Gentle rotation
        groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.02;
    });

    if (!isLoaded || !font) {
        return (
            <mesh>
                <boxGeometry args={[3, 0.5, 0.1]} />
                <meshStandardMaterial color={primaryColor} transparent opacity={0.3} />
            </mesh>
        );
    }

    const fullText = `${firstName} ${lastName}`;

    return (
        <group ref={groupRef}>
            {/* Shadow layer */}
            <TextMesh
                text={fullText}
                font={font}
                size={size}
                color="#ec4899"
                emissiveIntensity={0.1}
                position={[0.04, -0.04, -0.12]}
                opacity={0.25}
            />

            {/* Middle layer */}
            <TextMesh
                text={fullText}
                font={font}
                size={size}
                color={secondaryColor}
                emissiveIntensity={0.15}
                position={[0.02, -0.02, -0.06]}
                opacity={0.5}
            />

            {/* Main text - First name */}
            <TextMesh
                text={firstName}
                font={font}
                size={size}
                color={primaryColor}
                emissiveIntensity={0.25}
                position={[-(firstName.length * size * 0.35), 0, 0]}
            />

            {/* Main text - Last name */}
            <TextMesh
                text={lastName}
                font={font}
                size={size}
                color={secondaryColor}
                emissiveIntensity={0.25}
                position={[(lastName.length * size * 0.25), 0, 0]}
            />
        </group>
    );
});

// ============================================
// SIMPLE LIGHTING SETUP
// ============================================
function Lighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.7}
                color="#00f0ff"
            />
            <directionalLight
                position={[-5, -3, 5]}
                intensity={0.4}
                color="#a855f7"
            />
            <pointLight
                position={[0, 0, 8]}
                intensity={0.3}
                color="#ffffff"
            />
        </>
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
}: NameTextProps) {
    return (
        <>
            <Lighting />
            <Center>
                <NameText
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    size={size}
                />
            </Center>
        </>
    );
}

// ============================================
// CSS FALLBACK (for mobile/low-end devices)
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
                {/* Glow background */}
                <span
                    className="absolute inset-0 blur-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}50, ${secondaryColor}50, #ec489950)`,
                        opacity: loading ? 0.3 : 0.5,
                    }}
                />

                {/* Shadow layers */}
                <span
                    className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight whitespace-nowrap"
                    style={{
                        color: "#ec4899",
                        transform: "translate(4px, 4px)",
                        opacity: 0.2,
                    }}
                >
                    {firstName} {lastName}
                </span>

                <span
                    className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight whitespace-nowrap"
                    style={{
                        color: secondaryColor,
                        transform: "translate(2px, 2px)",
                        opacity: 0.4,
                    }}
                >
                    {firstName} {lastName}
                </span>

                {/* Main text */}
                <span
                    className={`relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight whitespace-nowrap ${loading ? "animate-pulse" : ""
                        }`}
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 40%, ${secondaryColor} 60%, ${secondaryColor} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: `drop-shadow(0 0 20px ${primaryColor}40)`,
                    }}
                >
                    {firstName} {lastName}
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
    size = 0.6,
    height = 150,
    className = "",
}: Text3DProps) {
    const [renderState, setRenderState] = useState<"loading" | "3d" | "fallback">("loading");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse text prop if provided
    if (text) {
        const parts = text.trim().split(/\s+/);
        firstName = parts[0] || "SUNIL";
        lastName = parts.slice(1).join(" ") || "BAGHEL";
    }

    // Intersection Observer - only load when visible
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

    // Check capabilities when visible
    useEffect(() => {
        if (!isVisible) return;

        const checkCapabilities = () => {
            try {
                // Check WebGL support
                const canvas = document.createElement("canvas");
                const gl =
                    canvas.getContext("webgl2") ||
                    canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl");

                if (!gl) {
                    setRenderState("fallback");
                    return;
                }

                // Check device capabilities
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const isLowEnd = (navigator.hardwareConcurrency || 4) <= 2;
                const prefersReducedMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

                // Use fallback for low-end devices
                if (prefersReducedMotion || isLowEnd || (isMobile && (navigator.hardwareConcurrency || 4) <= 4)) {
                    setRenderState("fallback");
                    return;
                }

                setRenderState("3d");
            } catch {
                setRenderState("fallback");
            }
        };

        // Small delay to not block render
        const timer = setTimeout(checkCapabilities, 50);
        return () => clearTimeout(timer);
    }, [isVisible]);

    return (
        <div ref={containerRef} className={className} style={{ height }}>
            {/* Loading state */}
            {(!isVisible || renderState === "loading") && (
                <CSSFallback
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    loading
                />
            )}

            {/* CSS Fallback */}
            {isVisible && renderState === "fallback" && (
                <CSSFallback
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            )}

            {/* 3D Canvas */}
            {isVisible && renderState === "3d" && (
                <Canvas
                    camera={{ position: [0, 0, 4], fov: 50 }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: "high-performance",
                        stencil: false,
                    }}
                    frameloop="demand"
                    style={{ background: "transparent" }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(0x000000, 0);
                    }}
                >
                    <Suspense fallback={null}>
                        <Scene
                            firstName={firstName}
                            lastName={lastName}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            size={size}
                        />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
// components/three/Text3D.tsx
"use client";

import { useRef, useState, useEffect, Suspense, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Text3D as DreiText3D, useFont } from "@react-three/drei";
import * as THREE from "three";

interface NameTextProps {
    firstName: string;
    lastName: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: number;
}

const NameText = memo(function NameText({
    firstName,
    lastName,
    primaryColor = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 0.8,
}: NameTextProps) {
    const groupRef = useRef<THREE.Group>(null);
    const frameCount = useRef(0);

    const font = useFont("/fonts/helvetiker_bold.typeface.json");

    const materials = useMemo(() => ({
        primary: new THREE.MeshStandardMaterial({
            color: primaryColor,
            metalness: 0.8,
            roughness: 0.2,
            emissive: primaryColor,
            emissiveIntensity: 0.2,
        }),
        secondary: new THREE.MeshStandardMaterial({
            color: secondaryColor,
            metalness: 0.8,
            roughness: 0.2,
            emissive: secondaryColor,
            emissiveIntensity: 0.2,
        }),
        shadow: new THREE.MeshStandardMaterial({
            color: "#ec4899",
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.3,
        }),
    }), [primaryColor, secondaryColor]);

    useFrame((state) => {
        if (!groupRef.current) return;

        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.02;

        materials.primary.emissiveIntensity = 0.2 + Math.sin(time * 1.5) * 0.1;
        materials.secondary.emissiveIntensity = 0.2 + Math.cos(time * 1.5) * 0.1;
    });

    if (!font) return null;

    const textConfig = {
        font: font,
        size: size,
        height: 0.15,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.015,
        bevelSegments: 3,
    };

    const spacing = 0.3;

    return (
        <group ref={groupRef}>
            <group position={[-2.5, 0, -0.15]}>
                <Center>
                    <DreiText3D {...textConfig} material={materials.shadow}>
                        {firstName} {lastName}
                    </DreiText3D>
                </Center>
            </group>

            <group position={[-2.55, 0.05, -0.08]}>
                <Center>
                    <DreiText3D {...textConfig}>
                        {firstName}
                        <primitive object={materials.secondary} attach="material" />
                    </DreiText3D>
                </Center>
            </group>

            <Center>
                <group>
                    <DreiText3D {...textConfig} position={[-(firstName.length * size * 0.35 + spacing), 0, 0]}>
                        {firstName}
                        <primitive object={materials.primary} attach="material" />
                    </DreiText3D>

                    <DreiText3D {...textConfig} position={[(lastName.length * size * 0.2), 0, 0]}>
                        {lastName}
                        <primitive object={materials.secondary} attach="material" />
                    </DreiText3D>
                </group>
            </Center>
        </group>
    );
});

function SimpleLighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00f0ff" />
            <directionalLight position={[-5, -5, 5]} intensity={0.4} color="#a855f7" />
            <pointLight position={[0, 0, 8]} intensity={0.3} color="#ffffff" />
        </>
    );
}

interface Text3DCanvasProps {
    firstName: string;
    lastName: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: number;
}

function Text3DCanvas({
    firstName,
    lastName,
    primaryColor,
    secondaryColor,
    size,
}: Text3DCanvasProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true,
            }}
            frameloop="demand"
            style={{ background: "transparent" }}
            onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
            }}
        >
            <SimpleLighting />
            <Suspense fallback={null}>
                <NameText
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    size={size}
                />
            </Suspense>
        </Canvas>
    );
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

export default function Text3D({
    firstName = "SUNIL",
    lastName = "BAGHEL",
    text,
    primaryColor = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 0.8,
    height = 150,
    className = "",
}: Text3DProps) {
    const [shouldRender, setShouldRender] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
            { threshold: 0.1, rootMargin: "100px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const checkCapabilities = () => {
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl2") ||
                    canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl");

                if (!gl) {
                    setHasError(true);
                    return;
                }

                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const cores = navigator.hardwareConcurrency || 4;
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                if (prefersReducedMotion || (isMobile && cores <= 4)) {
                    setHasError(true);
                    return;
                }

                setShouldRender(true);
            } catch {
                setHasError(true);
            }
        };

        const timer = setTimeout(checkCapabilities, 50);
        return () => clearTimeout(timer);
    }, [isVisible]);

    if (text) {
        const parts = text.split(" ");
        firstName = parts[0] || "SUNIL";
        lastName = parts.slice(1).join(" ") || "BAGHEL";
    }

    return (
        <div ref={containerRef} className={className} style={{ height }}>
            {!isVisible && (
                <CSSFallback
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    loading
                />
            )}

            {isVisible && hasError && (
                <CSSFallback
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            )}

            {isVisible && shouldRender && (
                <Text3DCanvas
                    firstName={firstName}
                    lastName={lastName}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    size={size}
                />
            )}
        </div>
    );
}

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
                <span
                    className="absolute inset-0 blur-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}60, ${secondaryColor}60, #ec489960)`,
                        opacity: loading ? 0.3 : 0.5,
                    }}
                />

                <span
                    className="absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
                    style={{
                        color: "#ec4899",
                        transform: "translate(4px, 4px)",
                        opacity: 0.3,
                    }}
                >
                    {firstName} {lastName}
                </span>

                <span
                    className="absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
                    style={{
                        color: secondaryColor,
                        transform: "translate(2px, 2px)",
                        opacity: 0.5,
                    }}
                >
                    {firstName} {lastName}
                </span>

                <span
                    className={`relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight ${loading ? "animate-pulse" : ""}`}
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, #ec4899 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: `drop-shadow(0 0 30px ${primaryColor}50)`,
                    }}
                >
                    {firstName} {lastName}
                </span>
            </div>
        </div>
    );
}
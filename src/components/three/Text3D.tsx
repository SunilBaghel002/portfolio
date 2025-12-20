// components/three/Text3D.tsx
"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

interface AnimatedText3DProps {
    text: string;
    color?: string;
    secondaryColor?: string;
    size?: number;
    depth?: number;
    animated?: boolean;
}

function AnimatedText({
    text,
    color = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 1,
    depth = 0.3,
    animated = true
}: AnimatedText3DProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    const [font, setFont] = useState<any>(null);
    const [geometry, setGeometry] = useState<TextGeometry | null>(null);
    const [hovered, setHovered] = useState(false);
    const { mouse, viewport } = useThree();

    useEffect(() => {
        const loader = new FontLoader();
        loader.load("/fonts/helvetiker_bold.typeface.json", (loadedFont) => {
            setFont(loadedFont);
        }, undefined, () => {
            console.warn("Failed to load custom font, using fallback");
        });
    }, []);

    useEffect(() => {
        if (font) {
            const geo = new TextGeometry(text, {
                font: font,
                size: size,
                depth: depth,
                curveSegments: 16,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 8,
            });
            geo.center();
            geo.computeBoundingBox();
            setGeometry(geo);
        }
    }, [font, text, size, depth]);

    const gradientTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 0.8;
        const ctx = canvas.getContext('2d')!;

        const gradient = ctx.createLinearGradient(0, 0, 256, 0);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, secondaryColor);
        gradient.addColorStop(1, "#ec4899");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 1);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, [color, secondaryColor]);

    useFrame((state) => {
        if (!meshRef.current || !animated) return;

        const time = state.clock.getElapsedTime();

        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.08;
        meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.03;

        const targetX = (mouse.x * viewport.width) / 20;
        const targetY = (mouse.y * viewport.height) / 20;
        meshRef.current.rotation.y += targetX * 0.02;
        meshRef.current.rotation.x += -targetY * 0.01;

        if (materialRef.current) {
            materialRef.current.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.1;
        }
    });

    if (!geometry) {
        return (
            <mesh>
                <boxGeometry args={[4, 1, 0.5]} />
                <meshStandardMaterial color={color} opacity={0.3} transparent />
            </mesh>
        );
    }

    return (
        <Float
            speed={animated ? 2 : 0}
            rotationIntensity={animated ? 0.1 : 0}
            floatIntensity={animated ? 0.3 : 0}
        >
            <group>
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    scale={hovered ? 1.02 : 1}
                >
                    <meshStandardMaterial
                        ref={materialRef}
                        color={color}
                        metalness={0.9}
                        roughness={0.1}
                        emissive={color}
                        emissiveIntensity={0.3}
                        envMapIntensity={1.5}
                    />
                </mesh>

                <mesh geometry={geometry} position={[0.05, -0.05, -0.1]}>
                    <meshStandardMaterial
                        color={secondaryColor}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.5}
                    />
                </mesh>

                <mesh geometry={geometry} position={[0.1, -0.1, -0.2]}>
                    <meshStandardMaterial
                        color="#ec4899"
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function Scene({
    text,
    color,
    secondaryColor,
    size,
    depth,
    animated
}: AnimatedText3DProps) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                color="#00f0ff"
                castShadow
            />
            <spotLight
                position={[-10, -10, -10]}
                angle={0.15}
                penumbra={1}
                intensity={0.5}
                color="#a855f7"
            />
            <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />

            <Center>
                <AnimatedText
                    text={text}
                    color={color}
                    secondaryColor={secondaryColor}
                    size={size}
                    depth={depth}
                    animated={animated}
                />
            </Center>

            <Environment preset="night" />
        </>
    );
}

interface Text3DProps {
    text: string;
    color?: string;
    secondaryColor?: string;
    size?: number;
    depth?: number;
    className?: string;
    height?: number;
    animated?: boolean;
}

export default function Text3D({
    text,
    color = "#00f0ff",
    secondaryColor = "#a855f7",
    size = 1,
    depth = 0.3,
    className = "",
    height = 80,
    animated = true,
}: Text3DProps) {
    const [mounted, setMounted] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setMounted(true);

        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (!gl) setHasError(true);
        } catch {
            setHasError(true);
        }
    }, []);

    if (!mounted || hasError) {
        return (
            <div className={className} style={{ height }}>
                <div className="w-full h-full flex items-center justify-center">
                    <span
                        className="text-6xl md:text-8xl font-black tracking-tighter"
                        style={{
                            background: `linear-gradient(135deg, ${color}, ${secondaryColor}, #ec4899)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 0 30px rgba(0,240,255,0.5))",
                        }}
                    >
                        {text}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ height }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <Scene
                        text={text}
                        color={color}
                        secondaryColor={secondaryColor}
                        size={size}
                        depth={depth}
                        animated={animated}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
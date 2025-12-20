// components/three/Text3D.tsx
"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

interface AnimatedText3DProps {
    text: string;
    color?: string;
    size?: number;
    depth?: number;
}

function AnimatedText({ text, color = "#00f0ff", size = 1, depth = 0.2 }: AnimatedText3DProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [font, setFont] = useState<any>(null);
    const [geometry, setGeometry] = useState<TextGeometry | null>(null);

    useEffect(() => {
        const loader = new FontLoader();
        loader.load("/fonts/helvetiker_bold.typeface.json", (loadedFont) => {
            setFont(loadedFont);
        });
    }, []);

    useEffect(() => {
        if (font) {
            const geo = new TextGeometry(text, {
                font: font,
                size: size,
                depth: depth,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            });
            geo.center();
            setGeometry(geo);
        }
    }, [font, text, size, depth]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    if (!geometry) return null;

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

interface Text3DProps {
    text: string;
    color?: string;
    size?: number;
    depth?: number;
    className?: string;
    height?: number;
}

export default function Text3D({
    text,
    color = "#00f0ff",
    size = 1,
    depth = 0.2,
    className = "",
    height = 200,
}: Text3DProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={className} style={{ height }}>
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold gradient-text">{text}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ height }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                <Suspense fallback={null}>
                    <Center>
                        <AnimatedText text={text} color={color} size={size} depth={depth} />
                    </Center>
                </Suspense>
            </Canvas>
        </div>
    );
}
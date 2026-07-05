"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { usePerformance } from "@/components/providers/ClientProviders";

function GlobeMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const pointsRef = useRef<THREE.Points>(null);

    // Generate random points on sphere surface
    const points = useMemo(() => {
        const p = new Float32Array(1000 * 3);
        for (let i = 0; i < 1000 * 3; i += 3) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2;
            p[i] = r * Math.sin(phi) * Math.cos(theta);
            p[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i + 2] = r * Math.cos(phi);
        }
        return p;
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group>
            {/* Wireframe Sphere */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 24, 24]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Internal Glow */}
            <mesh>
                <sphereGeometry args={[1.8, 32, 32]} />
                <meshBasicMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Surface Points */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[points, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    color="#fff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>

            {/* Orbital Rings */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, 0, 0]}>
                <torusGeometry args={[2.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#ec4899" transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

export default function CyberGlobe() {
    const { isLowEnd } = usePerformance();

    if (isLowEnd) return null;

    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <GlobeMesh />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>

            {/* Gradient overlay to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
    );
}

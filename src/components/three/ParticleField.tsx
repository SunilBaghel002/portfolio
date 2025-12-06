"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 3000 }) {
    const ref = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.getElapsedTime();
        ref.current.rotation.x = time * 0.02;
        ref.current.rotation.y = time * 0.03;

        // Mouse interaction
        ref.current.rotation.x += mouse.y * 0.1;
        ref.current.rotation.y += mouse.x * 0.1;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function SecondaryParticles({ count = 1000 }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        ref.current.rotation.x = -time * 0.01;
        ref.current.rotation.y = -time * 0.02;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#a855f7"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

export default function ParticleField() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <Particles />
                <SecondaryParticles />
            </Canvas>
        </div>
    );
}
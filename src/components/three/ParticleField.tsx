"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Seeded random function to avoid hydration mismatch
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function Particles({ count = 2000 }) {
    const ref = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Use seeded random based on index
            positions[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 30;
            positions[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 30;
            positions[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 30;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.getElapsedTime();
        ref.current.rotation.x = time * 0.02;
        ref.current.rotation.y = time * 0.03;

        // Mouse interaction
        ref.current.rotation.x += mouse.y * 0.05;
        ref.current.rotation.y += mouse.x * 0.05;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.025}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

function SecondaryParticles({ count = 800 }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (seededRandom(i * 3 + 100) - 0.5) * 25;
            positions[i * 3 + 1] = (seededRandom(i * 3 + 101) - 0.5) * 25;
            positions[i * 3 + 2] = (seededRandom(i * 3 + 102) - 0.5) * 25;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        ref.current.rotation.x = -time * 0.01;
        ref.current.rotation.y = -time * 0.015;
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
                opacity={0.4}
            />
        </Points>
    );
}

function TertiaryParticles({ count = 500 }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (seededRandom(i * 3 + 200) - 0.5) * 35;
            positions[i * 3 + 1] = (seededRandom(i * 3 + 201) - 0.5) * 35;
            positions[i * 3 + 2] = (seededRandom(i * 3 + 202) - 0.5) * 35;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        ref.current.rotation.x = time * 0.005;
        ref.current.rotation.y = time * 0.008;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ec4899"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.3}
            />
        </Points>
    );
}

export default function ParticleField() {
    return (
        <div className="fixed inset-0 -z-10 opacity-70">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
            >
                <Particles />
                <SecondaryParticles />
                <TertiaryParticles />
            </Canvas>
        </div>
    );
}
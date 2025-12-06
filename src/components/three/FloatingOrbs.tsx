"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}

function Orb({ position, color, speed = 1, distort = 0.3, scale = 1 }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
    
    // React to mouse
    meshRef.current.position.x = position[0] + mouse.x * 0.3;
    meshRef.current.position.z = position[2] + mouse.y * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function GlowOrb({ position, color, scale = 0.5 }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.scale.setScalar(scale + Math.sin(time * 2) * 0.1);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

export default function FloatingOrbs() {
  const orbs = useMemo(() => [
    { position: [-4, 2, -5] as [number, number, number], color: "#00f0ff", scale: 0.8 },
    { position: [4, -1, -4] as [number, number, number], color: "#a855f7", scale: 0.6 },
    { position: [0, 3, -6] as [number, number, number], color: "#ec4899", scale: 0.5 },
    { position: [-3, -2, -3] as [number, number, number], color: "#00f0ff", scale: 0.4 },
    { position: [5, 1, -7] as [number, number, number], color: "#a855f7", scale: 0.7 },
  ], []);

  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        {orbs.map((orb, i) => (
          <Orb key={i} {...orb} />
        ))}
      </Canvas>
    </div>
  );
}
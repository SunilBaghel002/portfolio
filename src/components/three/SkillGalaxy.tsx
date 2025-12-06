"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/lib/data";

interface SkillNodeProps {
  position: [number, number, number];
  skill: { name: string; level: number; color: string };
  onClick: () => void;
  isActive: boolean;
}

function SkillNode({ position, skill, onClick, isActive }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
  });

  const scale = useMemo(() => {
    return 0.2 + (skill.level / 100) * 0.3;
  }, [skill.level]);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered || isActive ? scale * 1.3 : scale}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered || isActive ? 1 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {(hovered || isActive) && (
        <Html center distanceFactor={10}>
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap">
            <p className="text-white text-sm font-medium">{skill.name}</p>
            <p className="text-accent-neon text-xs">{skill.level}%</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Connections({ skills }: { skills: { position: [number, number, number] }[] }) {
  const lines = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        if (Math.random() > 0.7) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }, [skills]);

  return (
    <>
      {lines.map(([a, b], i) => (
        <Line
          key={i}
          points={[skills[a].position, skills[b].position]}
          color="#00f0ff"
          opacity={0.1}
          transparent
          lineWidth={0.5}
        />
      ))}
    </>
  );
}

function Scene({ onSkillClick }: { onSkillClick: (skill: typeof portfolioData.skills[0]) => void }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  const skillsWithPositions = useMemo(() => {
    return portfolioData.skills.map((skill, i) => {
      const angle = (i / portfolioData.skills.length) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 4;
      return {
        ...skill,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
      };
    });
  }, []);

  const handleClick = (skill: typeof portfolioData.skills[0]) => {
    setActiveSkill(skill.name);
    onSkillClick(skill);
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <Connections skills={skillsWithPositions} />
      
      {skillsWithPositions.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={skill.position}
          skill={skill}
          onClick={() => handleClick(skill)}
          isActive={activeSkill === skill.name}
        />
      ))}
    </>
  );
}

interface SkillGalaxyProps {
  onSkillClick: (skill: typeof portfolioData.skills[0]) => void;
}

export default function SkillGalaxy({ onSkillClick }: SkillGalaxyProps) {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene onSkillClick={onSkillClick} />
      </Canvas>
    </div>
  );
}
// components/three/SkillGalaxy.tsx
"use client";

import { useRef, useMemo, useEffect, useState, memo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/lib/data";

// ============================================
// OPTIMIZED SKILL NODE - Memoized
// ============================================
interface SkillNodeProps {
  position: [number, number, number];
  skill: { name: string; level: number; color: string };
  index: number;
  onClick: () => void;
  isActive: boolean;
}

const SkillNode = memo(function SkillNode({
  position,
  skill,
  index,
  onClick,
  isActive
}: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const initialY = useRef(position[1]);

  // Pre-calculate values
  const scale = useMemo(() => 0.2 + (skill.level / 100) * 0.3, [skill.level]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: skill.color,
    emissive: skill.color,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2,
  }), [skill.color]);

  // Optimized animation - skip frames
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Skip frames for performance - only update every 3rd frame
    frameCount.current++;
    if (frameCount.current % 3 !== 0) return;

    const time = state.clock.getElapsedTime();

    // Simple floating animation
    meshRef.current.position.y = initialY.current + Math.sin(time * 0.5 + index) * 0.15;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.15;

    // Update emissive only when state changes
    if (hovered || isActive) {
      material.emissiveIntensity = 1;
    } else {
      material.emissiveIntensity = 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered || isActive ? scale * 1.3 : scale}
        material={material}
      >
        <dodecahedronGeometry args={[1, 0]} />
      </mesh>

      {/* Only render HTML when hovered/active */}
      {(hovered || isActive) && (
        <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap">
            <p className="text-white text-sm font-medium">{skill.name}</p>
            <p className="text-[#00f0ff] text-xs">{skill.level}%</p>
          </div>
        </Html>
      )}
    </group>
  );
});

// ============================================
// OPTIMIZED CONNECTIONS - Static lines
// ============================================
const Connections = memo(function Connections({
  positions
}: {
  positions: [number, number, number][]
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];

    // Create connections between nearby skills
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        // Only connect if close enough and with probability
        const dist = Math.sqrt(
          Math.pow(positions[i][0] - positions[j][0], 2) +
          Math.pow(positions[i][1] - positions[j][1], 2) +
          Math.pow(positions[i][2] - positions[j][2], 2)
        );

        if (dist < 4 && ((i + j) % 3 === 0)) {
          vertices.push(...positions[i], ...positions[j]);
        }
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, [positions]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#00f0ff" opacity={0.1} transparent />
    </lineSegments>
  );
});

// ============================================
// STAR DUST - Background Particles
// ============================================
function StarDust() {
  const points = useMemo(() => {
    const p = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500 * 3; i++) {
      const r = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i] = r * Math.sin(phi) * Math.cos(theta);
      p[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#fff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

// ============================================
// CORE - Glowing Center
// ============================================
function Core() {
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
  });

  return (
    <group>
      {/* Inner Core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#000"
          emissive="#a855f7"
          emissiveIntensity={2}
          toneMapped={false}
        />
        <pointLight distance={15} intensity={5} color="#a855f7" />
      </mesh>

      {/* Outer Glow */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  )
}

// ============================================
// SCENE - Main 3D Scene
// ============================================
interface SceneProps {
  onSkillClick: (skill: typeof portfolioData.skills[0]) => void;
}

function Scene({ onSkillClick }: SceneProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Pre-calculate all positions once
  const skillsWithPositions = useMemo(() => {
    return portfolioData.skills.map((skill, i) => {
      // Golden Spiral distribution
      const phi = Math.acos(-1 + (2 * i) / portfolioData.skills.length);
      const theta = Math.sqrt(portfolioData.skills.length * Math.PI) * phi;
      const radius = 6;

      return {
        ...skill,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ] as [number, number, number],
      };
    });
  }, []);

  const positions = useMemo(() =>
    skillsWithPositions.map(s => s.position),
    [skillsWithPositions]
  );

  const handleClick = (skill: typeof portfolioData.skills[0]) => {
    setActiveSkill(skill.name);
    onSkillClick(skill);
  };

  useFrame(({ clock }) => {
    // Slow rotation of entire scene container handled by orbit controls usually, 
    // but here we might want manual rotation if no controls
  });

  return (
    <>
      <StarDust />
      <Core />

      {/* Optimized lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

      {/* Static connections */}
      <Connections positions={positions} />

      {/* Skill nodes */}
      {skillsWithPositions.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={skill.position}
          skill={skill}
          index={i}
          onClick={() => handleClick(skill)}
          isActive={activeSkill === skill.name}
        />
      ))}
    </>
  );
}

// ============================================
// LOADING FALLBACK
// ============================================
function LoadingFallback() {
  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#00f0ff] border-t-transparent animate-spin" />
        <p className="text-white/60">Loading 3D Galaxy...</p>
      </div>
    </div>
  );
}

// ============================================
// STATIC FALLBACK (for low-perf devices)
// ============================================
function StaticFallback({ onSkillClick }: SceneProps) {
  return (
    <div className="w-full h-[600px] relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#111]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 p-8 max-w-2xl">
          {portfolioData.skills.slice(0, 12).map((skill) => (
            <button
              key={skill.name}
              onClick={() => onSkillClick(skill)}
              className="p-4 rounded-xl glass border border-white/10 hover:border-[#00f0ff]/50 transition-all group"
            >
              <div
                className="w-12 h-12 mx-auto rounded-full mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <span className="text-lg" style={{ color: skill.color }}>
                  {skill.name.slice(0, 2)}
                </span>
              </div>
              <p className="text-xs text-white/60 text-center truncate">{skill.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00f0ff]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-[100px]" />
    </div>
  );
}

// ============================================
// MAIN EXPORT - with lazy loading
// ============================================
interface SkillGalaxyProps {
  onSkillClick: (skill: typeof portfolioData.skills[0]) => void;
}

export default function SkillGalaxy({ onSkillClick }: SkillGalaxyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      {
        threshold: 0.1,
        rootMargin: "100px"
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Check device capability
  useEffect(() => {
    if (!isVisible) return;

    const checkCapability = () => {
      try {
        // Check WebGL
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) {
          setHasError(true);
          return;
        }

        // Check for low-end device
        const cores = navigator.hardwareConcurrency || 4;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion || (isMobile && cores <= 4) || cores <= 2) {
          setHasError(true); // Use static fallback
          return;
        }

        setShouldRender3D(true);
      } catch (e) {
        setHasError(true);
      }
    };

    // Delay check to not block render
    const timer = setTimeout(checkCapability, 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Enhanced capability check
  useEffect(() => {
    if (!isVisible) return;

    const checkCapability = () => {
      try {
        // Check WebGL
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) {
          setHasError(true);
          return;
        }

        // Check for low-end device
        const cores = navigator.hardwareConcurrency || 4;
        // @ts-ignore
        const memory = navigator.deviceMemory || 8; // Default to 8 if not supported
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Aggressive fallback for better performance
        // If < 4GB RAM, or mobile with <= 4 cores, or reduced motion
        if (prefersReducedMotion || (isMobile && cores <= 6) || cores <= 4 || memory < 4) {
          setHasError(true); // Use static fallback
          return;
        }

        setShouldRender3D(true);
      } catch (e) {
        setHasError(true);
      }
    };

    checkCapability();
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-[600px]">
      {!isVisible && <LoadingFallback />}

      {isVisible && hasError && (
        <StaticFallback onSkillClick={onSkillClick} />
      )}

      {isVisible && shouldRender3D && (
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
            }}
            frameloop="demand" // Only render when needed
          >
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Scene onSkillClick={onSkillClick} />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
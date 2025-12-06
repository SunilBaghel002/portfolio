"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/lib/data";
import { AnimatedText, GlitchText } from "../animations/AnimatedText";
import { Button } from "../ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

function Name3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Center>
        <Text3D
          ref={meshRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={1}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {portfolioData.name.split(" ")[0]}
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.3}
            thickness={0.3}
            chromaticAberration={0.5}
            anisotropicBlur={0.5}
            distortion={hovered ? 0.5 : 0.2}
            distortionScale={0.5}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function FloatingSkillOrbs() {
  const skills = portfolioData.skills.slice(0, 6);
  
  return (
    <>
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={skill.name} speed={2 + i * 0.5} rotationIntensity={1}>
            <mesh position={[x, Math.sin(i) * 2, z]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}
    </>
  );
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
      <Name3D />
      <FloatingSkillOrbs />
    </Canvas>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Scene */}
      <div className="absolute inset-0 opacity-60">
        <Scene3D />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-neon/30"
        >
          <Sparkles className="w-4 h-4 text-accent-neon" />
          <span className="text-sm text-white/80">Available for work</span>
        </motion.div>

        {/* Main Heading */}
        <div className="mb-6">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <AnimatedText
              text={portfolioData.name}
              className="gradient-text"
              delay={0.5}
              type="chars"
              animation="reveal"
            />
          </motion.h1>
        </div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-8"
        >
          <GlitchText
            text={portfolioData.role}
            className="text-xl md:text-2xl text-white/80 font-light"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
        >
          {portfolioData.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="default" size="lg" magnetic>
            <Link href="/projects" className="flex items-center gap-2">
              View My Work
            </Link>
          </Button>
          <Button variant="outline" size="lg" magnetic>
            <Link href="/contact" className="flex items-center gap-2">
              Get in Touch
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-neon/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[128px]" />
    </section>
  );
}
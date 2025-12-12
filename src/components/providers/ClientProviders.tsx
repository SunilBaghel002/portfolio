"use client";

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Only load particle field after initial render and on desktop
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

// Simple cursor - only on desktop
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 1024);

    // Delay particle loading for better initial load
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Custom cursor - desktop only */}
      {isDesktop && <CustomCursor />}

      {/* Particles - delayed load, desktop only */}
      {isDesktop && showParticles && <ParticleField />}

      {children}
    </>
  );
}
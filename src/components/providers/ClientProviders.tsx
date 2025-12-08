"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import components that need client-side only rendering
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
    ssr: false,
    loading: () => (
        <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />
    ),
});

const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor"), {
    ssr: false,
});

interface ClientProvidersProps {
    children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <>
            {/* Custom cursor */}
            <CustomCursor />

            {/* 3D Particle background */}
            <ParticleField />

            {/* Children */}
            {children}
        </>
    );
}
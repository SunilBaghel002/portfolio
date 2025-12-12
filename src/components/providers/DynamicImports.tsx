"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Loading placeholder
const SectionLoader = () => (
    <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Loading...</p>
        </div>
    </div>
);

// Dynamic imports for heavy sections
export const DynamicProjects = dynamic(
    () => import("@/components/sections/Projects"),
    {
        loading: SectionLoader,
        ssr: true,
    }
);

export const DynamicSkillsPreview = dynamic(
    () => import("@/components/sections/SkillsPreview"),
    {
        loading: SectionLoader,
        ssr: true,
    }
);

export const DynamicFeaturedProjects = dynamic(
    () => import("@/components/sections/FeaturedProjects"),
    {
        loading: SectionLoader,
        ssr: true,
    }
);

export const DynamicAchievements = dynamic(
    () => import("@/components/sections/Achievements"),
    {
        loading: SectionLoader,
        ssr: true,
    }
);

export const DynamicCallToAction = dynamic(
    () => import("@/components/sections/CallToAction"),
    {
        loading: SectionLoader,
        ssr: true,
    }
);

// For Three.js components (definitely lazy load these)
export const DynamicParticleField = dynamic(
    () => import("@/components/three/ParticleField"),
    {
        loading: () => <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />,
        ssr: false,
    }
);

export const DynamicSkillGalaxy = dynamic(
    () => import("@/components/three/SkillGalaxy"),
    {
        loading: SectionLoader,
        ssr: false,
    }
);
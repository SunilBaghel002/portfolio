"use client";

import dynamic from "next/dynamic";

const LazySection = dynamic(
  () => import("@/components/providers/LazySection"),
  { ssr: false }
);

export const DynamicTrustBar = dynamic(
  () => import("@/components/sections/TrustBar"),
  { ssr: false }
);

export const DynamicAboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  { ssr: false }
);

export const DynamicJourneyTimeline = dynamic(
  () => import("@/components/sections/JourneyTimeline"),
  { ssr: false }
);

export const DynamicFeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects"),
  { ssr: false }
);

export const DynamicHackathonShowcase = dynamic(
  () => import("@/components/sections/HackathonShowcase"),
  { ssr: false }
);

export const DynamicSkillsNotebook = dynamic(
  () => import("@/components/sections/SkillsNotebook"),
  { ssr: false }
);

export const DynamicGitHubStats = dynamic(
  () => import("@/components/sections/GitHubStats"),
  { ssr: false }
);

export const DynamicContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false }
);

export { LazySection };
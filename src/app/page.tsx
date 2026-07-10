import Hero from "@/components/sections/Hero";
import LazySection from "@/components/providers/LazySection";
import {
  DynamicTrustBar,
  DynamicAboutSection,
  DynamicJourneyTimeline,
  DynamicFeaturedProjects,
  DynamicHackathonShowcase,
  DynamicSkillsNotebook,
  DynamicGitHubStats,
  DynamicContactSection,
} from "@/components/providers/DynamicImports";

export default function Home() {
  return (
    <>
      {/* 1. Hero — The Cover Page */}
      <Hero />

      {/* 2. Trust Bar — Featured Achievements */}
      <LazySection>
        <DynamicTrustBar />
      </LazySection>

      {/* 3. About — The Opening Chapter */}
      <LazySection>
        <DynamicAboutSection />
      </LazySection>

      {/* 4. Journey — The Chapters */}
      <LazySection>
        <DynamicJourneyTimeline />
      </LazySection>

      {/* 5. Projects — Selected Works */}
      <LazySection>
        <DynamicFeaturedProjects />
      </LazySection>

      {/* 6. Hackathons — The Trophies */}
      <LazySection>
        <DynamicHackathonShowcase />
      </LazySection>

      {/* 7. Skills — The Toolkit */}
      <LazySection>
        <DynamicSkillsNotebook />
      </LazySection>

      {/* 8. GitHub — Proof of Work */}
      <LazySection>
        <DynamicGitHubStats />
      </LazySection>

      {/* 9. Contact — Let's Talk */}
      <LazySection>
        <DynamicContactSection />
      </LazySection>
    </>
  );
}
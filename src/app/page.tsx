import Hero from "@/components/sections/Hero";
import LazySection from "@/components/providers/LazySection";
import {
  DynamicFeaturedProjects,
  DynamicSkillsPreview,
  DynamicCallToAction,
} from "@/components/providers/DynamicImports";

export default function Home() {
  return (
    <>
      {/* Hero loads immediately - it's above the fold */}
      <Hero />

      {/* Other sections lazy load as user scrolls */}
      <LazySection>
        <DynamicFeaturedProjects />
      </LazySection>

      <LazySection>
        <DynamicSkillsPreview />
      </LazySection>

      <LazySection>
        <DynamicCallToAction />
      </LazySection>
    </>
  );
}
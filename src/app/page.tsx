import Hero from "@/components/sections/Hero";
import MetricsBar from "@/components/sections/MetricsBar";
import LazySection from "@/components/providers/LazySection";
import {
  DynamicFeaturedProjects,
  DynamicServices,
  DynamicProcess,
  DynamicAboutSection,
  DynamicTestimonials,
  DynamicContactSection,
  DynamicSkillsPreview,
  DynamicCallToAction,
} from "@/components/providers/DynamicImports";

export default function Home() {
  return (
    <>
      {/* Hero loads immediately - it's above the fold */}
      <Hero />

      {/* Metrics Bar - Credibility strip */}
      <MetricsBar />

      {/* Featured Projects - Portfolio showcase */}
      <LazySection>
        <DynamicFeaturedProjects />
      </LazySection>

      {/* Services - What I Build */}
      <LazySection>
        <DynamicServices />
      </LazySection>

      {/* Process - How I Work */}
      <LazySection>
        <DynamicProcess />
      </LazySection>

      {/* About - Core Profile */}
      <LazySection>
        <DynamicAboutSection />
      </LazySection>

      {/* Testimonials - Client Feedback */}
      <LazySection>
        <DynamicTestimonials />
      </LazySection>

      {/* Contact - Lead Generation Form */}
      <LazySection>
        <DynamicContactSection />
      </LazySection>
    </>
  );
}
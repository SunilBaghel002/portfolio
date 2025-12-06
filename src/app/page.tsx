import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsPreview from "@/components/sections/SkillsPreview";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <CallToAction />
    </>
  );
}
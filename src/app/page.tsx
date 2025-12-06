import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsPreview from "@/components/sections/SkillsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <Testimonials />
      <CallToAction />
    </>
  );
}
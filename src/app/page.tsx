import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import SkillsPreview from "../components/sections/SkillsPreview";
import CallToAction from "../components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <SkillsPreview />
      <CallToAction />
    </>
  );
}
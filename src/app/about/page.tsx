"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/lib/data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { AnimatedHeading } from "@/components/animations/AnimatedText";
import { SkillConstellation, TechBadge } from "@/components/ui/TechIcon";
import {
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaCamera,
  FaMusic,
  FaPlane,
  FaGamepad,
  FaMugHot
} from "react-icons/fa6";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import GitHubStats from "@/components/sections/GitHubStats";
import JourneySection from "@/components/sections/JourneySection";

const timeline = [
  {
    year: "2025",
    title: "Co-Founder",
    company: "Forgeweb Agency",
    description: "Co-founded a design-focused web agency shipping premium, high-speed digital products for global businesses.",
    icon: FaBriefcase,
    technologies: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    year: "2025",
    title: "Full Stack Developer Intern",
    company: "OneTick Technologies Pvt. Ltd.",
    description: "Built scalable systems with Next.js and Node.js. Developed real-time seat allocation algorithms and optimized backend database indexes.",
    icon: FaBriefcase,
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    year: "2025",
    title: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    description: "Contributed features and resolved styling bugs across multiple open-source repositories.",
    icon: FaCode,
    technologies: ["React", "JavaScript", "CSS"],
  },
  {
    year: "2022",
    title: "Computer Science Student",
    company: "J.C. Bose UST, YMCA",
    description: "Began Bachelor of Technology (B.Tech) in Computer Science, focusing on system architecture and web engineering.",
    icon: FaGraduationCap,
    technologies: ["Python", "C", "Data Structures"],
  },
];

const interests = [
  { name: "Open Source", icon: FaCode, color: "#F97316" },
  { name: "Photography", icon: FaCamera, color: "#FEF3C7" },
  { name: "Music Production", icon: FaMusic, color: "#F97316" },
  { name: "Travel", icon: FaPlane, color: "#FEF3C7" },
  { name: "Gaming", icon: FaGamepad, color: "#F97316" },
  { name: "Coffee", icon: FaMugHot, color: "#FEF3C7" },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <ScrollReveal
      direction={isLeft ? "left" : "right"}
      delay={index * 0.1}
      className="relative"
    >
      <div
        className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"
          }`}
      >
        {/* Content */}
        <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
          <motion.div
            className="glass p-6 rounded-2xl inline-block text-left"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <span className="text-[#F97316] text-sm font-mono font-semibold">{item.year}</span>
            <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
            <p className="text-[#FEF3C7] text-sm mt-1">{item.company}</p>
            <p className="text-white/60 text-sm mt-2">{item.description}</p>

            {/* Tech badges */}
            <div
              className={`flex flex-wrap gap-2 mt-4 ${isLeft ? "justify-end" : "justify-start"
                }`}
            >
              {item.technologies.map((tech) => {
                const skill = portfolioData.skills.find(
                  (s) => s.name.toLowerCase() === tech.toLowerCase()
                );
                return (
                  <TechBadge
                    key={tech}
                    name={tech}
                    color={skill?.color || "#F97316"}
                    variant="glow"
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Center Icon */}
        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#FEF3C7] flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-black" />
          </motion.div>
        </div>

        {/* Empty space for alignment */}
        <div className="flex-1" />
      </div>
    </ScrollReveal>
  );
}

function QuickFacts() {
  const [coffees, setCoffees] = useState(3);
  const [editor, setEditor] = useState("VS Code");
  const [book, setBook] = useState("Designing Data-Intensive Applications");
  const [music, setMusic] = useState("Synthwave / Lofi");

  const randomize = () => {
    const coffeeOptions = [2, 3, 4, 5, 6, 7];
    const editorOptions = ["VS Code", "Cursor", "Vim", "Sublime Text"];
    const bookOptions = [
      "Designing Data-Intensive Applications (Martin Kleppmann)",
      "Clean Code (Robert C. Martin)",
      "Understanding Distributed Systems (Roberto Vitillo)",
      "Refactoring (Martin Fowler)",
      "System Design Interview (Alex Xu)"
    ];
    const musicOptions = ["Lofi Beats", "Synthwave", "Post-Rock", "Math Rock", "Ambient Techno", "Jazz Fusion"];

    setCoffees(coffeeOptions[Math.floor(Math.random() * coffeeOptions.length)]);
    setEditor(editorOptions[Math.floor(Math.random() * editorOptions.length)]);
    setBook(bookOptions[Math.floor(Math.random() * bookOptions.length)]);
    setMusic(musicOptions[Math.floor(Math.random() * musicOptions.length)]);
  };

  useEffect(() => {
    randomize();
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-[40px] pointer-events-none" />
      <h3 className="text-sm font-mono uppercase tracking-wider text-white/50 mb-4 flex justify-between items-center">
        <span>Quick facts about me</span>
        <button 
          onClick={randomize} 
          className="text-xs text-[#F97316] hover:text-[#FEF3C7] transition-colors font-semibold flex items-center gap-1 group/btn"
        >
          <svg className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
          </svg>
          Refresh
        </button>
      </h3>
      <ul className="space-y-3.5 text-sm font-sans text-white/80">
        <li className="flex justify-between items-baseline gap-4">
          <span className="text-white/40 font-mono text-xs uppercase">Coffee count today</span>
          <span className="font-semibold text-white">{coffees} cups</span>
        </li>
        <li className="flex justify-between items-baseline gap-4">
          <span className="text-white/40 font-mono text-xs uppercase">Favorite editor</span>
          <span className="font-semibold text-[#FEF3C7]">{editor}</span>
        </li>
        <li className="flex justify-between items-baseline gap-4">
          <span className="text-white/40 font-mono text-xs uppercase">First language</span>
          <span className="font-semibold text-white">Python</span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="text-white/40 font-mono text-xs uppercase">Currently reading</span>
          <span className="font-semibold text-white text-xs leading-snug">{book}</span>
        </li>
        <li className="flex justify-between items-baseline gap-4">
          <span className="text-white/40 font-mono text-xs uppercase">Coding music</span>
          <span className="font-semibold text-white">{music}</span>
        </li>
      </ul>
    </div>
  );
}

function HandwrittenSignature() {
  return (
    <div className="flex flex-col items-start gap-1">
      <svg 
        viewBox="0 0 200 65" 
        className="w-44 h-14 text-[#F97316] opacity-80" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M20,48 C35,28 30,12 40,24 C50,36 45,46 55,42 C65,38 60,25 70,30 C80,35 75,45 85,42 C95,39 90,20 100,28 C110,36 105,48 115,40 C125,32 120,18 132,24 C144,30 135,46 150,35 C165,24 160,18 175,44" />
      </svg>
      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest pl-2">Sunil Baghel</span>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 bg-black text-white">
      {/* Background Orbs */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#F97316]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FEF3C7]/20 rounded-full blur-[150px]" />
      </motion.div>

      {/* Main Two-Column Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column (60% / 7 cols) - The Essay */}
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal>
                <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em]">
                  ABOUT
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight leading-none text-white">
                  I build things <br />
                  for the web.
                </h1>
              </ScrollReveal>

              {/* Essay Content */}
              <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed font-sans pr-0 md:pr-4">
                <ScrollReveal delay={0.2}>
                  <p>
                    Hey, I&apos;m Sunil.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.25}>
                  <p>
                    I&apos;m a final-year Computer Science student who fell in love with building things people actually use.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <p>
                    It started with tutorials, moved to freelance gigs, and eventually led me to co-found Forgeweb — a small web development agency where we ship websites for businesses that care about design.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.35}>
                  <p>
                    Right now, my main focus is PayDeskNow — a fintech platform I&apos;m building to help rural retailers in India offer banking services to their communities. It&apos;s the kind of project where the tech actually matters because real people depend on it working.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                  <p>
                    When I&apos;m not shipping features, I&apos;m probably reading about system design, contributing to open source, or convincing myself that just one more side project won&apos;t hurt.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.45}>
                  <p>
                    I care about clean code, thoughtful design, and building products that don&apos;t waste people&apos;s time.
                  </p>
                </ScrollReveal>
              </div>

              {/* Lists Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <ScrollReveal delay={0.5}>
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#F97316] font-bold">Currently</h4>
                    <ul className="space-y-2.5 text-sm text-white/60">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7]" />
                        🎓 Final year CSE at J.C. Bose UST, YMCA
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7]" />
                        💼 Co-Founder @ Forgeweb
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7]" />
                        🚀 Building PayDeskNow
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7]" />
                        📍 Based in India
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7]" />
                        📖 Learning System Design
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.55}>
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#FEF3C7] font-bold">Available For</h4>
                    <ul className="space-y-2.5 text-sm text-white/60">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                        💼 Full-time opportunities
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                        🚀 Freelance projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                        🤝 Interesting collaborations
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Column (40% / 5 cols) - Visual & Facts */}
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
              
              {/* Profile Image with Color Shift Hover */}
              <ScrollReveal direction="right">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#F97316]/10 rounded-3xl blur-xl pointer-events-none group-hover:bg-[#F97316]/20 transition-all duration-700" />
                  <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                      alt={portfolioData.name}
                      fill
                      className="object-cover transition-all duration-700 grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                </div>
              </ScrollReveal>

              {/* Quick Facts Card */}
              <ScrollReveal delay={0.2} direction="right">
                <QuickFacts />
              </ScrollReveal>

              {/* Monogram Signature */}
              <ScrollReveal delay={0.3} direction="right">
                <div className="flex justify-end pr-4">
                  <HandwrittenSignature />
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* Journey Section - Hackathon Wins */}
      <JourneySection />

      {/* GitHub Live Stats Section */}
      <GitHubStats />

      {/* Timeline Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
                Journey
              </span>
            </ScrollReveal>
            <AnimatedHeading>My Story</AnimatedHeading>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316] via-[#FEF3C7] to-transparent" />

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Constellation */}
      <section className="py-24 relative overflow-hidden border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
                  Expertise
                </span>
              </ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-white mb-6">
                Skill Constellation
              </h2>
              <ScrollReveal delay={0.2}>
                <p className="text-white/60 leading-relaxed font-sans">
                  My skills form an interconnected ecosystem, each one enhancing
                  the others to create comprehensive solutions. Hover over the
                  nodes to explore.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <SkillConstellation skills={portfolioData.skills.slice(0, 8)} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
                Beyond Code
              </span>
            </ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-white">
              Interests & Hobbies
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {interests.map((interest) => (
              <StaggerItem key={interest.name}>
                <motion.div
                  className="group relative p-6 rounded-2xl glass overflow-hidden cursor-none"
                  whileHover={{ y: -10, rotateX: 10, rotateY: 10 }}
                  style={{ perspective: 1000 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at center, ${interest.color}, transparent 70%)` }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                      style={{
                        background: `linear-gradient(135deg, ${interest.color}20, ${interest.color}05)`,
                        border: `1px solid ${interest.color}40`,
                        boxShadow: `0 0 20px ${interest.color}20`
                      }}
                    >
                      <interest.icon className="w-8 h-8" style={{ color: interest.color }} />
                    </div>
                    <span className="text-white/80 font-medium group-hover:text-white transition-colors">
                      {interest.name}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
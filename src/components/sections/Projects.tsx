"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/lib/data";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { TechBadge } from "../ui/TechIcon";
import { Button } from "../ui/button";
import { Card3D, SpotlightCard, GradientBorderCard } from "../ui/card";
import { ParallaxWrapper, ZoomOnScroll } from "../animations/ParallaxWrapper";
import { ExternalLink, Github, Play, ArrowRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "React", "Node.js", "MongoDB", "Full Stack"];

interface ProjectCardProps {
  project: (typeof portfolioData.projects)[0];
  index: number;
  onSelect: () => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-12, 12]);
  const brightness = useTransform(
    [xSpring, ySpring],
    ([x, y]: number[]) => 1 + (x + y) * 0.1
  );

  // Shine effect position
  const shineX = useTransform(xSpring, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(ySpring, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const getHeight = () => {
    const heights = ["h-[420px]", "h-[380px]", "h-[450px]", "h-[400px]", "h-[430px]"];
    return heights[index % heights.length];
  };

  const getTagColor = (tagName: string) => {
    const skill = portfolioData.skills.find(
      (s) => s.name.toLowerCase() === tagName.toLowerCase()
    );
    return skill?.color || "#00f0ff";
  };

  return (
    <ParallaxWrapper
      speed={0.1 * ((index % 3) + 1)}
      direction={index % 2 === 0 ? "up" : "down"}
      className="masonry-item"
    >
      <motion.div
        ref={cardRef}
        className={cn("relative group", getHeight())}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
          rotateX,
          rotateY,
        }}
        whileHover={{ z: 50 }}
        data-cursor="view"
        data-cursor-text="View"
      >
        {/* Card with gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden"
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${getTagColor(project.tags[0])}60, transparent, ${getTagColor(project.tags[1] || project.tags[0])}60)`
              : "linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05))",
          }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-full w-full rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl overflow-hidden">
            {/* Shine effect */}
            <motion.div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                background: useTransform(
                  [shineX, shineY],
                  ([x, y]: number[]) =>
                    `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15), transparent 50%)`
                ),
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* Background Image/Gradient */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${getTagColor(project.tags[0])}20, transparent, ${getTagColor(project.tags[1] || project.tags[0])}15)`,
                }}
              />
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col justify-between">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                {/* Year */}
                <motion.span
                  className="text-sm font-mono px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/10"
                  animate={{ borderColor: isHovered ? "rgba(0,240,255,0.3)" : "rgba(255,255,255,0.1)" }}
                >
                  {project.year}
                </motion.span>

                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00f0ff]/20 to-[#a855f7]/20 border border-[#00f0ff]/30"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs font-medium text-[#00f0ff]">Featured</span>
                  </motion.div>
                )}
              </div>

              {/* Bottom Section */}
              <div className="space-y-4">
                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.tags.slice(0, 4).map((tag) => (
                    <TechBadge
                      key={tag}
                      name={tag}
                      color={getTagColor(tag)}
                      variant={isHovered ? "glow" : "default"}
                    />
                  ))}
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-2xl font-bold text-white transition-colors duration-300"
                  animate={{ color: isHovered ? "#00f0ff" : "#ffffff" }}
                >
                  {project.title}
                </motion.h3>

                {/* Description */}
                <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Actions */}
                <motion.div
                  className="flex items-center gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.github && (
                    <Button
                      variant="glass"
                      size="sm"
                      leftIcon={<Github className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                      magnetic
                    >
                      Code
                    </Button>
                  )}
                  {project.link && (
                    <Button
                      variant="neon"
                      size="sm"
                      leftIcon={<ExternalLink className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.link, '_blank');
                      }}
                      magnetic
                    >
                      Live
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="iconSm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect();
                    }}
                    magnetic
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ParallaxWrapper>
  );
}

// Project Modal
function ProjectModal({
  project,
  onClose
}: {
  project: (typeof portfolioData.projects)[0];
  onClose: () => void;
}) {
  const getTagColor = (tagName: string) => {
    const skill = portfolioData.skills.find(
      (s) => s.name.toLowerCase() === tagName.toLowerCase()
    );
    return skill?.color || "#00f0ff";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-strong"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${getTagColor(project.tags[0])}30, transparent, ${getTagColor(project.tags[1] || project.tags[0])}20)`,
            }}
          />
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          {/* Project Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <TechBadge
                  key={tag}
                  name={tag}
                  color={getTagColor(tag)}
                  variant="glow"
                />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">{project.title}</h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Year and Featured */}
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm font-mono border border-white/10">
              {project.year}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-sm border border-[#00f0ff]/30">
                ⭐ Featured Project
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">About this project</h3>
            <p className="text-white/70 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.github && (
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Github className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => window.open(project.github, '_blank')}
                magnetic
                shine
              >
                View Source Code
              </Button>
            )}
            {project.link && (
              <Button
                variant="gradient"
                size="lg"
                leftIcon={<ExternalLink className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => window.open(project.link, '_blank')}
                magnetic
                glowOnHover
              >
                Visit Live Site
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(portfolioData.projects);
    } else {
      setFilteredProjects(
        portfolioData.projects.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(category.toLowerCase()))
        )
      );
    }
  };

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#00f0ff]/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header with Parallax */}
        <ZoomOnScroll startScale={0.9} endScale={1}>
          <div className="text-center mb-20">
            <ScrollReveal>
              <motion.span
                className="inline-block text-[#00f0ff] text-sm font-medium uppercase tracking-[0.2em] mb-4 px-4 py-2 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5"
                whileHover={{ scale: 1.05 }}
              >
                Portfolio
              </motion.span>
            </ScrollReveal>
            <AnimatedHeading>Selected Works</AnimatedHeading>
            <ScrollReveal delay={0.2}>
              <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
                A curated collection of projects that showcase my expertise in building
                modern, performant, and visually stunning applications.
              </p>
            </ScrollReveal>
          </div>
        </ZoomOnScroll>

        {/* Filter Buttons */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Button
                  variant={activeCategory === category ? "gradient" : "glass"}
                  size="default"
                  onClick={() => handleFilter(category)}
                  magnetic
                  magneticStrength={0.2}
                  className="rounded-full"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div
          className="masonry-grid"
          layout
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              magnetic
              shine
              onClick={() => window.open('https://github.com/SunilBaghel002', '_blank')}
            >
              View All on GitHub
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
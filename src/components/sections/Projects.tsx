"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/lib/data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { Card3D } from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, Github, Play, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Frontend", "Backend", "Full Stack", "3D"];

interface ProjectCardProps {
  project: typeof portfolioData.projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);

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
    const heights = ["h-[400px]", "h-[350px]", "h-[450px]", "h-[380px]", "h-[420px]"];
    return heights[index % heights.length];
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("masonry-item perspective-1000", getHeight())}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
    >
      <div className="relative h-full rounded-2xl overflow-hidden glass group cursor-pointer">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-neon/20 to-accent-purple/20" />
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Video Preview on Hover */}
        {project.video && isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </motion.div>
        )}

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-md bg-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-neon transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Actions */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.video && (
              <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">
                <Play className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-neon/20 text-accent-neon border border-accent-neon/30">
              Featured
            </span>
          </div>
        )}

        {/* Year */}
        <div className="absolute top-4 left-4">
          <span className="text-sm font-mono text-white/40">{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(portfolioData.projects);
    } else {
      // Filter based on tags
      setFilteredProjects(
        portfolioData.projects.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(category.toLowerCase()))
        )
      );
    }
  };

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-accent-neon text-sm font-medium uppercase tracking-wider mb-4 block">
              Portfolio
            </span>
          </ScrollReveal>
          <AnimatedHeading>Selected Works</AnimatedHeading>
          <ScrollReveal delay={0.2}>
            <p className="text-white/60 max-w-2xl mx-auto mt-6">
              A collection of projects that showcase my expertise in building
              modern, performant, and visually stunning applications.
            </p>
          </ScrollReveal>
        </div>

        {/* Filter */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => handleFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <motion.div
          className="masonry-grid"
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-[128px] pointer-events-none" />
    </section>
  );
}
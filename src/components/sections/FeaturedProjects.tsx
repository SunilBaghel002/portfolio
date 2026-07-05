"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import { ScrollReveal } from "../animations/ScrollReveal";
import { ArrowUpRight, Github, X, CheckCircle, ExternalLink, Calendar, Layers, Cpu } from "lucide-react";

/* ── Word Reveal ── */
function WordReveal({ text }: { text: string }) {
  return (
    <span>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1.5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.3, delay: i * 0.01, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── 3D Tilt Image ── */
function ProjectImage({
  src,
  title,
  onClick,
}: {
  src: string;
  title: string;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor="project"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-950 border border-white/10 group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/10 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width:1024px) 100vw, 45vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
      
      {/* View Case Study Badge on Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <span className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}

/* ── Case Study Drawer Slide-Over ── */
function CaseStudyDrawer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Map user-friendly category/client outcome based on project name
  const outcomesMap: Record<string, string> = {
    "PayDeskNow": "Enables retailers across India to serve underbanked communities.",
    "FlashBill": "Restaurants save hours daily on manual billing and order management.",
    "Hello Pizza Cafe": "Automated customer engagement at scale, reducing manual marketing effort by 90%.",
    "Mobitel": "Enabled a new service delivery model with seamless online-to-offline experience.",
    "Proton SMS": "Digitized entire institute operations, replacing multiple disconnected systems with one unified platform."
  };

  const categoryMap: Record<string, string> = {
    "PayDeskNow": "FINTECH PLATFORM",
    "FlashBill": "POS SOFTWARE",
    "Hello Pizza Cafe": "MARKETING AUTOMATION + WEBSITE",
    "Mobitel": "QUICK COMMERCE PLATFORM",
    "Proton SMS": "SAAS PLATFORM"
  };

  const outcomeText = outcomesMap[project.name] || "Delivered production-grade custom software with verified business results.";
  const displayCategory = categoryMap[project.name] || project.type.toUpperCase();

  // Mocked details to make the case study look extremely professional
  const overviewMap: Record<string, string> = {
    "PayDeskNow": "A robust financial system designed to bridge the digital gap in rural India. The application features micro-banking terminal integration allowing merchants to execute instant cash outs, DMT logs, and dynamic commission cuts directly from the POS interface.",
    "FlashBill": "A custom cross-platform POS application engineered for restaurants. Built to address the pain of connectivity loss, it keeps full billing logs, menu edits, and receipt queues offline, syncing back to the cloud database when connections resume.",
    "Hello Pizza Cafe": "A high-conversion customer website paired with a custom marketing and ordering engine. Combines Facebook/WhatsApp Graph APIs to orchestrate cohort-based promotional campaigns and parse incoming pizza orders automatically.",
    "Mobitel": "An on-demand service portal coordinating mobile repairs. Integrates Razorpay checkouts, automated tech routing sheets, and live SMS updates to create a seamless doorstep service logistics experience.",
    "Proton SMS": "An educational institution ERP designed to replace paper trails. Facilitates grade bookings, attendance monitoring, fee reconciliation, and triggers instant WhatsApp reports directly to parents' phones."
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Drawer Body */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl h-full bg-[#111111] border-l border-white/10 shadow-2xl z-10 flex flex-col"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#F97316] font-bold uppercase">
              {displayCategory}
            </span>
            <h3 className="text-2xl font-serif text-white mt-1">{project.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
          
          {/* Main Visual Image */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg bg-zinc-900">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              loading="lazy"
            />
          </div>

          {/* Quick Metrics grid */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">Scope</span>
              <span className="text-xs font-semibold text-white/80">{project.type}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">Timeline</span>
              <span className="text-xs font-semibold text-white/80 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-white/30" />
                {project.year}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">Code Quality</span>
              <span className="text-xs font-semibold text-[#F97316] flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#F97316]/40" />
                {project.commits || "Production"}
              </span>
            </div>
          </div>

          {/* Client Outcome Highlight (Orange accent block) */}
          <div className="p-5 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/20">
            <h4 className="text-xs font-mono font-bold text-[#F97316] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              Client Outcome &amp; Impact
            </h4>
            <p className="text-base text-white/90 font-serif italic">
              &ldquo;{outcomeText}&rdquo;
            </p>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
              Overview
            </h4>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              {overviewMap[project.name] || project.description}
            </p>
          </div>

          {/* Core Features Delivered */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
              Core Features Delivered
            </h4>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.highlights.map((h, i) => (
                <li 
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.01] border border-white/[0.04] text-xs text-white/80"
                >
                  <span className="text-sm mt-0.5">{h.icon}</span>
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Implementation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs font-mono text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-zinc-950 flex items-center justify-end gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F97316] text-black font-semibold text-xs hover:bg-[#FEF3C7] transition-all"
            >
              Visit Live Site <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={() => {
                onClose();
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Inquire About Project
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Showcase Section ── */
export default function FeaturedProjects() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Filter only the 5 production-grade client projects
  const clientProjects = projects.filter((p) => p.category === "client");

  const outcomesMap: Record<string, string> = {
    "PayDeskNow": "Enables retailers across India to serve underbanked communities.",
    "FlashBill": "Restaurants save hours daily on manual billing and order management.",
    "Hello Pizza Cafe": "Automated customer engagement at scale, reducing manual marketing effort by 90%.",
    "Mobitel": "Enabled a new service delivery model with seamless online-to-offline experience.",
    "Proton SMS": "Digitized entire institute operations, replacing multiple disconnected systems with one unified platform."
  };

  const categoryMap: Record<string, string> = {
    "PayDeskNow": "FINTECH PLATFORM",
    "FlashBill": "POS SOFTWARE",
    "Hello Pizza Cafe": "MARKETING AUTOMATION + WEBSITE",
    "Mobitel": "QUICK COMMERCE PLATFORM",
    "Proton SMS": "SAAS PLATFORM"
  };

  return (
    <section id="work" className="py-24 md:py-32 relative bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-20 text-left md:max-w-xl">
          <ScrollReveal>
            <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
              Selected Work
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white mb-4">
              Real projects. <br />
              Real clients. Real results.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base text-white/50 leading-relaxed">
              Curated case studies of production software systems deployed for business operations.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Rows */}
        <div className="space-y-24 md:space-y-32">
          {clientProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const displayCategory = categoryMap[project.name] || project.type.toUpperCase();
            const outcomeText = outcomesMap[project.name] || "";

            return (
              <div key={project.id} className="relative">
                {index > 0 && <div className="w-full h-px bg-white/10 mb-20 md:mb-32" />}

                <div
                  className={`flex flex-col gap-12 lg:gap-20 items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content (55% width) */}
                  <div className="w-full lg:w-[55%] flex flex-col justify-center">
                    
                    {/* Outlined Project Number & Category Tag */}
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      <span 
                        className="font-serif text-7xl md:text-8xl font-light leading-none select-none"
                        style={{
                          WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                          color: "transparent"
                        }}
                      >
                        {project.number}
                      </span>

                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-mono tracking-widest text-[#F97316] font-bold uppercase">
                          / {displayCategory}
                        </span>
                        {project.isFlagship && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-gradient-to-r from-[#F97316] to-[#FEF3C7] text-black uppercase font-bold">
                            ⭐ Flagship
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-4">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-sans mb-6">
                      <WordReveal text={project.description} />
                    </p>

                    {/* Client Outcome Highlight (Orange block) */}
                    {outcomeText && (
                      <div className="mb-6 p-4 rounded-xl bg-[#F97316]/5 border border-[#F97316]/20 flex items-start gap-2.5 text-sm">
                        <span className="text-base mt-0.5">🎯</span>
                        <span className="text-white/90">
                          <strong>Outcome:</strong> {outcomeText}
                        </span>
                      </div>
                    )}

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-white/50 bg-white/[0.04] border border-white/[0.06] px-3.5 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => setSelectedCaseStudy(project)}
                        className="group text-sm font-semibold flex items-center gap-1.5 text-[#F97316] hover:text-[#FEF3C7] transition-colors cursor-pointer"
                      >
                        View Case Study
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>

                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-sm font-semibold flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                        >
                          Live Site
                        </a>
                      )}
                    </div>

                  </div>

                  {/* Image (45% width) */}
                  <div className="w-full lg:w-[45%]">
                    <ProjectImage
                      src={project.image}
                      title={project.name}
                      onClick={() => setSelectedCaseStudy(project)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Slide-Over Drawer */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <CaseStudyDrawer
            project={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
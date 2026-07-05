"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ScrollReveal } from "../animations/ScrollReveal";
import { ArrowUpRight, Github } from "lucide-react";

/* ── Word reveal ── */
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

/* ── 3-D tilt image ── */
function ProjectImage({
  src,
  title,
  link,
}: {
  src: string;
  title: string;
  link?: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8]);

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

  const inner = (
    <motion.div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
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
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
    </motion.div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
      {inner}
    </a>
  ) : (
    inner
  );
}

/* ── Main component ── */
export default function Projects() {
  const [filter, setFilter] = useState<"all" | "client" | "hardware">("all");

  const clientCount = projects.filter((p) => p.category === "client").length;
  const hwCount = projects.filter((p) => p.category === "hardware").length;

  const filtered = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  const tabs: { key: "all" | "client" | "hardware"; label: string; count: number }[] = [
    { key: "all", label: "All", count: projects.length },
    { key: "client", label: "Client Work", count: clientCount },
    { key: "hardware", label: "Hardware / Innovation", count: hwCount },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="md:max-w-2xl">
            <ScrollReveal>
              <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
                Case Studies
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-white mb-6">
                Selected Works
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/50 leading-relaxed">
                Production systems shipped for real clients through Forgeweb, plus hardware innovation that won national hackathons.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 bg-white/[0.02] p-1.5 rounded-full border border-white/10 w-fit">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-5 py-2 text-xs font-mono rounded-full transition-all duration-300 ${
                    filter === t.key
                      ? "bg-[#F97316] text-black font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Project rows ── */}
        <motion.div layout className="space-y-24 md:space-y-32">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {index > 0 && <div className="w-full h-px bg-white/10 mb-20 md:mb-32" />}

                  <div
                    className={`flex flex-col gap-12 lg:gap-20 items-center ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className="w-full lg:w-[55%] flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <span
                          className="font-serif text-7xl md:text-8xl font-light leading-none select-none"
                          style={{
                            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                            color: "transparent",
                          }}
                        >
                          {project.number}
                        </span>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[10px] font-mono tracking-widest text-[#F97316] font-bold uppercase">
                            / {project.type}
                          </span>
                          {project.category === "client" && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30 uppercase font-bold">
                              Client Work
                            </span>
                          )}
                          {project.category === "hardware" && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 uppercase font-bold">
                              Innovation
                            </span>
                          )}
                          {project.isFlagship && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-gradient-to-r from-[#F97316] to-[#FEF3C7] text-black uppercase font-bold">
                              ⭐ Flagship
                            </span>
                          )}
                        </div>
                      </div>

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-2">
                        {project.name}
                      </h2>
                      <p className="text-[#FEF3C7] text-sm md:text-base font-mono font-medium mb-4 italic">
                        &ldquo;{project.tagline}&rdquo;
                      </p>
                      <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
                        <WordReveal text={project.description} />
                      </p>

                      <div className="mb-6 space-y-1.5">
                        {project.highlights.map((h) => (
                          <div key={h.text} className="flex items-center gap-2 text-sm text-white/80">
                            <span>{h.icon}</span>
                            <span>{h.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2.5 mb-8">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs text-white/50 bg-white/[0.04] border border-white/[0.06] px-3.5 py-1.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-sm font-semibold flex items-center gap-1.5 text-[#F97316] hover:text-[#FEF3C7] transition-colors"
                          >
                            View Live
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-sm font-semibold flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="w-full lg:w-[45%]">
                      <ProjectImage
                        src={project.image}
                        title={project.name}
                        link={project.links.live || project.links.github}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-32 pt-16 border-t border-white/10 text-center">
          <p className="text-white/40 mb-4 text-sm">
            Interested in working together?
          </p>
          <a
            href="mailto:sunilbaghel93100@gmail.com"
            className="inline-flex items-center gap-2 group text-xl font-serif italic text-[#F97316] hover:text-[#FEF3C7] transition-colors"
          >
            Reach out via email
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
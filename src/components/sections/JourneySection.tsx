"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { hackathons, hackathonStats, Hackathon } from "@/data/hackathons";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../animations/ScrollReveal";
import {
  Trophy,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ── CountUp ── */
function CountUp({
  end,
  duration = 1.5,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const totalFrames = 60 * duration;
    const increment = end / totalFrames;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Gallery photos ── */
const galleryPhotos = [
  { src: "/personal/hackathon-winning.jpg", caption: "First national win — Sharda University, Noida" },
  { src: "/personal/winning2.jpg", caption: "Smart Power presentation at NexHack, Panipat" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", caption: "Late-night build sessions under deadline pressure" },
  { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop", caption: "Team collaboration at IIT Delhi Tryst" },
  { src: "/personal/hackathon-winning.jpg", caption: "Trophy presentation at DGIM College" },
  { src: "/personal/winning2.jpg", caption: "Smart Power hardware demo" },
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", caption: "Building through the night at J.C. Bose University" },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", caption: "Final jury presentation round" },
];

/* ── Smart Power wins ── */
const smartPowerWins = [
  "NexHack 2025 — Geeta University, Panipat (🥇 National)",
  "Internal SIH 2025 — Aravali College",
  "DGIM Hackathon 2025",
  "Manav Rachna Tech Fest (2 wins)",
  "VisionX 2026 — J.C. Bose University",
];

export default function JourneySection() {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((i) => (i !== null && i < galleryPhotos.length - 1 ? i + 1 : 0));
  };
  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : galleryPhotos.length - 1));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null && !selectedHackathon) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setSelectedHackathon(null);
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, selectedHackathon]);

  /* ── Find featured hackathons ── */
  const featured1 = hackathons.find((h) => h.id === "sharda-2025")!;
  const featured2 = hackathons.find((h) => h.id === "nexhack-2025")!;

  return (
    <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FFD700]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ════════════ Header ════════════ */}
        <div className="mb-20 md:max-w-3xl">
          <ScrollReveal>
            <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
              THE JOURNEY
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-white mb-6 leading-[1.15]">
              15 hackathons.
              <br />
              8 wins.
              <br />
              2 national titles.
              <br />
              One obsession.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-mono">
              Building under pressure taught me more than any course. Here&apos;s how it went.
            </p>
          </ScrollReveal>
        </div>

        {/* ════════════ Stats Bar ════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { value: hackathonStats.totalParticipated, suffix: "+", label: "Hackathons", color: "text-white" },
            { value: hackathonStats.totalWins, suffix: "", label: "Wins", color: "text-white" },
            { value: hackathonStats.nationalWins, suffix: "", label: "National Wins", color: "text-[#FFD700]" },
            { value: 80, suffix: "K+", label: "Prize Money", color: "text-[#FEF3C7]", prefix: "₹" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center group hover:border-[#F97316]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className={`text-5xl md:text-6xl font-serif font-semibold ${stat.color} block mb-2`}>
                <CountUp end={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} />
              </span>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ════════════ Featured Win #1: The Origin Story ════════════ */}
        <div className="mb-24 md:mb-32">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Text */}
            <div className="lg:w-[60%]">
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 mb-6">
                  🥇 First National Win · First Hackathon Ever
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                  Sharda University, January&nbsp;2025.
                  <br />
                  <span className="text-white/60">
                    I knew only HTML, CSS, and JavaScript.
                  </span>
                </h3>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="space-y-4 text-base md:text-lg text-white/70 leading-relaxed">
                  {featured1.story?.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50 font-mono">
                  <span>📅 {featured1.date}</span>
                  <span>📍 {featured1.location}</span>
                  <span className="text-[#FFD700]">🥇 ₹{featured1.prize?.toLocaleString()}</span>
                  <span>🚀 {featured1.projectFullName}</span>
                </div>
              </ScrollReveal>
            </div>
            {/* Photo */}
            <div className="lg:w-[40%] w-full">
              <ScrollReveal direction="right">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={featured1.photos[0]}
                    alt="Sharda University Hackathon Win"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      💡 First hackathon — only knew HTML, CSS, JS
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ════════════ Pull Quote ════════════ */}
        <div className="max-w-4xl mx-auto my-20 md:my-28 text-center px-4">
          <ScrollReveal>
            <p className="text-2xl md:text-4xl lg:text-[2.75rem] font-serif italic text-white/90 leading-tight mb-8">
              &ldquo;My first hackathon, I only knew HTML, CSS, and JS.
              <br />
              I still won a national title.
              <br />
              That&apos;s when I stopped believing in limits.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#F97316]">
              — Reflecting on Sharda 2025
            </span>
          </ScrollReveal>
        </div>

        {/* ════════════ Featured Win #2: The Masterpiece ════════════ */}
        <div className="mb-24 md:mb-32">
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-start">
            <div className="lg:w-[60%]">
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 mb-6">
                  🥇 Second National Win · Cross-Disciplinary
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                  When code meets circuits
                  <br />
                  <span className="text-white/60">and civil engineering.</span>
                </h3>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="space-y-4 text-base md:text-lg text-white/70 leading-relaxed">
                  {featured2.story?.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50 font-mono">
                  <span>📅 {featured2.date}</span>
                  <span>📍 {featured2.location}</span>
                  <span className="text-[#FFD700]">🥇 ₹{featured2.prize?.toLocaleString()}</span>
                  <span>⚡ {featured2.project}</span>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:w-[40%] w-full">
              <ScrollReveal direction="left">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={featured2.photos[0]}
                    alt="NexHack Smart Power Win"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      🔬 Civil + Electronics + CS + IoT
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ════════════ Smart Power Spotlight ════════════ */}
        <div className="mb-24 md:mb-32 p-8 md:p-12 rounded-3xl bg-white/[0.015] border border-[#FFD700]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <ScrollReveal>
              <span className="text-[#FFD700] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block flex items-center gap-2">
                <Zap className="w-4 h-4" />
                The Project That Kept Winning
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-serif font-medium text-white mb-6 leading-tight">
                Smart Power — 4&nbsp;hackathons,
                <br />
                4&nbsp;wins, 1&nbsp;national&nbsp;title.
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-3xl mb-8">
                Some projects are meant for hackathon judges. Smart Power was meant for India. Combining civil engineering, electronics, embedded systems, and full-stack development into a system that generates electricity from footsteps using recycled plastic bricks — this project proved that innovation doesn&apos;t require expensive imports. We built it. We refined it. We won with it. Repeatedly.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Wins list */}
              <ScrollReveal delay={0.3}>
                <div>
                  <h4 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4">
                    Awards Won
                  </h4>
                  <div className="space-y-3">
                    {smartPowerWins.map((win) => (
                      <div
                        key={win}
                        className="flex items-start gap-2.5 text-sm text-white/70"
                      >
                        <Trophy className="w-4 h-4 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span>{win}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Tech breakdown */}
              <ScrollReveal delay={0.4}>
                <div>
                  <h4 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4">
                    Tech Stack
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase block mb-1.5">Hardware</span>
                      <div className="flex flex-wrap gap-2">
                        {["Piezoelectric Sensors", "Arduino Uno", "ESP8266", "TP4056", "Custom PCB"].map((t) => (
                          <span key={t} className="text-xs font-mono text-[#FFD700]/70 bg-[#FFD700]/5 border border-[#FFD700]/15 px-2.5 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase block mb-1.5">Materials</span>
                      <div className="flex flex-wrap gap-2">
                        {["Recycled Plastic", "Sand", "Clay", "Glass", "Bitumen"].map((t) => (
                          <span key={t} className="text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase block mb-1.5">Software</span>
                      <div className="flex flex-wrap gap-2">
                        {["Next.js Dashboard", "IoT Monitoring", "Live Charts"].map((t) => (
                          <span key={t} className="text-xs font-mono text-[#F97316]/70 bg-[#F97316]/5 border border-[#F97316]/15 px-2.5 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ════════════ Timeline ════════════ */}
        <div className="mb-24">
          <h3 className="text-xl font-serif text-white/80 mb-10 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#F97316]" />
            All 8 Wins
          </h3>

          {/* Desktop horizontal */}
          <div className="hidden md:block relative py-12 px-4 bg-white/[0.01] rounded-3xl border border-white/5 overflow-hidden">
            <div className="absolute left-0 right-0 h-0.5 bg-white/10 top-[60px] z-0" />
            <div className="overflow-x-auto pb-6 relative z-10 flex gap-8 select-none">
              <div className="flex gap-12 min-w-max px-8">
                {hackathons.map((h) => (
                  <motion.div
                    key={h.id}
                    onClick={() => setSelectedHackathon(h)}
                    className="w-56 flex flex-col items-center cursor-pointer group"
                    whileHover={{ y: -6 }}
                  >
                    <span className="text-[10px] font-mono text-white/40 mb-3 block">
                      {h.date.split(",")[0]?.includes("–") ? h.date.split(",")[0] : h.date}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 mb-5 ${
                        h.isNational
                          ? "bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                          : "bg-zinc-800 border-2 border-white/30 group-hover:border-[#F97316]"
                      }`}
                    >
                      {h.isNational ? (
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-[#F97316] transition-colors" />
                      )}
                    </div>
                    <h4
                      className={`text-center text-sm font-serif font-medium leading-tight group-hover:text-[#F97316] transition-colors ${
                        h.isNational ? "text-[#FFD700]" : "text-white"
                      }`}
                    >
                      {h.event}
                    </h4>
                    <span className="text-[10px] font-mono text-white/40 mt-1 text-center">
                      {h.project}
                    </span>
                    {h.note && (
                      <span className="text-[9px] font-mono text-white/30 mt-1 text-center italic">
                        {h.note}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-center text-xs font-mono text-white/30 mt-4">
              ← Scroll to explore · Click any node for details →
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden space-y-4">
            {hackathons.map((h) => (
              <div
                key={h.id}
                onClick={() => setSelectedHackathon(h)}
                className={`p-5 rounded-2xl border transition-colors flex items-start gap-4 cursor-pointer ${
                  h.isNational
                    ? "bg-[#FFD700]/5 border-[#FFD700]/30"
                    : "bg-white/[0.02] border-white/10"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    h.isNational ? "bg-[#FFD700] text-black" : "bg-zinc-900 text-white/40"
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-mono text-white/40 block">{h.date}</span>
                  <h4
                    className={`text-base font-serif font-medium truncate ${
                      h.isNational ? "text-[#FFD700]" : "text-white"
                    }`}
                  >
                    {h.event}
                  </h4>
                  <p className="text-xs font-mono text-white/60">
                    {h.project}
                    {h.prize ? ` · ₹${h.prize.toLocaleString()}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════ Gallery: The Moments ════════════ */}
        <div className="mt-20">
          <ScrollReveal>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#F97316]" />
              The Moments
            </h3>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, index) => (
              <StaggerItem key={index}>
                <motion.div
                  onClick={() => setLightboxIndex(index)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in group border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                    <p className="text-[10px] font-mono text-white/90 leading-tight">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ════════════ Bottom CTA ════════════ */}
        <div className="mt-28 p-8 md:p-12 rounded-3xl bg-white/[0.01] border border-white/5 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <h4 className="text-xl font-serif text-white mb-2">
              Currently looking for the next challenge.
            </h4>
            <p className="text-sm text-white/50">
              Whether it&apos;s a hackathon, a full-time role, or a project that pushes limits — count me in.
            </p>
          </div>
          <Link href="/contact" className="relative z-10">
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F97316] text-black font-semibold text-sm hover:bg-[#FEF3C7] transition-colors cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </div>
      </div>

      {/* ════════════ Detail Modal ════════════ */}
      <AnimatePresence>
        {selectedHackathon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHackathon(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden z-10 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedHackathon(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between gap-4 mb-6">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    selectedHackathon.isNational
                      ? "bg-[#FFD700] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {selectedHackathon.isNational ? "🥇 National Win" : "🏆 Hackathon Win"}
                </span>
                <span className="text-xs font-mono text-white/40">{selectedHackathon.date}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                {selectedHackathon.event}
              </h3>
              <p className="text-sm font-mono text-[#FEF3C7] mb-6">
                📍 {selectedHackathon.location}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-white/80 mb-6">
                <div>
                  <span className="text-white/40 uppercase font-mono block mb-1 text-[10px]">Project</span>
                  <span className="font-semibold">{selectedHackathon.projectFullName}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-mono block mb-1 text-[10px]">Prize</span>
                  <span className="font-semibold text-[#FEF3C7] flex items-center gap-1.5">
                    {selectedHackathon.prize ? `₹${selectedHackathon.prize.toLocaleString()}` : "Recognition"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {selectedHackathon.projectDescription}
              </p>

              {selectedHackathon.note && (
                <p className="text-xs text-white/40 italic mb-6">
                  💡 {selectedHackathon.note}
                </p>
              )}

              {selectedHackathon.photos?.[0] && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={selectedHackathon.photos[0]}
                    alt={selectedHackathon.event}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════ Lightbox ════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-[60] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={showPrev}
              className="absolute left-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-[60] cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={showNext}
              className="absolute right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-[60] cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl max-h-[80vh] px-12 flex flex-col items-center">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] w-full max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image
                  src={galleryPhotos[lightboxIndex].src}
                  alt={galleryPhotos[lightboxIndex].caption}
                  fill
                  className="object-contain"
                />
              </motion.div>
              <span className="text-sm font-mono text-white/70 mt-6 text-center max-w-xl">
                {galleryPhotos[lightboxIndex].caption}
              </span>
              <span className="text-xs font-mono text-white/30 mt-2">
                {lightboxIndex + 1} / {galleryPhotos.length}
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

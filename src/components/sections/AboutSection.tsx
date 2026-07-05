"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";
import Image from "next/image";
import { CheckCircle2, Clock, Calendar, Globe } from "lucide-react";

export default function AboutSection() {
  const specs = [
    "Full-stack web development",
    "Payment gateway integrations",
    "Marketing automation systems",
    "Offline-first desktop apps",
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (60% - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal>
              <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
                About
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-white mb-6 leading-tight">
                Building serious software <br />
                with a small team.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4 text-base text-white/75 leading-relaxed font-sans mb-8">
                <p>
                  I&apos;m Sunil Baghel, Co-Founder of Forgeweb — a web development agency delivering production-grade software to businesses across India.
                </p>
                <p>
                  Over the past 2 years, I&apos;ve shipped fintech platforms, POS systems, marketing automation tools, and custom SaaS applications. My focus is simple: build software that businesses can actually run on.
                </p>
                <p>
                  I work with a small, focused team. No handoffs to junior developers. No unnecessary complexity. Just clean, maintainable code that solves real problems.
                </p>
              </div>
            </ScrollReveal>

            {/* Specializations */}
            <ScrollReveal delay={0.3}>
              <div>
                <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-4">
                  Specializations:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3.5">
                  {specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (40% - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <ScrollReveal direction="right" className="w-full max-w-[340px]">
              <div className="relative p-5 rounded-3xl bg-white/[0.015] border border-white/10 w-full group overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-[40px] pointer-events-none" />
                
                {/* Visual headshot */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-6">
                  <Image
                    src="/personal/personal.jpeg"
                    alt="Sunil Baghel Personal"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Status Cards */}
                <div className="space-y-4">
                  {/* Availability */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase block">Current Availability</span>
                      <span className="text-xs font-semibold text-white/80">Taking on 2 new projects for Q1 2026</span>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase block">Response Time</span>
                      <span className="text-xs font-semibold text-white/80">Within 24 hours</span>
                    </div>
                  </div>

                  {/* Based in */}
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase block">Based In</span>
                      <span className="text-xs font-semibold text-white/80">India · Working Globally</span>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

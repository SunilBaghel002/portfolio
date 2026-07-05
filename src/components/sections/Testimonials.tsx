"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0d0d0d] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <ScrollReveal>
          <Quote className="w-12 h-12 text-[#F97316]/30 mx-auto mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-2xl md:text-4xl font-serif italic text-white/90 leading-tight mb-8">
            &ldquo;Sunil built our restaurant management system in 6 weeks. It runs flawlessly across our 3 locations.&rdquo;
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="space-y-1">
            <span className="font-sans font-semibold text-white block text-base">
              Owner
            </span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              Hello Pizza Cafe
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
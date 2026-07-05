"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";
import { Clock, HelpCircle, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    icon: HelpCircle,
    duration: "1–2 days",
    description: "We start with a discovery call to understand your business, goals, and requirements. I ask the right questions before writing a single line of code.",
  },
  {
    number: "02",
    title: "Planning",
    icon: Clock,
    duration: "3–5 days",
    description: "I create a detailed project scope, timeline, and technical architecture. You know exactly what you're getting, when, and for how much.",
  },
  {
    number: "03",
    title: "Development",
    icon: Code,
    duration: "Varies by scope",
    description: "Weekly progress updates. Preview links for every milestone. You see your project take shape in real-time, not just at the end.",
  },
  {
    number: "04",
    title: "Launch & Support",
    icon: Rocket,
    duration: "Ongoing",
    description: "Deployment, testing, documentation, and handoff. Followed by 30 days of free support to ensure everything runs smoothly.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-black text-white border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-left md:max-w-2xl">
          <ScrollReveal>
            <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
              Process
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-white mb-4">
              How I Work
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-white/50 leading-relaxed">
              A clear, structured process from initial idea to production deployment.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-8 right-8 h-px bg-gradient-to-r from-[#F97316] via-[#FEF3C7] to-white/10" />

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative group">
                  {/* Step Node */}
                  <ScrollReveal delay={index * 0.1}>
                    <div className="flex items-center lg:flex-col lg:items-start gap-4 lg:gap-6 mb-6">
                      
                      {/* Step Number Badge */}
                      <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center font-mono text-sm text-[#F97316] group-hover:border-[#F97316]/50 transition-all duration-300 relative z-10">
                        {step.number}
                      </div>

                      {/* Icon & Title for Mobile, Title for Desktop */}
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1.5">
                        <h3 className="text-xl font-serif font-medium text-white group-hover:text-[#F97316] transition-colors">
                          {step.title}
                        </h3>
                        
                        {/* Duration badge */}
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/40 uppercase tracking-wider w-fit">
                          {step.duration}
                        </span>
                      </div>
                      
                    </div>
                  </ScrollReveal>

                  {/* Description */}
                  <ScrollReveal delay={index * 0.1 + 0.15}>
                    <p className="text-sm text-white/50 leading-relaxed font-sans pr-4 pl-16 lg:pl-0">
                      {step.description}
                    </p>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

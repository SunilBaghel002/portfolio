"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function Hero() {
  const handleScroll = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-black"
    >
      {/* Subtle background grids */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />
      
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Left Column (Content - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Availability Badge */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 w-fit"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-xs font-mono tracking-wider text-white/70 uppercase">
                Available for new projects
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white mb-6 leading-[1.1]"
            >
              I build web applications <br />
              that businesses run on.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-white/50 leading-relaxed font-sans max-w-xl mb-8"
            >
              Full-stack developer specializing in production-ready web applications, e-commerce platforms, SaaS products, and custom business software.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-fit"
            >
              <button
                onClick={() => handleScroll("#work")}
                className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#F97316] text-black font-semibold text-sm hover:bg-[#FEF3C7] transition-all w-full sm:w-auto cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleScroll("#contact")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all w-full sm:w-auto cursor-pointer"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span>Start a Project</span>
              </button>
            </motion.div>

            {/* Industry Strip */}
            <motion.div
              variants={fadeInUp}
              className="border-t border-white/10 pt-6 flex flex-col gap-2"
            >
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                Trusted by businesses across India
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-white/60">
                {["Fintech", "Restaurants", "Education", "Real Estate", "Retail"].map((ind, i) => (
                  <span key={ind} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-white/20">·</span>}
                    {ind}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Visual Card - 5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <motion.div
              variants={fadeInUp}
              className="relative p-5 rounded-3xl bg-white/[0.015] border border-white/10 max-w-[340px] w-full group overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-[40px] pointer-events-none" />
              
              {/* Photo */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-4">
                <Image
                  src="/personal/profile.jpg"
                  alt="Sunil Baghel"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bio Card Detail */}
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-medium text-white leading-tight">
                  Sunil Baghel
                </h3>
                <p className="text-xs font-mono text-[#F97316]">
                  Co-Founder @ Forgeweb
                </p>
                <div className="w-full h-px bg-white/5 my-2" />
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-relaxed">
                  Based in India <br /> Available Worldwide
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
    </section>
  );
}
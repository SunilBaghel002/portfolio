"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";
import { Mail, ArrowRight, Github, Linkedin, Globe, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Custom",
    budgetRange: "₹50K-2L",
    timeline: "ASAP",
    message: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          projectType: formState.projectType,
          budgetRange: formState.budgetRange,
          timeline: formState.timeline,
          message: formState.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert(result.error || "Something went wrong. Please try sending directly to sunilbaghel93100@gmail.com");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try sending directly to sunilbaghel93100@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#3B82F6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-left max-w-xl">
          <ScrollReveal>
            <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
              Contact
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white mb-4">
              Have a project <br />in mind?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base text-white/50 leading-relaxed">
              Let&apos;s discuss how I can help bring your idea to life. Fill in the details below or email directly.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Split */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Column 1: Project Planner Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/[0.015] border border-white/10 rounded-3xl p-8 relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-[#F97316]/50 focus:outline-none transition-colors text-sm text-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-[#F97316]/50 focus:outline-none transition-colors text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                        Project Type
                      </label>
                      <select
                        value={formState.projectType}
                        onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 focus:border-[#F97316]/50 focus:outline-none transition-colors text-sm text-white/70"
                      >
                        <option>E-commerce</option>
                        <option>SaaS Platform</option>
                        <option>Fintech</option>
                        <option>Custom Web App</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                        Budget Range
                      </label>
                      <select
                        value={formState.budgetRange}
                        onChange={(e) => setFormState({ ...formState, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 focus:border-[#F97316]/50 focus:outline-none transition-colors text-sm text-white/70"
                      >
                        <option>&lt; ₹50K</option>
                        <option>₹50K-2L</option>
                        <option>2L-5L</option>
                        <option>5L+</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                        Timeline
                      </label>
                      <select
                        value={formState.timeline}
                        onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 focus:border-[#F97316]/50 focus:outline-none transition-colors text-sm text-white/70"
                      >
                        <option>ASAP</option>
                        <option>1 month</option>
                        <option>2-3 months</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Briefly describe what you are looking to build..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-[#F97316]/50 focus:outline-none transition-colors text-sm text-white resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group py-4 rounded-xl bg-[#F97316] text-black font-semibold text-sm hover:bg-[#FEF3C7] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Project Details"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center py-12 space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-[#F97316] mx-auto" />
                  <h3 className="text-2xl font-serif text-white">Details Sent Successfully</h3>
                  <p className="text-sm text-white/60 max-w-sm mx-auto font-sans">
                    Thank you for sharing your project planner details. Sunil will review your requirements and follow up within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-xs font-mono text-[#F97316] hover:text-[#FEF3C7] transition-colors"
                  >
                    Submit another response
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Column 2: Direct Email & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-10 lg:pl-6">
            <div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] block mb-2">
                Direct Email
              </span>
              <a
                href="mailto:sunilbaghel93100@gmail.com"
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#F97316] transition-colors block break-words"
              >
                sunilbaghel93100@gmail.com
              </a>
              <span className="text-xs font-mono text-white/40 block mt-2">
                Response guarantee: You&apos;ll hear back within 24 hours.
              </span>
            </div>

            {/* Social Connects */}
            <div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] block mb-4">
                Connect
              </span>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/sunil-baghel-140a60348/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#F97316]/50 text-white/60 hover:text-white transition-all flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://github.com/SunilBaghel002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#F97316]/50 text-white/60 hover:text-white transition-all flex items-center justify-center"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href="https://www.forgeweb.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#F97316]/50 text-white/60 hover:text-white transition-all flex items-center justify-center"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

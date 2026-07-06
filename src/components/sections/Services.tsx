"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../animations/ScrollReveal";
import { Code2, ShoppingCart, Cloud, CreditCard, MessageSquare, Monitor } from "lucide-react";


const services = [
  {
    icon: Code2,
    title: "Custom Web Applications",
    description: "Full-stack web applications tailored to your business logic. From complex dashboards to customer-facing platforms — built to scale.",
    tech: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    description: "High-converting online stores with integrated payments, inventory management, and customer analytics. Built for performance and conversion.",
    tech: ["Next.js", "Stripe", "Razorpay", "MongoDB"],
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    description: "Multi-tenant SaaS applications with subscription management, role-based access, and enterprise-grade security. From MVP to scale.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    icon: CreditCard,
    title: "Fintech Integrations",
    description: "Payment gateway integrations, AEPS/BBPS/DMT services, wallet systems, and financial transaction platforms. Built for real money movement.",
    tech: ["Node.js", "Payment APIs", "Secure Auth"],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "WhatsApp Business API integrations for customer engagement, order management, and marketing automation. Scale conversations to thousands.",
    tech: ["WhatsApp API", "Node.js", "MongoDB"],
  },
  {
    icon: Monitor,
    title: "Desktop Applications",
    description: "Cross-platform desktop software using Electron.js. Perfect for offline-first business applications like POS systems, inventory management, and enterprise tools.",
    tech: ["Electron.js", "SQLite", "Node.js"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-left md:max-w-2xl">
          <ScrollReveal>
            <span className="text-[#F97316] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 block">
              Services
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-white mb-4">
              What I Build
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-white/50 leading-relaxed">
              End-to-end web development services for businesses that mean business.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={service.title}>
              <div className="p-8 rounded-3xl bg-white/[0.015] border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F97316]/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div>
                  {/* Icon */}
                  <div className="mb-6 text-[#F97316] group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                    <service.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-serif font-medium text-white mb-4 group-hover:text-[#F97316] transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed font-sans mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {service.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-[10px] font-mono text-white/40 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}

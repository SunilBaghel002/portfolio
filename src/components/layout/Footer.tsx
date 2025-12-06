"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Dribbble, Mail, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { MagneticButton } from "../animations/MagneticButton";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">{portfolioData.name}</h3>
            <p className="text-white/60 max-w-sm">{portfolioData.role}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {["About", "Projects", "Skills", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-white/60 hover:text-accent-neon transition-colors flex items-center gap-1 group"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              {portfolioData.socials.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <MagneticButton key={social.name} strength={0.3}>
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-accent-neon hover:border-accent-neon/50 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  </MagneticButton>
                );
              })}
            </div>
            <a
              href={`mailto:${portfolioData.email}`}
              className="text-white/60 hover:text-accent-neon transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {portfolioData.email}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Built with Next.js, Framer Motion & Three.js
          </p>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-neon/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[128px]" />
      </div>
    </footer>
  );
}
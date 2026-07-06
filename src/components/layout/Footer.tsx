"use client";

import Link from "next/link";
import { Github, Linkedin, Globe } from "lucide-react";
import { portfolioData } from "@/lib/data";
import Monogram from "@/components/ui/Monogram";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm font-sans text-white/40">
              &copy; {new Date().getFullYear()} Sunil Baghel. All rights reserved.
            </p>
            <p className="text-xs font-mono text-white/30 mt-1 uppercase tracking-wider">
              Building at Forgeweb
            </p>
          </div>

          {/* Center: Monogram Logo */}
          <div className="flex items-center justify-center">
            <Link href="/#home" className="group flex items-center justify-center">
              <Monogram size="sm" />
            </Link>
          </div>

          {/* Right: forgeweb.in & socials */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/sunil-baghel-140a60348/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#F97316] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/SunilBaghel002"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#F97316] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.forgeweb.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#F97316] transition-colors"
                aria-label="Forgeweb Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
            <a
              href="https://www.forgeweb.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-white/50 hover:text-white transition-colors uppercase tracking-wider"
            >
              forgeweb.in
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
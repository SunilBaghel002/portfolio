"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AnimatedHeading } from "../animations/AnimatedText";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    content:
      "Working with this developer was an absolute pleasure. They delivered beyond our expectations with impeccable attention to detail and creative solutions.",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Lead at InnovateCo",
    content:
      "The technical expertise and creative vision brought to our project was outstanding. The result exceeded all our goals.",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Design Director at CreativeHub",
    content:
      "A rare combination of technical skill and design sensibility. The collaboration was seamless and the results speak for themselves.",
    avatar: "ED",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-accent-neon text-sm font-medium uppercase tracking-wider mb-4 block">
              Testimonials
            </span>
          </ScrollReveal>
          <AnimatedHeading>What People Say</AnimatedHeading>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote Icon */}
              <motion.div
                className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent-neon/20 to-accent-purple/20 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Quote className="w-8 h-8 text-accent-neon" />
              </motion.div>

              {/* Content */}
              <blockquote className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed mb-8">
                &ldquo;{testimonials[current].content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-neon to-accent-purple flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonials[current].avatar}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="text-white/60 text-sm">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={prev}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === current ? "bg-accent-neon" : "bg-white/20"
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-neon/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>
    </section>
  );
}
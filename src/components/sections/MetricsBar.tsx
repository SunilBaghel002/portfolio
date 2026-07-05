"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({
  end,
  duration = 1.2,
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
      {count}
      {suffix}
    </span>
  );
}

const metrics = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 10, suffix: "K+", label: "Users Reached" },
  { value: 100, suffix: "%", label: "Delivery Rate" },
  { value: 24, suffix: "hr", label: "Response Time" },
];

export default function MetricsBar() {
  return (
    <section className="relative border-y border-white/[0.06] bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className="text-4xl md:text-5xl font-serif font-medium text-white block mb-1 tabular-nums">
                <CountUp end={metric.value} suffix={metric.suffix} />
              </span>
              <span className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em] leading-tight">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

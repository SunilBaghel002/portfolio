"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease-in-out
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(Math.floor(eased * 100));

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Center content */}
          <div className="flex flex-col items-center gap-6">
            <motion.p
              className="tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              The Builder&apos;s Journal
            </motion.p>

            <motion.div
              className="flex items-baseline gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span
                className="text-5xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                }}
              >
                {progress}
              </span>
              <span
                className="text-lg"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-muted)",
                }}
              >
                %
              </span>
            </motion.div>

            <motion.p
              className="tracking-[0.15em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--color-text-muted)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Vol. 03 · Issue 01
            </motion.p>
          </div>

          {/* Bottom marquee */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.6 }}
          >
            <div
              className="marquee-content whitespace-nowrap"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                animationDuration: "20s",
              }}
            >
              <span className="mx-8">
                Preparing your reading experience · Full Stack Developer ·
                Co-Founder @ Forgeweb · 2× National Hackathon Winner · Building
                things that work ·{" "}
              </span>
              <span className="mx-8">
                Preparing your reading experience · Full Stack Developer ·
                Co-Founder @ Forgeweb · 2× National Hackathon Winner · Building
                things that work ·{" "}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

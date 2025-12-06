import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const letterAnimation: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};

export const slideInFromTop: Variants = {
  initial: { y: "-100%", opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }
  },
};

export const revealMask: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { 
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }
  },
};

export const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const pulseGlow = {
  boxShadow: [
    "0 0 20px rgba(0, 240, 255, 0.3)",
    "0 0 40px rgba(0, 240, 255, 0.5)",
    "0 0 20px rgba(0, 240, 255, 0.3)",
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
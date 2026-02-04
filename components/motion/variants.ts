import type { Transition, Variants } from "framer-motion";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fastTransition: Transition = {
  duration: 0.3,
  ease: easeOutExpo,
};

export const mediumTransition: Transition = {
  duration: 0.45,
  ease: easeOutExpo,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: mediumTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: fastTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const cardIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

export const slideHorizontal: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 26 : -26,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: mediumTransition,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -20 : 20,
    transition: fastTransition,
  }),
};

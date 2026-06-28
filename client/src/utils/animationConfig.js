/**
 * Reusable animation configurations and presets for Framer Motion
 * Apple-inspired cinematic animations with smooth, premium feel
 */

// Container animation setup for staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
    },
  },
};

// Text animations for hero and section titles
export const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
    },
  },
};

// Fade-in animation
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Fade-up animation for scroll reveals
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade-left animation
export const fadeLeftVariants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade-right animation
export const fadeRightVariants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Scale animation with fade
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Image zoom animation
export const imageZoomVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Blur to focus transition
export const blurFocusVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Slideshow slide transition
export const slideshowVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Hover animation for cards
export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Button hover animation
export const buttonHoverVariants = {
  rest: { scale: 1, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)" },
  hover: {
    scale: 1.02,
    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Page transition animation
export const pageTransitionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Parallax config for scroll-based animations
export const parallaxConfig = {
  offset: ["0 1", "1.33", "1 0"], // When element enters and leaves viewport
  transition: "cubic-bezier(0.22, 1, 0.36, 1)", // Custom easing
};

// Pulse animation for attention
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

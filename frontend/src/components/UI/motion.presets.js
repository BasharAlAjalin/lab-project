export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.25, ease: "easeOut" },
};

export const stagger = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

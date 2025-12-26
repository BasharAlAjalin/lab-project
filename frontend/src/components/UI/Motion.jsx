import { motion } from "framer-motion";

export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

export const MotionDiv = motion.div;
export const MotionButton = motion.button;

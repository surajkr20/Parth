/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";

export default function GoogleListenAnimation() {
  const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]; // Google colors
  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center gap-2 h-16">
      {colors.map((color, i) => (
        <motion.span
          key={i}
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
          variants={dotVariants}
          animate="animate"
          transition={{ delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

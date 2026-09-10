import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
export const NoResultState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: [0.7, 1.1, 1], rotate: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-light text-forest"
      >
        <FontAwesomeIcon icon={faBriefcase} className="text-xl" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-lg font-semibold text-deep-forest"
      >
        No applications found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-1 max-w-sm text-sm text-forest/60"
      >
        No applications match your current search or filters.
      </motion.p>
    </motion.div>
  );
};

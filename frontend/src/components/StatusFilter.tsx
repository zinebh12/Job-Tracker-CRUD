import { motion } from "motion/react";
import type { StatusFilterProps } from "../types/applications";
const StatusFilter = ({
  onStatusChange,
  selectedStatus,
}: StatusFilterProps) => {
  const statuses = [
    { label: "All", value: "" },
    { label: "Applied", value: "Applied" },
    { label: "Interview", value: "Interview" },
    { label: "Offer", value: "Offer" },
    { label: "Rejected", value: "Rejected" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
      className="flex flex-wrap gap-2 sm:gap-3"
    >
      {statuses.map((status) => (
        <motion.button
          key={status.value}
          type="button"
          onClick={() => onStatusChange(status.value)}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${selectedStatus === status.value ? "bg-deep-forest text-white" : "bg-white text-forest hover:bg-sage"}`}
        >
          {status.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default StatusFilter;

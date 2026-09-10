import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

type ToastProps = {
  type: string;
  message: string;
  onClose: () => void;
};

const Toast = ({ type, message, onClose }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: [0.7, 1.08, 0.95, 1], y: [20, -4, 2, 0] }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-100 flex items-center gap-3 rounded-2xl border border-sage/30 bg-white px-4 py-3 shadow-xl"
    >
      {type === "success" ? (
        <FontAwesomeIcon icon={faCircleCheck} className="text-green" />
      ) : (
        <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500" />
      )}
      <span className="text-sm font-medium text-deep-forest"> {message} </span>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-forest/50 transition hover:bg-sage-light hover:text-deep-forest"
        aria-label="Close notification"
      >
        <FontAwesomeIcon icon={faXmark} className="text-xs" />
      </motion.button>
    </motion.div>
  );
};

export default Toast;

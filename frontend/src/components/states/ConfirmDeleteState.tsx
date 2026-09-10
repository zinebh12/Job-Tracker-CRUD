import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  handleDeleteMultipleApplications,
  handleDeleteApplication,
} from "@/handlers/applicationsHandlers";

import { motion } from "motion/react";

import type { ToastState } from "@/types/applications";
const ConfirmDeleteState = ({
  setDelete,
  selectedIds = [],
  refetch,
  setSelectedIds,
  id,
  setToast,
}: {
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds?: number[];
  refetch?: () => void;
  setSelectedIds?: React.Dispatch<React.SetStateAction<number[]>>;
  id?: number;
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const navigate = useNavigate();
  const handleConfirmDelete = () => {
    try {
      if (selectedIds.length > 0) {
        if (!refetch || !setSelectedIds) return;

        handleDeleteMultipleApplications(selectedIds, refetch, setSelectedIds);

        setDelete(false);
        setToast({
          type: "success",
          message: "Applications deleted successfully!",
        });
        return;
      }
      if (id !== undefined) {
        setToast({
          type: "success",
          message: "Application deleted successfully!",
        });
        handleDeleteApplication(id, () => navigate("/dashboard"));
      }
    } catch (error) {
      console.log(error);
      setToast({
        type: "error",
        message: "Failed to delete application.",
      });
      setDelete(false);
      setSelectedIds?.([]);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex h-full items-center justify-center bg-deep-forest/40 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: [0.7, 1.1, 1], rotate: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"
        >
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </motion.div>
        {/* Content */}
        <h2 className="text-xl font-semibold text-deep-forest">
          {selectedIds.length > 0
            ? "Delete selected applications?"
            : "Delete application?"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-forest/60">
          You are about to permanently delete{" "}
          <span className="font-semibold text-forest">
            {selectedIds.length > 0
              ? `${selectedIds.length} ${selectedIds.length === 1 ? "application" : "applications"}`
              : "this application"}
          </span>{" "}
          . This action cannot be undone.
        </p>
        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <motion.button
            type="button"
            onClick={() => {
              setDelete(false);
              setSelectedIds?.([]);
            }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sage/50 px-5 py-3 text-sm font-semibold text-forest transition hover:bg-sage-light"
          >
            <FontAwesomeIcon icon={faXmark} /> Cancel
          </motion.button>
          <motion.button
            type="button"
            onClick={handleConfirmDelete}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
            {selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default ConfirmDeleteState;

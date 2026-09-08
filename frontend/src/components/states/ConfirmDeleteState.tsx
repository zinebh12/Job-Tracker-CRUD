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
import { useNavigate } from "react-router-dom";
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
        handleDeleteApplication(id, () => navigate("/"));
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
    <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-deep-forest/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Icon */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </div>
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
          <button
            type="button"
            onClick={() => {
              setDelete(false);
              setSelectedIds?.([]);
            }}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sage/50 px-5 py-3 text-sm font-semibold text-forest transition hover:bg-sage-light"
          >
            <FontAwesomeIcon icon={faXmark} /> Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
            {selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDeleteState;

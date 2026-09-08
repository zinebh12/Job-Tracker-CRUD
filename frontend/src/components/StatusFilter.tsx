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
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {statuses.map((status) => (
        <button
          key={status.value}
          type="button"
          onClick={() => onStatusChange(status.value)}
          className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${selectedStatus === status.value ? "bg-deep-forest text-white" : "bg-white text-forest hover:bg-sage"}`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;

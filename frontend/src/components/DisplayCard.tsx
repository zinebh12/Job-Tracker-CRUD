import { useState } from "react";
import type { Application } from "./../types/applications";
import { handleEditApplication } from "./../handlers/applicationsHandlers";
import EditApplication from "./EditApplication";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@/components/smoothui/checkbox/index";
import { motion } from "motion/react";
const DisplayCard = ({
  application,
  onSuccess,
  selectedIds,
  setSelectedIds,
}: {
  application: Application;
  onSuccess: () => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const navigate = useNavigate();
  const [openEditApplication, setOpenEditApplication] = useState(false);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="cursor-pointer border-b border-sage-light/60 transition-colors hover:bg-sage-light/20"
      >
        {/* Checkbox */}
        <td className="px-2 py-3 sm:px-3 sm:py-4">
          <Checkbox
            checked={selectedIds.includes(application.id)}
            onCheckedChange={(checked) => {
              setSelectedIds((current) =>
                checked
                  ? [...current, application.id]
                  : current.filter((id) => id !== application.id),
              );
            }}
            className="cursor-pointer"
          />
        </td>
        {/* Company */}
        <td
          className="px-2 py-3 sm:px-3 sm:py-4"
          onClick={() => navigate(`/application/${application.id}`)}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex shrink-0 items-center justify-center rounded-md text-xs text-forest sm:h-9 sm:w-9 sm:rounded-lg sm:text-sm">
              <FontAwesomeIcon icon={faBuildingColumns} />
            </div>
            <span className="max-w-27.5 truncate text-xs font-semibold text-deep-forest sm:max-w-45 sm:text-sm lg:max-w-none">
              {application.company}
            </span>
          </div>
        </td>
        {/* Position */}
        <td
          className="px-2 py-3 sm:px-3 sm:py-4"
          onClick={() => navigate(`/application/${application.id}`)}
        >
          <span className="block max-w-35 truncate text-xs font-medium text-forest sm:max-w-55 sm:text-sm lg:max-w-none">
            {application.position}
          </span>
        </td>
        {/* Location */}
        <td
          className="hidden px-3 py-4 md:table-cell lg:px-4"
          onClick={() => navigate(`/application/${application.id}`)}
        >
          <div className="flex items-center gap-2 text-xs text-forest lg:text-sm">
            <FontAwesomeIcon icon={faLocationDot} className="shrink-0" />
            <span className="max-w-35 truncate lg:max-w-none">
              {application.location || "—"}
            </span>
          </div>
        </td>
        {/* Status */}
        <td
          className="px-2 py-3 sm:px-3 sm:py-4"
          onClick={() => navigate(`/application/${application.id}`)}
        >
          <span
            className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs ${application.status === "Applied" ? "bg-sage-light text-forest" : application.status === "Interview" ? "bg-amber-100 text-amber-800" : application.status === "Offer" ? "bg-green-100 text-green" : "bg-red-100 text-red-700"}`}
          >
            {application.status}
          </span>
        </td>
        {/* Date */}
        <td
          className="hidden px-3 py-4 text-xs text-deep-forest sm:table-cell lg:px-4 lg:text-sm"
          onClick={() => navigate(`/application/${application.id}`)}
        >
          {application.date_applied
            ? application.date_applied.split("T")[0]
            : "—"}
        </td>
        {/* Salary */}
        <td
          className="hidden px-3 py-4 text-xs text-deep-forest md:table-cell lg:px-4 lg:text-sm"
          onClick={() => navigate(`/application/${application.id}`)}
        >
          {application.salary ?? "—"}
        </td>
      </motion.tr>
      {openEditApplication && (
        <EditApplication
          onEdit={async (application) => {
            await handleEditApplication(application, onSuccess);
            setOpenEditApplication(false);
          }}
          application={application}
          onCancel={() => setOpenEditApplication(false)}
        />
      )}
    </>
  );
};

export default DisplayCard;

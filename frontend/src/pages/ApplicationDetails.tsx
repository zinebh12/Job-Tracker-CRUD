import { useParams, useNavigate } from "react-router-dom";
import { getApplicationDetails } from "../services/applicationApi";
import { useEffect, useState } from "react";
import type { Application } from "../types/applications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBuildingColumns,
  faLocationDot,
  faCalendarDays,
  faMoneyBillWave,
  faFileLines,
  faBriefcase,
  // faPen,
} from "@fortawesome/free-solid-svg-icons";
import type { ApplicationStatus } from "../types/applications";
import EditApplication from "@/components/EditApplication";
import { handleEditApplication } from "@/handlers/applicationsHandlers";
import ConfirmDeleteState from "@/components/states/ConfirmDeleteState";
import type { ToastState } from "../types/applications";

const ApplicationDetails = ({
  setToast,
}: {
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openEditApplication, setOpenEditApplication] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!id) return;

    const getApplication = async () => {
      try {
        const response = await getApplicationDetails(Number(id));
        setApplication(response);
      } catch (error) {
        console.error("Failed to fetch application", error);
      }
    };

    getApplication();
  }, [id]);

  if (!application) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sage-light font-manrope">
        <p className="text-sm font-medium text-forest">
          Loading application...
        </p>
      </div>
    );
  }
  const stages = ["Applied", "Interview", "Offer"] as const;
  const stageIndexes: Record<ApplicationStatus, number> = {
    Applied: 0,
    Interview: 1,
    Offer: 2,
    Rejected: -1,
  };

  const currentStage = stageIndexes[application.status];

  return (
    <div className="min-h-screen bg-sage-light px-4 py-6 font-manrope sm:px-6 sm:py-8 lg:px-10">
      {openEditApplication && (
        <EditApplication
          application={application}
          onEdit={async (updatedApplication) => {
            try {
              await handleEditApplication(updatedApplication, async () => {
                const response = await getApplicationDetails(Number(id));
                setApplication(response);
              });
              setOpenEditApplication(false);
              setToast({
                type: "success",
                message: "Application updated successfully",
              });
            } catch (error) {
              console.error("Failed to update application:", error);
              setToast({
                type: "error",
                message: "Failed to update application",
              });
            }
          }}
          onCancel={() => setOpenEditApplication(false)}
        />
      )}

      <div className="mx-auto w-full max-w-5xl">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-5 flex cursor-pointer items-center gap-2 text-sm font-medium text-forest transition hover:text-deep-forest sm:mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to applications</span>
        </button>

        {/* Main card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm sm:rounded-3xl">
          {/* Header */}
          <div className="border-b border-sage-light px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green">
                  Application
                </p>

                {/* Title + actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
                  <h1 className="capitalize wrap-break-word font-display text-3xl text-deep-forest sm:text-4xl lg:text-5xl">
                    {application.position}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() =>
                        setOpenEditApplication(!openEditApplication)
                      }
                      className="flex cursor-pointer  items-center justify-center rounded-lg font-display text-xs italic text-forest transition hover:underline"
                      aria-label="Edit application"
                    >
                      Edit Application.
                    </button>

                    <button
                      onClick={() => setConfirmDelete(!confirmDelete)}
                      className="flex cursor-pointer items-center justify-center rounded-lg font-display text-xs italic text-red-600 transition hover:text-red-700 hover:underline"
                      aria-label="Delete application"
                    >
                      Delete Application.
                    </button>
                  </div>
                </div>
                {confirmDelete && (
                  <ConfirmDeleteState
                    id={application.id}
                    setDelete={setConfirmDelete}
                    setToast={setToast}
                  />
                )}

                <div className="mt-3 flex min-w-0 items-center gap-2 text-forest">
                  <FontAwesomeIcon
                    icon={faBuildingColumns}
                    className="shrink-0"
                  />

                  <span className="truncate text-base font-medium sm:text-lg">
                    {application.company}
                  </span>
                </div>
              </div>

              <span className="w-fit shrink-0 rounded-full bg-green px-4 py-2 text-sm font-semibold text-white">
                {application.status}
              </span>
            </div>
          </div>

          {/* Information */}
          <div className="grid grid-cols-1 gap-4 px-5 py-6 sm:grid-cols-2 sm:gap-5 sm:px-8 sm:py-8 lg:grid-cols-4">
            <div className="rounded-2xl bg-sage-light/50 p-4 sm:p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sage-light text-forest">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-forest/50">
                Location
              </p>

              <p className="mt-1 wrao-break text-sm font-semibold text-deep-forest">
                {application.location || "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl bg-sage-light/50 p-4 sm:p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sage-light text-forest">
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-forest/50">
                Date Applied
              </p>

              <p className="mt-1 text-sm font-semibold text-deep-forest">
                {application.date_applied
                  ? application.date_applied.split("T")[0]
                  : "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl bg-sage-light/50 p-4 sm:p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sage-light text-forest">
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-forest/50">
                Salary
              </p>

              <p className="mt-1 text-sm font-semibold text-deep-forest">
                {application.salary ?? "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl bg-sage-light/50 p-4 sm:p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sage-light text-forest">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-forest/50">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold text-deep-forest">
                {application.status}
              </p>
            </div>
          </div>

          {/* Notes + Progress */}
          <div className="flex flex-col gap-8 border-t border-sage-light px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-start lg:gap-10">
            {/* Notes */}
            <div className="w-full min-w-0 lg:flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage-light text-forest">
                  <FontAwesomeIcon icon={faFileLines} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-deep-forest">
                    Notes
                  </h2>

                  <p className="text-xs text-forest/50">
                    Additional information about this application
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-sage-light/30 p-4 sm:p-5">
                <p className="whitespace-pre-wrap wrap-break-words text-sm leading-7 text-forest">
                  {application.notes || "No notes added."}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full min-w-0 lg:flex-1">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-deep-forest">
                  Application progress
                </h2>

                <p className="mt-1 text-sm text-forest/60">
                  Track the current stage of your application.
                </p>
              </div>

              {/* Horizontal on sm+, stacked on mobile */}
              <div className="flex gap-6 sm:flex-row sm:items-start sm:gap-0">
                {stages.map((stage, index) => {
                  const isCompleted =
                    application.status !== "Rejected" && currentStage >= index;

                  const isCurrent =
                    application.status !== "Rejected" && currentStage === index;

                  return (
                    <div
                      key={stage}
                      className="flex min-w-0 flex-1 items-start sm:items-center"
                    >
                      {/* Stage */}
                      <div className="flex shrink-0 flex-col items-center text-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                            isCompleted
                              ? "border-green bg-green text-white"
                              : "border-sage bg-sage-light text-forest/40"
                          }`}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </div>

                        <p
                          className={`mt-2 text-xs font-semibold sm:text-sm ${
                            isCurrent ? "text-green" : "text-deep-forest"
                          }`}
                        >
                          {stage}
                        </p>

                        <p className="mt-1 text-[11px] text-forest/50 sm:text-xs">
                          {isCompleted
                            ? "Completed"
                            : isCurrent
                              ? "Current stage"
                              : "Upcoming"}
                        </p>
                      </div>

                      {/* Connector */}
                      {index < stages.length - 1 && (
                        <div
                          className={`hidden h-0.5 flex-1 sm:mx-2 sm:block ${
                            currentStage > index ? "bg-green" : "bg-sage-light"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Rejected state */}
              {application.status === "Rejected" && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  <span className="font-semibold">Application rejected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;

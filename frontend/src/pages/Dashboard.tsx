import { useState } from "react";
import DisplayCard from "../components/DisplayCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
import NewApplicationForm from "../components/NewApplicationForm";
import { useApplications } from "../hooks/useApplications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@/components/smoothui/checkbox";
import { handleCreateApplication } from "./../handlers/applicationsHandlers";
import LoadingState from "@/components/states/LoadingState";
import { NoResultState } from "@/components/states/NoResultState";
import ConfirmDeleteState from "@/components/states/ConfirmDeleteState";
import type { ToastState } from "@/types/applications";

const Dashboard = ({
  setToast,
}: {
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openNewApplicationForm, setOpenNewApplicationForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, refetch, loading } = useApplications(
    page,
    searchTerm,
    statusFilter,
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleOpenApplicationForm = () =>
    setOpenNewApplicationForm(!openNewApplicationForm);

  if (loading && !data) {
    <LoadingState />;
  }

  if (data) {
    return (
      <div className="min-h-screen bg-sage-light font-manrope">
        {openNewApplicationForm && (
          <NewApplicationForm
            onSubmit={async (application) => {
              try {
                await handleCreateApplication(application, refetch);
                setToast({
                  type: "success",
                  message: "Application added successfully",
                });
              } catch (error) {
                console.log("Failed to create an application", error);
                setToast({
                  type: "error",
                  message: "Failed to create an application.",
                });
              }
            }}
            onCancel={handleOpenApplicationForm}
          />
        )}

        {/* Header */}
        <div className="space-y-4 pb-4">
          <div className="flex w-full items-center justify-between gap-4 border-b border-sage bg-white px-4 py-4 sm:px-6 sm:py-5">
            <h1 className="font-display text-3xl text-deep-forest sm:text-4xl lg:text-5xl">
              Hunter.
            </h1>
            <button
              onClick={handleOpenApplicationForm}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-forest px-3 py-2 text-sm text-white transition hover:bg-deep-forest sm:px-4 sm:py-2.5"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs sm:text-sm" />
              <span className="hidden sm:inline"> New Application </span>
              <span className="sm:hidden"> New </span>
            </button>
          </div>

          <div className="space-y-4 px-4">
            {/* Filters */}
            <StatusFilter
              onStatusChange={handleStatusFilter}
              selectedStatus={statusFilter}
            />

            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-4">
                <Search onSearch={handleSearch} />
                <div className="flex flex-col gap-3 border-t border-sage-light pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-medium text-forest/60 sm:text-sm">
                    Showing{" "}
                    <span className="font-semibold text-forest">
                      {data.applications.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-forest">
                      {data.pagination.total}
                    </span>{" "}
                    applications
                  </span>
                  {selectedIds.length > 0 && (
                    <button
                      onClick={() => setConfirmDelete(!confirmDelete)}
                      className="flex w-fit cursor-pointer items-center gap-2 text-xs font-semibold text-red-600 underline decoration-red-300 underline-offset-4 transition hover:text-red-700 hover:decoration-red-600 sm:text-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
                      <span> Delete selected ({selectedIds.length}) </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {confirmDelete && (
              <ConfirmDeleteState
                selectedIds={selectedIds}
                refetch={refetch}
                setSelectedIds={setSelectedIds}
                setDelete={setConfirmDelete}
                setToast={setToast}
              />
            )}

            {data.applications.length === 0 && searchTerm !== "" ? (
              <NoResultState />
            ) : (
              <>
                {/* Table */}
                <div className="w-full overflow-x-auto rounded-md bg-white">
                  <table className="w-full table-fixed text-left">
                    <thead>
                      <tr className="border-b border-sage-light">
                        {/* Checkbox */}
                        <th className="w-10 px-2 py-3 text-xs font-semibold uppercase text-forest sm:w-12 sm:px-3 sm:py-4">
                          <Checkbox
                            checked={
                              data.applications.length > 0 &&
                              data.applications.every((application) =>
                                selectedIds.includes(application.id),
                              )
                            }
                            onCheckedChange={(checked) => {
                              if (checked === true) {
                                setSelectedIds(
                                  data.applications.map(
                                    (application) => application.id,
                                  ),
                                );
                              } else {
                                setSelectedIds([]);
                              }
                            }}
                            className="cursor-pointer"
                          />
                        </th>
                        {/* Company */}
                        <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">
                          Company
                        </th>
                        {/* Position */}
                        <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">
                          Position
                        </th>
                        {/* Location */}
                        <th className="hidden px-3 py-4 text-xs font-semibold uppercase text-forest md:table-cell lg:px-4">
                          Location
                        </th>
                        {/* Status */}
                        <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">
                          Status
                        </th>
                        {/* Applied */}
                        <th className="hidden px-3 py-4 text-xs font-semibold uppercase text-forest sm:table-cell lg:px-4">
                          Applied
                        </th>
                        {/* Salary */}
                        <th className="hidden px-3 py-4 text-xs font-semibold uppercase text-forest md:table-cell lg:px-4">
                          Salary
                        </th>
                        {/* Actions */}
                        {/* <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">

                        Actions
                      </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.applications.map((application) => (
                        <DisplayCard
                          key={application.id}
                          application={application}
                          onSuccess={refetch}
                          selectedIds={selectedIds}
                          setSelectedIds={setSelectedIds}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={data.pagination.page}
                  totalPages={data.pagination.totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;

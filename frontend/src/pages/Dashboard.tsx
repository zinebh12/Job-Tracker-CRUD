import { useState } from "react";
import DisplayCard from "../components/DisplayCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
import NewApplicationForm from "../components/NewApplicationForm";
import { useApplications } from "../hooks/useApplications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@/components/smoothui/checkbox";
import { handleCreateApplication } from "./../handlers/applicationsHandlers";
import LoadingState from "@/components/states/LoadingState";
import { NoResultState } from "@/components/states/NoResultState";
import ConfirmDeleteState from "@/components/states/ConfirmDeleteState";
import type { ToastState } from "@/types/applications";
import Statistics from "@/components/Statistics";
import Header from "@/components/Header";
import EmptyState from "@/components/states/EmptyState";
import { AnimatePresence, motion } from "motion/react";

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
    return <LoadingState />;
  }

  if (data) {
    return (
      <div className="min-h-screen bg-sage-light font-manrope">
        {/* New Application Modal */}
        <AnimatePresence>
          {openNewApplicationForm && (
            <motion.div
              key="new-application"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Header onOpen={handleOpenApplicationForm} setToast={setToast} />
        </motion.div>
        <div className="space-y-4 px-4 pb-4">
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          >
            <Statistics data={data} />
          </motion.div>
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
          >
            <StatusFilter
              onStatusChange={handleStatusFilter}
              selectedStatus={statusFilter}
            />
          </motion.div>
          {/* Search + selected actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
            className="rounded-2xl bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-4">
              <Search onSearch={handleSearch} />
              <div className="flex flex-col gap-3 border-t border-sage-light pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-medium text-forest/60 sm:text-sm">
                  Showing
                  <span className="font-semibold text-forest">
                    {data.applications.length}
                  </span>
                  of
                  <span className="font-semibold text-forest">
                    {data.pagination.total}
                  </span>
                  applications
                </span>
                <AnimatePresence>
                  {selectedIds.length > 0 && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.95, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 10 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setConfirmDelete(!confirmDelete)}
                      className="flex w-fit cursor-pointer items-center gap-2 text-xs font-semibold text-red-600 underline decoration-red-300 underline-offset-4 transition hover:text-red-700 hover:decoration-red-600 sm:text-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
                      <span> Delete selected ({selectedIds.length}) </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
          {/* Delete confirmation */}
          <AnimatePresence>
            {confirmDelete && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <ConfirmDeleteState
                  selectedIds={selectedIds}
                  refetch={refetch}
                  setSelectedIds={setSelectedIds}
                  setDelete={setConfirmDelete}
                  setToast={setToast}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Search results */}
          <AnimatePresence mode="wait">
            {data.applications.length === 0 && searchTerm !== "" ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <NoResultState />
              </motion.div>
            ) : (
              <motion.div
                key="application-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Table */}
                <div className="w-full overflow-x-auto rounded-md bg-white">
                  <table className="w-full table-fixed text-left">
                    <thead>
                      <tr className="border-b border-sage-light">
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
                        <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">
                          Company
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">
                          Position
                        </th>
                        <th className="hidden px-3 py-4 text-xs font-semibold uppercase text-forest md:table-cell lg:px-4">
                          Location
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold uppercase text-forest sm:px-3 sm:py-4 lg:px-4">
                          Status
                        </th>
                        <th className="hidden px-3 py-4 text-xs font-semibold uppercase text-forest sm:table-cell lg:px-4">
                          Applied
                        </th>
                        <th className="hidden px-3 py-4 text-xs font-semibold uppercase text-forest md:table-cell lg:px-4">
                          Salary
                        </th>
                      </tr>
                    </thead>
                    <motion.tbody
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.04 } },
                      }}
                    >
                      {data.applications.map((application) => (
                        <motion.tr
                          key={application.id}
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <DisplayCard
                            application={application}
                            onSuccess={refetch}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                          />
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </table>
                </div>
                {data.applications.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EmptyState />
                  </motion.div>
                )}
                {/* Pagination */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Pagination
                    currentPage={data.pagination.page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={setPage}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
};

export default Dashboard;

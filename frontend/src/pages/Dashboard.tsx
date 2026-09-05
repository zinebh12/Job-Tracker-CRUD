import {
  createApplication,
  deleteSelectedApplications,
} from "./../services/applicationApi";
import { useState } from "react";
import DisplayCard from "../components/DisplayCard";
import type { ApplicationStatus } from "../types/applications";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
import NewApplicationForm from "../components/NewApplicationForm";
import { useApplications } from "../hooks/useApplications";
const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // Fetch applications from the backend API
  const { data, refetch } = useApplications(page, searchTerm, statusFilter);

  // handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to the first page when a search is performed
    // console.log("Search term updated:", term);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1); // Reset to the first page when a status filter is applied
  };

  const handleNewApplicationSubmit = async (
    company: string,
    position: string,
    location: string,
    status: ApplicationStatus,
    date_applied: Date | null,
    salary: number | null,
    notes: string,
  ) => {
    try {
      await createApplication({
        company,
        position,
        location,
        status,
        date_applied: date_applied
          ? date_applied.toISOString().split("T")[0]
          : null,
        salary,
        notes,
      });
      refetch();
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  const handleDeleteMultipleApplications = async () => {
    try {
      await deleteSelectedApplications(selectedIds);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.log("error deleting multiples applications", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Search onSearch={handleSearch} />
      <StatusFilter onStatusChange={handleStatusFilter} />
      <NewApplicationForm onSubmit={handleNewApplicationSubmit} />
      <button onClick={handleDeleteMultipleApplications}>
        Delete multiple
      </button>

      {data && (
        <>
          {data.applications.map((application) => (
            <DisplayCard
              key={application.id}
              application={application}
              onSuccess={refetch}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          ))}
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

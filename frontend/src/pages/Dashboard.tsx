import { useState } from "react";
import DisplayCard from "../components/DisplayCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
import NewApplicationForm from "../components/NewApplicationForm";
import { useApplications } from "../hooks/useApplications";

import {
  handleCreateApplication,
  handleDeleteMultipleApplications,
} from "./../handlers/applicationsHandlers";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openNewApplicationForm, setOpenNewApplicationForm] = useState(false);

  const { data, refetch, loading, error } = useApplications(
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

  return (
    <div>
      <h1>Dashboard</h1>

      <Search onSearch={handleSearch} />

      <StatusFilter onStatusChange={handleStatusFilter} />

      {openNewApplicationForm && (
        <NewApplicationForm
          onSubmit={(application) =>
            handleCreateApplication(application, refetch)
          }
          onCancel={handleOpenApplicationForm}
        />
      )}
      <button onClick={handleOpenApplicationForm}>
        Create New Application
      </button>

      <button
        onClick={() =>
          handleDeleteMultipleApplications(selectedIds, refetch, setSelectedIds)
        }
        disabled={selectedIds.length === 0}
      >
        Delete multiple
      </button>

      {error && <p>{error}</p>}

      {loading && <p>Loading applications...</p>}

      {!loading && data && data.applications.length === 0 && (
        <p>No applications found.</p>
      )}

      {!loading &&
        data &&
        data.applications.map((application) => (
          <DisplayCard
            key={application.id}
            application={application}
            onSuccess={refetch}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ))}

      {!loading && data && (
        <Pagination
          currentPage={data.pagination.page}
          totalPages={data.pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Dashboard;

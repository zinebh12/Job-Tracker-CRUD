import { getApplications } from "./../services/applicationApi";
import { useEffect, useState } from "react";
import DisplayCard from "../components/DisplayCard";
import type { ApplicationsResponse } from "../types/applications";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import StatusFilter from "../components/StatusFilter";
const Dashboard = () => {
  const [data, setData] = useState<ApplicationsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch applications from the backend API

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications(
          page,
          10,
          searchTerm,
          statusFilter,
        );
        setData(response);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [page, searchTerm, statusFilter]);

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

  return (
    <div>
      <h1>Dashboard</h1>
      <Search onSearch={handleSearch} />
      <StatusFilter onStatusChange={handleStatusFilter} />
      <button>Add Application</button>

      {data && (
        <>
          {data.applications.map((application) => (
            <DisplayCard key={application.id} application={application} />
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

import { getApplications } from "./../services/applicationApi";
import { useEffect, useState } from "react";
import DisplayCard from "../components/DisplayCard";
import type { ApplicationsResponse } from "../types/applications";
import Pagination from "../components/Pagination";
const Dashboard = () => {
  const [data, setData] = useState<ApplicationsResponse | null>(null);
  const [page, setPage] = useState(1);

  // Fetch applications from the backend API

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications(page, 10);
        setData(response);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [page]);

  return (
    <div>
      <h1>Dashboard</h1>
      {data && (
        <>
          {data?.applications.map((application) => (
            <DisplayCard key={application.id} application={application} />
          ))}
          <Pagination
            currentPage={data?.pagination.page}
            totalPages={data?.pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

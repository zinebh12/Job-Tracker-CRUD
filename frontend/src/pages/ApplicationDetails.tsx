import { useParams } from "react-router-dom";
import { getApplicationDetails } from "../services/applicationApi";
import { useEffect, useState } from "react";
import type { Application } from "../types/applications";
const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!id) return;
    const getApplication = async () => {
      try {
        const response = await getApplicationDetails(Number(id));
        setApplication(response);
        // console.log(response);
      } catch (error) {
        console.log("Failed to fetch application", error);
      }
    };
    getApplication();
  }, [id]);

  return (
    <>
      {application && (
        <div>
          <h1>{application.company}</h1> <p>Position: {application.position}</p>
          <p>Location: {application.location}</p>
          <p>Status: {application.status}</p>
          <p>Date Applied: {application.date_applied}</p>
          <p>Salary: {application.salary}</p>
          <p>Notes: {application.notes}</p>
        </div>
      )}
    </>
  );
};

export default ApplicationDetails;

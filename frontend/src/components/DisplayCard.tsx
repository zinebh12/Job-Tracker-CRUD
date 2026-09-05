import { useState } from "react";
import type { Application, ApplicationStatus } from "./../types/applications";
import EditApplication from "./EditApplication";
import { editApplication, deleteApplication } from "../services/applicationApi";
import { useNavigate } from "react-router-dom";
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
  const handleEditApplication = async (
    id: number,
    company: string,
    position: string,
    location: string,
    status: ApplicationStatus,
    date_applied: Date | null,
    salary: number | null,
    notes: string,
  ) => {
    try {
      await editApplication({
        id,
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
      onSuccess();
      setOpenEditApplication(false);
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  const handleDeleteApplication = async () => {
    try {
      await deleteApplication(application.id);
      onSuccess();
    } catch (error) {
      console.log("Error deleting applicatin", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <input
        type="checkbox"
        checked={selectedIds.includes(application.id)}
        onChange={() => {
          setSelectedIds((current) =>
            current.includes(application.id)
              ? current.filter((id) => id !== application.id)
              : [...current, application.id],
          );
        }}
      />
      <p>Company: {application.company}</p>
      <p>Position: {application.position}</p>
      <p>Location: {application.location}</p>
      <p>Status: {application.status}</p>
      <p>Date Applied: {application.date_applied}</p>
      <p>Salary: {application.salary}</p>
      <p>Notes: {application.notes}</p>
      <button
        onClick={() => {
          setOpenEditApplication(!openEditApplication);
          console.log(application.id);
        }}
      >
        Edit Application
      </button>
      {openEditApplication && (
        <EditApplication
          onEdit={handleEditApplication}
          application={application}
        />
      )}
      <button onClick={handleDeleteApplication}>Delete</button>
      <button onClick={() => navigate(`/application/${application.id}`)}>
        View details
      </button>
    </div>
  );
};

export default DisplayCard;

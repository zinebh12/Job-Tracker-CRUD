import { useState } from "react";
import type { Application } from "./../types/applications";
import {
  handleEditApplication,
  handleDeleteApplication,
} from "./../handlers/applicationsHandlers";
import EditApplication from "./EditApplication";
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
      <button onClick={() => setOpenEditApplication(!openEditApplication)}>
        Edit Application
      </button>
      {openEditApplication && (
        <EditApplication
          onEdit={(application) =>
            handleEditApplication(application, onSuccess)
          }
          application={application}
        />
      )}
      <button
        onClick={() => handleDeleteApplication(application.id, onSuccess)}
      >
        Delete
      </button>
      <button onClick={() => navigate(`/application/${application.id}`)}>
        View details
      </button>
    </div>
  );
};

export default DisplayCard;

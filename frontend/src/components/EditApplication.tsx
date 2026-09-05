import type {
  ApplicationStatus,
  EditApplicationProps,
} from "./../types/applications";
// import { editApplication } from "../services/applicationApi";
import { useState } from "react";
const EditApplication = ({ application, onEdit }: EditApplicationProps) => {
  const [formData, setFormData] = useState<{
    id: number;
    company: string;
    position: string;
    location: string;
    status: ApplicationStatus;
    date_applied: string;
    salary: string;
    notes: string;
  }>({
    id: application.id,
    company: application.company,
    position: application.position,
    location: application.location ?? "",
    status: application.status,
    date_applied: application.date_applied
      ? application.date_applied.split("T")[0]
      : "",
    salary: application.salary?.toString() ?? "",
    notes: application.notes ?? "",
  });

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(
      formData.id,
      formData.company,
      formData.position,
      formData.location,
      formData.status,
      formData.date_applied ? new Date(formData.date_applied) : null,
      formData.salary ? Number(formData.salary) : null,
      formData.notes,
    );
  };

  return (
    <form onSubmit={handleEdit}>
      <input
        value={formData.company}
        onChange={(e) => {
          setFormData({
            ...formData,
            company: e.target.value,
          });
        }}
        type="text"
        placeholder="Company Name"
        required
      />
      <input
        value={formData.position}
        onChange={(e) => {
          setFormData({
            ...formData,
            position: e.target.value,
          });
        }}
        type="text"
        placeholder="Position"
        required
      />
      <input
        value={formData.location}
        onChange={(e) => {
          setFormData({
            ...formData,
            location: e.target.value,
          });
        }}
        type="text"
        placeholder="Location"
      />
      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status: e.target.value as ApplicationStatus,
          })
        }
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        value={formData.date_applied}
        onChange={(e) => {
          setFormData({
            ...formData,
            date_applied: e.target.value,
          });
        }}
        type="date"
        placeholder="Date Applied"
      />
      <input
        value={formData.salary}
        onChange={(e) => {
          setFormData({
            ...formData,
            salary: e.target.value,
          });
        }}
        type="number"
        placeholder="Salary"
      />
      <textarea
        value={formData.notes}
        onChange={(e) => {
          setFormData({
            ...formData,
            notes: e.target.value,
          });
        }}
        placeholder="Notes"
      ></textarea>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditApplication;

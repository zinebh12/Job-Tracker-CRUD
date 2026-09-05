import type {
  NewApplicationFormProps,
  ApplicationStatus,
} from "./../types/applications";
import { useState } from "react";
const NewApplicationForm = ({ onSubmit }: NewApplicationFormProps) => {
  const [formData, setFormData] = useState<{
    company: string;
    position: string;
    location: string;
    status: ApplicationStatus;
    date_applied: string;
    salary: string;
    notes: string;
  }>({
    company: "",
    position: "",
    location: "",
    status: "Applied",
    date_applied: "",
    salary: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM SUBMITTED!");
    console.log("formdata", formData);
    onSubmit(
      formData.company,
      formData.position,
      formData.location,
      formData.status,
      formData.date_applied ? new Date(formData.date_applied) : null,
      formData.salary ? Number(formData.salary) : null,
      formData.notes,
    );
    console.log("formdata", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add Application</button>
    </form>
  );
};

export default NewApplicationForm;

import type {
  ApplicationStatus,
  EditApplicationProps,
} from "../types/applications";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
const EditApplication = ({
  application,
  onEdit,
  onCancel,
}: EditApplicationProps) => {
  const [formData, setFormData] = useState({
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

    onEdit({
      id: formData.id,
      company: formData.company,
      position: formData.position,
      location: formData.location,
      status: formData.status,
      date_applied: formData.date_applied || null,
      salary: formData.salary ? Number(formData.salary) : null,
      notes: formData.notes,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-sage/40 bg-white px-4 py-3 text-sm text-deep-forest outline-none transition focus:border-green focus:ring-2 focus:ring-green/20";

  return (
    <div className="fixed inset-0 h-full z-50 flex items-center justify-center bg-deep-forest/50 px-4 py-6 backdrop-blur-sm">
      <form
        onSubmit={handleEdit}
        className="w-full  max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-green">
              Application
            </p>

            <h2 className="text-2xl font-bold text-deep-forest">
              Edit application
            </h2>

            <p className="mt-1 text-sm text-forest/70">
              Update the information for {application.company}.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer flex w-9 h-9 items-center justify-center rounded-full text-xl text-forest transition hover:bg-sage-light hover:text-deep-forest"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faX} className="text-sm " />
          </button>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Company
            </label>

            <input
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value,
                })
              }
              type="text"
              required
              className={inputClass}
              placeholder="Company Name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Position
            </label>

            <input
              value={formData.position}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  position: e.target.value,
                })
              }
              type="text"
              required
              className={inputClass}
              placeholder="Position"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Location
            </label>

            <input
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              type="text"
              className={inputClass}
              placeholder="Location"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as ApplicationStatus,
                })
              }
              className={inputClass}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Date Applied
            </label>

            <input
              value={formData.date_applied}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date_applied: e.target.value,
                })
              }
              type="date"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Salary
            </label>

            <input
              value={formData.salary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: e.target.value,
                })
              }
              type="number"
              className={inputClass}
              placeholder="Salary"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-deep-forest">
              Notes
            </label>

            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              rows={4}
              className={`${inputClass} resize-none h-12`}
              placeholder="Add notes about this application..."
            />
          </div>
        </div>

        {/* Actions */}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sage/50 px-5 py-3 text-sm font-semibold text-forest transition hover:bg-sage-light"
          >
            <FontAwesomeIcon icon={faXmark} />
            Cancel
          </button>

          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest"
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplication;

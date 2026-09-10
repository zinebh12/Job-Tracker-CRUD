import type {
  NewApplicationFormSubmit,
  ApplicationStatus,
  ApplicationFormErrors,
} from "../types/applications";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { applicationSchema } from "@/schema/applicationSchema";
import { z } from "zod";
import { motion } from "motion/react";
const NewApplicationForm = ({
  onSubmit,
  onCancel,
}: NewApplicationFormSubmit) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    status: "Applied" as ApplicationStatus,
    date_applied: "",
    salary: "",
    notes: "",
  });
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const tree = z.treeifyError(result.error);

      setErrors({
        company: tree.properties?.company?.errors?.[0],
        position: tree.properties?.position?.errors?.[0],
      });
      return;
    }
    onSubmit({
      company: formData.company,
      position: formData.position,
      location: formData.location,
      status: formData.status,
      date_applied: formData.date_applied || null,
      salary: formData.salary ? Number(formData.salary) : null,
      notes: formData.notes,
    });
    setFormData({
      company: "",
      position: "",
      location: "",
      status: "Applied",
      date_applied: "",
      salary: "",
      notes: "",
    });
    onCancel();
  };
  const inputClass =
    "w-full rounded-xl border border-sage/40 bg-white px-4 py-3 text-sm text-deep-forest outline-none transition placeholder:text-forest/40 focus:border-green focus:ring-2 focus:ring-green/20";
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-deep-forest/50 backdrop-blur-sm md:overflow-y-hidden"
      >
        <div className="flex min-h-full items-start justify-center px-4 py-6 md:items-center md:px-0 md:py-0">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl sm:p-8"
          >
            {/* Header */}
            <div className="mb-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-green">
                New application
              </p>
              <h2 className="text-2xl font-bold text-deep-forest">
                Add an application
              </h2>
              <p className="mt-1 text-sm text-forest/70">
                Keep track of a new job opportunity.
              </p>
            </div>
            {/* Fields */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Company */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-deep-forest">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    setErrors({ ...errors, company: "" });
                  }}
                  type="text"
                  placeholder="Company Name"
                  className={`${inputClass} ${errors.company ? "border-red-500" : "border-sage"}`}
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-600">
                    {" "}
                    {errors.company}{" "}
                  </p>
                )}
              </div>
              {/* Position */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-deep-forest">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.position}
                  onChange={(e) => {
                    setFormData({ ...formData, position: e.target.value });
                    setErrors({ ...errors, position: "" });
                  }}
                  type="text"
                  placeholder="Position"
                  className={`${inputClass} ${errors.position ? "border-red-500" : "border-sage"}`}
                />
                {errors.position && (
                  <p className="mt-1 text-xs text-red-600">
                    {" "}
                    {errors.position}{" "}
                  </p>
                )}
              </div>
              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-deep-forest">
                  Location
                </label>
                <input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  type="text"
                  placeholder="Location"
                  className={inputClass}
                />
              </div>
              {/* Status */}
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
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-deep-forest">
                  Date Applied
                </label>
                <input
                  value={formData.date_applied}
                  onChange={(e) =>
                    setFormData({ ...formData, date_applied: e.target.value })
                  }
                  type="date"
                  className={inputClass}
                />
              </div>
              {/* Salary */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-deep-forest">
                  Salary
                </label>
                <input
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  type="number"
                  placeholder="Salary"
                  className={inputClass}
                />
              </div>
              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-deep-forest">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add notes about this application..."
                  className={`${inputClass} h-12 resize-none`}
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
                <FontAwesomeIcon icon={faXmark} /> Cancel
              </button>
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest"
              >
                <FontAwesomeIcon icon={faPlus} /> Create Application
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
  );
};
export default NewApplicationForm;

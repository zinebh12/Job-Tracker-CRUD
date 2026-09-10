import type { RegisterAuthFormType } from "@/types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
const RegisterForm = ({
  handleFormSubmit,
  formData,
  setFormData,
  setErrors,
  errors,
}: RegisterAuthFormType) => {
  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl border border-sage-light/60 bg-white p-6 shadow-lg sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-deep-forest">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Start tracking your job applications.
        </p>
      </div>
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-deep-forest"
        >
          Email
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({
                ...errors,
                email: "",
              });
            }}
            // required
            className={`w-full rounded-xl border bg-sage-light/10 py-3 pl-11 pr-4 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-green/20 ${errors.email ? "border-red-500 focus:border-red-500" : "border-sage-light focus:border-green"}`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>
      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-deep-forest"
        >
          Password
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faLock}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({
                ...errors,
                password: "",
              });
            }}
            className={`w-full rounded-xl border bg-sage-light/10 py-3 pl-11 pr-4 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-green/20 ${errors.password ? "border-red-500 focus:border-red-500" : "border-sage-light focus:border-green"}`}
          />
        </div>
        <p className="text-xs text-gray-400">
          Password must be at least 8 characters.
        </p>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
        )}
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-forest py-3 font-semibold text-white transition hover:bg-deep-forest active:scale-[0.98]"
      >
        <FontAwesomeIcon icon={faUserPlus} /> Create account
      </button>
    </form>
  );
};

export default RegisterForm;

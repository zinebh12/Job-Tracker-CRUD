import type { RegisterAuthFormType } from "@/types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
const RegisterForm = ({
  handleFormSubmit,
  formData,
  setFormData,
}: RegisterAuthFormType) => {
  return (
    <form
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
      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-semibold text-deep-forest"
        >
          Name
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            required
            className="w-full rounded-xl border border-sage-light bg-sage-light/10 py-3 pl-11 pr-4 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:border-green focus:bg-white focus:ring-2 focus:ring-green/20"
          />
        </div>
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
            }}
            required
            className="w-full rounded-xl border border-sage-light bg-sage-light/10 py-3 pl-11 pr-4 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:border-green focus:bg-white focus:ring-2 focus:ring-green/20"
          />
        </div>
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
            }}
            required
            className="w-full rounded-xl border border-sage-light bg-sage-light/10 py-3 pl-11 pr-4 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:border-green focus:bg-white focus:ring-2 focus:ring-green/20"
          />
        </div>
        <p className="text-xs text-gray-400">
          Password must be at least 8 characters.
        </p>
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

import { useState } from "react";
import type { LoginAuthFormType } from "@/types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "motion/react";
const LoginForm = ({
  handleLogin,
  formData,
  setFormData,
  setErrors,
  errors,
}: LoginAuthFormType) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <motion.form
      noValidate
      onSubmit={handleLogin}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md space-y-5 rounded-2xl border border-sage-light/60 bg-white p-6 shadow-lg sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-deep-forest">Welcome back</h2>
        <p className="mt-1 text-sm text-gray-500">
          Log in to continue tracking your applications.
        </p>
      </motion.div>
      <AnimatePresence>
        {errors.general && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-600"
          >
            {errors.general}
          </motion.p>
        )}
      </AnimatePresence>
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.14, ease: "easeOut" }}
        className="space-y-2"
      >
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
              setErrors({ ...errors, email: "" });
            }}
            className={`w-full rounded-xl border bg-sage-light/10 py-3 pl-11 pr-4 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-green/20 ${errors.email ? "border-red-500 focus:border-red-500" : "border-sage-light focus:border-green"}`}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-1 text-xs text-red-600"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Password */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        className="space-y-2"
      >
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
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: "", general: "" });
            }}
            className={`w-full rounded-xl border bg-sage-light/10 py-3 pl-11 pr-12 text-sm text-deep-forest outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-green/20 ${errors.password ? "border-red-500 focus:border-red-500" : "border-sage-light focus:border-green"}`}
          />
          <motion.button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition hover:text-deep-forest"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </motion.button>
        </div>
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-1 text-xs text-red-600"
            >
              {errors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-forest py-3 font-semibold text-white transition hover:bg-deep-forest"
      >
        <FontAwesomeIcon icon={faRightToBracket} /> Login
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ToastState } from "@/types/applications";
import type { SetErrors } from "@/types/auth";
import LoginForm from "@/components/LoginForm";
import { loginSchema } from "@/schema/authSchema";
import { z } from "zod";
const Login = ({
  setToast,
}: {
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [errors, setErrors] = useState<SetErrors>({});

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const tree = z.treeifyError(result.error);

      setErrors({
        email: tree.properties?.email?.errors?.[0],
        password: tree.properties?.password?.errors?.[0],
      });

      return;
    }
    try {
      await login(formData);
      setToast({
        type: "success",
        message: "Logged in successfully!",
      });
      navigate("/dashboard");
    } catch {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-sage-light/30 px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-deep-forest">
            Login to your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back to your job application tracker.
          </p>
        </div>
        <LoginForm
          handleLogin={handleLogin}
          formData={formData}
          setFormData={setFormData}
          setErrors={setErrors}
          errors={errors}
        />
        <p className="mt-6 text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="cursor-pointer font-semibold text-forest transition hover:text-deep-forest hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </main>
  );
};

export default Login;

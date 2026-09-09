import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ToastState } from "@/types/applications";
import LoginForm from "@/components/LoginForm";
const Login = ({
  setToast,
}: {
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      setToast({
        type: "success",
        message: "Logged in successfully!",
      });
      navigate("/dashboard");
    } catch (error) {
      setToast({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to log in.",
      });
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

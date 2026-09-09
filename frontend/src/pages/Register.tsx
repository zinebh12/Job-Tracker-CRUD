import { useState } from "react";
import { register } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import type { ToastState } from "@/types/applications";
import RegisterForm from "@/components/RegisterForm";
const Register = ({
  setToast,
}: {
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async () => {
    try {
      const response = await register(formData);
      console.log("Registration successful:", response);
      // redirect to login
      setToast({
        type: "success",
        message: "Account created successfully!",
      });
      navigate("/login");
    } catch (error) {
      setToast({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create account.",
      });
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-sage-light/30 px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-deep-forest">
            Create a new account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Build your personal job application tracker.
          </p>
        </div>
        <RegisterForm
          handleFormSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
        />
        <p className="mt-6 text-sm text-gray-500">
          Already have an account?
          {" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-forest transition hover:text-deep-forest hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </main>
  );
};

export default Register;

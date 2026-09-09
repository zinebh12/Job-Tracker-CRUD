import { useState } from "react";
import { register } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import type { ToastState } from "@/types/applications";
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

  const handleRegistration = async () => {
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
    <div>
      <h1>Create a new account</h1>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          required
        />
        <input
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          required
        />
        <input
          type="text"
          placeholder="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          required
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default Register;

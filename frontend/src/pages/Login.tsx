import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ToastState } from "@/types/applications";
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
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

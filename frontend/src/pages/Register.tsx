import { useState } from "react";
import { register } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
const Register = () => {
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
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
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

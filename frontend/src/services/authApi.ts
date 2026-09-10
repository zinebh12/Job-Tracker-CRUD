import type { RegisterData, LoginData } from "@/types/auth";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const register = async (user: RegisterData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to register user");
  }
  return data;
};

export const login = async (user: LoginData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Invalid email or password");
  }

  return data;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to logout");
  }

  return data;
};

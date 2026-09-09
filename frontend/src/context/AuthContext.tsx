import { useEffect, useState, type ReactNode } from "react";
import type { User, LoginData } from "./../types/auth";
import {
  login as loginUser,
  logout as logoutUser,
} from "./../services/authApi";
import { AuthContext } from "./authContext";
const API_BASE_URL = "http://localhost:5000/api/auth/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(API_BASE_URL, { credentials: "include" });
        if (!response.ok) {
          setUser(null);
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to check authentication:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
    const response = await loginUser(data);
    setUser(response.user);
  };
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

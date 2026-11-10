import { createContext, useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register
  const register = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);

    toast.success("Account created successfully!");

    return data.user;
  };

  // Login
  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);

    toast.success("Welcome back!");

    return data.user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    toast.success("Logged out successfully!");
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
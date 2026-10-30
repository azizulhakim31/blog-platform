
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = ({ name, email, password }) => {
    const newUser = {
      name,
      email,
      username: email.split("@")[0],
    };

    setUser(newUser);
    toast.success("Account created successfully!");
  };

  const login = ({ email }) => {
    const loggedInUser = {
      name: email.split("@")[0],
      email,
      username: email.split("@")[0],
    };

    setUser(loggedInUser);
    toast.success("Welcome back!");
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const value = {
    user,
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

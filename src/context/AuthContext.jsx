import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

// Create context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  // State to store user information
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // login function
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/v1/login", {
        email,
        password,
      });

      // Save token di localStorage
      localStorage.setItem("token", response.data.token);

      // Set user dan authentication state
      setUser(response.data.user);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      // Delete token jika login gagal
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Register Function
  const register = async (userData) => {
    try {
      const response = await api.post("/api/v1/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Logout Function
  const logout = () => {
    // Delete token dari localStorage
    localStorage.removeItem("token");

    // Reset state
    setUser(null);
    setIsAuthenticated(false);
  };

  // Cek autentikasi saat komponen dimount
  useEffect(() => {
    const token = localStorage.getItem("token");

    const verifyToken = async () => {
      setIsLoading(true);
      try {
        if (token) {
          // Menambahkan endpoint verify token di sini jika tersedia di API
          const response = await api.get("/api/v1/user");
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Delete token jika tidak valid
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Value yang akan di-provide
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook untuk menggunakan auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw error jika hook digunakan di luar provider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

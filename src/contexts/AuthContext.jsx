/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { login, getProfile, register } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserData = async () => {
    try {
      const userData = await getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      await setUserData();
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const registerUser = async (username, email, password) => {
    const data = await register(username, email, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

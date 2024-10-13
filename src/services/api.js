import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseURL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));

    const isExpired = tokenPayload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

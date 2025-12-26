import axios from "axios";

function getSafeToken() {
  const t = localStorage.getItem("token");
  if (!t) return null;
  if (t === "null" || t === "undefined") return null;
  return t;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  const token = getSafeToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

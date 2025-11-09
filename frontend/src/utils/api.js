import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://blog-platform-3-qvh1.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // if using cookies, else remove
});

// attach token helper
export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export default api;

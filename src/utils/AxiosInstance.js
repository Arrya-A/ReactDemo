// src/utils/axiosInstance.js
import axios from "axios";

// Create an instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_NAME}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("accessToken");
      clearSession();
      // localStorage.removeItem("user");
      window.location = "/"; // force redirect
    }

    return Promise.reject(
      error.response?.data || "Something went wrong. Please try again."
    );
  }
);

export default axiosInstance;

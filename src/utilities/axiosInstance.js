import axios from "axios";

axios.defaults.baseURL = "http://deebecommerce-001-site1.ctempurl.com/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const lang = sessionStorage.getItem("lang") || "ar";
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["lang"] = lang;
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

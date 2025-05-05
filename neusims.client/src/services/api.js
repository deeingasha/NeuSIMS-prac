// import axios from "axios";

// // Create axios instance with default config
// const api = axios.create({
//     // No need for baseURL as we're using relative paths with the proxy
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });
// // Add request interceptor logging
// api.interceptors.request.use(
//   (config) => {
//     console.log("Making request to:", config.url);
//     console.log("Request config:", config);
//     return config;
//   },
//   (error) => {
//     console.error("Request interceptor error:", error);
//     return Promise.reject(error);
//   }
// );

// // Request interceptor for adding auth token
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => {
//     console.log("Response received:", response);
//     return response;
//   },
//     (error) => {
//         if (error.response?.status === 401) {
//       // Handle unauthorized access
//             localStorage.removeItem("token");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

// // Authentication methods
// export const authService = {
//     login: (credentials) => api.post("/api/Login/Authentication", credentials),
//     // Add more auth methods as needed
// };

// export default api;

import axios from "axios";
import { AuthError } from "@utils/apiErrorHandler";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Frontend Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("FE Request Error:", error);
    return Promise.reject(error);
  }
);
// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("FE Response:", response);
    return response;
  },
  (error) => {
    console.error("Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    // Don't handle 401s here for login/signup endpoints
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/auth/login") &&
      !error.config.url.includes("/auth/signup")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      // Let the component handle the navigation
      error.shouldRedirect = true;
    }
    return Promise.reject(error);
  }
);

export default api;

import api from "./api";
import { handleAuthError } from "../utils/apiErrorHandler"; // Adjust the import path as necessary
import { ERROR_MESSAGES } from "../utils/errorConstants"; // Adjust the import path as necessary

export const authService = {
  signup: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        return response.data;
      }
      throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  logout: () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Clear any other session/user data you might have
    localStorage.removeItem("selectedTab");
    console.log("User logged out and localStorage cleared.");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  updatePassword: async (entityNo, secretWord, newPassword) => {
    try {
      const response = await api.post("/auth/UpdatePassword", {
        entityNo: entityNo,
        secretword: secretWord,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to update password. Please try again.");
    }
  },
  //login: async (credentials) => {
  //  try {
  //      const response = await api.post("/api/Login/Authentication", credentials);
  //    if (response.data.token) {
  //      localStorage.setItem("token", response.data.token);
  //    }
  //    return response.data;
  //  } catch (error) {
  //    throw error.response?.data || error.message;
  //  }
  //},

  //   signup: async (userData) => {
  //     try {
  //       const response = await api.post("/auth/signup", userData);
  //       return response.data;
  //     } catch (error) {
  //       throw error.response?.data || error.message;
  //     }
  //   },

  //signup: async (userData) => {
  //  try {
  //    console.log("Making signup request to:", `${api.BASE_URL}/auth/signup`);
  //    console.log("With data:", userData);

  //    const response = await api.post("api/auth/signup", userData);
  //    console.log("Signup response received:", response);

  //    return response.data;
  //  } catch (error) {
  //    console.error("Signup error in service:", error);
  //    if (error.response) {
  //      // The request was made and the server responded with a status code
  //      // that falls out of the range of 2xx
  //      console.error("Error response data:", error.response.data);
  //      console.error("Error response status:", error.response.status);
  //      console.error("Error response headers:", error.response.headers);
  //      throw error.response.data;
  //    } else if (error.request) {
  //      // The request was made but no response was received
  //      console.error("No response received:", error.request);
  //      throw new Error("No response from server");
  //    } else {
  //      // Something happened in setting up the request that triggered an Error
  //      console.error("Error setting up request:", error.message);
  //      throw error;
  //    }
  //  }
  //},
};

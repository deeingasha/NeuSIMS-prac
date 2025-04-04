import api from "./api";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //   signup: async (userData) => {
  //     try {
  //       const response = await api.post("/auth/signup", userData);
  //       return response.data;
  //     } catch (error) {
  //       throw error.response?.data || error.message;
  //     }
  //   },

  signup: async (userData) => {
    try {
      console.log("Making signup request to:", `${api.BASE_URL}/auth/signup`);
      console.log("With data:", userData);

      const response = await api.post("/auth/signup", userData);
      console.log("Signup response received:", response);

      return response.data;
    } catch (error) {
      console.error("Signup error in service:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        throw new Error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        throw error;
      }
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

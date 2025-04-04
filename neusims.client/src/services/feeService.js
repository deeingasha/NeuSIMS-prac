import api from "./api";
import { handleApiError } from "../utils/apiErrorHandler";

export const feeService = {
  getAllFees: async () => {
    try {
      const response = await api.get("/fees");
      return response.data;
    } catch (error) {
      // Log error for debugging
      console.error("Error fetching fees:", error);

      // Rethrow with meaningful message
      throw new Error(error.response?.data?.message || "Failed to fetch fees");
    }
  },

  // Batch update multiple fees at once, usinga alt cleaner code
  batchUpdateFees: async (changes) => {
    const response = await api
      .get("/fees/batch", changes)
      .catch(handleApiError);
    return response.data;
  },

  // Single fee operations
  createFee: async (feeData) => {
    const response = await api.post("/fees", feeData).catch(handleApiError);
    return response.data;
  },

  updateFee: async (id, feeData) => {
    const response = await api
      .put(`/fees/${id}`, feeData)
      .catch(handleApiError);
    return response.data;
  },

  deleteFee: async (id) => {
    await api.delete(`/fees/${id}`).catch(handleApiError);
  },
};

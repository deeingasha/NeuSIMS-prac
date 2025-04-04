export const handleApiError = (error) => {
  // Log error for debugging
  console.error("API Error:", error);

  // Check for specific error types
  if (error.response) {
    // Server responded with error status
    console.error("Error response:", error.response.data);
    throw new Error(error.response?.data?.message || "Server error");
  } else if (error.request) {
    // Request made but no response
    console.error("No response received:", error.request);
    throw new Error("No response from server");
  } else {
    // Request setup error
    console.error("Request setup error:", error.message);
    throw new Error(error.message || "Request failed");
  }
};

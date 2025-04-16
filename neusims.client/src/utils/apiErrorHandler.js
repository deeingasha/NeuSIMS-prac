export class ApiError extends Error {
  constructor(message, statusCode, type = "API_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

export class AuthError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode, "AUTH_ERROR");
  }
}
export const handleApiError = (error, context = "API") => {
  // Log error for debugging
  console.error(`${context} Error:`, error);

  if (error.response) {
    // Server responded with error status
    console.error("Error response:", error.response.data);
    return new ApiError(
      error.response?.data?.message || "Server error",
      error.response.status
    );
  }

  if (error.request) {
    // Request made but no response
    console.error("No response received:", error.request);
    return new ApiError("No response from server", 503);
  }

  // Request setup error
  console.error("Request setup error:", error.message);
  return new ApiError(error.message || "Request failed", 500);
};

export const handleAuthError = (error) => {
  return handleApiError(error, "Auth");
};

// export const handleApiError = (error) => {
//   // Log error for debugging
//   console.error("API Error:", error);

//   // Check for specific error types
//   if (error.response) {
//     // Server responded with error status
//     console.error("Error response:", error.response.data);
//     throw new Error(error.response?.data?.message || "Server error");
//   } else if (error.request) {
//     // Request made but no response
//     console.error("No response received:", error.request);
//     throw new Error("No response from server");
//   } else {
//     // Request setup error
//     console.error("Request setup error:", error.message);
//     throw new Error(error.message || "Request failed");
//   }
// };

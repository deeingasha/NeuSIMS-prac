import { ERROR_MESSAGES } from "./errorConstants";

export const getErrorMessage = (error) => {
  if (error.type === "AUTH_ERROR") {
    return error.message || ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS;
  }

  if (error.type === "API_ERROR") {
    return error.message || ERROR_MESSAGES.API.SERVER_ERROR;
  }

  return ERROR_MESSAGES.DEFAULT;
};

export const isAuthError = (error) => {
  return error.type === "AUTH_ERROR" || error.statusCode === 401;
};

export const shouldRedirectToLogin = (error) => {
  return isAuthError(error) && error.statusCode === 401;
};

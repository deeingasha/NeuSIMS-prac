export const ERROR_TYPES = {
    API_ERROR: 'API_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR'
};

export const ERROR_MESSAGES = {
    DEFAULT: 'An unexpected error occurred',
    NETWORK: 'Network connection error',
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid username or password',
        SESSION_EXPIRED: 'Your session has expired',
        UNAUTHORIZED: 'You are not authorized to perform this action'
    },
    API: {
        SERVER_ERROR: 'Server error occurred',
        TIMEOUT: 'Request timed out',
        NOT_FOUND: 'Resource not found'
    }
};
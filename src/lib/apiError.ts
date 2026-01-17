
import { AxiosError } from 'axios';

/**
 * Defines the shape of a standardized API error object.
 */
export interface IApiError {
  /** A unique code for the type of error. */
  code: string;
  /** A human-readable message describing the error. */
  message: string;
  /** The HTTP status code, if applicable. */
  status?: number;
  /** Additional details or the original error object. */
  details?: unknown;
}

/**
 * Custom error class for API-related exceptions.
 * This helps in distinguishing API errors from other runtime errors.
 */
export class ApiError extends Error implements IApiError {
  code: string;
  status?: number;
  details?: unknown;

  constructor({ code, message, status, details }: IApiError) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Analyzes an Axios error and transforms it into a standardized ApiError.
 * @param error The error object caught from an Axios request.
 * @returns An instance of ApiError.
 */
export const handleAxiosError = (error: AxiosError): ApiError => {
  if (error.response) {
    // --- Server responded with a status code outside the 2xx range ---
    const { status, data } = error.response;
    const errorMessage = (data as any)?.message || `Request failed with status ${status}`;

    switch (status) {
      case 400:
        return new ApiError({
          code: 'BAD_REQUEST',
          message: 'The server could not process the request due to invalid syntax.',
          status,
          details: data,
        });
      case 401:
        return new ApiError({
          code: 'UNAUTHORIZED',
          message: 'Authentication failed. Please check your credentials and try again.',
          status,
          details: data,
        });
      case 403:
        return new ApiError({
          code: 'FORBIDDEN',
          message: "You don't have permission to access this resource.",
          status,
          details: data,
        });
      case 404:
        return new ApiError({
          code: 'NOT_FOUND',
          message: 'The requested resource could not be found.',
          status,
          details: data,
        });
      case 500:
        return new ApiError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred on the server. Please try again later.',
          status,
          details: data,
        });
      default:
        return new ApiError({
          code: 'HTTP_ERROR',
          message: errorMessage,
          status,
          details: data,
        });
    }
  } else if (error.request) {
    // --- The request was made but no response was received ---
    // This typically indicates a network error (e.g., offline, DNS issue, CORS)
    return new ApiError({
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your internet connection and try again.',
      details: error.message,
    });
  } else if (error.code === 'ECONNABORTED') {
    // --- The request timed out ---
    return new ApiError({
      code: 'TIMEOUT_ERROR',
      message: 'The request timed out. Please try again later.',
      details: error.message,
    });
  } else {
    // --- Something else happened in setting up the request ---
    return new ApiError({
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred. Please see details for more information.',
      details: error.message,
    });
  }
};

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { handleAxiosError } from './apiError';

// --- UTILITIES ---

/**
 * Retrieves the authentication token from storage.
 * Replace this with your actual token management logic (e.g., from localStorage, state management).
 */
const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Could not retrieve auth token from localStorage', error);
    return null;
  }
};

// --- AXIOS INSTANCE CONFIGURATION ---

const apiClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_URL || `http://localhost:3000`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10-second timeout
});

// --- INTERCEPTORS ---

/**
 * Request Interceptor: Injects the auth token into the request headers.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // This part is rarely hit, as it's for errors in request *creation*
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Handles successful responses and errors globally.
 */
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // You can transform the response data here if needed
    return response;
  },
  (error: AxiosError) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Here we use our custom error handler to standardize the error
    const apiError = handleAxiosError(error);

    // TODO: Implement global error handling logic, e.g.:
    // - Redirect to login on 401 Unauthorized
    // - Show a global notification/toast for certain errors

    if (apiError.code === 'UNAUTHORIZED') {
      // Example: window.location.href = '/login';
      console.warn('Redirecting to login due to unauthorized error.');
    }

    // Reject the promise with our standardized error object
    return Promise.reject(apiError);
  }
);

export default apiClient;

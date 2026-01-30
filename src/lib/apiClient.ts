import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { handleAxiosError } from './apiError';
import { clearAuthSession, getAccessToken, getRefreshToken } from '@/utils/auth.storage';

// --- UTILITIES ---


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
    const token = getAccessToken();
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


type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };
type RefreshResponse = { accessToken: string; refreshToken: string };


apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;

    // فقط 401
    if (!original || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const url = original.url ?? "";

    const isAuth = url.includes("/auth/login") || url.includes("/auth/refresh");

    if (isAuth) return Promise.reject(error);

    if (original._retry) {
      clearAuthSession();
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      // refresh
      const { data } = await apiClient.post<RefreshResponse>("/auth/refresh", {
        refreshToken,
        expiresInMins: 30,
      });

      // save new tokens
      setTokens(data.accessToken, data.refreshToken);

      // retry original request with new access token
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return apiClient(original);
    } catch (e) {
      clearAuthSession();
      return Promise.reject(e);
    }
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
function setTokens(accessToken: string, refreshToken: string) {
  throw new Error('Function not implemented.');
}


import { ZodType } from 'zod';

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  signal?: AbortSignal; // For cancelling requests (Speed)
  schema?: ZodType;   // For validating response (Security)
}

export interface IHttpClient {
  get: <T>(url: string, config?: RequestConfig) => Promise<T>;
  post: <T>(url: string, data: any, config?: RequestConfig) => Promise<T>;
  put: <T>(url: string, data: any, config?: RequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: RequestConfig) => Promise<T>;
  patch: <T>(url: string, data: any, config?: RequestConfig) => Promise<T>;
}

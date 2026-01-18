import axios, { AxiosError, AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import { IHttpClient, RequestConfig } from './http.types';

export class AxiosAdapter implements IHttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.warn('Unauthorized - Session might be expired');
          // window.location.href = '/auth/login'; // TODO: Handle Redirect
        }
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.get(url, {
      ...config,

      signal: config?.signal,
    });

    // Runtime response validation using the provided Zod schema

    if (config?.schema) {
      try {
        return config.schema.parse(response.data) as T;
      } catch (error) {
        if (error instanceof ZodError) {
          console.error(`[Validation Error] at ${url}:`, error.format());
        } else {
          console.error(`[Unknown Validation Error] at ${url}:`, error);
        }

        throw new Error('Server response does not match the expected schema.');
      }
    }

    return response.data;
  }

  async post<T>(url: string, data: any, config?: RequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data: any, config?: RequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  async patch<T>(url: string, data: any, config?: RequestConfig): Promise<T> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }
}

// Singleton Export
export const httpClient = new AxiosAdapter(import.meta.env.VITE_API_URL);

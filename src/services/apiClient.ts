import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from "@constants/index";
import { ApiResponse } from "@/types";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data.data as T;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data.data as T;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data.data as T;
  }

  async patch<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data);
    return response.data.data as T;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data.data as T;
  }

  // File upload
  async uploadFile<T>(url: string, formData: FormData): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data as T;
  }

  // Get raw response (for downloads, etc.)
  async getRaw(url: string, config?: AxiosRequestConfig) {
    return this.client.get(url, config);
  }
}

export const apiClient = new ApiClient();

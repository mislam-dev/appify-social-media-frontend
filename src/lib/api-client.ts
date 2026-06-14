import { tokenStorage } from "@/lib/token-storage";
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export interface ApiEnvelope<T> {
  status_code: number;
  message: string;
  data: T;
  meta?: Record<string, string | number>;
  _links?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = tokenStorage.get();
    if (tokens?.auth_token) {
      config.headers.set("Authorization", `Bearer ${tokens.auth_token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string | string[] }>) => {
    const status = error.response?.status ?? 0;
    const raw = error.response?.data?.message;
    const message = Array.isArray(raw)
      ? raw.join(", ")
      : (raw ?? error.message ?? "Unexpected network error");

    if (status === 401) {
      tokenStorage.clear();
    }

    return Promise.reject(new ApiError(message, status, error.response?.data));
  },
);

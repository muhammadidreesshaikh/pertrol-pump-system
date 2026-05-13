import { apiClient } from "./apiClient";
import { User, UserRole } from "@/types";
import { STORAGE_KEYS } from "@constants/index";

const ENDPOINTS = {
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  REFRESH: "/auth/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
};

export const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post<{ user: User; token: string }>(
      ENDPOINTS.LOGIN,
      {
        email,
        password,
      },
    );
    if (response && response.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
    }
    return response;
  },

  async register(
    email: string,
    password: string,
    name: string,
    role: UserRole = UserRole.MANAGER,
  ) {
    return apiClient.post<{ user: User; token: string }>(ENDPOINTS.REGISTER, {
      email,
      password,
      name,
      role,
    });
  },

  async logout() {
    try {
      await apiClient.post(ENDPOINTS.LOGOUT, {});
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  async getCurrentUser() {
    return apiClient.get<User>(ENDPOINTS.ME);
  },

  async forgotPassword(email: string) {
    return apiClient.post(`${ENDPOINTS.FORGOT_PASSWORD}`, { email });
  },

  async resetPassword(token: string, newPassword: string) {
    return apiClient.post(`${ENDPOINTS.RESET_PASSWORD}`, {
      token,
      newPassword,
    });
  },

  async refreshToken() {
    return apiClient.post<{ token: string }>(ENDPOINTS.REFRESH, {});
  },

  getStoredUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};

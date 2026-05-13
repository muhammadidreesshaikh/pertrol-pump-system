import { apiClient } from "./apiClient";
import { User, UserRole } from "@/types";
import { STORAGE_KEYS } from "@constants/index";

const DEMO_USERS: Record<
  string,
  {
    password: string;
    user: User;
    token: string;
  }
> = {
  "admin@fuelhub.com": {
    password: "password",
    token: "demo-admin-token",
    user: {
      id: "demo-admin",
      email: "admin@fuelhub.com",
      name: "Admin User",
      role: UserRole.ADMIN,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  "manager@fuelhub.com": {
    password: "password",
    token: "demo-manager-token",
    user: {
      id: "demo-manager",
      email: "manager@fuelhub.com",
      name: "Manager User",
      role: UserRole.MANAGER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  "accountant@fuelhub.com": {
    password: "password",
    token: "demo-accountant-token",
    user: {
      id: "demo-accountant",
      email: "accountant@fuelhub.com",
      name: "Accountant User",
      role: UserRole.ACCOUNTANT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

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
    const normalizedEmail = email.trim().toLowerCase();
    const demoAccount = DEMO_USERS[normalizedEmail];

    if (demoAccount && demoAccount.password === password) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, demoAccount.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(demoAccount.user));
      return {
        user: demoAccount.user,
        token: demoAccount.token,
      };
    }

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

  getDemoCredentials() {
    return Object.values(DEMO_USERS).map(({ user, password }) => ({
      email: user.email,
      password,
      role: user.role,
      name: user.name,
    }));
  },
};

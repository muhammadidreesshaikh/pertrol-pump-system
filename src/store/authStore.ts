import { create } from "zustand";
import { User, UserRole, AuthState } from "@/types";
import { authService } from "@services/authService";
import { STORAGE_KEYS } from "@constants/index";

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role?: UserRole,
  ) => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login(email, password);
      set({
        isAuthenticated: true,
        user: response.user,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        loading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      set({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  register: async (
    email: string,
    password: string,
    name: string,
    role = UserRole.MANAGER,
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.register(email, password, name, role);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      set({
        isAuthenticated: true,
        user: response.user,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  checkAuth: () => {
    const token = authService.getStoredToken();
    const user = authService.getStoredUser();
    set({
      isAuthenticated: !!token && !!user,
      user: user || null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));

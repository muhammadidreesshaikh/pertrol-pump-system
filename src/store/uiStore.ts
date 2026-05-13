import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  isDarkMode: boolean;
  notificationOpen: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  toggleNotifications: () => void;
  addNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  isDarkMode: false,
  notificationOpen: false,
  notifications: [],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),

  toggleNotifications: () => set((state) => ({ notificationOpen: !state.notificationOpen })),

  addNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 5000);
  },

  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));

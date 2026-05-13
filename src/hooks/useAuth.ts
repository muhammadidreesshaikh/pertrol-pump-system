import { useAuthStore } from "@store/authStore";
import { UserRole } from "@/types";

export const useAuth = () => {
  const authStore = useAuthStore();

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!authStore.user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(authStore.user.role);
  };

  const hasAllRoles = (roles: UserRole[]) => {
    if (!authStore.user) return false;
    return roles.every((role) => authStore.user?.role === role);
  };

  const isAdmin = () => authStore.user?.role === UserRole.ADMIN;
  const isManager = () => authStore.user?.role === UserRole.MANAGER;
  const isAccountant = () => authStore.user?.role === UserRole.ACCOUNTANT;

  return {
    ...authStore,
    hasRole,
    hasAllRoles,
    isAdmin,
    isManager,
    isAccountant,
  };
};

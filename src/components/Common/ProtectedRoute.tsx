import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole | UserRole[];
}

export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles) {
    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];
    if (!roles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

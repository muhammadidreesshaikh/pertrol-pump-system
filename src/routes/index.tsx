import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@pages/Auth/LoginPage";
import { DashboardPage } from "@pages/Dashboard/DashboardPage";
import { ProtectedRoute } from "@components/Common/ProtectedRoute";
import { MainLayout } from "@components/Layout/MainLayout";
import { UserRole } from "@/types";

// Lazy load pages
import React from "react";

const PetrolPumpListPage = React.lazy(() =>
  import("@pages/PetrolPump/PetrolPumpListPage").then((m) => ({
    default: m.default,
  })),
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DashboardPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/petrol-pumps",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <PetrolPumpListPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  // Add more routes as needed
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

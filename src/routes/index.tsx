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

const FuelPurchaseListPage = React.lazy(() =>
  import("@pages/FuelPurchase/FuelPurchaseListPage").then((m) => ({
    default: m.FuelPurchaseListPage,
  })),
);

const TankerListPage = React.lazy(() =>
  import("@pages/Tanker/TankerListPage").then((m) => ({
    default: m.TankerListPage,
  })),
);

const ClientListPage = React.lazy(() =>
  import("@pages/Client/ClientListPage").then((m) => ({
    default: m.ClientListPage,
  })),
);

const DeliveryManagementPage = React.lazy(() =>
  import("@pages/Delivery/DeliveryManagementPage").then((m) => ({
    default: m.DeliveryManagementPage,
  })),
);

const SalesAnalyticsPage = React.lazy(() =>
  import("@pages/Sales/SalesAnalyticsPage").then((m) => ({
    default: m.SalesAnalyticsPage,
  })),
);

const ReportsPage = React.lazy(() =>
  import("@pages/Reports/ReportsPage").then((m) => ({
    default: m.ReportsPage,
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
  {
    path: "/fuel-purchases",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <FuelPurchaseListPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tankers",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <TankerListPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/clients",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ClientListPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/deliveries",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <DeliveryManagementPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <SalesAnalyticsPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.ACCOUNTANT]}>
        <MainLayout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ReportsPage />
          </React.Suspense>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

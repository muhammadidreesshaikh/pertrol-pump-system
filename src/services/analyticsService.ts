import { apiClient } from "./apiClient";
import {
  SalesAnalytics,
  PumpWiseSales,
  ClientWiseSales,
  DashboardStats,
  ReportData,
} from "@/types";

const ENDPOINTS = {
  ANALYTICS: "/analytics",
  SALES: "/analytics/sales",
  PUMPS: "/analytics/pumps",
  CLIENTS: "/analytics/clients",
  DASHBOARD: "/dashboard/stats",
  REPORTS: "/reports",
};

export const analyticsService = {
  // Dashboard Stats
  async getDashboardStats() {
    return apiClient.get<DashboardStats>(ENDPOINTS.DASHBOARD);
  },

  // Sales Analytics
  async getSalesAnalytics(startDate: string, endDate: string) {
    return apiClient.get<SalesAnalytics[]>(ENDPOINTS.SALES, {
      startDate,
      endDate,
    });
  },

  async getPumpWiseSales(month: string) {
    return apiClient.get<PumpWiseSales[]>(ENDPOINTS.PUMPS, { month });
  },

  async getClientWiseSales(startDate: string, endDate: string) {
    return apiClient.get<ClientWiseSales[]>(ENDPOINTS.CLIENTS, {
      startDate,
      endDate,
    });
  },

  // Reports
  async generateReport(
    reportType: string,
    startDate: string,
    endDate: string,
    filters?: Record<string, unknown>,
  ) {
    return apiClient.post<ReportData>(ENDPOINTS.REPORTS, {
      reportType,
      startDate,
      endDate,
      filters,
    });
  },

  async downloadReport(reportId: string) {
    return apiClient.getRaw(`${ENDPOINTS.REPORTS}/${reportId}/download`, {
      responseType: "blob",
    });
  },

  async exportToExcel(reportType: string, data: unknown) {
    return apiClient.post(`${ENDPOINTS.REPORTS}/export-excel`, {
      reportType,
      data,
    });
  },
};

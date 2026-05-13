import { apiClient } from "./apiClient";
import { FuelPurchase, PaginatedResponse } from "@/types";

const ENDPOINTS = {
  FUEL_PURCHASES: "/fuel-purchases",
};

export const fuelPurchaseService = {
  async getFuelPurchases(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, unknown>,
  ) {
    return apiClient.get<PaginatedResponse<FuelPurchase>>(
      ENDPOINTS.FUEL_PURCHASES,
      {
        page,
        limit,
        ...filters,
      },
    );
  },

  async getFuelPurchase(id: string) {
    return apiClient.get<FuelPurchase>(`${ENDPOINTS.FUEL_PURCHASES}/${id}`);
  },

  async createFuelPurchase(data: Partial<FuelPurchase>) {
    return apiClient.post<FuelPurchase>(ENDPOINTS.FUEL_PURCHASES, data);
  },

  async updateFuelPurchase(id: string, data: Partial<FuelPurchase>) {
    return apiClient.put<FuelPurchase>(
      `${ENDPOINTS.FUEL_PURCHASES}/${id}`,
      data,
    );
  },

  async deleteFuelPurchase(id: string) {
    return apiClient.delete(`${ENDPOINTS.FUEL_PURCHASES}/${id}`);
  },

  async uploadInvoice(id: string, file: File) {
    const formData = new FormData();
    formData.append("invoice", file);
    return apiClient.uploadFile(
      `${ENDPOINTS.FUEL_PURCHASES}/${id}/invoice`,
      formData,
    );
  },
};

import { apiClient } from "./apiClient";
import { Delivery, Payment, PaginatedResponse } from "@/types";

const ENDPOINTS = {
  DELIVERIES: "/deliveries",
  PAYMENTS: "/payments",
};

export const deliveryService = {
  async getDeliveries(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, unknown>,
  ) {
    return apiClient.get<PaginatedResponse<Delivery>>(ENDPOINTS.DELIVERIES, {
      page,
      limit,
      ...filters,
    });
  },

  async getDelivery(id: string) {
    return apiClient.get<Delivery>(`${ENDPOINTS.DELIVERIES}/${id}`);
  },

  async createDelivery(data: Partial<Delivery>) {
    return apiClient.post<Delivery>(ENDPOINTS.DELIVERIES, data);
  },

  async updateDelivery(id: string, data: Partial<Delivery>) {
    return apiClient.put<Delivery>(`${ENDPOINTS.DELIVERIES}/${id}`, data);
  },

  async deleteDelivery(id: string) {
    return apiClient.delete(`${ENDPOINTS.DELIVERIES}/${id}`);
  },

  async updateStatus(id: string, status: string) {
    return apiClient.patch<Delivery>(`${ENDPOINTS.DELIVERIES}/${id}/status`, {
      status,
    });
  },

  // Payment related
  async createPayment(data: Partial<Payment>) {
    return apiClient.post<Payment>(ENDPOINTS.PAYMENTS, data);
  },

  async getPayments(deliveryId: string) {
    return apiClient.get<Payment[]>(`${ENDPOINTS.PAYMENTS}`, { deliveryId });
  },

  async getPaymentHistory(clientId: string) {
    return apiClient.get<Payment[]>(`${ENDPOINTS.PAYMENTS}/client/${clientId}`);
  },
};

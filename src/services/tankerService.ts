import { apiClient } from "./apiClient";
import { Tanker, PaginatedResponse } from "@/types";

const ENDPOINTS = {
  TANKERS: "/tankers",
};

export const tankerService = {
  async getTankers(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, unknown>,
  ) {
    return apiClient.get<PaginatedResponse<Tanker>>(ENDPOINTS.TANKERS, {
      page,
      limit,
      ...filters,
    });
  },

  async getTanker(id: string) {
    return apiClient.get<Tanker>(`${ENDPOINTS.TANKERS}/${id}`);
  },

  async createTanker(data: Partial<Tanker>) {
    return apiClient.post<Tanker>(ENDPOINTS.TANKERS, data);
  },

  async updateTanker(id: string, data: Partial<Tanker>) {
    return apiClient.put<Tanker>(`${ENDPOINTS.TANKERS}/${id}`, data);
  },

  async deleteTanker(id: string) {
    return apiClient.delete(`${ENDPOINTS.TANKERS}/${id}`);
  },

  async updateStatus(id: string, status: string) {
    return apiClient.patch<Tanker>(`${ENDPOINTS.TANKERS}/${id}/status`, {
      status,
    });
  },
};

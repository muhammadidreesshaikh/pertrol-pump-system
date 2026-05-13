import { apiClient } from "./apiClient";
import { Client, PaginatedResponse } from "@/types";

const ENDPOINTS = {
  CLIENTS: "/clients",
};

export const clientService = {
  async getClients(page: number = 1, limit: number = 10, search?: string) {
    return apiClient.get<PaginatedResponse<Client>>(ENDPOINTS.CLIENTS, {
      page,
      limit,
      search,
    });
  },

  async getClient(id: string) {
    return apiClient.get<Client>(`${ENDPOINTS.CLIENTS}/${id}`);
  },

  async createClient(data: Partial<Client>) {
    return apiClient.post<Client>(ENDPOINTS.CLIENTS, data);
  },

  async updateClient(id: string, data: Partial<Client>) {
    return apiClient.put<Client>(`${ENDPOINTS.CLIENTS}/${id}`, data);
  },

  async deleteClient(id: string) {
    return apiClient.delete(`${ENDPOINTS.CLIENTS}/${id}`);
  },

  async getOutstandingClients() {
    return apiClient.get<Client[]>(`${ENDPOINTS.CLIENTS}/outstanding`);
  },
};

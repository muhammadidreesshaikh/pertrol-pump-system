import { apiClient } from "./apiClient";
import { PetrolPump, PaginatedResponse, PetrolPumpStats } from "@/types";

const ENDPOINTS = {
  PETROL_PUMPS: "/petrol-pumps",
  STATS: "/petrol-pumps/stats",
};

export const petrolPumpService = {
  // Get all petrol pumps
  async getPetrolPumps(page: number = 1, limit: number = 10, search?: string) {
    return apiClient.get<PaginatedResponse<PetrolPump>>(
      ENDPOINTS.PETROL_PUMPS,
      {
        page,
        limit,
        search,
      },
    );
  },

  // Get single petrol pump
  async getPetrolPump(id: string) {
    return apiClient.get<PetrolPump>(`${ENDPOINTS.PETROL_PUMPS}/${id}`);
  },

  // Create petrol pump
  async createPetrolPump(data: Partial<PetrolPump>) {
    return apiClient.post<PetrolPump>(ENDPOINTS.PETROL_PUMPS, data);
  },

  // Update petrol pump
  async updatePetrolPump(id: string, data: Partial<PetrolPump>) {
    return apiClient.put<PetrolPump>(`${ENDPOINTS.PETROL_PUMPS}/${id}`, data);
  },

  // Delete petrol pump
  async deletePetrolPump(id: string) {
    return apiClient.delete(`${ENDPOINTS.PETROL_PUMPS}/${id}`);
  },

  // Get stats
  async getStats() {
    return apiClient.get<PetrolPumpStats>(ENDPOINTS.STATS);
  },
};

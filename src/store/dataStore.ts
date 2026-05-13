import { create } from "zustand";
import {
  PetrolPump,
  Tanker,
  Client,
  Delivery,
  FuelPurchase,
  DashboardStats,
} from "@/types";

interface DataState {
  // Petrol Pumps
  petrolPumps: PetrolPump[];
  setPetrolPumps: (pumps: PetrolPump[]) => void;
  addPetrolPump: (pump: PetrolPump) => void;
  updatePetrolPump: (pump: PetrolPump) => void;
  removePetrolPump: (id: string) => void;

  // Tankers
  tankers: Tanker[];
  setTankers: (tankers: Tanker[]) => void;
  addTanker: (tanker: Tanker) => void;
  updateTanker: (tanker: Tanker) => void;
  removeTanker: (id: string) => void;

  // Clients
  clients: Client[];
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  removeClient: (id: string) => void;

  // Deliveries
  deliveries: Delivery[];
  setDeliveries: (deliveries: Delivery[]) => void;
  addDelivery: (delivery: Delivery) => void;
  updateDelivery: (delivery: Delivery) => void;
  removeDelivery: (id: string) => void;

  // Fuel Purchases
  fuelPurchases: FuelPurchase[];
  setFuelPurchases: (purchases: FuelPurchase[]) => void;
  addFuelPurchase: (purchase: FuelPurchase) => void;
  updateFuelPurchase: (purchase: FuelPurchase) => void;
  removeFuelPurchase: (id: string) => void;

  // Dashboard Stats
  dashboardStats: DashboardStats | null;
  setDashboardStats: (stats: DashboardStats) => void;

  // Clear all data
  clearAll: () => void;
}

export const useDataStore = create<DataState>((set) => ({
  // Petrol Pumps
  petrolPumps: [],
  setPetrolPumps: (pumps) => set({ petrolPumps: pumps }),
  addPetrolPump: (pump) =>
    set((state) => ({ petrolPumps: [...state.petrolPumps, pump] })),
  updatePetrolPump: (pump) =>
    set((state) => ({
      petrolPumps: state.petrolPumps.map((p) => (p.id === pump.id ? pump : p)),
    })),
  removePetrolPump: (id) =>
    set((state) => ({
      petrolPumps: state.petrolPumps.filter((p) => p.id !== id),
    })),

  // Tankers
  tankers: [],
  setTankers: (tankers) => set({ tankers }),
  addTanker: (tanker) =>
    set((state) => ({ tankers: [...state.tankers, tanker] })),
  updateTanker: (tanker) =>
    set((state) => ({
      tankers: state.tankers.map((t) => (t.id === tanker.id ? tanker : t)),
    })),
  removeTanker: (id) =>
    set((state) => ({
      tankers: state.tankers.filter((t) => t.id !== id),
    })),

  // Clients
  clients: [],
  setClients: (clients) => set({ clients }),
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (client) =>
    set((state) => ({
      clients: state.clients.map((c) => (c.id === client.id ? client : c)),
    })),
  removeClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((c) => c.id !== id),
    })),

  // Deliveries
  deliveries: [],
  setDeliveries: (deliveries) => set({ deliveries }),
  addDelivery: (delivery) =>
    set((state) => ({ deliveries: [...state.deliveries, delivery] })),
  updateDelivery: (delivery) =>
    set((state) => ({
      deliveries: state.deliveries.map((d) =>
        d.id === delivery.id ? delivery : d,
      ),
    })),
  removeDelivery: (id) =>
    set((state) => ({
      deliveries: state.deliveries.filter((d) => d.id !== id),
    })),

  // Fuel Purchases
  fuelPurchases: [],
  setFuelPurchases: (purchases) => set({ fuelPurchases: purchases }),
  addFuelPurchase: (purchase) =>
    set((state) => ({ fuelPurchases: [...state.fuelPurchases, purchase] })),
  updateFuelPurchase: (purchase) =>
    set((state) => ({
      fuelPurchases: state.fuelPurchases.map((p) =>
        p.id === purchase.id ? purchase : p,
      ),
    })),
  removeFuelPurchase: (id) =>
    set((state) => ({
      fuelPurchases: state.fuelPurchases.filter((p) => p.id !== id),
    })),

  // Dashboard Stats
  dashboardStats: null,
  setDashboardStats: (stats) => set({ dashboardStats: stats }),

  // Clear all
  clearAll: () =>
    set({
      petrolPumps: [],
      tankers: [],
      clients: [],
      deliveries: [],
      fuelPurchases: [],
      dashboardStats: null,
    }),
}));

// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Petrol Pump Types
export interface PetrolPump {
  id: string;
  name: string;
  location: string;
  managerName: string;
  contactNumber: string;
  petrolCapacity: number;
  dieselCapacity: number;
  currentPetrolStock: number;
  currentDieselStock: number;
  petrolLowStockAlert?: number;
  dieselLowStockAlert?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PetrolPumpStats {
  totalStocks: number;
  lowStockPumps: number;
  activeManagers: number;
  lastUpdated: string;
}

// Fuel Purchase Types
export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
}

export interface FuelPurchase {
  id: string;
  fuelType: FuelType;
  quantity: number;
  purchaseRate: number;
  purchaseDate: string;
  supplierName: string;
  transportationCharges: number;
  driverCharges: number;
  otherCharges: number;
  tankerAssigned: string;
  petrolPumpDestination: string;
  invoiceUrl?: string;
  totalCost: number;
  status: PurchaseStatus;
  createdAt: string;
  updatedAt: string;
}

export enum PurchaseStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// Tanker Types
export enum TankerStatus {
  FREE = 'FREE',
  FILLING = 'FILLING',
  ON_WAY = 'ON_WAY',
  DELIVERED = 'DELIVERED',
}

export interface Tanker {
  id: string;
  tankerNumber: string;
  driverName: string;
  capacity: number;
  fuelType: FuelType;
  currentStatus: TankerStatus;
  currentLoad?: number;
  lastLocation?: string;
  createdAt: string;
  updatedAt: string;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  creditLimit: number;
  outstandingAmount: number;
  totalPurchases: number;
  paymentDueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Delivery Types
export enum DeliveryStatus {
  FILLING = 'FILLING',
  ON_WAY = 'ON_WAY',
  DELIVERED = 'DELIVERED',
}

export interface Delivery {
  id: string;
  clientId: string;
  clientName: string;
  fuelType: FuelType;
  quantity: number;
  deliveryDate: string;
  rate: number;
  discount: number;
  transportationCharges: number;
  otherCharges: number;
  status: DeliveryStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export enum PaymentMethod {
  CASH = 'CASH',
  ONLINE_TRANSFER = 'ONLINE_TRANSFER',
  CHEQUE = 'CHEQUE',
  HALF_CASH_HALF_ONLINE = 'HALF_CASH_HALF_ONLINE',
}

export interface Payment {
  id: string;
  deliveryId: string;
  paymentDate: string;
  paymentAmount: number;
  paymentMethod: PaymentMethod;
  remainingBalance: number;
  createdAt: string;
  updatedAt: string;
}

// Sales & Analytics Types
export interface SalesAnalytics {
  date: string;
  petrolSales: number;
  dieselSales: number;
  totalSales: number;
  profit: number;
  totalExpenses: number;
}

export interface PumpWiseSales {
  pumpId: string;
  pumpName: string;
  petrolSales: number;
  dieselSales: number;
  totalSales: number;
  month: string;
}

export interface ClientWiseSales {
  clientId: string;
  clientName: string;
  totalPurchases: number;
  totalAmount: number;
  lastPurchaseDate: string;
}

export interface InventoryRecord {
  id: string;
  pumpId: string;
  fuelType: FuelType;
  purchaseDate: string;
  purchaseRate: number;
  quantityPurchased: number;
  quantitySold: number;
  remainingStock: number;
  cogs: number;
  createdAt: string;
}

// Report Types
export interface ReportFilters {
  startDate: string;
  endDate: string;
  type: ReportType;
  pumpId?: string;
  clientId?: string;
  tankerNumber?: string;
}

export enum ReportType {
  SALES = 'SALES',
  PURCHASE = 'PURCHASE',
  CLIENT = 'CLIENT',
  RECOVERY = 'RECOVERY',
  TANKER = 'TANKER',
  STOCK = 'STOCK',
}

export interface ReportData {
  title: string;
  generatedDate: string;
  period: string;
  data: unknown[];
  summary: {
    totalAmount: number;
    totalItems: number;
    totalProfit?: number;
    totalExpenses?: number;
  };
}

// Dashboard Types
export interface DashboardStats {
  totalPetrolStock: number;
  totalDieselStock: number;
  totalSales: number;
  pendingRecoveries: number;
  activeTankers: number;
  freeTankers: number;
  lastUpdated: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  category: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

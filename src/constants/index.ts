// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const API_TIMEOUT = 30000;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
  SIDEBAR_OPEN: "sidebar_open",
} as const;

// Fuel Types Options
export const FUEL_TYPE_OPTIONS = [
  { label: "Petrol", value: "PETROL" },
  { label: "Diesel", value: "DIESEL" },
];

// Tanker Status Options
export const TANKER_STATUS_OPTIONS = [
  { label: "Free", value: "FREE", color: "success" },
  { label: "Filling", value: "FILLING", color: "warning" },
  { label: "On Way", value: "ON_WAY", color: "info" },
  { label: "Delivered", value: "DELIVERED", color: "primary" },
];

// Delivery Status Options
export const DELIVERY_STATUS_OPTIONS = [
  { label: "Filling", value: "FILLING", color: "warning" },
  { label: "On Way", value: "ON_WAY", color: "info" },
  { label: "Delivered", value: "DELIVERED", color: "success" },
];

// Payment Method Options
export const PAYMENT_METHOD_OPTIONS = [
  { label: "Cash", value: "CASH" },
  { label: "Online Transfer", value: "ONLINE_TRANSFER" },
  { label: "Cheque", value: "CHEQUE" },
  { label: "Half Cash Half Online", value: "HALF_CASH_HALF_ONLINE" },
];

// User Roles
export const USER_ROLE_OPTIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Manager", value: "MANAGER" },
  { label: "Accountant", value: "ACCOUNTANT" },
];

// Report Types
export const REPORT_TYPE_OPTIONS = [
  { label: "Sales Report", value: "SALES" },
  { label: "Purchase Report", value: "PURCHASE" },
  { label: "Client Report", value: "CLIENT" },
  { label: "Recovery Report", value: "RECOVERY" },
  { label: "Tanker Report", value: "TANKER" },
  { label: "Stock Report", value: "STOCK" },
];

// Default Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// Stock Alert Thresholds (in percentage)
export const LOW_STOCK_THRESHOLD = 30;
export const CRITICAL_STOCK_THRESHOLD = 10;

// Number Format
export const CURRENCY_SYMBOL = "₹";
export const DECIMAL_PLACES = 2;

// Date Format
export const DATE_FORMAT = "dd/MM/yyyy";
export const DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm";
export const MONTH_YEAR_FORMAT = "MMM yyyy";

// Sidebar Navigation
export const NAVIGATION_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    permission: ["ADMIN", "MANAGER", "ACCOUNTANT"],
  },
  {
    id: "petrol-pumps",
    label: "Petrol Pumps",
    path: "/petrol-pumps",
    icon: "local_gas_station",
    permission: ["ADMIN", "MANAGER"],
  },
  {
    id: "fuel-purchase",
    label: "Fuel Purchase",
    path: "/fuel-purchases",
    icon: "shopping_cart",
    permission: ["ADMIN", "MANAGER"],
  },
  {
    id: "tankers",
    label: "Tankers",
    path: "/tankers",
    icon: "directions_bus",
    permission: ["ADMIN", "MANAGER"],
  },
  {
    id: "clients",
    label: "Clients",
    path: "/clients",
    icon: "people",
    permission: ["ADMIN", "MANAGER", "ACCOUNTANT"],
  },
  {
    id: "delivery",
    label: "Delivery Management",
    path: "/deliveries",
    icon: "local_shipping",
    permission: ["ADMIN", "MANAGER", "ACCOUNTANT"],
  },
  {
    id: "sales",
    label: "Sales & Analytics",
    path: "/sales",
    icon: "trending_up",
    permission: ["ADMIN", "MANAGER", "ACCOUNTANT"],
  },
  {
    id: "reports",
    label: "Reports",
    path: "/reports",
    icon: "assessment",
    permission: ["ADMIN", "MANAGER", "ACCOUNTANT"],
  },
];

// Validation Rules
export const VALIDATION_RULES = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_PATTERN: /^[0-9]{10}$/,
  PASSWORD_MIN: 8,
  PASSWORD_PATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  PINCODE_PATTERN: /^[0-9]{6}$/,
};

// Empty States
export const EMPTY_STATE_MESSAGES = {
  NO_DATA: "No data available",
  NO_RESULTS: "No results found",
  NO_PUMPS: "No petrol pumps found. Create one to get started.",
  NO_TANKERS: "No tankers found. Add a tanker to manage logistics.",
  NO_CLIENTS: "No clients found. Add a client to manage deliveries.",
  NO_PURCHASES: "No fuel purchases found.",
  NO_DELIVERIES: "No deliveries found.",
  NO_PAYMENTS: "No payments recorded.",
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: "Operation completed successfully",
  ERROR: "An error occurred",
  CREATED: "Created successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",
  LOADING: "Loading...",
  SAVED: "Saved successfully",
  FAILED: "Operation failed",
};

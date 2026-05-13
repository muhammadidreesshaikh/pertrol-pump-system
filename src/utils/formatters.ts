import { format, parseISO } from 'date-fns';
import { CURRENCY_SYMBOL, DECIMAL_PLACES, DATE_FORMAT, DATE_TIME_FORMAT } from '@constants/index';

// Date Formatting
export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, DATE_FORMAT);
  } catch {
    return 'Invalid Date';
  }
};

export const formatDateTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, DATE_TIME_FORMAT);
  } catch {
    return 'Invalid Date';
  }
};

export const formatMonthYear = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'MMM yyyy');
  } catch {
    return 'Invalid Date';
  }
};

// Number Formatting
export const formatCurrency = (value: number): string => {
  return `${CURRENCY_SYMBOL} ${value.toFixed(DECIMAL_PLACES)}`;
};

export const formatNumber = (value: number, decimals: number = DECIMAL_PLACES): string => {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// String Formatting
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Validation Functions
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const isValidPincode = (pincode: string): boolean => {
  return /^[0-9]{6}$/.test(pincode);
};

// Storage Functions
export const setLocalStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return defaultValue ?? null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Calculation Functions
export const calculateTotal = (quantity: number, rate: number): number => {
  return quantity * rate;
};

export const calculateGrandTotal = (
  quantity: number,
  rate: number,
  ...charges: number[]
): number => {
  const baseTotal = calculateTotal(quantity, rate);
  return charges.reduce((total, charge) => total + charge, baseTotal);
};

export const calculateDiscount = (total: number, discountPercentage: number): number => {
  return (total * discountPercentage) / 100;
};

export const calculateProfit = (
  sellingPrice: number,
  costPrice: number,
  quantity: number
): number => {
  return (sellingPrice - costPrice) * quantity;
};

export const calculateProfitMargin = (profit: number, sellingPrice: number): number => {
  if (sellingPrice === 0) return 0;
  return (profit / sellingPrice) * 100;
};

// API Helper Functions
export const buildQueryString = (params: Record<string, unknown>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, String(value));
    }
  });
  return query.toString();
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Array Functions
export const groupBy = <T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const group = String(item[key]);
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
};

export const sumBy = <T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): number => {
  return array.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
};

export const averageBy = <T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): number => {
  if (array.length === 0) return 0;
  return sumBy(array, key) / array.length;
};

// Debounce Function
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: unknown[]) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle Function
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: unknown[]) => void) => {
  let inThrottle: boolean;
  return (...args: unknown[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastState {
  toasts: ToastItem[];
  show: (toast: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

const DEFAULT_DURATION = 5000;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  show: ({ message, variant, duration }) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant, duration }],
    }));
    return id;
  },

  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

function showToast(
  message: string,
  variant: ToastVariant,
  duration = DEFAULT_DURATION
) {
  return useToastStore.getState().show({ message, variant, duration });
}

export const toast = {
  success: (message: string, duration?: number) =>
    showToast(message, "success", duration),
  error: (message: string, duration?: number) =>
    showToast(message, "error", duration),
  info: (message: string, duration?: number) =>
    showToast(message, "info", duration),
  warning: (message: string, duration?: number) =>
    showToast(message, "warning", duration),
};

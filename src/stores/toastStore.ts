import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  action?: ToastAction;
}

export interface ToastOptions {
  duration?: number;
  action?: ToastAction;
}

interface ToastState {
  toasts: ToastItem[];
  show: (toast: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

const DEFAULT_DURATION = 5000;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  show: ({ message, variant, duration, action }) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant, duration, action }],
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
  options: ToastOptions = {}
) {
  return useToastStore.getState().show({
    message,
    variant,
    duration: options.duration ?? DEFAULT_DURATION,
    action: options.action,
  });
}

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast(message, "success", options),
  error: (message: string, options?: ToastOptions) =>
    showToast(message, "error", options),
  info: (message: string, options?: ToastOptions) =>
    showToast(message, "info", options),
  warning: (message: string, options?: ToastOptions) =>
    showToast(message, "warning", options),
};

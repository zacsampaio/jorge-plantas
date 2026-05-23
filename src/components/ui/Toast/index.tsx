import { useEffect } from "react";
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from "phosphor-react";
import { useToastStore, type ToastItem } from "../../../stores/toastStore";
import {
  ToastCard,
  ToastCloseButton,
  ToastIconWrap,
  ToastMessage,
  ToastViewport,
} from "./styled";

function ToastIcon({ variant }: { variant: ToastItem["variant"] }) {
  const size = 22;
  switch (variant) {
    case "success":
      return <CheckCircle size={size} weight="fill" />;
    case "error":
      return <WarningCircle size={size} weight="fill" />;
    case "warning":
      return <Warning size={size} weight="fill" />;
    default:
      return <Info size={size} weight="fill" />;
  }
}

function ToastEntry({ toast }: { toast: ToastItem }) {
  const dismiss = useToastStore((state) => state.dismiss);

  useEffect(() => {
    const timer = window.setTimeout(() => dismiss(toast.id), toast.duration);
    return () => window.clearTimeout(timer);
  }, [toast.id, toast.duration, dismiss]);

  return (
    <ToastCard
      $variant={toast.variant}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <ToastIconWrap $variant={toast.variant} aria-hidden="true">
        <ToastIcon variant={toast.variant} />
      </ToastIconWrap>
      <ToastMessage>{toast.message}</ToastMessage>
      <ToastCloseButton
        type="button"
        aria-label="Fechar notificação"
        onClick={() => dismiss(toast.id)}
      >
        <X size={16} weight="bold" />
      </ToastCloseButton>
    </ToastCard>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <ToastViewport aria-label="Notificações">
      {toasts.map((toast) => (
        <ToastEntry key={toast.id} toast={toast} />
      ))}
    </ToastViewport>
  );
}

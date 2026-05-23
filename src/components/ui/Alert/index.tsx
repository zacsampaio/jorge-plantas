import { AlertBox } from "./styled";

interface AlertProps {
  variant?: "info" | "error" | "success";
  children: React.ReactNode;
}

export function Alert({ variant = "info", children }: AlertProps) {
  return (
    <AlertBox $variant={variant} role="alert" aria-live="polite">
      {children}
    </AlertBox>
  );
}

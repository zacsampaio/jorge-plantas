import { StyledButton, Spinner } from "./styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  );
}

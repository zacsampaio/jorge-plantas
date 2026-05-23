import { forwardRef, useId, useState } from "react";
import {
  ErrorText,
  FieldWrapper,
  HintText,
  Input,
  Label,
  PasswordWrapper,
  TogglePasswordButton,
} from "./styled";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, error, hint, type = "text", id, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

  return (
    <FieldWrapper>
      <Label htmlFor={fieldId}>{label}</Label>
      {isPassword ? (
        <PasswordWrapper>
          <Input
            ref={ref}
            id={fieldId}
            type={inputType}
            $hasError={!!error}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : hint ? hintId : undefined
            }
            {...rest}
          />
          <TogglePasswordButton
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </TogglePasswordButton>
        </PasswordWrapper>
      ) : (
        <Input
          ref={ref}
          id={fieldId}
          type={inputType}
          $hasError={!!error}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          {...rest}
        />
      )}
      {error && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
      {!error && hint && <HintText id={hintId}>{hint}</HintText>}
    </FieldWrapper>
  );
  }
);

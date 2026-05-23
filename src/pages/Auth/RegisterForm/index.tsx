import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../../../hooks/useAuth";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/authSchemas";
import {
  FormStack,
  PasswordRequirements,
  RequirementItem,
} from "../../../layouts/AuthLayout/styled";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function RegisterForm() {
  const { signUp, error: authError, info, clearMessages } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password") ?? "";

  const requirements = useMemo(
    () => [
      { label: "Mínimo 8 caracteres", met: password.length >= 8 },
      { label: "Letra maiúscula", met: /[A-Z]/.test(password) },
      { label: "Letra minúscula", met: /[a-z]/.test(password) },
      { label: "Número", met: /\d/.test(password) },
      {
        label: "Caractere especial",
        met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      },
    ],
    [password]
  );

  const onSubmit = async (data: RegisterFormData) => {
    clearMessages();
    const success = await signUp({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      password: data.password,
    });

    if (!success) return;

    const redirect = searchParams.get("redirect");
    navigate(redirect ? decodeURIComponent(redirect) : "/account/orders");
  };

  return (
    <FormStack onSubmit={handleSubmit(onSubmit)} noValidate>
      {info && <Alert variant="success">{info}</Alert>}
      {authError && <Alert variant="error">{authError}</Alert>}

      <FormField
        label="Nome completo"
        autoComplete="name"
        placeholder="Seu nome"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <FormField
        label="Telefone"
        type="tel"
        autoComplete="tel"
        placeholder="(85) 99999-9999"
        error={errors.phone?.message}
        {...register("phone", {
          onChange: (e) => {
            setValue("phone", formatPhone(e.target.value), {
              shouldValidate: true,
            });
          },
        })}
      />

      <FormField
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormField
        label="Senha"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordRequirements aria-label="Requisitos de senha">
        {requirements.map((req) => (
          <RequirementItem key={req.label} $met={req.met}>
            {req.label}
          </RequirementItem>
        ))}
      </PasswordRequirements>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Criar conta
      </Button>
    </FormStack>
  );
}

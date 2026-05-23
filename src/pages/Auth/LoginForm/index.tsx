import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../../../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/authSchemas";
import { FormStack } from "../../../layouts/AuthLayout/styled";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LoginForm() {
  const { signIn, error: authError, clearMessages } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    clearMessages();
    const success = await signIn(data.email, data.password);

    if (!success) return;

    const redirect = searchParams.get("redirect");
    navigate(redirect ? decodeURIComponent(redirect) : "/account/orders");
  };

  return (
    <FormStack onSubmit={handleSubmit(onSubmit)} noValidate>
      {authError && <Alert variant="error">{authError}</Alert>}

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
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Entrar
      </Button>
    </FormStack>
  );
}

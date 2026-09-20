import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../../../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/authSchemas";
import {
  ForgotPasswordLink,
  FormStack,
} from "../../../layouts/AuthLayout/styled";
import {
  defaultRouteForRole,
  FORGOT_PASSWORD_PATH,
} from "../../../utils/authRedirect";
import { useAuthStore } from "../../../stores/authStore";
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
    if (redirect) {
      navigate(decodeURIComponent(redirect));
      return;
    }

    // Lido do store, não do hook: o papel só existe depois que o signIn
    // acima gravou a sessão, e o valor do render atual ainda é o antigo.
    const role = useAuthStore.getState().session?.user.role;
    navigate(defaultRouteForRole(role));
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

      <ForgotPasswordLink to={FORGOT_PASSWORD_PATH}>
        Esqueci minha senha
      </ForgotPasswordLink>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Entrar
      </Button>
    </FormStack>
  );
}

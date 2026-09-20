import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../../../hooks/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/authSchemas";
import {
  AuthSubtitle,
  AuthTitle,
  FormStack,
} from "../../../layouts/AuthLayout/styled";

/** Intervalo mínimo entre dois pedidos, para o formulário não virar
 * um disparador de e-mails contra terceiros. */
const RESEND_COOLDOWN_SECONDS = 60;

export function ForgotPasswordForm() {
  const {
    requestPasswordReset,
    error: authError,
    info: authInfo,
    clearMessages,
  } = useAuth();
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  useEffect(() => {
    if (cooldown <= 0) return;

    timerRef.current = window.setTimeout(() => {
      setCooldown((seconds) => seconds - 1);
    }, 1000);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [cooldown]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    clearMessages();
    const sent = await requestPasswordReset(data.email);
    if (sent) setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <>
      <AuthTitle>Esqueceu sua senha?</AuthTitle>
      <AuthSubtitle>
        Informe o e-mail da sua conta e enviaremos um link para você criar uma
        nova senha.
      </AuthSubtitle>

      <FormStack onSubmit={handleSubmit(onSubmit)} noValidate>
        {authError && <Alert variant="error">{authError}</Alert>}
        {authInfo && <Alert variant="success">{authInfo}</Alert>}

        <FormField
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          disabled={cooldown > 0}
        >
          {cooldown > 0
            ? `Aguarde ${cooldown}s para reenviar`
            : "Enviar link de recuperação"}
        </Button>
      </FormStack>
    </>
  );
}

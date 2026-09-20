import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/authStore";
import { getSupabaseClient } from "../../../lib/supabase/client";
import { forceSignOut } from "../../../lib/auth/sessionManager";
import { toast } from "../../../stores/toastStore";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/authSchemas";
import {
  AuthSubtitle,
  AuthTitle,
  FormStack,
} from "../../../layouts/AuthLayout/styled";

type LinkState = "checking" | "valid" | "invalid";

export function ResetPasswordForm() {
  const { updatePassword, error: authError, clearMessages } = useAuth();
  const recoveryMode = useAuthStore((state) => state.recoveryMode);
  const navigate = useNavigate();
  const [linkState, setLinkState] = useState<LinkState>("checking");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  useEffect(() => {
    let active = true;

    async function checkRecoverySession() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        if (active) setLinkState("invalid");
        return;
      }

      // O Supabase consome o token da URL ao iniciar o cliente
      // (detectSessionInUrl). Damos um instante para isso acontecer antes
      // de decidir se o link era válido.
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      if (session) {
        // Remove o token do endereço para ele não ficar no histórico do
        // navegador nem vazar no cabeçalho Referer de requisições futuras.
        window.history.replaceState(null, "", window.location.pathname);
        setLinkState("valid");
        return;
      }

      setLinkState("invalid");
    }

    const timer = window.setTimeout(checkRecoverySession, 600);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [recoveryMode]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    const changed = await updatePassword(data.password);
    if (!changed) return;

    // Trocar a senha derruba todas as sessões, em todos os dispositivos.
    // Quem tivesse acesso indevido à conta perde o acesso agora.
    await forceSignOut({ manual: true, showToast: false });

    toast.success(
      "Senha alterada. Todas as sessões foram encerradas — entre novamente com a nova senha.",
      { duration: 8000 }
    );
    navigate("/auth", { replace: true });
  };

  if (linkState === "checking") {
    return (
      <>
        <AuthTitle>Verificando seu link</AuthTitle>
        <AuthSubtitle>Um instante…</AuthSubtitle>
      </>
    );
  }

  if (linkState === "invalid") {
    return (
      <>
        <AuthTitle>Link inválido ou expirado</AuthTitle>
        <AuthSubtitle>
          Links de recuperação valem por 30 minutos e só podem ser usados uma
          vez. Peça um novo para continuar.
        </AuthSubtitle>

        <Button
          type="button"
          fullWidth
          onClick={() => navigate("/auth/esqueci-senha", { replace: true })}
        >
          Pedir novo link
        </Button>
      </>
    );
  }

  return (
    <>
      <AuthTitle>Criar nova senha</AuthTitle>
      <AuthSubtitle>
        Escolha uma senha que você ainda não use em outro site.
      </AuthSubtitle>

      <FormStack onSubmit={handleSubmit(onSubmit)} noValidate>
        {authError && <Alert variant="error">{authError}</Alert>}

        <FormField
          label="Nova senha"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          hint="Mínimo de 8 caracteres, com maiúscula, minúscula, número e símbolo"
          error={errors.password?.message}
          {...register("password")}
        />

        <FormField
          label="Confirme a nova senha"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Salvar nova senha
        </Button>
      </FormStack>
    </>
  );
}

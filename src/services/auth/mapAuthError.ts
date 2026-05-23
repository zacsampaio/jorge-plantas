import type { AuthError } from "../../types/auth";

type SupabaseAuthErrorLike = {
  message?: string;
  status?: number;
  code?: string;
  name?: string;
};

const GENERIC_MESSAGE =
  "Não foi possível completar esta ação. Tente novamente em instantes.";

function logAuthError(source: string, error: SupabaseAuthErrorLike): void {
  if (import.meta.env.DEV) {
    console.error(`[auth:${source}]`, error);
  }
}

export function mapSupabaseAuthError(
  error: SupabaseAuthErrorLike,
  source = "request"
): AuthError {
  logAuthError(source, error);

  const message = (error.message ?? "").toLowerCase();
  const code = String(error.code ?? "").toLowerCase();
  const status = error.status;

  if (
    message.includes("invalid api key") ||
    code === "invalid_api_key" ||
    (status === 401 && message.includes("api key"))
  ) {
    return {
      code: "AUTH_NOT_CONFIGURED",
      message:
        "Não foi possível autenticar com o servidor. Verifique as credenciais do Supabase ou tente novamente mais tarde.",
    };
  }

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials") ||
    code === "invalid_credentials"
  ) {
    return {
      code: "INVALID_CREDENTIALS",
      message: "E-mail ou senha incorretos.",
    };
  }

  if (isEmailAlreadyRegistered(message, code)) {
    return {
      code: "VALIDATION_ERROR",
      message:
        "Este e-mail já está cadastrado. Faça login ou use outro endereço de e-mail.",
    };
  }

  if (
    message.includes("email not confirmed") ||
    code === "email_not_confirmed"
  ) {
    return {
      code: "VALIDATION_ERROR",
      message: "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada e spam.",
    };
  }

  if (
    message.includes("password") &&
    (message.includes("weak") ||
      message.includes("short") ||
      message.includes("at least"))
  ) {
    return {
      code: "VALIDATION_ERROR",
      message: "A senha não atende aos requisitos de segurança.",
    };
  }

  if (
    message.includes("invalid email") ||
    code === "validation_failed" ||
    message.includes("unable to validate email")
  ) {
    return {
      code: "VALIDATION_ERROR",
      message: "Informe um endereço de e-mail válido.",
    };
  }

  if (
    message.includes("rate limit") ||
    message.includes("too many requests") ||
    status === 429
  ) {
    return {
      code: "VALIDATION_ERROR",
      message: "Muitas tentativas em sequência. Aguarde alguns minutos e tente novamente.",
    };
  }

  if (
    message.includes("fetch") ||
    message.includes("network") ||
    message.includes("failed to connect")
  ) {
    return {
      code: "UNKNOWN",
      message: "Falha de conexão. Verifique sua internet e tente novamente.",
    };
  }

  if (message.includes("signup is disabled")) {
    return {
      code: "VALIDATION_ERROR",
      message: "Novos cadastros estão temporariamente desativados.",
    };
  }

  return {
    code: "UNKNOWN",
    message: GENERIC_MESSAGE,
  };
}

export function emailAlreadyRegisteredError(): AuthError {
  return {
    code: "VALIDATION_ERROR",
    message:
      "Este e-mail já está cadastrado. Faça login ou use outro endereço de e-mail.",
  };
}

function isEmailAlreadyRegistered(message: string, code: string): boolean {
  return (
    message.includes("user already registered") ||
    message.includes("already been registered") ||
    message.includes("already registered") ||
    message.includes("email address is already") ||
    message.includes("email already") ||
    message.includes("duplicate") ||
    code === "user_already_exists" ||
    code === "email_exists"
  );
}

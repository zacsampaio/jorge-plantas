import type {
  AuthError,
  RegisterInput,
  Session,
  UserProfile,
  UserRole,
} from "../../types/auth";
import type { ProfileRow } from "../../types/profile";
import { getSupabaseClient } from "../../lib/supabase/client";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function mapProfileRowToUser(profile: ProfileRow): UserProfile {
  return {
    id: profile.id,
    fullName: profile.full_name,
    email: profile.email,
    phone: profile.phone ?? "",
    role: profile.role,
  };
}

export async function fetchProfileByUserId(
  userId: string
): Promise<UserProfile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, email, role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;

  return mapProfileRowToUser(data as ProfileRow);
}

/** Garante perfil após signUp (caso o trigger demore ou falhe) */
export async function ensureUserProfile(
  userId: string,
  data: Pick<RegisterInput, "fullName" | "phone" | "email">
): Promise<UserProfile | null> {
  const existing = await fetchProfileByUserId(userId);
  if (existing) return existing;

  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { error } = await supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      role: "client",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("Erro ao criar perfil:", error.message);
    return null;
  }

  return fetchProfileByUserId(userId);
}

export async function fetchProfileWithRetry(
  userId: string,
  retries = 5,
  intervalMs = 400
): Promise<UserProfile | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const profile = await fetchProfileByUserId(userId);
    if (profile) return profile;
    if (attempt < retries - 1) {
      await delay(intervalMs);
    }
  }
  return null;
}

export async function buildSessionFromAuthUser(
  userId: string,
  accessToken?: string,
  registerData?: Pick<RegisterInput, "fullName" | "phone" | "email">
): Promise<Session | null> {
  let profile = await fetchProfileWithRetry(userId);

  if (!profile && registerData) {
    profile = await ensureUserProfile(userId, registerData);
  }

  if (!profile) return null;

  return {
    user: profile,
    accessToken,
  };
}

export function mapSupabaseAuthError(error: {
  message: string;
  status?: number;
}): AuthError {
  const message = error.message.toLowerCase();

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials")
  ) {
    return {
      code: "INVALID_CREDENTIALS",
      message: "E-mail ou senha incorretos.",
    };
  }

  if (message.includes("user already registered")) {
    return {
      code: "VALIDATION_ERROR",
      message: "Este e-mail já está cadastrado.",
    };
  }

  if (message.includes("email not confirmed")) {
    return {
      code: "VALIDATION_ERROR",
      message: "Confirme seu e-mail antes de entrar.",
    };
  }

  return {
    code: "UNKNOWN",
    message: error.message,
  };
}

export function resolveRole(value: unknown): UserRole {
  return value === "admin" ? "admin" : "client";
}

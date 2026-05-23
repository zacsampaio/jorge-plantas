export type UserRole = "client" | "admin";

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  /** Futuro: derivado do JWT Supabase — nunca confiar apenas no front */
  role: UserRole;
}

export interface Session {
  user: UserProfile;
  /** Futuro: access token gerenciado pelo Supabase client */
  accessToken?: string;
}

export type AuthErrorCode =
  | "AUTH_NOT_CONFIGURED"
  | "INVALID_CREDENTIALS"
  | "VALIDATION_ERROR"
  | "UNKNOWN";

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export interface AuthResult {
  session: Session | null;
  error: AuthError | null;
  pendingEmailConfirmation?: boolean;
}

export interface RegisterInput {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

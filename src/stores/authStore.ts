import { create } from "zustand";
import { authService } from "../services/auth/authService";
import { updateUserProfile } from "../services/profile/profileService";
import { purgeStaleSupabaseAuthLocal } from "../lib/auth/sessionManager";
import type {
  AuthStatus,
  RegisterInput,
  Session,
  UserProfile,
} from "../types/auth";

interface AuthState {
  session: Session | null;
  status: AuthStatus;
  bootstrapped: boolean;
  error: string | null;
  info: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (data: RegisterInput) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  clearMessages: () => void;
}

const AUTH_SESSION_TIMEOUT_MS = 2500;
let initializePromise: Promise<void> | null = null;

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => {
          reject(new Error("auth timeout"));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  status: "idle",
  bootstrapped: false,
  error: null,
  info: null,

  initialize: async () => {
    if (initializePromise) return initializePromise;

    initializePromise = (async () => {
      set({ bootstrapped: true, status: "unauthenticated", error: null, info: null });

      try {
        await purgeStaleSupabaseAuthLocal();
        const session = await withTimeout(
          authService.getSession(),
          AUTH_SESSION_TIMEOUT_MS
        );
        if (session) {
          set({ session, status: "authenticated" });
        }
      } catch (error) {
        console.warn("[auth] Bootstrap rápido — seguindo sem sessão:", error);
      }
    })();

    return initializePromise;
  },

  signIn: async (email, password) => {
    set({ status: "loading", error: null, info: null });
    const result = await authService.signIn(email, password);

    if (result.error) {
      set({
        status: "unauthenticated",
        error: result.error.message,
      });
      return false;
    }

    set({
      session: result.session,
      status: result.session ? "authenticated" : "unauthenticated",
      error: null,
    });
    return !!result.session;
  },

  signUp: async (data) => {
    set({ status: "loading", error: null, info: null });
    const result = await authService.signUp(data);

    if (result.pendingEmailConfirmation) {
      set({
        status: "unauthenticated",
        info: "Cadastro realizado! Verifique seu e-mail (inclusive spam) e clique no link para ativar a conta. Depois faça login.",
      });
      return false;
    }

    if (result.error) {
      set({
        status: "unauthenticated",
        error: result.error.message,
      });
      return false;
    }

    set({
      session: result.session,
      status: result.session ? "authenticated" : "unauthenticated",
      error: null,
    });
    return !!result.session;
  },

  signOut: async () => {
    await authService.signOut();
  },

  updateProfile: async (data) => {
    const { session } = get();
    if (!session) return false;

    const { error } = await updateUserProfile(session.user.id, {
      fullName: data.fullName ?? session.user.fullName,
      phone: data.phone ?? session.user.phone,
      email: data.email ?? session.user.email,
    });

    if (error) {
      set({ error });
      return false;
    }

    set({
      session: {
        ...session,
        user: { ...session.user, ...data },
      },
      error: null,
    });
    return true;
  },

  clearMessages: () => set({ error: null, info: null }),
}));

export function selectIsAuthenticated(state: AuthState): boolean {
  return state.status === "authenticated" && state.session !== null;
}

export function selectUser(state: AuthState): UserProfile | null {
  return state.session?.user ?? null;
}

export function selectUserRole(state: AuthState): UserProfile["role"] | null {
  return state.session?.user.role ?? null;
}

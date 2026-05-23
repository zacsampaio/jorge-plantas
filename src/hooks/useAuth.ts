import {
  selectIsAuthenticated,
  selectUser,
  selectUserRole,
  useAuthStore,
} from "../stores/authStore";

export function useAuth() {
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);
  const error = useAuthStore((state) => state.error);
  const info = useAuthStore((state) => state.info);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);
  const role = useAuthStore(selectUserRole);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const signOut = useAuthStore((state) => state.signOut);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const clearMessages = useAuthStore((state) => state.clearMessages);

  return {
    session,
    status,
    error,
    info,
    isAuthenticated,
    user,
    role,
    signIn,
    signUp,
    signOut,
    updateProfile,
    clearMessages,
  };
}

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useAuthStore } from "../stores/authStore";
import { toast } from "../stores/toastStore";
import { buildAuthRedirectUrl, CHECKOUT_PATH } from "../utils/authRedirect";

export function useCheckoutNavigation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const authStatus = useAuthStore((state) => state.status);

  const goToCheckout = useCallback(
    (options?: { closeDrawer?: () => void }) => {
      if (authStatus === "loading" || authStatus === "idle") return false;

      if (!isAuthenticated) {
        options?.closeDrawer?.();
        toast.info(
          "Faça login ou crie uma conta para continuar. Seu carrinho foi mantido."
        );
        navigate(buildAuthRedirectUrl(CHECKOUT_PATH));
        return false;
      }

      options?.closeDrawer?.();
      navigate(CHECKOUT_PATH);
      return true;
    },
    [authStatus, isAuthenticated, navigate]
  );

  return { goToCheckout, isAuthenticated, authReady: authStatus === "authenticated" || authStatus === "unauthenticated" };
}

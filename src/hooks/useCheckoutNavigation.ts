import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { CHECKOUT_PATH } from "../utils/authRedirect";

export function useCheckoutNavigation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // O checkout é público: o visitante monta o pedido e calcula o frete sem
  // conta. O login só é exigido na confirmação, dentro da própria tela.
  const goToCheckout = useCallback(
    (options?: { closeDrawer?: () => void }) => {
      options?.closeDrawer?.();
      navigate(CHECKOUT_PATH);
      return true;
    },
    [navigate]
  );

  return { goToCheckout, isAuthenticated };
}

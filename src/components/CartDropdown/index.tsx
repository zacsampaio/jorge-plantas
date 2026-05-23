import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, X } from "phosphor-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { formatCurrency } from "../../utils/format";
import { getCartItemCount, getCartSubtotal } from "../../utils/cart";
import { useCheckoutNavigation } from "../../hooks/useCheckoutNavigation";
import { ProductImage } from "../ProductImage";
import { CountButton } from "../countButton";
import { RemoveButton } from "../removeButton";
import {
  CartBackdrop,
  CartBadge,
  CartCloseButton,
  CartDrawer,
  CartDropdownRoot,
  CartEmptyState,
  CartHeaderText,
  CartLineBottom,
  CartLineControls,
  CartLineInfo,
  CartLineItem,
  CartLinePrice,
  CartLineTop,
  CartPanelBody,
  CartPanelFooter,
  CartPanelHeader,
  CartTotalRow,
  CartToggleButton,
  CheckoutLinkButton,
  ContinueShoppingButton,
} from "./styled";

export interface CartDropdownProps {
  $color: string;
  $background: string;
}

export function CartDropdown({ $color, $background }: CartDropdownProps) {
  const { goToCheckout } = useCheckoutNavigation();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  const products = useSelector((state: RootState) => state.cart.products);
  const activeProducts = useMemo(
    () => products.filter((product) => product.quantity > 0),
    [products]
  );
  const itemCount = useMemo(() => getCartItemCount(products), [products]);
  const total = useMemo(() => getCartSubtotal(products), [products]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeDrawer() {
    setOpen(false);
  }

  function handleCheckout() {
    goToCheckout({ closeDrawer: closeDrawer });
  }

  const drawer = open
    ? createPortal(
        <>
          <CartBackdrop
            type="button"
            aria-label="Fechar carrinho"
            onClick={closeDrawer}
          />
          <CartDrawer id={panelId} role="dialog" aria-label="Carrinho de compras">
            <CartPanelHeader>
              <CartHeaderText>
                <h3>Seu carrinho</h3>
                <span>
                  {itemCount === 0
                    ? "Nenhum item"
                    : `${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
                </span>
              </CartHeaderText>
              <CartCloseButton
                type="button"
                aria-label="Fechar carrinho"
                onClick={closeDrawer}
              >
                <X size={18} weight="bold" />
              </CartCloseButton>
            </CartPanelHeader>

            <CartPanelBody>
              {activeProducts.length === 0 ? (
                <CartEmptyState>
                  <p>Nenhuma planta no carrinho ainda.</p>
                  <p>Explore os produtos e adicione suas favoritas!</p>
                </CartEmptyState>
              ) : (
                activeProducts.map((product) => (
                  <CartLineItem key={product.id}>
                    <CartLineTop>
                      <ProductImage
                        name={product.name}
                        imagePath={product.imagePath}
                        alt={product.name}
                      />
                      <CartLineInfo>
                        <h4 title={product.name}>{product.name}</h4>
                        <p>{formatCurrency(product.price)} cada</p>
                      </CartLineInfo>
                      <CartLinePrice>
                        {formatCurrency(product.price * product.quantity)}
                      </CartLinePrice>
                    </CartLineTop>
                    <CartLineBottom>
                      <CartLineControls>
                        <CountButton product={product} />
                        <RemoveButton product={product} />
                      </CartLineControls>
                    </CartLineBottom>
                  </CartLineItem>
                ))
              )}
            </CartPanelBody>

            <CartPanelFooter>
              <CartTotalRow>
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </CartTotalRow>
              <CheckoutLinkButton
                type="button"
                disabled={activeProducts.length === 0}
                onClick={handleCheckout}
              >
                Ir para o checkout
              </CheckoutLinkButton>
              <ContinueShoppingButton type="button" onClick={closeDrawer}>
                Continuar comprando
              </ContinueShoppingButton>
            </CartPanelFooter>
          </CartDrawer>
        </>,
        document.body
      )
    : null;

  return (
    <CartDropdownRoot>
      <CartToggleButton
        type="button"
        $color={$color}
        $background={$background}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        title="Abrir carrinho"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ShoppingCart size={20} weight="fill" />
        {itemCount > 0 && (
          <CartBadge>{itemCount > 99 ? "99+" : itemCount}</CartBadge>
        )}
      </CartToggleButton>
      {drawer}
    </CartDropdownRoot>
  );
}

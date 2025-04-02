import {
  CheckoutDelivery,
  CheckoutPayments,
  CheckoutTotal,
  CheckoutTotalItems,
  ConfirmedButton,
} from "./styled";
import { CardCart } from "../../../../components/cardCart";
import { ProductsType } from "../../../../redux/cart/types";

interface CartTotalPaymentsProps {
  onConfirmOrder: () => void;
  valueProducts: number;
  valueDelivery: number;
  totalValue: number;
  products: ProductsType[];
}

export function CartTotalPayments({
  onConfirmOrder,
  valueProducts,
  valueDelivery,
  totalValue,
  products,
}: CartTotalPaymentsProps) {
  return (
    <CheckoutPayments>
      {products
        .filter((product) => product.quantity > 0)
        .map((product) => (
          <CardCart key={product.id} product={product} />
        ))}
      <CheckoutTotalItems>
        <p>Total de Itens</p>
        <p>R$ {valueProducts.toFixed(2)}</p>
      </CheckoutTotalItems>
      {valueProducts > 0 && (
        <CheckoutDelivery>
          <p>Entrega</p>
          <p>R$ {valueDelivery.toFixed(2)}</p>
        </CheckoutDelivery>
      )}
      <CheckoutTotal>
        <p>Total</p>
        <p>R$ {totalValue.toFixed(2)}</p>
      </CheckoutTotal>
      <ConfirmedButton type="button" onClick={onConfirmOrder}>
        CONFIRMAR PEDIDO
      </ConfirmedButton>
    </CheckoutPayments>
  );
}

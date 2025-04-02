import { Bank, CreditCard, CurrencyDollar, Money } from "phosphor-react";
import {
  CheckoutPaymentMethods,
  CheckoutPaymentMethodsButtons,
  CheckoutPaymentMethodsTitle,
  PaymentButton,
} from "./styled";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "../../../../redux/paymentMethod/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";


interface PaymentMethodsProps {
  isFormValid: boolean;
}

export function PaymentMethods({ isFormValid }: PaymentMethodsProps) {
  const dispatch = useDispatch();
  const selectedMethod = useSelector((state: RootState) => state.paymentMethod.paymentMethod)

  const handlePaymentMethodClick = (method: string) => {
      dispatch(setPaymentMethod(method));
  };

  return (
    <CheckoutPaymentMethods>
      <CheckoutPaymentMethodsTitle>
        <CurrencyDollar size={22} />
        <h4>Pagamento</h4>
      </CheckoutPaymentMethodsTitle>
      <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
      <CheckoutPaymentMethodsButtons>
        <PaymentButton
          type="button"
          disabled={!isFormValid}
          onClick={() => handlePaymentMethodClick("Cartão de Crédito")}
          selected={selectedMethod === "Cartão de Crédito"}
        >
          <CreditCard size={16} />
          <h5>CARTÃO DE CRÉDITO</h5>
        </PaymentButton>
        <PaymentButton
          type="button"
          disabled={!isFormValid}
          onClick={() => handlePaymentMethodClick("Cartão de Débito")}
          selected={selectedMethod === "Cartão de Débito"}
        >
          <Bank size={16} />
          <h5>CARTÃO DE DÉBITO</h5>
        </PaymentButton>
        <PaymentButton
          type="button"
          disabled={!isFormValid}
          onClick={() => handlePaymentMethodClick("Dinheiro")}
          selected={selectedMethod === "Dinheiro"}
        >
          <Money size={16} />
          <h5>DINHEIRO</h5>
        </PaymentButton>
      </CheckoutPaymentMethodsButtons>
    </CheckoutPaymentMethods>
  );
}

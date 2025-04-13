import {
  CheckoutAreaForm,
  CheckoutComponents,
  CheckoutAreaPayments,
} from "./styled";
import { Form } from "./components/formAddress";
import { PaymentMethods } from "./components/paymentMethods";
import { CartTotalPayments } from "./components/cartTotalPayments";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cart/slice";

export function Checkout() {
  const [isFormValid, setIsFormValid] = useState(false);
  const paymentMethod = useSelector(
    (state: RootState) => state.paymentMethod?.paymentMethod || ""
  );
  const address = useSelector((state: RootState) => state.address);
  const { products } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const valueProducts = useMemo(
    () => products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [products]
  );

  const normalize = (text: string) => {
    return text
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase() 
      .replace(/\s+/g, ""); 
  };

  const deliveryValueForCity = () => {
    const normalizedCity = normalize(address.city)

    switch (normalizedCity) {
      case "fortaleza":
        return 30;

      case "eusebio":
        return 20;

      case "maracanau":
        return 30;

      case "maranguape":
        return 40;

      case "caucaia":
        return 50;

      case "aquiraz":
        return 20;

      default:
        return null;
    }
  };

  const valueDelivery = valueProducts > 0 ? Number(deliveryValueForCity()) : 0;
  const totalValue =
    valueDelivery > 0 ? valueProducts + valueDelivery : valueProducts;

  const handleFormValidation = (valid: boolean) => {
    setIsFormValid(valid);
  };

  const validateOrder = () => {
    if (
      !isFormValid ||
      !address.zipCode ||
      !address.street ||
      !address.number ||
      !address.neighborhood ||
      !address.city ||
      !address.state
    ) {
      alert("Por favor, preencha todos os campos do endereço.");
      return false;
    }
    if (products.length === 0) {
      alert("Por favor, adicione itens ao carrinho.");
      return false;
    }
    if (!paymentMethod || typeof paymentMethod !== "string") {
      alert("Por favor, selecione a forma de pagamento.");
      return false;
    }
    return true;
  };

  const handleCreateOrder = () => {
    const order = {
      products,
      address,
      total: totalValue,
      delivery: valueDelivery,
      paymentMethod,
    };

    const previousOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    previousOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(previousOrders));
    dispatch(clearCart());
    navigate("/confirmed");
  };

  const sendOrderToWhatsApp = () => {
    const telefone = "558597422142";

    const endereco =
      `# *Endereço de entrega:*\n` +
      `> Rua: ${address.street}, Nº: ${address.number}\n` +
      `> Bairro: ${address.neighborhood}\n` +
      `> Cidade: ${address.city} - ${address.state}\n` +
      `> CEP: ${address.zipCode}\n`;

    const itensPedido = products
      .map(
        (item) =>
          `# *${item.name}*\n` +
          `> Quantidade: ${item.quantity}x\n` +
          `> Preço unitário: R$ ${item.price.toFixed(2)}\n` +
          `> Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n`
      )
      .join("\n");

    const mensagem =
      `${endereco}\n` +
      `# *Itens do Pedido:*\n${itensPedido}\n` +
      `# *Frete:* R$ ${valueDelivery.toFixed(2)}\n` +
      `# *Forma de Pagamento:* ${paymentMethod}\n` +
      `# *Total:* R$ ${totalValue.toFixed(2)}\n\n` +
      `Pode confirmar a disponibilidade?`;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  };

  const handleOrder = () => {
    if (!validateOrder()) return;

    handleCreateOrder();
    sendOrderToWhatsApp();
  };

  return (
    <CheckoutComponents>
      <CheckoutAreaForm>
        <h3>Complete seu pedido</h3>
        <Form onFormValidation={handleFormValidation} />

        <PaymentMethods isFormValid={isFormValid} />
      </CheckoutAreaForm>

      <CheckoutAreaPayments>
        <h3>Plantas selecionadas</h3>
        <CartTotalPayments
          onConfirmOrder={() => {
            handleOrder();
          }}
          valueProducts={valueProducts}
          valueDelivery={valueDelivery}
          totalValue={totalValue}
          products={products}
        />
      </CheckoutAreaPayments>
    </CheckoutComponents>
  );
}

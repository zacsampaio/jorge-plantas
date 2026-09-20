import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { FormField } from "../../../components/ui/FormField";
import { Skeleton } from "../../../components/ui/Skeleton";
import { AdminHeader, AdminTitle } from "../../../layouts/AdminLayout/styled";
import { fetchCatalogProducts } from "../../../services/products/productService";
import { createOrder } from "../../../services/orders/orderService";
import { toast } from "../../../stores/toastStore";
import type { CatalogProduct } from "../../../types/catalog";
import type { OrderItem } from "../../../types/order";
import { formatCurrency } from "../../../utils/format";
import { sanitizePhone, sanitizeText } from "../../../utils/sanitize";
import {
  FieldRow,
  FormActions,
  ItemList,
  ItemPicker,
  ItemRow,
  OrderFormContainer,
  PaymentOption,
  PaymentOptions,
  PickerSelect,
  RemoveItemButton,
  Section,
  SectionTitle,
  TotalRow,
} from "./styled";

const PAYMENT_METHODS = ["Dinheiro", "Cartão de Débito", "Cartão de Crédito", "Pix"];

const manualOrderSchema = z.object({
  customerName: z
    .string()
    .min(1, "Nome do cliente é obrigatório")
    .transform(sanitizeText)
    .pipe(z.string().min(3, "Nome deve ter no mínimo 3 caracteres")),
  customerPhone: z
    .string()
    .optional()
    .transform((value) => (value ? sanitizePhone(value) : ""))
    .refine(
      (value) => value === "" || /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(value),
      "Telefone inválido. Use (XX) XXXXX-XXXX"
    ),
});

type ManualOrderFormData = z.infer<typeof manualOrderSchema>;

export function OrderForm() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Dinheiro");
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ManualOrderFormData>({
    resolver: zodResolver(manualOrderSchema),
    mode: "onChange",
  });

  useEffect(() => {
    let active = true;

    fetchCatalogProducts()
      .then((list) => {
        if (!active) return;
        setProducts(list.filter((product) => product.status !== "inactive"));
      })
      .finally(() => {
        if (active) setIsLoadingProducts(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [items]
  );

  const handleAddItem = () => {
    const product = products.find(
      (candidate) => String(candidate.id) === selectedProductId
    );
    if (!product) {
      toast.warning("Escolha um produto para adicionar.");
      return;
    }
    if (quantity < 1) {
      toast.warning("A quantidade precisa ser pelo menos 1.");
      return;
    }

    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          quantity,
          unitPrice: product.price,
        },
      ];
    });

    setSelectedProductId("");
    setQuantity(1);
  };

  const handleRemoveItem = (productId: number) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  };

  const onSubmit = async (data: ManualOrderFormData) => {
    if (items.length === 0) {
      toast.warning("Adicione pelo menos um produto ao pedido.");
      return;
    }

    setIsSaving(true);

    // Venda de balcão: sem conta de cliente, sem entrega, e já confirmada —
    // o dinheiro entrou no momento do registro.
    const { error } = await createOrder({
      channel: "balcao",
      status: "confirmed",
      customerName: data.customerName,
      customerPhone: data.customerPhone || undefined,
      items,
      total,
      paymentMethod,
    });

    setIsSaving(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Pedido registrado.");
    navigate("/admin/orders");
  };

  return (
    <>
      <AdminHeader>
        <AdminTitle>Novo pedido (balcão)</AdminTitle>
      </AdminHeader>

      <OrderFormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
        <Section>
          <SectionTitle>Cliente</SectionTitle>
          <FieldRow>
            <FormField
              label="Nome do cliente"
              placeholder="Maria Silva"
              error={errors.customerName?.message}
              {...register("customerName")}
            />
            <FormField
              label="Telefone (opcional)"
              placeholder="(85) 99999-9999"
              error={errors.customerPhone?.message}
              {...register("customerPhone")}
            />
          </FieldRow>
        </Section>

        <Section>
          <SectionTitle>Produtos</SectionTitle>

          {isLoadingProducts && <Skeleton lines={2} height="2.5rem" />}

          {!isLoadingProducts && (
            <ItemPicker>
              <div>
                <PickerSelect
                  value={selectedProductId}
                  onChange={(event) => setSelectedProductId(event.target.value)}
                  aria-label="Produto"
                >
                  <option value="">Selecione um produto…</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} — {formatCurrency(product.price)}
                    </option>
                  ))}
                </PickerSelect>
              </div>

              <FormField
                label="Qtd."
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />

              <Button type="button" variant="ghost" onClick={handleAddItem}>
                Adicionar
              </Button>
            </ItemPicker>
          )}

          {items.length === 0 ? (
            <Alert variant="info">
              Nenhum produto adicionado. O pedido precisa de pelo menos um.
            </Alert>
          ) : (
            <ItemList>
              {items.map((item) => (
                <ItemRow key={item.productId}>
                  <div>
                    <strong>
                      {item.quantity}x {item.name}
                    </strong>{" "}
                    <span>({formatCurrency(item.unitPrice)} cada)</span>
                  </div>
                  <div>
                    <strong>
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </strong>
                    <RemoveItemButton
                      type="button"
                      onClick={() => handleRemoveItem(item.productId)}
                      aria-label={`Remover ${item.name}`}
                    >
                      Remover
                    </RemoveItemButton>
                  </div>
                </ItemRow>
              ))}
            </ItemList>
          )}
        </Section>

        <Section>
          <SectionTitle>Pagamento</SectionTitle>
          <PaymentOptions role="group" aria-label="Forma de pagamento">
            {PAYMENT_METHODS.map((method) => (
              <PaymentOption
                key={method}
                type="button"
                $selected={paymentMethod === method}
                aria-pressed={paymentMethod === method}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </PaymentOption>
            ))}
          </PaymentOptions>

          <TotalRow>
            <span>Total do pedido</span>
            <strong>{formatCurrency(total)}</strong>
          </TotalRow>
        </Section>

        <FormActions>
          <Button type="submit" isLoading={isSaving}>
            Registrar pedido
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/admin/orders")}
          >
            Cancelar
          </Button>
        </FormActions>
      </OrderFormContainer>
    </>
  );
}

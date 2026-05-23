import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { Skeleton } from "../../../components/ui/Skeleton";
import { ProductImage } from "../../../components/ProductImage";
import { useCatalogStore } from "../../../stores/catalogStore";
import { getCatalogProductById } from "../../../services/products/productService";
import type { CatalogProduct } from "../../../types/catalog";
import {
  productFormSchema,
  type ProductFormData,
} from "../../Auth/schemas/authSchemas";
import { sanitizeText } from "../../../utils/sanitize";
import { AdminTitle } from "../../../layouts/AdminLayout/styled";
import { PageSection } from "../../../layouts/AccountLayout/styled";
import { FormStack } from "../../../layouts/AuthLayout/styled";
import {
  CheckboxRow,
  HintText,
  ImagePreviewWrap,
  ProductFormContainer,
  SelectField,
  TextArea,
} from "./styled";
import { Label, ErrorText, FieldWrapper } from "../../../components/ui/FormField/styled";

interface ProductFormProps {
  mode: "create" | "edit";
}

export function ProductForm({ mode }: ProductFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addProduct = useCatalogStore((state) => state.addProduct);
  const updateProduct = useCatalogStore((state) => state.updateProduct);
  const [existingProduct, setExistingProduct] = useState<CatalogProduct | null>(
    null
  );
  const [isLoadingProduct, setIsLoadingProduct] = useState(mode === "edit");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const productId = id ? Number(id) : undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      bestSeller: false,
      status: "active",
    },
  });

  useEffect(() => {
    if (mode !== "edit" || !productId) return;

    let cancelled = false;
    setIsLoadingProduct(true);
    setLoadError(null);

    getCatalogProductById(productId).then((product) => {
      if (cancelled) return;

      if (!product) {
        setLoadError("Produto não encontrado.");
        setIsLoadingProduct(false);
        return;
      }

      setExistingProduct(product);
      reset({
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        tags: product.tags?.join(", ") ?? "",
        bestSeller: product.bestSeller ?? false,
        status: product.status ?? "active",
      });
      setIsLoadingProduct(false);
    });

    return () => {
      cancelled = true;
    };
  }, [mode, productId, reset]);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  if (mode === "edit" && isLoadingProduct) {
    return (
      <PageSection>
        <Skeleton lines={6} height="2.5rem" />
      </PageSection>
    );
  }

  if (mode === "edit" && loadError) {
    return (
      <PageSection>
        <Alert variant="error">{loadError}</Alert>
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/products")}
          style={{ marginTop: "1rem" }}
        >
          Voltar
        </Button>
      </PageSection>
    );
  }

  const onSubmit = async (data: ProductFormData) => {
    setSubmitError(null);
    const tags = data.tags
      ?.split(",")
      .map((tag) => sanitizeText(tag))
      .filter(Boolean);

    const input = {
      name: data.name,
      description: data.description,
      price: data.price,
      tags: tags?.length ? tags : undefined,
      bestSeller: data.bestSeller ?? false,
      status: data.status,
      imagePath: existingProduct?.imagePath,
    };

    const result =
      mode === "create"
        ? await addProduct(input, imageFile)
        : productId
          ? await updateProduct(productId, input, imageFile)
          : { error: "Produto inválido." };

    if (result.error) {
      setSubmitError(result.error);
      return;
    }

    navigate("/admin/products");
  };

  return (
    <ProductFormContainer>
      <AdminTitle>
        {mode === "create" ? "Cadastrar item" : "Editar item"}
      </AdminTitle>
      <PageSection>
        {submitError && <Alert variant="error">{submitError}</Alert>}

        <FormStack onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Nome"
            error={errors.name?.message}
            {...register("name")}
          />

          <FieldWrapper>
            <Label htmlFor="description">Descrição</Label>
            <TextArea
              id="description"
              placeholder="Descrição do produto"
              $hasError={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <ErrorText role="alert">{errors.description.message}</ErrorText>
            )}
          </FieldWrapper>

          <FormField
            label="Preço (R$)"
            type="number"
            step="0.01"
            min="0"
            error={errors.price?.message}
            {...register("price")}
          />

          <FormField
            label="Tags (separadas por vírgula)"
            placeholder="interior, sombra parcial"
            hint="Ex: interior, sol pleno, sombra parcial"
            error={errors.tags?.message}
            {...register("tags")}
          />

          <FieldWrapper>
            <Label htmlFor="status">Status</Label>
            <SelectField id="status" {...register("status")}>
              <option value="active">Ativo (visível na loja)</option>
              <option value="inactive">Inativo (oculto na loja)</option>
            </SelectField>
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="image">Imagem do produto</Label>
            <input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <HintText>
              Enviado para o bucket Supabase &quot;products&quot; (público).
            </HintText>
            {(previewUrl || existingProduct) && (
              <ImagePreviewWrap>
                {previewUrl ? (
                  <img src={previewUrl} alt="Pré-visualização" />
                ) : (
                  existingProduct && (
                    <ProductImage
                      name={existingProduct.name}
                      imagePath={existingProduct.imagePath}
                      alt={existingProduct.name}
                    />
                  )
                )}
              </ImagePreviewWrap>
            )}
          </FieldWrapper>

          <CheckboxRow>
            <input type="checkbox" {...register("bestSeller")} />
            Produto em destaque (best seller)
          </CheckboxRow>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Button type="submit" isLoading={isSubmitting}>
              {mode === "create" ? "Cadastrar" : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/admin/products")}
            >
              Cancelar
            </Button>
          </div>
        </FormStack>
      </PageSection>
    </ProductFormContainer>
  );
}

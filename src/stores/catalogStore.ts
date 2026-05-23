import { create } from "zustand";
import type { CatalogProduct, CatalogProductInput } from "../types/catalog";
import type { ProductStatus } from "../redux/cart/types";
import {
  createCatalogProduct,
  fetchCatalogProducts,
  removeCatalogProduct,
  updateCatalogProduct,
  updateCatalogProductStatus,
} from "../services/products/productService";

interface CatalogState {
  products: CatalogProduct[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  fetchProducts: (options?: { silent?: boolean }) => Promise<void>;
  getProductById: (id: number) => CatalogProduct | undefined;
  addProduct: (
    input: CatalogProductInput,
    imageFile?: File | null
  ) => Promise<{ error: string | null }>;
  updateProduct: (
    id: number,
    input: CatalogProductInput,
    imageFile?: File | null
  ) => Promise<{ error: string | null }>;
  updateProductStatus: (
    id: number,
    status: ProductStatus
  ) => Promise<{ error: string | null }>;
  removeProduct: (id: number) => Promise<{ error: string | null }>;
}

let fetchRequestId = 0;

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: [],
  isLoading: false,
  isInitialized: false,
  error: null,

  fetchProducts: async (options) => {
    const requestId = ++fetchRequestId;

    if (!options?.silent) {
      set({ isLoading: true, error: null });
    }

    try {
      const products = await fetchCatalogProducts();
      if (requestId !== fetchRequestId) return;
      set({ products, isLoading: false, isInitialized: true, error: null });
    } catch {
      if (requestId !== fetchRequestId) return;
      set({
        isLoading: false,
        isInitialized: true,
        error: "Não foi possível carregar os produtos.",
      });
    }
  },

  getProductById: (id) => {
    return get().products.find((product) => product.id === id);
  },

  addProduct: async (input, imageFile) => {
    set({ error: null });
    const { product, error } = await createCatalogProduct(input, imageFile);
    if (error || !product) {
      set({ error: error ?? "Erro ao cadastrar produto." });
      return { error: error ?? "Erro ao cadastrar produto." };
    }
    set((state) => ({ products: [...state.products, product] }));
    return { error: null };
  },

  updateProduct: async (id, input, imageFile) => {
    set({ error: null });
    const { product, error } = await updateCatalogProduct(id, input, imageFile);
    if (error || !product) {
      set({ error: error ?? "Erro ao atualizar produto." });
      return { error: error ?? "Erro ao atualizar produto." };
    }
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? product : item
      ),
    }));
    return { error: null };
  },

  updateProductStatus: async (id, status) => {
    set({ error: null });
    const { error } = await updateCatalogProductStatus(id, status);
    if (error) {
      set({ error });
      return { error };
    }
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    }));
    return { error: null };
  },

  removeProduct: async (id) => {
    const product = get().getProductById(id);
    set({ error: null });
    const { error } = await removeCatalogProduct(id, product?.imagePath);
    if (error) {
      set({ error });
      return { error };
    }
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    }));
    return { error: null };
  },
}));

/** Helpers síncronos para componentes que leem o catálogo já carregado */
export function getCatalogProducts(): CatalogProduct[] {
  return useCatalogStore.getState().products;
}

export function getActiveCatalogProducts(): CatalogProduct[] {
  return getCatalogProducts().filter((p) => p.status !== "inactive");
}

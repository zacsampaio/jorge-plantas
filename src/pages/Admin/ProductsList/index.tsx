import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Pagination } from "../../../components/ui/Pagination";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Alert } from "../../../components/ui/Alert";
import { ProductImage } from "../../../components/ProductImage";
import { usePaginatedFetch } from "../../../hooks/usePaginatedFetch";
import { useCatalogStore } from "../../../stores/catalogStore";
import { fetchAdminProductsPaginated } from "../../../services/products/productService";
import { DEFAULT_PAGE_SIZE } from "../../../types/pagination";
import { formatCurrency } from "../../../utils/format";
import type { ProductStatus } from "../../../redux/cart/types";
import {
  ActionLink,
  AdminHeader,
  AdminTitle,
  ClearFiltersButton,
  DeleteButton,
  FilterBar,
  FilterField,
  FilterSummary,
  SearchField,
  StatusBadge,
  StatusButton,
  Table,
  TableActions,
} from "./styled";
import { categories } from "../../../data/categories";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { PageSection } from "../../../layouts/AccountLayout/styled";

const STATUS_LABELS: Record<ProductStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
};

export function AdminProductsListPage() {
  const removeProduct = useCatalogStore((state) => state.removeProduct);
  const updateProductStatus = useCatalogStore(
    (state) => state.updateProductStatus
  );
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | ProductStatus>("");
  const [tag, setTag] = useState("");
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);

  // O texto digitado só vira consulta depois de uma pausa, para não disparar
  // uma requisição por tecla.
  const debouncedSearch = useDebouncedValue(search, 350);

  const hasFilters =
    debouncedSearch.trim() !== "" || status !== "" || tag !== "" || onlyBestSeller;

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setTag("");
    setOnlyBestSeller(false);
  };

  const fetchPage = useCallback(
    (page: number, pageSize: number) =>
      fetchAdminProductsPaginated({
        page,
        pageSize,
        search: debouncedSearch,
        status: status || undefined,
        tag: tag || undefined,
        bestSeller: onlyBestSeller || undefined,
      }),
    [debouncedSearch, status, tag, onlyBestSeller]
  );

  const {
    data: products,
    total,
    totalPages,
    page,
    pageSize,
    setPage,
    isInitialLoading,
    isRefreshing,
    error,
    reload,
  } = usePaginatedFetch({
    fetcher: fetchPage,
    pageSize: DEFAULT_PAGE_SIZE,
    waitForAuth: true,
    // Volta para a primeira página sempre que o recorte muda: a página 2 de
    // um filtro não corresponde à página 2 de outro.
    resetKey: `${debouncedSearch}|${status}|${tag}|${onlyBestSeller}`,
  });

  const handleRemove = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Deseja remover "${name}" do catálogo? Esta ação não pode ser desfeita.`
    );
    if (confirmed) {
      await removeProduct(id);
      reload();
    }
  };

  const handleToggleStatus = async (id: number, current: ProductStatus) => {
    const next: ProductStatus = current === "active" ? "inactive" : "active";
    await updateProductStatus(id, next);
    reload();
  };

  return (
    <>
      <AdminHeader>
        <AdminTitle>Gerenciar Produtos</AdminTitle>
        <Button onClick={() => navigate("/admin/products/new")}>
          Cadastrar item
        </Button>
      </AdminHeader>

      <PageSection data-refreshing={isRefreshing ? "true" : undefined}>
        <FilterBar>
          <SearchField>
            Buscar por nome
            <input
              type="search"
              value={search}
              placeholder="Ex.: samambaia"
              onChange={(event) => setSearch(event.target.value)}
            />
          </SearchField>

          <FilterField>
            Status
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as "" | ProductStatus)
              }
            >
              <option value="">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </FilterField>

          <FilterField>
            Categoria
            <select
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            >
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category.tag} value={category.tag}>
                  {category.title}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField>
            Destaque
            <select
              value={onlyBestSeller ? "yes" : ""}
              onChange={(event) => setOnlyBestSeller(event.target.value === "yes")}
            >
              <option value="">Todos</option>
              <option value="yes">Só destaques</option>
            </select>
          </FilterField>

          <FilterSummary>
            {total} {total === 1 ? "produto" : "produtos"}
            {hasFilters && (
              <ClearFiltersButton type="button" onClick={clearFilters}>
                Limpar filtros
              </ClearFiltersButton>
            )}
          </FilterSummary>
        </FilterBar>

        {error && <Alert variant="error">{error}</Alert>}

        {isInitialLoading && <Skeleton lines={5} height="3rem" />}

        {!isInitialLoading && products.length === 0 && hasFilters && (
          <EmptyState
            title="Nenhum produto encontrado"
            description="Nenhum item do catálogo combina com esses filtros."
            action={
              <Button variant="ghost" onClick={clearFilters}>
                Limpar filtros
              </Button>
            }
          />
        )}

        {!isInitialLoading && products.length === 0 && !hasFilters && (
          <EmptyState
            title="Nenhum produto cadastrado"
            description="Comece adicionando um novo item ao catálogo."
            action={
              <Button onClick={() => navigate("/admin/products/new")}>
                Cadastrar item
              </Button>
            }
          />
        )}

        {!isInitialLoading && products.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Tags</th>
                  <th>Destaque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <ProductImage
                        name={product.name}
                        imagePath={product.imagePath}
                        alt={product.name}
                        width={48}
                        height={48}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>
                      <StatusBadge $status={product.status ?? "active"}>
                        {STATUS_LABELS[product.status ?? "active"]}
                      </StatusBadge>
                    </td>
                    <td>{product.tags?.join(", ") ?? "—"}</td>
                    <td>{product.bestSeller ? "Sim" : "Não"}</td>
                    <td>
                      <TableActions>
                        <StatusButton
                          type="button"
                          onClick={() =>
                            handleToggleStatus(
                              product.id,
                              product.status ?? "active"
                            )
                          }
                        >
                          {product.status === "active" ? "Desativar" : "Ativar"}
                        </StatusButton>
                        <ActionLink to={`/admin/products/${product.id}/edit`}>
                          Editar
                        </ActionLink>
                        <DeleteButton
                          type="button"
                          onClick={() => handleRemove(product.id, product.name)}
                        >
                          Remover
                        </DeleteButton>
                      </TableActions>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={setPage}
              disabled={isInitialLoading || isRefreshing}
            />
          </>
        )}
      </PageSection>
    </>
  );
}

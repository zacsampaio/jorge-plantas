import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Pagination } from "../../../components/ui/Pagination";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Alert } from "../../../components/ui/Alert";
import { ProductImage } from "../../../components/ProductImage";
import { usePaginatedFetch } from "../../../hooks/usePaginatedFetch";
import { useCatalogStore } from "../../../stores/catalogStore";
import { fetchCatalogProductsPaginated } from "../../../services/products/productService";
import { DEFAULT_PAGE_SIZE } from "../../../types/pagination";
import { formatCurrency } from "../../../utils/format";
import type { ProductStatus } from "../../../redux/cart/types";
import {
  ActionLink,
  AdminHeader,
  AdminTitle,
  DeleteButton,
  StatusBadge,
  StatusButton,
  Table,
  TableActions,
} from "./styled";
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

  const fetchPage = useCallback(
    (page: number, pageSize: number) => fetchCatalogProductsPaginated({ page, pageSize }),
    []
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
        {error && <Alert variant="error">{error}</Alert>}

        {isInitialLoading && <Skeleton lines={5} height="3rem" />}

        {!isInitialLoading && products.length === 0 && (
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

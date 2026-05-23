import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardCatalag } from "../Home/components/main/components/productCatalog";
import { Skeleton } from "../../components/ui/Skeleton";
import { Pagination } from "../../components/ui/Pagination";
import { usePaginatedFetch } from "../../hooks/usePaginatedFetch";
import { fetchCatalogProductsPaginated } from "../../services/products/productService";
import { DEFAULT_PAGE_SIZE } from "../../types/pagination";
import {
  FilterButton,
  ProdutosContainer,
  ProdutosGrid,
  ProdutosLayout,
  ProdutosSubtitle,
  ProdutosTitle,
  ResultsCount,
  Sidebar,
  SidebarTitle,
} from "./styled";

export function Produtos() {
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const fetchPage = useCallback(
    (page: number, pageSize: number) =>
      fetchCatalogProductsPaginated({
        page,
        pageSize,
        status: "active",
        tag: selectedTag,
      }),
    [selectedTag]
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
  } = usePaginatedFetch({
    fetcher: fetchPage,
    pageSize: DEFAULT_PAGE_SIZE,
    resetKey: selectedTag,
  });

  useEffect(() => {
    const categoria = searchParams.get("categoria");
    if (categoria) {
      setSelectedTag(categoria);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCatalogProductsPaginated({ page: 1, pageSize: 100, status: "active" }).then(
      (result) => {
        const allTags = result.data.flatMap((product) => product.tags ?? []);
        setTags([...new Set(allTags)].sort((a, b) => a.localeCompare(b, "pt-BR")));
      }
    );
  }, []);

  return (
    <ProdutosContainer>
      <ProdutosTitle>Nossas plantas</ProdutosTitle>
      <ProdutosSubtitle>
        Explore o catálogo completo e filtre por categoria para encontrar a
        planta ideal.
      </ProdutosSubtitle>

      <ProdutosLayout>
        <Sidebar>
          <SidebarTitle>Categorias</SidebarTitle>
          <FilterButton
            type="button"
            $active={selectedTag === null}
            onClick={() => setSelectedTag(null)}
          >
            Todas
          </FilterButton>
          {tags.map((tag) => (
            <FilterButton
              key={tag}
              type="button"
              $active={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </FilterButton>
          ))}
        </Sidebar>

        <div>
          <ResultsCount>
            {total}{" "}
            {total === 1 ? "produto encontrado" : "produtos encontrados"}
            {selectedTag && ` em "${selectedTag}"`}
          </ResultsCount>
          {isInitialLoading ? (
            <Skeleton lines={5} height="6rem" />
          ) : (
            <>
              <ProdutosGrid data-refreshing={isRefreshing ? "true" : undefined}>
                {products.map((product) => (
                  <CardCatalag key={product.id} product={product} />
                ))}
              </ProdutosGrid>

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
        </div>
      </ProdutosLayout>
    </ProdutosContainer>
  );
}

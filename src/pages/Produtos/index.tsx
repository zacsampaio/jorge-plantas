import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardCatalag } from "../Home/components/main/components/productCatalog";
import {
  filterProductsByTag,
  getAllProductTags,
} from "../../data/products";
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
  const tags = getAllProductTags();
  const filteredProducts = filterProductsByTag(selectedTag);

  useEffect(() => {
    const categoria = searchParams.get("categoria");
    const availableTags = getAllProductTags();
    if (categoria && availableTags.includes(categoria)) {
      setSelectedTag(categoria);
    }
  }, [searchParams]);

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
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            {selectedTag && ` em "${selectedTag}"`}
          </ResultsCount>
          <ProdutosGrid>
            {filteredProducts.map((product) => (
              <CardCatalag key={product.id} product={product} />
            ))}
          </ProdutosGrid>
        </div>
      </ProdutosLayout>
    </ProdutosContainer>
  );
}

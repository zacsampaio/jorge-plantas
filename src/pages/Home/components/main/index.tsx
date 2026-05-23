import { ArrowRight } from "phosphor-react";
import { CardCatalag } from "./components/productCatalog";
import { HeaderMainCatalog, SeeAllProductsLink } from "./styled";
import { getProductsByIds } from "../../../../data/products";
import { landingBestSellerIds } from "../../../../data/categoryShowcases";
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "../../styled";

export function BestSellersSection() {
  const bestSellers = getProductsByIds([...landingBestSellerIds]);

  return (
    <Section>
      <SectionInner>
        <SectionHeader>
          <SectionLabel>Destaques</SectionLabel>
          <SectionTitle>Mais vendidos</SectionTitle>
          <SectionSubtitle>
            As plantas favoritas dos nossos clientes — escolhidas com carinho
            para você.
          </SectionSubtitle>
        </SectionHeader>
        <HeaderMainCatalog>
          {bestSellers.map((product) => (
            <CardCatalag key={product.id} product={product} />
          ))}
        </HeaderMainCatalog>
        <SeeAllProductsLink to="/produtos">
          Ver todos os produtos
          <ArrowRight size={20} weight="bold" />
        </SeeAllProductsLink>
      </SectionInner>
    </Section>
  );
}

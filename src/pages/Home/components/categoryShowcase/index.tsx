import { ArrowRight, House, Sun } from "phosphor-react";
import { CardCatalag } from "../main/components/productCatalog";
import { useProductsByIds } from "../../../../data/products";
import { CategoryShowcaseConfig } from "../../../../data/categoryShowcases";
import { Skeleton } from "../../../../components/ui/Skeleton";
import {
  CategoryCta,
  CategoryGrid,
  CategoryHeader,
  CategoryImpact,
  CategoryLabel,
  CategorySection,
  CategorySubtitle,
  CategoryTitle,
  CategoryTitleRow,
} from "./styled";

interface CategoryShowcaseSectionProps {
  config: CategoryShowcaseConfig;
}

const icons = {
  green: House,
  yellow: Sun,
} as const;

export function CategoryShowcaseSection({ config }: CategoryShowcaseSectionProps) {
  const { products, isLoading } = useProductsByIds(config.productIds);
  const Icon = icons[config.accent];

  return (
    <CategorySection $accent={config.accent}>
      <CategoryHeader>
        <CategoryLabel $accent={config.accent}>
          <Icon size={18} weight="duotone" />
          {config.label}
        </CategoryLabel>
        <CategoryTitleRow>
          <CategoryTitle>{config.title}</CategoryTitle>
        </CategoryTitleRow>
        <CategoryImpact>“{config.impactPhrase}”</CategoryImpact>
        <CategorySubtitle>{config.subtitle}</CategorySubtitle>
      </CategoryHeader>

      {isLoading ? (
        <Skeleton lines={4} height="14rem" />
      ) : (
        <CategoryGrid>
          {products.map((product) => (
            <CardCatalag key={product.id} product={product} />
          ))}
        </CategoryGrid>
      )}

      <CategoryCta
        to={`/produtos?categoria=${encodeURIComponent(config.tag)}`}
        $accent={config.accent}
      >
        {config.ctaLabel}
        <ArrowRight size={18} weight="bold" />
      </CategoryCta>
    </CategorySection>
  );
}

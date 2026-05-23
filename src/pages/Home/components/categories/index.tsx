import { ArrowRight } from "phosphor-react";
import { categories } from "../../../../data/categories";
import {
  CategoryCard,
  CategoryDescription,
  CategoryGrid,
  CategoryIconWrap,
  CategoryLink,
  CategoryTitle,
} from "./styled";
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "../../styled";

export function CategoriesSection() {
  return (
    <Section $variant="muted">
      <SectionInner>
        <SectionHeader>
          <SectionLabel>Explore por ambiente</SectionLabel>
          <SectionTitle>Encontre a planta certa para você</SectionTitle>
          <SectionSubtitle>
            Cada espécie tem necessidades diferentes de luz e cuidado. Escolha a
            categoria que combina com o seu espaço.
          </SectionSubtitle>
        </SectionHeader>

        <CategoryGrid>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <CategoryCard key={category.tag} $accent={category.accent}>
                <CategoryIconWrap $accent={category.accent}>
                  <Icon size={28} weight="duotone" />
                </CategoryIconWrap>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <CategoryLink
                  to={`/produtos?categoria=${encodeURIComponent(category.tag)}`}
                >
                  Ver plantas
                  <ArrowRight size={16} weight="bold" />
                </CategoryLink>
              </CategoryCard>
            );
          })}
        </CategoryGrid>
      </SectionInner>
    </Section>
  );
}

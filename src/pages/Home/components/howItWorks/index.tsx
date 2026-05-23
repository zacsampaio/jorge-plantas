import { Flower, ShoppingCart, Package } from "phosphor-react";
import {
  StepCard,
  StepDescription,
  StepGrid,
  StepNumber,
  StepTitle,
  StepsConnector,
} from "./styled";
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "../../styled";

const steps = [
  {
    step: 1,
    icon: Flower,
    title: "Escolha suas plantas",
    description:
      "Navegue pelo catálogo, filtre por categoria e encontre a espécie ideal para o seu ambiente.",
  },
  {
    step: 2,
    icon: ShoppingCart,
    title: "Monte seu carrinho",
    description:
      "Adicione quantidades, revise os itens e siga para o checkout com seus dados de entrega.",
  },
  {
    step: 3,
    icon: Package,
    title: "Finalize pelo WhatsApp",
    description:
      "Seu pedido é enviado automaticamente para nossa equipe, que confirma e combina a entrega.",
  },
];

export function HowItWorksSection() {
  return (
    <Section $variant="muted">
      <SectionInner>
        <SectionHeader>
          <SectionLabel>Simples e rápido</SectionLabel>
          <SectionTitle>Como funciona o pedido</SectionTitle>
          <SectionSubtitle>
            Em poucos passos você leva plantas frescas até a sua porta — sem
            complicação.
          </SectionSubtitle>
        </SectionHeader>

        <StepGrid>
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <StepCard key={item.step}>
                <StepNumber>{item.step}</StepNumber>
                <Icon size={40} weight="duotone" />
                <StepTitle>{item.title}</StepTitle>
                <StepDescription>{item.description}</StepDescription>
                {index < steps.length - 1 && <StepsConnector aria-hidden />}
              </StepCard>
            );
          })}
        </StepGrid>
      </SectionInner>
    </Section>
  );
}

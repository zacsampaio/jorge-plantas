import { Leaf, Heart, Truck, WhatsappLogo } from "phosphor-react";
import {
  DiffCard,
  DiffDescription,
  DiffGrid,
  DiffIconWrap,
  DiffTitle,
} from "./styled";
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "../../styled";

const items = [
  {
    icon: Leaf,
    title: "Cultivo cuidadoso",
    description:
      "Cada muda é selecionada e cultivada com atenção para chegar saudável e pronta para prosperar no seu lar.",
    color: "green" as const,
  },
  {
    icon: Heart,
    title: "Paixão pela natureza",
    description:
      "Mais de 20 anos transformando ambientes em Fortaleza com plantas que contam histórias e renovam espaços.",
    color: "yellow" as const,
  },
  {
    icon: Truck,
    title: "Entrega com cuidado",
    description:
      "Embalagens pensadas para proteger suas plantas no trajeto, com entrega ágil na região metropolitana.",
    color: "gray" as const,
  },
  {
    icon: WhatsappLogo,
    title: "Atendimento humano",
    description:
      "Tire dúvidas, monte seu pedido e finalize pelo WhatsApp com quem entende de plantas de verdade.",
    color: "green" as const,
  },
];

export function DifferentialsSection() {
  return (
    <Section>
      <SectionInner>
        <SectionHeader>
          <SectionLabel>Por que Jorge Plantas</SectionLabel>
          <SectionTitle>Muito mais que uma floricultura</SectionTitle>
          <SectionSubtitle>
            Unimos tradição, qualidade e um atendimento próximo para você levar
            a natureza para dentro de casa com tranquilidade.
          </SectionSubtitle>
        </SectionHeader>

        <DiffGrid>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <DiffCard key={item.title}>
                <DiffIconWrap $color={item.color}>
                  <Icon size={32} weight="duotone" />
                </DiffIconWrap>
                <DiffTitle>{item.title}</DiffTitle>
                <DiffDescription>{item.description}</DiffDescription>
              </DiffCard>
            );
          })}
        </DiffGrid>
      </SectionInner>
    </Section>
  );
}

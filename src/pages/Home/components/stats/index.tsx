import { MapPin, Flower, UsersThree } from "phosphor-react";
import { StatCard, StatGrid, StatLabel, StatValue } from "./styled";
import { Section, SectionInner } from "../../styled";

const stats = [
  { icon: Flower, value: "15+", label: "Espécies no catálogo" },
  { icon: UsersThree, value: "20+", label: "Anos de experiência" },
  { icon: MapPin, value: "Fortaleza", label: "Entrega na região metropolitana" },
];

export function StatsSection() {
  return (
    <Section>
      <SectionInner>
        <StatGrid>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StatCard key={stat.label}>
                <Icon size={36} weight="duotone" />
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            );
          })}
        </StatGrid>
      </SectionInner>
    </Section>
  );
}

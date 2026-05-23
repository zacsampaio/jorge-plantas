import { ArrowRight } from "phosphor-react";
import { brandImpactQuotes } from "../../../../data/categoryShowcases";
import {
  ImpactCta,
  ImpactInner,
  ImpactQuote,
  ImpactSection,
  ImpactSignature,
} from "./styled";

interface ImpactQuoteSectionProps {
  index?: 0 | 1;
  variant?: "green" | "dark";
}

export function ImpactQuoteSection({
  index = 0,
  variant = "green",
}: ImpactQuoteSectionProps) {
  const content = brandImpactQuotes[index];

  return (
    <ImpactSection $variant={variant}>
      <ImpactInner>
        <ImpactQuote>“{content.quote}”</ImpactQuote>
        <ImpactSignature>— {content.signature}</ImpactSignature>
        <ImpactCta to={content.ctaTo} $onDark={variant === "dark"}>
          {content.cta}
          <ArrowRight size={20} weight="bold" />
        </ImpactCta>
      </ImpactInner>
    </ImpactSection>
  );
}

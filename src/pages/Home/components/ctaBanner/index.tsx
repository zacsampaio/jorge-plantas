import { WhatsappLogo, ArrowRight } from "phosphor-react";
import {
  CtaActions,
  CtaBannerInner,
  CtaOutlineButton,
  CtaPrimaryButton,
  CtaText,
  CtaTitle,
} from "./styled";
import { Section, SectionInner } from "../../styled";

export function CtaBannerSection() {
  return (
    <Section $variant="green">
      <SectionInner>
        <CtaBannerInner>
          <div>
            <CtaTitle>Sua próxima planta está a um clique de distância</CtaTitle>
            <CtaText>
              Escolha, adicione ao carrinho e finalize pelo WhatsApp — simples
              assim. A Jorge Plantas entrega natureza com o carinho de quem
              cultiva há mais de 20 anos em Fortaleza.
            </CtaText>
          </div>
          <CtaActions>
            <CtaPrimaryButton to="/produtos">
              Ver catálogo completo
              <ArrowRight size={20} weight="bold" />
            </CtaPrimaryButton>
            <CtaOutlineButton
              href="https://wa.me/5585997422142"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={22} weight="fill" />
              Falar no WhatsApp
            </CtaOutlineButton>
          </CtaActions>
        </CtaBannerInner>
      </SectionInner>
    </Section>
  );
}

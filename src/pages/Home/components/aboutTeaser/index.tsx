import { ArrowRight, Sparkle } from "phosphor-react";
import {
  AboutActions,
  AboutContent,
  AboutHighlight,
  AboutImageFrame,
  AboutLayout,
  AboutLink,
  AboutText,
  AboutVisual,
} from "./styled";
import {
  Section,
  SectionInner,
  SectionLabel,
} from "../../styled";
import { AboutSectionTitle } from "./styled";
const logoImg = "/assets/logo-jorge-plantas.png";

export function AboutTeaserSection() {
  return (
    <Section>
      <SectionInner>
        <AboutLayout>
          <AboutVisual>
            <AboutImageFrame>
              <img src={logoImg} alt="Jorge Plantas" />
            </AboutImageFrame>
            <AboutHighlight>
              <Sparkle size={20} weight="fill" />
              <span>Floricultura familiar em Fortaleza</span>
            </AboutHighlight>
          </AboutVisual>

          <AboutContent>
            <SectionLabel>Nossa história</SectionLabel>
            <AboutSectionTitle>
              Raízes firmes, plantas que florescem
            </AboutSectionTitle>
            <AboutText>
              A Jorge Plantas nasceu da paixão por transformar ambientes com a
              beleza da natureza. Cada planta que cultivamos carrega o cuidado de
              quem acredita que verde é sinônimo de vida, renovação e bem-estar.
            </AboutText>
            <AboutText>
              Trabalhamos com espécies selecionadas para dentro de casa, varandas
              e jardins — sempre com orientação próxima para você escolher com
              confiança.
            </AboutText>
            <AboutActions>
              <AboutLink to="/sobre-nos">
                Conheça nossa história
                <ArrowRight size={18} weight="bold" />
              </AboutLink>
            </AboutActions>
          </AboutContent>
        </AboutLayout>
      </SectionInner>
    </Section>
  );
}

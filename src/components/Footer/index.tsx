import { Link } from "react-router-dom";
import { 
  FooterContainer, 
  FooterContent, 
  FooterSection, 
  FooterTitle, 
  FooterText, 
  FooterLink, 
  FooterBottom,
  FooterBottomText
} from "./styled";

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Jorge Plantas</FooterTitle>
          <FooterText>
            Transformando ambientes com a beleza da natureza há mais de 20 anos. 
            Cada planta é cuidada com carinho para chegar até você saudável e vibrante.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Links Úteis</FooterTitle>
          <FooterLink as={Link} to="/">
            Início
          </FooterLink>
          <FooterLink as={Link} to="/sobre-nos">
            Sobre Nós
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contatos</FooterTitle>
          <FooterLink href="https://www.instagram.com/jorge.plantas" target="_blank" rel="noopener noreferrer">
            @jorge.plantas
          </FooterLink>
          <FooterLink href="mailto:jorgeplantas.contato@gmail.com">
            jorgeplantas.contato@gmail.com
          </FooterLink>
          <FooterLink href="https://wa.me/5585997422142" target="_blank" rel="noopener noreferrer">
            (85) 9 9742-2142
          </FooterLink>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <FooterBottomText>
          © 2025 Jorge Plantas. Todos os direitos reservados.
        </FooterBottomText>
      </FooterBottom>
    </FooterContainer>
  );
}

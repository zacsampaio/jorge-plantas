import { 
  SobreNosContainer, 
  HeroSection, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle,
  HistorySection,
  SectionTitle,
  SectionText,
  ValuesSection,
  ValuesGrid,
  ValueCard,
  ValueTitle,
  ValueDescription,
  MissionSection,
  MissionContent,
  MissionText,
  ServicesSection,
  ServiceGrid,
  ServiceCard,
  ServiceTitle,
  ServiceDescription,
  ContactSection,
  ContactInfo,
  ContactItem,
  ContactText,
  ContactLink,
  CTAButtons,
  CTAButton
} from "./styled";

export function SobreNos() {
  return (
    <SobreNosContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Nossa História</HeroTitle>
          <HeroSubtitle>
            Conheça a jornada da Jorge Plantas, uma empresa que nasceu da paixão pela natureza 
            e transformou sonhos em ambientes verdes que conectam pessoas com a beleza natural.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <HistorySection>
        <SectionTitle>O Sonho que Mudou Tudo</SectionTitle>
        <SectionText>
          A Jorge Plantas surgiu da vontade de criar algo que refletisse o carinho, a conexão e 
          o significado profundo da nossa relação com a natureza. Queríamos que cada planta 
          contasse uma história, que cada espécie fosse um elo entre as pessoas e o meio ambiente.
        </SectionText>
        <SectionText>
          E assim, escolhemos trabalhar com plantas por tudo o que elas simbolizam: vida, 
          crescimento, beleza e renovação. Uma conexão que, como nossa paixão, é preciosa e duradoura.
        </SectionText>
      </HistorySection>

      <ValuesSection>
        <SectionTitle>Nossos Valores</SectionTitle>
        <SectionText>
          Os princípios que guiam cada decisão e cada planta que cuidamos.
        </SectionText>
        
        <ValuesGrid>
          <ValueCard>
            <ValueTitle>Natureza</ValueTitle>
            <ValueDescription>
              Acreditamos que as melhores coisas da vida nascem da conexão com a natureza. 
              Cada planta é um símbolo de vida e renovação.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Qualidade</ValueTitle>
            <ValueDescription>
              Comprometimento com a excelência em cada detalhe, desde a seleção das mudas 
              até o cuidado final.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Conexão</ValueTitle>
            <ValueDescription>
              Criamos elos entre pessoas através de plantas que transformam ambientes 
              e celebram momentos especiais.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </ValuesSection>

      <MissionSection>
        <SectionTitle>Nossa Missão</SectionTitle>
        <MissionContent>
          <MissionText>
            "Queremos que cada pessoa que tenha uma planta da Jorge Plantas sinta-se conectada 
            com a natureza, renovada e inspirada. Nossas plantas são mais que decoração - 
            são símbolos de momentos preciosos, ambientes saudáveis e vida duradoura."
          </MissionText>
        </MissionContent>
      </MissionSection>

      <ServicesSection>
        <SectionTitle>Serviços Especializados</SectionTitle>
        <SectionText>
          Escolha o serviço e entre em contato para fazer seu orçamento personalizado!
        </SectionText>
        
        <ServiceGrid>
          <ServiceCard>
            <ServiceTitle>Paisagismo</ServiceTitle>
            <ServiceDescription>
              Criação de projetos paisagísticos personalizados para transformar seu espaço em um ambiente único e harmonioso.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceTitle>Poda e Cultivo</ServiceTitle>
            <ServiceDescription>
              Técnicas especializadas de poda e cultivo para manter suas plantas sempre saudáveis e bem formadas.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceTitle>Preparação de Terreno</ServiceTitle>
            <ServiceDescription>
              Preparação adequada do solo para plantio, garantindo o desenvolvimento ideal de suas plantas.
            </ServiceDescription>
          </ServiceCard>
        </ServiceGrid>
      </ServicesSection>

      <ContactSection>
        <SectionTitle>Nossa Visão de Futuro</SectionTitle>
        <SectionText>
          Sonhamos em ser reconhecidos como uma empresa que não apenas vende plantas, 
          mas que cria experiências e ambientes duradouros.
        </SectionText>
        <SectionText>
          Queremos expandir nossa família de clientes, sempre mantendo a qualidade e o carinho 
          que nos caracterizam, levando a beleza e o significado das plantas para mais pessoas.
        </SectionText>
        
        <CTAButtons>
          <CTAButton href="/">
            Ver Nossa Coleção
          </CTAButton>
          <CTAButton href="https://wa.me/5585997422142" target="_blank" rel="noopener noreferrer">
            Dúvidas? Fale Conosco
          </CTAButton>
        </CTAButtons>

        <ContactInfo>
          <ContactItem>
            <ContactText>
              <strong>WhatsApp:</strong> <ContactLink href="https://wa.me/5585997422142" target="_blank" rel="noopener noreferrer">(85) 99742-2142</ContactLink>
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <ContactText>
              <strong>Email:</strong> <ContactLink href="mailto:jorgeplantas.contato@gmail.com">jorgeplantas.contato@gmail.com</ContactLink>
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <ContactText>
              <strong>Instagram:</strong> <ContactLink href="https://www.instagram.com/jorge.plantas" target="_blank" rel="noopener noreferrer">@jorge.plantas</ContactLink>
            </ContactText>
          </ContactItem>
        </ContactInfo>
      </ContactSection>
    </SobreNosContainer>
  );
}

import styled from "styled-components";

export const SobreNosContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme["white"]};
`;

export const HeroSection = styled.section`
  background: ${props => props.theme["white"]};
  padding: 4rem 0 3rem;
  text-align: center;
`;

export const HeroContent = styled.div`
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
  }
`;

export const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${props => props.theme["gray-800"]};
  margin-bottom: 1.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme["gray-600"]};
  max-width: 700px;
  margin: 0 auto;
`;

export const HistorySection = styled.section`
  padding: 3rem 0;
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${props => props.theme["gray-800"]};
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${props => props.theme["gray-600"]};
  margin-bottom: 1rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ValuesSection = styled.section`
  background: ${props => props.theme["gray-50"]};
  padding: 3rem 0;
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
    grid-template-columns: 1fr;
  }
`;

export const ValueCard = styled.div`
  background: ${props => props.theme["white"]};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme["gray-200"]};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const ValueTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme["green-500"]};
  margin-bottom: 0.75rem;
`;

export const ValueDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${props => props.theme["gray-600"]};
  margin: 0;
`;

export const MissionSection = styled.section`
  padding: 3rem 0;
  background: ${props => props.theme["white"]};
  text-align: center;
`;

export const MissionContent = styled.div`
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
  }
`;

export const MissionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme["gray-700"]};
  font-style: italic;
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  background: ${props => props.theme["gray-50"]};
  border-radius: 8px;
  border-left: 3px solid ${props => props.theme["green-500"]};
`;

export const ServicesSection = styled.section`
  background: ${props => props.theme["gray-50"]};
  padding: 3rem 0;
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
    grid-template-columns: 1fr;
  }
`;

export const ServiceCard = styled.div`
  background: ${props => props.theme["white"]};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme["gray-200"]};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const ServiceTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme["green-500"]};
  margin-bottom: 0.75rem;
`;

export const ServiceDescription = styled.p`
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${props => props.theme["gray-600"]};
  margin: 0;
`;

export const ContactSection = styled.section`
  padding: 3rem 0;
  background: ${props => props.theme["white"]};
  text-align: center;
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${props => props.theme["green-500"]};
  color: ${props => props.theme["white"]};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme["green-300"]};
    text-decoration: none;
  }

  &:last-child {
    background: ${props => props.theme["gray-600"]};
    
    &:hover {
      background: ${props => props.theme["gray-700"]};
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto 0;
`;

export const ContactItem = styled.div`
  padding: 1rem;
  background: ${props => props.theme["gray-50"]};
  border-radius: 8px;
  border: 1px solid ${props => props.theme["gray-200"]};
`;

export const ContactText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme["gray-700"]};
  margin: 0;
`;

export const ContactLink = styled.a`
  color: ${props => props.theme["green-500"]};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme["green-300"]};
    text-decoration: underline;
  }
`;

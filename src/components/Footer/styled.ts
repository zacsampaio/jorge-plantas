import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: ${props => props.theme["white"]};
  border-top: 1px solid ${props => props.theme["gray-200"]};
  margin-top: 4rem;
`;

export const FooterContent = styled.div`
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding: 3rem 2rem 2rem;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem 1rem;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme["gray-800"]};
  margin-bottom: 0.5rem;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${props => props.theme["gray-600"]};
  margin: 0;
`;

export const FooterLink = styled.a`
  font-size: 0.875rem;
  color: ${props => props.theme["gray-600"]};
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${props => props.theme["green-600"]};
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme["gray-200"]};
  padding: 1.5rem 2rem;
  text-align: center;
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1090px) {
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem);
    padding: 1rem;
  }
`;

export const FooterBottomText = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme["gray-500"]};
  margin: 0;
`;

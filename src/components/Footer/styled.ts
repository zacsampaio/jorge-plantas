import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: ${(props) => props.theme.white};
  border-top: 1px solid ${(props) => props.theme["gray-200"]};
  margin-top: 4rem;
  width: 100%;
`;

export const FooterContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding: 3rem 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0 1rem;
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
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 0.5rem;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${(props) => props.theme["gray-600"]};
  margin: 0;
`;

export const FooterLink = styled.a`
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-600"]};
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${(props) => props.theme["green-600"]};
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid ${(props) => props.theme["gray-200"]};
  padding: 1.5rem 0;
  text-align: center;
  width: 100%;
`;

export const FooterBottomText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-600"]};
  margin: 0;
`;

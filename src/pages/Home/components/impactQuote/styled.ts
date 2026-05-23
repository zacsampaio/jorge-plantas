import styled from "styled-components";
import { Link } from "react-router-dom";

export const ImpactSection = styled.section<{
  $variant: "green" | "dark";
}>`
  padding: 3.5rem 1.5rem;
  text-align: center;
  background: ${(props) =>
    props.$variant === "dark"
      ? props.theme["gray-800"]
      : `linear-gradient(135deg, ${props.theme["green-500"]} 0%, #247a42 100%)`};
  color: ${(props) => props.theme.white};
`;

export const ImpactInner = styled.div`
  max-width: 44rem;
  margin: 0 auto;
`;

export const ImpactQuote = styled.blockquote`
  font-family: "Baloo 2", sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  line-height: 140%;
  margin: 0;
  font-style: normal;
`;

export const ImpactSignature = styled.p`
  margin-top: 1.25rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  opacity: 0.9;
  letter-spacing: 0.04em;
`;

export const ImpactCta = styled(Link)<{ $onDark?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 0.875rem 1.75rem;
  background: ${(props) => props.theme.white};
  color: ${(props) =>
    props.$onDark ? props.theme["gray-800"] : props.theme["green-500"]};
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

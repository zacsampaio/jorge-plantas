import styled from "styled-components";
import { Link } from "react-router-dom";

type Accent = "green" | "yellow";

const accentMap = {
  green: (theme: { [key: string]: string }) => ({
    bg: theme["green-100"],
    border: theme["green-300"],
    label: theme["green-500"],
    cta: theme["green-500"],
    ctaHover: theme["green-300"],
  }),
  yellow: (theme: { [key: string]: string }) => ({
    bg: theme["yellow-100"],
    border: theme["yellow-300"],
    label: theme["yellow-500"],
    cta: theme["yellow-500"],
    ctaHover: theme["yellow-300"],
  }),
};

export const CategorySection = styled.section<{ $accent: Accent }>`
  padding: 4rem 1rem;
  background: ${(props) => accentMap[props.$accent](props.theme).bg};
  border-top: 4px solid ${(props) => accentMap[props.$accent](props.theme).border};
  border-bottom: 4px solid ${(props) => accentMap[props.$accent](props.theme).border};
`;

export const CategoryHeader = styled.div`
  max-width: 72rem;
  margin: 0 auto 2.5rem;
  text-align: center;
`;

export const CategoryLabel = styled.span<{ $accent: Accent }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => accentMap[props.$accent](props.theme).label};
  margin-bottom: 0.5rem;
`;

export const CategoryTitleRow = styled.div`
  margin-bottom: 1rem;
`;

export const CategoryTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  color: ${(props) => props.theme["gray-800"]};
`;

export const CategoryImpact = styled.p`
  max-width: 40rem;
  margin: 0 auto 1rem;
  font-family: "Baloo 2", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 150%;
  color: ${(props) => props.theme["gray-800"]};
  font-style: italic;
`;

export const CategorySubtitle = styled.p`
  max-width: 36rem;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 160%;
  color: ${(props) => props.theme["gray-600"]};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 72rem;
  margin: 0 auto;
  justify-items: center;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCta = styled(Link)<{ $accent: Accent }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  margin: 2.5rem auto 0;
  padding: 0.875rem 1.75rem;
  background: ${(props) => accentMap[props.$accent](props.theme).cta};
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: ${(props) => accentMap[props.$accent](props.theme).ctaHover};
    transform: translateY(-1px);
  }
`;

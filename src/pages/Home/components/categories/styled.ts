import styled from "styled-components";
import { Link } from "react-router-dom";

type Accent = "green" | "yellow" | "gray";

const accentColors = {
  green: (theme: { [key: string]: string }) => ({
    bg: theme["green-100"],
    icon: theme["green-500"],
    border: theme["green-300"],
  }),
  yellow: (theme: { [key: string]: string }) => ({
    bg: theme["yellow-100"],
    icon: theme["yellow-500"],
    border: theme["yellow-300"],
  }),
  gray: (theme: { [key: string]: string }) => ({
    bg: theme["gray-200"],
    icon: theme["gray-700"],
    border: theme["gray-400"],
  }),
};

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.article<{ $accent: Accent }>`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: ${(props) => props.theme.white};
  border-radius: 12px;
  border: 2px solid
    ${(props) => accentColors[props.$accent](props.theme).border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

export const CategoryIconWrap = styled.div<{ $accent: Accent }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  background: ${(props) => accentColors[props.$accent](props.theme).bg};
  color: ${(props) => accentColors[props.$accent](props.theme).icon};
`;

export const CategoryTitle = styled.h3`
  font-family: "Baloo 2", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 0.5rem;
`;

export const CategoryDescription = styled.p`
  flex: 1;
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  line-height: 160%;
  color: ${(props) => props.theme["gray-600"]};
  margin-bottom: 1.25rem;
`;

export const CategoryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${(props) => props.theme["green-500"]};
  text-decoration: none;
  transition: gap 0.2s;

  &:hover {
    gap: 0.6rem;
  }
`;

import styled from "styled-components";

export const ProdutosContainer = styled.div`
  margin-bottom: 4rem;
  width: 100%;
`;

export const ProdutosTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  line-height: 130%;
  font-family: "Baloo 2", sans-serif;
  margin-top: 3rem;
`;

export const ProdutosSubtitle = styled.p`
  margin-top: 0.75rem;
  font-family: "Roboto", sans-serif;
  font-size: 1.125rem;
  color: ${(props) => props.theme["gray-600"]};
  line-height: 150%;
  max-width: 40rem;
`;

export const ProdutosLayout = styled.div`
  display: grid;
  grid-template-columns: 14rem 1fr;
  gap: 2.5rem;
  margin-top: 2.5rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 8px;
  position: sticky;
  top: 1rem;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const SidebarTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 0.5rem;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  background: ${(props) =>
    props.$active ? props.theme["green-500"] : "transparent"};
  color: ${(props) =>
    props.$active ? props.theme.white : props.theme["gray-700"]};

  &:hover {
    background: ${(props) =>
      props.$active ? props.theme["green-500"] : props.theme["gray-200"]};
  }
`;

export const ResultsCount = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-600"]};
  margin-bottom: 1rem;
`;

export const ProdutosError = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["yellow-500"]};
  background: ${(props) => props.theme["yellow-100"]};
  color: ${(props) => props.theme["gray-800"]};
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.5;

  button {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 8px;
    background: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};
    font-weight: 600;
    cursor: pointer;
  }
`;

export const ProdutosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  transition: opacity 0.15s ease;

  &[data-refreshing="true"] {
    opacity: 0.55;
    pointer-events: none;
  }

  @media (max-width: 1440px) {
    justify-content: center;
  }

  @media (max-width: 471px) {
    flex-direction: column;
    align-items: center;
  }
`;

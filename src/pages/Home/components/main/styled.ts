import styled from "styled-components";
import { Link } from "react-router-dom";

export const SeeAllProductsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  padding: 1rem 0;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme["green-300"]};
  }
`;

export const HeaderMainCatalog = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-items: center;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

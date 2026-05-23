import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const AccountLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const AccountSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
  }
`;

export const AccountNavLink = styled(NavLink)`
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme["gray-700"]};
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;

  &:hover,
  &.active {
    background: ${(props) => props.theme["green-100"]}30;
    color: ${(props) => props.theme["green-500"]};
  }
`;

export const AccountContent = styled.main`
  min-width: 0;
`;

export const PageTitle = styled.h1`
  font-family: "Baloo 2", cursive;
  font-size: 1.75rem;
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 1.5rem;
`;

export const PageSection = styled.section`
  background: ${(props) => props.theme.white};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: opacity 0.15s ease;

  &[data-refreshing="true"] {
    opacity: 0.55;
    pointer-events: none;
  }
`;

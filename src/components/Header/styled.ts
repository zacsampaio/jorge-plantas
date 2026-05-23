import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavContainer = styled.nav`
  padding: 1rem 0;

  @media (min-width: 769px) {
    padding: 1.5rem 0;
  }
`;

export const NavTopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 769px) {
    flex-wrap: nowrap;
    gap: 1.5rem;
  }
`;

export const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  order: 1;

  img {
    display: block;
    height: 2.25rem;
    width: auto;
  }

  @media (min-width: 769px) {
    img {
      height: 2.5rem;
    }
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  order: 2;
  margin-left: auto;

  @media (min-width: 769px) {
    order: 3;
    margin-left: 0;
    gap: 0.75rem;
  }
`;

export const MenuToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid ${(props) => props.theme["gray-200"]};
  border-radius: 8px;
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme["gray-700"]};
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const NavLinks = styled.div<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;
  width: 100%;
  order: 4;
  padding: 0.5rem 0 0;
  border-top: 1px solid ${(props) => props.theme["gray-200"]};

  ${(props) =>
    props.$open &&
    `
    display: flex;
  `}

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    order: 2;
    gap: 2rem;
    width: auto;
    padding: 0;
    border-top: none;
  }
`;

export const NavMenuLink = styled(NavLink)`
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${(props) => props.theme["gray-700"]};
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s;
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  text-align: center;

  &:hover,
  &.active {
    color: ${(props) => props.theme["green-500"]};
    background: ${(props) => props.theme["green-100"]};
  }

  @media (min-width: 769px) {
    padding: 0.25rem 0.5rem;
    text-align: left;

    &:hover,
    &.active {
      background: transparent;
    }
  }
`;

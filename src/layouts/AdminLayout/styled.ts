import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const AdminShell = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  align-items: start;
  min-height: 100vh;
  background: ${(props) => props.theme["gray-50"] ?? props.theme["gray-100"]};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminSidebar = styled.aside`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 260px;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
  background: ${(props) => props.theme["gray-800"]};
  color: ${(props) => props.theme.white};
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    height: auto;
    max-height: none;
  }
`;

export const SidebarBrand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: ${(props) => props.theme.white};
  font-family: "Baloo 2", cursive;
  font-size: 1.25rem;

  img {
    height: 36px;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-height: 0;
`;

export const AdminNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme["gray-300"]};
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${(props) => props.theme.white};
  }

  &.active {
    background: ${(props) => props.theme["yellow-500"]};
    color: ${(props) => props.theme["gray-800"]};
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
`;

export const AdminMain = styled.main`
  padding: 2rem;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const AdminContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  transition: opacity 0.15s ease;

  &[data-refreshing="true"] {
    opacity: 0.55;
    pointer-events: none;
  }
`;

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const AdminTitle = styled.h1`
  font-family: "Baloo 2", cursive;
  font-size: 1.75rem;
  color: ${(props) => props.theme["gray-800"]};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  background: ${(props) => props.theme.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  th,
  td {
    padding: 0.875rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme["gray-300"]};
  }

  th {
    font-weight: 600;
    color: ${(props) => props.theme["gray-700"]};
    background: ${(props) => props.theme["gray-100"]};
  }

  td {
    color: ${(props) => props.theme["gray-800"]};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const ActionLink = styled(NavLink)`
  font-size: 0.8125rem;
  color: ${(props) => props.theme["green-500"]};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8125rem;
  color: #c0392b;
  cursor: pointer;
  font-weight: 500;
  font-family: "Roboto", sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

export const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  background: #25d366;
  color: white;
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  font-family: "Roboto", sans-serif;

  &:hover {
    background: #1ebe57;
  }
`;

export const StatusSelect = styled.select`
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  background: white;
`;


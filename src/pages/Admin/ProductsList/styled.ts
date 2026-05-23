import styled from "styled-components";
export {
  ActionLink,
  AdminHeader,
  AdminTitle,
  DeleteButton,
  Table,
  TableActions,
} from "../../../layouts/AdminLayout/styled";

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  background: ${(props) =>
    props.$status === "active" ? "#e8f8ef" : props.theme["gray-200"]};
  color: ${(props) =>
    props.$status === "active" ? "#1e7e4a" : props.theme["gray-700"]};
`;

export const StatusButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8125rem;
  color: ${(props) => props.theme["yellow-500"]};
  cursor: pointer;
  font-weight: 500;
  font-family: "Roboto", sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

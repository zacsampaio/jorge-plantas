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

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const FilterField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  color: ${(props) => props.theme["gray-600"]};

  input,
  select {
    border: 1px solid ${(props) => props.theme["gray-500"]};
    background: ${(props) => props.theme.white};
    color: ${(props) => props.theme["gray-800"]};
    padding: 0.5rem 0.625rem;
    border-radius: 8px;
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    min-width: 10rem;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme["green-500"]};
    }
  }
`;

export const SearchField = styled(FilterField)`
  flex: 1 1 16rem;

  input {
    width: 100%;
  }
`;

export const FilterSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  color: ${(props) => props.theme["gray-600"]};
  white-space: nowrap;
`;

export const ClearFiltersButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  color: ${(props) => props.theme["green-600"]};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme["gray-800"]};
  }
`;

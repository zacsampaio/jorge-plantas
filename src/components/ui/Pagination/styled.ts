import styled from "styled-components";

export const PaginationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-700"]};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.5rem;
  border-radius: 6px;
  border: 1px solid
    ${(props) =>
      props.$active ? props.theme["green-500"] : props.theme["gray-300"]};
  background: ${(props) =>
    props.$active ? props.theme["green-500"] : props.theme.white};
  color: ${(props) =>
    props.$active ? props.theme.white : props.theme["gray-800"]};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme["green-500"]};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const NavArrowButton = styled(PageButton)`
  padding: 0 0.65rem;
`;

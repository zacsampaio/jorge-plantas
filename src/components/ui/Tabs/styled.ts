import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  background: ${(props) => props.theme["gray-200"]};
  padding: 0.25rem;
  border-radius: 10px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  background: ${(props) =>
    props.$active ? props.theme.white : "transparent"};
  color: ${(props) =>
    props.$active ? props.theme["green-500"] : props.theme["gray-600"]};
  box-shadow: ${(props) =>
    props.$active ? "0 1px 3px rgba(0,0,0,0.08)" : "none"};

  &:hover {
    color: ${(props) => props.theme["green-500"]};
  }
`;

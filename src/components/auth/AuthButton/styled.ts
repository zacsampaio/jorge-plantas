import styled from "styled-components";

export const AuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  gap: 0.5rem;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  height: 2.375rem;
  border: none;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme["green-100"]};
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0 0.8rem;
    height: 2rem;
  }
`;

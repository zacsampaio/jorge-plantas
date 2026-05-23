import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

interface ButtonProps {
  $variant?: "primary" | "ghost" | "danger";
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  ${(props) => {
    switch (props.$variant) {
      case "ghost":
        return `
          background: transparent;
          color: ${props.theme["gray-700"]};
          border: 1px solid ${props.theme["gray-500"]};
          &:hover:not(:disabled) { background: ${props.theme["gray-200"]}; }
        `;
      case "danger":
        return `
          background: #c0392b;
          color: ${props.theme.white};
          &:hover:not(:disabled) { opacity: 0.9; }
        `;
      default:
        return `
          background: ${props.theme["green-500"]};
          color: ${props.theme.white};
          &:hover:not(:disabled) { background: ${props.theme["green-100"]}; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Spinner = styled.span`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

import styled, { keyframes } from "styled-components";
import type { ToastVariant } from "../../../stores/toastStore";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ToastViewport = styled.div`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(22rem, calc(100vw - 2rem));
  pointer-events: none;

  @media (max-width: 480px) {
    left: 1rem;
    right: 1rem;
    width: auto;
  }
`;

export const ToastCard = styled.div<{ $variant: ToastVariant }>`
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  line-height: 1.45;
  animation: ${slideIn} 0.28s ease-out;
  border: 1px solid transparent;

  ${(props) => {
    switch (props.$variant) {
      case "error":
        return `
          background: #fff5f5;
          color: #9b2c2c;
          border-color: #f5c6cb;
        `;
      case "success":
        return `
          background: #f0fdf4;
          color: #166534;
          border-color: #bbf7d0;
        `;
      case "warning":
        return `
          background: ${props.theme["yellow-100"]};
          color: ${props.theme["gray-800"]};
          border-color: ${props.theme["yellow-300"]};
        `;
      default:
        return `
          background: ${props.theme.white};
          color: ${props.theme["gray-800"]};
          border-color: ${props.theme["gray-300"]};
        `;
    }
  }}
`;

export const ToastIconWrap = styled.span<{ $variant: ToastVariant }>`
  flex-shrink: 0;
  display: flex;
  margin-top: 0.1rem;

  ${(props) => {
    switch (props.$variant) {
      case "error":
        return `color: #c0392b;`;
      case "success":
        return `color: ${props.theme["green-500"]};`;
      case "warning":
        return `color: ${props.theme["yellow-500"]};`;
      default:
        return `color: ${props.theme["gray-600"]};`;
    }
  }}
`;

export const ToastMessage = styled.p`
  flex: 1;
  margin: 0;
`;

export const ToastCloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0.55;
  cursor: pointer;
  border-radius: 4px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

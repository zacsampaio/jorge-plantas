import styled from "styled-components";

type AlertVariant = "info" | "error" | "success";

export const AlertBox = styled.div<{ $variant: AlertVariant }>`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  line-height: 1.4;

  ${(props) => {
    switch (props.$variant) {
      case "error":
        return `
          background: #fdecea;
          color: #c0392b;
          border: 1px solid #f5c6cb;
        `;
      case "success":
        return `
          background: #e8f8ef;
          color: #1e7e4a;
          border: 1px solid #b8e6cc;
        `;
      default:
        return `
          background: ${props.theme["yellow-100"]};
          color: ${props.theme["gray-800"]};
          border: 1px solid ${props.theme["yellow-300"]};
        `;
    }
  }}
`;

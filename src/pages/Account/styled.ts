import styled from "styled-components";

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderCard = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: ${(props) => props.theme.white};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  flex-wrap: wrap;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const OrderDate = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-600"]};
`;

export const OrderTotal = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme["gray-800"]};
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;

  ${(props) => {
    switch (props.$status) {
      case "delivered":
        return `
          background: #e8f8ef;
          color: #1e7e4a;
        `;
      case "confirmed":
        return `
          background: ${props.theme["yellow-100"]};
          color: ${props.theme["yellow-500"]};
        `;
      case "cancelled":
        return `
          background: #fdecea;
          color: #c0392b;
        `;
      default:
        return `
          background: ${props.theme["gray-200"]};
          color: ${props.theme["gray-700"]};
        `;
    }
  }}
`;

export const DetailTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme["gray-300"]};
  }

  th {
    font-weight: 600;
    color: ${(props) => props.theme["gray-700"]};
    background: ${(props) => props.theme["gray-100"]};
  }
`;

export const DetailFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid ${(props) => props.theme["gray-300"]};
  font-family: "Roboto", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: none;
  border: none;
  color: ${(props) => props.theme["green-500"]};
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

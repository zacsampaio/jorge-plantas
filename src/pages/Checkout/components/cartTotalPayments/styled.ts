import styled from "styled-components";

export const CheckoutPayments = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme["gray-200"]};
  border-radius: 8px;
  padding: 2.5rem;
  width: 100%;
  max-width: none;
  overflow-wrap: break-word;
  border-radius: 8px 35px 8px 35px;
  margin-bottom: 2rem;

`;

export const CheckoutTotalItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1rem;
  color: ${(props) => props.theme["gray-700"]};
  margin-bottom: 1rem;
`;

export const CheckoutDelivery = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1rem;
  color: ${(props) => props.theme["gray-700"]};
  margin-bottom: 1rem;
`;

export const CheckoutTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 1.5rem;
`;

export const ConfirmedButton = styled.button`
  color: ${(props) => props.theme["white"]};
  background: ${(props) => props.theme["green-300"]};
  width: 100%;
  height: 2.875rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 160%;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    background: ${(props) => props.theme["green-500"]};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
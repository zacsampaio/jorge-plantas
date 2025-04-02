import styled from "styled-components";

interface ButtonProps {
  selected: boolean
}

export const CheckoutPaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: ${(props) => props.theme["gray-200"]};
  border-radius: 8px;
  height: fit-content;

  p {
    color: ${(props) => props.theme["gray-700"]};
    font-size: 0.875rem;
    padding-left: 1.875rem;
  }
`;

export const CheckoutPaymentMethodsTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${(props) => props.theme["green-500"]};
  gap: 0.5rem;

  h4 {
    color: ${(props) => props.theme["gray-700"]};
  }
`;

export const CheckoutPaymentMethodsButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-grow: 1;
    height: 3.1875rem;
    gap: 1rem;
    padding: 1rem;
    background: ${(props) => props.theme["gray-400"]};
    cursor: pointer;
    border-radius: 8px;
    color: ${(props) => props.theme["green-500"]};

    h5 {
      color: ${(props) => props.theme["gray-700"]};
    }

    &:hover {
      background: ${(props) => props.theme["gray-500"]};
    }

    &:disabled {
      cursor: not-allowed;
    }

    @media (min-width: 480px) {
      flex: 1 1 auto;
    }
  }
`;

export const PaymentButton = styled.button<ButtonProps>`
  padding: 10px;
  margin: 5px;
  border: ${({ selected, theme }) => (selected ? `2px solid ${theme["green-500"]}` : `1px solid ${theme["gray-500"]}`)};
  background: ${({ selected, theme }) => (selected ? `${theme["gray-400"]}` : `${theme["gray-100"]}`)};
  cursor: pointer;
  transition: border 0.1s ease-in-out;

  &:hover {
    border: 1px solid ${(props) => props.theme["green-500"]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
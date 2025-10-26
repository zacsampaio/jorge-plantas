import styled from "styled-components";

export const CheckoutForm = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  padding: 2.5rem;
  background: ${(props) => props.theme["gray-200"]};
  border-radius: 8px;

  p {
    color: ${(props) => props.theme["gray-700"]};
    font-size: 0.875rem;
    padding-left: 1.875rem;
  }

  p + p {
    font-size: 0.75rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 1289px) {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr); /* Três colunas para organização */
  }

  &:nth-child(1) {
    grid-template-columns: 1fr; /* CEP ocupa linha inteira */
  }

  &:nth-child(2) {
    grid-template-columns: 1fr; /* Rua ocupa linha inteira */
  }

  .address-line-3 {
    display: grid;
    grid-template-columns: 12.5rem 1fr; /* Número fixo e Complemento flexível */
    gap: 1rem;
  }

  &:nth-child(4) {
    grid-template-columns: 12.5rem 1fr 4rem; /* Bairro, Cidade e UF */
  }

  input {
    width: 100%;
    border: 1px solid ${(props) => props.theme["gray-500"]};
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    color: ${(props) => props.theme["gray-700"]};
    background: ${(props) => props.theme["gray-300"]};
    font-size: 0.875rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-600"]};
    }
  }
`;

export const CheckoutFormTitles = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${(props) => props.theme["yellow-300"]};
  gap: 0.5rem;

  h4 {
    color: ${(props) => props.theme["gray-700"]};
  }
`;

export const CheckoutFormInputs = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr;
  gap: 1rem;

  input {
    width: 100%;
  }

  .complement-container {
    position: relative;
    width: 100%;
  }

  .complement-container input {
    padding-right: 4rem;
    width: 100%;
  }

  .optional-text {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-120%);
    font-size: 0.7rem;
    color: ${(props) => props.theme["gray-600"]};
    font-style: italic;
    pointer-events: none;
  }

  @media (min-width: 600px) {
    grid-template-columns: 12.5rem 1fr 4rem;
  }
`;

export const CepInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  input {
    flex: 1;
    margin-bottom: 1rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme["yellow-500"]};
  color: ${(props) => props.theme["white"]};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  height: fit-content;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme["yellow-300"]};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;
import styled from "styled-components";

export const CheckoutComponents = styled.form`
  background: ${(props) => props.theme["white"]};
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 448px;
  }

  @media (max-width: 1280px) {
    grid-template-columns: 1fr
  }
`;

export const CheckoutAreaForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  h3 {
    font-family: "Baloo 2", sans-serif;
    font-size: 1.125rem;
    font-weight: bold;
    color: ${(props) => props.theme["gray-800"]};
  }
`;


export const CheckoutAreaPayments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%; 
  align-items: stretch;

  h3 {
    font-family: "Baloo 2", sans-serif;
    font-size: 1.125rem;
    font-weight: bold;
    color: ${(props) => props.theme["gray-800"]};
  }

  @media (max-width: 1289px) {
    width: 100%;
  }
`;



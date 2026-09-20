import styled from "styled-components";

export const OrderFormContainer = styled.form`
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Section = styled.section`
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme["gray-300"]};
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  margin: 0;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ItemPicker = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  align-items: end;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 7rem auto;
  }
`;

export const PickerSelect = styled.select`
  width: 100%;
  border: 1px solid ${(props) => props.theme["gray-500"]};
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme["gray-800"]};
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme["green-500"]};
  }
`;

export const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ItemRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-800"]};

  strong {
    font-weight: 600;
  }

  span {
    color: ${(props) => props.theme["gray-600"]};
  }
`;

export const RemoveItemButton = styled.button`
  border: none;
  background: transparent;
  color: #c0392b;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;

  &:hover {
    background: #fdecea;
  }
`;

export const PaymentOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PaymentOption = styled.button<{ $selected: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$selected ? props.theme["green-500"] : props.theme["gray-500"]};
  /* Fundo claro de propósito: os verdes do tema são saturados demais para
     carregar texto escuro por cima com contraste suficiente. */
  background: ${(props) =>
    props.$selected ? props.theme["gray-200"] : props.theme.white};
  color: ${(props) =>
    props.$selected ? props.theme["green-600"] : props.theme["gray-800"]};
  font-weight: ${(props) => (props.$selected ? 700 : 400)};
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme["green-500"]};
  }
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-family: "Baloo 2", sans-serif;
  color: ${(props) => props.theme["gray-800"]};

  span {
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    color: ${(props) => props.theme["gray-600"]};
  }

  strong {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

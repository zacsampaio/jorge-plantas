import styled from "styled-components";

export const ProductFormContainer = styled.div`
  max-width: 32rem;
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-700"]};
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
    accent-color: ${(props) => props.theme["green-500"]};
  }
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 5rem;
  border: 1px solid
    ${(props) =>
      props.$hasError ? "#c0392b" : props.theme["gray-500"]};
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  color: ${(props) => props.theme["gray-800"]};
  background: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-family: "Roboto", sans-serif;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme["green-500"]};
  }
`;

export const SelectField = styled.select`
  width: 100%;
  border: 1px solid ${(props) => props.theme["gray-500"]};
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  background: ${(props) => props.theme.white};
`;

export const HintText = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme["gray-600"]};
  font-family: "Roboto", sans-serif;
  margin-top: 0.25rem;
`;

export const ImagePreviewWrap = styled.div`
  margin-top: 0.75rem;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  overflow: hidden;
  background: ${(props) => props.theme["gray-100"]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

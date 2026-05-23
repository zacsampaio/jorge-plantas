import styled from "styled-components";

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
`;

export const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme["gray-700"]};
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.$hasError ? "#c0392b" : props.theme["gray-500"]};
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  color: ${(props) => props.theme["gray-800"]};
  background: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-family: "Roboto", sans-serif;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme["green-500"]};
    box-shadow: 0 0 0 2px ${(props) => props.theme["green-300"]}40;
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-600"]};
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme["gray-600"]};
  font-size: 0.75rem;
  font-family: "Roboto", sans-serif;
  padding: 0.25rem;

  &:hover {
    color: ${(props) => props.theme["gray-800"]};
  }
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #c0392b;
  font-family: "Roboto", sans-serif;
`;

export const HintText = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme["gray-600"]};
  font-family: "Roboto", sans-serif;
`;

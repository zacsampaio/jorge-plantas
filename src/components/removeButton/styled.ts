import styled from "styled-components";

export const RemoveButtonComponents = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  background: ${(props) => props.theme["gray-400"]};
`;

export const RemoveButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme["green-300"]};
  transition: 0.1s;
  border-radius: 8px;
  

  h5{
    font-size: 0.875rem;
    color: ${(props) => props.theme["gray-700"]};
    line-height: 130%;
    padding-left: 0.5rem;
  }

  &:hover {
    background: ${(props) => props.theme["gray-500"]};
    color: ${(props) => props.theme["green-500"]};
    h5{
      color: ${(props) => props.theme["gray-800"]}
    }
  }

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

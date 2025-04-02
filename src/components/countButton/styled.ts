import styled from "styled-components";


export const CountButtonComponents = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 0.3rem;
  background: ${props => props.theme['gray-300']};
`

export const CountButtonQuantity = styled.button`
  border: 0;
  background: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: ${props => props.theme['green-300'] };
  transition: 0.1s;

  &:hover {
    color: ${props => props.theme['green-500'] };
    transform: scale(1.5);
  }

  &:focus{
    border: none;
    outline: none;
    box-shadow: none;
  }
`

export const CountQuantity = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Baloo 2', sans-serif;
  line-height: 160%;
`
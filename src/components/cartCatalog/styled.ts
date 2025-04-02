import styled from "styled-components";
import { CartProps } from ".";


export const CartContainer = styled.div`
  position: relative;

  span{
    position: absolute;
    top: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${(props) => props.theme["yellow-500"]};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
  }

`

export const CartButtonContainer = styled.button<CartProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.375rem; 
  height: 2.375rem; 
  padding: 0.5rem;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.theme[props.$background]};
  color: ${props => props.theme[props.$color]};
`
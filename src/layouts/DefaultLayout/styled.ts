import styled from "styled-components";


export const LayoutContainer = styled.div`
  background: ${props => props.theme["white"]};
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 1090px){
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 664){
    max-width: calc(100vw - 2rem);
  } 
`
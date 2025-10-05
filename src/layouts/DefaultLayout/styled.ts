import styled from "styled-components";


export const LayoutContainer = styled.div`
  background: ${props => props.theme["white"]};
  max-width: calc(100vw - 20rem);
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1090px){
    max-width: calc(100vw - 10rem);
  }

  @media (max-width: 664){
    max-width: calc(100vw - 2rem);
  } 
`

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`
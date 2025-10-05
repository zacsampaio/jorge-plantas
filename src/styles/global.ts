import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body{
    background: ${(props) => props.theme["white"]};
    color: ${(props) => props.theme["gray-900"]};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: "Ballo 2", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  button {
    border: 0;
  }

  
  @media (max-width: 768px) {
    html {
      font-size: 100%;
      max-width: 100dvw;
      max-height: 100dvh;
    }

    
  }

  @media (max-width: 555px) {
    html {
      font-size: 80%;
      max-width: 100dvw;
      max-height: 100dvh;
    }
    
  }

  @media (max-width: 471px) {
    html {
      font-size: 80%;
      max-width: 100dvw;
      max-height: 100dvh;
    }
  }

  @media (max-width: 375px) {
    html {
      font-size: 80%;
      max-width: 100dvw;
      max-height: 100dvh;
    }
    
  }

`;

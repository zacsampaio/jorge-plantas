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

  /*
    clip, e não hidden: overflow diferente de visible transforma o elemento em
    contêiner de rolagem, e aí todo position: sticky descendente passa a se
    referenciar a ele — que não rola — e nunca gruda. Foi o que quebrava a
    sidebar do painel. O clip corta o transbordo horizontal do mesmo jeito,
    sem criar o contêiner.
  */
  html {
    font-size: 100%;
    overflow-x: clip;
  }

  body {
    overflow-x: clip;
  }
`;

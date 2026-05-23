import styled from "styled-components";
import { pageShell } from "../../styles/layout";

export const LayoutContainer = styled.div`
  ${pageShell}
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.white};
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

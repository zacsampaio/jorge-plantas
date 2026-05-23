import { css } from "styled-components";

/** Espaçamento horizontal mínimo nas bordas da página */
export const pageGutter = css`
  padding-left: 0.75rem;
  padding-right: 0.75rem;

  @media (min-width: 640px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 1024px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1280px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const pageShell = css`
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  box-sizing: border-box;
  ${pageGutter}

  @media (min-width: 1280px) {
    max-width: 90rem;
  }
`;

/** Margem negativa para seções full-bleed dentro do shell */
export const fullBleedSection = css`
  margin-left: -0.75rem;
  margin-right: -0.75rem;

  @media (min-width: 640px) {
    margin-left: -1rem;
    margin-right: -1rem;
  }

  @media (min-width: 1024px) {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  @media (min-width: 1280px) {
    margin-left: -2rem;
    margin-right: -2rem;
  }
`;

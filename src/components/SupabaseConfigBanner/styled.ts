import styled from "styled-components";

export const Banner = styled.div`
  margin: 0 auto 1.5rem;
  max-width: 56rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["yellow-500"]};
  background: ${(props) => props.theme["yellow-100"]};
  color: ${(props) => props.theme["gray-800"]};
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.55;

  p {
    margin: 0.5rem 0 0;
  }

  code {
    font-size: 0.875rem;
  }
`;

export const BannerTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
`;

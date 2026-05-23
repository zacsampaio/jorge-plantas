import styled from "styled-components";
import { Link } from "react-router-dom";

export const AboutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const AboutVisual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const AboutImageFrame = styled.div`
  width: 100%;
  max-width: 18rem;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme["green-300"]};
  box-shadow: 0 8px 32px rgba(46, 175, 89, 0.2);

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const AboutHighlight = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${(props) => props.theme["yellow-100"]};
  border-radius: 999px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme["gray-700"]};

  svg {
    color: ${(props) => props.theme["yellow-500"]};
    flex-shrink: 0;
  }
`;

export const AboutSectionTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 130%;
  color: ${(props) => props.theme["gray-800"]};
  text-align: left;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const AboutContent = styled.div`
  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const AboutText = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 170%;
  color: ${(props) => props.theme["gray-600"]};
  margin-top: 1rem;
`;

export const AboutActions = styled.div`
  margin-top: 1.5rem;
`;

export const AboutLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme["green-500"]};
  text-decoration: none;
  transition: gap 0.2s;

  &:hover {
    gap: 0.75rem;
  }
`;

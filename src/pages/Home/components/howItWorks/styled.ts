import styled from "styled-components";

export const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const StepCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: ${(props) => props.theme.white};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  color: ${(props) => props.theme["green-500"]};

  svg:not(:first-child) {
    margin: 1rem 0;
  }
`;

export const StepNumber = styled.span`
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.theme["yellow-500"]};
  color: ${(props) => props.theme.white};
  font-family: "Baloo 2", sans-serif;
  font-weight: 800;
  font-size: 0.875rem;
`;

export const StepTitle = styled.h3`
  font-family: "Baloo 2", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 0.5rem;
`;

export const StepDescription = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  line-height: 160%;
  color: ${(props) => props.theme["gray-600"]};
`;

export const StepsConnector = styled.div`
  display: none;

  @media (min-width: 801px) {
    display: block;
    position: absolute;
    top: 50%;
    right: -1.25rem;
    width: 2.5rem;
    height: 2px;
    background: ${(props) => props.theme["green-300"]};
    transform: translateY(-50%);
  }
`;

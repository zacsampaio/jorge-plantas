import styled from "styled-components";

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme["green-100"]} 0%,
    ${(props) => props.theme["yellow-100"]} 100%
  );
  border-radius: 16px;
  border: 2px solid ${(props) => props.theme["green-300"]};

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["green-500"]};

  @media (max-width: 700px) {
    padding: 0.5rem 0;
  }
`;

export const StatValue = styled.strong`
  font-family: "Baloo 2", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: ${(props) => props.theme["gray-800"]};
`;

export const StatLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  color: ${(props) => props.theme["gray-600"]};
  text-align: center;
`;

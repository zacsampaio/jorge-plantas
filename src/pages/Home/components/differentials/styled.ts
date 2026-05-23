import styled from "styled-components";

type Color = "green" | "yellow" | "gray";

export const DiffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const DiffCard = styled.article`
  padding: 1.75rem;
  border-radius: 12px;
  background: ${(props) => props.theme["gray-100"]};
  border: 1px solid ${(props) => props.theme["gray-200"]};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${(props) => props.theme["green-300"]};
  }
`;

export const DiffIconWrap = styled.div<{ $color: Color }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  background: ${(props) => {
    if (props.$color === "yellow") return props.theme["yellow-100"];
    if (props.$color === "gray") return props.theme["gray-300"];
    return props.theme["green-100"];
  }};
  color: ${(props) => {
    if (props.$color === "yellow") return props.theme["yellow-500"];
    if (props.$color === "gray") return props.theme["gray-700"];
    return props.theme["green-500"];
  }};
`;

export const DiffTitle = styled.h3`
  font-family: "Baloo 2", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  margin-bottom: 0.5rem;
`;

export const DiffDescription = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  line-height: 160%;
  color: ${(props) => props.theme["gray-600"]};
`;

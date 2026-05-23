import styled from "styled-components";

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  gap: 0.75rem;
  background: ${(props) => props.theme["gray-200"]};
  border-radius: 12px;
`;

export const EmptyTitle = styled.h3`
  font-family: "Baloo 2", cursive;
  font-size: 1.25rem;
  color: ${(props) => props.theme["gray-800"]};
`;

export const EmptyDescription = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-600"]};
  max-width: 24rem;
`;

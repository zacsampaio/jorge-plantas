import styled from "styled-components";

export const AvatarCircle = styled.div<{ $size?: string }>`
  width: ${(props) => props.$size ?? "2.375rem"};
  height: ${(props) => props.$size ?? "2.375rem"};
  border-radius: 50%;
  background: ${(props) => props.theme["yellow-500"]};
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  flex-shrink: 0;
`;

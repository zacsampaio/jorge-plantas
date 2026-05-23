import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SkeletonBlock = styled.div<{ $height?: string; $width?: string }>`
  height: ${(props) => props.$height ?? "1rem"};
  width: ${(props) => props.$width ?? "100%"};
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme["gray-300"]} 25%,
    ${(props) => props.theme["gray-200"]} 50%,
    ${(props) => props.theme["gray-300"]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export const SkeletonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const CtaBannerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

export const CtaTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 130%;
  margin-bottom: 0.75rem;
`;

export const CtaText = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 1.0625rem;
  line-height: 160%;
  max-width: 32rem;
  opacity: 0.95;
`;

export const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CtaPrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme["green-500"]};
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const CtaOutlineButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: transparent;
  color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.white};
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

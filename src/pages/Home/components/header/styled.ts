import styled from "styled-components";
import { Link } from "react-router-dom";
import { fullBleedSection } from "../../../../styles/layout";

export const HeroSection = styled.section`
  position: relative;
  ${fullBleedSection}
  padding: 2rem 0.75rem 3rem;
  background: linear-gradient(
    160deg,
    ${(props) => props.theme["green-100"]} 0%,
    ${(props) => props.theme.white} 45%,
    ${(props) => props.theme["yellow-100"]} 100%
  );
  border-radius: 0 0 1.25rem 1.25rem;
  overflow: hidden;

  @media (min-width: 640px) {
    padding: 2.5rem 1rem 3.5rem;
    border-radius: 0 0 1.5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 1rem 4rem;
    border-radius: 0 0 2rem 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: -4rem;
    right: -4rem;
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    background: ${(props) => props.theme["green-300"]};
    opacity: 0.25;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3rem;
    left: -3rem;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background: ${(props) => props.theme["yellow-300"]};
    opacity: 0.2;
  }
`;

export const HeaderHomeContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 3rem;
  min-height: 28rem;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0;

  img {
    width: 100%;
    max-width: 40rem;
    height: auto;
    display: block; 
    margin: 0 auto; 
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;

    img {
      width: 90%;
      max-width: 400px;
      min-width: 250px;
      margin-bottom: 2rem;
      margin: 0 ;
    }

    span{
      text-align: center;
      flex-wrap: wrap;
      word-break: break;
    }
  }
`;

export const HeroTagline = styled.p`
  font-family: "Baloo 2", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  font-style: italic;
  color: ${(props) => props.theme["yellow-500"]};
  margin-bottom: 0.5rem;
`;

export const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.4rem 1rem;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme["green-300"]};
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${(props) => props.theme["green-500"]};
  box-shadow: 0 2px 8px rgba(46, 175, 89, 0.15);
`;

export const HeroHighlight = styled.span`
  color: ${(props) => props.theme["green-500"]};
`;

export const HeaderHomeTitles = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Baloo 2", sans-serif;
    font-size: clamp(1.75rem, 6vw, 3rem);
    font-weight: 800;
    line-height: 130%;
    color: ${(props) => props.theme["gray-800"]};
  }

  p {
    margin: 1.5rem 0 2rem 0;
    font-family: "Roboto", sans-serif;
    font-size: clamp(1rem, 3.5vw, 1.25rem);
    line-height: 160%;
    color: ${(props) => props.theme["gray-600"]};
    max-width: 34rem;
  }

  @media (max-width: 1280px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

export const HeaderHomeItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-weight: 400;
    flex-wrap: wrap;
  }

  @media (max-width: 1280px) {
    align-items: flex-start;
  }

`;

export const ItemCart = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  gap: 1rem;
  white-space: break-spaces;

  background: ${(props) => props.theme["yellow-500"]};
  color: ${(props) => props.theme["gray-100"]};
`;

export const ItemPackage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  gap: 1rem;

  background: ${(props) => props.theme["gray-700"]};
  color: ${(props) => props.theme["gray-100"]};
`;

export const ItemTimer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  gap: 1rem;

  background: ${(props) => props.theme["yellow-300"]};
  color: ${(props) => props.theme["gray-100"]};
`;

export const ItemCoffee = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  gap: 1rem;

  background: ${(props) => props.theme["green-300"]};
  color: ${(props) => props.theme["gray-100"]};
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

export const HeroPrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: ${(props) => props.theme["green-300"]};
    transform: translateY(-1px);
  }
`;

export const HeroSecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  background: transparent;
  color: ${(props) => props.theme["gray-700"]};
  border: 2px solid ${(props) => props.theme["gray-400"]};
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme["green-500"]};
  }
`;

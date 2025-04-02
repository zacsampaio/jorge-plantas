import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const LocationAndCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const Localization = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["white"]};
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  gap: 0.5rem;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  height: 2.375rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0 0.8rem;
    height: 2rem;
  }
`;

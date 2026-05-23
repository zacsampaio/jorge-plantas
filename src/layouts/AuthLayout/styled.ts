import styled from "styled-components";

export const AuthLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: ${(props) => props.theme["gray-100"]};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 28rem;
  background: ${(props) => props.theme.white};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
`;

export const AuthLogo = styled.img`
  height: 48px;
  display: block;
  margin: 0 auto 1.5rem;
`;

export const AuthTitle = styled.h1`
  font-family: "Baloo 2", cursive;
  font-size: 1.5rem;
  color: ${(props) => props.theme["gray-800"]};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const AuthSubtitle = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-600"]};
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const BackLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["green-500"]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormStack = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const PasswordRequirements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const RequirementItem = styled.li<{ $met: boolean }>`
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  color: ${(props) => (props.$met ? props.theme["green-500"] : props.theme["gray-600"])};

  &::before {
    content: "${(props) => (props.$met ? "✓" : "○")} ";
  }
`;

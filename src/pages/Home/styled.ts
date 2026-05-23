import styled from "styled-components";

export const HomePage = styled.div`
  overflow-x: hidden;
`;

export const Section = styled.section<{ $variant?: "default" | "muted" | "green" }>`
  padding: 4rem 0;
  background: ${(props) => {
    if (props.$variant === "muted") return props.theme["gray-100"];
    if (props.$variant === "green")
      return `linear-gradient(135deg, ${props.theme["green-500"]} 0%, #1e8a47 100%)`;
    return props.theme.white;
  }};
  color: ${(props) => (props.$variant === "green" ? props.theme.white : "inherit")};
`;

export const SectionInner = styled.div`
  max-width: 72rem;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionLabel = styled.span`
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(props) => props.theme["green-500"]};
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 130%;
  color: ${(props) => props.theme["gray-800"]};
`;

export const SectionSubtitle = styled.p`
  margin: 1rem auto 0;
  max-width: 36rem;
  font-family: "Roboto", sans-serif;
  font-size: 1.0625rem;
  line-height: 160%;
  color: ${(props) => props.theme["gray-600"]};
`;

export const SectionTitleLight = styled(SectionTitle)`
  color: ${(props) => props.theme.white};
`;

export const SectionSubtitleLight = styled(SectionSubtitle)`
  color: rgba(255, 255, 255, 0.9);
`;

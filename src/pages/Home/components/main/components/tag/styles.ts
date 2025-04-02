import styled from "styled-components";

export const TagComponents = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 0.625rem;
  line-height: 130%;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 50px;
  margin: 1rem 0 1rem 0;
  background: ${props => props.theme['yellow-100']};
  color: ${props => props.theme['yellow-500']};
`

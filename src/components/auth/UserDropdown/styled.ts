import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 12rem;
  background: ${(props) => props.theme.white};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  padding: 0.5rem;
  z-index: 100;
`;

export const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: none;
  background: none;
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-700"]};
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background: ${(props) => props.theme["gray-100"]};
    outline: none;
  }
`;

export const DropdownLink = styled.a`
  display: block;
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-700"]};
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background: ${(props) => props.theme["gray-100"]};
    outline: none;
  }
`;

export const DropdownDivider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme["gray-300"]};
  margin: 0.375rem 0;
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 8px;

  &:hover,
  &:focus-visible {
    background: ${(props) => props.theme["gray-200"]};
    outline: none;
  }
`;

export const TriggerName = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme["gray-700"]};
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;

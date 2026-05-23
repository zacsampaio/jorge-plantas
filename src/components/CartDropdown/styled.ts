import styled from "styled-components";

export const CartDropdownRoot = styled.div`
  position: relative;
`;

export const CartToggleButton = styled.button<{ $background: string; $color: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.375rem;
  height: 2.375rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => props.theme[props.$background]};
  color: ${(props) => props.theme[props.$color]};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &[aria-expanded="true"] {
    box-shadow: 0 0 0 2px ${(props) => props.theme["green-200"]};
  }

  @media (max-width: 480px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 1.125rem;
  height: 1.125rem;
  padding: 0 0.25rem;
  border-radius: 999px;
  background: ${(props) => props.theme["yellow-500"]};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.625rem;
  font-weight: 700;
  line-height: 1;
`;

export const CartBackdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 199;
  border: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.45);
  cursor: pointer;
  animation: cartBackdropIn 0.25s ease-out;

  @keyframes cartBackdropIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const CartDrawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  width: min(22rem, 100vw);
  height: 100dvh;
  max-height: 100dvh;
  background: ${(props) => props.theme.white};
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
  animation: cartDrawerIn 0.28s cubic-bezier(0.32, 0.72, 0, 1);

  @keyframes cartDrawerIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (min-width: 480px) {
    width: min(26rem, 100vw);
  }
`;

export const CartPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${(props) => props.theme["gray-200"]};
  flex-shrink: 0;

  h3 {
    margin: 0;
    font-family: "Baloo 2", sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    color: ${(props) => props.theme["gray-800"]};
  }

  span {
    font-size: 0.8125rem;
    color: ${(props) => props.theme["gray-600"]};
  }
`;

export const CartHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const CartCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme["gray-200"]};
  border-radius: 8px;
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme["gray-700"]};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background: ${(props) => props.theme["gray-100"]};
    color: ${(props) => props.theme["gray-800"]};
  }
`;

export const CartPanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const CartEmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;

  p {
    margin: 0;
    font-size: 0.9375rem;
    color: ${(props) => props.theme["gray-600"]};
    line-height: 1.6;

    & + p {
      margin-top: 0.5rem;
    }
  }
`;

export const CartLineItem = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${(props) => props.theme["gray-100"]};

  &:last-child {
    border-bottom: none;
  }
`;

export const CartLineTop = styled.div`
  display: grid;
  grid-template-columns: 4.5rem 1fr auto;
  gap: 0.875rem;
  align-items: start;

  img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;
    object-fit: cover;
    background: ${(props) => props.theme["green-100"]};
  }
`;

export const CartLineInfo = styled.div`
  min-width: 0;

  h4 {
    margin: 0 0 0.35rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${(props) => props.theme["gray-800"]};
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    margin: 0;
    font-size: 0.8125rem;
    color: ${(props) => props.theme["gray-600"]};
  }
`;

export const CartLinePrice = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  white-space: nowrap;
`;

export const CartLineBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-left: 5.375rem;
`;

export const CartLineControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const CartPanelFooter = styled.div`
  padding: 1rem 1.25rem 1.25rem;
  padding-bottom: max(1.25rem, env(safe-area-inset-bottom));
  border-top: 1px solid ${(props) => props.theme["gray-200"]};
  background: ${(props) => props.theme.white};
  flex-shrink: 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
`;

export const CartTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed ${(props) => props.theme["gray-200"]};

  span {
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${(props) => props.theme["gray-700"]};
  }

  strong {
    font-family: "Baloo 2", sans-serif;
    font-size: 1.375rem;
    font-weight: 800;
    color: ${(props) => props.theme["green-500"]};
  }
`;

export const CheckoutLinkButton = styled.button`
  width: 100%;
  height: 2.75rem;
  border: 0;
  border-radius: 8px;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-family: "Roboto", sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme["green-600"]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ContinueShoppingButton = styled.button`
  width: 100%;
  margin-top: 0.625rem;
  padding: 0.35rem;
  border: 0;
  background: transparent;
  color: ${(props) => props.theme["gray-600"]};
  font-size: 0.8125rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme["green-500"]};
  }
`;

import styled from "styled-components";

export const ConfirmedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem;
  height: 100%;

  h1 {
    font-family: "Baloo 2", sans-serif;
    color: ${(props) => props.theme["yellow-500"]};
    font-size: 2rem;
    font-weight: 800;
  }
`;

export const ConfirmedArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 3rem;
  height: 100%;

  img {
    width: 30.75rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
    img {
      width: 100%; /* Ajusta a largura da imagem para 100% em telas menores */
      margin-top: 4rem;
    }
  }
`;

export const ConfirmedAreaDelivery = styled.div`
  background: ${(props) => props.theme["gradient-purple-yellow"]};
  border-radius: 8px 35px 8px 35px;
  padding: 2px;
  max-width: 38.875rem;
  height: fit-content;
`;

export const InnerContainer = styled.div`
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 8px 35px 8px 35px;
  padding: 1.25rem;
`;

export const ConfirmedInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem;
  word-wrap: break-word;

  div {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    flex-wrap: wrap;
  }

  span {
    word-wrap: break-word;
    flex-wrap: wrap;
  }

  strong {
    word-wrap: break-word;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Item = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: bold;
`;

export const ItemAddress = styled(Item)`
  background: ${(props) => props.theme["green-300"]};
  color: ${(props) => props.theme["gray-100"]};
`;

export const ItemTimer = styled(Item)`
  background: ${(props) => props.theme["yellow-300"]};
  color: ${(props) => props.theme["gray-100"]};
`;

export const ItemDolar = styled(Item)`
  background: ${(props) => props.theme["yellow-500"]};
  color: ${(props) => props.theme["gray-100"]};
`;

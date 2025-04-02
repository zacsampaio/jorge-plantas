import styled from "styled-components";

export const HeaderHomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 3rem;
  min-height: 34rem;
  margin: 0 auto;
  padding: 0 1rem;

  img {
    width: 100%;
    max-width: 40rem;
    height: auto;
    display: block; /* Remove espaços extras */
    margin: 0 auto; /* Garante centralização */
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;

    img {
      width: 90%;
      max-width: 400px;
      margin-bottom: 2rem;
    }
  }
`;

export const HeaderHomeTitles = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 130%;
  }

  p {
    margin: 1.5rem 0 3rem 0;
    font-family: "Roboto";
    font-size: 1.25rem;
  }

  @media (max-width: 1024px) {
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

  @media (max-width: 943px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

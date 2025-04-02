import styled from "styled-components";


export const HeaderMainContainer = styled.div`
  margin-bottom: 4rem;

  h1{
    font-size: 2rem;
    font-weight: 800;
    line-height: 130%;
    font-family: "Baloo 2", sans-serif;
    margin-top: 6rem;
  }
`

export const HeaderMainCatalog = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;

  @media (max-width: 1440px) {
    justify-content: center; 
  }

  @media (max-width: 1024px) {
    justify-content: center; 
  }

  @media (max-width: 768px) {
    gap: 1.5rem; 
  }

  @media (max-width: 555px) {
    gap: 1rem;
    justify-content: center;
  }

  @media (max-width: 471px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 375px) {
    gap: 0.5rem;
  }
`
import styled from "styled-components";

export const CardCatalagComponents = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 16rem;
  min-width: 12rem;
  height: auto;
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 8px 35px 8px 35px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 1px 1px 10px ${(props) => props.theme["gray-500"]};

  &:hover {
    transform: scale(1.05);
  }

  img {
    margin-top: calc(0px - 1.3rem - 1px);
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-family: "Baloo 2", sans-serif;
    color: ${(props) => props.theme["gray-800"]};
    font-size: 1.125rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 14rem;

    img {
      max-width: 100px;
      max-height: 100px; 
    }
  }

  @media (max-width: 555px) {
    max-width: 16rem;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }

  @media (max-width: 375px) {
    width: 100%;
    img {
      max-width: 60px;
      max-height: 60px;
    }
  }
`;

export const TagDescription = styled.p`
  font-size: 0.875rem;
  line-height: 130%;
  text-align: center;
  flex-wrap: wrap;
  padding: 8px;
  color: ${(props) => props.theme["gray-600"]};
  font-weight: 500;
  word-wrap: break-word;
`;

export const TagValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 1rem 1.5rem 1rem;

  p {
    font-size: 0.875rem;
    line-height: 130%;
    color: ${(props) => props.theme["gray-700"]};
    
  }

  @media (max-width: 780px){
    
    p{
      font-size: 0.7rem;
      margin-left: 0.3rem;
    }
}`

export const TagValueSpan = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 130%;
  color: ${(props) => props.theme["gray-700"]};
  font-family: "Baloo 2", sans-serif;
  margin-right: 1rem;

  @media (max-width: 780px){
      font-size: 1rem;
  }
`;

export const TagsComponents = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

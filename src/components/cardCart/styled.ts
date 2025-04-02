import styled from "styled-components";


export const CardCartComponents = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  gap: 0.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px  solid ${(props) => props.theme["gray-400"]};
  margin-bottom: 2rem;

  h3{
    font-size: 1rem;
    font-weight: bold;
    line-height: 130%;
    color: ${(props) => props.theme["gray-700"]};
    padding-bottom: 0.5rem;
  }

  p{
    font-family: 'Boloo 2', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    line-height: 130%;
    color: ${(props) => props.theme["gray-800"]};
  }

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

`

export const CardCartComponentsButtons = styled.div`
  display: flex;
  gap: 1rem;
`
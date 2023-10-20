import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  background: white;
  padding: 2em;
  display: flex;
  align-items: center;

  @media (max-width: 1000px) {
    height: 200px;
    gap: 1em;
    padding: 1em;
    /* flex-direction: column-reverse; */
  }
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;

  p {
    white-space: break-spaces;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 1em;
    }

    p {
      font-size: 0.8em;
    }
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 15em;
    border-radius: 5px;
    object-fit: cover;
  }

  @media (max-width: 1000px) {
    width: fit-content;
    img {
      width: 8em;
    }
  }
`;

export const Button = styled.button`
  width: 10em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(116, 255, 174);
  background: linear-gradient(90deg, rgba(116, 255, 174, 1) 0%, rgba(0, 255, 106, 1) 100%);
  display: flex;
  color: white;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline-color: rgb(116, 255, 174);

  &:hover {
    background: rgb(108, 233, 160);
    background: linear-gradient(90deg, rgba(108, 233, 160, 1) 0%, rgba(0, 231, 96, 1) 100%);
  }

  &:disabled,
  &[disabled] {
    opacity: 0.4;
  }
`;

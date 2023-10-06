import styled from 'styled-components';

export const FooterContainer = styled.div`
  height: 100vh;
  width: 20%;
  background: rgb(116, 255, 174);
  background: linear-gradient(90deg, rgba(116, 255, 174, 1) 0%, rgba(0, 255, 106, 1) 100%);
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    height: 10vh;
    width: 100%;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  padding: 1em;
  height: 100%;
  gap: 0.5em;

  p {
    text-align: center;
    color: white;
    font-weight: bold;
  }

  @media (max-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25em;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1em;

  @media (max-width: 1000px) {
    flex-direction: row;
    gap: 0.25em;
  }
`;

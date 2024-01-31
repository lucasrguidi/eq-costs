import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const MainContainer = styled.div`
  height: 100%;
  width: 80%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    flex-direction: column;
    height: 80vh;
    width: 100%;
    padding: 1.5em 1em;
  }
`;

export const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1em;

  @media (max-width: 1000px) {
    gap: 1em;
  }
`;

export const MenuBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  white-space: break-spaces;
`;

export const Details = styled.div`
  height: 100%;
  width: 70%;
`;

export const Events = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1em;
  align-items: center;
  background: #f6f6f6;
  border-radius: 5px;
  gap: 1em;
  overflow: scroll;

  @media (max-width: 1000px) {
    padding: 1em;
  }
`;

export const Button = styled.button`
  width: 20em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(116, 255, 174);
  background: linear-gradient(90deg, rgba(116, 255, 174, 1) 0%, rgba(0, 255, 106, 1) 100%);
  display: flex;
  color: white;
  text-transform: uppercase;
  font-size: 1rem;
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

export const NoEventsFound = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1em;
`;

import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 999;

  width: 100vw;
  height: 100%;

  background: rgba(0, 0, 0, 0.322);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;

  @media only screen and (max-width: 1000px) {
    padding: 0;
    overflow: hidden;
  }
`;

export const ModalBody = styled.div`
  width: 460px;
  padding: 1em;
  background-color: white;
  border-radius: 5px;
  max-width: 460px;

  @media (max-width: 1000px) {
    width: 100vw;

    border-radius: 5px;
    overflow-y: scroll;
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

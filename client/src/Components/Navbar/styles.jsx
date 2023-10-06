import styled from 'styled-components';

export const NavbarContainer = styled.div`
  height: 100vh;
  width: 20%;
  background: rgb(116, 255, 174);
  background: linear-gradient(90deg, rgba(116, 255, 174, 1) 0%, rgba(0, 255, 106, 1) 100%);
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    flex-direction: row;
    height: 10vh;
    width: 100%;
  }
`;

export const NavbarContent = styled.div``;

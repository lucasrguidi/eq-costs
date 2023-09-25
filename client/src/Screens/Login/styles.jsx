import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgb(116, 255, 174);
  background: linear-gradient(90deg, rgba(116, 255, 174, 1) 0%, rgba(0, 255, 106, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    padding: 0 1em;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 1em;
  width: 100%;
  max-width: 30rem;
  gap: 1rem;
`;

export const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black;

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 0.8rem;
  }

  a {
    font-size: 0.8rem;
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  width: 100%;
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

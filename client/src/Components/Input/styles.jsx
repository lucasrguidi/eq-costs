import styled from 'styled-components';

export const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;

  label {
    font-size: 1rem;
    color: black;
  }

  input {
    color: black;
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 1rem;
  }

  input::placeholder {
    font-size: 0.8rem;
    color: #cdcdcd;
  }

  input:focus {
    outline-color: #74ffae;
  }
`;

export const InputError = styled.p`
  color: red;
  font-size: 0.8rem;
`;

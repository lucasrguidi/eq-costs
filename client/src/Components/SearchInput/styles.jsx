import styled from 'styled-components';

export const CustomSearchInput = styled.div`
  display: flex;
  width: 100%;

  input {
    color: black;
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 1rem;
  }

  input::after {
    content: 'lucas';
    color: red;
    background: red;
    width: 20px;
  }

  input::placeholder {
    font-size: 0.8rem;
    color: #cdcdcd;
  }

  input:focus {
    outline-color: #74ffae;
  }
`;

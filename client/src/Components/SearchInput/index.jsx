import React from 'react';
import { CustomSearchInput } from './styles';

function SearchInput({ name, placeholder, type, onChange }) {
  return (
    <CustomSearchInput>
      <input id={name} type={type} name={name} placeholder={placeholder} onChange={onChange} />
    </CustomSearchInput>
  );
}

export default SearchInput;

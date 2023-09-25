import React from 'react';
import { CustomInput, InputError } from './styles';

function Input({ name, label, placeholder, onChange, type, error }) {
  return (
    <CustomInput>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} placeholder={placeholder} onChange={onChange} />
      {error && <InputError>{error}</InputError>}
    </CustomInput>
  );
}

export default Input;

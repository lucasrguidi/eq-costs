import React from 'react';
import { CustomInput, InputError } from './styles';

function FormikInput({ name, label, placeholder, onChange, type, onBlur, value, touched, errors }) {
  return (
    <CustomInput>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {touched?.[name] && errors?.[name] ? <InputError>{errors[name]}</InputError> : null}
    </CustomInput>
  );
}

export default FormikInput;

import React from 'react';
import { CustomInput, InputError } from './styles';

function FormikTextArea({
  name,
  label,
  placeholder,
  onChange,
  rows,
  onBlur,
  value,
  touched,
  errors,
}) {
  return (
    <CustomInput>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        rows={rows}
      />
      {touched?.[name] && errors?.[name] ? <InputError>{errors[name]}</InputError> : null}
    </CustomInput>
  );
}

export default FormikTextArea;

import React from 'react';
import { InputErrorMessage } from './InputErrorMessage';

export const SelectOptionInput = ({ label, value, isValid, onChange, options, errorMessage, showErrorMessage, disabled = false, hasDefaultOption = true }) => {
  const handleChange = (e) => {
    onChange(e);
  }

  const formKey = (i, option) => {
    return `${i}_${option.value}_${option.label}`;
  }

  return (
    <div className="form-group">
      <label className="form-control-label text-white">{label}</label>
      <select 
        className="form-control form-control-alternative bg-dark text-white"
        value={(value !== null && value !== undefined) ? value : ""}
        disabled={disabled}
        onChange={handleChange}
      >
        {hasDefaultOption && <option value={''}>{label}</option>}
        {options && options.map((option, i) => <option key={formKey(i, option)} value={option.value}>{option.label}</option>)}
      </select>
      <InputErrorMessage isValid={showErrorMessage ? isValid : true} message={errorMessage || `${label} can't be blank.`} />
    </div>
  );
}
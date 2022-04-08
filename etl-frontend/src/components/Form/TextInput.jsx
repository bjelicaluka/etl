import React from 'react';
import { InputErrorMessage } from './InputErrorMessage';

const WrapperComponent = ({ children, icon }) => icon ? <div className="input-group input-group-alternative">{children}</div> : <>{children}</>;

export const TextInput = ({ label, icon, type, className, placeholder, value, isValid, errorMessage, showErrorMessage, onChange, disabled = false }) => {
  const handleChange = (e) => {
    onChange(e);
  }

  return (
    <div className="form-group">
      {label && <label className="form-control-label">{label}</label>}
      <WrapperComponent icon={icon}>
        {icon && <div className="input-group-prepend">
          <span className="input-group-text">{icon}</span>
        </div>}
        <input
          type={type || 'text'}
          className={className || "form-control form-control-alternative text-white bg-dark"}
          placeholder={placeholder || label}
          value={(value || value === 0) ? value : ''}
          disabled={disabled}
          onChange={handleChange}
        />
      </WrapperComponent>
      <InputErrorMessage isValid={showErrorMessage ? isValid : true} message={errorMessage || `Please enter valid ${label}`} />
    </div>
  );
}
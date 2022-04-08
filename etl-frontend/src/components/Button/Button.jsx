import React from 'react';

export const Button = ({ className, name, type, onClick, classNameAppend='', disabled }) => {
  return (
    <button 
      type={type || "button"}
      className={(className || "btn btn-darker") + " " + classNameAppend}
      disabled={disabled || false}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
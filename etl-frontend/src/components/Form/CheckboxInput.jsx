import React from 'react';

export const CheckboxInput = ({ className, classNameAppend="", style, label, value, onClick = () => { } }) => {
  return (
    <div className="form-group" style={style}>
      <div className={className || `custom-control custom-checkbox pt-lg-4 ${classNameAppend}`} onClick={onClick}>
        <input type="checkbox" className="custom-control-input" onChange={() => {}} checked={value || ""} />
        <label className="custom-control-label text-datker">{label || ""}</label>
      </div>
    </div>
  );
}
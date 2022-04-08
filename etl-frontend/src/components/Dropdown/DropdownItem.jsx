import React from 'react';
import { Link } from 'react-router-dom';

export const DropdownItem = ({ children, className, onClick=()=>{} }) => {
  return (
    <Link
      className={className || "dropdown-item"}
      to="/"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </Link>
  );
}
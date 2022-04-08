import React from 'react';

export const DropdownMenu = ({ children }) => {
  return (
    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow bg-dark border-gray">
      {children}
    </div>
  );
}
import React from 'react';

export const PageContentContainer = ({ children }) => {
  return (
    <div className="container-fluid">
      {children}  
    </div>
  );
}
import React from 'react';

export const FormGroup = ({ name, children }) => {
  return (
    <>
      <h6 className="heading-small text-muted mb-4 text-white">{name}</h6>
      <div className="pl-lg-4">
        {children}
      </div>
      <hr className="my-4" />
    </>
  );
}
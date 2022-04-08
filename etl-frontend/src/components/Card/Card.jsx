import React from 'react';

export const Card = ({ name, buttons, children }) => {
  return (
    <div className="card col-12 bg-dark">
      {name && <div className="card-header border-0 align-items-center bg-dark">
        <h3 className="mb-0 text-white">
          {name}
          {buttons && <div className="float-right">
            {buttons}
          </div>}
        </h3>
      </div>}
      {children}
    </div>
  );
}

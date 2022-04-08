import React from 'react';

export const TableBody = (props) => {
  return (
    <tbody className="list">
      {props.children}
    </tbody>
  );
};

import React from 'react';

export const FormRow = ({ children }) => {
  const singleContainerClassName = children.length ? `col-lg-${Math.floor(12 / children.length)}` : 'col-lg-12';

  const child = (child, i) => <div key={i} className={singleContainerClassName}>
    {child}    
  </div>;

  return (
    <div className="row">
      {children?.length ? children.map(child) : child(children, 0)}
    </div>
  );
}
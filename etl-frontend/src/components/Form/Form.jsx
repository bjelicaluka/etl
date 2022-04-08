import React from 'react';

export const Form = ({ className, name, children, onSubmit }) => {

  const isFormValid = (children) => {
    if(children?.length && children.forEach) {
      let valid = true;
      children.forEach(c => {
        if(!validateChild(c))
          valid = false;
      });
      return valid;
    }
    return validateChild(children);
  }

  const validateChild = c => {
    if (c?.props?.isValid === false) {
      return false;
    }
    if (c?.props?.children) {
      const subtreeValid = isFormValid(c.props.children);
      if (!subtreeValid)
        return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = isFormValid(children);
    if (valid) {
      onSubmit(e);
    }
  }

  return (
    <>
      {name && <div className="card-header bg-dark">
         <div className="row align-items-center">
          <div className="col-8">
            <h3 className="mb-0 text-white">{name}</h3>
          </div>
        </div>
      </div>}
      <div className={className || "card-body bg-dark"}>
        <form onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </>
  );
}
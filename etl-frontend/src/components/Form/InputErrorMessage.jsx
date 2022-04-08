import React from "react";

export const InputErrorMessage = ({ isValid, message}) => {
  return !isValid ? (
    <div align="center">
      <p className="text-danger mb-0"><small>{message}</small></p>
    </div>
  )
    :
    <></>;
};
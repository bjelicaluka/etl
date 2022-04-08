import React from "react";

export const MainContentContainer = ({ children }) => {
  return (
    <div className="main-content" id="panel">
      {children}
    </div>
  );
};
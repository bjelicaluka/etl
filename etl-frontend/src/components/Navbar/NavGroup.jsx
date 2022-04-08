import React from "react";

export const NavGroup = ({component, children}) => {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {component}
      </a>
      <div className="dropdown-menu dropdown-menu-right bg-dark border-gray">
        {children}
      </div>
    </li>
  );
};
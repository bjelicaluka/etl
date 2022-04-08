import React from "react";
import { Link } from "react-router-dom";

export const SidebarNavGroup = ({ iconName, name, children }) => {
  return (
    <li className="nav-item dropdown">
      <Link
        to="/"
        onClick={(e) => e.preventDefault()}
        className="nav-link nav-link-icon"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className={iconName}></i>
        <span className="nav-link-text">{name}</span>
      </Link>
      <div className="dropdown-menu dropdown-menu-right bg-dark border-gray">
        {children}
      </div>
    </li>
  );
};

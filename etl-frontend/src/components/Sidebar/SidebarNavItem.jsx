import React from "react";
import { Link, useHistory } from "react-router-dom";
import { closeModal } from "../../utils/external";
import { toggleSidebar } from "./utils";

export const SidebarNavItem = ({ to, iconName, name }) => {
  const history = useHistory();

  const handleClick = () => {
    closeModal();
    toggleSidebar();
    history.push(to);
  };

  return (
    <li className="nav-item" onClick={handleClick}>
      <Link to={to} className="nav-link nav-link-icon">
        <i className={iconName}></i>
        <span className="nav-link-text">{name}</span>
      </Link>
    </li>
  );
};

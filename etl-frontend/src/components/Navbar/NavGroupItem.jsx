import React from "react";
import { Link } from "react-router-dom";

export const NavGroupItem = ({ to, iconName, name, onClick}) => {
  const defaultClickHandler = () => {};
  const handleClick = onClick ? onClick : defaultClickHandler;
  
  return (
    <Link 
      to={to} 
      className="dropdown-item"
      onClick={handleClick}
    >
      <i className={iconName}></i>
      <span>{name}</span>
    </Link>
  );
};
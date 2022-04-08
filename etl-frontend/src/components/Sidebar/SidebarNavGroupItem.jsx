import React from "react";
import { Link } from "react-router-dom";
import { toggleSidebar } from "./utils";

export const SidebarNavGroupItem = ({ to, name }) => {
  return (
    <Link to={to} className="dropdown-item" onClick={toggleSidebar}>
      {name}
    </Link>
  );
};

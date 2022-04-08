import React from "react";
import { SidebarContainer } from "./SidebarContainer";
import { SidebarNavItem } from "./SidebarNavItem";

export const Sidebar = () => {
  return (
    <SidebarContainer name="ETL">
        <SidebarNavItem
          name={"Transformations"}
          to={"/transformations"}
          iconName="ni ni-controller text-orange"
        />
    </SidebarContainer>
  );
};

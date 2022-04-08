import React from "react";
import { TypewriterLogo } from "../Logo/TypewriterLogo";
import { SidebarTogglerId, toggleSidebar } from "./utils";

export const SidebarContainer = ({ children }) => {
  const SidebarTogglerComponent = () => (
    <div
      className="pr-3 sidenav-toggler sidenav-toggler-light float-right"
      id={SidebarTogglerId}
      data-action="sidenav-pin"
      data-target="#sidenav-main"
    >
      <div className="sidenav-toggler-inner">
        <i className="sidenav-toggler-line bg-white"></i>
        <i className="sidenav-toggler-line bg-white"></i>
        <i className="sidenav-toggler-line bg-white"></i>
      </div>
    </div>
  );

  return (
    <nav
      className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-dark bg-darker border-darker"
      id="sidenav-main"
    >
      <div className="scrollbar-inner">
        <div className="sidenav-header align-items-center">
            <div className="row align-items-center">
              <div className="col mt-3">
                <span className="text-white">
                  <TypewriterLogo strings={["ETL", "Transformations"]} />
                </span>
              </div>
              <div className="col d-xl-none" onClick={toggleSidebar}>
                <SidebarTogglerComponent />
              </div>
            </div>
        </div>
        <div className="navbar-inner">
          <div className="collapse navbar-collapse" id="sidenav-collapse-main">
            <ul className="navbar-nav">{children}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

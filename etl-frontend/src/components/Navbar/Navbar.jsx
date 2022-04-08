import React from "react";
import { NavbarContainer } from "./NavbarContainer";
import { NavGroup } from "./NavGroup";

export const Navbar = () => {

  const profile = {
    firstName: "Welcome"
  };

  const ProfileNavGroupIconComponent = () => <div className="media align-items-center">
    <i className="ni ni-single-02"></i>
    <div className="media-body  ml-2  d-none d-lg-block">
      <span className="mb-0 text-sm font-weight-bold">{profile?.firstName} {profile?.lastName}</span>
    </div>
  </div>;

  return (
    <NavbarContainer>
      <NavGroup component={<ProfileNavGroupIconComponent />}>
        <div className="dropdown-divider"></div>
      </NavGroup>
    </NavbarContainer>
  );
};
import React from 'react';

export const NavbarContainer = (props) => {


	return (
		<nav className="navbar navbar-top navbar-expand navbar-dark bg-darker border-bottom">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item d-xl-none">
              <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center ml-auto">
            {props.children}
          </ul>
        </div>
      </div>
    </nav>
	);
};
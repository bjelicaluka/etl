import React from 'react';

export const TabNavItem = ({ iconName, children, active, changeActiveTab }) => {

  return (
    <li className="nav-item">
      <a 
        className={`nav-link mb-sm-3 mb-md-0 clickable ${active ? 'active btn-darker text-white' : 'bg-dark text-white'}`} 
        onClick={changeActiveTab}
      >
        <i className={iconName}></i>{children}
      </a>
    </li>
  )
}
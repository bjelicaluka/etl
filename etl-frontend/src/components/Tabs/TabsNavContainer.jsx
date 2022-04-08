import React from 'react';

export const TabsNavContainer = ({ children, activeTab, setActiveTab }) => {

  return (
    <div className="nav-wrapper">
      <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
        {children.map((c, i) => React.cloneElement(c, { active: i === activeTab, key: i, changeActiveTab: () => setActiveTab(i) }))}
      </ul>
    </div>
  )
}
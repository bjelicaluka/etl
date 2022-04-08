import React from 'react';

export const TabsContainer = ({ children, activeTab }) => {
  return (
    <div className="card shadow">
      <div className="card-body bg-dark text-white">
        <div className="tab-content">
          {children.map((c, i) => React.cloneElement(c, { active: i === activeTab, key: i }))}
        </div>
      </div>
    </div>
  )
}
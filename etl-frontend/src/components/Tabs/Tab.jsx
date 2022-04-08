import React from 'react';

export const Tab = ({ children, active }) => {
  return (
    <div className={`tab-pane fade ${active ? 'show active' : ''}`}>
      {children}
    </div>
  )
}
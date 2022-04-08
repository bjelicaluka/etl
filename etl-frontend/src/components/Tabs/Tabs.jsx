import React, { useState } from 'react';

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {children.map((c, i) => React.cloneElement(c, { key: i, activeTab, setActiveTab }))}
    </>
  )
}
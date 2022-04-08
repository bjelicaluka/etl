import React from 'react';

export const TableHead = ({columns}) => {
  return (
    <thead className="thead-darker">
      <tr>
        {columns && columns.map((col, i) => <th className="border-gray" key={i} scope="col">{col}</th>)}
      </tr>
    </thead>
  );
};
import React from 'react';
import { TableSizes } from '../../utils/constants';
import { TableSizeToClass } from '../../utils/mappings';

export const Table = ({ children, hasPagination=true, size=TableSizes.large }) => {
  return (
    <>
      <div className={`table-responsive ${TableSizeToClass[size]}`}>
        <table className="table align-items-center table-flush bg-dark text-white">
          {hasPagination ? children.slice(0, children.length - 1) : children}
        </table>
      </div>
      {children && hasPagination && children[children.length - 1]}
    </>
  );
};
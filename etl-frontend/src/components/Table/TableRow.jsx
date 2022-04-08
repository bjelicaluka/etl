import React from 'react';
import { DropdownMenu } from '../Dropdown/DropdownMenu';

export const TableRow = ({ cells, actions }) => {
  return (
    <tr>
      {cells && cells.map((cell, i) => <td className="border-gray" key={i}>{cell}</td>)}
      {actions && <td className="text-right border-gray">
        <div className="dropdown">
          <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v"></i>
          </a>
            <DropdownMenu>
              {actions}
            </DropdownMenu>
        </div>
      </td>}
    </tr>
  );
};
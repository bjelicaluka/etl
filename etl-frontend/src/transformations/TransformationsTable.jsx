import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table } from '../components/Table/Table';
import { TableBody } from '../components/Table/TableBody';
import { TableHead } from '../components/Table/TableHead';
import { TableRow } from '../components/Table/TableRow';

export const TransformationsTable = ({ transformations }) => {

  const history = useHistory();

  const EditActionComponent = ({ transformationId }) =>
    <Link to={`/transformations/${transformationId}`} className="dropdown-item">
      Edit
    </Link>

  const ExecuteActionButton = ({ transformationId }) =>
    <button
      className="btn btn-sm btn-darker"
      onClick={() => {
        history.push(`/transformations/${transformationId}/execute`)
      }}
    >
      Execute
    </button>

  return (
    <Table hasPagination={false}>
      <TableHead
        columns={["ID", "Name", "Execute", ""]}
      />
      <TableBody>
        {transformations && transformations.map((transformation, i) =>
          <TableRow
            key={i}
            cells={[transformation.id, transformation.name, <ExecuteActionButton transformationId={transformation.id} />]}
            actions={[
              <EditActionComponent key="1" transformationId={transformation.id} />,
            ]}
          />)}
      </TableBody>
    </Table>
  );
}
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { TransformationsTable } from './TransformationsTable';
import { getTransformations } from '../services/transformations';


export const TransformationsPage = () => {
  
  const [transformations, setTransformations] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getTransformations().then(setTransformations);
  }, []);

  const AddNewTransformation = () =>
    <Button
      name="Add Transformation"
      onClick={() => {
        history.push('/transformations/new')
      }}
    />;

  return (
    <>
      <Card
        name="ETL Transformations"
        buttons={<AddNewTransformation key="1" />}
      >
        <TransformationsTable transformations={transformations} />
      </Card>
    </>
  );
};

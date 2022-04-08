import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card/Card";
import { TransformationForm } from "./TransformationForm";
import { getTransformation } from "../services/transformations";

export const EditTransformationPage = () => {
  const [transformation, setTransformation] = useState(null);

  const { id: transformationId } = useParams();

  const history = useHistory();

  const isEdit = !!transformationId && transformationId !== 'new';

  useEffect(() => {
    if (isEdit) {
      getTransformation(transformationId).then(setTransformation);
    }
  }, [transformationId]);

  return (
    <div className="row col-12">
      <Card name="ETL">
        {(!isEdit || !!transformation) && <TransformationForm
          isEdit={isEdit}
          transformationRule={transformation}
          onSuccess={() => {
            alert("Success");
            !isEdit && history.push("/transformations");
          }}
          onError={() => {
            alert("Error");
          }}
        />}
      </Card>
    </div>
  );
};

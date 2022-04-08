import React from 'react';
import {Route, Switch} from 'react-router';
import { EditTransformationPage } from '../../transformations/EditTransformationPage';
import { TransformationsPage } from '../../transformations/TransformationsPage';

export const Routes = () => {
	return (
		<Switch>
			<Route exact path={"/transformations"} component={TransformationsPage} />
			<Route exact path={"/transformations/new"} component={EditTransformationPage} />
			<Route exact path={"/transformations/:id/execute"} component={() => <>Execution UI</>} />
			<Route exact path={"/transformations/:id"} component={EditTransformationPage} />
		</Switch>
	);
};
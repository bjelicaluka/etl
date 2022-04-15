import React from 'react';
import {Route, Switch} from 'react-router';
import { EditTransformationPage } from '../../transformations/EditTransformationPage';
import { ExecutionPage } from '../../transformations/ExecutionPage';
import { TransformationsPage } from '../../transformations/TransformationsPage';

export const Routes = () => {
	return (
		<Switch>
			<Route exact path={"/transformations"} component={TransformationsPage} />
			<Route exact path={"/transformations/new"} component={EditTransformationPage} />
			<Route exact path={"/transformations/:id/execute"} component={ExecutionPage} />
			<Route exact path={"/transformations/:id"} component={EditTransformationPage} />
		</Switch>
	);
};
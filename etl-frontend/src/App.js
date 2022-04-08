import React from 'react';
import { Route } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';

function App() {

	return (
		<>
			<Route path='/' component={DefaultLayout} />
		</>
	);
}

export default App;

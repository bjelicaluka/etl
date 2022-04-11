import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { EtlCommandDispatcher } from './events/EtlCommandDispatcher';
import { EtlEventHandler } from './events/EtlEventHandler';
import { DefaultLayout } from './layouts/DefaultLayout';

function App() {

	const [etlCommandDispatcher] = useState(new EtlCommandDispatcher());

	useEffect(() => {
		etlCommandDispatcher.init();
		const handler = new EtlEventHandler();
		handler.init();
		handler.onLiveness(s => console.log('liveness', s));
		handler.onProcessStatus(s => console.log('status', s));
		handler.onProcessDone(s => console.log('done', s));

		return () => {
			handler.clearEventListeners('liveness');
			handler.clearEventListeners('status');
			handler.clearEventListeners('done');
			handler.close();
		}
	}, []);

	return (
		<>
			<Route path='/' component={DefaultLayout} />
			<button onClick={() => etlCommandDispatcher.startProcess("Transformation-165-A")}>Start</button>
		</>
	);
}

export default App;

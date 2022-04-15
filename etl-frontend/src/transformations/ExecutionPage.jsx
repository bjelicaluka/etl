import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "../components/Button/Button";
import { EtlCommandDispatcher } from '../events/EtlCommandDispatcher';
import { EtlEventHandler } from '../events/EtlEventHandler';

export function ExecutionPage() {
	const { id: transformationId } = useParams();
	const [etlCommandDispatcher] = useState(new EtlCommandDispatcher());

	const [creatorOnline, setCreatorOnline] = useState(false);
	const [creatorOnlineTimeout, setCreatorOnlineTimeout] = useState(null);
	const [isDone, setDone] = useState(false);
	const [isRunning, setRunning] = useState(false);
	const [status, setStatus] = useState({
		totalCount: 0,
		totalPublishTime: 0,
		publishedCount: 0,
		processedCount: 0,
		totalProcessTime: 0,
	});

	useEffect(() => {
		etlCommandDispatcher.init();
		const handler = new EtlEventHandler();
		handler.init();
		handler.onLiveness(s => {
			const data = JSON.parse(s);
			if(data.transformationId != transformationId) return;
			creatorOnlineTimeout && clearTimeout(creatorOnlineTimeout);
			setCreatorOnline(true);
			setCreatorOnlineTimeout(setTimeout(() => setCreatorOnline(false), 10_000));
		});
		handler.onProcessStatus(s => {
			const data = JSON.parse(s);
			if(data.transformationId != transformationId) return;
			const done = data.status.totalCount > 0 && data.status.totalCount <= data.status.processedCount;
			if(done) console.timeEnd('total');
			setDone(done);
			setRunning(!done);
			setStatus(prevStatus => ({...prevStatus, ...data.status}));
			setCreatorOnline(true);
		});

		return () => {
			handler.clearEventListeners('liveness');
			handler.clearEventListeners('status');
			handler.clearEventListeners('done');
			handler.close();
		}
	}, [setStatus]);

	return (
		<>
			<div className='row'>
				<span style={{borderRadius: '50%', backgroundColor: creatorOnline ? 'green' : 'red', width: '15px', height: '15px', marginTop: '5px', marginLeft: '1em'}}></span>
				<p style={{marginLeft: '5px', color: 'white'}}>{creatorOnline ? "Online" : "Offline"}</p>
			</div>
			{!!status.totalCount && <div className="progress" style={{height: '4em', borderRadius: '20px',}}>
				<div className="progress-bar" style={{width: `${(status.publishedCount/status.totalCount) * 100}%`, height: '4em', 'backgroundColor': 'black', color: 'white', fontSize: '1.1em'}}>
					{Math.round(status.totalPublishTime/status.publishedCount) / 1000} sps
				</div>
			</div>}
			{!!status.totalCount && <div className="progress" style={{height: '4em', borderRadius: '20px',}}>
				<div className="progress-bar" style={{width: `${(status.processedCount/status.totalCount) * 100}%`, height: '4em', 'backgroundColor': 'black', color: 'white', fontSize: '1.1em'}}>
					{Math.round(status.totalProcessTime/(status.processedCount)) / 1000} sps
				</div>
			</div>}
			<Button
        name={isDone ? "Repeat" : "Start"}
        type="button"
				disabled={!creatorOnline || isRunning}
        onClick={() => {
					etlCommandDispatcher.startProcess(transformationId);
					console.time('total');
					setRunning(true);
				}}
      />
		</>
	);
}

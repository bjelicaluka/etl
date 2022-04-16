import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { EtlCommandDispatcher } from "../events/EtlCommandDispatcher";
import { EtlEventHandler } from "../events/EtlEventHandler";

const ConnectionStatusBar = ({ isConnected }) => {
  return (
    <div className="row">
      <span
        style={{
          borderRadius: "50%",
          backgroundColor: isConnected ? "green" : "red",
          width: "15px",
          height: "15px",
          marginTop: "5px",
          marginLeft: "1em",
        }}
      ></span>
      <p style={{ marginLeft: "5px", color: "white" }}>
        {isConnected ? "Online" : "Offline"}
      </p>
    </div>
  );
};

const ProgressBar = ({ ratio, speed }) => {
  return (
    <div className="progress" style={{ height: "4em", borderRadius: "20px" }}>
      <div
        className="progress-bar"
        style={{
          width: `${ratio * 100 || 0}%`,
          height: "4em",
          backgroundColor: "black",
          color: "green",
          fontSize: "1.1em",
        }}
      >
        {Math.round(speed) / 1000} sps
      </div>
    </div>
  );
};

const LogsContainer = ({ title, logs }) => {
  return (
    <div
      className="col-12 bg-darker mb-3 ml-1 pl-3 pr-3 pt-2 scrollable-medium hide-scroll"
      style={{ color: "green", borderRadius: '12px' }}
    >
      <div>{title}:</div>
      {logs.map((log, i) => (
        <div key={i}>
          {logs.length - i} - {log}
        </div>
      ))}
    </div>
  );
};

const DurationsContainer = ({ isRunning, isDone, timeRemaining, total, }) => {
	return (
		<div className="col-12 p-3" style={{ color: 'white'}}>
			{isRunning && (
        <div>Remaining time: {timeRemaining} sec</div>
      )}
      {isDone && <div>Total time: {total} sec</div>}
		</div>
	)
}

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
  const [results, setResults] = useState([]);
  const [streams, setStreams] = useState([]);
  const [start, setStart] = useState(Date.now());
  const [end, setEnd] = useState(Date.now());

  useEffect(() => {
    if (isDone) {
      setEnd(Date.now());
    }
  }, [isDone]);

  useEffect(() => {
    etlCommandDispatcher.init();
    const handler = new EtlEventHandler();
    handler.init();
    handler.onLiveness((s) => {
      const data = JSON.parse(s);
      if (data.transformationId != transformationId) return;
      clearTimeout(creatorOnlineTimeout);
      setCreatorOnline(true);
      setCreatorOnlineTimeout(
        setTimeout(() => setCreatorOnline(false), 10_000)
      );
    });
    handler.onProcessStatus((s) => {
      const data = JSON.parse(s);
      if (data.transformationId != transformationId) return;
      const done =
        data.status.totalCount > 0 &&
        data.status.totalCount <= data.status.processedCount;
      setDone(done);
      setRunning(!done);
      setStatus((prevStatus) => ({ ...prevStatus, ...data.status }));
      setCreatorOnline(true);
      if (data.results) {
        setResults((prevResults) => [
          ...data.results.split("\n").filter((e) => !!e),
          ...prevResults,
        ]);
      }
      if (data.stream) {
        setStreams((prevStreams) => [
          ...data.stream.split("\n").filter((e) => !!e),
          ...prevStreams,
        ]);
      }
    });

    return () => {
      handler.clearEventListeners("liveness");
      handler.clearEventListeners("status");
      handler.clearEventListeners("done");
      handler.close();
    };
  }, [setStatus]);

  const secondsPerStreamProcess = status.totalProcessTime / status.processedCount;
	const estimatedProcessingDuration = Math.round((100 * secondsPerStreamProcess) / 1000) / 100 * status.totalCount;
	const secondsPerStreamCreation = status.totalPublishTime / status.processedCount;
	const estimatedCreationDuration = Math.round((100 * secondsPerStreamCreation) / 1000) / 100 * status.totalCount;

	const secondsElapsed = (e) => Math.floor((e - start) / 1000);
	const timeElapsed = secondsElapsed(Date.now());
	const currentAverage = timeElapsed / status.processedCount;
	const totalEstimated = (estimatedProcessingDuration + estimatedCreationDuration + currentAverage * status.totalCount) / 3;

	const timeRemaining = totalEstimated - timeElapsed;
  return (
    <>
      <ConnectionStatusBar isConnected={creatorOnline} />
			<DurationsContainer
				isDone={isDone}
				isRunning={isRunning}
				timeRemaining={Math.round(100 * (timeRemaining < 0 ? 0 : timeRemaining) ) / 100}
				total={secondsElapsed(end)}
			/>
      <ProgressBar
        speed={secondsPerStreamCreation}
        ratio={status.publishedCount / status.totalCount}
      />
      <ProgressBar
        speed={secondsPerStreamProcess}
        ratio={status.processedCount / status.totalCount}
      />
      <LogsContainer title="Published" logs={results} />
      <LogsContainer title="Processed" logs={streams} />
      <Button
        name={isDone ? "Repeat" : "Start"}
        type="button"
        disabled={!creatorOnline || isRunning}
        onClick={() => {
          setStart(Date.now());
          setResults([]);
          setStreams([]);
          etlCommandDispatcher.startProcess(transformationId);
          setRunning(true);
        }}
      />
    </>
  );
}
